import { describe, it, expect } from 'vitest';
import { calculateCost, getCostBreakdown } from '../src/calculator/index.js';

describe('Calculator', () => {
  describe('calculateCost', () => {
    it('should calculate cost for 800 sqft with 2 bedrooms', () => {
      const result = calculateCost(800, 2);
      expect(result).toBe(130000); // 800 * 150 + 2 * 5000
    });

    it('should calculate cost for 1200 sqft with 3 bedrooms', () => {
      const result = calculateCost(1200, 3);
      expect(result).toBe(195000); // 1200 * 150 + 3 * 5000
    });

    it('should throw error for zero sqft', () => {
      expect(() => calculateCost(0, 2)).toThrow('Square footage must be positive');
    });

    it('should throw error for negative sqft', () => {
      expect(() => calculateCost(-100, 2)).toThrow('Square footage must be positive');
    });

    it('should throw error for zero bedrooms', () => {
      expect(() => calculateCost(800, 0)).toThrow('Number of bedrooms must be positive');
    });

    it('should throw error for negative bedrooms', () => {
      expect(() => calculateCost(800, -1)).toThrow('Number of bedrooms must be positive');
    });
  });

  describe('getCostBreakdown', () => {
    it('should return detailed cost breakdown', () => {
      const result = getCostBreakdown(1000, 2);
      expect(result).toEqual({
        base: 150000,
        bedrooms: 10000,
        total: 160000
      });
    });

    it('should calculate breakdown for different inputs', () => {
      const result = getCostBreakdown(600, 1);
      expect(result).toEqual({
        base: 90000,
        bedrooms: 5000,
        total: 95000
      });
    });
  });
});
