# ADU Cost Matcher - Complete Development Roadmap

**Last Updated**: November 5, 2025  
**Project Status**: 5% Complete (Architecture Redesigned)  
**Current Phase**: Architecture Planning → Cost Matcher MVP  
**Next Milestone**: Phase 1 - Next.js Setup & Cost Matching Algorithm

---

## � Product Concept: Cost-First ADU Matcher

**Problem**: Traditional ADU calculators ask users to design first, then show unaffordable costs  
**Solution**: Reverse the process - users set their budget, we show what ADU they can build

### How It Works

```
1. User Input:
   └─ Target cost per sqft: $200/sqft (example)
   
2. Calculator Output:
   ├─ Total Budget Calculation (if sqft provided)
   ├─ Finish Level: Standard (achievable at this price)
   ├─ Bedrooms: 1-2 (based on sqft efficiency)
   ├─ Bathrooms: 1 full bath
   ├─ Material Breakdown:
   │  ├─ Flooring: Vinyl plank ($5/sqft)
   │  ├─ Countertops: Laminate ($30/linear ft)
   │  ├─ Fixtures: Mid-range ($800 total)
   │  └─ Appliances: Standard package ($2,500)
   ├─ Labor: 35% of total ($70/sqft)
   ├─ Permits: 8% of total ($16/sqft)
   ├─ Site Work: Basic foundation ($20/sqft)
   └─ Contingency: 10% ($20/sqft)
```

---

## 🏗️ Architecture Decision (Nov 5, 2025)

**Concept Pivot:** From traditional "design → cost" calculator to **"cost → design" matcher**

### Tech Stack Evolution

| Component | Initial | V1 (Design-First) | **V2 (Cost-First MVP)** | Reason |
|-----------|---------|-------------------|------------------------|--------|
| **Framework** | Express.js | Next.js 14 | **Next.js 14** | Keep - SEO + UI |
| **Frontend** | None | React 18 | **React 18 + CSS Modules** | Keep - Interactive UI |
| **Database** | None | PostgreSQL + Prisma | **None (MVP)** | Remove - Not needed for calculator |
| **Auth** | None | NextAuth.js | **None (MVP)** | Remove - No user accounts yet |
| **State** | N/A | Zustand | **Zustand** | Keep - Client state |
| **Validation** | N/A | Zod | **Zod** | Keep - Input validation |
| **Testing** | Vitest | Vitest | **Vitest** | Keep - Unit tests |
| **Deployment** | Vercel | Vercel | **Vercel** | Keep - Free tier |

### Why Cost-First Approach?

1. ✅ **User-Centric**: People know their budget before ADU features
2. ✅ **Simpler UX**: One input (cost/sqft) vs 10+ design choices
3. ✅ **Faster MVP**: No database, no auth, just pure calculation
4. ✅ **Educational**: Shows trade-offs (premium finishes = higher cost)
5. ✅ **SEO Friendly**: "ADU cost calculator" searches land on calculator page

### Architecture Simplification

**❌ Removed from MVP:**
- PostgreSQL database (no saved designs)
- NextAuth.js (no user accounts)
- Prisma ORM (no database)
- API routes (calculations run client-side)
- PDF export (future feature)

**✅ Keeping for MVP:**
- Next.js 14 (SSR for SEO, React for UI)
- Zustand (manage cost breakdown state)
- Zod (validate cost/sqft input)
- CSS Modules (consistent styling)
- Vitest (test cost matching logic)

---

## 📊 Visual Progress Timeline

```
Phase 1          Phase 2          Phase 3          Phase 4
Next.js Setup   Cost Matcher    UI Polish       Future Features
   ⏳              ⏳               ⏳               ⏳
Planned        Planned          Planned          Future
  Week 1-2      Week 3           Week 4           TBD

Timeline:
|───────────────────────────────────────────────────────────────────────|
├─ Completed ✅: Architecture redesigned for cost-first approach
├─ Status: 🚧 READY TO START
├─ Production Ready: NO
└─ Next: Build cost matching algorithm

Progress: ███░░░░░░░░░░░░░░░░░░░░░░░░░░░ 5% (Concept defined)
```

---

## 📋 Development Phases (Redesigned for Cost Matcher)

