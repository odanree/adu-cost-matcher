/**
 * API Request types
 */
export interface CalculateRequest {
  sqft: number;
  bedrooms: number;
}

/**
 * API Response types
 */
export interface CalculateResponse {
  sqft: number;
  bedrooms: number;
  costs: {
    base: number;
    bedrooms: number;
    total: number;
  };
}

/**
 * Error response type
 */
export interface ErrorResponse {
  error: string;
}
