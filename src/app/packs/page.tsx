'use client';

// ============================================
// PACKS — the coin sink.
// Three tiers, published odds, pick 1 of 3.
// Guests get exactly one free pack, then the
// signup bonus (1,000 coins = 10 packs) closes.
// ============================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Sparkles, Check, Coins, Lock, Info, Layers } from 'lucide-react';
import Link from 'next/link';
import { nanoid } from 'nanoid';
import { PRESET_CARDS, PresetCard, calculateOVR } from '@/data/presetCards';
import { getImageUrl } from '@/lib/avatar';
import { useGameCollection } from '@/hooks/useGameCollection';
import { useCoins } from '@/hooks/useCoins';
import { useAuth } from '@/components/AuthProvider';
import { getSupabase } from '@/lib/supabase';
import LoginModal from '@/components/LoginModal';
import {
  PACK_TIERS,
  PackTier,
  PackRarity,
  packOddsPercent,
  QUICKSELL_VALUES,
  GUEST_FREE_PACK_KEY,
} from '@/data/gameEconomy';
import { getGameData, TAG_LABELS } from '@/data/cardRegistry';
import { trackObjective } from '@/data/objectives';
import { Card } from '@/types/schema';

// Bad-luck protection: every PITY_LIMIT-th pack without a legendary/holo
// in its contents guarantees one. Gacha that respects the floor keeps players.
const PITY_LIMIT = 10;

type PulledCard = PresetCard & { overallRating: number };

function rollRarity(tier: PackTier): PackRarity {
  const entries = Object.entries(tier.weights) as [PackRarity, number][];
  const total = entries.reduce((a, [, w]) => a + w, 0);
  let r = Math.random() * total;
  for (const [rarity, w] of entries) {
    r -= w;
    if (r <= 0) return rarity;
  }
  return 'bronze';
}

function getRandomCards(tier: PackTier, count: number, guaranteeLegendary = false): PulledCard[] {
  const result: PulledCard[] = [];
  let guard = 0;
  while (result.length < count && guard++ < 200) {
    const rarity = rollRarity(tier);
    const pool = PRESET_CARDS.filter(c => c.rarity === rarity);
    if (pool.length === 0) continue;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (!result.find(c => c.name === pick.name)) {
      result.push({ ...pick, overallRating: calculateOVR(pick.stats) });
    }
  }
  // Pity trigger: swap one card for a legendary/holo if none rolled
  if (guaranteeLegendary && !result.some(c => c.rarity === 'legendary' || c.rarity === 'holo')) {
    const pool = PRESET_CARDS.filter(
      c => (c.rarity === 'legendary' || c.rarity === 'holo') && !result.find(r => r.name === c.name)
    );
    if (pool.length > 0) {
      const pick = pool[Math.floor(Math.random() * pool.length)];
      result[Math.floor(Math.random() * result.length)] = { ...pick, overallRating: calculateOVR(pick.stats) };
    }
  }
  return result;
}

const getRarityColor = (rarity: string) => {
  const colors: Record<string, string> = {
    bronze: '#CD7F32', silver: '#C0C0C0', gold: '#FFD700',
    legendary: '#FF4500', holo: '#FF00FF', glitch: '#00FFFF', icon: '#e8d5a3',
  };
  return colors[rarity] || '#CD7F32';
};

const getRarityGlow = (rarity: string) => {
  const glows: Record<string, string> = {
    bronze: '0 0 20px rgba(205, 127, 50, 0.5)',
    silver: '0 0 25px rgba(192, 192, 192, 0.6)',
    gold: '0 0 35px rgba(255, 215, 0, 0.7)',
    legendary: '0 0 45px rgba(255, 69, 0, 0.8)',
    holo: '0 0 50px rgba(255, 0, 255, 0.7)',
    icon: '0 0 55px rgba(232, 213, 163, 0.9)',
  };
  return glows[rarity] || '';
};

