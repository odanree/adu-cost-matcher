'use client';

import { CostInputForm } from '@/components/CostInputForm';
import { CostBreakdownDisplay } from '@/components/CostBreakdownDisplay';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <CostInputForm />
        <CostBreakdownDisplay />
      </div>
    </main>
  );
}
