import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { scryptSync, timingSafeEqual } from "node:crypto";
import { getEnv } from "@/src/lib/env";

export const SESSION_COOKIE_NAME = "cms_session";
const SESSION_DURATION_SECONDS = 8 * 60 * 60; // 8 hours

function getSecretKey(): Uint8Array {
  const env = getEnv();
  return new TextEncoder().encode(env.AUTH_SECRET);
}

/**
 * Verifies a plaintext password against a stored scrypt hash format:
 * Format: "salt:hexKey" where hexKey is scryptSync(password, salt, 64).toString("hex")
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash || !storedHash.includes(":")) {
    return false;
  }
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) {
    return false;
  }

  try {
    const derivedKey = scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(key, "hex");

    if (derivedKey.length !== keyBuffer.length) {
      return false;
    }
    return timingSafeEqual(derivedKey, keyBuffer);
  } catch {
    return false;
  }
}

/**
 * Helper to generate a password hash string in "salt:hexKey" format.
 */
export function hashPassword(password: string, salt = "cms_salt_eval"): string {
  const derivedKey = scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

export interface SessionPayload {
  username: string;
  role: "admin";
}

/**
 * Creates a signed JWT session token.
 */
export async function createSessionToken(payload: SessionPayload): Promise<string> {
  const secret = getSecretKey();
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(secret);
}

/**
 * Verifies a JWT session token and returns the payload.
 */
export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const secret = getSecretKey();
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    if (typeof payload.username === "string" && payload.role === "admin") {
      return {
        username: payload.username,
        role: "admin",
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Server-side helper to get current session from Next.js cookies or explicit cookie string.
 */
export async function getSession(cookieHeader?: string | null): Promise<SessionPayload | null> {
  let token: string | undefined;

  if (cookieHeader !== undefined && cookieHeader !== null) {
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE_NAME}=([^;]*)`));
    token = match ? decodeURIComponent(match[1]) : undefined;
  } else {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    } catch {
      return null;
    }
  }

  if (!token) {
    return null;
  }
  return verifySessionToken(token);
}
