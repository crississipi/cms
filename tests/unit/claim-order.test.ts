// tests/unit/claim-order.test.ts
// Tests the lease-claim concurrency logic in syncOrder.
// Prisma is mocked so no real DB connection is required.

import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Environment stubs ──────────────────────────────────────────────────────
(process.env as Record<string, string>).NODE_ENV = "test";
process.env.ORDER_WEBHOOK_SECRET = "secret";
process.env.ORDER_SIGNATURE_HEADER = "x-order-signature";
process.env.HUBSPOT_PIPELINE_ID = "pipeline";
process.env.HUBSPOT_DEAL_STAGE_ID = "stage";

// ── Mock Prisma ────────────────────────────────────────────────────────────
// All prisma method mocks are defined here; individual tests override via mockResolvedValue
vi.mock("../../src/lib/prisma", () => ({
  prisma: {
    orderSync: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
      upsert: vi.fn(),
    },
    syncAttempt: {
      create: vi.fn(),
      update: vi.fn(),
      count: vi.fn(),
    },
    syncJob: {
      create: vi.fn(),
    },
    $transaction: vi.fn(),
  },
}));

// ── Mock HubSpot modules ───────────────────────────────────────────────────
vi.mock("../../src/lib/hubspot/contact", () => ({
  searchContactByEmail: vi.fn().mockResolvedValue(null),
  createOrUpdateContact: vi.fn().mockResolvedValue({
    id: "contact_stub",
    properties: { email: "bob@example.com" },
    createdAt: "",
    updatedAt: "",
    archived: false,
  }),
}));

vi.mock("../../src/lib/hubspot/deal", () => ({
  searchDealByExternalId: vi.fn().mockResolvedValue(null),
  createDeal: vi.fn().mockResolvedValue({ id: "deal_stub" }),
  associateDealWithContact: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("../../src/lib/hubspot/mapping", () => ({
  mapOrderToContact: vi.fn().mockReturnValue({ email: "bob@example.com" }),
  mapOrderToDeal: vi.fn().mockReturnValue({
    properties: {
      dealname: "Order ORD-CLAIM-TEST",
      amount: "10",
      currency: "USD",
      external_order_id: "ORD-CLAIM-TEST",
      closedate: String(Date.now()),
      pipeline: "pipeline",
      dealstage: "stage",
    },
  }),
}));

// ── Import module under test AFTER mocks ───────────────────────────────────
import { syncOrder } from "../../src/lib/sync/order-sync-service";
import { prisma } from "../../src/lib/prisma";

const orderPayload = {
  event: "order.created" as const,
  order_id: "ORD-CLAIM-TEST",
  created_at: "2026-09-20T14:32:00+08:00",
  customer: {
    email: "bob@example.com",
    first_name: "Bob",
    last_name: "Builder",
    phone: "+111222333",
  },
  items: [{ sku: "SKU1", name: "Item", qty: 1, price: 10 }],
  currency: "USD",
  total: 10,
};

describe("Lease claim concurrency handling", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns duplicate_processing when the lease is held by another worker", async () => {
    const now = new Date();
    const upsertedRow = {
      id: "existing-id",
      orderId: orderPayload.order_id,
      orderData: orderPayload,
      status: "PROCESSING",
      claimedUntil: new Date(now.getTime() + 5 * 60 * 1000),
      hubspotContactId: null,
      hubspotDealId: null,
      createdAt: now,
      updatedAt: now,
      syncedAt: null,
    };

    // upsert: returns the existing row (status=PROCESSING)
    vi.mocked(prisma.orderSync.upsert).mockResolvedValue(upsertedRow as never);

    // $transaction: runs the callback with a tx object where updateMany returns { count: 0 }
    // count 0 means we couldn't claim — another worker holds the lease
    vi.mocked(prisma.$transaction).mockImplementation(async (fn: unknown) => {
      const tx = {
        orderSync: {
          updateMany: vi.fn().mockResolvedValue({ count: 0 }),
          findUnique: vi.fn(),
        },
        syncAttempt: {
          count: vi.fn().mockResolvedValue(0),
          create: vi.fn(),
        },
      };
      return (fn as (tx: unknown) => Promise<unknown>)(tx);
    });

    // findUnique after failed claim — still PROCESSING
    vi.mocked(prisma.orderSync.findUnique).mockResolvedValue(upsertedRow as never);

    const result = await syncOrder(orderPayload);

    expect(result.status).toBe("duplicate_processing");
    expect(result.orderId).toBe(orderPayload.order_id);
  });

  it("returns duplicate_completed when order was already synced", async () => {
    const now = new Date();
    const syncedRow = {
      id: "synced-id",
      orderId: orderPayload.order_id,
      orderData: orderPayload,
      status: "SYNCED",
      claimedUntil: null,
      hubspotContactId: "contact_123",
      hubspotDealId: "deal_456",
      createdAt: now,
      updatedAt: now,
      syncedAt: now,
    };

    // upsert returns already-SYNCED row
    vi.mocked(prisma.orderSync.upsert).mockResolvedValue(syncedRow as never);

    const result = await syncOrder(orderPayload);

    // Should short-circuit before $transaction since status is SYNCED
    expect(result.status).toBe("duplicate_completed");
    expect(result.orderId).toBe(orderPayload.order_id);
    expect(result.hubspotDealId).toBe("deal_456");
  });
});
