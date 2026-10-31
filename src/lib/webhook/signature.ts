import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Verifies HMAC-SHA256 signature against the exact raw request bytes.
 * Expected signature header convention: sha256=<hex> (or just <hex>).
 * Constant-time comparison is used to avoid timing attacks.
 */
export function verifySignature(
  rawBody: Uint8Array | Buffer,
  signatureHeader: string | null | undefined,
  secret: string | null | undefined,
): boolean {
  if (!signatureHeader || !secret) {
    return false;
  }

  // Header format: "sha256=<hex>" or "<hex>"
  let hexSignature = signatureHeader.trim();
  if (hexSignature.startsWith("sha256=")) {
    hexSignature = hexSignature.slice(7);
  }

  // Must be valid 64-character hex string for SHA-256
  if (!/^[0-9a-fA-F]{64}$/.test(hexSignature)) {
    return false;
  }

  try {
    const computedHex = createHmac("sha256", secret).update(rawBody).digest("hex");
    const sigBuffer = Buffer.from(hexSignature, "hex");
    const computedBuffer = Buffer.from(computedHex, "hex");

    if (sigBuffer.length !== computedBuffer.length) {
      return false;
    }

    return timingSafeEqual(sigBuffer, computedBuffer);
  } catch {
    return false;
  }
}
