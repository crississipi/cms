// scripts/process-sync-jobs.ts
// Simple durable job processor for order sync jobs.
// It runs periodically (cron) and processes any pending SyncJob records.

import { prisma } from "../src/lib/prisma";
import { JobStatus } from "../src/generated/prisma";
import { syncOrder } from "../src/lib/sync/order-sync-service";
import { getEnv } from "../src/lib/env";
import { logger } from "../src/lib/logging";

/**
 * Exponential back‑off with jitter (in ms).
 */
function backoff(attempt: number, base: number = 500): number {
  const jitter = Math.random() * base;
  return Math.pow(2, attempt) * base + jitter;
}

async function processJob(jobId: string) {
  // Claim the job atomically (set status = IN_PROGRESS only if currently PENDING)
  const claimed = await prisma.syncJob.updateMany({
    where: { id: jobId, status: JobStatus.PENDING },
    data: { status: JobStatus.IN_PROGRESS, updatedAt: new Date() },
  });
  if (claimed.count === 0) return; // already claimed by another worker

  const job = await prisma.syncJob.findUniqueOrThrow({ where: { id: jobId } });
  const orderSync = await prisma.orderSync.findUniqueOrThrow({ where: { id: job.orderSyncId } });

  try {
    const result = await syncOrder(orderSync.orderData as any);
    // Update job as completed
    await prisma.syncJob.update({
      where: { id: jobId },
      data: { status: JobStatus.COMPLETED, attempts: job.attempts + 1, updatedAt: new Date() },
    });
    logger.info("Sync job completed", { jobId, orderId: orderSync.orderId, result });
  } catch (err) {
    // Determine if retryable (simple heuristic: HubSpotError.retryable or Prisma transient)
    const retryable = err && typeof err === "object" && "retryable" in err ? Boolean((err as any).retryable) : false;
    const nextAttempt = job.attempts + 1;
    const maxAttempts = 5;
    if (retryable && nextAttempt < maxAttempts) {
      const delayMs = backoff(nextAttempt);
      const nextRetry = new Date(Date.now() + delayMs);
      await prisma.syncJob.update({
        where: { id: jobId },
        data: {
          status: JobStatus.PENDING,
          attempts: nextAttempt,
          nextRetryAt: nextRetry,
          updatedAt: new Date(),
        },
      });
      logger.warn("Sync job will retry", { jobId, attempt: nextAttempt, delayMs });
    } else {
      await prisma.syncJob.update({
        where: { id: jobId },
        data: { status: JobStatus.FAILED, attempts: nextAttempt, updatedAt: new Date() },
      });
      logger.error("Sync job failed permanently", { jobId, err });
    }
  }
}

async function main() {
  const env = getEnv();
  const now = new Date();
  const jobs = await prisma.syncJob.findMany({
    where: {
      status: JobStatus.PENDING,
      OR: [{ nextRetryAt: null }, { nextRetryAt: { lte: now } }],
    },
    take: 10, // batch size to avoid long loops
  });

  for (const job of jobs) {
    await processJob(job.id);
  }
  await prisma.$disconnect();
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((e) => {
      console.error("Fatal error in sync job processor", e);
      process.exit(1);
    });
}
