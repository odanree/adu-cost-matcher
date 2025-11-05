/**
 * Calculate the total cost of ADU construction
 * @param sqft - Square footage of the ADU
 * @param bedrooms - Number of bedrooms
 * @returns Total estimated cost in USD
 */
export function calculateCost(sqft: number, bedrooms: number): number {
  if (sqft <= 0) {
    throw new Error('Square footage must be positive');
  }
  
  if (bedrooms <= 0) {
    throw new Error('Number of bedrooms must be positive');
  }
  
  const baseCost: number = sqft * 150;
  const bedroomCost: number = bedrooms * 5000;
  const totalCost: number = baseCost + bedroomCost;
  
  return totalCost;
}

/**
 * Get cost breakdown for ADU construction
 * @param sqft - Square footage of the ADU
 * @param bedrooms - Number of bedrooms
 * @returns Detailed cost breakdown
 */
export function getCostBreakdown(sqft: number, bedrooms: number): {
  base: number;
  bedrooms: number;
  total: number;
} {
  const baseCost: number = sqft * 150;
  const bedroomCost: number = bedrooms * 5000;
  const totalCost: number = baseCost + bedroomCost;
  
  return {
    base: baseCost,
    bedrooms: bedroomCost,
    total: totalCost
  };
}
