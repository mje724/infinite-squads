'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Sparkles, Lock, Clock, ChevronRight, X, Zap, Flame, Star } from 'lucide-react';
import Link from 'next/link';
import { PresetCard, getWeightedRandomCards, PRESET_CARDS } from '@/data/presetCards';
import { RARITY_STYLES } from '@/types/schema';
import { useCardCollection } from '@/store/store';
import { nanoid } from 'nanoid';

const DAILY_PACK_LIMIT = 2;
const CARDS_PER_PACK = 2;

// Check if we can open more packs today
const getPacksOpenedToday = (): number => {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem('packsOpenedToday');
  if (!stored) return 0;
  
  const { count, date } = JSON.parse(stored);
  const today = new Date().toDateString();
  
  if (date !== today) {
    // Reset for new day
    localStorage.setItem('packsOpenedToday', JSON.stringify({ count: 0, date: today }));
    return 0;
  }
  
  return count;
};

const incrementPacksOpened = () => {
  if (typeof window === 'undefined') return;
  const today = new Date().toDateString();
  const current = getPacksOpenedToday();
  localStorage.setItem('packsOpenedToday', JSON.stringify({ count: current + 1, date: today }));
};

// Countdown to midnight
const getTimeUntilReset = (): string => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const diff = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
};

