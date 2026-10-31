// src/lib/hubspot/client.ts
import { getEnv } from "../env";
import { HubSpotError } from "./error";

/**
 * Simple typed fetch wrapper for HubSpot CRM API.
 * Uses the environment variables:
 *   HUBSPOT_ACCESS_TOKEN – private app token (server‑only)
 *   HUBSPOT_API_VERSION – e.g. "2026-09"
 *   NODE_ENV – to set shorter timeout in tests.
 */
export async function hubspotRequest<T>(
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
  path: string,
  body?: unknown,
): Promise<T> {
  const { HUBSPOT_ACCESS_TOKEN, HUBSPOT_API_VERSION } = getEnv();
  const base = `https://api.hubapi.com/crm/v3/objects`;
  const url = `${base}/${path}?${new URLSearchParams({ version: HUBSPOT_API_VERSION }).toString()}`;

  const controller = new AbortController();
  const timeout = Number(process.env.NODE_ENV === "test" ? 1000 : 10000);
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const init: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
    },
    signal: controller.signal,
  };

  if (body !== undefined) {
    init.body = JSON.stringify(body);
  }

  let response: Response;
  try {
    response = await fetch(url, init);
  } catch {
    clearTimeout(timeoutId);
    // Network error or abort -> treat as retryable
    throw new HubSpotError({
      status: 0,
      retryable: true,
      message: "Network error or request timeout",
    });
  }
  clearTimeout(timeoutId);

  const retryAfterHeader = response.headers.get("Retry-After");
  const retryAfter = retryAfterHeader ? Number(retryAfterHeader) : undefined;

  const isRetryable = response.status === 429 || (response.status >= 500 && response.status < 600);

  if (!response.ok) {
    let safeMessage = `HubSpot API error ${response.status}`;
    try {
      const errBody = await response.json();
      if (errBody?.message) safeMessage += `: ${errBody.message}`;
    } catch { /* ignore parsing errors */ }
    throw new HubSpotError({
      status: response.status,
      retryable: isRetryable,
      retryAfter,
      message: safeMessage,
    });
  }

  // Successful response – parse JSON safely
  const data = (await response.json()) as T;
  return data;
}
