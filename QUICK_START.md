# ADU Builder - Quick Start

## Project Created Successfully! ✅

Your ADU Builder project has been scaffolded with the same structure and conventions as the ai-chatbot project.

---

## 📁 Project Structure

```
ADU-builder/
├── .github/
│   ├── BRANCHING_STRATEGY.md    # Git workflow guide
│   └── copilot-instructions.md  # AI assistant guidelines
├── src/
│   ├── api/
│   │   └── index.ts            # Express server
│   ├── calculator/
│   │   └── index.ts            # Cost calculation logic
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   └── utils/
│       └── index.ts            # Utility functions
├── tests/
│   ├── calculator.test.ts      # Calculator tests
│   └── utils.test.ts           # Utility tests
├── docs/                        # Documentation (empty, ready for content)
├── public/                      # Static files (empty)
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── CONTRIBUTING.md              # Contribution guidelines
├── docker-compose.yml           # Docker Compose config
├── Dockerfile                   # Docker configuration
├── INDEX.md                     # Documentation index
├── LICENSE                      # MIT License
├── package.json                 # Dependencies & scripts
├── README.md                    # Project overview
├── ROADMAP.md                   # Development roadmap
├── tsconfig.json                # TypeScript configuration
├── vercel.json                  # Vercel deployment config
└── vitest.config.ts             # Vitest test configuration
```

---

## 🚀 Next Steps

### 1. Install Dependencies

```powershell
cd C:\Users\Danh\Desktop\ADU-builder
npm install
```

### 2. Setup Environment

```powershell
cp .env.example .env.local
```

Then edit `.env.local` and add your configuration.

### 3. Start Development Server

```powershell
npm run dev
```

Server will run on `http://localhost:3000`

### 4. Run Tests

```powershell
npm test
```

---

## 🌿 Git Setup

### Initialize Git Repository

```powershell
cd C:\Users\Danh\Desktop\ADU-builder
git init
git add .
git commit -m "chore: initial project setup

- Add TypeScript configuration
- Setup Express server
- Add calculator module
- Configure testing with Vitest
- Add Docker support
- Setup Vercel deployment
- Add documentation structure"
```

### Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ADU-builder`
3. Description: `Intelligent ADU (Accessory Dwelling Unit) builder and cost calculator`
4. Public or Private (your choice)
5. **Do NOT** initialize with README (we already have one)
6. Click "Create repository"

### Push to GitHub

```powershell
git remote add origin https://github.com/odanree/ADU-builder.git
git branch -M main
git push -u origin main
```

### Create Dev Branch

```powershell
git checkout -b dev
git push -u origin dev
```

### Set Default Branch to Dev (on GitHub)

1. Go to repository Settings → Branches
2. Change default branch from `main` to `dev`
3. Confirm the change

---

## 📝 Key Features Included

✅ **TypeScript Setup** - Strict mode, ES modules  
✅ **Express Server** - Basic API with `/api/calculate` endpoint  
✅ **Cost Calculator** - Simple calculation logic (placeholder)  
✅ **Testing Infrastructure** - Vitest with 2 test suites  
✅ **Git Workflow** - Same branching strategy as ai-chatbot  
✅ **Docker Support** - Multi-stage Dockerfile + docker-compose  
✅ **Vercel Deployment** - Ready for deployment  
✅ **Documentation** - README, ROADMAP, INDEX, CONTRIBUTING  
✅ **Type Safety** - Full TypeScript types and interfaces  

---

## 📚 Documentation Overview

- **README.md** - Project overview and quick start
- **ROADMAP.md** - Development phases and milestones
- **INDEX.md** - Documentation index
- **.github/BRANCHING_STRATEGY.md** - Git workflow guide
- **.github/copilot-instructions.md** - AI assistant context
- **CONTRIBUTING.md** - Contribution guidelines

---

## 🎯 Development Workflow

### Feature Development

```powershell
# 1. Update dev branch
git checkout dev
git pull origin dev

# 2. Create feature branch
git checkout -b feat/my-feature

# 3. Make changes and commit
git add .
git commit -m "feat(scope): description"

# 4. Push and create PR to dev
git push -u origin feat/my-feature
gh pr create --base dev --head feat/my-feature

# 5. After approval, squash and merge
gh pr merge --squash
```

### Release to Production

```powershell
# Create PR from dev to main
gh pr create --base main --head dev --title "Release: v0.1.0"

# After approval
gh pr merge --squash
```

---

## 🧪 Testing

### Run All Tests
```powershell
npm test
```

### Watch Mode
```powershell
npm run test:watch
```

### With Coverage
```powershell
npm test -- --coverage
```

---

## 🐳 Docker

### Build Image
```powershell
docker build -t adu-builder .
```

### Run Container
```powershell
docker run -p 3000:3000 adu-builder
```

### Docker Compose
```powershell
docker-compose up
```

---

## 🚢 Deployment

### Vercel

1. Install Vercel CLI:
   ```powershell
   npm i -g vercel
   ```

2. Deploy:
   ```powershell
   vercel
   ```

3. Production deployment:
   ```powershell
   vercel --prod
   ```

---

## ⚙️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Run production build |
| `npm test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint TypeScript files |
| `npm run format` | Format code with Prettier |

---

## 📦 Dependencies

### Production
- `express` - Web framework
- `dotenv` - Environment variables
- `node-fetch` - HTTP client

### Development
- `typescript` - TypeScript compiler
- `ts-node` - TypeScript execution
- `vitest` - Testing framework
- `@types/express` - Express type definitions
- `@types/node` - Node.js type definitions

---

## 🔄 Comparison with ai-chatbot

| Feature | ai-chatbot | ADU-builder |
|---------|-----------|-------------|
| Framework | Express.js | Express.js ✅ |
| Language | TypeScript | TypeScript ✅ |
| Module System | ESM | ESM ✅ |
| Testing | Vitest | Vitest ✅ |
| Deployment | Vercel/Docker | Vercel/Docker ✅ |
| Git Strategy | dev → main | dev → main ✅ |
| Conventional Commits | Yes | Yes ✅ |
| Documentation | Comprehensive | Comprehensive ✅ |

---

## ❓ Questions?

- Check [ROADMAP.md](ROADMAP.md) for project status
- See [.github/BRANCHING_STRATEGY.md](.github/BRANCHING_STRATEGY.md) for git workflow
- Read [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
- Open an issue on GitHub for support

---

**Project Status**: ✅ Setup Complete, Ready for Development  
**Next Step**: Install dependencies with `npm install`

---

Happy coding! 🎉
