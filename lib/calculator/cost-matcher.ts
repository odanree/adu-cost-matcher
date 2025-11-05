import type {
  CostMatcherInput,
  CostMatcherOutput,
  CostBreakdown,
  FinishLevel,
} from '@/types/index';
import { COST_TIERS } from '@/types/index';

// Material pricing by finish level
const MATERIAL_PRICING = {
  basic: {
    flooring: { type: 'Vinyl Plank', costPerSqft: 5 },
    countertops: { type: 'Laminate', costPerLinearFt: 25 },
    fixtures: { type: 'Builder Grade', totalCost: 800 },
    appliances: { package: 'Basic', totalCost: 1800 },
    roofing: { type: 'Asphalt Shingles', costPerSqft: 8 },
    siding: { type: 'Vinyl', costPerSqft: 4 },
  },
  standard: {
    flooring: { type: 'Engineered Hardwood', costPerSqft: 8 },
    countertops: { type: 'Quartz', costPerLinearFt: 70 },
    fixtures: { type: 'Mid-range', totalCost: 1300 },
    appliances: { package: 'Standard', totalCost: 3000 },
    roofing: { type: 'Architectural Shingles', costPerSqft: 12 },
    siding: { type: 'Fiber Cement', costPerSqft: 7 },
  },
  premium: {
    flooring: { type: 'Solid Hardwood', costPerSqft: 12 },
    countertops: { type: 'Granite', costPerLinearFt: 110 },
    fixtures: { type: 'High-end', totalCost: 2500 },
    appliances: { package: 'Premium', totalCost: 5000 },
    roofing: { type: 'Metal Roof', costPerSqft: 15 },
    siding: { type: 'Wood or Brick', costPerSqft: 12 },
  },
  luxury: {
    flooring: { type: 'Custom Exotic Hardwood', costPerSqft: 16 },
    countertops: { type: 'Marble', costPerLinearFt: 150 },
    fixtures: { type: 'Designer Grade', totalCost: 4000 },
    appliances: { package: 'Luxury', totalCost: 7000 },
    roofing: { type: 'Premium Metal/Tile', costPerSqft: 20 },
    siding: { type: 'Premium Material', costPerSqft: 15 },
  },
} as const;

// Budget allocation percentages (can vary slightly by finish level)
const BUDGET_ALLOCATION = {
  materials: 0.38,
  labor: 0.33,
  permits: 0.1,
  siteWork: 0.12,
  contingency: 0.07,
} as const;

// Default sqft if not provided
const DEFAULT_SQFT: number = 800;

// Typical countertop linear feet for 800 sqft ADU
const TYPICAL_COUNTERTOP_LF: number = 15;

/**
 * Determine finish level based on cost per sqft
 */
function determineFinishLevel(costPerSqft: number): FinishLevel {
  if (costPerSqft >= COST_TIERS.LUXURY.min) return 'luxury';
  if (costPerSqft >= COST_TIERS.PREMIUM.min) return 'premium';
  if (costPerSqft >= COST_TIERS.STANDARD.min) return 'standard';
  return 'basic';
}

/**
 * Get material selection for a given finish level
 */
function getMaterialSelection(finishLevel: FinishLevel) {
  return MATERIAL_PRICING[finishLevel];
}

/**
 * Calculate material costs based on sqft and finish level
 */
function calculateMaterialCosts(
  totalSqft: number,
  finishLevel: FinishLevel,
  materialsAllocation: number
) {
  const materials = getMaterialSelection(finishLevel);

  // Flooring: per sqft
  const flooringCost: number = materials.flooring.costPerSqft * totalSqft;

  // Countertops: linear feet (estimate ~15 lf for 800 sqft)
  const countertopLf: number = (totalSqft / DEFAULT_SQFT) * TYPICAL_COUNTERTOP_LF;
  const countertopCost: number = materials.countertops.costPerLinearFt * countertopLf;

  // Fixtures: fixed cost
  const fixturesCost: number = materials.fixtures.totalCost;

  // Appliances: fixed cost
  const appliancesCost: number = materials.appliances.totalCost;

  // Roofing: per sqft
  const roofingCost: number = materials.roofing.costPerSqft * totalSqft;

  // Siding: per sqft (typically ~1.2x sqft for wall area)
  const wallArea: number = totalSqft * 1.2;
  const sidingCost: number = materials.siding.costPerSqft * wallArea;

  // Lumber: estimate as percentage of material costs so far
  const materialSubtotal: number =
    flooringCost +
    countertopCost +
    fixturesCost +
    appliancesCost +
    roofingCost +
    sidingCost;
  const lumberCost: number = materialSubtotal * 0.15; // 15% of other materials

  // Other: remaining from allocation
  const totalCalcMaterials: number =
    materialSubtotal + lumberCost;
  const otherCost: number = Math.max(0, materialsAllocation - totalCalcMaterials);

  return {
    flooring: {
      type: materials.flooring.type,
      costPerSqft: materials.flooring.costPerSqft,
      cost: flooringCost,
    },
    countertops: {
      type: materials.countertops.type,
      costPerLinearFt: materials.countertops.costPerLinearFt,
      cost: countertopCost,
    },
    fixtures: {
      type: materials.fixtures.type,
      cost: fixturesCost,
    },
    appliances: {
      package: materials.appliances.package,
      cost: appliancesCost,
    },
    roofing: {
      type: materials.roofing.type,
      costPerSqft: materials.roofing.costPerSqft,
      cost: roofingCost,
    },
    siding: {
      type: materials.siding.type,
      costPerSqft: materials.siding.costPerSqft,
      cost: sidingCost,
    },
    lumber: {
      cost: lumberCost,
    },
    other: {
      cost: otherCost,
    },
    total: flooringCost + countertopCost + fixturesCost + appliancesCost + roofingCost + sidingCost + lumberCost + otherCost,
  };
}

