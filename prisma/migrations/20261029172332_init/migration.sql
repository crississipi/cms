-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('RECEIVED', 'PROCESSING', 'SYNCED', 'FAILED');

-- CreateTable
CREATE TABLE "order_syncs" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "order_data" JSONB NOT NULL,
    "status" "SyncStatus" NOT NULL DEFAULT 'RECEIVED',
    "hubspot_contact_id" TEXT,
    "hubspot_deal_id" TEXT,
    "claimed_until" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "synced_at" TIMESTAMP(3),

    CONSTRAINT "order_syncs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sync_attempts" (
    "id" TEXT NOT NULL,
    "order_sync_id" TEXT NOT NULL,
    "attempt_number" INTEGER NOT NULL,
    "status" "SyncStatus" NOT NULL DEFAULT 'PROCESSING',
    "hubspot_contact_id" TEXT,
    "hubspot_deal_id" TEXT,
    "error_category" TEXT,
    "error_message" TEXT,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMP(3),

    CONSTRAINT "sync_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_syncs_order_id_key" ON "order_syncs"("order_id");

-- CreateIndex
CREATE INDEX "order_syncs_status_idx" ON "order_syncs"("status");

-- CreateIndex
CREATE INDEX "order_syncs_created_at_idx" ON "order_syncs"("created_at");

-- CreateIndex
CREATE INDEX "sync_attempts_order_sync_id_started_at_idx" ON "sync_attempts"("order_sync_id", "started_at" DESC);

-- CreateIndex
CREATE INDEX "sync_attempts_started_at_idx" ON "sync_attempts"("started_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "sync_attempts_order_sync_id_attempt_number_key" ON "sync_attempts"("order_sync_id", "attempt_number");

-- AddForeignKey
ALTER TABLE "sync_attempts" ADD CONSTRAINT "sync_attempts_order_sync_id_fkey" FOREIGN KEY ("order_sync_id") REFERENCES "order_syncs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
