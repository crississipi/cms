// src/lib/prisma.ts
import { PrismaClient } from "@/src/generated/prisma";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Prevent execution in client-side bundles.
if (typeof window !== "undefined") {
  throw new Error("Security violation: Prisma client cannot be used on the client side.");
}

/**
 * Reusable PrismaClient singleton for Next.js.
 *
 * In development, Next.js hot-reloads cause modules to re-execute.
 * We store the instance on `globalThis` to prevent creating a new
 * connection pool on every reload. In production, a single module-level
 * instance is sufficient.
 *
 * Uses the Prisma 7 driver adapter pattern with node-postgres (pg).
 * The `DATABASE_URL` environment variable must include ?sslmode=require
 * (or stricter) for Aiven PostgreSQL connections.
 */

type GlobalPrisma = {
  __prisma?: PrismaClient;
};

const globalForPrisma = globalThis as unknown as GlobalPrisma;

function createPrismaClient(): PrismaClient {
  const connectionString =
    process.env.DTBASE_URL ||
    process.env.DATABASE_URL ||
    // Local fallback for development/testing when a real Aiven DB is unavailable.
    (process.env.NODE_ENV === "production" ? undefined : "postgres://test:test@localhost:5432/test?sslmode=require");

  if (!connectionString) {
    throw new Error("DATABASE_URL or DTBASE_URL environment variable is not set.");
  }

  // If sslmode=no-verify is present or rejectUnauthorized is not strictly required by the local env,
  // allow connecting to cloud PostgreSQL (e.g. Aiven) when custom CA certs aren't in system store.
  const isNoVerify = connectionString.includes("sslmode=no-verify") || !process.env.NODE_EXTRA_CA_CERTS;
  const isSslDisabled = connectionString.includes("sslmode=disable");

  const pool = new Pool({
    connectionString,
    ssl: isSslDisabled ? false : { rejectUnauthorized: !isNoVerify },
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export const prisma = globalForPrisma.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__prisma = prisma;
}
