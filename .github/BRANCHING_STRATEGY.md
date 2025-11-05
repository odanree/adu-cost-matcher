# Git Branching Strategy

> Defines the git workflow and branching strategy for the ADU Builder project.

---

## 🌿 Branch Structure

The branching strategy follows a simple, linear flow:

```
main (production)
  ↑
  └─── dev (staging)
         ↑
         └─── feat/*, fix/*, etc. (feature branches)
```

**Key Points**:
- ✅ **One-way flow**: feature → dev → main (no PR backwards)
- ✅ **All work in dev**: Feature branches always merge to dev first
- ✅ **Release to main**: Single PR from dev → main when ready for production
- ✅ **Clean history**: Squash merges keep main history minimal

---

## 🌿 Branch Types

### Main Branches

#### `main` (Production)
- **Purpose**: Production-ready code only
- **Protection**: Requires pull request reviews
- **Deployment**: Auto-deploy to Vercel production
- **Merge Source**: Only from `dev` branch
- **Merge Strategy**: Squash and merge (clean history)
- **Commits**: Must follow conventional commit format
- **Frequency**: Merged when ready for release (not on every change)

#### `dev` (Development/Staging)
- **Purpose**: Integration branch for all feature work
- **Protection**: Requires pull request reviews
- **Deployment**: Auto-deploy to Vercel preview
- **Merge Source**: From feature branches only
- **Merge Strategy**: Squash and merge
- **Base Branch**: Always create feature branches from `dev` (not main)

### Feature Branches

#### Format: `feat/feature-name`
- **Purpose**: Implement new features
- **Base**: Create from `dev`
- **Target**: Merge to `dev` (NOT main)
- **Example**: `feat/cost-calculator`, `feat/floor-plan-generator`

#### Format: `fix/bug-name`
- **Purpose**: Fix bugs
- **Base**: Create from `dev`
- **Target**: Merge to `dev` (NOT main)
- **Example**: `fix/calculation-bug`, `fix/api-error-handling`

#### Format: `refactor/refactor-name`
- **Purpose**: Code refactoring (no feature changes)
- **Base**: Create from `dev`
- **Target**: Merge to `dev` (NOT main)
- **Example**: `refactor/api-structure`, `refactor/error-handling`

#### Format: `docs/doc-name`
- **Purpose**: Documentation updates
- **Base**: Create from `dev`
- **Target**: Merge to `dev` (NOT main)
- **Example**: `docs/api-guide`, `docs/setup-instructions`

#### Format: `chore/task-name`
- **Purpose**: Maintenance tasks
- **Base**: Create from `dev`
- **Target**: Merge to `dev` (NOT main)
- **Example**: `chore/update-dependencies`, `chore/add-linting`

---

## 🔄 Git Workflow

### Simple Linear Flow

```
1. Work on feature branch (based on dev)
   ↓
2. Create PR: feature → dev
   ↓
3. Review & merge to dev (CI/CD runs)
   ↓
4. Test in dev/staging environment
   ↓
5. Create PR: dev → main (for release)
   ↓
6. Review & merge to main (CI/CD deploys to production)
```

---

### Step-by-Step Instructions

#### 1. Setup (One-time)

```bash
# Clone the repository
git clone https://github.com/odanree/ADU-builder.git
cd ADU-builder

# Create dev branch locally (if not already created)
git checkout -b dev origin/dev
```

#### 2. Start Work on a Feature

**Always base new work on `dev`, NOT main**

```bash
# Update dev branch with latest changes
git checkout dev
git pull origin dev

# Create feature branch from dev
git checkout -b feat/my-feature

# Make changes...
git add .
git commit -m "feat(scope): description

- Detailed change 1
- Detailed change 2

Refs #1"
```

#### 3. Push and Create PR (Feature → Dev)

```bash
# Push feature branch
git push -u origin feat/my-feature

# Create PR to dev (NOT main!)
gh pr create --base dev --head feat/my-feature

# Or create manually:
# 1. Go to https://github.com/odanree/ADU-builder
# 2. Click "Compare & pull request"
# 3. Set base: dev, compare: feat/my-feature
# 4. Add description and submit
```

#### 4. After PR is Approved (Merge to Dev)

**IMPORTANT: Use Squash and Merge**

```bash
# Wait for CI/CD checks to pass ✓
# Then merge using squash strategy
gh pr merge PR_NUMBER --squash --delete-branch

# Or merge manually:
# 1. On PR page, select "Squash and merge" dropdown
# 2. Click "Squash and merge"
# 3. Confirm merge
# 4. Delete feature branch
```

#### 5. Release to Production (Dev → Main)

**Only when ready for production release**

```bash
# Update dev branch
git checkout dev
git pull origin dev

# Create PR from dev to main
gh pr create --base main --head dev --title "Release: vX.Y.Z" --body "Release notes..."

# Wait for approval and CI/CD checks
# Merge with squash strategy
gh pr merge PR_NUMBER --squash --delete-branch=false

# After merge, sync dev with main
git checkout dev
git pull origin main
git push origin dev
```

---

## 📝 Conventional Commits

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
type(scope): description

[optional body]

[optional footer]
```

### Commit Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(calculator): add cost breakdown` |
| `fix` | Bug fix | `fix(api): handle null responses` |
| `docs` | Documentation | `docs(readme): add setup instructions` |
| `style` | Code style (formatting) | `style(api): fix indentation` |
| `refactor` | Code refactoring | `refactor(calculator): simplify logic` |
| `test` | Add/update tests | `test(calculator): add edge cases` |
| `chore` | Maintenance | `chore(deps): update dependencies` |
| `perf` | Performance improvement | `perf(api): optimize queries` |
| `ci` | CI/CD changes | `ci(github): add test workflow` |
| `build` | Build system | `build(webpack): update config` |

