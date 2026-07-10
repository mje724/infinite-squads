'use client';

// ============================================
// COLLECTIONS — the SBC engine.
// Burn a themed cluster of cards, unlock a card
// that exists nowhere else. One-time icon sets
// build the trophy case; repeatable furnaces
// give every dupe a purpose.
// ============================================

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Check, Lock, Coins, Sparkles, X, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { nanoid } from 'nanoid';
import { useGameCollection } from '@/hooks/useGameCollection';
import { useAuth } from '@/components/AuthProvider';
import { getSupabase } from '@/lib/supabase';
import LoginModal from '@/components/LoginModal';
import {
  COLLECTION_SETS,
  CollectionSet,
  SetRequirement,
  getIconCard,
  iconOVR,
  IconCard,
} from '@/data/collections';
import { PRESET_CARDS, calculateOVR } from '@/data/presetCards';
import { getImageUrl } from '@/lib/avatar';
import { Card, RARITY_STYLES } from '@/types/schema';

// ─────────────────────────────────────────────
// Burn planning: given owned cards + requirements,
// pick exactly which copies to sacrifice.
// Dupes burn first; among dupes, lowest OVR first.
// ─────────────────────────────────────────────

function planBurn(cards: Card[], reqs: SetRequirement[]): { ok: boolean; burnIds: string[] } {
  const used = new Set<string>();
  const burnIds: string[] = [];
  const countByName = new Map<string, number>();
  for (const c of cards) countByName.set(c.name, (countByName.get(c.name) ?? 0) + 1);

  const preference = (c: Card) =>
    // burn dupes before last copies, weakest first
    (countByName.get(c.name)! > 1 ? 0 : 1000) + c.overallRating;

  // specific requirements first (they're the scarce ones)
  for (const req of reqs.filter(r => r.kind === 'specific')) {
    const candidates = cards
      .filter(c => c.name === req.cardName && !used.has(c.id))
      .sort((a, b) => preference(a) - preference(b));
    if (candidates.length === 0) return { ok: false, burnIds: [] };
    used.add(candidates[0].id);
    burnIds.push(candidates[0].id);
  }

  for (const req of reqs.filter(r => r.kind === 'rarity')) {
    const candidates = cards
      .filter(c => c.rarity === req.rarity && !used.has(c.id))
      .sort((a, b) => preference(a) - preference(b));
    if (candidates.length < (req.count ?? 1)) return { ok: false, burnIds: [] };
    for (let i = 0; i < (req.count ?? 1); i++) {
      used.add(candidates[i].id);
      burnIds.push(candidates[i].id);
    }
  }

  return { ok: true, burnIds };
}

function requirementProgress(cards: Card[], req: SetRequirement): { have: number; need: number } {
  if (req.kind === 'specific') {
    return { have: Math.min(1, cards.filter(c => c.name === req.cardName).length), need: 1 };
  }
  return {
    have: Math.min(req.count ?? 1, cards.filter(c => c.rarity === req.rarity).length),
    need: req.count ?? 1,
  };
}

function iconToCard(icon: IconCard): Card {
  const now = new Date();
  return {
    id: nanoid(),
    name: icon.name,
    nickname: icon.nickname,
    position: '',
    image: getImageUrl(icon.name),
    imageFilter: 'normal',
    rarity: 'icon',
    theme: 'custom',
    mode: 'unserious',
    overallRating: iconOVR(icon),
    statBlock: icon.stats.map((s, i) => ({
      id: `stat-${i}`,
      label: `${s.emoji} ${s.label}`,
      value: s.value,
      icon: s.emoji,
      category: 'custom',
    })),
    traits: [],
    bio: `"${icon.nickname}"`,
    activeEffects: [],
    createdAt: now,
    updatedAt: now,
  };
}