### Phase 1: Next.js Setup & Cost Matching Algorithm (⏳ WEEK 1-2)

```
[⏳] 1.1 - Next.js 14 Setup (Simplified)
     ├─ Initialize Next.js with App Router
     ├─ Configure TypeScript
     ├─ Setup CSS Modules
     ├─ Install Zustand + Zod
     └─ NO database, NO auth (pure frontend app)

[⏳] 1.2 - Cost Matching Algorithm
     ├─ Define cost tiers (Basic: $150-180/sqft, Standard: $180-220, Premium: $220-280)
     ├─ Build reverse calculator logic
     ├─ Input: cost/sqft → Output: feature breakdown
     ├─ Cost allocation percentages:
     │  ├─ Materials: 35-40%
     │  ├─ Labor: 30-35%
     │  ├─ Permits: 8-12%
     │  ├─ Site Work: 10-15%
     │  └─ Contingency: 10%
     └─ Material selection based on budget tier

[⏳] 1.3 - Type Definitions
     ├─ CostInput interface (cost/sqft, optional sqft)
     ├─ CostBreakdown type (detailed breakdown)
     ├─ FinishLevel enum (basic, standard, premium)
     └─ MaterialSelection types

[⏳] 1.4 - Core Calculator Logic
     ├─ lib/calculator/cost-matcher.ts
     ├─ Given cost/sqft, determine:
     │  ├─ Finish level achievable
     │  ├─ Material options (flooring, countertops, fixtures)
     │  ├─ Labor breakdown
     │  ├─ Permit estimates
     │  └─ Site work requirements
     └─ Return comprehensive breakdown

Completion: 0% | Duration: Week 1-2 | Deliverables: Working cost matcher
```

---

### Phase 2: Interactive UI (⏳ WEEK 3)

```
[⏳] 2.1 - Cost Input Component
     ├─ Input: Target cost per sqft ($)
     ├─ Optional: Total sqft input
     ├─ Real-time validation (min: $100/sqft, max: $500/sqft)
     └─ Display total budget calculation

[⏳] 2.2 - Cost Breakdown Display
     ├─ Visual breakdown (pie chart or bar chart)
     ├─ Detailed line items:
     │  ├─ Materials breakdown (flooring, countertops, etc.)
     │  ├─ Labor breakdown (framing, electrical, plumbing, etc.)
     │  ├─ Permit costs
     │  ├─ Site work costs
     │  └─ Contingency
     ├─ Show finish level indicator (Basic/Standard/Premium)
     └─ Highlight what's included/excluded at this price

[⏳] 2.3 - Feature Comparison View
     ├─ Show 3 tiers side-by-side
     ├─ Example: At $200/sqft you get Standard
     │  ├─ Basic ($150-180): Economy materials, minimal finishes
     │  ├─ Standard ($180-220): Mid-range materials, good finishes
     │  └─ Premium ($220-280): High-end materials, custom finishes
     └─ Explain trade-offs clearly

[⏳] 2.4 - Responsive Design
     ├─ Mobile-first layout
     ├─ CSS Modules for styling
     ├─ Accessibility (keyboard nav, screen readers)
     └─ Clean, professional design

Completion: 0% | Duration: Week 3 | Deliverables: Interactive calculator UI
```

---

### Phase 3: Polish & SEO (⏳ WEEK 4)

```
[⏳] 3.1 - SEO Optimization
     ├─ Meta tags (title, description)
     ├─ Open Graph tags (social sharing)
     ├─ Structured data (JSON-LD for rich snippets)
     └─ Sitemap.xml

[⏳] 3.2 - Content & Education
     ├─ Explainer: "How ADU costs work"
     ├─ Material comparison guide
     ├─ FAQ section
     └─ Cost tier explanations

[⏳] 3.3 - Performance Optimization
     ├─ Code splitting
     ├─ Image optimization
     ├─ Lazy loading
     └─ Lighthouse score 90+

[⏳] 3.4 - Testing
     ├─ Unit tests for cost matcher logic
     ├─ Component tests (React Testing Library)
     ├─ E2E tests (Cypress) for critical path
     └─ Test coverage 80%+

Completion: 0% | Duration: Week 4 | Deliverables: Production-ready MVP
```

---

