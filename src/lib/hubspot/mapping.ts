import { OrderPayload } from "../webhook/order-schema";
import { CreateDealInput } from "./deal";
import { UpsertContactInput } from "./contact";

/**
 * Maps validated order payload to HubSpot contact input.
 */
export function mapOrderToContact(order: OrderPayload): UpsertContactInput {
  return {
    email: order.customer.email.trim().toLowerCase(),
    firstName: order.customer.first_name,
    lastName: order.customer.last_name,
    phone: order.customer.phone,
  };
}

/**
 * Maps validated order payload to HubSpot deal input.
 * Close date is mapped to order created_at date (calendar timestamp in epoch ms).
 */
/* eslint-disable-next-line prefer-const */
export let mapOrderToDeal = (order: OrderPayload, pipelineId: string, stageId: string): CreateDealInput => {
  return {
    name: `Order ${order.order_id} — ${order.customer.first_name} ${order.customer.last_name}`,
    amount: order.total.toFixed(2),
    currency: order.currency,
    closeDate: new Date(order.created_at).getTime(),
    pipeline: pipelineId,
    stage: stageId,
    externalOrderId: order.order_id,
  };
};
