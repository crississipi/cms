import path from "node:path";
import { defineConfig } from "prisma/config";

// Load .env in development/test; in production, env vars are set by the platform.
// Prisma 7 does not auto-load .env — the config file is responsible.
let envLoaded = false;
try {
  // Use dynamic import to avoid a hard dependency on dotenv at runtime.
  // dotenv is a devDependency only.
  const dotenv = await import("dotenv");
  dotenv.config({ path: path.resolve(import.meta.dirname, ".env") });
  envLoaded = true;
} catch {
  // dotenv not installed or .env not present — expected in production/CI.
}

export default defineConfig({
  // earlyAccess: true,
  schema: path.resolve(import.meta.dirname, "prisma/schema.prisma"),



  // Runtime connection (may use a connection pooler like PgBouncer).
  // For Aiven PostgreSQL, this should include ?sslmode=require (or stricter).
  datasource: {
    url: process.env.DTBASE_URL!,
    // directUrl is used by Prisma Migrate for DDL operations when the primary
    // URL points to a pooler that doesn't support migration commands.
    // Only set DIRECT_URL if your Aiven setup uses a separate pooler.
    // directUrl: process.env.DIRECT_DTBASE_URL || undefined,
  },
});
