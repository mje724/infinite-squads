'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Sparkles, Clock, Check, Home } from 'lucide-react';
import Link from 'next/link';
import { useCardCollection } from '@/store/store';
import { nanoid } from 'nanoid';
import { PRESET_CARDS, PresetCard, calculateOVR } from '@/data/presetCards';

const RARITY_WEIGHTS = {
  bronze: 45,
  silver: 30,
  gold: 15,
  legendary: 6,
  holo: 3,
  glitch: 1,
};

// Card art is generated (not real photos of real people) — this avoids both
// broken/hotlinked image URLs and any real-likeness legal exposure now that
// the app is publicly deployed. Each name deterministically seeds a unique,
// colorful abstract avatar that always renders.
function getImageUrl(name: string): string {
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(name)}&backgroundColor=1e293b,334155,0f172a`;
}

function getRandomCards(count: number): (PresetCard & { overallRating: number })[] {
  const result: (PresetCard & { overallRating: number })[] = [];
  const totalWeight = Object.values(RARITY_WEIGHTS).reduce((a, b) => a + b, 0);
  
  while (result.length < count) {
    let random = Math.random() * totalWeight;
    let selectedRarity: keyof typeof RARITY_WEIGHTS = 'bronze';
    
    for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)) {
      random -= weight;
      if (random <= 0) {
        selectedRarity = rarity as keyof typeof RARITY_WEIGHTS;
        break;
      }
    }
    
    const rarityCards = PRESET_CARDS.filter(c => c.rarity === selectedRarity);
    if (rarityCards.length === 0) continue;
    
    const randomCard = rarityCards[Math.floor(Math.random() * rarityCards.length)];
    if (randomCard && !result.find(c => c.name === randomCard.name)) {
      result.push({ ...randomCard, overallRating: calculateOVR(randomCard.stats) });
    }
  }
  
  return result;
}

const getRarityColor = (rarity: string) => {
  const colors: Record<string, string> = { bronze: '#CD7F32', silver: '#C0C0C0', gold: '#FFD700', legendary: '#FF4500', holo: '#FF00FF', glitch: '#00FFFF' };
  return colors[rarity] || '#CD7F32';
};

const getRarityGlow = (rarity: string) => {
  const glows: Record<string, string> = {
    bronze: '0 0 20px rgba(205, 127, 50, 0.5)',
    silver: '0 0 25px rgba(192, 192, 192, 0.6)',
    gold: '0 0 35px rgba(255, 215, 0, 0.7)',
    legendary: '0 0 45px rgba(255, 69, 0, 0.8)',
    holo: '0 0 50px rgba(255, 0, 255, 0.7)',
    glitch: '0 0 60px rgba(0, 255, 255, 0.8), 0 0 100px rgba(255, 0, 255, 0.5)',
  };
  return glows[rarity] || '';
};

const PACK_LIMIT = 5;
const COOLDOWN_MS = 30 * 60 * 1000;

export default function PacksPage() {
  const { addCard } = useCardCollection();
  const [packsRemaining, setPacksRemaining] = useState(PACK_LIMIT);
  const [cooldownEnd, setCooldownEnd] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [packCards, setPackCards] = useState<(PresetCard & { overallRating: number })[]>([]);
  const [selectedCard, setSelectedCard] = useState<(PresetCard & { overallRating: number }) | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('packState');
    if (stored) {
      const state = JSON.parse(stored);
      const now = Date.now();
      if (state.cooldownEnd && now < state.cooldownEnd) {
        setCooldownEnd(state.cooldownEnd);
        setPacksRemaining(0);
      } else if (state.cooldownEnd && now >= state.cooldownEnd) {
        setPacksRemaining(PACK_LIMIT);
        setCooldownEnd(null);
        localStorage.removeItem('packState');
      } else {
        setPacksRemaining(state.packsRemaining ?? PACK_LIMIT);
      }
    }
  }, []);

  useEffect(() => {
    if (!cooldownEnd) { setTimeLeft(''); return; }
    const updateTimer = () => {
      const diff = cooldownEnd - Date.now();
      if (diff <= 0) { setPacksRemaining(PACK_LIMIT); setCooldownEnd(null); setTimeLeft(''); localStorage.removeItem('packState'); return; }
      setTimeLeft(`${Math.floor(diff / 60000)}:${Math.floor((diff % 60000) / 1000).toString().padStart(2, '0')}`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [cooldownEnd]);

  const openPack = () => {
    if (packsRemaining <= 0) return;
    setPackCards(getRandomCards(3));
    setSelectedCard(null);
    setIsRevealed(false);
    setHoveredCard(null);
    setTimeout(() => setIsRevealed(true), 500);
  };

  const selectCard = (card: PresetCard & { overallRating: number }) => {
    if (!showConfirmation) setSelectedCard(card);
  };

  const confirmSelection = () => {
    if (!selectedCard) return;
    
    const now = new Date();
    const statBlock = selectedCard.stats.map((s, i) => ({
      id: `stat-${i}`,
      label: `${s.emoji} ${s.label}`,
      value: s.value,
      icon: s.emoji,
      category: 'custom',
    }));
    
    addCard({
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
    });
    
    const newPacksRemaining = packsRemaining - 1;
    setPacksRemaining(newPacksRemaining);
    
    if (newPacksRemaining <= 0) {
      const newCooldownEnd = Date.now() + COOLDOWN_MS;
      setCooldownEnd(newCooldownEnd);
      localStorage.setItem('packState', JSON.stringify({ packsRemaining: 0, cooldownEnd: newCooldownEnd }));
    } else {
      localStorage.setItem('packState', JSON.stringify({ packsRemaining: newPacksRemaining }));
    }
    
    setShowConfirmation(true);
    setTimeout(() => { setShowConfirmation(false); setPackCards([]); setSelectedCard(null); }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">Card Packs</h1>
          <p className="text-slate-400">Open packs, pick your favorite card</p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl px-6 py-3 flex items-center gap-3">
            <Package className="w-5 h-5 text-purple-400" />
            <span className="text-white font-semibold">{packsRemaining} / {PACK_LIMIT} Packs</span>
          </div>
          {timeLeft && (
            <div className="bg-slate-800/50 border border-orange-500/30 rounded-xl px-6 py-3 flex items-center gap-3 animate-pulse">
              <Clock className="w-5 h-5 text-orange-400" />
              <span className="text-orange-400 font-semibold">{timeLeft}</span>
            </div>
          )}
        </div>

        {packCards.length === 0 ? (
          <div className="flex flex-col items-center gap-6">
            <motion.button
              onClick={openPack}
              disabled={packsRemaining <= 0}
              whileHover={packsRemaining > 0 ? { scale: 1.05 } : {}}
              whileTap={packsRemaining > 0 ? { scale: 0.95 } : {}}
              className={`relative px-12 py-6 rounded-2xl font-bold text-xl transition-all ${packsRemaining > 0 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
            >
              <span className="flex items-center gap-3">
                <Package className="w-6 h-6" />
                {packsRemaining > 0 ? 'Open Pack' : 'No Packs Available'}
              </span>
            </motion.button>
            {packsRemaining <= 0 && timeLeft && <p className="text-slate-400">New packs in {timeLeft}</p>}
            <Link href="/my-cards" className="text-purple-400 hover:text-purple-300">View My Collection →</Link>
          </div>
        ) : (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center text-white">{showConfirmation ? '✨ Card Added!' : 'Choose One Card'}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
              <AnimatePresence>
                {packCards.map((card, index) => {
                  const isSelected = selectedCard?.name === card.name;
                  const isHovered = hoveredCard === card.name;
                  const otherSelected = selectedCard && !isSelected;

                  return (
                    <motion.div
                      key={card.name}
                      initial={{ rotateY: 180, opacity: 0, y: 50 }}
                      animate={isRevealed ? { rotateY: 0, opacity: otherSelected ? 0.4 : 1, y: isSelected ? -20 : isHovered ? -10 : 0, scale: isSelected ? 1.05 : otherSelected ? 0.95 : 1 } : {}}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      onClick={() => selectCard(card)}
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
                            <img src={getImageUrl(card.name)} alt={card.name} className="w-full h-full object-cover object-top" onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${card.name}&backgroundColor=1e293b`; }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                            <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 rounded-lg">
                              <span className="text-white font-bold text-lg">{card.overallRating}</span>
                            </div>
                            <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm" style={{ background: `${getRarityColor(card.rarity)}33`, color: getRarityColor(card.rarity), border: `1px solid ${getRarityColor(card.rarity)}66` }}>
                              {card.rarity}
                            </div>
                          </div>

                          <div className="flex-1 p-3 flex flex-col -mt-4 relative z-10">
                            <div className="mb-2">
                              <h3 className="font-bold text-white text-base leading-tight">{card.name}</h3>
                              <p className="text-slate-400 text-xs italic">&quot;{card.nickname}&quot;</p>
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

                        {card.rarity === 'glitch' && (
                          <motion.div className="absolute inset-0 pointer-events-none mix-blend-overlay" animate={{ background: ['transparent', 'rgba(0,255,255,0.15)', 'transparent', 'rgba(255,0,255,0.15)', 'transparent'] }} transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1.5 }} />
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
                <Sparkles className="w-16 h-16 text-yellow-400 animate-pulse" />
              </motion.div>
            )}
          </div>
        )}

        <div className="mt-12 flex justify-center gap-4">
          <Link href="/" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white font-medium transition-all flex items-center gap-2">
            <Home className="w-4 h-4" />
            Card Creator
          </Link>
          <Link href="/my-cards" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white font-medium transition-all">My Collection</Link>
        </div>
      </div>
    </div>
  );
}
