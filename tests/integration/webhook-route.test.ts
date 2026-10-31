import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { NextRequest } from "next/server.js";
import { createHmac } from "node:crypto";
import { POST } from "../../app/api/webhooks/orders/route.ts";

(process.env as Record<string, string | undefined>).NODE_ENV = "test";

const TEST_SECRET = "test_webhook_secret_key_1234567890";
process.env.ORDER_WEBHOOK_SECRET = TEST_SECRET;
process.env.ORDER_SIGNATURE_HEADER = "x-order-signature";

function createSignedRequest(body: unknown, headers: Record<string, string> = {}) {
  const bodyText = typeof body === "string" ? body : JSON.stringify(body);
  const rawBody = Buffer.from(bodyText);
  const hexSig = createHmac("sha256", TEST_SECRET).update(rawBody).digest("hex");

  const reqHeaders: Record<string, string> = {
    "content-type": "application/json",
    "x-order-signature": `sha256=${hexSig}`,
    ...headers,
  };

  return new NextRequest("http://localhost:3000/api/webhooks/orders", {
    method: "POST",
    headers: reqHeaders,
    body: rawBody,
  });
}

describe("POST /api/webhooks/orders Route Handler", () => {
  it("rejects non-json content-type with 415", async () => {
    const req = new NextRequest("http://localhost:3000/api/webhooks/orders", {
      method: "POST",
      headers: { "content-type": "text/plain" },
      body: "not-json",
    });

    const res = await POST(req);
    assert.equal(res.status, 415);
  });

  it("rejects oversized request body with 413", async () => {
    const hugeBody = "x".repeat(300_000); // MAX_REQUEST_BYTES default is 262144 (256KB)
    const req = new NextRequest("http://localhost:3000/api/webhooks/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "content-length": "300000",
      },
      body: hugeBody,
    });

    const res = await POST(req);
    assert.equal(res.status, 413);
  });

  it("rejects missing or invalid signature with 401", async () => {
    const validBody = { event: "order.created" };
    const reqMissing = new NextRequest("http://localhost:3000/api/webhooks/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(validBody),
    });

    const resMissing = await POST(reqMissing);
    assert.equal(resMissing.status, 401);

    const reqWrong = createSignedRequest(validBody, {
      "x-order-signature": "sha256=0000000000000000000000000000000000000000000000000000000000000000",
    });
    const resWrong = await POST(reqWrong);
    assert.equal(resWrong.status, 401);
  });

  it("rejects invalid schema with 422", async () => {
    const invalidPayload = {
      event: "order.wrong",
      order_id: "",
    };
    const req = createSignedRequest(invalidPayload);
    const res = await POST(req);
    assert.equal(res.status, 422);
    const data = await res.json();
    assert.equal(data.error.includes("Schema validation failed"), true);
  });
});