function randomRewardCard(rarity: string): Card {
  const pool = PRESET_CARDS.filter(c => c.rarity === rarity);
  const pick = pool[Math.floor(Math.random() * pool.length)];
  const now = new Date();
  return {
    id: nanoid(),
    name: pick.name,
    nickname: pick.nickname,
    position: '',
    image: getImageUrl(pick.name),
    imageFilter: 'normal',
    rarity: pick.rarity,
    theme: 'custom',
    mode: 'unserious',
    overallRating: calculateOVR(pick.stats),
    statBlock: pick.stats.map((s, i) => ({
      id: `stat-${i}`,
      label: `${s.emoji} ${s.label}`,
      value: s.value,
      icon: s.emoji,
      category: 'custom',
    })),
    traits: [],
    bio: `"${pick.nickname}"`,
    activeEffects: [],
    createdAt: now,
    updatedAt: now,
  };
}

const rarityColor = (rarity: string) => {
  const colors: Record<string, string> = {
    bronze: '#CD7F32', silver: '#C0C0C0', gold: '#FFD700',
    legendary: '#FF4500', holo: '#FF00FF', glitch: '#00FFFF', icon: '#e8d5a3',
  };
  return colors[rarity] || '#CD7F32';
};

// ─────────────────────────────────────────────