### Phase 4: Future Enhancements (⏳ FUTURE)

```
[⏳] 4.1 - Location-Based Pricing
     ├─ ZIP code input
     ├─ Regional cost multipliers
     ├─ Permit cost variations by city
     └─ Labor rate adjustments

[⏳] 4.2 - User Accounts (Optional)
     ├─ Save cost scenarios
     ├─ Compare multiple options
     ├─ Email results
     └─ Track cost trends over time

[⏳] 4.3 - Advanced Features
     ├─ PDF export of cost breakdown
     ├─ Share link to scenario
     ├─ Material image gallery
     └─ Contractor recommendations

[⏳] 4.4 - Interactive Sliders
     ├─ Adjust individual cost components
     ├─ See real-time impact on total
     ├─ Trade-off explorer (upgrade flooring, downgrade countertops)
     └─ Custom material selection

Completion: 0% | Duration: TBD | Deliverables: Enhanced platform
```

---

## 🧮 Cost Matching Algorithm Design

### Input
```typescript
interface CostMatcherInput {
  costPerSqft: number;      // Target cost per sqft (e.g., 200)
  totalSqft?: number;        // Optional total sqft (e.g., 800)
  location?: string;         // Optional ZIP code (future)
}
```

### Output
```typescript
interface CostMatcherOutput {
  totalBudget: number;                    // costPerSqft * totalSqft
  finishLevel: 'basic' | 'standard' | 'premium';
  breakdown: {
    materials: {
      flooring: { type: string; cost: number; costPerSqft: number; };
      countertops: { type: string; cost: number; linearFeet: number; };
      fixtures: { type: string; cost: number; };
      appliances: { package: string; cost: number; };
      lumber: { cost: number; };
      roofing: { type: string; cost: number; };
      siding: { type: string; cost: number; };
      other: { cost: number; };
      total: number;
    };
    labor: {
      framing: number;
      electrical: number;
      plumbing: number;
      hvac: number;
      finishes: number;
      total: number;
    };
    permits: {
      building: number;
      electrical: number;
      plumbing: number;
      total: number;
    };
    siteWork: {
      excavation: number;
      foundation: number;
      utilities: number;
      total: number;
    };
    contingency: number;      // 10% of subtotal
  };
  recommendations: string[];  // What you get at this price
  tradeoffs: string[];        // What's excluded/downgraded
}
```

### Logic Flow
```
1. Determine finish level based on cost/sqft:
   - Basic: $150-180/sqft
   - Standard: $180-220/sqft
   - Premium: $220-280/sqft
   - Luxury: $280+/sqft

2. Allocate budget percentages:
   - Materials: 38% (varies by finish level)
   - Labor: 33%
   - Permits: 10%
   - Site Work: 12%
   - Contingency: 7%

3. Select materials based on finish level:
   Basic:
   - Flooring: Vinyl plank ($5/sqft)
   - Countertops: Laminate ($25-30/linear ft)
   - Fixtures: Builder grade ($600-800)
   - Appliances: Basic package ($1,500-2,000)
   
   Standard:
   - Flooring: Engineered hardwood ($8/sqft)
   - Countertops: Quartz ($60-80/linear ft)
   - Fixtures: Mid-range ($1,200-1,500)
   - Appliances: Standard package ($2,500-3,500)
   
   Premium:
   - Flooring: Solid hardwood ($12/sqft)
   - Countertops: Granite/Marble ($100-120/linear ft)
   - Fixtures: High-end ($2,000-3,000)
   - Appliances: Premium package ($4,500-6,000)

4. Calculate labor as % of total budget

5. Estimate permits (typically 8-12% of construction cost)

6. Calculate site work based on typical ADU requirements

7. Add 10% contingency

8. Return detailed breakdown
```

