// ============================================
// INFINITE SQUADS - GAME ECONOMY
// Single source of truth for pack tiers, odds,
// quicksell values, and daily streak rewards.
//
// Design rules that keep the loop honest:
//  - Pick-one-of-three quicksell recovery never falls below 35%.
//    Rusty is intentionally generous as the catch-up tier; premium packs
//    still pay for better pull quality instead of punitive dead inventory.
//  - Better packs cost more per card but shift odds,
//    they never guarantee — the near-miss is the hook.
// ============================================

import { Rarity } from '@/types/schema';

export type PackRarity = 'bronze' | 'silver' | 'gold' | 'legendary' | 'holo';

export interface PackTier {
  id: string;
  name: string;
  tagline: string;
  cost: number; // coins
  emoji: string;
  accent: string; // tailwind-friendly hex
  weights: Record<PackRarity, number>; // relative odds
}

export const PACK_TIERS: PackTier[] = [
  {
    id: 'rusty',
    name: 'Rusty Pack',
    tagline: 'Mostly guys who peaked in a Wikipedia footnote.',
    cost: 100,
    emoji: '📦',
    accent: '#a16207',
    weights: { bronze: 45, silver: 30, gold: 15, legendary: 7, holo: 3 },
  },
  {
    id: 'heater',
    name: 'Heater Pack',
    tagline: 'The odds owe you one. They know it. You know it.',
    cost: 250,
    emoji: '🔥',
    accent: '#ea580c',
    weights: { bronze: 15, silver: 30, gold: 33, legendary: 16, holo: 6 },
  },
  {
    id: 'cracked',
    name: 'Cracked Pack',
    tagline: 'Zero bronze. Zero excuses. Maximum consequences.',
    cost: 450,
    emoji: '💎',
    accent: '#7c3aed',
    weights: { bronze: 0, silver: 20, gold: 42, legendary: 27, holo: 11 },
  },
];

export function getPackTier(id: string): PackTier {
  return PACK_TIERS.find(t => t.id === id) ?? PACK_TIERS[0];
}

// Human-readable odds for the transparency panel (also: it builds trust,
// and trust makes people spend — every gacha that hides odds reads as a scam)
export function packOddsPercent(tier: PackTier): { rarity: PackRarity; pct: string }[] {
  const total = Object.values(tier.weights).reduce((a, b) => a + b, 0);
  return (Object.entries(tier.weights) as [PackRarity, number][])
    .filter(([, w]) => w > 0)
    .map(([rarity, w]) => ({ rarity, pct: `${((w / total) * 100).toFixed(0)}%` }));
}

// ─────────────────────────────────────────────
// QUICKSELL (values mirrored server-side in
// supabase quicksell_card() — keep in sync)
// ─────────────────────────────────────────────

export const QUICKSELL_VALUES: Record<Rarity, number> = {
  bronze: 20,
  silver: 40,
  gold: 75,
  legendary: 150,
  holo: 300,
  glitch: 100,
  icon: 1000,
};

// ─────────────────────────────────────────────
// DAILY STREAK (values mirrored server-side in
// supabase claim_daily_reward() — keep in sync)
// ─────────────────────────────────────────────

export const STREAK_REWARDS = [50, 75, 100, 150, 200, 250, 400]; // day 7+ stays 400

export function streakReward(streakDay: number): number {
  return STREAK_REWARDS[Math.min(Math.max(streakDay, 1), STREAK_REWARDS.length) - 1];
}

// ─────────────────────────────────────────────
// PREMIUM CURRENCY (STUB — no real payments wired.
// Bundles are displayed "coming soon" in the store;
// nothing here charges anyone anything.)
// ─────────────────────────────────────────────

export interface GemBundle {
  id: string;
  gems: number;
  priceLabel: string; // display only
  tag?: string;
}

export const GEM_BUNDLES: GemBundle[] = [
  { id: 'pocket', gems: 100, priceLabel: '$0.99' },
  { id: 'stack', gems: 550, priceLabel: '$4.99', tag: 'Popular' },
  { id: 'vault', gems: 1200, priceLabel: '$9.99', tag: 'Best value' },
  { id: 'dragon', gems: 6500, priceLabel: '$49.99', tag: 'Seek help' },
];

export const GUEST_FREE_PACK_KEY = 'is-guest-free-pack-used';
