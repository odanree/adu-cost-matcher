# Screenshots

This folder contains screenshots of the ADU Cost Calculator application for the PR documentation.

## Required Screenshots

### 1. `01-input-form.png`
**What to capture**: The Cost Input Form component at the top of the page
- Input field for cost/sqft
- Optional sqft input field
- Budget summary display
- Calculate/Reset buttons
- **Size**: Full width, desktop view (1280px+)

### 2. `02-breakdown.png`
**What to capture**: The Cost Breakdown Display showing calculation results
- Finish level indicator (Basic/Standard/Premium/Luxury)
- Budget allocation breakdown with percentages
- Collapsible sections for each category
- Material recommendations
- **Size**: Full width showing complete breakdown

### 3. `03-faq.png`
**What to capture**: The FAQ Component with category filtering
- Category filter buttons (Basics, How It Works, Finish Levels, etc.)
- Expanded FAQ items showing questions and answers
- Accordion collapse/expand animation (capture expanded state)
- **Size**: Full width showing multiple FAQ items

### 4. `04-mobile.png`
**What to capture**: Mobile responsive view of the application
- Show the calculator on a mobile device (375px width)
- Can show any section (form, breakdown, or FAQ)
- Demonstrates responsive CSS Modules design
- **Size**: Mobile viewport (375-425px width)

## How to Take Screenshots

1. **Desktop Screenshots**:
   - Open http://localhost:3000 in browser
   - Press F12 to open DevTools
   - Set viewport to desktop (1280px+)
   - Scroll to section, take screenshot using DevTools or Cmd+Shift+S
   - Save as PNG files

2. **Mobile Screenshots**:
   - Open DevTools (F12)
   - Click device toolbar button (Ctrl+Shift+M or Cmd+Shift+M)
   - Set to "iPhone 12" or similar (375px width)
   - Scroll through page, take screenshot
   - Save as PNG

3. **Chrome DevTools Screenshot**:
   - Open DevTools (F12)
   - Press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
   - Type "screenshot"
   - Choose "Capture node screenshot" or "Capture full page screenshot"

## File Naming Convention

- `01-input-form.png` - Cost Input Form (desktop)
- `02-breakdown.png` - Cost Breakdown Display (desktop)
- `03-faq.png` - FAQ Component (desktop)
- `04-mobile.png` - Mobile responsive view

## Adding Screenshots to Git

Once screenshots are taken and saved:

```bash
git add docs/screenshots/*.png
git commit -m "docs: add application screenshots to PR"
git push origin dev
```

The PR will automatically update with the new images.