```
[⏳] 1.1 - Next.js 14 Setup
     ├─ Update package.json with Next.js dependencies
     ├─ Create app/ directory (App Router)
     ├─ Setup next.config.js
     ├─ Configure TypeScript for Next.js
     └─ Migrate API routes from Express

[⏳] 1.2 - Prisma + PostgreSQL Setup
     ├─ Initialize Prisma
     ├─ Design database schema (Users, ADUDesigns, Materials, CostEstimates)
     ├─ Setup Vercel Postgres or local DB
     ├─ Create migrations
     └─ Seed initial materials data

[⏳] 1.3 - Project Structure
     ├─ app/ - Next.js App Router
     ├─ components/ - React components
     ├─ lib/ - Utilities, Prisma client, cost calculator
     ├─ prisma/ - Database schema
     ├─ public/ - Static assets
     └─ types/ - TypeScript definitions

[⏳] 1.4 - Development Environment
     ├─ Environment variables (.env.local)
     ├─ Database connection
     ├─ Hot reload configuration
     └─ Testing setup with Vitest

Completion: 0% | Duration: Week 1 | Deliverables: Next.js app + DB
```

---

### Phase 2: Core Calculator Logic (⏳ WEEK 2)

```
[⏳] 2.1 - Enhanced Cost Calculator
     ├─ Comprehensive cost factors (location, finishes, site, permits)
---

## 📚 Key Resources

- [README.md](README.md) - Project overview and quick start
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - Technical architecture (updated for cost matcher)
- [INDEX.md](INDEX.md) - Complete documentation index

---

## 🚀 Getting Started

### Quick Start (After Phase 1 Complete)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
http://localhost:3000
```

### How to Use the Cost Matcher

1. **Enter target cost/sqft**: e.g., $200/sqft
2. **Optional: Enter total sqft**: e.g., 800 sqft
3. **See instant breakdown**: Materials, labor, permits, site work
4. **Understand trade-offs**: What you get at Basic vs Standard vs Premium

---

**Last Updated**: November 5, 2025  
**Status**: Architecture redesigned for cost-first approach  
**Next Steps**: Begin Phase 1 - Setup Next.js + build cost matching algorithm

[⏳] 7.2 - Mobile App
     ├─ React Native version
     ├─ Offline mode
     ├─ Camera integration (site photos)
     └─ Push notifications

[⏳] 7.3 - Business Features
     ├─ Multi-user collaboration
     ├─ Team/contractor accounts
     ├─ Payment processing
     └─ Project management tools

[⏳] 7.4 - Data & Insights
     ├─ Cost trend analysis
     ├─ Regional pricing data
     ├─ Popular design analytics
     └─ Market reports

Completion: 0% | Duration: TBD | Deliverables: Advanced platform
```

---

## 🛣️ Migration Path: Express → Next.js

### Step 1: Dependency Update (Week 1)
```json
Remove:
- express
- node-fetch
- dotenv (Next.js has built-in support)

Add:
- next (14.x)
- react (18.x)
- react-dom (18.x)
- @prisma/client
- next-auth
- zod
- zustand
```

### Step 2: File Migration (Week 1)
```
src/api/index.ts → app/api/calculate/route.ts
src/calculator/index.ts → lib/calculator/cost-engine.ts
src/types/ → types/ (keep structure)
tests/ → __tests__/ (follow Next.js convention)
```

### Step 3: New Structure (Week 1-2)
```
app/
├── page.tsx - Homepage (ADU builder interface)
├── layout.tsx - Root layout
├── api/
│   ├── calculate/route.ts - Cost calculation endpoint
│   ├── designs/route.ts - Save/load designs
│   └── auth/[...nextauth]/route.ts - Authentication
components/
├── ADUBuilder.tsx - Main builder component
├── CostBreakdown.tsx - Cost display
├── DesignGallery.tsx - Templates
└── ui/ - Reusable UI components
lib/
├── calculator/ - Cost calculation logic
├── prisma.ts - Database client
└── utils/ - Helpers
prisma/
├── schema.prisma - Database schema
└── seed.ts - Initial data
```

### Step 4: Testing Migration (Week 5)
```
Update test imports:
- Import from @/lib instead of ../src
- Use Next.js testing utilities
- Mock Next.js router/auth
- Update API route tests for new format
```

---

## 🗄️ Database Schema (Prisma)

```prisma
// prisma/schema.prisma

