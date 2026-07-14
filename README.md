# Infinite Squads

Infinite Squads is a collectible-card squad builder where history, pop culture, and internet chaos share the same roster. Open packs, collect 500 pullable characters, complete burn sets for exclusive ICON rewards, build scenario-specific squads, and battle matched opponents.

## What is playable

- **500-card pullable roster** with computed ratings, rarities, tags, and character artwork
- **Three pack tiers** with published odds, pick-one-of-three reveals, and bad-luck protection
- **Persistent collections** for signed-in players plus a local guest collection
- **21 collection sets** with one-time ICON rewards and repeatable duplicate furnaces
- **Scenario squad builder** with drag-and-drop placement and chemistry bonuses
- **Battle arena** with difficulty levels, generated opponents, event commentary, and rewards
- **Daily rewards and objectives** tied into the coin economy
- **Card sharing and downloads** from the collection viewer

## Local development

Requirements:

- Node.js 20.9 or newer
- npm
- A Supabase project configured with the migrations in this repository

```bash
npm ci
npm run dev
```

Create `.env.local` with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPPORT_EMAIL=public-support-address
NEXT_PUBLIC_APPLE_AUTH_ENABLED=false
```

## Quality checks

```bash
npm run check
```

That command validates the entire card catalog, runs TypeScript and ESLint, and produces a full production build.

Individual checks are also available:

```bash
npm run validate:cards
npm run typecheck
npm run lint
npm run build
```

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS and Framer Motion
- Zustand for guest/local state
- Supabase for authentication, profiles, collections, rewards, and battle data
- Capacitor 8 for bundled iOS and Android apps

## Native apps

The native projects live in `ios/` and `android/`. Core UI is exported into a self-contained bundle; production does not use a remote `server.url` wrapper.

```bash
npm run native:sync
npm run native:ios
npm run native:android
```

iOS release builds require Xcode 26 and an active Apple Developer signing team. Android builds require a supported JDK and Android Studio/SDK. Configure Apple/Supabase OAuth and universal links before enabling `NEXT_PUBLIC_APPLE_AUTH_ENABLED` in a release build.

Deploy the authenticated account-deletion function before release:

```bash
supabase functions deploy delete-account
```

Submission planning, metadata, privacy-label mapping, review notes, and the release checklist are in `docs/app-store/`.

## Data and migrations

Card definitions live in `src/data`. Run `npm run validate:cards` after changing names, tags, duos, collections, rarity pools, or image mappings.

Apply the SQL migrations in version order to a Supabase project. The nuclear reset script is destructive and is intended only for rebuilding a disposable development database.
