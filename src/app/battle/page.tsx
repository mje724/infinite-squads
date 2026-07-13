'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Trophy, Zap, Users, ChevronRight, Home, RotateCcw, Crown, Skull, Star, Package, Check, User, Coins } from 'lucide-react';
import Link from 'next/link';
import { useGameCollection } from '@/hooks/useGameCollection';
import { useAuth } from '@/components/AuthProvider';
import { getSupabase, PvpSquad } from '@/lib/supabase';
import { Card } from '@/types/schema';
import { PRESET_CARDS as ALL_PRESET_CARDS, PresetCard as BasePresetCard, calculateOVR } from '@/data/presetCards';
import { ICON_CARDS } from '@/data/collections';
import { cardPerformance, chemistrySummary } from '@/data/chemistry';
import { trackObjective } from '@/data/objectives';

// ============================================
// PRESET CARDS DATABASE — sourced from the single shared roster in
// src/data/presetCards.ts (parody-safe names + generated avatars).
// This used to be a separate hardcoded copy with real names/photos of
// living people, which defeated the parody-rename/avatar legal-safety
// work done on the packs page. Now both pages share one source of truth.
// ============================================

type PresetCard = BasePresetCard & { overallRating: number };

const PRESET_CARDS: PresetCard[] = ALL_PRESET_CARDS.map(c => ({ ...c, overallRating: calculateOVR(c.stats) }));

// ============================================
// SCENARIO DEFINITIONS
// ============================================

interface ScoreCategory {
  name: string;
  icon: string;
  unit?: string;
  lowIsBetter?: boolean;
}

interface ChemistryBonus {
  name: string;
  condition: string;
  bonus: number;
}

interface Scenario {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  slots: number;
  color: string;
  isSport: boolean;
  scoring: {
    categories: ScoreCategory[];
    chemistryBonuses: ChemistryBonus[];
  };
}

const SCENARIOS: Scenario[] = [
  // SPORTS
  {
    id: 'basketball',
    name: 'Starting 5',
    subtitle: 'Basketball lineup',
    icon: '🏀',
    slots: 5,
    color: 'from-orange-500 to-red-600',
    isSport: true,
    scoring: {
      categories: [
        { name: 'PTS', icon: '🏀' },
        { name: 'REB', icon: '📊' },
        { name: 'AST', icon: '🤝' },
      ],
      chemistryBonuses: [
        { name: 'Superteam', condition: '3+ Gold or better', bonus: 12 },
        { name: 'Bench Mob', condition: 'All Bronze/Silver', bonus: 8 },
        { name: 'Wildcard', condition: '1 Glitch card', bonus: 15 },
      ],
    },
  },
  {
    id: 'soccer',
    name: '11v11 Soccer',
    subtitle: '4-3-3 Formation',
    icon: '⚽',
    slots: 11,
    color: 'from-green-500 to-emerald-600',
    isSport: true,
    scoring: {
      categories: [
        { name: 'Goals', icon: '⚽' },
        { name: 'Assists', icon: '👟' },
        { name: 'Saves', icon: '🧤' },
      ],
      chemistryBonuses: [
        { name: 'Tiki-Taka', condition: '5+ same rarity', bonus: 10 },
        { name: 'Galacticos', condition: '3+ Legendary/Holo', bonus: 15 },
        { name: 'Youth Academy', condition: 'All under 70 OVR', bonus: 8 },
      ],
    },
  },
  {
    id: 'football',
    name: '7on7 Football',
    subtitle: 'Offense lineup',
    icon: '🏈',
    slots: 7,
    color: 'from-amber-600 to-yellow-700',
    isSport: true,
    scoring: {
      categories: [
        { name: 'TD', icon: '🏈' },
        { name: 'YDS', icon: '📏' },
        { name: 'INT', icon: '🔄', lowIsBetter: true },
      ],
      chemistryBonuses: [
        { name: 'Air Raid', condition: 'Highest card 90+', bonus: 12 },
        { name: 'Ground Game', condition: '4+ Bronze', bonus: 8 },
        { name: 'Hail Mary', condition: '1 Glitch card', bonus: 18 },
      ],
    },
  },
  // SATIRICAL
  {
    id: 'roadtrip',
    name: 'The Road Trip',
    subtitle: '4 friends, one car',
    icon: '🚗',
    slots: 4,
    color: 'from-cyan-500 to-blue-600',
    isSport: false,
    scoring: {
      categories: [
        { name: 'Aux Mins', icon: '🎵' },
        { name: 'Pee Breaks', icon: '🚽', lowIsBetter: true },
        { name: 'Wrong Turns', icon: '🗺️', lowIsBetter: true },
      ],
      chemistryBonuses: [
        { name: 'Shotgun Called', condition: 'Highest OVR first', bonus: 10 },
        { name: 'Carpool Karaoke', condition: '3+ same rarity', bonus: 8 },
        { name: 'Backseat Driver', condition: 'Card under 40 OVR', bonus: -5 },
      ],
    },
  },
  {
    id: 'dinner',
    name: 'The Dinner Bill',
    subtitle: '5 people, one check',
    icon: '🍽️',
    slots: 5,
    color: 'from-rose-500 to-pink-600',
    isSport: false,
    scoring: {
      categories: [
        { name: 'Venmo Speed', icon: '💸' },
        { name: 'Salad Claims', icon: '🥗', lowIsBetter: true },
        { name: 'Tip %', icon: '🧮' },
      ],
      chemistryBonuses: [
        { name: 'Separate Checks', condition: '5 different rarities', bonus: 12 },
        { name: 'Big Spender', condition: '2+ Legendary', bonus: 10 },
        { name: 'Forgot Wallet', condition: 'Card under 25 OVR', bonus: -15 },
      ],
    },
  },
  {
    id: 'movie',
    name: 'Movie Night',
    subtitle: '6 on the couch',
    icon: '🎬',
    slots: 6,
    color: 'from-purple-500 to-violet-600',
    isSport: false,
    scoring: {
      categories: [
        { name: 'Phone Checks', icon: '📱', lowIsBetter: true },
        { name: '"Huh?" Count', icon: '❓', lowIsBetter: true },
        { name: 'Awake Time', icon: '😴' },
      ],
      chemistryBonuses: [
        { name: 'Film Buff', condition: '3+ Gold', bonus: 10 },
        { name: 'Netflix Chaos', condition: '1 Glitch card', bonus: 12 },
        { name: 'The Talker', condition: 'Card under 30 OVR', bonus: -8 },
      ],
    },
  },
  {
    id: 'groupproject',
    name: 'Group Project',
    subtitle: '4 students, 1 grade',
    icon: '📚',
    slots: 4,
    color: 'from-teal-500 to-cyan-600',
    isSport: false,
    scoring: {
      categories: [
        { name: 'Slides Done', icon: '📊' },
        { name: 'Ghosted Texts', icon: '💬', lowIsBetter: true },
        { name: '3AM Commits', icon: '💻' },
      ],
      chemistryBonuses: [
        { name: 'Hard Carry', condition: '1 card 90+ OVR', bonus: 15 },
        { name: 'Dead Weight', condition: '2+ under 50 OVR', bonus: -10 },
        { name: 'Actually Met', condition: 'All 65+ OVR', bonus: 12 },
      ],
    },
  },
  {
    id: 'wedding',
    name: 'Wedding Party',
    subtitle: '8 in the bridal party',
    icon: '💒',
    slots: 8,
    color: 'from-pink-500 to-rose-600',
    isSport: false,
    scoring: {
      categories: [
        { name: 'Drinks Before Speech', icon: '🥂' },
        { name: 'Cringe Stories', icon: '😬', lowIsBetter: true },
        { name: 'Dance Mins', icon: '💃' },
      ],
      chemistryBonuses: [
        { name: 'Open Bar Hero', condition: '3+ Bronze', bonus: 8 },
        { name: 'Maid of Honor', condition: 'Highest 95+ OVR', bonus: 12 },
        { name: 'OBJECTION', condition: '1 Glitch card', bonus: 20 },
      ],
    },
  },
  {
    id: 'zombie',
    name: 'Zombie Apocalypse',
    subtitle: '5 survivors',
    icon: '🧟',
    slots: 5,
    color: 'from-slate-600 to-zinc-800',
    isSport: false,
    scoring: {
      categories: [
        { name: 'Days Alive', icon: '📅' },
        { name: 'Dumb Deaths', icon: '💀', lowIsBetter: true },
        { name: 'Supplies', icon: '🎒' },
      ],
      chemistryBonuses: [
        { name: 'Plot Armor', condition: '2+ Legendary', bonus: 18 },
        { name: 'First Blood', condition: 'Card under 30 OVR', bonus: -12 },
        { name: 'Final Girl', condition: 'Highest is Holo', bonus: 15 },
      ],
    },
  },
];

