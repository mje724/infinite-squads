'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Trophy, Zap, Users, ChevronRight, Home, RotateCcw, Crown, Skull, Star } from 'lucide-react';
import Link from 'next/link';
import { useCardCollection } from '@/store/store';
import { Card } from '@/types/schema';

// Scenario definitions with scoring systems
interface Scenario {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  slots: number;
  color: string;
  scoring: {
    categories: { name: string; icon: string }[];
    chemistryBonuses: { name: string; condition: string; bonus: number }[];
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: 'basketball',
    name: 'Starting 5',
    subtitle: 'Basketball lineup',
    icon: '🏀',
    slots: 5,
    color: 'from-orange-500 to-red-600',
    scoring: {
      categories: [
        { name: 'Points', icon: '🏀' },
        { name: 'Rebounds', icon: '📊' },
        { name: 'Assists', icon: '🤝' },
      ],
      chemistryBonuses: [
        { name: 'Dynasty', condition: '3+ Legendary/Holo cards', bonus: 15 },
        { name: 'Bench Mob', condition: '3+ Bronze cards', bonus: 10 },
        { name: 'Superteam', condition: 'All cards 80+ OVR', bonus: 20 },
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
    scoring: {
      categories: [
        { name: 'Goals', icon: '⚽' },
        { name: 'Possession', icon: '📈' },
        { name: 'Clean Sheets', icon: '🧤' },
      ],
      chemistryBonuses: [
        { name: 'Tiki-Taka', condition: '5+ Silver cards', bonus: 12 },
        { name: 'Park The Bus', condition: '4+ cards with low stats', bonus: 8 },
        { name: 'Galacticos', condition: '3+ Gold+ cards', bonus: 15 },
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
    scoring: {
      categories: [
        { name: 'Touchdowns', icon: '🏈' },
        { name: 'Yards', icon: '📏' },
        { name: 'Turnovers', icon: '🔄' },
      ],
      chemistryBonuses: [
        { name: 'Air Raid', condition: 'All cards 70+ OVR', bonus: 12 },
        { name: 'Ground Game', condition: '3+ Bronze cards', bonus: 10 },
        { name: 'Hail Mary', condition: '1+ Glitch card', bonus: 18 },
      ],
    },
  },
  {
    id: 'roadtrip',
    name: 'The Road Trip',
    subtitle: '4 friends, one car',
    icon: '🚗',
    slots: 4,
    color: 'from-cyan-500 to-blue-600',
    scoring: {
      categories: [
        { name: 'Aux Cord Control', icon: '🎵' },
        { name: '"Are We There Yet"', icon: '😤' },
        { name: 'Snack Rationing', icon: '🍿' },
      ],
      chemistryBonuses: [
        { name: 'Shotgun Called', condition: 'Highest OVR in front', bonus: 10 },
        { name: 'Carpool Karaoke', condition: '2+ cards same rarity', bonus: 12 },
        { name: 'Gas Money Secured', condition: 'All cards 60+ OVR', bonus: 8 },
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
    scoring: {
      categories: [
        { name: 'Venmo Speed', icon: '💸' },
        { name: '"I Had Salad"', icon: '🥗' },
        { name: 'Tip Math', icon: '🧮' },
      ],
      chemistryBonuses: [
        { name: 'Separate Checks', condition: '5 different rarities', bonus: 15 },
        { name: 'Big Spender', condition: '2+ Legendary cards', bonus: 12 },
        { name: 'Forgot Wallet', condition: '1+ card under 30 OVR', bonus: -10 },
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
    scoring: {
      categories: [
        { name: 'Remote Control', icon: '📺' },
        { name: 'Suggestions Ignored', icon: '🙄' },
        { name: 'Fell Asleep First', icon: '😴' },
      ],
      chemistryBonuses: [
        { name: 'Film Buff', condition: '3+ Gold cards', bonus: 12 },
        { name: 'Netflix Roulette', condition: '1+ Glitch card', bonus: 15 },
        { name: 'Talker', condition: 'Card with lowest stat < 20', bonus: -8 },
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
    scoring: {
      categories: [
        { name: 'Work Done', icon: '💻' },
        { name: '"Ill Do Slides"', icon: '📊' },
        { name: 'Night Before Panic', icon: '😰' },
      ],
      chemistryBonuses: [
        { name: 'Carried', condition: '1 card 90+ OVR', bonus: 15 },
        { name: 'Group Text Silence', condition: '2+ Bronze cards', bonus: -5 },
        { name: 'Actually Met', condition: 'All cards 70+ OVR', bonus: 20 },
      ],
    },
  },
  {
    id: 'wedding',
    name: 'Wedding Party',
    subtitle: '8 in the bridal party',
    icon: '💒',
    slots: 8,
    color: 'from-pink-400 to-rose-500',
    scoring: {
      categories: [
        { name: 'Speech Cringe', icon: '🎤' },
        { name: 'Open Bar Damage', icon: '🍾' },
        { name: 'Bouquet Caught', icon: '💐' },
      ],
      chemistryBonuses: [
        { name: 'Bridezilla', condition: 'Highest card 95+ OVR', bonus: 15 },
        { name: 'Plus Ones', condition: '4+ same rarity', bonus: 12 },
        { name: 'Objection!', condition: '1+ Glitch card', bonus: 20 },
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
    scoring: {
      categories: [
        { name: 'Days Survived', icon: '📅' },
        { name: '"Ill Check It"', icon: '💀' },
        { name: 'Cardio Score', icon: '🏃' },
      ],
      chemistryBonuses: [
        { name: 'Plot Armor', condition: '2+ Legendary cards', bonus: 20 },
        { name: 'First To Go', condition: 'Card under 30 OVR', bonus: -15 },
        { name: 'Final Girl', condition: 'Highest card is Holo', bonus: 18 },
      ],
    },
  },
];

// Computer team generator
function generateComputerTeam(slots: number, difficulty: 'easy' | 'medium' | 'hard'): ComputerCard[] {
  const difficultyRanges = {
    easy: { min: 30, max: 60 },
    medium: { min: 50, max: 80 },
    hard: { min: 70, max: 95 },
  };
  
  const range = difficultyRanges[difficulty];
  const rarities: Card['rarity'][] = ['bronze', 'silver', 'gold', 'legendary', 'holo', 'glitch'];
  
  const names = [
    'CPU Alpha', 'Bot Prime', 'AI Unit', 'Droid X', 'Mecha One',
    'Cyber Core', 'Logic Loop', 'Data Node', 'Bit Master', 'Code Runner',
    'Net Walker', 'Chip Stack'
  ];
  
  return Array.from({ length: slots }, (_, i) => {
    const ovr = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    const rarityIndex = difficulty === 'hard' 
      ? Math.floor(Math.random() * 4) + 2 
      : difficulty === 'medium'
        ? Math.floor(Math.random() * 4) + 1
        : Math.floor(Math.random() * 3);
    
    return {
      id: `cpu-${i}`,
      name: names[i % names.length],
      nickname: `Unit ${i + 1}`,
      overallRating: ovr,
      rarity: rarities[Math.min(rarityIndex, rarities.length - 1)],
      image: null,
    };
  });
}

interface ComputerCard {
  id: string;
  name: string;
  nickname: string;
  overallRating: number;
  rarity: Card['rarity'];
  image: string | null;
}

// Calculate chemistry bonus
function calculateChemistry(cards: (Card | ComputerCard)[], scenario: Scenario): { total: number; bonuses: string[] } {
  let total = 0;
  const bonuses: string[] = [];
  
  const rarities = cards.map(c => c.rarity);
  const ovrs = cards.map(c => c.overallRating);
  
  scenario.scoring.chemistryBonuses.forEach(bonus => {
    let applies = false;
    
    if (bonus.condition.includes('Legendary/Holo')) {
      const count = rarities.filter(r => r === 'legendary' || r === 'holo').length;
      applies = count >= 3;
    } else if (bonus.condition.includes('Legendary cards')) {
      const count = rarities.filter(r => r === 'legendary').length;
      applies = count >= 2;
    } else if (bonus.condition.includes('Bronze cards')) {
      const count = rarities.filter(r => r === 'bronze').length;
      applies = count >= 3;
    } else if (bonus.condition.includes('Silver cards')) {
      const count = rarities.filter(r => r === 'silver').length;
      applies = count >= 5;
    } else if (bonus.condition.includes('Gold+ cards') || bonus.condition.includes('Gold cards')) {
      const count = rarities.filter(r => r === 'gold' || r === 'legendary' || r === 'holo' || r === 'glitch').length;
      applies = count >= 3;
    } else if (bonus.condition.includes('Glitch card')) {
      applies = rarities.includes('glitch');
    } else if (bonus.condition.includes('All cards 80+ OVR')) {
      applies = ovrs.every(o => o >= 80);
    } else if (bonus.condition.includes('All cards 70+ OVR')) {
      applies = ovrs.every(o => o >= 70);
    } else if (bonus.condition.includes('All cards 60+ OVR')) {
      applies = ovrs.every(o => o >= 60);
    } else if (bonus.condition.includes('different rarities')) {
      applies = new Set(rarities).size >= 5;
    } else if (bonus.condition.includes('same rarity')) {
      const rarityCounts = rarities.reduce((acc, r) => {
        acc[r] = (acc[r] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      const maxCount = Math.max(...Object.values(rarityCounts));
      applies = maxCount >= (bonus.condition.includes('4+') ? 4 : 2);
    } else if (bonus.condition.includes('1 card 90+ OVR') || bonus.condition.includes('Highest card 95+ OVR')) {
      const threshold = bonus.condition.includes('95') ? 95 : 90;
      applies = ovrs.some(o => o >= threshold);
    } else if (bonus.condition.includes('under 30 OVR') || bonus.condition.includes('Card under 30')) {
      applies = ovrs.some(o => o < 30);
    } else if (bonus.condition.includes('lowest stat < 20')) {
      applies = ovrs.some(o => o < 20);
    } else if (bonus.condition.includes('Highest card is Holo')) {
      const maxOvr = Math.max(...ovrs);
      const maxIndex = ovrs.indexOf(maxOvr);
      applies = rarities[maxIndex] === 'holo';
    } else if (bonus.condition.includes('Highest OVR in front')) {
      applies = ovrs[0] === Math.max(...ovrs);
    }
    
    if (applies) {
      total += bonus.bonus;
      bonuses.push(`${bonus.name} (${bonus.bonus > 0 ? '+' : ''}${bonus.bonus})`);
    }
  });
  
  return { total, bonuses };
}

// Battle simulation
interface BattleResult {
  playerScore: number;
  computerScore: number;
  playerBreakdown: { category: string; score: number }[];
  computerBreakdown: { category: string; score: number }[];
  playerChemistry: { total: number; bonuses: string[] };
  computerChemistry: { total: number; bonuses: string[] };
  winner: 'player' | 'computer' | 'tie';
  mvp: Card | ComputerCard;
}

function simulateBattle(
  playerCards: Card[],
  computerCards: ComputerCard[],
  scenario: Scenario
): BattleResult {
  const playerOvrTotal = playerCards.reduce((sum, c) => sum + c.overallRating, 0);
  const computerOvrTotal = computerCards.reduce((sum, c) => sum + c.overallRating, 0);
  
  const playerChemistry = calculateChemistry(playerCards, scenario);
  const computerChemistry = calculateChemistry(computerCards, scenario);
  
  // Calculate scores for each category with randomness
  const playerBreakdown = scenario.scoring.categories.map(cat => {
    const base = playerOvrTotal / playerCards.length;
    const random = (Math.random() - 0.5) * 20; // ±10 variance
    return { category: cat.name, score: Math.round(base + random) };
  });
  
  const computerBreakdown = scenario.scoring.categories.map(cat => {
    const base = computerOvrTotal / computerCards.length;
    const random = (Math.random() - 0.5) * 20;
    return { category: cat.name, score: Math.round(base + random) };
  });
  
  const playerScore = playerBreakdown.reduce((sum, b) => sum + b.score, 0) + playerChemistry.total;
  const computerScore = computerBreakdown.reduce((sum, b) => sum + b.score, 0) + computerChemistry.total;
  
  // Determine MVP (highest individual contribution)
  const allCards = [...playerCards, ...computerCards];
  const mvp = allCards.reduce((best, card) => 
    card.overallRating > best.overallRating ? card : best
  );
  
  return {
    playerScore,
    computerScore,
    playerBreakdown,
    computerBreakdown,
    playerChemistry,
    computerChemistry,
    winner: playerScore > computerScore ? 'player' : playerScore < computerScore ? 'computer' : 'tie',
    mvp,
  };
}

// Get pack cards only (cards with fromPack flag or specific properties from pack opening)
function getPackCards(cards: Card[]): Card[] {
  // Pack cards have mode: 'unserious' and specific stat patterns from preset cards
  // For now, filter by mode since pack cards are added with mode: 'unserious'
  return cards.filter(card => card.mode === 'unserious');
}

export default function BattlePage() {
  const { cards } = useCardCollection();
  const packCards = getPackCards(cards);
  
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [computerTeam, setComputerTeam] = useState<ComputerCard[]>([]);
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [battlePhase, setBattlePhase] = useState<'select' | 'lineup' | 'battle' | 'result'>('select');
  const [isAnimating, setIsAnimating] = useState(false);

  const startBattle = () => {
    if (!selectedScenario || selectedCards.length !== selectedScenario.slots) return;
    
    const cpuTeam = generateComputerTeam(selectedScenario.slots, difficulty);
    setComputerTeam(cpuTeam);
    setBattlePhase('battle');
    setIsAnimating(true);
    
    // Simulate battle after animation
    setTimeout(() => {
      const result = simulateBattle(selectedCards, cpuTeam, selectedScenario);
      setBattleResult(result);
      setIsAnimating(false);
      setBattlePhase('result');
    }, 3000);
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
    setComputerTeam([]);
    setBattleResult(null);
    setBattlePhase('select');
  };

  const getRarityColor = (rarity: string) => {
    const colors: Record<string, string> = {
      bronze: '#CD7F32',
      silver: '#C0C0C0',
      gold: '#FFD700',
      legendary: '#FF4500',
      holo: '#FF00FF',
      glitch: '#00FFFF',
    };
    return colors[rarity] || '#CD7F32';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950/20 to-slate-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-3">
            <Swords className="w-10 h-10 text-red-400" />
            Battle Arena
          </h1>
          <p className="text-slate-400">Build your squad. Face the computer. Claim victory.</p>
        </div>

        {/* Phase: Select Scenario */}
        {battlePhase === 'select' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Scenario Selection */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Choose Scenario</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {SCENARIOS.map(scenario => (
                  <motion.button
                    key={scenario.id}
                    onClick={() => {
                      setSelectedScenario(scenario);
                      setSelectedCards([]);
                      setBattlePhase('lineup');
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedScenario?.id === scenario.id
                        ? 'border-white bg-white/10'
                        : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-3xl mb-2">{scenario.icon}</div>
                    <div className="font-bold text-white text-sm">{scenario.name}</div>
                    <div className="text-slate-400 text-xs">{scenario.subtitle}</div>
                    <div className="text-slate-500 text-xs mt-1">{scenario.slots} cards</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Need Cards Message */}
            {packCards.length === 0 && (
              <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-700">
                <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Pack Cards Yet!</h3>
                <p className="text-slate-400 mb-4">Open some packs to get cards for battle</p>
                <Link
                  href="/packs"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold"
                >
                  <Package className="w-5 h-5" />
                  Open Packs
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {/* Phase: Build Lineup */}
        {battlePhase === 'lineup' && selectedScenario && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Scenario Header */}
            <div className={`p-6 rounded-xl bg-gradient-to-r ${selectedScenario.color} flex items-center justify-between`}>
              <div className="flex items-center gap-4">
                <span className="text-4xl">{selectedScenario.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedScenario.name}</h2>
                  <p className="text-white/80">{selectedScenario.subtitle}</p>
                </div>
              </div>
              <button
                onClick={resetBattle}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                <RotateCcw className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Difficulty Selection */}
            <div className="flex items-center gap-4 justify-center">
              <span className="text-slate-400">Difficulty:</span>
              {(['easy', 'medium', 'hard'] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
                    difficulty === d
                      ? d === 'easy' ? 'bg-green-500 text-white' 
                        : d === 'medium' ? 'bg-yellow-500 text-black'
                        : 'bg-red-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Selected Cards */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                Your Lineup ({selectedCards.length}/{selectedScenario.slots})
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {Array.from({ length: selectedScenario.slots }).map((_, i) => {
                  const card = selectedCards[i];
                  return (
                    <div
                      key={i}
                      className={`flex-shrink-0 w-24 h-32 rounded-xl border-2 border-dashed flex items-center justify-center ${
                        card 
                          ? 'border-transparent' 
                          : 'border-slate-600 bg-slate-800/30'
                      }`}
                    >
                      {card ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="relative w-full h-full rounded-xl overflow-hidden cursor-pointer"
                          onClick={() => toggleCardSelection(card)}
                          style={{ 
                            border: `2px solid ${getRarityColor(card.rarity)}`,
                            boxShadow: `0 0 15px ${getRarityColor(card.rarity)}50`
                          }}
                        >
                          {card.image ? (
                            <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-slate-700 flex items-center justify-center text-2xl">
                              {card.name[0]}
                            </div>
                          )}
                          <div className="absolute bottom-0 inset-x-0 bg-black/70 p-1">
                            <div className="text-white text-xs font-bold truncate">{card.name}</div>
                            <div className="text-slate-300 text-xs">{card.overallRating} OVR</div>
                          </div>
                        </motion.div>
                      ) : (
                        <span className="text-slate-500 text-sm">Slot {i + 1}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Available Cards */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Your Pack Cards</h3>
              {packCards.length === 0 ? (
                <div className="text-center py-8 bg-slate-800/30 rounded-xl">
                  <p className="text-slate-400 mb-4">No pack cards yet!</p>
                  <Link href="/packs" className="text-purple-400 hover:text-purple-300">
                    Open some packs →
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
                  {packCards.map(card => {
                    const isSelected = selectedCards.find(c => c.id === card.id);
                    return (
                      <motion.button
                        key={card.id}
                        onClick={() => toggleCardSelection(card)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!isSelected && selectedCards.length >= selectedScenario.slots}
                        className={`relative rounded-xl overflow-hidden aspect-[3/4] transition-all ${
                          isSelected 
                            ? 'ring-2 ring-green-400 ring-offset-2 ring-offset-slate-900' 
                            : selectedCards.length >= selectedScenario.slots
                              ? 'opacity-40 cursor-not-allowed'
                              : 'hover:ring-2 hover:ring-slate-500'
                        }`}
                        style={{ 
                          border: `2px solid ${getRarityColor(card.rarity)}`,
                        }}
                      >
                        {card.image ? (
                          <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-slate-700 flex items-center justify-center text-xl font-bold">
                            {card.name[0]}
                          </div>
                        )}
                        <div className="absolute bottom-0 inset-x-0 bg-black/80 p-1.5">
                          <div className="text-white text-xs font-bold truncate">{card.name}</div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300 text-xs">{card.overallRating}</span>
                            <span 
                              className="text-xs font-bold uppercase"
                              style={{ color: getRarityColor(card.rarity) }}
                            >
                              {card.rarity.slice(0, 3)}
                            </span>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Start Battle Button */}
            <div className="flex justify-center pt-4">
              <motion.button
                onClick={startBattle}
                disabled={selectedCards.length !== selectedScenario.slots}
                whileHover={selectedCards.length === selectedScenario.slots ? { scale: 1.05 } : {}}
                whileTap={selectedCards.length === selectedScenario.slots ? { scale: 0.95 } : {}}
                className={`px-8 py-4 rounded-xl font-bold text-xl flex items-center gap-3 ${
                  selectedCards.length === selectedScenario.slots
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Swords className="w-6 h-6" />
                Start Battle
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Phase: Battle Animation */}
        {battlePhase === 'battle' && selectedScenario && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[60vh] space-y-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-8xl"
            >
              {selectedScenario.icon}
            </motion.div>
            <h2 className="text-3xl font-bold text-white">Battle in Progress...</h2>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-lg text-slate-400">Your Team</div>
                <div className="text-4xl font-bold text-cyan-400">{selectedCards.length}</div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              >
                <Zap className="w-12 h-12 text-yellow-400" />
              </motion.div>
              <div className="text-center">
                <div className="text-lg text-slate-400">CPU Team</div>
                <div className="text-4xl font-bold text-red-400">{computerTeam.length}</div>
              </div>
            </div>
            <motion.div
              className="h-2 w-64 bg-slate-700 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3 }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Phase: Results */}
        {battlePhase === 'result' && battleResult && selectedScenario && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Winner Banner */}
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              className={`p-8 rounded-2xl text-center ${
                battleResult.winner === 'player'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                  : battleResult.winner === 'computer'
                    ? 'bg-gradient-to-r from-red-500 to-rose-600'
                    : 'bg-gradient-to-r from-yellow-500 to-amber-600'
              }`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                {battleResult.winner === 'player' ? (
                  <Trophy className="w-20 h-20 text-white mx-auto mb-4" />
                ) : battleResult.winner === 'computer' ? (
                  <Skull className="w-20 h-20 text-white mx-auto mb-4" />
                ) : (
                  <Star className="w-20 h-20 text-white mx-auto mb-4" />
                )}
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-2">
                {battleResult.winner === 'player' ? 'VICTORY!' 
                  : battleResult.winner === 'computer' ? 'DEFEAT' 
                  : 'TIE GAME'}
              </h2>
              <p className="text-white/80 text-xl">
                {battleResult.playerScore} - {battleResult.computerScore}
              </p>
            </motion.div>

            {/* Score Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Player Breakdown */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-cyan-500/30">
                <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Your Team
                </h3>
                <div className="space-y-3">
                  {battleResult.playerBreakdown.map((cat, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-slate-300">
                        {selectedScenario.scoring.categories[i]?.icon} {cat.category}
                      </span>
                      <span className="text-white font-bold">{cat.score}</span>
                    </div>
                  ))}
                  {battleResult.playerChemistry.bonuses.length > 0 && (
                    <div className="pt-3 border-t border-slate-700">
                      <div className="text-sm text-slate-400 mb-2">Chemistry Bonuses:</div>
                      {battleResult.playerChemistry.bonuses.map((bonus, i) => (
                        <div key={i} className="text-green-400 text-sm">{bonus}</div>
                      ))}
                    </div>
                  )}
                  <div className="pt-3 border-t border-slate-700 flex justify-between">
                    <span className="text-slate-300 font-semibold">Total</span>
                    <span className="text-cyan-400 font-bold text-xl">{battleResult.playerScore}</span>
                  </div>
                </div>
              </div>

              {/* Computer Breakdown */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-red-500/30">
                <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  CPU Team ({difficulty})
                </h3>
                <div className="space-y-3">
                  {battleResult.computerBreakdown.map((cat, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-slate-300">
                        {selectedScenario.scoring.categories[i]?.icon} {cat.category}
                      </span>
                      <span className="text-white font-bold">{cat.score}</span>
                    </div>
                  ))}
                  {battleResult.computerChemistry.bonuses.length > 0 && (
                    <div className="pt-3 border-t border-slate-700">
                      <div className="text-sm text-slate-400 mb-2">Chemistry Bonuses:</div>
                      {battleResult.computerChemistry.bonuses.map((bonus, i) => (
                        <div key={i} className="text-green-400 text-sm">{bonus}</div>
                      ))}
                    </div>
                  )}
                  <div className="pt-3 border-t border-slate-700 flex justify-between">
                    <span className="text-slate-300 font-semibold">Total</span>
                    <span className="text-red-400 font-bold text-xl">{battleResult.computerScore}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MVP */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-500/30 text-center">
              <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
              <div className="text-slate-400 mb-1">Match MVP</div>
              <div className="text-2xl font-bold text-white">{battleResult.mvp.name}</div>
              <div className="text-yellow-400">{battleResult.mvp.overallRating} OVR</div>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <motion.button
                onClick={resetBattle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-semibold flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                New Battle
              </motion.button>
              <Link
                href="/packs"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold flex items-center gap-2"
              >
                <Package className="w-5 h-5" />
                Open More Packs
              </Link>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="mt-12 flex justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white font-medium transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link
            href="/my-cards"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white font-medium transition-all"
          >
            My Collection
          </Link>
        </div>
      </div>
    </div>
  );
}

// Missing import
import { Package, Check } from 'lucide-react';
