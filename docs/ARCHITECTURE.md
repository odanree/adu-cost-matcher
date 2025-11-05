# ADU Cost Matcher - Technical Architecture

> **Purpose**: Technical architecture documentation for the ADU Cost Matcher - a reverse cost calculator.

---

## 📐 Architecture Overview

ADU Cost Matcher is a **client-side Next.js 14 application** that reverses the traditional cost calculator approach. Instead of designing an ADU and discovering the cost, users input their target cost/sqft and see what ADU they can build.

**Architecture Type**: Client-side SPA with Next.js SSR for SEO  
**Deployment**: Vercel (free tier)  
**Database**: None (MVP - no data persistence)  
**Authentication**: None (MVP - no user accounts)

**Key Principle**: Simplicity first - pure calculation engine, no backend complexity

---

## 🏗️ High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Cost Input   │  │ Cost         │  │ Tier         │         │
│  │ Component    │  │ Breakdown    │  │ Comparison   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│         │                  │                  │                 │
│         └──────────────────┴──────────────────┘                 │
│                          │                                       │
│                          ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          Zustand Store (Client State)                    │  │
│  │  ├─ costPerSqft: number                                 │  │
│  │  ├─ totalSqft: number | undefined                       │  │
│  │  ├─ breakdown: CostBreakdown | null                     │  │
│  │  └─ finishLevel: 'basic' | 'standard' | 'premium'       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                          │                                       │
│                          ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │        Cost Matching Algorithm (lib/calculator/)          │  │
│  │  ├─ Determine finish level from cost/sqft               │  │
│  │  ├─ Select materials for that tier                      │  │
│  │  ├─ Calculate labor (33% of budget)                     │  │
│  │  ├─ Estimate permits (10% of construction)              │  │
│  │  ├─ Calculate site work (12% of total)                  │  │
│  │  └─ Add contingency (7% of total)                       │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ (No backend, no database)
                              ▼
                       [No Server-Side Logic]
```

---

## 🗂️ Application Layers

### 1. Presentation Layer (React Components)

**Location**: `components/`

**Responsibilities**:
- User input (cost/sqft)
- Display cost breakdown
- Show tier comparisons
- Responsive UI

**Key Components**:

#### CostInput.tsx
Input form for cost/sqft and optional total sqft.

```typescript
interface CostInputProps {
  onCalculate: (costPerSqft: number, totalSqft?: number) => void;
}

export function CostInput({ onCalculate }: CostInputProps) {
  const [costPerSqft, setCostPerSqft] = useState<number>(200);
  const [totalSqft, setTotalSqft] = useState<number | undefined>(800);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(costPerSqft, totalSqft);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Cost per sqft:
        <input
          type="number"
          min={100}
          max={500}
          value={costPerSqft}
          onChange={(e) => setCostPerSqft(Number(e.target.value))}
        />
      </label>
      
      <label>
        Total sqft (optional):
        <input
          type="number"
          min={200}
          max={2000}
          value={totalSqft}
          onChange={(e) => setTotalSqft(Number(e.target.value))}
        />
      </label>
      
      <button type="submit">Calculate</button>
    </form>
  );
}
```

#### CostBreakdown.tsx
Display detailed cost breakdown with visual chart.

```typescript
interface CostBreakdownProps {
  breakdown: CostBreakdown;
  finishLevel: FinishLevel;
}

