import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/src/lib/env";
import { verifyRequestSignature } from "@/src/lib/security/hmac";
import { orderSchema, OrderPayload } from "@/src/lib/validation/order";
import { syncOrder } from "@/src/lib/sync/order-sync-service";

export async function POST(request: NextRequest) {
  const env = getEnv();

  // 1. Enforce Content-Type: application/json
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { error: "Unsupported Media Type: Content-Type must be application/json" },
      { status: 415 },
    );
  }

  // 2. Enforce request size limit via Content-Length if present
  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader) {
    const contentLength = parseInt(contentLengthHeader, 10);
    if (!isNaN(contentLength) && contentLength > env.MAX_REQUEST_BYTES) {
      return NextResponse.json(
        { error: `Payload Too Large: Maximum allowed size is ${env.MAX_REQUEST_BYTES} bytes` },
        { status: 413 },
      );
    }
  }

  // 3. Read raw request bytes safely and enforce size limit
  let rawBody: Buffer;
  try {
    const arrayBuffer = await request.arrayBuffer();
    if (arrayBuffer.byteLength > env.MAX_REQUEST_BYTES) {
      return NextResponse.json(
        { error: `Payload Too Large: Maximum allowed size is ${env.MAX_REQUEST_BYTES} bytes` },
        { status: 413 },
      );
    }
    rawBody = Buffer.from(arrayBuffer);
  } catch {
    return NextResponse.json(
      { error: "Bad Request: Failed to read request body" },
      { status: 400 },
    );
  }

  // 4. Verify HMAC-SHA256 signature over exact raw bytes
  const signatureHeaderName = env.ORDER_SIGNATURE_HEADER.toLowerCase();
  const signatureHeader = request.headers.get(signatureHeaderName) ?? undefined;
  const isValidSig = verifyRequestSignature(rawBody, signatureHeader);

  if (!isValidSig) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid or missing webhook signature" },
      { status: 401 },
    );
  }

  // 5. Parse and validate JSON payload against schema
  let parsedJson: unknown;
  try {
    const text = rawBody.toString("utf-8");
    parsedJson = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { error: "Bad Request: Malformed JSON payload" },
      { status: 400 },
    );
  }

  const parseResult = orderSchema.safeParse(parsedJson);
  if (!parseResult.success) {
    return NextResponse.json(
      {
        error: "Unprocessable Entity: Schema validation failed",
        issues: parseResult.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 422 },
    );
  }

  const validatedOrder: OrderPayload = parseResult.data;

  // 6. Call Order Sync Service
  try {
    const result = await syncOrder(validatedOrder);

    switch (result.status) {
      case "synced":
        return NextResponse.json(
          {
            status: "synced",
            order_id: result.orderId,
            contact_id: result.hubspotContactId,
            deal_id: result.hubspotDealId,
          },
          { status: 200 },
        );

      case "duplicate_completed":
        return NextResponse.json(
          {
            status: "duplicate_completed",
            order_id: result.orderId,
            contact_id: result.hubspotContactId,
            deal_id: result.hubspotDealId,
          },
          { status: 200 },
        );

      case "duplicate_processing":
        return NextResponse.json(
          {
            status: "duplicate_processing",
            order_id: result.orderId,
            message: "Order sync is currently being processed by another worker",
          },
          { status: 409 },
        );

      case "queued":
        return NextResponse.json(
          {
            status: "queued",
            order_id: result.orderId,
            message: "Order persisted but remote sync failed after retries; queued for manual retry",
          },
          { status: 202 },
        );
    }
  } catch {
    // If Prisma persistence fails or fatal error occurs
    return NextResponse.json(
      {
        error: "Internal Server Error: Database failure or unhandled exception",
      },
      { status: 500 },
    );
  }
}
