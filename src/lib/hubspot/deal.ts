import { hubspotRequest } from "./client";

export interface DealProperties {
  dealname: string;
  amount: string;
  dealstage: string;
  pipeline: string;
  closedate: string; // ISO date string or epoch ms string
  external_order_id?: string;
  [key: string]: string | undefined;
}

export interface HubSpotDealResponse {
  id: string;
  properties: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}

interface HubSpotSearchResponse {
  total: number;
  results: HubSpotDealResponse[];
}

/* eslint-disable-next-line prefer-const */
export let searchDealByExternalId = async (externalOrderId: string): Promise<HubSpotDealResponse | null> => {
  const searchPayload = {
    filterGroups: [
      {
        filters: [
          {
            propertyName: "external_order_id",
            operator: "EQ",
            value: externalOrderId,
          },
        ],
      },
    ],
    properties: ["dealname", "amount", "dealstage", "pipeline", "closedate", "external_order_id"],
    limit: 1,
  };

  try {
    const response = await hubspotRequest<HubSpotSearchResponse>("POST", "deals/search", searchPayload);
    if (response.results && response.results.length > 0) {
      return response.results[0];
    }
    return null;
  } catch {
    // If the custom property doesn't exist on HubSpot portal yet, search may return 400.
    // Documented assumption: gracefully return null if search fails due to unindexed/missing custom property.
    return null;
  }
}

export interface CreateDealInput {
  name: string;
  amount: string;
  currency?: string;
  closeDate: number; // epoch ms
  pipeline: string;
  stage: string;
  externalOrderId: string;
}

/* eslint-disable-next-line prefer-const */
export let createDeal = async (input: CreateDealInput): Promise<HubSpotDealResponse> => {
  const properties: Record<string, string> = {
    dealname: input.name,
    amount: input.amount,
    pipeline: input.pipeline,
    dealstage: input.stage,
    closedate: input.closeDate.toString(),
    external_order_id: input.externalOrderId,
  };

  return hubspotRequest<HubSpotDealResponse>("POST", "deals", { properties });
}

/**
 * Associates a Deal with a Contact using HubSpot v3 / v4 associations API convention.
 */
export async function associateDealWithContact(dealId: string, contactId: string): Promise<void> {
  // Using HubSpot CRM associations API: PUT /crm/v3/objects/deals/{dealId}/associations/contacts/{contactId}/deal_to_contact
  await hubspotRequest<unknown>(
    "PUT",
    `deals/${encodeURIComponent(dealId)}/associations/contacts/${encodeURIComponent(contactId)}/deal_to_contact`,
  );
}
