import { hubspotRequest } from "./client";
import { HubSpotError } from "./error";

export interface ContactProperties {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
}

export interface HubSpotContactResponse {
  id: string;
  properties: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}

interface HubSpotSearchResponse {
  total: number;
  results: HubSpotContactResponse[];
}

/* eslint-disable-next-line prefer-const */
export let searchContactByEmail = async (email: string): Promise<HubSpotContactResponse | null> => {
  const normalizedEmail = email.trim().toLowerCase();

  const searchPayload = {
    filterGroups: [
      {
        filters: [
          {
            propertyName: "email",
            operator: "EQ",
            value: normalizedEmail,
          },
        ],
      },
    ],
    properties: ["email", "firstname", "lastname", "phone"],
    limit: 1,
  };

  const response = await hubspotRequest<HubSpotSearchResponse>(
    "POST",
    "contacts/search",
    searchPayload,
  );

  if (response.results && response.results.length > 0) {
    return response.results[0];
  }

  return null;
}

/* eslint-disable-next-line prefer-const */
export let createContact = async (properties: ContactProperties): Promise<HubSpotContactResponse> => {
  return hubspotRequest<HubSpotContactResponse>("POST", "contacts", { properties });
}

export async function updateContact(
  contactId: string,
  properties: Partial<ContactProperties>,
): Promise<HubSpotContactResponse> {
  return hubspotRequest<HubSpotContactResponse>("PATCH", `contacts/${encodeURIComponent(contactId)}`, {
    properties,
  });
}

export interface UpsertContactInput {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  hubspotId?: string;
}

/* eslint-disable-next-line prefer-const */
export let createOrUpdateContact = async (input: UpsertContactInput): Promise<HubSpotContactResponse> => {
  const normalizedEmail = input.email.trim().toLowerCase();

  // Try to find an existing contact by email
  const existing = await searchContactByEmail(normalizedEmail);
  if (existing) {
    const updateProps: Record<string, string> = {};
    if (input.firstName !== undefined) updateProps.firstname = input.firstName;
    if (input.lastName !== undefined) updateProps.lastname = input.lastName;
    if (input.phone !== undefined) updateProps.phone = input.phone;

    if (Object.keys(updateProps).length > 0) {
      return await updateContact(existing.id, updateProps);
    }
    return existing;
  }

  // No existing contact – create a new one
  const createProps: ContactProperties = {
    email: normalizedEmail,
    ...(input.firstName ? { firstname: input.firstName } : {}),
    ...(input.lastName ? { lastname: input.lastName } : {}),
    ...(input.phone ? { phone: input.phone } : {}),
  };

  try {
    return await createContact(createProps);
  } catch (error) {
    // Race condition: another process may have created the contact concurrently
    if (error instanceof HubSpotError && error.status === 409) {
      const retry = await searchContactByEmail(normalizedEmail);
      if (retry) return retry;
    }
    throw error;
  }
};;
  