// ============================================
// OPPONENT GENERATION (from preset pool)
// ============================================

function generateOpponentTeam(
  slots: number,
  playerAvgOVR: number,
  difficulty: 'easy' | 'medium' | 'hard',
  excludeNames: string[],
  scenarioId: string
): PresetCard[] {
  // Difficulty affects target OVR
  const ovrAdjust = difficulty === 'easy' ? -10 : difficulty === 'hard' ? 10 : 0;
  const targetOVR = Math.max(30, Math.min(95, playerAvgOVR + ovrAdjust));

  // Filter out cards already on player's team
  const available = PRESET_CARDS.filter(c => !excludeNames.includes(c.name));

  // Candidate pool: closest to target OVR (2× slots deep so difficulty
  // sorting below has real choices to make)
  const nearTarget = [...available]
    .sort((a, b) => Math.abs(a.overallRating - targetOVR) - Math.abs(b.overallRating - targetOVR))
    .slice(0, Math.max(slots * 2, 16));

  // The difficulty "why": HARD opponents draft for the scenario (high FIT),
  // EASY opponents draft famous-but-wrong cards (low FIT), MEDIUM doesn't think.
  if (difficulty === 'hard') {
    nearTarget.sort((a, b) => cardPerformance(b, scenarioId) - cardPerformance(a, scenarioId));
  } else if (difficulty === 'easy') {
    nearTarget.sort((a, b) => cardPerformance(a, scenarioId) - cardPerformance(b, scenarioId));
  }

  const selected: PresetCard[] = [];
  for (const card of nearTarget) {
    if (selected.length >= slots) break;
    if (!selected.find(c => c.name === card.name)) selected.push(card);
  }
  while (selected.length < slots) {
    const remaining = available.filter(c => !selected.find(s => s.name === c.name));
    if (remaining.length === 0) break;
    selected.push(remaining[Math.floor(Math.random() * remaining.length)]);
  }

  // Fisher–Yates (the lazy sort(random) shuffle is biased)
  for (let i = selected.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selected[i], selected[j]] = [selected[j], selected[i]];
  }
  return selected;
}

// ============================================
// BOX SCORE GENERATION
// ============================================

interface PlayerBoxScore {
  card: PresetCard | Card;
  stats: { category: string; value: number }[];
}

