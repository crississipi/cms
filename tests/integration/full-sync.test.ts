// tests/integration/full-sync.test.ts
// Integration test: signed webhook -> route handler -> sync service (mocked DB + HubSpot).

import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { createHmac } from "node:crypto";

// ── Environment ────────────────────────────────────────────────────────────
(process.env as Record<string, string>).NODE_ENV = "test";
const TEST_SECRET = "test_webhook_secret_key_1234567890";
process.env.ORDER_WEBHOOK_SECRET = TEST_SECRET;
process.env.ORDER_SIGNATURE_HEADER = "x-order-signature";
process.env.HUBSPOT_PIPELINE_ID = "pipeline";
process.env.HUBSPOT_DEAL_STAGE_ID = "stage";

// ── Mock Prisma ────────────────────────────────────────────────────────────
// All values are inline (no top-level vars) to satisfy vitest hoisting rules.
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
    id: "contact_123",
    properties: { email: "alice@example.com" },
    createdAt: "",
    updatedAt: "",
    archived: false,
  }),
}));

vi.mock("../../src/lib/hubspot/deal", () => ({
  searchDealByExternalId: vi.fn().mockResolvedValue(null),
  createDeal: vi.fn().mockResolvedValue({ id: "deal_456" }),
  associateDealWithContact: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("../../src/lib/hubspot/mapping", () => ({
  mapOrderToContact: vi.fn().mockReturnValue({ email: "alice@example.com" }),
  mapOrderToDeal: vi.fn().mockReturnValue({
    properties: {
      dealname: "Order ORD-TEST-001 — Alice Doe",
      amount: "100",
      currency: "USD",
      external_order_id: "ORD-TEST-001",
      closedate: String(Date.now()),
      pipeline: "pipeline",
      dealstage: "stage",
    },
  }),
}));

// ── Import route AFTER mocks ───────────────────────────────────────────────
import { POST } from "../../app/api/webhooks/orders/route";
import { prisma } from "../../src/lib/prisma";

// ── Helpers ────────────────────────────────────────────────────────────────
function createSignedRequest(body: unknown, extraHeaders: Record<string, string> = {}): NextRequest {
  const bodyText = JSON.stringify(body);
  const rawBody = Buffer.from(bodyText);
  const hexSig = createHmac("sha256", TEST_SECRET).update(rawBody).digest("hex");
  return new NextRequest("http://localhost:3000/api/webhooks/orders", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-order-signature": `sha256=${hexSig}`,
      ...extraHeaders,
    },
    body: rawBody,
  });
}

const samplePayload = {
  event: "order.created",
  order_id: "ORD-TEST-001",
  created_at: "2026-09-20T14:32:00+08:00",
  customer: {
    email: "alice@example.com",
    first_name: "Alice",
    last_name: "Doe",
    phone: "+123456789",
  },
  items: [{ sku: "SKU1", name: "Item 1", qty: 1, price: 100.0 }],
  currency: "USD",
  total: 100.0,
};

describe("Full order sync integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default happy-path mocks for each test
    const receivedRow = {
      id: "order-sync-id",
      orderId: "ORD-TEST-001",
      orderData: samplePayload,
      status: "RECEIVED",
      hubspotContactId: null,
      hubspotDealId: null,
      claimedUntil: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      syncedAt: null,
    };

    const syncedRow = {
      ...receivedRow,
      status: "SYNCED",
      hubspotContactId: "contact_123",
      hubspotDealId: "deal_456",
      syncedAt: new Date(),
    };

    vi.mocked(prisma.orderSync.upsert).mockResolvedValue(receivedRow as never);
    vi.mocked(prisma.orderSync.update).mockResolvedValue(syncedRow as never);
    vi.mocked(prisma.orderSync.findUnique).mockResolvedValue(null);

    // $transaction runs the callback with a fully-stubbed tx
    vi.mocked(prisma.$transaction).mockImplementation(async (fn: unknown) => {
      const tx = {
        orderSync: {
          updateMany: vi.fn().mockResolvedValue({ count: 1 }),
          findUnique: vi.fn().mockResolvedValue(null),
          update: vi.fn().mockResolvedValue(syncedRow),
        },
        syncAttempt: {
          count: vi.fn().mockResolvedValue(0),
          create: vi.fn().mockResolvedValue({ id: "attempt-id", attemptNumber: 1 }),
          update: vi.fn().mockResolvedValue({}),
        },
        syncJob: {
          create: vi.fn().mockResolvedValue({ id: "job-id" }),
        },
      };
      return (fn as (tx: unknown) => Promise<unknown>)(tx);
    });
  });

  it("accepts a valid signed order and returns 2xx status", async () => {
    const req = createSignedRequest(samplePayload);
    const res = await POST(req);
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);
  });

  it("rejects a request with wrong HMAC signature with 401", async () => {
    const req = new NextRequest("http://localhost:3000/api/webhooks/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-order-signature": "sha256=badhexbadhexbadhex",
      },
      body: JSON.stringify(samplePayload),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("rejects an invalid payload with 422", async () => {
    const bad = { ...samplePayload, event: "wrong.event" };
    const req = createSignedRequest(bad);
    const res = await POST(req);
    expect(res.status).toBe(422);
  });
});
