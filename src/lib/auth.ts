// src/lib/auth.ts
// Simple token‑based authentication for the dashboard.
// In a real app you'd use a proper session mechanism (e.g., next‑auth).
// Here we compare a bearer token against the AUTH_SECRET environment variable.

import { NextRequest } from "next/server";
import { getEnv } from "@/src/lib/env";
import { getSession } from "@/src/lib/auth/session";

/**
 * Checks if the request is authenticated via either:
 * 1. An active signed session cookie (`cms_session`) from the dashboard login, OR
 * 2. An Authorization: Bearer <AUTH_SECRET> header.
 */
export async function isAuthenticated(req: NextRequest): Promise<boolean> {
  // 1. Check signed JWT session cookie from browser
  const cookieHeader = req.headers.get("cookie");
  const session = await getSession(cookieHeader);
  if (session && session.role === "admin") {
    return true;
  }

  // 2. Check Bearer token header
  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, "");
    const { AUTH_SECRET } = getEnv();
    if (token === AUTH_SECRET) {
      return true;
    }
  }

  return false;
}

export async function requireAuth(req: NextRequest): Promise<Response | null> {
  const authed = await isAuthenticated(req);
  if (!authed) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return null;
}
