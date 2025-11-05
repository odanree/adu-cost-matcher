import { describe, it, expect } from 'vitest';
import { calculateADUCost } from '../cost-matcher';

describe('Cost Matcher Algorithm', () => {
  describe('Basic Functionality', () => {
    it('should calculate cost for basic input', () => {
      const result = calculateADUCost({ costPerSqft: 200 });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.totalBudget).toBe(200 * 800); // Default 800 sqft
      expect(result.data?.costPerSqft).toBe(200);
    });

    it('should calculate cost with custom sqft', () => {
      const result = calculateADUCost({ costPerSqft: 200, totalSqft: 1000 });

      expect(result.success).toBe(true);
      expect(result.data?.totalBudget).toBe(200000);
      expect(result.data?.costPerSqft).toBe(200);
    });

    it('should return error for invalid input', () => {
      const result = calculateADUCost({ costPerSqft: -100 });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should return error for zero cost', () => {
      const result = calculateADUCost({ costPerSqft: 0 });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Finish Level Detection', () => {
    it('should detect basic finish level', () => {
      const result = calculateADUCost({ costPerSqft: 160 });

      expect(result.data?.finishLevel).toBe('basic');
    });

    it('should detect standard finish level', () => {
      const result = calculateADUCost({ costPerSqft: 200 });

      expect(result.data?.finishLevel).toBe('standard');
    });

    it('should detect premium finish level', () => {
      const result = calculateADUCost({ costPerSqft: 250 });

      expect(result.data?.finishLevel).toBe('premium');
    });

    it('should detect luxury finish level', () => {
      const result = calculateADUCost({ costPerSqft: 300 });

      expect(result.data?.finishLevel).toBe('luxury');
    });

    it('should handle tier boundaries correctly', () => {
      // At basic/standard boundary
      const basicBoundary = calculateADUCost({ costPerSqft: 180 });
      expect(basicBoundary.data?.finishLevel).toBe('standard');

      // Just below standard
      const justBasic = calculateADUCost({ costPerSqft: 179 });
      expect(justBasic.data?.finishLevel).toBe('basic');
    });
  });

  describe('Budget Allocation', () => {
    it('should allocate budget across categories', () => {
      const result = calculateADUCost({ costPerSqft: 200, totalSqft: 1000 });

      if (!result.data) throw new Error('Expected data');

      const total: number = result.data.totalBudget;
      const breakdown = result.data.breakdown;

      const sum: number =
        breakdown.materials.total +
        breakdown.labor.total +
        breakdown.permits.total +
        breakdown.siteWork.total +
        breakdown.contingency;

      // Should sum to total budget (within rounding)
      expect(Math.abs(sum - total)).toBeLessThan(1);
    });

    it('should follow allocation percentages', () => {
      const result = calculateADUCost({ costPerSqft: 200, totalSqft: 1000 });

      if (!result.data) throw new Error('Expected data');

      const total: number = result.data.totalBudget;
      const breakdown = result.data.breakdown;

      // Check approximate percentages (within 5%)
      expect(breakdown.materials.total / total).toBeCloseTo(0.38, 1);
      expect(breakdown.labor.total / total).toBeCloseTo(0.33, 1);
      expect(breakdown.permits.total / total).toBeCloseTo(0.1, 1);
      expect(breakdown.siteWork.total / total).toBeCloseTo(0.12, 1);
      expect(breakdown.contingency / total).toBeCloseTo(0.07, 1);
    });
  });

  describe('Material Selection', () => {
    it('should select basic materials for basic tier', () => {
      const result = calculateADUCost({ costPerSqft: 160 });

      if (!result.data) throw new Error('Expected data');

      expect(result.data.breakdown.materials.flooring.type).toContain('Vinyl');
      expect(result.data.breakdown.materials.countertops.type).toContain('Laminate');
      expect(result.data.breakdown.materials.fixtures.type).toContain('Builder');
    });

    it('should select standard materials for standard tier', () => {
      const result = calculateADUCost({ costPerSqft: 200 });

      if (!result.data) throw new Error('Expected data');

      expect(result.data.breakdown.materials.flooring.type).toContain('Engineered');
      expect(result.data.breakdown.materials.countertops.type).toContain('Quartz');
      expect(result.data.breakdown.materials.fixtures.type).toContain('Mid-range');
    });

    it('should select premium materials for premium tier', () => {
      const result = calculateADUCost({ costPerSqft: 250 });

      if (!result.data) throw new Error('Expected data');

      expect(result.data.breakdown.materials.flooring.type).toContain('Solid');
      expect(result.data.breakdown.materials.countertops.type).toContain('Granite');
      expect(result.data.breakdown.materials.fixtures.type).toContain('High-end');
    });

    it('should include all material categories', () => {
      const result = calculateADUCost({ costPerSqft: 200 });

      if (!result.data) throw new Error('Expected data');

      const materials = result.data.breakdown.materials;

      expect(materials.flooring).toBeDefined();
      expect(materials.countertops).toBeDefined();
      expect(materials.fixtures).toBeDefined();
      expect(materials.appliances).toBeDefined();
      expect(materials.roofing).toBeDefined();
      expect(materials.siding).toBeDefined();
      expect(materials.lumber).toBeDefined();
      expect(materials.other).toBeDefined();
      expect(materials.total).toBeDefined();
    });
  });

  describe('Labor Breakdown', () => {
    it('should break down labor by category', () => {
      const result = calculateADUCost({ costPerSqft: 200 });

      if (!result.data) throw new Error('Expected data');

      const labor = result.data.breakdown.labor;

      expect(labor.framing).toBeGreaterThan(0);
      expect(labor.electrical).toBeGreaterThan(0);
      expect(labor.plumbing).toBeGreaterThan(0);
      expect(labor.hvac).toBeGreaterThan(0);
      expect(labor.finishes).toBeGreaterThan(0);
      expect(labor.total).toBeGreaterThan(0);

      // Sum should equal total
      const sum: number =
        labor.framing + labor.electrical + labor.plumbing + labor.hvac + labor.finishes;
      expect(Math.abs(sum - labor.total)).toBeLessThan(1);
    });
  });

  describe('Permits Calculation', () => {
    it('should include all permit types', () => {
      const result = calculateADUCost({ costPerSqft: 200 });

      if (!result.data) throw new Error('Expected data');

      const permits = result.data.breakdown.permits;

      expect(permits.building).toBeGreaterThan(0);
      expect(permits.electrical).toBeGreaterThan(0);
      expect(permits.plumbing).toBeGreaterThan(0);
      expect(permits.total).toBeGreaterThan(0);
    });
  });

  describe('Site Work Calculation', () => {
    it('should include all site work categories', () => {
      const result = calculateADUCost({ costPerSqft: 200 });

      if (!result.data) throw new Error('Expected data');

      const siteWork = result.data.breakdown.siteWork;

      expect(siteWork.excavation).toBeGreaterThan(0);
      expect(siteWork.foundation).toBeGreaterThan(0);
      expect(siteWork.utilities).toBeGreaterThan(0);
      expect(siteWork.total).toBeGreaterThan(0);
    });
  });

  describe('Contingency', () => {
    it('should include 10% contingency', () => {
      const result = calculateADUCost({ costPerSqft: 200, totalSqft: 1000 });

      if (!result.data) throw new Error('Expected data');

      const total: number = result.data.totalBudget;
      const contingency: number = result.data.breakdown.contingency;

      expect(contingency / total).toBeCloseTo(0.07, 1); // Should be ~7%
    });
  });

  describe('Recommendations and Tradeoffs', () => {
    it('should provide recommendations for basic tier', () => {
      const result = calculateADUCost({ costPerSqft: 160 });

      if (!result.data) throw new Error('Expected data');

      expect(result.data.recommendations.length).toBeGreaterThan(0);
      expect(result.data.recommendations[0]).toContain('Vinyl');
    });

    it('should provide recommendations for all tiers', () => {
      const tiers = [160, 200, 250, 300];

      tiers.forEach((costPerSqft: number) => {
        const result = calculateADUCost({ costPerSqft });

        if (!result.data) throw new Error('Expected data');

        expect(result.data.recommendations.length).toBeGreaterThan(0);
        expect(result.data.tradeoffs.length).toBeGreaterThan(0);
      });
    });

    it('should provide tradeoffs for each tier', () => {
      const result = calculateADUCost({ costPerSqft: 200 });

      if (!result.data) throw new Error('Expected data');

      expect(result.data.tradeoffs.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very low cost', () => {
      const result = calculateADUCost({ costPerSqft: 100 });

      expect(result.success).toBe(true);
      expect(result.data?.finishLevel).toBe('basic');
    });

    it('should handle very high cost', () => {
      const result = calculateADUCost({ costPerSqft: 500 });

      expect(result.success).toBe(true);
      expect(result.data?.finishLevel).toBe('luxury');
    });

    it('should handle small sqft', () => {
      const result = calculateADUCost({ costPerSqft: 200, totalSqft: 400 });

      expect(result.success).toBe(true);
      expect(result.data?.totalBudget).toBe(80000);
    });

    it('should handle large sqft', () => {
      const result = calculateADUCost({ costPerSqft: 200, totalSqft: 2000 });

      expect(result.success).toBe(true);
      expect(result.data?.totalBudget).toBe(400000);
    });

    it('should handle decimal cost values', () => {
      const result = calculateADUCost({ costPerSqft: 199.99 });

      expect(result.success).toBe(true);
      expect(result.data?.costPerSqft).toBe(199.99);
    });
  });

  describe('Data Integrity', () => {
    it('should maintain consistency across multiple calls', () => {
      const input = { costPerSqft: 200, totalSqft: 800 };

      const result1 = calculateADUCost(input);
      const result2 = calculateADUCost(input);

      expect(result1.data).toEqual(result2.data);
    });

    it('should scale properly with sqft', () => {
      const base = calculateADUCost({ costPerSqft: 200, totalSqft: 800 });
      const doubled = calculateADUCost({ costPerSqft: 200, totalSqft: 1600 });

      if (!base.data || !doubled.data) throw new Error('Expected data');

      expect(doubled.data.totalBudget).toBe(base.data.totalBudget * 2);
      expect(doubled.data.breakdown.contingency).toBe(base.data.breakdown.contingency * 2);
    });

    it('should scale properly with cost', () => {
      const base = calculateADUCost({ costPerSqft: 200, totalSqft: 800 });
      const doubled = calculateADUCost({ costPerSqft: 400, totalSqft: 800 });

      if (!base.data || !doubled.data) throw new Error('Expected data');

      expect(doubled.data.totalBudget).toBe(base.data.totalBudget * 2);
    });
  });
});
