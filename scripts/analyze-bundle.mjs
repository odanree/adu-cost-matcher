#!/usr/bin/env node

/**
 * Bundle Size Analysis Script
 * Analyzes the production bundle and reports on code splitting effectiveness
 */

import fs from 'fs';
import path from 'path';

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

function analyzeDirectory(dirPath, maxDepth = 1, currentDepth = 0) {
  const files = [];

  if (currentDepth >= maxDepth || !fs.existsSync(dirPath)) {
    return files;
  }

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.map'))) {
        const size = getFileSize(fullPath);
        files.push({
          name: entry.name,
          size,
          sizeKb: Math.round((size / 1024) * 100) / 100,
        });
      } else if (entry.isDirectory() && currentDepth < maxDepth - 1) {
        files.push(...analyzeDirectory(fullPath, maxDepth, currentDepth + 1));
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }

  return files;
}

function generateReport() {
  const buildPath = path.join(process.cwd(), '.next');
  const staticPath = path.join(buildPath, 'static');
  const serverPath = path.join(buildPath, 'server');

  console.log('📊 Analyzing Bundle Size...\n');

  const staticFiles = analyzeDirectory(staticPath, 3);
  const serverFiles = analyzeDirectory(serverPath, 3);
  const allFiles = [...staticFiles, ...serverFiles];

  const totalSize = allFiles.reduce((sum, file) => sum + file.size, 0);
  const largestFiles = [...allFiles].sort((a, b) => b.size - a.size).slice(0, 10);

  return {
    totalSize,
    files: allFiles,
    largestFiles,
    timestamp: new Date().toISOString(),
  };
}

function formatSize(bytes) {
  const kb = bytes / 1024;
  const mb = kb / 1024;

  if (mb > 1) {
    return `${(Math.round(mb * 100) / 100).toFixed(2)} MB`;
  }
  return `${(Math.round(kb * 100) / 100).toFixed(2)} KB`;
}

function printReport(result) {
  console.log('='.repeat(60));
  console.log('📦 BUNDLE SIZE ANALYSIS');
  console.log('='.repeat(60));
  console.log(`\n📈 Total Bundle Size: ${formatSize(result.totalSize)}`);
  console.log(`📅 Generated: ${new Date(result.timestamp).toLocaleString()}`);
  console.log(`📁 Total Files: ${result.files.length}\n`);

  console.log('🔝 Top 10 Largest Files:');
  console.log('-'.repeat(60));
  result.largestFiles.forEach((file, index) => {
    const percentage = ((file.size / result.totalSize) * 100).toFixed(1);
    console.log(
      `${String(index + 1).padStart(2, ' ')}. ${file.name.padEnd(35)} ${String(file.sizeKb).padStart(8)} KB (${percentage}%)`
    );
  });

  console.log('\n' + '='.repeat(60));
  console.log('✅ PERFORMANCE TARGETS:');
  console.log('='.repeat(60));

  const targets = [
    { name: 'Total Bundle', size: 200 * 1024, actual: result.totalSize },
    { name: 'Largest JS File', size: 100 * 1024, actual: result.largestFiles[0]?.size || 0 },
  ];

  targets.forEach(target => {
    const passed = target.actual <= target.size;
    const status = passed ? '✅' : '⚠️';
    console.log(
      `${status} ${target.name.padEnd(20)} ${formatSize(target.actual).padStart(10)} / ${formatSize(target.size).padStart(10)}`
    );
  });

  console.log('\n' + '='.repeat(60) + '\n');
}

// Run analysis
try {
  const report = generateReport();
  printReport(report);
} catch (error) {
  console.error('Error analyzing bundle:', error);
  process.exit(1);
}