function generateBoxScore(
  cards: (PresetCard | Card)[],
  categories: ScoreCategory[],
  isSport: boolean,
  scenarioId: string
): PlayerBoxScore[] {
  return cards.map(card => {
    // Performance = core stats weighted by THIS scenario + identity affinities.
    // A famous card with the wrong skill set genuinely underperforms here.
    const baseMultiplier = cardPerformance(card, scenarioId) / 100;

    const stats = categories.map(cat => {
      let value: number;
      // Skill-dominant randomness: magnitude rolls live in a tight band
      // around the midpoint (0.35–0.75) so FIT decides games ~70/30 over
      // luck, while binary events (goals, TDs, INTs) stay truly random.
      const rand = 0.35 + Math.random() * 0.4;
      const chance = Math.random();
      
      if (isSport) {
        if (cat.name === 'PTS') value = Math.round((rand * 25 + 5) * baseMultiplier);
        else if (cat.name === 'REB') value = Math.round((rand * 12 + 2) * baseMultiplier);
        else if (cat.name === 'AST') value = Math.round((rand * 10 + 1) * baseMultiplier);
        else if (cat.name === 'Goals') value = chance < baseMultiplier * 0.35 ? Math.ceil(chance * 2) : 0;
        else if (cat.name === 'Assists') value = chance < baseMultiplier * 0.4 ? Math.ceil(chance * 2) : 0;
        else if (cat.name === 'Saves') value = Math.round((rand * 6) * baseMultiplier);
        else if (cat.name === 'TD') value = chance < baseMultiplier * 0.45 ? Math.ceil(chance * 2) : 0;
        else if (cat.name === 'YDS') value = Math.round((rand * 120 + 15) * baseMultiplier);
        else if (cat.name === 'INT') value = chance < (1 - baseMultiplier) * 0.35 ? 1 : 0;
        else value = Math.round(rand * 15 * baseMultiplier);
      } else {
        // Satirical - values that make sense for each category
        if (cat.name === 'Aux Mins') value = Math.round((rand * 45 + 15) * baseMultiplier);
        else if (cat.name === 'Pee Breaks') value = Math.round((rand * 4) * (1.2 - baseMultiplier));
        else if (cat.name === 'Wrong Turns') value = Math.round((rand * 3) * (1.2 - baseMultiplier));
        else if (cat.name === 'Venmo Speed') value = Math.round(100 * baseMultiplier - rand * 20);
        else if (cat.name === 'Salad Claims') value = chance < (1 - baseMultiplier) * 0.4 ? 1 : 0;
        else if (cat.name === 'Tip %') value = Math.round(12 + 10 * baseMultiplier + rand * 5);
        else if (cat.name === 'Phone Checks') value = Math.round((rand * 15) * (1.3 - baseMultiplier));
        else if (cat.name === '"Huh?" Count' || cat.name === 'Huh? Count') value = Math.round((rand * 8) * (1.2 - baseMultiplier));
        else if (cat.name === 'Awake Time') value = Math.round((70 + rand * 50) * baseMultiplier);
        else if (cat.name === 'Slides Done') value = Math.round((rand * 12 + 3) * baseMultiplier);
        else if (cat.name === 'Ghosted Texts') value = Math.round((rand * 8) * (1.2 - baseMultiplier));
        else if (cat.name === '3AM Commits') value = Math.round((rand * 15 + 2) * baseMultiplier);
        else if (cat.name === 'Drinks Before Speech') value = Math.round(1 + rand * 5 * (1.1 - baseMultiplier * 0.3));
        else if (cat.name === 'Cringe Stories') value = Math.round((rand * 4) * (1.2 - baseMultiplier));
        else if (cat.name === 'Dance Mins') value = Math.round((rand * 40 + 10) * baseMultiplier);
        else if (cat.name === 'Days Alive') value = Math.round((rand * 25 + 5) * baseMultiplier);
        else if (cat.name === 'Dumb Deaths') value = chance < (1 - baseMultiplier) * 0.4 ? 1 : 0;
        else if (cat.name === 'Supplies') value = Math.round((rand * 15 + 5) * baseMultiplier);
        else value = Math.round(rand * 10 * baseMultiplier);
      }
      
      return { category: cat.name, value };
    });
    
    return { card, stats };
  });
}

function calculateTeamTotal(boxScores: PlayerBoxScore[], categories: ScoreCategory[]): number {
  let total = 0;
  categories.forEach((cat, i) => {
    const catTotal = boxScores.reduce((sum, ps) => sum + ps.stats[i].value, 0);
    if (cat.lowIsBetter) {
      total += Math.max(0, 100 - catTotal * 8);
    } else {
      total += catTotal;
    }
  });
  return total;
}

// ============================================
// CHEMISTRY CALCULATION
// ============================================

