'use client';

import { useCalculatorStore } from '@/lib/store';
import type { FinishLevel } from '@/types/index';
import styles from './CostBreakdownDisplay.module.css';

const FINISH_LEVEL_LABELS: Record<FinishLevel, string> = {
  basic: '★ Basic',
  standard: '★★ Standard',
  premium: '★★★ Premium',
  luxury: '★★★★ Luxury',
};

const FINISH_LEVEL_COLORS: Record<FinishLevel, string> = {
  basic: '#ffc107',
  standard: '#00bcd4',
  premium: '#9c27b0',
  luxury: '#ff6f00',
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number, total: number): string {
  return `${((value / total) * 100).toFixed(1)}%`;
}

export function CostBreakdownDisplay() {
  const { costBreakdown, loading, error } = useCalculatorStore();

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingMessage}>Calculating...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>{error}</div>
      </div>
    );
  }

  if (!costBreakdown) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyMessage}>
          Enter a cost to see the breakdown
        </div>
      </div>
    );
  }

  const breakdown = costBreakdown.breakdown;
  const total: number = costBreakdown.totalBudget;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cost Breakdown</h2>

      {/* Finish Level Badge */}
      <div className={styles.finishLevelBadge}>
        <div
          className={styles.badge}
          style={{
            backgroundColor: FINISH_LEVEL_COLORS[costBreakdown.finishLevel],
          }}
        >
          {FINISH_LEVEL_LABELS[costBreakdown.finishLevel]}
        </div>
      </div>

      {/* Total Budget Summary */}
      <div className={styles.totalSummary}>
        <div className={styles.totalAmount}>
          {formatCurrency(total)}
        </div>
        <div className={styles.totalDetails}>
          <span>${costBreakdown.costPerSqft}/sqft</span>
          <span>•</span>
          <span>{breakdown.materials.flooring.cost ? 'Standard ADU' : 'Custom'}</span>
        </div>
      </div>

      {/* Main Categories */}
      <div className={styles.categories}>
        {/* Materials */}
        <div className={styles.category}>
          <button
            className={styles.categoryHeader}
            onClick={() =>
              document
                .getElementById('materials-details')
                ?.classList.toggle(styles.hidden)
            }
          >
            <span className={styles.categoryName}>Materials</span>
            <span className={styles.categoryAmount}>
              {formatCurrency(breakdown.materials.total)} (
              {formatPercent(breakdown.materials.total, total)})
            </span>
          </button>
          <div id="materials-details" className={styles.details}>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Flooring</span>
              <span className={styles.detailValue}>
                {breakdown.materials.flooring.type} -{' '}
                {formatCurrency(breakdown.materials.flooring.cost)}
              </span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Countertops</span>
              <span className={styles.detailValue}>
                {breakdown.materials.countertops.type} -{' '}
                {formatCurrency(breakdown.materials.countertops.cost)}
              </span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Fixtures</span>
              <span className={styles.detailValue}>
                {breakdown.materials.fixtures.type} -{' '}
                {formatCurrency(breakdown.materials.fixtures.cost)}
              </span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Appliances</span>
              <span className={styles.detailValue}>
                {breakdown.materials.appliances.package} -{' '}
                {formatCurrency(breakdown.materials.appliances.cost)}
              </span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Roofing</span>
              <span className={styles.detailValue}>
                {breakdown.materials.roofing.type} -{' '}
                {formatCurrency(breakdown.materials.roofing.cost)}
              </span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Siding</span>
              <span className={styles.detailValue}>
                {breakdown.materials.siding.type} -{' '}
                {formatCurrency(breakdown.materials.siding.cost)}
              </span>
            </div>
            {breakdown.materials.lumber.cost > 0 && (
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Lumber & Framing</span>
                <span className={styles.detailValue}>
                  {formatCurrency(breakdown.materials.lumber.cost)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Labor */}
        <div className={styles.category}>
          <button
            className={styles.categoryHeader}
            onClick={() =>
              document
                .getElementById('labor-details')
                ?.classList.toggle(styles.hidden)
            }
          >
            <span className={styles.categoryName}>Labor</span>
            <span className={styles.categoryAmount}>
              {formatCurrency(breakdown.labor.total)} (
              {formatPercent(breakdown.labor.total, total)})
            </span>
          </button>
          <div id="labor-details" className={styles.details}>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Framing</span>
              <span className={styles.detailValue}>
                {formatCurrency(breakdown.labor.framing)}
              </span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Electrical</span>
              <span className={styles.detailValue}>
                {formatCurrency(breakdown.labor.electrical)}
              </span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Plumbing</span>
              <span className={styles.detailValue}>
                {formatCurrency(breakdown.labor.plumbing)}
              </span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>HVAC</span>
              <span className={styles.detailValue}>
                {formatCurrency(breakdown.labor.hvac)}
              </span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Finishes</span>
              <span className={styles.detailValue}>
                {formatCurrency(breakdown.labor.finishes)}
              </span>
            </div>
          </div>
        </div>

        {/* Permits */}
        <div className={styles.category}>
          <button
            className={styles.categoryHeader}
            onClick={() =>
              document
                .getElementById('permits-details')
                ?.classList.toggle(styles.hidden)
            }
          >
            <span className={styles.categoryName}>Permits & Fees</span>
            <span className={styles.categoryAmount}>
              {formatCurrency(breakdown.permits.total)} (
              {formatPercent(breakdown.permits.total, total)})
            </span>
          </button>
          <div id="permits-details" className={styles.details}>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Building Permit</span>
              <span className={styles.detailValue}>
                {formatCurrency(breakdown.permits.building)}
              </span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Electrical Permit</span>
              <span className={styles.detailValue}>
                {formatCurrency(breakdown.permits.electrical)}
              </span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Plumbing Permit</span>
              <span className={styles.detailValue}>
                {formatCurrency(breakdown.permits.plumbing)}
              </span>
            </div>
          </div>
        </div>

        {/* Site Work */}
        <div className={styles.category}>
          <button
            className={styles.categoryHeader}
            onClick={() =>
              document
                .getElementById('sitework-details')
                ?.classList.toggle(styles.hidden)
            }
          >
            <span className={styles.categoryName}>Site Work</span>
            <span className={styles.categoryAmount}>
              {formatCurrency(breakdown.siteWork.total)} (
              {formatPercent(breakdown.siteWork.total, total)})
            </span>
          </button>
          <div id="sitework-details" className={styles.details}>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Excavation</span>
              <span className={styles.detailValue}>
                {formatCurrency(breakdown.siteWork.excavation)}
              </span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Foundation</span>
              <span className={styles.detailValue}>
                {formatCurrency(breakdown.siteWork.foundation)}
              </span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Utilities</span>
              <span className={styles.detailValue}>
                {formatCurrency(breakdown.siteWork.utilities)}
              </span>
            </div>
          </div>
        </div>

        {/* Contingency */}
        <div className={styles.category}>
          <div className={styles.categoryHeader}>
            <span className={styles.categoryName}>Contingency (10%)</span>
            <span className={styles.categoryAmount}>
              {formatCurrency(breakdown.contingency)} (
              {formatPercent(breakdown.contingency, total)})
            </span>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {costBreakdown.recommendations.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>What You Get</h3>
          <ul className={styles.list}>
            {costBreakdown.recommendations.map((rec: string, index: number) => (
              <li key={index} className={styles.listItem}>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Trade-offs */}
      {costBreakdown.tradeoffs.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Trade-offs</h3>
          <ul className={styles.list}>
            {costBreakdown.tradeoffs.map((tradeoff: string, index: number) => (
              <li key={index} className={styles.listItem}>
                {tradeoff}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
