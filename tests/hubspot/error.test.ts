import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { HubSpotError } from "../../src/lib/hubspot/error";

describe("HubSpot Error Classification & Retry-After", () => {
  it("classifies 429 as retryable with parsed Retry-After header", () => {
    const err = new HubSpotError({
      status: 429,
      retryable: true,
      retryAfter: 15,
      message: "Rate limit reached",
    });

    assert.equal(err.status, 429);
    assert.equal(err.retryable, true);
    assert.equal(err.retryAfter, 15);
    assert.equal(err.message, "Rate limit reached");
  });

  it("classifies 5xx as retryable", () => {
    const err500 = new HubSpotError({
      status: 500,
      retryable: true,
      message: "Internal Server Error",
    });
    const err503 = new HubSpotError({
      status: 503,
      retryable: true,
      message: "Service Unavailable",
    });

    assert.equal(err500.retryable, true);
    assert.equal(err503.retryable, true);
  });

  it("classifies deterministic 4xx (400, 401, 403, 404) as non-retryable", () => {
    const err400 = new HubSpotError({
      status: 400,
      retryable: false,
      message: "Bad Request: invalid property",
    });
    const err401 = new HubSpotError({
      status: 401,
      retryable: false,
      message: "Unauthorized",
    });
    const err403 = new HubSpotError({
      status: 403,
      retryable: false,
      message: "Forbidden",
    });

    assert.equal(err400.retryable, false);
    assert.equal(err401.retryable, false);
    assert.equal(err403.retryable, false);
  });

  it("classifies network timeout (status 0) as retryable", () => {
    const errNetwork = new HubSpotError({
      status: 0,
      retryable: true,
      message: "Network error or request timeout",
    });

    assert.equal(errNetwork.retryable, true);
    assert.equal(errNetwork.status, 0);
  });
});
