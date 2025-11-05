# Testing Strategy & Coverage

**Last Updated**: November 5, 2025  
**Phase**: 3 Task 4 - Component Testing  
**Status**: ✅ CORE ALGORITHM TESTS COMPLETE

---

## 🧪 Testing Overview

The ADU Cost Matcher uses comprehensive unit testing to ensure the cost calculation algorithm is accurate, reliable, and handles edge cases properly.

## 📊 Test Coverage

### Current Test Suite

| Category | Tests | Status | Coverage |
|----------|-------|--------|----------|
| **Core Algorithm** | 30 | ✅ All Passing | 100% |
| **Unit Tests** | 30 | ✅ All Passing | Core logic |
| **Integration** | Ready | 📋 Planned | Components |
| **E2E** | Ready | 📋 Planned | User flows |

### Test Execution

```bash
npm test              # Run all tests once
npm test:watch       # Run tests in watch mode
npm run build        # Verify TypeScript and build
npm run analyze      # Check bundle size
```

---

## ✅ Implemented Tests (30 Tests - 100% Pass Rate)

### 1. Basic Functionality Tests (4 tests)

**Purpose**: Verify core calculator functions correctly

```typescript
✓ should calculate cost for basic input
  Input: $200/sqft × 800 sqft → Output: Detailed breakdown
  
✓ should calculate cost with custom sqft
  Input: $200/sqft × 1200 sqft → Output: Adjusted breakdown
  
✓ should return error for invalid input
  Input: Invalid cost → Output: Error object
  
✓ should return error for zero cost
  Input: $0/sqft → Output: Error object
```

**What it tests**:
- Basic calculation flow
- Custom sqft values
- Error handling for invalid inputs
- Edge case: zero cost rejection

---

### 2. Finish Level Detection Tests (5 tests)

**Purpose**: Verify all 4 finish tiers are detected correctly

```typescript
✓ should detect basic finish level
  Cost: $150-180/sqft → Tier: "Basic"
  
✓ should detect standard finish level
  Cost: $180-220/sqft → Tier: "Standard"
  
✓ should detect premium finish level
  Cost: $220-280/sqft → Tier: "Premium"
  
✓ should detect luxury finish level
  Cost: $280+/sqft → Tier: "Luxury"
  
✓ should handle tier boundaries correctly
  Edge cases: $149.99, $180, $220, $280, $500+
```

**What it tests**:
- All 4 finish levels work
- Boundary conditions (min/max values)
- Correct tier assignment

---

### 3. Budget Allocation Tests (2 tests)

**Purpose**: Verify cost breakdown percentages

```typescript
✓ should allocate budget across categories
  Materials: 38% | Labor: 33% | Permits: 10%
  Site Work: 12% | Contingency: 7% = 100%
  
✓ should follow allocation percentages
  Input: $200/sqft × 800 sqft = $160,000
  Materials: $60,800 | Labor: $52,800 | Permits: $16,000
  Site Work: $19,200 | Contingency: $11,200
```

**What it tests**:
- Percentages sum to 100%
- Amounts calculated correctly
- All categories included

---

### 4. Material Selection Tests (4 tests)

**Purpose**: Verify materials match finish tier

```typescript
✓ should select basic materials for basic tier
  Flooring: Vinyl | Counters: Laminate | Fixtures: Builder-grade
  
✓ should select standard materials for standard tier
  Flooring: Engineered Wood | Counters: Quartz | Fixtures: Mid-range
  
✓ should select premium materials for premium tier
  Flooring: Solid Hardwood | Counters: Granite | Fixtures: High-end
  
✓ should include all material categories
  9 categories: Flooring, Counters, Fixtures, Appliances, Roofing,
  Framing, Electrical, Plumbing, HVAC
```

**What it tests**:
- Material specifications vary by tier
- All 9 material categories included
- Appropriate upgrades per tier

---

### 5. Labor Breakdown Tests (1 test)

**Purpose**: Verify labor costs by trade

```typescript
✓ should break down labor by category
  Framing | Electrical | Plumbing | HVAC | Interior Finishing
  Each trade receives proportional labor allocation
```

**What it tests**:
- Labor divided among 5 trades
- All trades included
- Realistic proportions

---

### 6. Permits Calculation Tests (1 test)

**Purpose**: Verify permit costs included

```typescript
✓ should include all permit types
  Building | Planning | Connection | Inspection fees
  Total: 10% of total budget
```

**What it tests**:
- All permit types included
- Correct percentage calculation

---

### 7. Site Work Tests (1 test)

**Purpose**: Verify site preparation costs

```typescript
✓ should include all site work categories
  Foundation | Utility Trenching | Drainage | Access Improvements
  Total: 12% of total budget
```

**What it tests**:
- All site work categories included
- Realistic site costs

---

### 8. Contingency Tests (1 test)

**Purpose**: Verify contingency buffer included

```typescript
✓ should include 10% contingency
  Budget contingency for unexpected costs: 7% of total
```

**What it tests**:
- Contingency properly calculated
- Included in final breakdown

---

### 9. Recommendations Tests (3 tests)

**Purpose**: Verify helpful recommendations per tier

```typescript
✓ should provide recommendations for basic tier
  Output: Best for budget-conscious investors
  
✓ should provide recommendations for all tiers
  Each tier has specific recommendations
  
✓ should provide tradeoffs for each tier
  Each tier shows cost/benefit tradeoffs
```

**What it tests**:
- Recommendations provided
- Tradeoffs clearly explained
- User guidance helpful

---

### 10. Edge Cases Tests (5 tests)

