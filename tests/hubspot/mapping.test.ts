import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { mapOrderToContact, mapOrderToDeal } from "../../src/lib/hubspot/mapping.ts";
import { OrderPayload } from "../../src/lib/webhook/order-schema.ts";

const sampleOrder: OrderPayload = {
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

describe("HubSpot Adapter Mapping", () => {
  it("maps order customer to Contact properties correctly", () => {
    const contactInput = mapOrderToContact(sampleOrder);
    assert.equal(contactInput.email, "maria.santos@example.com");
    assert.equal(contactInput.firstName, "Maria");
    assert.equal(contactInput.lastName, "Santos");
    assert.equal(contactInput.phone, "+639171234567");
  });

  it("maps order to Deal properties correctly with format Order <order_id> — <first_name> <last_name>", () => {
    const dealInput = mapOrderToDeal(sampleOrder, "default", "appointmentscheduled");
    assert.equal(dealInput.name, "Order ORD-10482 — Maria Santos");
    assert.equal(dealInput.amount, "900.00");
    assert.equal(dealInput.currency, "PHP");
    assert.equal(dealInput.pipeline, "default");
    assert.equal(dealInput.stage, "appointmentscheduled");
    assert.equal(dealInput.externalOrderId, "ORD-10482");
    assert.equal(dealInput.closeDate, new Date("2026-09-20T14:32:00+08:00").getTime());
  });
});