export default function PacksPage() {
  const { addCard, copiesOf, isLoggedIn } = useGameCollection();
  const { balance, spendCoins, canAfford } = useCoins();
  const { user } = useAuth();
  const supabase = getSupabase();

  const [packCards, setPackCards] = useState<PulledCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<PulledCard | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showOdds, setShowOdds] = useState(false);
  const [guestPackUsed, setGuestPackUsed] = useState(true); // pessimistic until read
  const [opening, setOpening] = useState(false);
  const [pityCount, setPityCount] = useState(0);
  const [heatFlash, setHeatFlash] = useState(false);

  const pityKey = `is-pity-${user?.id ?? 'guest'}`;

  useEffect(() => {
    setGuestPackUsed(localStorage.getItem(GUEST_FREE_PACK_KEY) === '1');
  }, []);

  useEffect(() => {
    setPityCount(parseInt(localStorage.getItem(pityKey) ?? '0', 10) || 0);
  }, [pityKey]);

  const openPack = async (tier: PackTier) => {
    if (opening || packCards.length > 0) return;
    setOpening(true);

    if (isLoggedIn) {
      const ok = await spendCoins(tier.cost, 'pack_purchase', `Opened ${tier.name}`);
      if (!ok) {
        setOpening(false);
        return;
      }
      // track packs_opened (best-effort)
      if (user) {
        const { data } = await supabase.from('profiles').select('packs_opened').eq('id', user.id).single();
        await supabase.from('profiles').update({ packs_opened: (data?.packs_opened ?? 0) + 1 }).eq('id', user.id);
      }
    } else {
      if (guestPackUsed) {
        setShowLogin(true);
        setOpening(false);
        return;
      }
      localStorage.setItem(GUEST_FREE_PACK_KEY, '1');
      setGuestPackUsed(true);
    }

    trackObjective('pack_opened');
    const cards = getRandomCards(tier, 3, pityCount >= PITY_LIMIT - 1);
    const hasHeat = cards.some(c => c.rarity === 'legendary' || c.rarity === 'holo');
    const nextPity = hasHeat ? 0 : pityCount + 1;
    localStorage.setItem(pityKey, String(nextPity));
    setPityCount(nextPity);

    setPackCards(cards);
    setSelectedCard(null);
    setIsRevealed(false);
    setHoveredCard(null);
    // Anticipation: big pulls get a golden beat before the flip
    if (hasHeat) {
      setHeatFlash(true);
      setTimeout(() => setHeatFlash(false), 1400);
      setTimeout(() => setIsRevealed(true), 1500);
    } else {
      setTimeout(() => setIsRevealed(true), 500);
    }
    setOpening(false);
  };

  const confirmSelection = async () => {
    if (!selectedCard) return;

    const now = new Date();
    const statBlock = selectedCard.stats.map((s, i) => ({
      id: `stat-${i}`,
      label: `${s.emoji} ${s.label}`,
      value: s.value,
      icon: s.emoji,
      category: 'custom',
    }));

    const card: Card = {
      id: nanoid(),
      name: selectedCard.name,
      nickname: selectedCard.nickname,
      position: '',
      image: getImageUrl(selectedCard.name),
      imageFilter: 'normal',
      rarity: selectedCard.rarity,
      theme: 'custom',
      mode: 'unserious',
      overallRating: selectedCard.overallRating,
      statBlock,
      traits: [],
      bio: `"${selectedCard.nickname}"`,
      activeEffects: [],
      createdAt: now,
      updatedAt: now,
    };

    await addCard(card);

    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setPackCards([]);
      setSelectedCard(null);
    }, 2000);
  };

  const bigPull = selectedCard && ['legendary', 'holo'].includes(selectedCard.rarity);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">Card Packs</h1>
          <p className="text-slate-400">Three cards appear. You keep one. Choose like history is watching — it is.</p>
        </div>

        {/* Wallet strip */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {isLoggedIn ? (
            <div className="bg-slate-800/50 border border-yellow-500/30 rounded-xl px-6 py-3 flex items-center gap-3">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{balance.toLocaleString()} coins</span>
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 rounded-xl px-6 py-3 text-purple-300 font-semibold hover:border-purple-400 transition-colors"
            >
              {guestPackUsed
                ? '🎁 Sign up → 1,000 coins (that\'s 10 packs)'
                : '👋 One free pack on the house — after that, sign up for 1,000 coins'}
            </button>
          )}
          <button
            onClick={() => setShowOdds(!showOdds)}
            className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <Info className="w-4 h-4" />
            <span className="text-sm font-medium">Odds</span>
          </button>
          {isLoggedIn && PITY_LIMIT - pityCount <= 5 && (
            <div className="bg-orange-500/10 border border-orange-500/40 rounded-xl px-4 py-3 flex items-center gap-2">
              <span className="text-orange-300 text-sm font-bold">
                ⚡ Legendary+ guaranteed within {PITY_LIMIT - pityCount} pack{PITY_LIMIT - pityCount === 1 ? '' : 's'}
              </span>
            </div>
          )}
        </div>

        {/* Heat flash: the golden beat before a big pull flips */}
        <AnimatePresence>
          {heatFlash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.35, 0.15, 0.5, 0.25, 0.7] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3 }}
              className="fixed inset-0 z-50 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(255,200,60,0.55) 0%, rgba(255,120,0,0.18) 45%, transparent 75%)' }}
            />
          )}
        </AnimatePresence>

        {/* Odds panel — published like a casino that respects you */}
        <AnimatePresence>
          {showOdds && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PACK_TIERS.map(tier => (
                  <div key={tier.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                    <p className="font-bold text-white mb-2">{tier.emoji} {tier.name}</p>
                    <div className="space-y-1">
                      {packOddsPercent(tier).map(({ rarity, pct }) => (
                        <div key={rarity} className="flex justify-between text-xs">
                          <span className="uppercase font-semibold" style={{ color: getRarityColor(rarity) }}>{rarity}</span>
                          <span className="text-slate-400">{pct}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-slate-500 text-xs mt-3">
                Per-card odds, rolled independently for each of the 3 cards. ICON cards can&apos;t be pulled — those are earned in <Link href="/collections" className="text-purple-400 hover:underline">Collections</Link>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {packCards.length === 0 ? (
          <>
            {/* Tier storefront */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {PACK_TIERS.map((tier, i) => {
                const affordable = isLoggedIn ? canAfford(tier.cost) : (!guestPackUsed && i === 0);
                const guestLocked = !isLoggedIn && (guestPackUsed || i > 0);
                return (
                  <motion.div
                    key={tier.id}
                    whileHover={affordable ? { y: -6 } : {}}
                    className={`relative rounded-2xl border p-6 flex flex-col items-center text-center transition-colors ${
                      affordable ? 'bg-slate-900/70 border-slate-700 hover:border-slate-500' : 'bg-slate-900/40 border-slate-800'
                    }`}
                  >
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${tier.accent}33, ${tier.accent}11)`, border: `1px solid ${tier.accent}55` }}
                    >
                      {tier.emoji}
                    </div>
                    <h3 className="text-xl font-black text-white mb-1">{tier.name}</h3>
                    <p className="text-slate-400 text-sm mb-4 min-h-[40px]">{tier.tagline}</p>

                    <motion.button
                      onClick={() => (guestLocked ? setShowLogin(true) : openPack(tier))}
                      whileTap={{ scale: 0.95 }}
                      disabled={isLoggedIn && !affordable}
                      className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                        guestLocked
                          ? 'bg-slate-800 text-slate-400 hover:text-white'
                          : affordable
                          ? 'text-white shadow-lg'
                          : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                      }`}
                      style={
                        !guestLocked && affordable
                          ? { background: `linear-gradient(135deg, ${tier.accent}, ${tier.accent}bb)` }
                          : undefined
                      }
                    >
                      {guestLocked ? (
                        <><Lock className="w-4 h-4" /> Sign up to open</>
                      ) : !isLoggedIn ? (
                        <><Package className="w-4 h-4" /> Open free pack</>
                      ) : (
                        <><Coins className="w-4 h-4" /> {tier.cost.toLocaleString()}</>
                      )}
                    </motion.button>

                    {isLoggedIn && !affordable && (
                      <p className="text-slate-500 text-xs mt-2">
                        Need {(tier.cost - balance).toLocaleString()} more — win battles or quicksell dupes
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="flex justify-center gap-6 text-sm">
              <Link href="/collections" className="text-purple-400 hover:text-purple-300 flex items-center gap-1">
                <Layers className="w-4 h-4" /> Collections →
              </Link>
              <Link href="/my-cards" className="text-purple-400 hover:text-purple-300">My Collection →</Link>
            </div>
          </>
        ) : (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center text-white">
              {showConfirmation ? (bigPull ? '🎆 BIG PULL. Card Added!' : '✨ Card Added!') : 'Choose One Card'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
              <AnimatePresence>
                {packCards.map((card, index) => {
                  const isSelected = selectedCard?.name === card.name;
                  const isHovered = hoveredCard === card.name;
                  const otherSelected = selectedCard && !isSelected;
                  const owned = copiesOf(card.name);

                  return (
                    <motion.div
                      key={card.name}
                      initial={{ rotateY: 180, opacity: 0, y: 50 }}
                      animate={isRevealed ? { rotateY: 0, opacity: otherSelected ? 0.4 : 1, y: isSelected ? -20 : isHovered ? -10 : 0, scale: isSelected ? 1.05 : otherSelected ? 0.95 : 1 } : {}}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      onClick={() => !showConfirmation && setSelectedCard(card)}
                      onMouseEnter={() => !showConfirmation && setHoveredCard(card.name)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className="cursor-pointer"
                    >
                      <motion.div
                        className="relative rounded-2xl overflow-hidden aspect-[3/4]"
                        animate={{ boxShadow: isSelected || isHovered ? getRarityGlow(card.rarity) : '0 10px 30px rgba(0,0,0,0.3)' }}
                        style={{ background: `linear-gradient(135deg, ${getRarityColor(card.rarity)} 0%, ${getRarityColor(card.rarity)}88 100%)` }}
                      >
                        <div className="absolute inset-[3px] bg-slate-900 rounded-xl overflow-hidden flex flex-col">
                          <div className="relative h-[45%] overflow-hidden bg-slate-800">
                            <img src={getImageUrl(card.name)} alt={card.name} className="w-full h-full object-cover object-top" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                            <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 rounded-lg">
                              <span className="text-white font-bold text-lg">{card.overallRating}</span>
                            </div>
                            <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm" style={{ background: `${getRarityColor(card.rarity)}33`, color: getRarityColor(card.rarity), border: `1px solid ${getRarityColor(card.rarity)}66` }}>
                              {card.rarity}
                            </div>
                            {/* NEW vs DUPE */}
                            <div className="absolute bottom-2 left-2">
                              {owned === 0 ? (
                                <span className="px-2 py-0.5 bg-green-500/90 text-white text-[10px] font-black uppercase rounded-full tracking-wider">New</span>
                              ) : (
                                <span className="px-2 py-0.5 bg-slate-700/90 text-slate-300 text-[10px] font-bold uppercase rounded-full tracking-wider">
                                  Owned ×{owned} · sells {QUICKSELL_VALUES[card.rarity]}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex-1 p-3 flex flex-col -mt-4 relative z-10">
                            <div className="mb-2">
                              <h3 className="font-bold text-white text-base leading-tight">{card.name}</h3>
                              <p className="text-slate-400 text-xs italic">&quot;{card.nickname}&quot;</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {getGameData(card.name, card.overallRating).tags.map(t => (
                                  <span key={t} className="px-1.5 py-0.5 bg-purple-500/15 border border-purple-500/30 rounded-full text-purple-300 text-[9px] font-bold uppercase tracking-wide">{TAG_LABELS[t]}</span>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-1 flex-1 overflow-y-auto">
                              {card.stats.map((stat, i) => (
                                <div key={i} className="flex justify-between items-center text-xs">
                                  <span className="text-slate-400 truncate flex-1">{stat.emoji} {stat.label}</span>
                                  <span className="font-bold ml-2" style={{ color: stat.value > 80 ? '#22c55e' : stat.value > 50 ? '#eab308' : stat.value > 20 ? '#f97316' : '#ef4444' }}>{stat.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 left-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                            <Check className="w-5 h-5 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {selectedCard && !showConfirmation && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-center pt-4">
                  <motion.button onClick={confirmSelection} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold text-white text-lg shadow-lg flex items-center gap-3">
                    <Check className="w-5 h-5" />
                    Add {selectedCard.name} to Collection
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {showConfirmation && (
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center">
                <Sparkles className={`w-16 h-16 animate-pulse ${bigPull ? 'text-fuchsia-400' : 'text-yellow-400'}`} />
              </motion.div>
            )}
          </div>
        )}
      </div>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
