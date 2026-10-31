// src/lib/security/hmac.ts
// HMAC‑SHA256 verification utilities used by the order webhook.
// The secret is read from the environment variable ORDER_WEBHOOK_SECRET.
// Header name is configurable via ORDER_SIGNATURE_HEADER (default "x-order-signature").

import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Compute the HMAC‑SHA256 digest of a Buffer using the shared secret.
 * Returns a Buffer (raw bytes) – callers can hex‑encode if needed.
 */
export function computeHmac(secret: string, payload: Buffer): Buffer {
  return createHmac("sha256", secret).update(payload).digest();
}

/**
 * Verify the incoming signature header against the payload.
 * Accepts signatures of the form "sha256=<hex>" or just the raw hex string.
 * Performs a timing‑safe comparison and returns a boolean.
 */
export function verifySignature(
  secret: string,
  payload: Buffer,
  headerValue: string | undefined,
): boolean {
  if (!headerValue) return false;

  // Strip optional "sha256=" prefix (case‑insensitive).
  const cleaned = headerValue.replace(/^sha256=/i, "");
  // Must be an even‑length hex string.
  if (!/^[a-f0-9]+$/i.test(cleaned) || cleaned.length % 2 !== 0) return false;

  const expected = computeHmac(secret, payload);
  const provided = Buffer.from(cleaned, "hex");
  // Length must match before safe compare.
  if (expected.length !== provided.length) return false;
  return timingSafeEqual(expected, provided);
}

/**
 * Convenience wrapper that reads env vars and performs verification.
 * Returns true if the signature is valid.
 */
export function verifyRequestSignature(
  payload: Buffer,
  signatureHeader: string | undefined,
): boolean {
  const secret = process.env.ORDER_WEBHOOK_SECRET;
  if (!secret) return false; // configuration error – treat as invalid.
  return verifySignature(secret, payload, signatureHeader);
}
