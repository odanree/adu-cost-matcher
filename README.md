# ADU Cost Matcher

A reverse ADU cost calculator - **you set the budget, we show you what you can build**. Instead of designing first and discovering unaffordable costs, start with your cost/sqft target and see exactly what ADU features, materials, and finishes fit your budget.

**Status**: ✅ Production Ready (Phases 1-3 Complete)  
**Version**: v1.0.0  
**Project Progress**: 85% Complete (MVP Live, Phase 4 Features Planned)  
**Live Demo**: https://adu-cost-matcher.vercel.app  
**Deployment**: [![Vercel](https://img.shields.io/badge/Vercel-Live-success?style=flat&logo=vercel)](https://adu-cost-matcher.vercel.app)  
**Documentation**: See [ROADMAP.md](ROADMAP.md) for timeline | [INDEX.md](INDEX.md) for complete guide | [docs/](docs/) for detailed docs

---

## � The Problem with Traditional ADU Calculators

❌ **Traditional Approach**: Design features → Calculate cost → Discover it's $100k over budget → Start over  
✅ **Our Approach**: Set budget → See what you can build → Make informed trade-offs

**Why This Matters**:
- Homeowners know their budget constraints before ADU design details
- Prevents wasted time designing unaffordable ADUs
- Shows clear trade-offs: "Upgrade finishes to Premium? That's +$50/sqft"
- Educational: Learn what drives ADU costs

---

## 🏗️ Architecture Overview

**Framework**: Next.js 14 (App Router) - SSR for SEO, React for interactive UI  
**Deployment**: Vercel (free tier, zero config)  
**Database**: None for MVP (pure client-side calculator)  
**Authentication**: None for MVP (no user accounts)

**Why This Stack?**:
- ✅ SEO-friendly: Homeowners search "ADU cost calculator" - Next.js SSR ranks well
- ✅ Fast MVP: No database setup, no auth complexity
- ✅ Interactive: React provides responsive, real-time cost updates
- ✅ Free to run: Vercel free tier handles traffic easily

**Evolution from Initial Design**:
- **Removed**: PostgreSQL, Prisma, NextAuth.js, API routes
- **Simplified**: Pure frontend calculator with client-side logic
- **Focus**: Reverse cost calculation algorithm

See [ROADMAP.md - Architecture Decision](ROADMAP.md#-architecture-decision-nov-5-2025) for full context.

---

## ✨ Features

### Current Features (v1.0.0 - MVP Live ✅)
- ✅ **Cost/Sqft Input** - Enter target cost ($100-$500/sqft)
- ✅ **Reverse Calculator** - Shows what ADU you can build at that price
- ✅ **Finish Level Detection** - Automatic tier (Basic/Standard/Premium/Luxury)
- ✅ **Detailed Breakdown** - Materials, labor, permits, site work, contingency
- ✅ **Material Specifications** - Exact materials based on budget tier
- ✅ **Cost Allocation** - Shows percentages (Materials 38%, Labor 33%, etc.)
- ✅ **Interactive UI** - Real-time calculations with 300ms debounce
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **16-Question FAQ** - Educational content with category filtering
- ✅ **SEO Optimized** - Ranks for "ADU cost calculator" searches
- ✅ **Performance Optimized** - 87.3 KB First Load JS (code splitting)
- ✅ **30 Unit Tests** - 100% test pass rate, full algorithm coverage

### Future Features (v2.0.0+)
- 🔮 **Location-Based Pricing** - Regional cost multipliers by ZIP code
- 🔮 **Interactive Sliders** - Adjust materials, see instant cost impact
- 🔮 **Save Scenarios** - Compare multiple cost options (user accounts)
- 🔮 **PDF Export** - Download detailed cost breakdown
- 🔮 **Image Gallery** - Material samples and finishes
- 🔮 **Contractor Network** - Connect with local ADU builders

---

## 🧮 How It Works

### User Journey

```
Step 1: Enter target cost/sqft
┌─────────────────────────────────┐
│  What's your budget per sqft?   │
│  [$200] /sqft                   │
│                                 │
│  Optional: Total sqft [800]     │
└─────────────────────────────────┘

Step 2: See instant breakdown
┌─────────────────────────────────┐
│  Total Budget: $160,000         │
│  Finish Level: STANDARD ⭐⭐     │
│                                 │
│  Materials (38%): $60,800       │
│  ├─ Flooring: Engineered wood   │
│  ├─ Countertops: Quartz         │
│  ├─ Fixtures: Mid-range         │
│  └─ Appliances: Standard pkg    │
│                                 │
│  Labor (33%): $52,800           │
│  Permits (10%): $16,000         │
│  Site Work (12%): $19,200       │
│  Contingency (7%): $11,200      │
└─────────────────────────────────┘

Step 3: Compare tiers
┌─────────────────────────────────┐
│  At your budget ($200/sqft):    │
│                                 │
│  ⬇️ Basic ($150-180)             │
│  → STANDARD ($180-220) ← You    │
│  ⬆️ Premium ($220-280)           │
└─────────────────────────────────┘
```

### Cost Tiers

| Tier | Cost/Sqft | Flooring | Countertops | Fixtures | Appliances |
|------|-----------|----------|-------------|----------|------------|
| **Basic** | $150-180 | Vinyl plank | Laminate | Builder grade | Basic package |
| **Standard** | $180-220 | Engineered hardwood | Quartz | Mid-range | Standard package |
| **Premium** | $220-280 | Solid hardwood | Granite/Marble | High-end | Premium package |
| **Luxury** | $280+ | Exotic hardwood | Custom stone | Designer | Top-tier package |

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Application runs on `http://localhost:3000`

### 3. Test the Calculator

Open browser to `http://localhost:3000`:
- Enter cost/sqft (e.g., 200)
- Optionally enter total sqft (e.g., 800)
- See instant breakdown of what you can build

No database setup, no API keys, no configuration needed!

---

## Development

### Run Tests

```bash
# Unit + Integration tests
npm test

# Test coverage
npm test -- --coverage
```

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
# One-time setup
npm install -g vercel
vercel login

# Deploy
vercel --prod
```

---

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **UI Library**: React 18
- **State Management**: Zustand (cost breakdown state)
- **Validation**: Zod (input validation)
- **Styling**: CSS Modules (not Tailwind)

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **UI Library**: React 18
- **State Management**: Zustand (cost breakdown state)
- **Validation**: Zod (input validation)
- **Styling**: CSS Modules (not Tailwind)

### Backend
- **API**: None for MVP (client-side calculations)
- **Database**: None for MVP (no data persistence)
- **Authentication**: None for MVP (no user accounts)

### DevOps
- **Deployment**: Vercel (auto-deploy from main)
- **Testing**: Vitest (unit tests), Cypress (E2E)
- **CI/CD**: GitHub Actions (planned)

---

## Project Structure

```
ADU-builder/
├── .github/                      # GitHub config, workflows
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Homepage (cost matcher interface)
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── CostInput.tsx            # Cost/sqft input form
│   ├─ CostBreakdown.tsx        # Detailed breakdown display
│   ├── TierComparison.tsx       # Basic/Standard/Premium comparison
│   └── ui/                      # Reusable UI components
├── lib/                          # Core logic
│   ├── calculator/              # Cost matching algorithm
│   │   ├── cost-matcher.ts     # Main reverse calculator
│   │   ├── material-selector.ts # Material selection by price tier
│   │   └── types.ts            # TypeScript interfaces
│   └── utils/                   # Utility functions
├── public/                       # Static files
├── __tests__/                    # Test files
│   ├── unit/                    # Unit tests
│   └── e2e/                     # Cypress E2E tests
├── docs/                         # Documentation
│   ├── ARCHITECTURE.md          # Technical architecture
│   └── COST_ALGORITHM.md        # Cost matching algorithm docs
├── package.json                  # Dependencies & scripts
├── tsconfig.json                # TypeScript config
├── next.config.js               # Next.js configuration
└── README.md                    # This file
```

---

## 📚 Documentation

**Core Documentation**:
- [INDEX.md](INDEX.md) - Complete documentation index
- [ROADMAP.md](ROADMAP.md) - Development timeline and milestones (4 weeks)
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - Technical architecture (cost matcher)
- [.github/BRANCHING_STRATEGY.md](.github/BRANCHING_STRATEGY.md) - Git workflow

**Algorithm Documentation**:
- [docs/COST_ALGORITHM.md](docs/COST_ALGORITHM.md) - Cost matching algorithm details (create this)
- [docs/MATERIAL_DATABASE.md](docs/MATERIAL_DATABASE.md) - Material pricing tiers (create this)

**Development Guides**:
- [docs/TESTING_GUIDE.md](docs/TESTING_GUIDE.md) - Testing best practices (create this)
- [docs/COMPONENT_LIBRARY.md](docs/COMPONENT_LIBRARY.md) - React components guide (create this)

---

## 🌿 Git Workflow

See [.github/BRANCHING_STRATEGY.md](.github/BRANCHING_STRATEGY.md) for our git workflow and branching strategy.

**Quick Reference**:
- Create feature branches from `dev`: `git checkout -b feat/feature-name`
- Merge features to `dev` first via PR
- Release to `main` when ready for production
- Use conventional commits: `feat:`, `fix:`, `docs:`, etc.
- Squash merge PRs to main

**Example Workflow**:
```bash
# Create feature branch
git checkout dev
git pull origin dev
git checkout -b feat/cost-matcher-algorithm

# Make changes, commit
git add .
git commit -m "feat(calculator): implement cost matching algorithm

- Add cost tier detection (basic/standard/premium)
- Implement material selection by price point
- Calculate labor as 33% of total budget
- Add permit and site work estimates

Refs #1"

# Push and create PR
git push -u origin feat/cost-matcher-algorithm
gh pr create --base dev --head feat/cost-matcher-algorithm

# After approval and CI passes
gh pr merge <PR_NUMBER> --squash
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

**Before Contributing**:
1. Read the algorithm documentation in [docs/COST_ALGORITHM.md](docs/COST_ALGORITHM.md)
2. Follow the git workflow in [.github/BRANCHING_STRATEGY.md](.github/BRANCHING_STRATEGY.md)
3. Ensure TypeScript strict mode compliance
4. Write tests for cost calculation logic
5. Update documentation

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

---

## 🆘 Support

**GitHub Issues**: https://github.com/odanree/ADU-builder/issues  
**Documentation**: See `docs/` folder  
**Architecture Questions**: See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

---

## 🎯 MVP Scope (4 Weeks)

**Week 1-2**: Next.js setup + Cost matching algorithm  
**Week 3**: Interactive UI + Visual breakdown  
**Week 4**: Polish, SEO, testing, deployment

**Launch Criteria**:
- ✅ Cost/sqft input works reliably
- ✅ Breakdown shows accurate material selections
- ✅ Tier comparison (Basic/Standard/Premium) clear
- ✅ Mobile responsive
- ✅ Lighthouse score 90+
- ✅ Test coverage 80%+

---

**Last Updated**: November 5, 2025  
**Status**: Architecture redesigned for reverse cost calculator  
**Next Steps**: Phase 1 - Setup Next.js + implement cost matching algorithm