// Pack Card Component
const PackCard: React.FC<{ card: PresetCard; index: number; isRevealed: boolean; onReveal: () => void }> = ({ 
  card, 
  index, 
  isRevealed, 
  onReveal 
}) => {
  const rarityStyle = RARITY_STYLES[card.rarity] || RARITY_STYLES.gold;
  
  return (
    <motion.div
      className="relative cursor-pointer perspective-1000"
      initial={{ rotateY: 180, scale: 0.8, opacity: 0 }}
      animate={{ 
        rotateY: isRevealed ? 0 : 180, 
        scale: 1, 
        opacity: 1 
      }}
      transition={{ 
        delay: index * 0.3,
        duration: 0.8,
        type: 'spring',
        stiffness: 100
      }}
      onClick={onReveal}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Card Back */}
      <motion.div
        className="absolute inset-0 w-[280px] h-[400px] rounded-2xl flex items-center justify-center"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)',
          border: '3px solid #334155',
          boxShadow: '0 0 30px rgba(0,0,0,0.5)',
        }}
      >
        <div className="text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          </motion.div>
          <p className="text-slate-400 text-sm">Tap to reveal</p>
        </div>
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'conic-gradient(from 0deg, transparent, cyan, transparent, purple, transparent)',
              filter: 'blur(8px)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>

      {/* Card Front */}
      <div
        className="w-[280px] h-[400px] rounded-2xl overflow-hidden"
        style={{
          backfaceVisibility: 'hidden',
          background: rarityStyle.gradient,
          boxShadow: rarityStyle.glow,
        }}
      >
        <div 
          className="absolute inset-[3px] rounded-xl overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
          }}
        >
          {/* Rarity glow effect */}
          {isRevealed && (card.rarity === 'legendary' || card.rarity === 'holo' || card.rarity === 'glitch') && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                background: `radial-gradient(circle at center, ${rarityStyle.border}40 0%, transparent 70%)`,
              }}
            />
          )}
          
          {/* Top section with rarity badge */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
            <div 
              className="px-3 py-1 rounded-full text-xs font-bold uppercase"
              style={{
                background: `${rarityStyle.border}20`,
                color: rarityStyle.border,
                border: `1px solid ${rarityStyle.border}40`,
              }}
            >
              {card.rarity}
            </div>
            <div className="flex items-center gap-1">
              {card.rarity === 'legendary' && <Flame className="w-5 h-5 text-orange-500" />}
              {card.rarity === 'holo' && <Sparkles className="w-5 h-5 text-pink-500" />}
              {card.rarity === 'glitch' && <Zap className="w-5 h-5 text-cyan-400" />}
            </div>
          </div>

          {/* Placeholder image area */}
          <div className="absolute top-16 left-4 right-4 h-32 rounded-lg bg-slate-800/50 flex items-center justify-center">
            <div className="text-6xl">{card.rarity === 'glitch' ? '👾' : card.rarity === 'legendary' ? '👑' : card.rarity === 'holo' ? '✨' : '🎭'}</div>
          </div>

          {/* Name section */}
          <div className="absolute top-52 left-4 right-4 text-center">
            <h2 
              className="text-xl font-black uppercase tracking-tight truncate"
              style={{ 
                color: rarityStyle.border,
                textShadow: `0 0 10px ${rarityStyle.border}50`,
              }}
            >
              {card.name}
            </h2>
            <p className="text-sm text-slate-400 italic mt-1">"{card.nickname}"</p>
          </div>

          {/* Stats */}
          <div className="absolute top-[280px] left-4 right-4 space-y-2">
            {card.stats.map((stat, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-slate-400 uppercase text-xs truncate flex-1">{stat.label}</span>
                <span 
                  className="font-bold ml-2"
                  style={{
                    color: stat.value >= 80 ? '#22c55e' : stat.value >= 50 ? '#eab308' : stat.value >= 20 ? '#f97316' : '#ef4444'
                  }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Holo shimmer */}
          {isRevealed && (card.rarity === 'holo' || card.rarity === 'glitch') && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                backgroundSize: '200% 200%',
              }}
              animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Pack Opening Modal
const PackOpeningModal: React.FC<{ 
  cards: PresetCard[]; 
  onClose: () => void;
  onAddToCollection: (cards: PresetCard[]) => void;
}> = ({ cards, onClose, onAddToCollection }) => {
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());
  const [showAddButton, setShowAddButton] = useState(false);

  const handleReveal = (index: number) => {
    setRevealedCards(prev => {
      const newSet = new Set(prev);
      newSet.add(index);
      if (newSet.size === cards.length) {
        setTimeout(() => setShowAddButton(true), 500);
      }
      return newSet;
    });
  };

  const revealAll = () => {
    const allIndices = new Set(cards.map((_, i) => i));
    setRevealedCards(allIndices);
    setTimeout(() => setShowAddButton(true), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4"
    >
      {/* Particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: ['#22d3ee', '#a855f7', '#ec4899', '#fbbf24'][i % 4],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-black text-center mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Pack Opened!
        </motion.h2>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {cards.map((card, index) => (
            <PackCard
              key={card.id + index}
              card={card}
              index={index}
              isRevealed={revealedCards.has(index)}
              onReveal={() => handleReveal(index)}
            />
          ))}
        </div>

        {/* Reveal all button */}
        {revealedCards.size < cards.length && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={revealAll}
            className="mt-8 mx-auto block px-6 py-2 text-slate-400 hover:text-white text-sm transition-colors"
          >
            Reveal All
          </motion.button>
        )}

        {/* Add to collection button */}
        <AnimatePresence>
          {showAddButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 flex justify-center gap-4"
            >
              <button
                onClick={() => {
                  onAddToCollection(cards);
                  onClose();
                }}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Star className="w-5 h-5" />
                Add to Collection
              </button>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 font-semibold transition-colors"
              >
                Discard
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function PacksPage() {
  const [packsOpened, setPacksOpened] = useState(0);
  const [timeUntilReset, setTimeUntilReset] = useState('');
  const [isOpening, setIsOpening] = useState(false);
  const [pulledCards, setPulledCards] = useState<PresetCard[] | null>(null);
  const [mounted, setMounted] = useState(false);
  const { addCard } = useCardCollection();

  useEffect(() => {
    setMounted(true);
    setPacksOpened(getPacksOpenedToday());
    setTimeUntilReset(getTimeUntilReset());

    const interval = setInterval(() => {
      setTimeUntilReset(getTimeUntilReset());
      setPacksOpened(getPacksOpenedToday());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const canOpenPack = packsOpened < DAILY_PACK_LIMIT;
  const packsRemaining = DAILY_PACK_LIMIT - packsOpened;

  const handleOpenPack = () => {
    if (!canOpenPack || isOpening) return;
    
    setIsOpening(true);
    
    // Simulate pack opening delay
    setTimeout(() => {
      const cards = getWeightedRandomCards(CARDS_PER_PACK);
      setPulledCards(cards);
      incrementPacksOpened();
      setPacksOpened(prev => prev + 1);
      setIsOpening(false);
    }, 1500);
  };

  const handleAddToCollection = (cards: PresetCard[]) => {
    cards.forEach(card => {
      const now = new Date();
      const stats = card.stats.map((s, i) => ({
        id: `stat-${i}`,
        label: s.label,
        value: s.value,
        icon: '📊',
        category: 'custom',
      }));
      const overallRating = Math.round(stats.reduce((sum, s) => sum + s.value, 0) / stats.length);
      
      addCard({
        id: nanoid(),
        name: card.name,
        nickname: card.nickname,
        position: '',
        image: null,
        imageFilter: 'normal',
        rarity: card.rarity,
        theme: 'custom',
        mode: 'unserious',
        overallRating,
        statBlock: stats,
        traits: [],
        bio: `"${card.nickname}"`,
        activeEffects: [],
        createdAt: now,
        updatedAt: now,
      });
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Open Packs
          </motion.h1>
          <p className="text-slate-400 mt-2">Pull legendary cards for your collection</p>
        </div>

        {/* Pack Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm text-slate-400 mb-1">Packs Remaining Today</p>
              <div className="flex items-center gap-2">
                {[...Array(DAILY_PACK_LIMIT)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      i < packsRemaining
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-500'
                        : 'bg-slate-700'
                    }`}
                  >
                    <Package className={`w-4 h-4 ${i < packsRemaining ? 'text-white' : 'text-slate-500'}`} />
                  </div>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400 mb-1">Resets In</p>
              <div className="flex items-center gap-2 text-lg font-semibold text-white">
                <Clock className="w-5 h-5 text-cyan-400" />
                {timeUntilReset}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pack Opening Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-12"
        >
          <button
            onClick={handleOpenPack}
            disabled={!canOpenPack || isOpening}
            className={`relative group ${!canOpenPack ? 'cursor-not-allowed' : ''}`}
          >
            {/* Glow effect */}
            {canOpenPack && !isOpening && (
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            )}
            
            <div
              className={`relative px-12 py-6 rounded-2xl font-bold text-xl flex items-center gap-3 transition-all ${
                canOpenPack && !isOpening
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:scale-105'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              {isOpening ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-6 h-6" />
                  </motion.div>
                  Opening...
                </>
              ) : canOpenPack ? (
                <>
                  <Package className="w-6 h-6" />
                  Open Pack
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  <Lock className="w-6 h-6" />
                  No Packs Left
                </>
              )}
            </div>
          </button>
        </motion.div>

        {/* Card Pool Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">Card Pool</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-700" />
              <span className="text-slate-400">Bronze:</span>
              <span className="text-white font-semibold">{PRESET_CARDS.filter(c => c.rarity === 'bronze').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-400" />
              <span className="text-slate-400">Silver:</span>
              <span className="text-white font-semibold">{PRESET_CARDS.filter(c => c.rarity === 'silver').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-slate-400">Gold:</span>
              <span className="text-white font-semibold">{PRESET_CARDS.filter(c => c.rarity === 'gold').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-slate-400">Legendary:</span>
              <span className="text-white font-semibold">{PRESET_CARDS.filter(c => c.rarity === 'legendary').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-500" />
              <span className="text-slate-400">Holo:</span>
              <span className="text-white font-semibold">{PRESET_CARDS.filter(c => c.rarity === 'holo').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400" />
              <span className="text-slate-400">Glitch:</span>
              <span className="text-white font-semibold">{PRESET_CARDS.filter(c => c.rarity === 'glitch').length}</span>
            </div>
          </div>
          <p className="text-slate-500 text-sm mt-4">
            Total: {PRESET_CARDS.length} unique cards • 2 cards per pack • Higher rarities = lower drop rates
          </p>
        </motion.div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/my-cards"
            className="px-6 py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-300 font-semibold transition-colors"
          >
            View Collection
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-300 font-semibold transition-colors"
          >
            Create Custom Card
          </Link>
        </div>
      </div>

      {/* Pack Opening Modal */}
      <AnimatePresence>
        {pulledCards && (
          <PackOpeningModal
            cards={pulledCards}
            onClose={() => setPulledCards(null)}
            onAddToCollection={handleAddToCollection}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
