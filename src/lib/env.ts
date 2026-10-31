import { z } from "zod";

// Ensure this module cannot execute in client-side bundles
// Ensure this module cannot execute in client-side bundles
if (typeof window !== "undefined") {
  throw new Error("Security violation: Server environment module cannot be executed on the client.");
}

const envSchema = z.object({
  // Database (Aiven PostgreSQL with TLS)
  DTBASE_URL: z.string().min(1, "DTBASE_URL is required"),
  DIRECT_DTBASE_URL: z.string().optional(),

  // HubSpot CRM
  HUBSPOT_ACCESS_TOKEN: z.string().min(1, "HUBSPOT_ACCESS_TOKEN is required"),
  HUBSPOT_API_VERSION: z.string().default("2026-09"),
  HUBSPOT_PIPELINE_ID: z.string().min(1, "HUBSPOT_PIPELINE_ID is required"),
  HUBSPOT_DEAL_STAGE_ID: z.string().min(1, "HUBSPOT_DEAL_STAGE_ID is required"),

  // Webhook Security
  ORDER_WEBHOOK_SECRET: z.string().min(1, "ORDER_WEBHOOK_SECRET is required"),
  ORDER_SIGNATURE_HEADER: z.string().default("x-order-signature"),
  MAX_REQUEST_BYTES: z.coerce.number().positive().default(65536),

  // Dashboard Authentication
  ADMIN_USERNAME: z.string().min(1, "ADMIN_USERNAME is required"),
  ADMIN_PASSWORD_HASH: z.string().min(1, "ADMIN_PASSWORD_HASH is required"),
  AUTH_SECRET: z.string().min(32, "AUTH_SECRET must be at least 32 characters"),

  // Node Environment
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | null = null;

/**
 * Validates and returns the server environment variables.
 * In test mode, fallback defaults are used if variables are unset to permit isolated unit tests.
 */
export function getEnv(overrideEnv?: Record<string, string | undefined>): Env {
  if (cachedEnv && !overrideEnv) {
    return cachedEnv;
  }

  const raw = overrideEnv ?? process.env;

  const isTest = (raw.NODE_ENV ?? process.env.NODE_ENV) === "test";

  const parsed = envSchema.safeParse({
    DTBASE_URL: raw.DTBASE_URL ?? (isTest ? "postgres://avnadmin:test@localhost:5432/test?sslmode=require" : undefined),
    DIRECT_DTBASE_URL: raw.DIRECT_DTBASE_URL,
    HUBSPOT_ACCESS_TOKEN: raw.HUBSPOT_ACCESS_TOKEN ?? (isTest ? "pat-test-placeholder" : undefined),
    HUBSPOT_API_VERSION: raw.HUBSPOT_API_VERSION ?? "2026-09",
    HUBSPOT_PIPELINE_ID: raw.HUBSPOT_PIPELINE_ID ?? (isTest ? "default" : undefined),
    HUBSPOT_DEAL_STAGE_ID: raw.HUBSPOT_DEAL_STAGE_ID ?? (isTest ? "appointmentscheduled" : undefined),
    ORDER_WEBHOOK_SECRET: raw.ORDER_WEBHOOK_SECRET ?? (isTest ? "test_webhook_secret_key" : undefined),
    ORDER_SIGNATURE_HEADER: raw.ORDER_SIGNATURE_HEADER ?? "x-order-signature",
    MAX_REQUEST_BYTES: raw.MAX_REQUEST_BYTES ?? 65536,
    ADMIN_USERNAME: raw.ADMIN_USERNAME ?? (isTest ? "admin" : undefined),
    ADMIN_PASSWORD_HASH: raw.ADMIN_PASSWORD_HASH ?? (isTest ? "test_password_hash" : undefined),
    AUTH_SECRET: raw.AUTH_SECRET ?? (isTest ? "test_session_secret_at_least_32_characters_long" : undefined),
    NODE_ENV: raw.NODE_ENV ?? process.env.NODE_ENV ?? "development",
  });

  if (!parsed.success) {
    const missingKeys = parsed.error.issues.map((issue) => issue.path.join(".")).join(", ");
    throw new Error(`Environment validation failed. Missing or invalid variables: ${missingKeys}`);
  }

  if (!overrideEnv) {
    cachedEnv = parsed.data;
  }

  return parsed.data;
}
