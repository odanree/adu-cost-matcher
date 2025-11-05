import { describe, it, expect } from 'vitest';
import { formatCurrency, validateNumber } from '../src/utils/index.js';

describe('Utils', () => {
  describe('formatCurrency', () => {
    it('should format 100000 as $100,000', () => {
      expect(formatCurrency(100000)).toBe('$100,000');
    });

    it('should format 1234567 as $1,234,567', () => {
      expect(formatCurrency(1234567)).toBe('$1,234,567');
    });

    it('should format small amounts', () => {
      expect(formatCurrency(500)).toBe('$500');
    });
  });

  describe('validateNumber', () => {
    it('should return valid positive number', () => {
      expect(validateNumber(100, 'test')).toBe(100);
    });

    it('should throw error for zero', () => {
      expect(() => validateNumber(0, 'test')).toThrow('test must be a positive number');
    });

    it('should throw error for negative number', () => {
      expect(() => validateNumber(-10, 'test')).toThrow('test must be a positive number');
    });

    it('should throw error for NaN', () => {
      expect(() => validateNumber(NaN, 'test')).toThrow('test must be a positive number');
    });

    it('should throw error for non-number', () => {
      expect(() => validateNumber('100', 'test')).toThrow('test must be a positive number');
    });
  });
});
