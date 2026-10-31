(process.env as Record<string, string | undefined>).NODE_ENV = "test";

import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { NextRequest } from "next/server.js";
import { POST } from "../../app/api/sync-attempts/[id]/retry/route";
import { createSessionToken, SESSION_COOKIE_NAME } from "../../src/lib/auth/session";

describe("POST /api/sync-attempts/[id]/retry Route Handler", () => {
  it("rejects unauthorized retry with 401 when unauthenticated", async () => {
    const req = new NextRequest("http://localhost:3000/api/sync-attempts/attempt_123/retry", {
      method: "POST",
    });

    const res = await POST(req);
    assert.equal(res.status, 401);
    const body = await res.json();
    assert.equal(body.error, "Unauthorized");
  });

  it("handles authenticated requests safely and rejects invalid sessions", async () => {
    const req = new NextRequest("http://localhost:3000/api/sync-attempts/attempt_123/retry", {
      method: "POST",
      headers: {
        cookie: `${SESSION_COOKIE_NAME}=invalid_tampered_token`,
      },
    });

    const res = await POST(req);
    assert.equal(res.status, 401);
  });
});