**Purpose**: Verify algorithm handles extreme values

```typescript
✓ should handle very low cost ($100/sqft)
  Minimum valid input
  
✓ should handle very high cost ($500/sqft)
  Maximum valid input
  
✓ should handle small sqft (300 sqft)
  Minimum valid sqft
  
✓ should handle large sqft (2,000 sqft)
  Maximum valid sqft
  
✓ should handle decimal cost values (e.g., $199.99/sqft)
  Precision handling
```

**What it tests**:
- Boundaries work correctly
- No crashes on extreme values
- Decimal precision maintained

---

### 11. Data Integrity Tests (3 tests)

**Purpose**: Verify algorithm reliability

```typescript
✓ should maintain consistency across multiple calls
  Same input → Same output (deterministic)
  
✓ should scale properly with sqft
  2x sqft = 2x total cost (linear scaling)
  
✓ should scale properly with cost
  2x cost/sqft = 2x materials cost (linear scaling)
```

**What it tests**:
- Algorithm is deterministic
- Linear scaling relationships
- No random variations

---

## 🏗️ Testing Architecture

### Test Organization

```
lib/calculator/
├── cost-matcher.ts          # Algorithm implementation
└── __tests__/
    └── cost-matcher.test.ts # 30 comprehensive tests
```

### Test Framework Stack

- **Framework**: Vitest v1.6.1 (TypeScript-native)
- **Environment**: jsdom (DOM simulation)
- **Assertions**: Vitest built-in
- **Coverage**: V8 provider

### Configuration Files

**vitest.config.ts**
```typescript
{
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
}
```

---

## 📈 Test Metrics

### Current Results

```
Test Files:  1 passed (1)
Tests:       30 passed (30)
Duration:    757ms
Coverage:    100% (cost-matcher.ts)
Pass Rate:   100%
```

### Performance

- **Average Test Time**: ~25ms per test
- **Total Suite Time**: <1 second
- **No flaky tests**: All deterministic
- **No timeouts**: All complete instantly

---

## 🔄 Testing Workflow

### Development Loop

```
1. Make code changes
   ↓
2. npm test              # Quick feedback
   ↓
3. Fix any failures
   ↓
4. npm run build         # TypeScript check
   ↓
5. npm run analyze       # Bundle verification
   ↓
6. git commit            # Only after all pass
```

### Pre-Commit Checks

```bash
# Always run before committing
npm test                 # Unit tests must pass
npm run build            # Build must succeed
npm run analyze          # Bundle must be acceptable
```

---

## 🎯 Testing Strategy

### What We Test

✅ **Core Algorithm**
- Cost calculations
- Tier detection
- Budget allocation
- Material selection

✅ **Edge Cases**
- Minimum/maximum values
- Boundary conditions
- Decimal precision
- Error handling

✅ **Data Integrity**
- Deterministic output
- Linear scaling
- Consistency

### What We Monitor

✅ **Test Coverage**
- Core logic: 100%
- Edge cases: Comprehensive
- Error paths: All covered

✅ **Performance**
- Tests run in <1s
- No timeouts
- No flaky tests

✅ **Reliability**
- Same input = Same output
- Predictable behavior
- No random failures

---

## 🚀 Future Testing Enhancements

### Planned Additions

**Phase 4 - Component Testing**
- React Testing Library for UI components
- Form validation tests
- State management tests
- Responsive design verification

**Phase 4 - Integration Testing**
- End-to-end (E2E) with Cypress
- User flow testing
- Form submission flow
- Data persistence checks

**Phase 4 - Performance Testing**
- Load time benchmarks
- Memory usage profiling
- Bundle size tracking
- Lighthouse automation

### Long-term Goals

- **80%+ Code Coverage**: Including all files
- **Automated CI/CD**: Tests on every commit
- **Performance Budgets**: Monitor bundle growth
- **Regression Prevention**: All bugs get tests

---

## 📚 Testing Best Practices

### For Developers

1. **Run tests before committing**
   ```bash
   npm test && npm run build
   ```

2. **Test your changes locally**
   ```bash
   npm test:watch    # Real-time feedback
   ```

3. **Write tests for new features**
   - Algorithm changes → Add unit tests
   - Bug fixes → Add regression tests

4. **Check coverage**
   ```bash
   npm test -- --coverage
   ```

### For Code Review

1. Do tests pass? ✅ Required
2. Do tests cover the change? ✅ Required
3. Are there edge cases? ⚠️ Check logic
4. Does bundle size increase? ⚠️ Monitor

---

## 🔗 Related Documentation

- **Performance**: `docs/PERFORMANCE.md` - Bundle analysis
- **Architecture**: `ROADMAP.md` - Algorithm details
- **CI/CD**: GitHub Actions workflows (future)

---

## 📞 Testing Support

### Running Tests

```bash
# Once (CI mode)
npm test

# Watch mode (development)
npm test:watch

# With coverage report
npm test -- --coverage

# Specific file
npm test cost-matcher

# UI Dashboard
npm run test:ui
```

### Common Issues

**Tests failing after changes?**
- Read error message carefully
- Check assertion logic
- Verify input/output types
- Run with --reporter=verbose

**Build failing?**
- TypeScript errors
- Unused imports
- Type mismatches
- Check `npm run build` output

**Bundle size increased?**
- Run `npm run analyze`
- Check for new dependencies
- Review code splitting
- Consider optimizations

---

**Status**: Phase 3 Task 4 - Testing Strategy documented with 30/30 algorithm tests passing. Component testing framework ready for Phase 4 implementation.
