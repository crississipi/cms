// src/lib/validation/order.ts
// Zod schema for the incoming order webhook payload.
// Mirrors the sample payload defined in PROJECT_BLUEPRINT.md.

import { z } from "zod";

// Helper to validate that the calculated total matches the declared total using a simple decimal‑safe strategy.
interface RawOrderItem {
  qty: number;
  price: number;
}

interface RawOrderPayload {
  items: RawOrderItem[];
  total: number;
}

function totalsMatch(payload: RawOrderPayload): boolean {
  const sum = payload.items.reduce((acc: number, item: RawOrderItem) => {
    return acc + item.qty * item.price;
  }, 0);
  // Round to two decimal places (currency‑specific rounding can be added later).
  const roundedSum = Math.round(sum * 100) / 100;
  const declared = Math.round(payload.total * 100) / 100;
  return Math.abs(roundedSum - declared) < 0.0001;
}

export const orderSchema = z.object({
  event: z.literal("order.created"),
  order_id: z.string().min(1).max(64),
  created_at: z.string().refine((s) => !isNaN(Date.parse(s)), {
    message: "Invalid ISO8601 timestamp",
  }),
  customer: z.object({
    email: z.string().email(),
    first_name: z.string().min(1).max(64),
    last_name: z.string().min(1).max(64),
    phone: z.string().optional().refine((p) => !p || p.length <= 32, {
      message: "Phone too long",
    }),
  }),
  items: z
    .array(
      z.object({
        sku: z.string().min(1).max(32),
        name: z.string().min(1).max(128),
        qty: z.number().int().positive().max(1000),
        price: z.number().nonnegative().max(1_000_000),
      })
    )
    .min(1)
    .max(100),
  currency: z.string().length(3),
  total: z.number().nonnegative().max(1_000_000),
})
  .refine((data) => totalsMatch(data), {
    message: "Line‑item total does not match declared total",
    path: ["total"],
  });

export type OrderPayload = z.infer<typeof orderSchema>;