/**
 * Calculate labor costs as percentage of total budget
 */
function calculateLaborCosts(laborAllocation: number) {
  return {
    framing: laborAllocation * 0.3,
    electrical: laborAllocation * 0.2,
    plumbing: laborAllocation * 0.2,
    hvac: laborAllocation * 0.15,
    finishes: laborAllocation * 0.15,
    total: laborAllocation,
  };
}

/**
 * Calculate permit costs
 */
function calculatePermitCosts(permitAllocation: number) {
  return {
    building: permitAllocation * 0.5,
    electrical: permitAllocation * 0.25,
    plumbing: permitAllocation * 0.25,
    total: permitAllocation,
  };
}

/**
 * Calculate site work costs
 */
function calculateSiteWorkCosts(siteWorkAllocation: number) {
  return {
    excavation: siteWorkAllocation * 0.35,
    foundation: siteWorkAllocation * 0.4,
    utilities: siteWorkAllocation * 0.25,
    total: siteWorkAllocation,
  };
}

/**
 * Generate recommendations based on finish level
 */
function generateRecommendations(finishLevel: FinishLevel): string[] {
  const recommendations: Record<FinishLevel, string[]> = {
    basic: [
      'Vinyl plank flooring for durability and easy maintenance',
      'Laminate countertops - budget-friendly and practical',
      'Builder-grade fixtures and basic appliance package',
      'Asphalt shingles roofing',
      'Vinyl siding for low maintenance',
    ],
    standard: [
      'Engineered hardwood flooring for warmth and durability',
      'Quartz countertops - good balance of durability and aesthetics',
      'Mid-range fixtures and standard appliances',
      'Architectural shingles for enhanced appearance',
      'Fiber cement siding for better longevity',
    ],
    premium: [
      'Solid hardwood flooring for premium look and feel',
      'Granite countertops for elegant appearance',
      'High-end fixtures and premium appliances',
      'Metal roof for durability and modern look',
      'Wood or brick siding for premium aesthetics',
    ],
    luxury: [
      'Custom exotic hardwood flooring for unique character',
      'Marble countertops for luxury finish',
      'Designer-grade fixtures and luxury appliances',
      'Premium metal or tile roofing',
      'Premium materials for siding',
    ],
  };
  return recommendations[finishLevel] || [];
}

/**
 * Generate tradeoffs based on finish level
 */
function generateTradeoffs(finishLevel: FinishLevel): string[] {
  const tradeoffs: Record<FinishLevel, string[]> = {
    basic: [
      'Vinyl flooring vs hardwood - less durable but low maintenance',
      'Laminate countertops - can stain and may need replacement',
      'Builder-grade fixtures - limited style options',
      'Basic appliances - standard features only',
    ],
    standard: [
      'Engineered wood - not solid hardwood but more stable',
      'Quartz - requires professional maintenance if damaged',
      'Mid-range appliances - fewer premium features',
      'Fiber cement - requires periodic maintenance',
    ],
    premium: [
      'Solid hardwood - requires periodic refinishing',
      'Granite - needs sealing and careful maintenance',
      'Higher maintenance costs due to premium materials',
      'Limited upgrades available at this price point',
    ],
    luxury: [
      'Premium materials require expert maintenance',
      'Limited customization without exceeding budget',
      'May need specialized contractors for repairs',
      'Highest maintenance and care requirements',
    ],
  };
  return tradeoffs[finishLevel] || [];
}

/**
 * Main cost matcher function
 */
export function calculateADUCost(input: CostMatcherInput): CostMatcherOutput {
  try {
    // Validate input
    if (input.costPerSqft <= 0) {
      return {
        success: false,
        error: 'Cost per sqft must be greater than 0',
      };
    }

    const totalSqft: number = input.totalSqft || DEFAULT_SQFT;
    const costPerSqft: number = input.costPerSqft;
    const totalBudget: number = costPerSqft * totalSqft;

    // Determine finish level
    const finishLevel: FinishLevel = determineFinishLevel(costPerSqft);

    // Calculate budget allocations
    const materialsAllocation: number = totalBudget * BUDGET_ALLOCATION.materials;
    const laborAllocation: number = totalBudget * BUDGET_ALLOCATION.labor;
    const permitAllocation: number = totalBudget * BUDGET_ALLOCATION.permits;
    const siteWorkAllocation: number = totalBudget * BUDGET_ALLOCATION.siteWork;
    const contingencyAllocation: number = totalBudget * BUDGET_ALLOCATION.contingency;

    // Calculate detailed costs
    const materials = calculateMaterialCosts(
      totalSqft,
      finishLevel,
      materialsAllocation
    );
    const labor = calculateLaborCosts(laborAllocation);
    const permits = calculatePermitCosts(permitAllocation);
    const siteWork = calculateSiteWorkCosts(siteWorkAllocation);

    const breakdown: CostBreakdown = {
      totalBudget,
      costPerSqft,
      finishLevel,
      breakdown: {
        materials,
        labor,
        permits,
        siteWork,
        contingency: contingencyAllocation,
      },
      recommendations: generateRecommendations(finishLevel),
      tradeoffs: generateTradeoffs(finishLevel),
    };

    return {
      success: true,
      data: breakdown,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: `Failed to calculate ADU cost: ${errorMessage}`,
    };
  }
}
