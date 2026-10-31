import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { getEnv } from "../src/lib/env.ts";

describe("Environment Validation", () => {
  it("provides valid defaults in test mode when no variables are supplied", () => {
    const env = getEnv({
      NODE_ENV: "test",
    });

    assert.equal(env.NODE_ENV, "test");
    assert.equal(env.HUBSPOT_API_VERSION, "2026-09");
    assert.equal(env.ORDER_SIGNATURE_HEADER, "x-order-signature");
    assert.equal(env.MAX_REQUEST_BYTES, 65536);
    assert.ok(env.DTBASE_URL.includes("sslmode=require"));
  });

  it("throws validation error if required variables are missing in production mode", () => {
    assert.throws(
      () => {
        getEnv({
          NODE_ENV: "production",
        });
      },
      {
        message: /Environment validation failed/,
      }
    );
  });

  it("accepts valid custom configuration", () => {
    const env = getEnv({
      NODE_ENV: "development",
      DTBASE_URL: "postgres://user:secret@localhost:5432/db?sslmode=require",
      HUBSPOT_ACCESS_TOKEN: "pat-na1-12345678-abcd",
      HUBSPOT_API_VERSION: "2026-09",
      HUBSPOT_PIPELINE_ID: "sales_pipeline",
      HUBSPOT_DEAL_STAGE_ID: "closedwon",
      ORDER_WEBHOOK_SECRET: "custom_secret_123",
      ORDER_SIGNATURE_HEADER: "x-custom-signature",
      MAX_REQUEST_BYTES: "32768",
      ADMIN_USERNAME: "superadmin",
      ADMIN_PASSWORD_HASH: "hash1234567890",
      AUTH_SECRET: "this_is_a_very_long_auth_secret_for_signing_sessions",
    });

    assert.equal(env.HUBSPOT_PIPELINE_ID, "sales_pipeline");
    assert.equal(env.ORDER_SIGNATURE_HEADER, "x-custom-signature");
    assert.equal(env.MAX_REQUEST_BYTES, 32768);
  });
});
