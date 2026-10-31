import { describe, it } from "vitest";
import assert from "node:assert/strict";
import {
  mapOrderToContact,
  mapOrderToDeal,
} from "../../src/lib/hubspot/mapping";
import { OrderPayload } from "../../src/lib/webhook/order-schema";

const canonicalSample: OrderPayload = {
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

describe("Contact & Deal Lifecycle Mapping & Associations", () => {
  it("normalizes and maps contact properties accurately", () => {
    const contactProps = mapOrderToContact({
      ...canonicalSample,
      customer: {
        ...canonicalSample.customer,
        email: "  MARIA.SANTOS@EXAMPLE.COM ",
      },
    });

    assert.equal(contactProps.email, "maria.santos@example.com");
    assert.equal(contactProps.firstName, "Maria");
    assert.equal(contactProps.lastName, "Santos");
    assert.equal(contactProps.phone, "+639171234567");
  });

  it("handles optional phone gracefully", () => {
    const contactProps = mapOrderToContact({
      ...canonicalSample,
      customer: {
        email: "john.doe@example.com",
        first_name: "John",
        last_name: "Doe",
      },
    });

    assert.equal(contactProps.phone, undefined);
  });

  it("maps Deal name, amount decimal string, currency, and external order key", () => {
    const dealInput = mapOrderToDeal(canonicalSample, "pipeline_main", "stage_closed");

    assert.equal(dealInput.name, "Order ORD-10482 — Maria Santos");
    assert.equal(dealInput.amount, "900.00");
    assert.equal(dealInput.currency, "PHP");
    assert.equal(dealInput.pipeline, "pipeline_main");
    assert.equal(dealInput.stage, "stage_closed");
    assert.equal(dealInput.externalOrderId, "ORD-10482");
    // Close date mapped to created_at calendar date epoch ms
    assert.equal(dealInput.closeDate, new Date("2026-09-20T14:32:00+08:00").getTime());
  });
});
