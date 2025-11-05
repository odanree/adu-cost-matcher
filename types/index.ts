// Cost per sqft tiers
export const COST_TIERS = {
  BASIC: { min: 150, max: 180, label: 'Basic' },
  STANDARD: { min: 180, max: 220, label: 'Standard' },
  PREMIUM: { min: 220, max: 280, label: 'Premium' },
  LUXURY: { min: 280, max: Infinity, label: 'Luxury' },
} as const;

export type FinishLevel = 'basic' | 'standard' | 'premium' | 'luxury';

export interface CostMatcherInput {
  costPerSqft: number; // e.g., 200
  totalSqft?: number; // e.g., 800 (optional)
  location?: string; // ZIP code (future feature)
}

export interface Material {
  type: string;
  costPerUnit?: number;
  unit?: string;
  description?: string;
}

export interface MaterialSelection {
  flooring: Material;
  countertops: Material;
  fixtures: Material;
  appliances: Material;
  roofing: Material;
  siding: Material;
  lumber: Material;
  other: Material;
}

export interface CostBreakdown {
  totalBudget: number;
  costPerSqft: number;
  finishLevel: FinishLevel;
  breakdown: {
    materials: {
      flooring: { type: string; costPerSqft: number; cost: number };
      countertops: { type: string; costPerLinearFt: number; cost: number };
      fixtures: { type: string; cost: number };
      appliances: { package: string; cost: number };
      roofing: { type: string; costPerSqft: number; cost: number };
      siding: { type: string; costPerSqft: number; cost: number };
      lumber: { cost: number };
      other: { cost: number };
      total: number;
    };
    labor: {
      framing: number;
      electrical: number;
      plumbing: number;
      hvac: number;
      finishes: number;
      total: number;
    };
    permits: {
      building: number;
      electrical: number;
      plumbing: number;
      total: number;
    };
    siteWork: {
      excavation: number;
      foundation: number;
      utilities: number;
      total: number;
    };
    contingency: number;
  };
  recommendations: string[];
  tradeoffs: string[];
}

export interface CostMatcherOutput {
  success: boolean;
  data?: CostBreakdown;
  error?: string;
}
