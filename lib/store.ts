import { create } from 'zustand';
import type { CostBreakdown } from '@/types/index';
import { calculateADUCost } from '@/lib/calculator/cost-matcher';

interface CalculatorState {
  costPerSqft: number;
  totalSqft: number;
  costBreakdown: CostBreakdown | null;
  loading: boolean;
  error: string | null;

  // Actions
  setCostPerSqft: (cost: number) => void;
  setTotalSqft: (sqft: number) => void;
  calculate: () => void;
  reset: () => void;
}

const DEFAULT_COST: number = 200;
const DEFAULT_SQFT: number = 800;

export const useCalculatorStore = create<CalculatorState>((set) => ({
  costPerSqft: DEFAULT_COST,
  totalSqft: DEFAULT_SQFT,
  costBreakdown: null,
  loading: false,
  error: null,

  setCostPerSqft: (cost: number) => {
    set({ costPerSqft: cost });
  },

  setTotalSqft: (sqft: number) => {
    set({ totalSqft: sqft });
  },

  calculate: () => {
    set({ loading: true, error: null });

    try {
      const result = calculateADUCost({
        costPerSqft: get().costPerSqft,
        totalSqft: get().totalSqft,
      });

      if (result.success && result.data) {
        set({
          costBreakdown: result.data,
          loading: false,
          error: null,
        });
      } else {
        set({
          loading: false,
          error: result.error || 'Failed to calculate cost',
        });
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      set({
        loading: false,
        error: errorMessage,
      });
    }
  },

  reset: () => {
    set({
      costPerSqft: DEFAULT_COST,
      totalSqft: DEFAULT_SQFT,
      costBreakdown: null,
      loading: false,
      error: null,
    });
  },
}));

// Helper to get current state in calculate function
function get() {
  return useCalculatorStore.getState();
}
