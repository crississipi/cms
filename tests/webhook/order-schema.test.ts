import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { orderSchema, totalsMatch } from "../../src/lib/webhook/order-schema.ts";

const canonicalSample = {
  event: "order.created",
  order_id: "ORD-10482",
  created_at: "2026-09-20T14:32:00+08:00",
  customer: {
    email: "maria.santos@example.com",
    first_name: "Maria",
    last_name: "Santos",
    phone: "+639171234567",
  },
  items: [
    { sku: "TSH-BLK-M", name: "Black Tee (M)", qty: 2, price: 450.0 },
  ],
  currency: "PHP",
  total: 900.0,
};

describe("Order Schema Validation", () => {
  it("validates canonical sample payload successfully", () => {
    const result = orderSchema.safeParse(canonicalSample);
    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.data.order_id, "ORD-10482");
      assert.equal(totalsMatch(result.data), true);
    }
  });

  it("normalizes and lowercases email", () => {
    const payload = {
      ...canonicalSample,
      customer: {
        ...canonicalSample.customer,
        email: "  MARIA.SANTOS@Example.COM  ",
      },
    };
    const result = orderSchema.safeParse(payload);
    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.data.customer.email, "maria.santos@example.com");
    }
  });

  it("rejects wrong event type", () => {
    const payload = { ...canonicalSample, event: "order.updated" };
    const result = orderSchema.safeParse(payload);
    assert.equal(result.success, false);
  });

  it("rejects invalid email address", () => {
    const payload = {
      ...canonicalSample,
      customer: { ...canonicalSample.customer, email: "invalid-email" },
    };
    const result = orderSchema.safeParse(payload);
    assert.equal(result.success, false);
  });

  it("rejects missing timezone in created_at", () => {
    const payload = {
      ...canonicalSample,
      created_at: "2026-09-20T14:32:00", // no Z or offset
    };
    const result = orderSchema.safeParse(payload);
    assert.equal(result.success, false);
  });

  it("rejects non-positive or floating point quantity", () => {
    const payloadZero = {
      ...canonicalSample,
      items: [{ ...canonicalSample.items[0], qty: 0 }],
    };
    assert.equal(orderSchema.safeParse(payloadZero).success, false);

    const payloadFloat = {
      ...canonicalSample,
      items: [{ ...canonicalSample.items[0], qty: 1.5 }],
    };
    assert.equal(orderSchema.safeParse(payloadFloat).success, false);
  });

  it("rejects negative total or negative price", () => {
    const payloadNegativePrice = {
      ...canonicalSample,
      items: [{ ...canonicalSample.items[0], price: -10 }],
    };
    assert.equal(orderSchema.safeParse(payloadNegativePrice).success, false);

    const payloadNegativeTotal = {
      ...canonicalSample,
      total: -100,
    };
    assert.equal(orderSchema.safeParse(payloadNegativeTotal).success, false);
  });

  it("detects line item total vs total mismatch", () => {
    const order = {
      ...canonicalSample,
      total: 1000.0, // line items sum to 900
    };
    const parsed = orderSchema.parse(order);
    assert.equal(totalsMatch(parsed), false);
  });
});
