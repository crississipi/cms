// src/lib/hubspot/error.ts

export interface HubSpotErrorOptions {
  status: number;
  retryable: boolean;
  retryAfter?: number;
  message: string;
}

export class HubSpotError extends Error {
  public readonly status: number;
  public readonly retryable: boolean;
  public readonly retryAfter?: number;

  constructor(options: HubSpotErrorOptions) {
    super(options.message);
    this.name = "HubSpotError";
    this.status = options.status;
    this.retryable = options.retryable;
    this.retryAfter = options.retryAfter;
    Object.setPrototypeOf(this, HubSpotError.prototype);
  }
}
