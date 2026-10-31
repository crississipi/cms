import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { verifySignature } from "../../src/lib/webhook/signature.ts";

const TEST_SECRET = "test_webhook_secret_key_1234567890";

function sign(payload: Uint8Array | Buffer, secret = TEST_SECRET): string {
  const hex = createHmac("sha256", secret).update(payload).digest("hex");
  return `sha256=${hex}`;
}

describe("HMAC-SHA256 Signature Verification", () => {
  it("verifies valid signature with sha256= prefix", () => {
    const rawBody = Buffer.from(JSON.stringify({ hello: "world" }));
    const header = sign(rawBody);
    assert.equal(verifySignature(rawBody, header, TEST_SECRET), true);
  });

  it("verifies valid signature without sha256= prefix", () => {
    const rawBody = Buffer.from(JSON.stringify({ hello: "world" }));
    const hex = createHmac("sha256", TEST_SECRET).update(rawBody).digest("hex");
    assert.equal(verifySignature(rawBody, hex, TEST_SECRET), true);
  });

  it("fails closed when signature header is missing or empty", () => {
    const rawBody = Buffer.from(JSON.stringify({ hello: "world" }));
    assert.equal(verifySignature(rawBody, undefined, TEST_SECRET), false);
    assert.equal(verifySignature(rawBody, null, TEST_SECRET), false);
    assert.equal(verifySignature(rawBody, "", TEST_SECRET), false);
  });

  it("fails closed when secret is missing or empty", () => {
    const rawBody = Buffer.from(JSON.stringify({ hello: "world" }));
    const header = sign(rawBody);
    assert.equal(verifySignature(rawBody, header, undefined), false);
    assert.equal(verifySignature(rawBody, header, null), false);
    assert.equal(verifySignature(rawBody, header, ""), false);
  });

  it("rejects wrong secret", () => {
    const rawBody = Buffer.from(JSON.stringify({ hello: "world" }));
    const header = sign(rawBody, "different_secret_key");
    assert.equal(verifySignature(rawBody, header, TEST_SECRET), false);
  });

  it("rejects corrupted or truncated signature hex", () => {
    const rawBody = Buffer.from(JSON.stringify({ hello: "world" }));
    assert.equal(verifySignature(rawBody, "sha256=badhex", TEST_SECRET), false);
    assert.equal(verifySignature(rawBody, "sha256=1234abcd", TEST_SECRET), false);
  });

  it("detects raw byte differences (whitespace or serialization variations)", () => {
    const body1 = Buffer.from('{"order_id":"1"}');
    const body2 = Buffer.from('{"order_id": "1"}'); // extra space
    const header1 = sign(body1);

    assert.equal(verifySignature(body1, header1, TEST_SECRET), true);
    assert.equal(verifySignature(body2, header1, TEST_SECRET), false);
  });
});
