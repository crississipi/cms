// src/lib/sync/order-sync-service.ts
import { prisma } from "@/src/lib/prisma";
import { getEnv } from "@/src/lib/env";
import { SyncStatus } from "@/src/generated/prisma";
import { orderSchema, OrderPayload } from "@/src/lib/webhook/order-schema";
import {
  createOrUpdateContact,
  searchContactByEmail,
} from "@/src/lib/hubspot/contact";
import {
  searchDealByExternalId,
  createDeal,
  associateDealWithContact,
} from "@/src/lib/hubspot/deal";
import { mapOrderToDeal } from "@/src/lib/hubspot/mapping";
import { HubSpotError } from "@/src/lib/hubspot/error";

export type SyncResultStatus =
  | "synced"
  | "queued"
  | "duplicate_completed"
  | "duplicate_processing";

export interface SyncOrderResult {
  status: SyncResultStatus;
  orderId: string;
  hubspotContactId?: string | null;
  hubspotDealId?: string | null;
}

const DEFAULT_MAX_ATTEMPTS = 5;
const BASE_DELAY_MS = 500;
const MAX_TOTAL_MS = 30_000;
const CLAIM_LEASE_MS = 5 * 60 * 1000; // 5 minutes

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Orchestrates order synchronization with HubSpot:
 * 1. Upserts OrderSync record (idempotency key: order_id)
 * 2. Conditionally claims atomic lease to prevent concurrent execution
 * 3. Reconciles HubSpot Contact and Deal (by external_order_id)
 * 4. Associates Deal with Contact
 * 5. Handles retries with exponential backoff & Retry-After
 * 6. Records SyncAttempt audit trail
 */