### Commit Examples

#### Good Commits ✅

```bash
# Feature
git commit -m "feat(calculator): implement square footage calculator

- Add base calculation logic
- Include material costs
- Add labor estimates

Closes #5"

# Bug Fix
git commit -m "fix(api): validate input parameters

- Add schema validation
- Return proper error codes
- Log validation errors

Fixes #12"

# Documentation
git commit -m "docs(api): add endpoint documentation

- Document /api/calculate endpoint
- Add request/response examples
- Include error codes"
```

#### Bad Commits ❌

```bash
# Too vague
git commit -m "fix bug"

# Not following format
git commit -m "Added new feature for calculator"

# Missing body for complex change
git commit -m "feat: refactor entire API"
```

---

## 🔒 Branch Protection Rules

### `main` Branch

- ✅ Require pull request before merging
- ✅ Require approvals (1 minimum)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Do not allow bypassing settings
- ✅ Restrict who can push
- ✅ Do not allow force pushes
- ✅ Do not allow deletions

### `dev` Branch

- ✅ Require pull request before merging
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Do not allow force pushes
- ⚠️ Allow force pushes with lease (for rebases)

---

## 🚫 Common Mistakes to Avoid

### ❌ DON'T: Create PR from feature → main

```bash
# WRONG
git checkout -b feat/my-feature
git commit -m "feat: new feature"
gh pr create --base main --head feat/my-feature  # ❌ NO!
```

### ✅ DO: Create PR from feature → dev

```bash
# CORRECT
git checkout dev
git pull origin dev
git checkout -b feat/my-feature
git commit -m "feat: new feature"
gh pr create --base dev --head feat/my-feature  # ✅ YES!
```

### ❌ DON'T: Use "Merge commit" strategy

```bash
# WRONG - Creates messy history
gh pr merge PR_NUMBER --merge  # ❌ NO!
```

### ✅ DO: Use "Squash and merge"

```bash
# CORRECT - Clean history
gh pr merge PR_NUMBER --squash  # ✅ YES!
```

### ❌ DON'T: Merge before CI/CD passes

```bash
# WRONG - Merge immediately after creating PR
gh pr create --base dev --head feat/my-feature
gh pr merge --squash  # ❌ NO! Wait for checks!
```

### ✅ DO: Wait for all checks to pass

```bash
# CORRECT - Check status first
gh pr create --base dev --head feat/my-feature
gh pr checks  # Wait until all checks pass ✓
gh pr merge --squash  # ✅ YES!
```

---

## 🔧 GitHub CLI Commands

### Create Pull Request

```bash
# Basic PR (dev as default base)
gh pr create --base dev --head feat/my-feature

# PR with title and body
gh pr create --base dev --head feat/my-feature \
  --title "feat: Add cost calculator" \
  --body "Implements the cost calculation feature"

# Interactive mode
gh pr create
```

### Check PR Status

```bash
# Check CI/CD status
gh pr checks

# View PR details
gh pr view

# List all PRs
gh pr list
```

### Merge Pull Request

```bash
# Squash and merge
gh pr merge PR_NUMBER --squash

# Squash and merge without deleting branch
gh pr merge PR_NUMBER --squash --delete-branch=false

# Auto-merge when checks pass
gh pr merge PR_NUMBER --squash --auto
```

### Sync Branches

```bash
# Update dev from main after release
git checkout dev
git pull origin main
git push origin dev

# Update feature from dev
git checkout feat/my-feature
git pull origin dev
git push origin feat/my-feature
```

---

## 📊 Workflow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Feature Development                      │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Create feat/xxx     │
                    │  from dev branch     │
                    └──────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Commit changes      │
                    │  (conventional fmt)  │
                    └──────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Push to GitHub      │
                    └──────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Create PR:          │
                    │  feat/xxx → dev      │
                    └──────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  CI/CD runs tests    │
                    │  Wait for ✓          │
                    └──────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Code review         │
                    │  Get approval        │
                    └──────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Squash & merge      │
                    │  to dev              │
                    └──────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                         Testing on Dev                       │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Ready for release?  │
                    └──────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Create PR:          │
                    │  dev → main          │
                    └──────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  CI/CD runs tests    │
                    │  Wait for ✓          │
                    └──────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Final approval      │
                    └──────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Squash & merge      │
                    │  to main             │
                    └──────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Production Deployment                     │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Sync dev with main  │
                    └──────────────────────┘
```

---

## 📚 Additional Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [Git Best Practices](https://git-scm.com/book/en/v2)

---

## ❓ FAQ

**Q: Can I create a PR from feature → main directly?**  
A: No. All feature branches must merge to `dev` first, then `dev` merges to `main`.

**Q: When should I create a PR from dev → main?**  
A: Only when you have a collection of features tested and ready for production release.

**Q: Should I delete my feature branch after merging?**  
A: Yes, always delete feature branches after merging to keep the repository clean.

**Q: Can I push directly to dev or main?**  
A: No. Both branches are protected and require pull requests.

**Q: What if I accidentally created a feature from main?**  
A: Rebase your feature branch onto dev: `git rebase --onto dev main feat/my-feature`

**Q: How do I handle merge conflicts?**  
A: Update your feature branch with latest dev: `git checkout feat/xxx && git pull origin dev`

---

**Last Updated**: November 5, 2025  
**Version**: 1.0.0
