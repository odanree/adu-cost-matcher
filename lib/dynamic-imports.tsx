import dynamic from 'next/dynamic';

/**
 * Pre-configured dynamic imports for automatic code splitting
 * Improves initial page load by splitting component code into separate bundles
 */

// Cost Input Form - Lazy loaded on demand
export const DynamicCostInputForm = dynamic(
  () => import('@/components/CostInputForm').then(mod => ({ default: mod.CostInputForm })),
  {
    loading: () => (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
        Loading calculator...
      </div>
    ),
    ssr: true,
  }
);

// Cost Breakdown Display - Lazy loaded on demand
export const DynamicCostBreakdownDisplay = dynamic(
  () => import('@/components/CostBreakdownDisplay').then(mod => ({ default: mod.CostBreakdownDisplay })),
  {
    loading: () => (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
        Loading breakdown...
      </div>
    ),
    ssr: true,
  }
);