export async function syncOrder(validated: unknown): Promise<SyncOrderResult> {
  const order: OrderPayload =
    typeof (validated as OrderPayload)?.order_id === "string"
      ? (validated as OrderPayload)
      : orderSchema.parse(validated);

  const { HUBSPOT_PIPELINE_ID, HUBSPOT_DEAL_STAGE_ID } = getEnv();
  const now = new Date();

  // 1. Persist or find OrderSync row
  const orderSync = await prisma.orderSync.upsert({
    where: { orderId: order.order_id },
    create: {
      orderId: order.order_id,
      orderData: order,
      status: SyncStatus.RECEIVED,
    },
    update: {},
  });

  // Fast-path: If already synced previously
  if (orderSync.status === SyncStatus.SYNCED) {
    return {
      status: "duplicate_completed",
      orderId: order.order_id,
      hubspotContactId: orderSync.hubspotContactId,
      hubspotDealId: orderSync.hubspotDealId,
    };
  }

  // 2. Claim exclusive processing lease
  const claimResult = await prisma.$transaction(async (tx) => {
    const updated = await tx.orderSync.updateMany({
      where: {
        orderId: order.order_id,
        OR: [{ claimedUntil: null }, { claimedUntil: { lt: now } }],
        status: { in: [SyncStatus.RECEIVED, SyncStatus.FAILED] },
      },
      data: {
        claimedUntil: new Date(now.getTime() + CLAIM_LEASE_MS),
        status: SyncStatus.PROCESSING,
      },
    });

    if (updated.count === 0) {
      return null;
    }

    const priorAttempts = await tx.syncAttempt.count({
      where: { orderSyncId: orderSync.id },
    });

    const attempt = await tx.syncAttempt.create({
      data: {
        orderSyncId: orderSync.id,
        attemptNumber: priorAttempts + 1,
        status: SyncStatus.PROCESSING,
        startedAt: now,
      },
    });

    return { attempt };
  });

  if (!claimResult) {
    // Another worker is currently processing this order or already synced it
    const fresh = await prisma.orderSync.findUnique({
      where: { orderId: order.order_id },
    });

    if (fresh?.status === SyncStatus.SYNCED) {
      return {
        status: "duplicate_completed",
        orderId: order.order_id,
        hubspotContactId: fresh.hubspotContactId,
        hubspotDealId: fresh.hubspotDealId,
      };
    }

    return {
      status: "duplicate_processing",
      orderId: order.order_id,
    };
  }

  const { attempt } = claimResult;

  // 3. Retry loop for HubSpot API operations
  const maxAttempts =
    Number(process.env.MAX_SYNC_ATTEMPTS) || DEFAULT_MAX_ATTEMPTS;
  let attemptCount = 0;
  const startTime = Date.now();

  while (attemptCount < maxAttempts && Date.now() - startTime < MAX_TOTAL_MS) {
    attemptCount++;
    try {
      // 3a. Contact upsert
      const normalizedEmail = order.customer.email.trim().toLowerCase();
      const existingContact = await searchContactByEmail(normalizedEmail);
      const contact = await createOrUpdateContact({
        email: normalizedEmail,
        firstName: order.customer.first_name,
        lastName: order.customer.last_name,
        phone: order.customer.phone,
        hubspotId: existingContact?.id,
      });

      // 3b. Remote Deal reconciliation (idempotency key: external_order_id)
      // Check if a Deal already exists for this order. If so, skip creation.
      const existingDeal = await searchDealByExternalId(order.order_id);
      let deal;
      if (existingDeal) {
        deal = existingDeal;
      } else {
        const dealPayload = mapOrderToDeal(
          order,
          HUBSPOT_PIPELINE_ID,
          HUBSPOT_DEAL_STAGE_ID,
        );
        try {
          deal = await createDeal(dealPayload);
        } catch (err) {
          // Creation may have succeeded on HubSpot side but response was lost.
          // Attempt to recover by searching again.
          const recovered = await searchDealByExternalId(order.order_id);
          if (recovered) {
            deal = recovered;
          } else {
            // Propagate error to trigger retry logic.
            throw err;
          }
        }
      }

      // 3c. Deal-to-Contact Association
      await associateDealWithContact(deal.id, contact.id);

      // 3d. Record success in DB
      await prisma.$transaction(async (tx) => {
        await tx.orderSync.update({
          where: { id: orderSync.id },
          data: {
            status: SyncStatus.SYNCED,
            hubspotContactId: contact.id,
            hubspotDealId: deal.id,
            syncedAt: new Date(),
            claimedUntil: null,
          },
        });
        await tx.syncAttempt.update({
          where: { id: attempt.id },
          data: {
            status: SyncStatus.SYNCED,
            finishedAt: new Date(),
            hubspotContactId: contact.id,
            hubspotDealId: deal.id,
            errorCategory: null,
            errorMessage: null,
          },
        });
      });

      return {
        status: "synced",
        orderId: order.order_id,
        hubspotContactId: contact.id,
        hubspotDealId: deal.id,
      };
    } catch (e: unknown) {
      const isHubSpotErr = e instanceof HubSpotError;
      const retryable = isHubSpotErr ? e.retryable : true;

      const errorCategory = isHubSpotErr ? String(e.status) : "NETWORK";
      const errorMessage = isHubSpotErr
        ? e.message
        : e instanceof Error
          ? e.message
          : "Network timeout or request failure";

      await prisma.syncAttempt.update({
        where: { id: attempt.id },
        data: {
          status: SyncStatus.FAILED,
          finishedAt: new Date(),
          errorCategory,
          errorMessage,
        },
      });

      if (!retryable) {
        break;
      }

      let delay = BASE_DELAY_MS * 2 ** (attemptCount - 1);
      if (isHubSpotErr && e.retryAfter) {
        delay = Math.max(delay, e.retryAfter * 1000);
      }
      const jitter = delay * (Math.random() * 0.4 - 0.2);
      const finalDelay = Math.max(0, delay + jitter);
      await sleep(finalDelay);
    }
  }

  // Exhausted retries or non-retryable error
  await prisma.orderSync.update({
    where: { id: orderSync.id },
    data: {
      status: SyncStatus.FAILED,
      claimedUntil: null,
    },
  });

  return {
    status: "queued",
    orderId: order.order_id,
  };
}
