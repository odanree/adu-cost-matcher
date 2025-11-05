'use client';

import { useState, useEffect } from 'react';
import { useCalculatorStore } from '@/lib/store';
import styles from './CostInputForm.module.css';

const MIN_COST: number = 100;
const MAX_COST: number = 500;
const MIN_SQFT: number = 300;
const MAX_SQFT: number = 2000;
const DEFAULT_SQFT: number = 800;

interface ValidationError {
  costPerSqft?: string;
  totalSqft?: string;
}

export function CostInputForm() {
  const { costPerSqft, totalSqft, setCostPerSqft, setTotalSqft, calculate } =
    useCalculatorStore();

  const [localCost, setLocalCost] = useState<string>(costPerSqft.toString());
  const [localSqft, setLocalSqft] = useState<string>(totalSqft.toString());
  const [errors, setErrors] = useState<ValidationError>({});
  const [touched, setTouched] = useState<{ cost: boolean; sqft: boolean }>({
    cost: false,
    sqft: false,
  });

  // Validate and update cost
  const handleCostChange = (value: string) => {
    setLocalCost(value);

    const num: number = parseFloat(value);
    const newErrors: ValidationError = { ...errors };

    if (value === '') {
      delete newErrors.costPerSqft;
    } else if (isNaN(num)) {
      newErrors.costPerSqft = 'Please enter a valid number';
    } else if (num < MIN_COST) {
      newErrors.costPerSqft = `Minimum cost is $${MIN_COST}/sqft`;
    } else if (num > MAX_COST) {
      newErrors.costPerSqft = `Maximum cost is $${MAX_COST}/sqft`;
    } else {
      delete newErrors.costPerSqft;
      setCostPerSqft(num);
    }

    setErrors(newErrors);
  };

  // Validate and update sqft
  const handleSqftChange = (value: string) => {
    setLocalSqft(value);

    const num: number = parseInt(value, 10);
    const newErrors: ValidationError = { ...errors };

    if (value === '') {
      delete newErrors.totalSqft;
    } else if (isNaN(num)) {
      newErrors.totalSqft = 'Please enter a valid number';
    } else if (num < MIN_SQFT) {
      newErrors.totalSqft = `Minimum is ${MIN_SQFT} sqft`;
    } else if (num > MAX_SQFT) {
      newErrors.totalSqft = `Maximum is ${MAX_SQFT} sqft`;
    } else {
      delete newErrors.totalSqft;
      setTotalSqft(num);
    }

    setErrors(newErrors);
  };

  // Handle blur to validate
  const handleBlur = (field: 'cost' | 'sqft') => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    if (field === 'cost' && !localCost) {
      setLocalCost(costPerSqft.toString());
    } else if (field === 'sqft' && !localSqft) {
      setLocalSqft(totalSqft.toString());
    }
  };

  // Calculate whenever values change
  useEffect(() => {
    if (!errors.costPerSqft && !errors.totalSqft && costPerSqft > 0) {
      const timer: NodeJS.Timeout = setTimeout(() => {
        calculate();
      }, 300); // Debounce calculation

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [costPerSqft, totalSqft, errors, calculate]);

  const handleReset = () => {
    setLocalCost(DEFAULT_SQFT.toString());
    setLocalSqft(DEFAULT_SQFT.toString());
    setCostPerSqft(200);
    setTotalSqft(DEFAULT_SQFT);
    setErrors({});
    setTouched({ cost: false, sqft: false });
  };

  const isValid: boolean =
    !errors.costPerSqft &&
    !errors.totalSqft &&
    costPerSqft > 0 &&
    totalSqft > 0;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ADU Cost Matcher</h2>
      <p className={styles.subtitle}>
        Set your budget and see what ADU features you can build
      </p>

      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="costPerSqft" className={styles.label}>
            Cost per Square Foot
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.currency}>$</span>
            <input
              id="costPerSqft"
              type="number"
              min={MIN_COST}
              max={MAX_COST}
              step={1}
              value={localCost}
              onChange={(e) => handleCostChange(e.target.value)}
              onBlur={() => handleBlur('cost')}
              className={`${styles.input} ${
                touched.cost && errors.costPerSqft ? styles.error : ''
              }`}
              placeholder="200"
            />
            <span className={styles.unit}>/sqft</span>
          </div>
          {touched.cost && errors.costPerSqft && (
            <p className={styles.errorMessage}>{errors.costPerSqft}</p>
          )}
          <p className={styles.hint}>
            Range: ${MIN_COST} - ${MAX_COST} per sqft
          </p>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="totalSqft" className={styles.label}>
            Total Square Footage (Optional)
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="totalSqft"
              type="number"
              min={MIN_SQFT}
              max={MAX_SQFT}
              step={50}
              value={localSqft}
              onChange={(e) => handleSqftChange(e.target.value)}
              onBlur={() => handleBlur('sqft')}
              className={`${styles.input} ${
                touched.sqft && errors.totalSqft ? styles.error : ''
              }`}
              placeholder={DEFAULT_SQFT.toString()}
            />
            <span className={styles.unit}>sqft</span>
          </div>
          {touched.sqft && errors.totalSqft && (
            <p className={styles.errorMessage}>{errors.totalSqft}</p>
          )}
          <p className={styles.hint}>
            Default: {DEFAULT_SQFT} sqft (range: {MIN_SQFT} - {MAX_SQFT})
          </p>
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={handleReset}
            className={styles.resetButton}
            disabled={!isValid}
          >
            Reset
          </button>
        </div>

        {isValid && (
          <div className={styles.summary}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total Budget:</span>
              <span className={styles.summaryValue}>
                ${(costPerSqft * totalSqft).toLocaleString()}
              </span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Cost per sqft:</span>
              <span className={styles.summaryValue}>${costPerSqft}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total sqft:</span>
              <span className={styles.summaryValue}>
                {totalSqft.toLocaleString()} sqft
              </span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
