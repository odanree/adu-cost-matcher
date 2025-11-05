/**
 * Format currency to USD
 * @param amount - Amount in dollars
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Validate numeric input
 * @param value - Value to validate
 * @param fieldName - Name of the field for error message
 * @returns Validated number
 */
export function validateNumber(value: unknown, fieldName: string): number {
  if (typeof value !== 'number' || isNaN(value) || value <= 0) {
    throw new Error(`${fieldName} must be a positive number`);
  }
  return value;
}
