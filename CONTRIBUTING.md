# Contributing to ADU Builder

Thank you for considering contributing to ADU Builder! This document provides guidelines for contributing to the project.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

---

## Code of Conduct

Be respectful, professional, and constructive in all interactions.

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm 9+ installed
- Git configured
- GitHub account

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ADU-builder.git
   cd ADU-builder
   ```

3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/odanree/ADU-builder.git
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Copy environment file:
   ```bash
   cp .env.example .env.local
   ```

6. Start development server:
   ```bash
   npm run dev
   ```

---

## Development Workflow

### Branch Strategy

**IMPORTANT**: Always create feature branches from `dev`, NOT `main`.

```bash
# Update dev branch
git checkout dev
git pull upstream dev

# Create feature branch from dev
git checkout -b feat/your-feature-name

# Make changes...
git add .
git commit -m "feat(scope): description"

# Push to your fork
git push origin feat/your-feature-name
```

### Creating a Pull Request

1. Push your feature branch to your fork
2. Go to the original repository on GitHub
3. Click "New Pull Request"
4. **Set base to `dev`** (NOT main!)
5. Set compare to your feature branch
6. Fill in the PR template
7. Submit the PR

---

## Coding Standards

### TypeScript

- Use TypeScript strict mode
- Add explicit type annotations
- No `any` types (use `unknown` if needed)
- Use ES modules (`.js` extension in imports)

**Example**:
```typescript
// ✅ Good
export async function calculateCost(sqft: number): Promise<number> {
  const cost: number = sqft * 150;
  return cost;
}

// ❌ Bad
export async function calculateCost(sqft) {
  return sqft * 150;
}
```

### Code Style

- 2-space indentation
- Semi-colons required
- Use template literals for strings
- Prefer `const` over `let`
- Use arrow functions

**Example**:
```typescript
// ✅ Good
const greeting = (name: string): string => {
  return `Hello, ${name}!`;
};

// ❌ Bad
var greeting = function(name) {
  return 'Hello, ' + name + '!';
}
```

---

## Commit Guidelines

### Conventional Commits

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
type(scope): description

[optional body]

[optional footer]
```

### Commit Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Code style (formatting) |
| `refactor` | Code refactoring |
| `test` | Add/update tests |
| `chore` | Maintenance |
| `perf` | Performance improvement |

### Examples

```bash
# Feature
git commit -m "feat(calculator): add square footage calculator

- Implement base calculation
- Add material costs
- Include labor estimates

Closes #5"

# Bug fix
git commit -m "fix(api): validate input parameters

Fixes #12"

# Documentation
git commit -m "docs(readme): update installation instructions"
```

---

## Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass: `npm test`
- [ ] No TypeScript errors: `npm run build`
- [ ] Added tests for new features
- [ ] Updated documentation
- [ ] Commits follow conventional format
- [ ] PR targets `dev` branch (NOT main)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] All tests pass
- [ ] Added new tests
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No breaking changes (or documented)

## Related Issues
Closes #XX
```

### Review Process

1. Submit PR to `dev` branch
2. Wait for CI/CD checks to pass
3. Address review comments
4. Get approval from maintainer
5. Squash and merge when approved

---

## Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm test -- --coverage
```

### Writing Tests

- Write tests for all new features
- Aim for >80% code coverage
- Test edge cases and errors
- Use descriptive test names

**Example**:
```typescript
import { describe, it, expect } from 'vitest';
import { calculateCost } from '../src/calculator/index.js';

describe('calculateCost', () => {
  it('should calculate cost for 800 sqft', () => {
    const result = calculateCost(800);
    expect(result).toBe(120000);
  });

  it('should throw error for negative sqft', () => {
    expect(() => calculateCost(-100)).toThrow();
  });
});
```

---

## Documentation

### Code Documentation

- Add JSDoc comments to all exported functions
- Document complex logic
- Keep comments up to date

**Example**:
```typescript
/**
 * Calculate the total cost of ADU construction
 * @param sqft - Square footage of the ADU
 * @param bedrooms - Number of bedrooms
 * @returns Total estimated cost in USD
 */
export function calculateCost(sqft: number, bedrooms: number): number {
  // Implementation
}
```

### Documentation Files

- Create documentation in `docs/` folder
- Use clear headings and examples
- Keep docs concise and focused
- Update `INDEX.md` when adding new docs

---

## Questions?

- Open an issue for questions
- Check existing issues and PRs
- See [ROADMAP.md](ROADMAP.md) for project status

---

**Thank you for contributing to ADU Builder!** 🎉