model User {
  id            String        @id @default(cuid())
  email         String        @unique
  name          String?
  designs       ADUDesign[]
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

model ADUDesign {
  id            String        @id @default(cuid())
  userId        String
  user          User          @relation(fields: [userId], references: [id])
  name          String
  squareFeet    Int
  bedrooms      Int
  bathrooms     Decimal
  finishLevel   String        // basic, standard, premium
  location      String?
  costEstimate  Decimal
  breakdown     Json          // Detailed cost breakdown
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

model Material {
  id            String        @id @default(cuid())
  category      String        // flooring, countertops, fixtures, etc.
  name          String
  costPerUnit   Decimal
  unit          String        // sqft, each, linear_foot
  finishLevel   String        // basic, standard, premium
}

model LocationMultiplier {
  id            String        @id @default(cuid())
  zipCode       String        @unique
  city          String
  state         String
  multiplier    Decimal       // Cost adjustment factor (0.8 - 1.5)
}
```

### Phase 5: Testing & QA (⏳ PLANNED)

```
[⏳] 5.1 - Unit Tests
     ├─ Calculator tests
     ├─ API tests
     ├─ Integration tests
     └─ Edge case coverage

[⏳] 5.2 - E2E Tests
     ├─ User flow testing
     ├─ Browser compatibility
     ├─ Mobile responsiveness
     └─ Performance testing

[⏳] 5.3 - Code Quality
     ├─ ESLint setup
     ├─ Code coverage
     ├─ Documentation review
     └─ Security audit

Completion: 0% | Duration: TBD | Target: TBD
```

---

### Phase 6: Deployment (⏳ PLANNED)

```
[⏳] 6.1 - CI/CD Pipeline
     ├─ GitHub Actions workflow
     ├─ Automated testing
     ├─ Build process
     └─ Deployment automation

[⏳] 6.2 - Vercel Deployment
     ├─ Production setup
     ├─ Environment variables
     ├─ Domain configuration
     └─ Preview deployments

[⏳] 6.3 - Docker Setup
     ├─ Dockerfile optimization
     ├─ Multi-stage builds
     ├─ Container registry
     └─ Orchestration config

Completion: 0% | Duration: TBD | Target: TBD
```

---

### Phase 7: Enhancements (⏳ FUTURE)

```
[⏳] 7.1 - Advanced Features
     ├─ 3D visualization
     ├─ AR preview
     ├─ PDF export
     └─ Permit assistance

[⏳] 7.2 - Analytics
     ├─ Usage tracking
     ├─ Cost trends
     ├─ Popular designs
     └─ User insights

Completion: 0% | Duration: TBD | Target: TBD
```

---

## 📈 Milestone Tracking

| Milestone | Target Date | Status | Deliverables |
|-----------|------------|--------|--------------|
| M1: Project Setup | TBD | ⏳ Planned | TypeScript, Express, Tests |
| M2: Core Calculator | TBD | ⏳ Planned | Cost algorithms, API endpoints |
| M3: UI Development | TBD | ⏳ Planned | Design interface, widgets |
| M4: Integration | TBD | ⏳ Planned | External services, database |
| M5: Testing Complete | TBD | ⏳ Planned | All tests passing |
| M6: Production Deploy | TBD | ⏳ Planned | Live on Vercel |
| M7: Feature Complete | TBD | ⏳ Planned | All enhancements |

---

## 🎯 Success Criteria

### MVP Requirements (Minimum Viable Product)
- [ ] Basic cost calculator working
- [ ] API endpoints functional
- [ ] Simple UI for user input
- [ ] Deployed to Vercel
- [ ] Basic test coverage (>70%)

### Production Ready
- [ ] Comprehensive test coverage (>90%)
- [ ] Full documentation
- [ ] CI/CD pipeline operational
- [ ] Performance optimized
- [ ] Security audit passed
- [ ] Production deployment verified

---

## 📝 Notes

**Priorities**:
1. Setup development environment
2. Define core requirements
3. Build MVP features
4. Test and iterate
5. Deploy to production

**Dependencies**:
- Define exact feature set
- Identify required integrations
- Research ADU regulations
- Determine cost data sources

**Risks**:
- Cost data accuracy and sources
- Complexity of ADU regulations
- UI/UX design requirements
- External API dependencies

---

## 🔄 Change Log

### November 5, 2025
- Initial roadmap created
- Project structure defined
- Phase outline established

---

**Questions or Feedback?**  
Open an issue on [GitHub](https://github.com/odanree/ADU-builder/issues)
