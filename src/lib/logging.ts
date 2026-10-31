// src/lib/logging.ts
/**
 * Simple logging utilities used throughout the server code.
 * In production these could be replaced with a structured logger
 * (e.g., pino, winston) but for the demo we keep it lightweight.
 * All log messages are written to console with a timestamp and
 * a log level prefix. Sensitive data (secrets, full payloads) are
 * never logged – callers should redact themselves.
 */

function timestamp(): string {
  return new Date().toISOString();
}

export const logger = {
  info: (msg: string, ...args: unknown[]) => {
    console.info(`[${timestamp()}] INFO: ${msg}`, ...args);
  },
  warn: (msg: string, ...args: unknown[]) => {
    console.warn(`[${timestamp()}] WARN: ${msg}`, ...args);
  },
  error: (msg: string, ...args: unknown[]) => {
    console.error(`[${timestamp()}] ERROR: ${msg}`, ...args);
  },
};
