(process.env as Record<string, string | undefined>).NODE_ENV = "test";

import { describe, it } from "vitest";
import assert from "node:assert/strict";
import {
  hashPassword,
  verifyPassword,
  createSessionToken,
  verifySessionToken,
} from "../../src/lib/auth/session";

describe("Authentication & Session Handling", () => {
  it("hashes and verifies password using scrypt in constant time", () => {
    const password = "my_secret_password_123";
    const hash = hashPassword(password);
    assert.equal(verifyPassword(password, hash), true);
    assert.equal(verifyPassword("wrong_password", hash), false);
  });

  it("creates and verifies signed JWT session tokens", async () => {
    const token = await createSessionToken({
      username: "admin",
      role: "admin",
    });

    assert.ok(token);
    assert.equal(typeof token, "string");

    const payload = await verifySessionToken(token);
    assert.ok(payload);
    assert.equal(payload.username, "admin");
    assert.equal(payload.role, "admin");
  });

  it("rejects tampered or malformed session tokens", async () => {
    assert.equal(await verifySessionToken("malformed.jwt.token"), null);
    assert.equal(await verifySessionToken(""), null);
  });
});