function calculateChemistry(cards: (PresetCard | Card)[], bonuses: ChemistryBonus[]): { total: number; active: string[] } {
  const rarities = cards.map(c => c.rarity);
  const ovrs = cards.map(c => 'overallRating' in c ? c.overallRating : 50);
  let total = 0;
  const active: string[] = [];
  
  bonuses.forEach(bonus => {
    let applies = false;
    
    if (bonus.condition.includes('Gold or better') || bonus.condition.includes('Legendary/Holo')) {
      const count = rarities.filter(r => ['gold', 'legendary', 'holo', 'glitch'].includes(r)).length;
      applies = count >= 3;
    } else if (bonus.condition.includes('Legendary')) {
      applies = rarities.filter(r => r === 'legendary').length >= 2;
    } else if (bonus.condition.includes('All Bronze/Silver')) {
      applies = rarities.every(r => r === 'bronze' || r === 'silver');
    } else if (bonus.condition.includes('Bronze')) {
      const needed = bonus.condition.includes('4+') ? 4 : 3;
      applies = rarities.filter(r => r === 'bronze').length >= needed;
    } else if (bonus.condition.includes('Gold')) {
      applies = rarities.filter(r => r === 'gold').length >= 3;
    } else if (bonus.condition.includes('same rarity')) {
      const counts = rarities.reduce((acc, r) => ({ ...acc, [r]: (acc[r] || 0) + 1 }), {} as Record<string, number>);
      const needed = bonus.condition.includes('5+') ? 5 : 3;
      applies = Math.max(...Object.values(counts)) >= needed;
    } else if (bonus.condition.includes('different rarities')) {
      applies = new Set(rarities).size >= 5;
    } else if (bonus.condition.includes('Glitch')) {
      applies = rarities.includes('glitch');
    } else if (bonus.condition.includes('90+')) {
      applies = ovrs.some(o => o >= 90);
    } else if (bonus.condition.includes('95+')) {
      applies = Math.max(...ovrs) >= 95;
    } else if (bonus.condition.includes('under 70')) {
      applies = ovrs.every(o => o < 70);
    } else if (bonus.condition.includes('65+') || bonus.condition.includes('All 65+')) {
      applies = ovrs.every(o => o >= 65);
    } else if (bonus.condition.includes('under 50')) {
      applies = ovrs.filter(o => o < 50).length >= 2;
    } else if (bonus.condition.includes('under 40')) {
      applies = ovrs.some(o => o < 40);
    } else if (bonus.condition.includes('under 30')) {
      applies = ovrs.some(o => o < 30);
    } else if (bonus.condition.includes('under 25')) {
      applies = ovrs.some(o => o < 25);
    } else if (bonus.condition.includes('Highest OVR first')) {
      applies = ovrs[0] === Math.max(...ovrs);
    } else if (bonus.condition.includes('Highest is Holo')) {
      const maxIdx = ovrs.indexOf(Math.max(...ovrs));
      applies = rarities[maxIdx] === 'holo';
    }
    
    if (applies) {
      total += bonus.bonus;
      active.push(`${bonus.name} (${bonus.bonus > 0 ? '+' : ''}${bonus.bonus})`);
    }
  });
  
  return { total, active };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

const getRarityColor = (rarity: string) => {
  const colors: Record<string, string> = {
    bronze: '#CD7F32',
    silver: '#C0C0C0', 
    gold: '#FFD700',
    legendary: '#FF4500',
    holo: '#FF00FF',
    glitch: '#00FFFF',
    icon: '#e8d5a3',
  };
  return colors[rarity] || '#CD7F32';
};

function getPackCards(cards: Card[]): Card[] {
  return cards.filter(card => card.mode === 'unserious');
}

// ============================================
// MAIN COMPONENT
// ============================================

interface BattleResult {
  playerBoxScores: PlayerBoxScore[];
  opponentBoxScores: PlayerBoxScore[];
  playerTotal: number;
  opponentTotal: number;
  playerChemistry: { total: number; active: string[] };
  opponentChemistry: { total: number; active: string[] };
  playerFinal: number;
  opponentFinal: number;
  winner: 'player' | 'opponent' | 'tie';
  mvp: { card: PresetCard | Card; highlight: string };
}

// Rebuild a defense squad from stored card names (packs + icons only —
// custom cards can't travel because opponents don't have their data)
function rebuildSquad(cardNames: string[]): PresetCard[] {
  const out: PresetCard[] = [];
  for (const name of cardNames) {
    const preset = PRESET_CARDS.find(c => c.name === name);
    if (preset) { out.push(preset); continue; }
    const icon = ICON_CARDS.find(c => c.name === name);
    if (icon) {
      out.push({
        name: icon.name, nickname: icon.nickname, stats: icon.stats, image: icon.image,
        rarity: icon.rarity as unknown as BasePresetCard['rarity'],
        overallRating: calculateOVR(icon.stats),
      });
    }
  }
  return out;
}

interface LeaderboardRow { display_name: string; pvp_rating: number; battles_won: number }

export default function BattlePage() {
  const { cards } = useGameCollection();
  const { user, profile, refreshProfile } = useAuth();
  const isLoggedIn = !!user;
  const supabase = getSupabase();
  const packCards = getPackCards(cards);

  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [opponentTeam, setOpponentTeam] = useState<PresetCard[]>([]);
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [battlePhase, setBattlePhase] = useState<'select' | 'lineup' | 'preview' | 'battle' | 'result'>('select');
  const [coinsWon, setCoinsWon] = useState<number | null>(null);
  const [mode, setMode] = useState<'cpu' | 'ranked'>('cpu');
  const [opponentInfo, setOpponentInfo] = useState<{ userId: string; displayName: string } | null>(null);
  const [ratingDelta, setRatingDelta] = useState<number | null>(null);
  const [defenseSaved, setDefenseSaved] = useState(false);
  const [defenseError, setDefenseError] = useState<string | null>(null);
  const [cooldownMsg, setCooldownMsg] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);

  useEffect(() => {
    if (mode !== 'ranked') return;
    supabase.rpc('get_leaderboard').then(({ data }: { data: LeaderboardRow[] | null }) => {
      setLeaderboard(data ?? []);
    });
  }, [mode, supabase]);

  const settleBattle = async (winner: 'player' | 'opponent' | 'tie') => {
    // objectives count for everyone playing while logged in
    trackObjective('battle_played');
    if (winner === 'player') {
      trackObjective('battle_won');
      if (mode === 'cpu' && difficulty === 'hard') trackObjective('hard_win');
    }
    if (!isLoggedIn || !user) return;

    if (mode === 'ranked' && opponentInfo) {
      if (winner === 'tie') return;
      // Rating + coins settled server-side: fixed swings, rate-limited, daily-capped
      const { data } = await supabase.rpc('record_pvp_result', {
        p_user_id: user.id,
        p_opponent_id: opponentInfo.userId,
        p_won: winner === 'player',
      });
      const res = data as { ok?: boolean; reward?: number; delta?: number } | null;
      if (res?.ok) {
        setCoinsWon(res.reward ?? 0);
        setRatingDelta(res.delta ?? 0);
        await refreshProfile();
      } else if (res && 'reason' in res) {
        const reason = (res as { reason?: string }).reason;
        if (reason === 'too_fast') setCooldownMsg('Ranked cooldown — rating resumes in ~45s.');
        else if (reason === 'daily_cap') setCooldownMsg('Daily ranked cap reached (40). Back tomorrow.');
      }
    } else {
      // CPU rewards also server-fixed now — the client just reports win/loss
      const { data } = await supabase.rpc('claim_battle_reward', {
        p_user_id: user.id,
        p_difficulty: difficulty,
        p_won: winner === 'player',
      });
      if (typeof data === 'number' && data > 0) setCoinsWon(data);
      else if (data === -2) setCooldownMsg('Reward cooldown — coins resume in ~30s. The W still counts.');
      else if (data === -3) setCooldownMsg('Daily battle-reward cap reached (40). Back tomorrow, champion.');
      await refreshProfile();
    }
  };

  const saveDefenseSquad = async () => {
    if (!user || !selectedScenario || selectedCards.length !== selectedScenario.slots) return;
    setDefenseError(null);
    const names = selectedCards.map(c => c.name);
    if (rebuildSquad(names).length !== names.length) {
      setDefenseError('Defense squads can only use pack & icon cards.');
      return;
    }
    // Server validates ownership of every card — no phantom squads
    const { data, error } = await supabase.rpc('set_defense_squad', {
      p_user_id: user.id,
      p_scenario_id: selectedScenario.id,
      p_display_name: profile?.display_name ?? 'Anonymous',
      p_card_names: names,
    });
    if (!error && data === true) setDefenseSaved(true);
    else setDefenseError('Could not verify squad ownership — try again.');
  };

  const proceedToPreview = async () => {
    if (!selectedScenario || selectedCards.length !== selectedScenario.slots) return;

    const playerAvgOVR = selectedCards.reduce((s, c) => s + c.overallRating, 0) / selectedCards.length;
    const excludeNames = selectedCards.map(c => c.name);

    // Ranked: fight a real player's saved defense squad for this scenario
    if (mode === 'ranked' && user) {
      const { data } = await supabase
        .from('pvp_squads')
        .select('*')
        .eq('scenario_id', selectedScenario.id)
        .neq('user_id', user.id)
        .limit(25);
      const squads = [...((data ?? []) as PvpSquad[])];
      while (squads.length > 0) {
        const idx = Math.floor(Math.random() * squads.length);
        const squad = squads.splice(idx, 1)[0];
        const rebuilt = rebuildSquad(squad.card_names);
        if (rebuilt.length === selectedScenario.slots) {
          setOpponentTeam(rebuilt);
          setOpponentInfo({ userId: squad.user_id, displayName: squad.display_name });
          setBattlePhase('preview');
          return;
        }
      }
      // nobody has defended this scenario yet — CPU scout team, unranked
    }

    setOpponentInfo(null);
    setOpponentTeam(generateOpponentTeam(selectedScenario.slots, playerAvgOVR, difficulty, excludeNames, selectedScenario.id));
    setBattlePhase('preview');
  };

  const startBattle = () => {
    if (!selectedScenario) return;
    setBattlePhase('battle');
    
    setTimeout(() => {
      const playerBoxScores = generateBoxScore(selectedCards, selectedScenario.scoring.categories, selectedScenario.isSport, selectedScenario.id);
      const opponentBoxScores = generateBoxScore(opponentTeam, selectedScenario.scoring.categories, selectedScenario.isSport, selectedScenario.id);

      const playerTotal = calculateTeamTotal(playerBoxScores, selectedScenario.scoring.categories);
      const opponentTotal = calculateTeamTotal(opponentBoxScores, selectedScenario.scoring.categories);

      // Chemistry with a "why": named duos, tag synergies, era bonds —
      // every line item in the result screen names the pair that caused it.
      const playerChemistry = chemistrySummary(selectedCards, selectedScenario.id);
      const opponentChemistry = chemistrySummary(opponentTeam, selectedScenario.id);
      
      // Chemistry as a percentage multiplier (cap ±20%) so a +10 bond is
      // worth the same in every scenario, whatever the raw score scale.
      const chemMult = (t: number) => 1 + Math.max(-40, Math.min(40, t)) / 200;
      const playerFinal = Math.round(playerTotal * chemMult(playerChemistry.total));
      const opponentFinal = Math.round(opponentTotal * chemMult(opponentChemistry.total));
      
      // Find MVP
      const allBoxScores = [...playerBoxScores, ...opponentBoxScores];
      const mvpData = allBoxScores.reduce((best, ps) => {
        const total = ps.stats.reduce((sum, s) => sum + s.value, 0);
        return total > best.total ? { total, ps } : best;
      }, { total: 0, ps: allBoxScores[0] });
      
      const topStat = mvpData.ps.stats.sort((a, b) => b.value - a.value)[0];
      
      const winner: 'player' | 'opponent' | 'tie' =
        playerFinal > opponentFinal ? 'player' : playerFinal < opponentFinal ? 'opponent' : 'tie';

      setBattleResult({
        playerBoxScores,
        opponentBoxScores,
        playerTotal,
        opponentTotal,
        playerChemistry,
        opponentChemistry,
        playerFinal,
        opponentFinal,
        winner,
        mvp: { card: mvpData.ps.card, highlight: `${topStat.value} ${topStat.category}` },
      });
      setBattlePhase('result');
      settleBattle(winner);
    }, 2500);
  };

  const toggleCardSelection = (card: Card) => {
    if (!selectedScenario) return;
    if (selectedCards.find(c => c.id === card.id)) {
      setSelectedCards(selectedCards.filter(c => c.id !== card.id));
    } else if (selectedCards.length < selectedScenario.slots) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const resetBattle = () => {
    setSelectedScenario(null);
    setSelectedCards([]);
    setOpponentTeam([]);
    setBattleResult(null);
    setBattlePhase('select');
    setCoinsWon(null);
    setOpponentInfo(null);
    setRatingDelta(null);
    setDefenseSaved(false);
    setDefenseError(null);
    setCooldownMsg(null);
  };

  // Mini card component
  const MiniCard = ({ card }: { card: PresetCard | Card }) => {
    const ovr = 'overallRating' in card ? card.overallRating : 50;
    return (
      <div className="relative rounded-lg overflow-hidden bg-slate-800" style={{ border: `2px solid ${getRarityColor(card.rarity)}` }}>
        <div className="aspect-square overflow-hidden bg-slate-700">
          {card.image ? (
            <img 
              src={card.image} 
              alt={card.name} 
              className="w-full h-full object-cover object-top"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-8 h-8 text-slate-500" />
            </div>
          )}
        </div>
        <div className="p-1.5 bg-slate-900">
          <div className="text-white text-xs font-bold truncate">{card.name}</div>
          <div className="flex justify-between items-center">
            <span className="text-white text-xs font-semibold">{ovr}</span>
            <span className="text-xs font-bold uppercase" style={{ color: getRarityColor(card.rarity) }}>
              {card.rarity.slice(0, 3)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950/20 to-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-3">
            <Swords className="w-10 h-10 text-red-400" />
            Battle Arena
          </h1>
          <p className="text-slate-400">Build your squad. Face real opponents. Claim victory.</p>
        </div>

        {/* PHASE: Select */}
        {battlePhase === 'select' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Mode: CPU gauntlet or ranked ghost battles vs real players */}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setMode('cpu')}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${mode === 'cpu' ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg' : 'bg-slate-800/60 border border-slate-700 text-slate-400 hover:text-white'}`}
              >
                🤖 CPU Gauntlet
              </button>
              <button
                onClick={() => isLoggedIn && setMode('ranked')}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${mode === 'ranked' ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 shadow-lg' : 'bg-slate-800/60 border border-slate-700 text-slate-400 hover:text-white'} ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                🏆 Ranked{profile ? ` · ${profile.pvp_rating ?? 1000}` : ''}
              </button>
            </div>
            {mode === 'ranked' && (
              <p className="text-center text-slate-400 text-sm -mt-4">
                Fight real players&apos; defense squads. Win +20 rating & 75 coins, lose −15 rating & 15 coins.
                Set your own defense squad from the lineup screen so others can challenge you.
              </p>
            )}
            {!isLoggedIn && (
              <p className="text-center text-slate-500 text-xs -mt-4">Sign in to play Ranked and earn coins.</p>
            )}

            <h2 className="text-xl font-bold text-white">Choose Scenario</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {SCENARIOS.map(s => (
                <motion.button
                  key={s.id}
                  onClick={() => { setSelectedScenario(s); setSelectedCards([]); setBattlePhase('lineup'); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-xl border-2 border-slate-700 bg-slate-800/50 hover:border-slate-500 text-left"
                >
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className="font-bold text-white text-sm">{s.name}</div>
                  <div className="text-slate-400 text-xs">{s.subtitle}</div>
                  <div className="text-slate-500 text-xs mt-1">{s.slots} cards</div>
                </motion.button>
              ))}
            </div>
            
            {/* Ladder */}
            {mode === 'ranked' && leaderboard.length > 0 && (
              <div className="bg-slate-900/60 border border-amber-500/20 rounded-2xl p-5 max-w-md mx-auto w-full">
                <h3 className="font-black text-amber-300 mb-3 text-sm uppercase tracking-wider">🏆 Ladder — Top {leaderboard.length}</h3>
                <div className="space-y-1">
                  {leaderboard.map((row, i) => (
                    <div key={i} className={`flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm ${row.display_name === profile?.display_name ? 'bg-amber-500/10 border border-amber-500/30' : ''}`}>
                      <span className={`w-6 text-center font-black ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-slate-300' : i === 2 ? 'text-amber-600' : 'text-slate-500'}`}>{i + 1}</span>
                      <span className="flex-1 text-white font-semibold truncate">{(row.display_name ?? 'Anonymous').slice(0, 24)}</span>
                      <span className="text-amber-300 font-bold">{row.pvp_rating}</span>
                      <span className="text-slate-500 text-xs w-14 text-right">{row.battles_won}W</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {packCards.length === 0 && (
              <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-700">
                <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Pack Cards Yet!</h3>
                <p className="text-slate-400 mb-4">Open packs to get cards for battle</p>
                <Link href="/packs" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold">
                  <Package className="w-5 h-5" /> Open Packs
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {/* PHASE: Lineup */}
        {battlePhase === 'lineup' && selectedScenario && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className={`p-6 rounded-xl bg-gradient-to-r ${selectedScenario.color} flex items-center justify-between`}>
              <div className="flex items-center gap-4">
                <span className="text-4xl">{selectedScenario.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedScenario.name}</h2>
                  <p className="text-white/80">{selectedScenario.subtitle}</p>
                </div>
              </div>
              <button onClick={resetBattle} className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
                <RotateCcw className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Difficulty (CPU only — ranked difficulty is whoever defends) */}
            <div className={`flex items-center gap-4 justify-center ${mode === 'ranked' ? 'hidden' : ''}`}>
              <span className="text-slate-400">Difficulty:</span>
              {(['easy', 'medium', 'hard'] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-4 py-2 rounded-lg font-semibold capitalize ${
                    difficulty === d
                      ? d === 'easy' ? 'bg-green-500 text-white' : d === 'medium' ? 'bg-yellow-500 text-black' : 'bg-red-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Selected */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Your Squad ({selectedCards.length}/{selectedScenario.slots})</h3>
              <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-11 gap-2">
                {Array.from({ length: selectedScenario.slots }).map((_, i) => {
                  const card = selectedCards[i];
                  return (
                    <div key={i} className={`aspect-[3/4] rounded-lg ${card ? '' : 'border-2 border-dashed border-slate-600 bg-slate-800/30'} flex items-center justify-center`}>
                      {card ? (
                        <div className="w-full cursor-pointer" onClick={() => toggleCardSelection(card)}>
                          <MiniCard card={card} />
                        </div>
                      ) : (
                        <span className="text-slate-500 text-xs">{i + 1}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Available */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Your Pack Cards</h3>
              {packCards.length === 0 ? (
                <div className="text-center py-8 bg-slate-800/30 rounded-xl">
                  <p className="text-slate-400 mb-4">No pack cards yet!</p>
                  <Link href="/packs" className="text-purple-400">Open packs →</Link>
                </div>
              ) : (
                <>
                <p className="text-slate-500 text-xs mb-3">
                  FIT = how this card performs in <span className="text-slate-300 font-semibold">this</span> scenario — fame (OVR) and function are not the same thing. Sort your lineup by FIT, not clout.
                </p>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {[...packCards].sort((a, b) => cardPerformance(b, selectedScenario.id) - cardPerformance(a, selectedScenario.id)).map(card => {
                    const isSelected = selectedCards.find(c => c.id === card.id);
                    const isDisabled = !isSelected && selectedCards.length >= selectedScenario.slots;
                    const fit = cardPerformance(card, selectedScenario.id);
                    const fitColor = fit >= 85 ? '#22c55e' : fit >= 65 ? '#eab308' : fit >= 45 ? '#f97316' : '#ef4444';
                    return (
                      <motion.button
                        key={card.id}
                        onClick={() => toggleCardSelection(card)}
                        disabled={isDisabled}
                        whileHover={{ scale: isDisabled ? 1 : 1.05 }}
                        className={`relative ${isSelected ? 'ring-2 ring-green-400 ring-offset-2 ring-offset-slate-900' : ''} ${isDisabled ? 'opacity-40' : ''}`}
                      >
                        <MiniCard card={card} />
                        <div
                          className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-md text-[10px] font-black backdrop-blur-sm"
                          style={{ background: 'rgba(0,0,0,0.75)', color: fitColor, border: `1px solid ${fitColor}55` }}
                        >
                          FIT {fit}
                        </div>
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
                </>
              )}
            </div>

            <div className="flex justify-center gap-3 pt-4 flex-wrap">
              {isLoggedIn && selectedCards.length === selectedScenario.slots && (
                <motion.button
                  onClick={saveDefenseSquad}
                  whileTap={{ scale: 0.95 }}
                  disabled={defenseSaved}
                  className={`px-6 py-4 rounded-xl font-bold flex items-center gap-2 border ${defenseSaved ? 'bg-green-500/10 border-green-500/40 text-green-400' : 'bg-slate-800/70 border-amber-500/40 text-amber-300 hover:border-amber-400'}`}
                >
                  {defenseSaved ? '✓ Defense Set' : '🛡 Set as Defense Squad'}
                </motion.button>
              )}
              <motion.button
                onClick={proceedToPreview}
                disabled={selectedCards.length !== selectedScenario.slots}
                whileHover={selectedCards.length === selectedScenario.slots ? { scale: 1.05 } : {}}
                className={`px-8 py-4 rounded-xl font-bold text-xl flex items-center gap-3 ${
                  selectedCards.length === selectedScenario.slots
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-6 h-6" /> See Opponent
              </motion.button>
            </div>
            {defenseError && <p className="text-center text-red-400 text-sm">{defenseError}</p>}
          </motion.div>
        )}

        {/* PHASE: Preview */}
        {battlePhase === 'preview' && selectedScenario && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Your Team */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-cyan-500/30">
                <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" /> Your Squad
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {selectedCards.map(card => <MiniCard key={card.id} card={card} />)}
                </div>
                <div className="mt-4 text-slate-300 text-sm">
                  Avg OVR: <span className="text-cyan-400 font-bold">{Math.round(selectedCards.reduce((s, c) => s + c.overallRating, 0) / selectedCards.length)}</span>
                </div>
              </div>

              {/* Opponent Team */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-red-500/30">
                <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" /> {opponentInfo ? `${opponentInfo.displayName.slice(0, 24)}'s Defense` : 'Opponent Squad'}
                  <span className={`text-xs px-2 py-1 rounded ml-2 ${
                    difficulty === 'easy' ? 'bg-green-500/20 text-green-400' 
                    : difficulty === 'hard' ? 'bg-red-500/20 text-red-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {difficulty}
                  </span>
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {opponentTeam.map((card, i) => <MiniCard key={i} card={card} />)}
                </div>
                <div className="mt-4 text-slate-300 text-sm">
                  Avg OVR: <span className="text-red-400 font-bold">{Math.round(opponentTeam.reduce((s, c) => s + c.overallRating, 0) / opponentTeam.length)}</span>
                </div>
              </div>
            </div>

            {/* Scoring Info */}
            <div className="bg-slate-800/30 rounded-xl p-4">
              <h3 className="text-white font-bold mb-2">{selectedScenario.isSport ? 'Box Score Categories' : 'Scoring Categories'}</h3>
              <div className="flex flex-wrap gap-3">
                {selectedScenario.scoring.categories.map(cat => (
                  <div key={cat.name} className="flex items-center gap-2 bg-slate-700/50 px-3 py-1.5 rounded-lg text-sm">
                    <span>{cat.icon}</span>
                    <span className="text-slate-300">{cat.name}</span>
                    {cat.lowIsBetter && <span className="text-yellow-400 text-xs">(low=good)</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={() => setBattlePhase('lineup')} className="px-6 py-3 bg-slate-700 rounded-xl text-white font-semibold">
                ← Change Lineup
              </button>
              <motion.button
                onClick={startBattle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl text-white font-bold text-xl flex items-center gap-3"
              >
                <Swords className="w-6 h-6" /> BATTLE!
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* PHASE: Battle Animation */}
        {battlePhase === 'battle' && selectedScenario && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
            <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-8xl">
              {selectedScenario.icon}
            </motion.div>
            <h2 className="text-3xl font-bold text-white">Battle in Progress...</h2>
            <motion.div className="h-2 w-64 bg-slate-700 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-cyan-500 to-red-500" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2.5 }} />
            </motion.div>
          </motion.div>
        )}

        {/* PHASE: Results */}
        {battlePhase === 'result' && battleResult && selectedScenario && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            {/* Winner */}
            <motion.div
              initial={{ y: -30 }}
              animate={{ y: 0 }}
              className={`p-6 rounded-2xl text-center ${
                battleResult.winner === 'player' ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                : battleResult.winner === 'opponent' ? 'bg-gradient-to-r from-red-500 to-rose-600'
                : 'bg-gradient-to-r from-yellow-500 to-amber-600'
              }`}
            >
              {battleResult.winner === 'player' ? <Trophy className="w-16 h-16 text-white mx-auto mb-2" />
                : battleResult.winner === 'opponent' ? <Skull className="w-16 h-16 text-white mx-auto mb-2" />
                : <Star className="w-16 h-16 text-white mx-auto mb-2" />}
              <h2 className="text-3xl font-bold text-white">
                {battleResult.winner === 'player' ? 'VICTORY!' : battleResult.winner === 'opponent' ? 'DEFEAT' : 'TIE'}
              </h2>
              <p className="text-white/90 text-xl">{battleResult.playerFinal} - {battleResult.opponentFinal}</p>
              {cooldownMsg && (
                <p className="mt-2 text-white/80 text-sm">{cooldownMsg}</p>
              )}
              {coinsWon !== null && coinsWon > 0 && (
                <motion.p initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-black/25 rounded-full text-yellow-300 font-bold">
                  <Coins className="w-4 h-4" /> +{coinsWon} coins
                  {ratingDelta !== null && (
                    <span className={ratingDelta >= 0 ? 'text-green-300' : 'text-red-300'}>
                      · {ratingDelta >= 0 ? '+' : ''}{ratingDelta} rating
                    </span>
                  )}
                </motion.p>
              )}
              {battleResult.winner === 'player' && !isLoggedIn && (
                <p className="mt-2 text-white/80 text-sm">Sign in and wins like this pay 25–100 coins.</p>
              )}
            </motion.div>

            {/* Box Scores */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Player */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-cyan-500/30 overflow-x-auto">
                <h3 className="text-lg font-bold text-cyan-400 mb-3">Your Box Score</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-700">
                      <th className="text-left pb-2">Player</th>
                      <th className="text-left pb-2">OVR</th>
                      {selectedScenario.scoring.categories.map(cat => (
                        <th key={cat.name} className="text-center pb-2">{cat.icon}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {battleResult.playerBoxScores.map(ps => (
                      <tr key={ps.card.name} className="border-b border-slate-800">
                        <td className="py-2 text-white font-medium truncate max-w-[100px]">{ps.card.name}</td>
                        <td className="text-slate-400">{('overallRating' in ps.card) ? ps.card.overallRating : '-'}</td>
                        {ps.stats.map((stat, i) => (
                          <td key={i} className="text-center text-slate-300">{stat.value}</td>
                        ))}
                      </tr>
                    ))}
                    <tr className="font-bold">
                      <td colSpan={2} className="pt-2 text-white">TOTAL</td>
                      {selectedScenario.scoring.categories.map((_, i) => (
                        <td key={i} className="text-center pt-2 text-cyan-400">
                          {battleResult.playerBoxScores.reduce((s, ps) => s + ps.stats[i].value, 0)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
                {battleResult.playerChemistry.active.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-700">
                    <span className="text-slate-400 text-xs">Chemistry: </span>
                    {battleResult.playerChemistry.active.map((b, i) => (
                      <span key={i} className={`text-xs ml-2 ${b.includes('-') ? 'text-red-400' : 'text-green-400'}`}>{b}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Opponent */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-red-500/30 overflow-x-auto">
                <h3 className="text-lg font-bold text-red-400 mb-3">Opponent Box Score</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-700">
                      <th className="text-left pb-2">Player</th>
                      <th className="text-left pb-2">OVR</th>
                      {selectedScenario.scoring.categories.map(cat => (
                        <th key={cat.name} className="text-center pb-2">{cat.icon}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {battleResult.opponentBoxScores.map(ps => (
                      <tr key={ps.card.name} className="border-b border-slate-800">
                        <td className="py-2 text-white font-medium truncate max-w-[100px]">{ps.card.name}</td>
                        <td className="text-slate-400">{ps.card.overallRating}</td>
                        {ps.stats.map((stat, i) => (
                          <td key={i} className="text-center text-slate-300">{stat.value}</td>
                        ))}
                      </tr>
                    ))}
                    <tr className="font-bold">
                      <td colSpan={2} className="pt-2 text-white">TOTAL</td>
                      {selectedScenario.scoring.categories.map((_, i) => (
                        <td key={i} className="text-center pt-2 text-red-400">
                          {battleResult.opponentBoxScores.reduce((s, ps) => s + ps.stats[i].value, 0)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
                {battleResult.opponentChemistry.active.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-700">
                    <span className="text-slate-400 text-xs">Chemistry: </span>
                    {battleResult.opponentChemistry.active.map((b, i) => (
                      <span key={i} className={`text-xs ml-2 ${b.includes('-') ? 'text-red-400' : 'text-green-400'}`}>{b}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* MVP */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-500/30 flex items-center justify-center gap-4">
              <Crown className="w-10 h-10 text-yellow-400" />
              <div>
                <div className="text-slate-400 text-sm">Match MVP</div>
                <div className="text-xl font-bold text-white">{battleResult.mvp.card.name}</div>
                <div className="text-yellow-400">{battleResult.mvp.highlight}</div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => { setBattleResult(null); setCoinsWon(null); setRatingDelta(null); setCooldownMsg(null); proceedToPreview(); }}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl text-white font-semibold flex items-center gap-2"
              >
                <Swords className="w-5 h-5" /> Rematch
              </button>
              <button onClick={resetBattle} className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-semibold flex items-center gap-2">
                <RotateCcw className="w-5 h-5" /> New Battle
              </button>
              <Link href="/packs" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold flex items-center gap-2">
                <Package className="w-5 h-5" /> Open Packs
              </Link>
            </div>
          </motion.div>
        )}

        {/* Nav */}
        <div className="mt-12 flex justify-center gap-4">
          <Link href="/" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 font-medium flex items-center gap-2">
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link href="/my-cards" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 font-medium">
            My Cards
          </Link>
        </div>
      </div>
    </div>
  );
}
