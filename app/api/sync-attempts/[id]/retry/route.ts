import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { requireAuth } from "@/src/lib/auth";
import { syncOrder } from "@/src/lib/sync/order-sync-service";
import { logger } from "@/src/lib/logging";

// POST /api/sync-attempts/[id]/retry – retries a failed sync attempt.
export async function POST(req: NextRequest) {
  // Auth check
  const unauthorized = await requireAuth(req);
  if (unauthorized) return unauthorized;

  // Extract id from URL
  const id = req.nextUrl.pathname.split("/").pop();
  if (!id) {
    return NextResponse.json({ error: "Missing sync attempt ID" }, { status: 400 });
  }

  // Load attempt with order
  const attempt = await prisma.syncAttempt.findUnique({
    where: { id },
    include: { orderSync: true },
  });
  if (!attempt) {
    return NextResponse.json({ error: "Sync attempt not found" }, { status: 404 });
  }

  // Only allow retry on FAILED attempts and when not already processing
  if (attempt.status !== "FAILED") {
    return NextResponse.json({ error: "Only failed attempts can be retried" }, { status: 400 });
  }

  // Ensure no concurrent processing for the same order
  const order = await prisma.orderSync.findUnique({
    where: { id: attempt.orderSyncId },
    select: { claimedUntil: true },
  });
  if (order?.claimedUntil && order.claimedUntil > new Date()) {
    return NextResponse.json({ error: "Order is currently being processed" }, { status: 409 });
  }

  try {
    // Re‑use the idempotent sync service – it will handle persistence & job creation.
    await syncOrder(attempt.orderSync.orderData as unknown as Parameters<typeof syncOrder>[0]);
    logger.info("Retry succeeded", { attemptId: id });
    return NextResponse.json({ status: "retried" }, { status: 200 });
  } catch (e) {
    logger.error("Retry failed", { attemptId: id, error: e });
    return NextResponse.json({ error: "Retry failed" }, { status: 500 });
  }
}
