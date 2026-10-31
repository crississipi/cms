import { z } from "zod";

export const customerSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email()
    .max(255),
  first_name: z.string().trim().min(1).max(100),
  last_name: z.string().trim().min(1).max(100),
  phone: z.string().trim().max(50).optional(),
});

export const orderItemSchema = z.object({
  sku: z.string().trim().min(1).max(100),
  name: z.string().trim().min(1).max(255),
  qty: z.number().int().positive().max(10000),
  price: z.number().finite().nonnegative(),
});

export const orderSchema = z.object({
  event: z.literal("order.created"),
  order_id: z.string().trim().min(1).max(100),
  created_at: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)) && /T.*[+-]\d{2}:\d{2}|Z$/i.test(val), {
      message: "created_at must be an ISO date-time string with timezone offset",
    }),
  customer: customerSchema,
  items: z.array(orderItemSchema).min(1).max(100),
  currency: z.string().trim().length(3).regex(/^[A-Z]{3}$/),
  total: z.number().finite().nonnegative(),
});

export type OrderPayload = z.infer<typeof orderSchema>;
export type CustomerPayload = z.infer<typeof customerSchema>;
export type OrderItemPayload = z.infer<typeof orderItemSchema>;

/**
 * Checks if the sum of line item totals equals the order total within a minor currency unit tolerance (0.01).
 */
export function totalsMatch(order: OrderPayload): boolean {
  const lineSum = order.items.reduce((acc, item) => {
    // minor units (cents)
    const itemMinor = Math.round(item.price * 100) * item.qty;
    return acc + itemMinor;
  }, 0);

  const totalMinor = Math.round(order.total * 100);
  return Math.abs(lineSum - totalMinor) <= 1; // 1 cent rounding tolerance
}