export default function CollectionsPage() {
  const { cards, addCard, isLoggedIn, refresh, loading } = useGameCollection();
  const { user, refreshProfile } = useAuth();
  const supabase = getSupabase();

  const [completedSets, setCompletedSets] = useState<Set<string>>(new Set());
  const [confirmSet, setConfirmSet] = useState<CollectionSet | null>(null);
  const [burning, setBurning] = useState(false);
  const [rewardCard, setRewardCard] = useState<Card | null>(null);
  const [rewardBonus, setRewardBonus] = useState(0);
  const [showLogin, setShowLogin] = useState(false);

  const fetchCompletions = useCallback(async () => {
    if (!user) {
      setCompletedSets(new Set());
      return;
    }
    const { data } = await supabase.from('set_completions').select('set_id').eq('user_id', user.id);
    setCompletedSets(new Set((data ?? []).map((r: { set_id: string }) => r.set_id)));
  }, [user, supabase]);

  useEffect(() => {
    fetchCompletions();
  }, [fetchCompletions]);

  const plans = useMemo(() => {
    const m = new Map<string, { ok: boolean; burnIds: string[] }>();
    for (const set of COLLECTION_SETS) m.set(set.id, planBurn(cards, set.requirements));
    return m;
  }, [cards]);

  const executeSet = async (set: CollectionSet) => {
    if (burning) return;
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    const plan = planBurn(cards, set.requirements);
    if (!plan.ok || !user) return;

    setBurning(true);

    // roll the reward up-front so the reveal is instant after the burn
    const reward =
      set.reward.kind === 'icon'
        ? iconToCard(getIconCard(set.reward.cardName)!)
        : randomRewardCard(set.reward.rarity);

    const { data, error } = await supabase.rpc('complete_set', {
      p_user_id: user.id,
      p_set_id: set.id,
      p_card_ids: plan.burnIds,
      p_bonus: set.bonusCoins,
      p_repeatable: set.repeatable,
    });

    if (error || data !== true) {
      console.error('Set completion failed:', error);
      setBurning(false);
      setConfirmSet(null);
      await Promise.all([refresh(), fetchCompletions()]);
      return;
    }

    await addCard(reward);
    await Promise.all([refresh(), fetchCompletions(), refreshProfile()]);

    setBurning(false);
    setConfirmSet(null);
    setRewardBonus(set.bonusCoins);
    setRewardCard(reward);
  };

  const iconSets = COLLECTION_SETS.filter(s => !s.repeatable);
  const furnaces = COLLECTION_SETS.filter(s => s.repeatable);
  const trophies = iconSets.filter(s => completedSets.has(s.id)).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-amber-950/10 to-slate-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent mb-2">Collections</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Some cards can&apos;t be pulled, bought, or begged for. Burn the right cluster of history and they&apos;re yours forever.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="bg-slate-900/60 border border-amber-500/20 rounded-xl px-5 py-2 text-sm text-amber-200/80">
            🏆 {trophies} / {iconSets.length} icons unlocked
          </div>
        </div>

        {/* Furnaces */}
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><RefreshCw className="w-5 h-5 text-orange-400" /> Furnaces <span className="text-slate-500 text-sm font-normal">— repeatable, feed them your dupes</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {furnaces.map(set => (
            <SetCard
              key={set.id}
              set={set}
              cards={cards}
              plan={plans.get(set.id)!}
              completed={false}
              onStart={() => setConfirmSet(set)}
            />
          ))}
        </div>

        {/* Icon sets */}
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-amber-300" /> Icon Sets <span className="text-slate-500 text-sm font-normal">— one chance each, choose your sacrifices</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {iconSets.map(set => (
            <SetCard
              key={set.id}
              set={set}
              cards={cards}
              plan={plans.get(set.id)!}
              completed={completedSets.has(set.id)}
              onStart={() => setConfirmSet(set)}
            />
          ))}
        </div>

        {!loading && cards.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-400 mb-4">You need cards before you can burn cards. That&apos;s just physics.</p>
            <Link href="/packs" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-white">Open Packs →</Link>
          </div>
        )}
      </div>

      {/* Confirm burn modal */}
      <AnimatePresence>
        {confirmSet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => !burning && setConfirmSet(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-slate-900 border border-orange-500/30 rounded-2xl p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-black text-white">{confirmSet.emoji} {confirmSet.name}</h3>
                {!burning && (
                  <button onClick={() => setConfirmSet(null)} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
                )}
              </div>

              <p className="text-slate-400 text-sm mb-4">These cards go into the fire. This cannot be undone. They had a good run.</p>

              <div className="space-y-2 mb-5 max-h-48 overflow-y-auto">
                {planBurn(cards, confirmSet.requirements).burnIds.map(id => {
                  const c = cards.find(x => x.id === id);
                  if (!c) return null;
                  return (
                    <div key={id} className="flex items-center gap-3 bg-slate-800/60 rounded-lg px-3 py-2">
                      <img src={c.image ?? ''} alt={c.name} className="w-8 h-8 rounded object-cover" />
                      <span className="text-white text-sm font-semibold flex-1">{c.name}</span>
                      <span className="text-xs font-bold uppercase" style={{ color: rarityColor(c.rarity) }}>{c.rarity}</span>
                      <Flame className="w-4 h-4 text-orange-500" />
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-800/60 rounded-xl p-3 mb-5 text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">You receive</p>
                <p className="text-amber-300 font-bold">
                  {confirmSet.reward.kind === 'icon' ? `⭐ ${confirmSet.reward.cardName} (ICON)` : `🎲 ${confirmSet.reward.label}`}
                  {confirmSet.bonusCoins > 0 && <span className="text-yellow-400"> + {confirmSet.bonusCoins} coins</span>}
                </p>
              </div>

              <motion.button
                onClick={() => executeSet(confirmSet)}
                disabled={burning}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-black text-white text-lg flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {burning ? (
                  <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><Flame className="w-5 h-5" /></motion.span>
                ) : (
                  <Flame className="w-5 h-5" />
                )}
                {burning ? 'Burning...' : 'Burn Them'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reward reveal */}
      <AnimatePresence>
        {rewardCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setRewardCard(null)}
          >
            <motion.div
              initial={{ scale: 0.3, rotateY: 180, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              transition={{ type: 'spring', damping: 15, delay: 0.15 }}
              className="text-center"
              onClick={e => e.stopPropagation()}
            >
              <motion.p
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-2xl font-black mb-4"
                style={{ color: rarityColor(rewardCard.rarity) }}
              >
                {rewardCard.rarity === 'icon' ? '⭐ ICON UNLOCKED' : '🎲 REWARD PULLED'}
              </motion.p>

              <div
                className="relative w-[300px] rounded-2xl p-[4px] mx-auto"
                style={{ background: RARITY_STYLES[rewardCard.rarity].gradient, boxShadow: RARITY_STYLES[rewardCard.rarity].glow }}
              >
                <div className="bg-slate-900 rounded-xl overflow-hidden">
                  <div className="relative h-44 bg-slate-800">
                    <img src={rewardCard.image ?? ''} alt={rewardCard.name} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 rounded-lg">
                      <span className="text-white font-black text-xl">{rewardCard.overallRating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-black text-white">{rewardCard.name}</h3>
                    <p className="text-slate-400 text-sm italic mb-3">&quot;{rewardCard.nickname}&quot;</p>
                    <div className="space-y-1 text-left">
                      {rewardCard.statBlock.slice(0, 6).map((s, i) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span className="text-slate-400">{s.label}</span>
                          <span className="font-bold" style={{ color: s.value > 80 ? '#22c55e' : '#eab308' }}>{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {rewardBonus > 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-yellow-400 font-bold mt-4 flex items-center justify-center gap-2">
                  <Coins className="w-5 h-5" /> +{rewardBonus} coins
                </motion.p>
              )}

              <button onClick={() => setRewardCard(null)} className="mt-6 px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white font-bold transition-colors">
                Magnificent
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}

// ─────────────────────────────────────────────
// Set card
// ─────────────────────────────────────────────

function SetCard({
  set,
  cards,
  plan,
  completed,
  onStart,
}: {
  set: CollectionSet;
  cards: Card[];
  plan: { ok: boolean; burnIds: string[] };
  completed: boolean;
  onStart: () => void;
}) {
  const icon = set.reward.kind === 'icon' ? getIconCard(set.reward.cardName) : undefined;
  const totalNeed = set.requirements.reduce((a, r) => a + (r.kind === 'rarity' ? r.count ?? 1 : 1), 0);
  const totalHave = set.requirements.reduce((a, r) => a + requirementProgress(cards, r).have, 0);
  const pct = Math.round((totalHave / totalNeed) * 100);

  return (
    <div
      className={`relative rounded-2xl border p-5 ${
        completed
          ? 'bg-amber-950/20 border-amber-500/40'
          : plan.ok
          ? 'bg-slate-900/70 border-green-500/40'
          : 'bg-slate-900/50 border-slate-800'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h3 className="font-black text-white text-lg">{set.emoji} {set.name}</h3>
          <p className="text-slate-400 text-sm mt-1">{set.blurb}</p>
        </div>
        {/* Reward preview */}
        <div className="flex-shrink-0 text-center">
          {icon ? (
            <div className="w-16 rounded-lg p-[2px]" style={{ background: RARITY_STYLES.icon.gradient }}>
              <div className="bg-slate-900 rounded-md overflow-hidden">
                <img src={getImageUrl(icon.name)} alt={icon.name} className={`w-full aspect-square object-cover ${completed || plan.ok ? '' : 'grayscale opacity-70'}`} />
                <p className="text-[9px] font-bold text-amber-200 py-0.5 px-1 truncate">{icon.name}</p>
              </div>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl">🎲</div>
          )}
        </div>
      </div>

      {/* Requirements checklist */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {set.requirements.map((req, i) => {
          const { have, need } = requirementProgress(cards, req);
          const done = have >= need;
          return (
            <span
              key={i}
              className={`text-[11px] font-semibold px-2 py-1 rounded-full border ${
                done ? 'bg-green-500/15 border-green-500/40 text-green-300' : 'bg-slate-800/80 border-slate-700 text-slate-400'
              }`}
            >
              {done ? '✓ ' : ''}
              {req.kind === 'specific' ? req.cardName : `${need}× ${req.rarity!.toUpperCase()}`}
              {req.kind === 'rarity' ? ` (${have}/${need})` : ''}
            </span>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full rounded-full transition-all ${completed ? 'bg-amber-400' : 'bg-gradient-to-r from-orange-500 to-amber-400'}`}
          style={{ width: `${completed ? 100 : pct}%` }}
        />
      </div>

      {completed ? (
        <div className="flex items-center justify-center gap-2 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 font-bold text-sm">
          <Check className="w-4 h-4" /> Completed — it&apos;s in your binder
        </div>
      ) : (
        <button
          onClick={onStart}
          disabled={!plan.ok}
          className={`w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            plan.ok
              ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:opacity-90'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          {plan.ok ? (<><Flame className="w-4 h-4" /> Complete Set{set.bonusCoins > 0 ? ` (+${set.bonusCoins} 🪙)` : ''}</>) : (<><Lock className="w-4 h-4" /> Missing pieces</>)}
        </button>
      )}
    </div>
  );
}