export function CostBreakdown({ breakdown, finishLevel }: CostBreakdownProps) {
  return (
    <div className={styles.breakdown}>
      <h2>Your ADU at {finishLevel} finish level</h2>
      
      <div className={styles.total}>
        Total Budget: ${breakdown.total.toLocaleString()}
      </div>
      
      <div className={styles.category}>
        <h3>Materials ({breakdown.materials.percentage}%)</h3>
        <p>${breakdown.materials.total.toLocaleString()}</p>
        <ul>
          <li>Flooring: {breakdown.materials.flooring.type} (${breakdown.materials.flooring.cost})</li>
          <li>Countertops: {breakdown.materials.countertops.type} (${breakdown.materials.countertops.cost})</li>
          <li>Fixtures: {breakdown.materials.fixtures.type} (${breakdown.materials.fixtures.cost})</li>
          <li>Appliances: {breakdown.materials.appliances.package} (${breakdown.materials.appliances.cost})</li>
        </ul>
      </div>
      
      <div className={styles.category}>
        <h3>Labor (33%)</h3>
        <p>${breakdown.labor.total.toLocaleString()}</p>
      </div>
      
      <div className={styles.category}>
        <h3>Permits (10%)</h3>
        <p>${breakdown.permits.total.toLocaleString()}</p>
      </div>
      
      <div className={styles.category}>
        <h3>Site Work (12%)</h3>
        <p>${breakdown.siteWork.total.toLocaleString()}</p>
      </div>
      
      <div className={styles.category}>
        <h3>Contingency (7%)</h3>
        <p>${breakdown.contingency.toLocaleString()}</p>
      </div>
    </div>
  );
}
```

#### TierComparison.tsx
Side-by-side comparison of Basic/Standard/Premium tiers.

```typescript
export function TierComparison({ currentCost }: { currentCost: number }) {
  const tiers = [
    { level: 'Basic', range: '$150-180/sqft', features: ['Vinyl flooring', 'Laminate countertops', 'Builder grade fixtures'] },
    { level: 'Standard', range: '$180-220/sqft', features: ['Engineered hardwood', 'Quartz countertops', 'Mid-range fixtures'] },
    { level: 'Premium', range: '$220-280/sqft', features: ['Solid hardwood', 'Granite countertops', 'High-end fixtures'] }
  ];
  
  return (
    <div className={styles.comparison}>
      {tiers.map(tier => (
        <div key={tier.level} className={isCurrentTier(tier, currentCost) ? styles.active : ''}>
          <h3>{tier.level}</h3>
          <p>{tier.range}</p>
          <ul>
            {tier.features.map(feature => <li key={feature}>{feature}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

---

### 2. State Management Layer (Zustand)

**Location**: `lib/store/`

**Responsibilities**:
- Manage cost calculator state
- Store user inputs
- Cache calculation results

```typescript
// lib/store/cost-store.ts

import { create } from 'zustand';
import { calculateCostBreakdown } from '../calculator/cost-matcher';

interface CostStore {
  // State
  costPerSqft: number;
  totalSqft: number | undefined;
  breakdown: CostBreakdown | null;
  finishLevel: FinishLevel | null;
  
  // Actions
  setCostPerSqft: (cost: number) => void;
  setTotalSqft: (sqft: number | undefined) => void;
  calculate: () => void;
  reset: () => void;
}

export const useCostStore = create<CostStore>((set, get) => ({
  // Initial state
  costPerSqft: 200,
  totalSqft: 800,
  breakdown: null,
  finishLevel: null,
  
  // Actions
  setCostPerSqft: (cost) => set({ costPerSqft: cost }),
  
  setTotalSqft: (sqft) => set({ totalSqft: sqft }),
  
  calculate: () => {
    const { costPerSqft, totalSqft } = get();
    const result = calculateCostBreakdown({ costPerSqft, totalSqft });
    set({ 
      breakdown: result.breakdown,
      finishLevel: result.finishLevel
    });
  },
  
  reset: () => set({ 
    breakdown: null, 
    finishLevel: null 
  })
}));
```

---

### 3. Business Logic Layer (Cost Matching Algorithm)

**Location**: `lib/calculator/`

**Responsibilities**:
- Reverse cost calculation (cost → design)
- Determine finish level from cost/sqft
- Select materials for budget tier
- Calculate labor, permits, site work
- Generate detailed breakdown

**Key Modules**:

#### lib/calculator/cost-matcher.ts
Main cost matching algorithm.

```typescript
export interface CostFactors {
  baseCostPerSqft: number;        // Base construction cost
  materialMultiplier: number;     // Based on finish level (0.8 - 1.5)
  locationMultiplier: number;     // Regional cost adjustment (0.8 - 1.5)
  laborRate: number;              // Local labor rate per hour
  permitCost: number;             // Fixed or percentage-based
  siteWorkMultiplier: number;     // Site-specific adjustments
}

export interface CostBreakdown {
  materials: {
    lumber: number;
    roofing: number;
    siding: number;
    flooring: number;
    countertops: number;
    fixtures: number;
    appliances: number;
    other: number;
  };
  labor: {
    framing: number;
    electrical: number;
    plumbing: number;
    hvac: number;
    finishes: number;
    other: number;
  };
  permits: {
    buildingPermit: number;
    electricalPermit: number;
    plumbingPermit: number;
    other: number;
  };
  siteWork: {
    excavation: number;
    foundation: number;
    utilities: number;
    landscaping: number;
  };
  contingency: number; // 10% of total
  total: number;
}

export async function calculateComprehensiveCost(
  design: ADUDesignInput
): Promise<CostBreakdown> {
  // 1. Get base cost per sqft based on size
  const baseCost = getBaseCostPerSqft(design.squareFeet);
  
  // 2. Get material costs based on selections
  const materialCosts = await calculateMaterialCosts(design);
  
  // 3. Calculate labor costs (typically 30-40% of total)
  const laborCosts = calculateLaborCosts(design, materialCosts);
  
  // 4. Calculate permit costs (varies by location)
  const permitCosts = await calculatePermitCosts(design.location);
  
  // 5. Calculate site work costs
  const siteWorkCosts = calculateSiteWorkCosts(design);
  
  // 6. Apply location multiplier
  const locationMultiplier = await getLocationMultiplier(design.location);
  
  // 7. Calculate contingency (10% of subtotal)
  const subtotal = materialCosts.total + laborCosts.total + permitCosts.total + siteWorkCosts.total;
  const contingency = subtotal * 0.1;
  
  return {
    materials: materialCosts,
    labor: laborCosts,
    permits: permitCosts,
    siteWork: siteWorkCosts,
    contingency,
    total: subtotal + contingency
  };
}
```

#### lib/calculator/material-pricing.ts
Material pricing database queries and calculations.

```typescript
export async function getMaterialPrice(
  materialId: string,
  quantity: number
): Promise<number> {
  const material = await prisma.material.findUnique({
    where: { id: materialId }
  });
  
  if (!material) throw new Error('Material not found');
  
  return material.costPerUnit * quantity;
}

export async function getMaterialsByCategory(
  category: string,
  finishLevel: string
): Promise<Material[]> {
  return prisma.material.findMany({
    where: {
      category,
      finishLevel
    },
    orderBy: { costPerUnit: 'asc' }
  });
}
```

#### lib/calculator/location-multiplier.ts
Regional cost adjustments based on location.

```typescript
export async function getLocationMultiplier(
  location: string
): Promise<number> {
  // Try to find by ZIP code
  const multiplier = await prisma.locationMultiplier.findUnique({
    where: { zipCode: location }
  });
  
  if (multiplier) return multiplier.multiplier;
  
  // Default to 1.0 if location not found
  return 1.0;
}
```

---

### 4. Data Access Layer (Prisma ORM)

**Location**: `prisma/`, `lib/prisma.ts`

**Responsibilities**:
- Database schema definition
- Data modeling
- Type-safe database queries
- Migrations
- Data seeding

**Database Schema**:

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String        @id @default(cuid())
  email         String        @unique
  name          String?
  password      String?       // Hashed password (bcrypt)
  emailVerified DateTime?
  image         String?
  accounts      Account[]     // OAuth accounts
  sessions      Session[]     // NextAuth sessions
  designs       ADUDesign[]
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  
  @@unique([identifier, token])
}

model ADUDesign {
  id            String        @id @default(cuid())
  userId        String
  user          User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  name          String
  squareFeet    Int
  bedrooms      Int
  bathrooms     Decimal       @db.Decimal(2, 1)
  finishLevel   String        // basic, standard, premium
  location      String?
  costEstimate  Decimal       @db.Decimal(10, 2)
  breakdown     Json          // Detailed cost breakdown (CostBreakdown type)
  isPublic      Boolean       @default(false)
  shareToken    String?       @unique // For sharing designs via link
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  
  @@index([userId])
  @@index([shareToken])
}

model Material {
  id            String        @id @default(cuid())
  category      String        // flooring, countertops, fixtures, appliances, lumber, etc.
  name          String
  description   String?
  costPerUnit   Decimal       @db.Decimal(10, 2)
  unit          String        // sqft, each, linear_foot
  finishLevel   String        // basic, standard, premium
  imageUrl      String?
  manufacturer  String?
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  
  @@index([category, finishLevel])
}

model LocationMultiplier {
  id            String        @id @default(cuid())
  zipCode       String        @unique
  city          String
  state         String
  county        String?
  multiplier    Decimal       @db.Decimal(3, 2) // 0.80 - 1.50
  notes         String?       // e.g., "High cost area due to strict regulations"
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  
  @@index([state, city])
}
```

**Prisma Client Initialization**:

```typescript
// lib/prisma.ts

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

---

## 🔐 Authentication Flow

**Provider**: NextAuth.js v5  
**Strategies**: Email/Password, Google OAuth

**Flow Diagram**:

```
1. User clicks "Sign In"
   ↓
2. Next.js redirects to /api/auth/signin
   ↓
3. User chooses provider (Email or Google)
   ↓
4. If Email:
   a. User enters email + password
   b. NextAuth verifies credentials against database
   c. Creates session, returns JWT token
   
5. If Google OAuth:
   a. Redirects to Google OAuth consent screen
   b. User authorizes application
   c. Google redirects back with authorization code
   d. NextAuth exchanges code for tokens
   e. Creates/updates user in database
   f. Creates session, returns JWT token
   ↓
6. User is authenticated, session stored in cookie
   ↓
7. Protected routes check session via middleware
   ↓
8. API routes access user via getServerSession()
```

**Configuration**:

```typescript
// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        
        if (!user || !user.password) return null;
        
        const isValid = await bcrypt.compare(credentials.password, user.password);
        
        if (!isValid) return null;
        
        return { id: user.id, email: user.email, name: user.name };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

---

## 🧪 Testing Strategy

### Unit Tests (Vitest)
- **Coverage Target**: 80%+
- **Focus**: Business logic, utilities, calculations

**Example**:
```typescript
// __tests__/lib/calculator/cost-engine.test.ts

import { describe, it, expect } from 'vitest';
import { calculateComprehensiveCost } from '@/lib/calculator/cost-engine';

describe('Cost Engine', () => {
  it('calculates total cost for basic 800 sqft ADU', async () => {
    const result = await calculateComprehensiveCost({
      squareFeet: 800,
      bedrooms: 1,
      bathrooms: 1,
      finishLevel: 'basic',
      location: '94301'
    });
    
    expect(result.total).toBeGreaterThan(100000);
    expect(result.total).toBeLessThan(250000);
    expect(result.contingency).toBe(result.total * 0.1);
  });
});
```

### Integration Tests (Vitest + Prisma)
- **Focus**: Database operations, API routes
- **Setup**: Use test database with Prisma migrations

**Example**:
```typescript
// __tests__/api/designs.test.ts

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { prisma } from '@/lib/prisma';
import { POST } from '@/app/api/designs/route';

describe('POST /api/designs', () => {
  beforeAll(async () => {
    // Setup test database
    await prisma.$executeRaw`TRUNCATE TABLE "ADUDesign" CASCADE`;
  });
  
  it('saves a new design', async () => {
    const request = new Request('http://localhost:3000/api/designs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test ADU',
        squareFeet: 800,
        bedrooms: 1,
        bathrooms: 1,
        finishLevel: 'basic',
        costEstimate: 150000,
        breakdown: {}
      })
    });
    
    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.design.id).toBeDefined();
    expect(data.design.name).toBe('Test ADU');
  });
  
  afterAll(async () => {
    await prisma.$disconnect();
  });
});
```

### E2E Tests (Cypress)
- **Focus**: User workflows, critical paths
- **Coverage**: Authentication, design creation, cost calculation

**Example**:
```typescript
// cypress/e2e/adu-builder.cy.ts

describe('ADU Builder Workflow', () => {
  it('completes full design and cost calculation', () => {
    cy.visit('/');
    
    // Step 1: Enter size
    cy.get('input[name="squareFeet"]').type('800');
    cy.get('button').contains('Next').click();
    
    // Step 2: Select bedrooms/bathrooms
    cy.get('button[data-bedrooms="1"]').click();
    cy.get('button[data-bathrooms="1"]').click();
    cy.get('button').contains('Next').click();
    
    // Step 3: Select finish level
    cy.get('button[data-finish="standard"]').click();
    cy.get('button').contains('Calculate Cost').click();
    
    // Verify cost breakdown appears
    cy.get('[data-testid="cost-breakdown"]').should('be.visible');
    cy.get('[data-testid="total-cost"]').should('contain', '$');
  });
});
```

---

## 🚀 Deployment Architecture

### Vercel (Production)

**Configuration**:
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "env": {
    "DATABASE_URL": "@database-url",
    "NEXTAUTH_SECRET": "@nextauth-secret",
    "NEXTAUTH_URL": "https://adu-builder.vercel.app"
  }
}
```

**Database**: Vercel Postgres (automatically provisioned)

**Deployment Flow**:
```
1. Push to main branch
   ↓
2. Vercel detects commit
   ↓
3. Build triggered:
   a. npm install
   b. npx prisma generate
   c. npm run build
   ↓
4. Build artifacts deployed to edge network
   ↓
5. Database migrations run (if any)
   ↓
6. Application live at production URL
```

### Docker (Self-Hosted)

**Dockerfile**:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

**docker-compose.yml**:
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: adu_builder
      POSTGRES_USER: adu_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  app:
    build: .
    environment:
      DATABASE_URL: postgresql://adu_user:${DB_PASSWORD}@postgres:5432/adu_builder
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
      NEXTAUTH_URL: http://localhost:3000
    ports:
      - "3000:3000"
    depends_on:
      - postgres

volumes:
  postgres_data:
```

---

## 🔧 Environment Configuration

**Required Environment Variables**:

```bash
# .env.local

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/adu_builder"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# External APIs (Optional)
GOOGLE_MAPS_API_KEY=""
```

---

## 📊 Performance Considerations

### Database Optimization
- **Indexes**: On `userId`, `shareToken`, `category + finishLevel`
- **Connection Pooling**: Prisma connection pooling enabled
- **Caching**: Use Vercel Edge Cache for static data (materials list)

### Frontend Optimization
- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: Next.js `<Image>` component
- **SSR**: Server-side render initial page for faster load
- **Lazy Loading**: Lazy load heavy components (charts, 3D viewer)

### API Optimization
- **Response Caching**: Cache material prices for 1 hour
- **Database Queries**: Use Prisma query optimization
- **Rate Limiting**: Implement rate limiting on cost calculation endpoint

---

## 🔒 Security Considerations

1. **Authentication**: NextAuth.js with secure session management
2. **Authorization**: Middleware to protect API routes and pages
3. **Input Validation**: Zod schemas on all API endpoints
4. **SQL Injection**: Prevented by Prisma ORM (parameterized queries)
5. **XSS Protection**: React's built-in XSS protection
6. **CSRF**: NextAuth.js CSRF protection enabled
7. **Environment Variables**: Never commit `.env.local` to git
8. **Database**: Use least-privilege database user
9. **Rate Limiting**: Implement on public endpoints

---

## 📈 Monitoring & Observability

### Production Monitoring
- **Error Tracking**: Sentry for error monitoring
- **Performance**: Vercel Analytics for Core Web Vitals
- **Logging**: Structured logging with Winston or Pino
- **Database**: Vercel Postgres built-in monitoring

### Alerts
- **Error Rate**: Alert if error rate > 1%
- **Response Time**: Alert if p95 > 2000ms
- **Database**: Alert if connection pool exhausted

---

## 🛣️ Migration Roadmap

See [ROADMAP.md](../ROADMAP.md) for complete 6-week migration timeline from Express to Next.js.

**Key Milestones**:
- **Week 1**: Next.js setup + Prisma database
- **Week 2**: Core cost calculator engine
- **Week 3**: Frontend UI components
- **Week 4**: Authentication + advanced features
- **Week 5**: Testing & QA
- **Week 6**: Production deployment

---

**Last Updated**: November 5, 2025  
**Status**: Architecture defined, ready for implementation  
**Next Steps**: Begin Phase 1 - Next.js migration
