# Infinite Squads 🃏

The universal card generator and team builder. Create custom trading cards for sports, office teams, parties, or pure chaos.

## Features

- **Card Creator** - Build custom cards with flexible stats, traits, and rarity levels
- **Mode Toggle** - Switch between Serious (FIFA-style) and Unserious (meme/roast) modes
- **Stat Mixer** - Drag sliders and pick from 60+ preset stats across categories
- **Traits & Badges** - Add positive, negative, or chaotic traits that affect your cards
- **Live Preview** - See your card update in real-time as you edit
- **Team Builder** (coming soon) - Build squads with chemistry links

## Tech Stack

- **Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS + Framer Motion
- **State:** Zustand with persistence
- **Icons:** Lucide React

---

## 🚀 DEPLOYMENT GUIDE

### Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account
- Vercel account (free tier works)

---

### STEP 1: Set Up the Project Locally

1. Open your terminal and navigate to where you want the project:
   ```bash
   cd ~/Desktop/UTG
   ```

2. Create a new folder and copy all these files into it:
   ```bash
   mkdir infinite-squads
   cd infinite-squads
   ```

3. Copy all the files I've generated into this folder (the entire folder structure)

4. Install dependencies:
   ```bash
   npm install
   ```

5. Test locally:
   ```bash
   npm run dev
   ```

6. Open http://localhost:3000 in your browser - you should see the card creator!

---

### STEP 2: Push to GitHub

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name: `infinite-squads`
   - Description: "Universal card generator and team builder"
   - Keep it Public (for free Vercel hosting)
   - DON'T add README, .gitignore, or license (we already have them)
   - Click "Create repository"

2. In your terminal (inside the infinite-squads folder):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Infinite Squads v0.1"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/infinite-squads.git
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your actual GitHub username.

---

### STEP 3: Deploy to Vercel

1. Go to https://vercel.com and sign in with GitHub

2. Click "Add New..." → "Project"

3. Find your `infinite-squads` repository and click "Import"

4. Configure the project:
   - **Framework Preset:** Next.js (should auto-detect)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)

5. Click "Deploy"

6. Wait 1-2 minutes for the build to complete

7. 🎉 Your app is live! Vercel will give you a URL like:
   `https://infinite-squads-xxxxx.vercel.app`

---

### STEP 4: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain if you have one

---

## Updating Your App

After making changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

Vercel will automatically redeploy when you push to GitHub!

---

## Project Structure

```
infinite-squads/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   └── CardCreator.tsx  # Main card creator component
│   ├── data/
│   │   └── presets.ts       # All stat/trait/quote presets
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── store/
│   │   └── store.ts         # Zustand state management
│   └── types/
│       └── schema.ts        # TypeScript interfaces
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## Coming Soon

- [ ] Team Builder with drag-and-drop
- [ ] Chemistry system
- [ ] Card download as image
- [ ] Share cards on social media
- [ ] Card pack opening animation
- [ ] Leaderboards

---

Made with 💜 for fun squad building
