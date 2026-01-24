'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Trophy, Zap, Users, ChevronRight, Home, RotateCcw, Crown, Skull, Star, Package, Check, User } from 'lucide-react';
import Link from 'next/link';
import { useCardCollection } from '@/store/store';
import { Card } from '@/types/schema';

// Scenario definitions
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
  // SPORTS - Real scoring with box scores
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
        { name: 'PTS', icon: '🏀', unit: '' },
        { name: 'REB', icon: '📊', unit: '' },
        { name: 'AST', icon: '🤝', unit: '' },
      ],
      chemistryBonuses: [
        { name: 'Superteam', condition: '3+ Gold or better', bonus: 12 },
        { name: 'Bench Mob Energy', condition: 'All Bronze/Silver', bonus: 8 },
        { name: 'Unicorn', condition: '1 Glitch card', bonus: 15 },
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
        { name: 'Goals', icon: '⚽', unit: '' },
        { name: 'Assists', icon: '👟', unit: '' },
        { name: 'Saves', icon: '🧤', unit: '' },
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
        { name: 'TD', icon: '🏈', unit: '' },
        { name: 'YDS', icon: '📏', unit: '' },
        { name: 'INT', icon: '🔄', unit: '', lowIsBetter: true },
      ],
      chemistryBonuses: [
        { name: 'Air Raid', condition: 'Highest card 90+', bonus: 12 },
        { name: 'Ground & Pound', condition: '4+ Bronze', bonus: 8 },
        { name: 'Hail Mary', condition: '1 Glitch card', bonus: 18 },
      ],
    },
  },
  // SATIRICAL - Actually funny
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
        { name: 'Aux Mins', icon: '🎵', unit: 'min' },
        { name: 'Pee Breaks', icon: '🚽', unit: '', lowIsBetter: true },
        { name: '"Shortcut" Miles Added', icon: '🗺️', unit: 'mi', lowIsBetter: true },
      ],
      chemistryBonuses: [
        { name: 'Shotgun Forever', condition: 'Highest OVR card', bonus: 10 },
        { name: 'Carpool Karaoke', condition: '2+ same rarity', bonus: 8 },
        { name: 'Are We There Yet', condition: 'Card under 40 OVR', bonus: -5 },
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
        { name: 'Seconds to Venmo', icon: '💸', unit: 's', lowIsBetter: true },
        { name: '"I Only Had Salad" Claims', icon: '🥗', unit: '', lowIsBetter: true },
        { name: 'Tip % Calculated', icon: '🧮', unit: '%' },
      ],
      chemistryBonuses: [
        { name: 'Separate Checks Energy', condition: '5 different rarities', bonus: 12 },
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
        { name: 'Phone Pickups', icon: '📱', unit: '', lowIsBetter: true },
        { name: '"What Happened?" Asks', icon: '❓', unit: '', lowIsBetter: true },
        { name: 'Mins Before Sleep', icon: '😴', unit: 'min' },
      ],
      chemistryBonuses: [
        { name: 'Film Bro', condition: '3+ Gold cards', bonus: 10 },
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
        { name: 'Slides Made', icon: '📊', unit: '' },
        { name: '"Sorry Busy" Texts', icon: '💬', unit: '', lowIsBetter: true },
        { name: '3AM Commits', icon: '💻', unit: '' },
      ],
      chemistryBonuses: [
        { name: 'Hard Carry', condition: '1 card 90+ OVR', bonus: 15 },
        { name: 'Group Chat Silence', condition: '2+ under 50 OVR', bonus: -10 },
        { name: 'Actually Met IRL', condition: 'All 65+ OVR', bonus: 12 },
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
    isSport: false,
    scoring: {
      categories: [
        { name: 'Pre-Speech Drinks', icon: '🥂', unit: '' },
        { name: 'Embarrassing Stories', icon: '😬', unit: '', lowIsBetter: true },
        { name: 'Dance Floor Minutes', icon: '💃', unit: 'min' },
      ],
      chemistryBonuses: [
        { name: 'Open Bar Damage', condition: '3+ Bronze', bonus: 8 },
        { name: 'Bridezilla Handler', condition: 'Highest 95+ OVR', bonus: 12 },
        { name: 'OBJECTION!', condition: '1 Glitch card', bonus: 20 },
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
        { name: 'Days Survived', icon: '📅', unit: '' },
        { name: '"Ill Check It" Deaths', icon: '💀', unit: '', lowIsBetter: true },
        { name: 'Supplies Found', icon: '🎒', unit: '' },
      ],
      chemistryBonuses: [
        { name: 'Plot Armor', condition: '2+ Legendary', bonus: 18 },
        { name: 'First to Go', condition: 'Card under 30 OVR', bonus: -12 },
        { name: 'Final Girl Energy', condition: 'Highest is Holo', bonus: 15 },
      ],
    },
  },
];

// CPU Names based on difficulty
const CPU_NAMES = {
  easy: ['Rookie Bot', 'Noob-3000', 'EZ Mode', 'Tutorial Ted', 'Pushover Pete', 'Casual Carl', 'Beginner Bob', 'Simple Simon', 'Mild Mike', 'Soft Sally', 'Baby Bot', 'Training Wheels'],
  medium: ['Average Andy', 'Mid-Tier Mike', 'Balanced Bot', 'Normal Nancy', 'Standard Steve', 'Regular Rick', 'Median Mary', 'Typical Tom', 'Common Chris', 'Basic Betty', 'Par Pete', 'Mean Machine'],
  hard: ['Tryhard-9000', 'Sweat Lord', 'No Mercy', 'Git Gud Bot', 'Nightmare Nick', 'Brutal Betty', 'Savage Steve', 'Ruthless Rick', 'Destroyer Dan', 'Pain Train', 'Elo Hell', 'Touch Grass Never'],
};

interface ComputerCard {
  id: string;
  name: string;
  nickname: string;
  overallRating: number;
  rarity: Card['rarity'];
  image: string;
}

// Generate computer team with themed names
function generateComputerTeam(slots: number, difficulty: 'easy' | 'medium' | 'hard'): ComputerCard[] {
  const ranges = {
    easy: { min: 25, max: 55, rarities: ['bronze', 'bronze', 'bronze', 'silver'] },
    medium: { min: 45, max: 75, rarities: ['bronze', 'silver', 'silver', 'gold'] },
    hard: { min: 65, max: 95, rarities: ['silver', 'gold', 'gold', 'legendary', 'holo'] },
  };
  
  const config = ranges[difficulty];
  const names = CPU_NAMES[difficulty];
  
  return Array.from({ length: slots }, (_, i) => {
    const ovr = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
    const rarity = config.rarities[Math.floor(Math.random() * config.rarities.length)] as Card['rarity'];
    
    return {
      id: `cpu-${i}`,
      name: names[i % names.length],
      nickname: difficulty === 'hard' ? '💀' : difficulty === 'medium' ? '🤖' : '😊',
      overallRating: ovr,
      rarity,
      image: `https://api.dicebear.com/7.x/bottts/svg?seed=${names[i % names.length]}-${i}&backgroundColor=1e293b`,
    };
  });
}

// Calculate individual player stats for box score
interface PlayerBoxScore {
  card: Card | ComputerCard;
  stats: { category: string; value: number }[];
}

function generateBoxScore(
  cards: (Card | ComputerCard)[],
  categories: ScoreCategory[],
  isSport: boolean
): PlayerBoxScore[] {
  return cards.map(card => {
    const baseMultiplier = card.overallRating / 100;
    
    const stats = categories.map(cat => {
      let value: number;
      
      if (isSport) {
        // Sports: realistic ranges
        if (cat.name === 'PTS') value = Math.round((Math.random() * 20 + 5) * baseMultiplier);
        else if (cat.name === 'REB') value = Math.round((Math.random() * 10 + 2) * baseMultiplier);
        else if (cat.name === 'AST') value = Math.round((Math.random() * 8 + 1) * baseMultiplier);
        else if (cat.name === 'Goals') value = Math.random() < baseMultiplier * 0.3 ? Math.ceil(Math.random() * 2) : 0;
        else if (cat.name === 'Assists') value = Math.random() < baseMultiplier * 0.4 ? Math.ceil(Math.random() * 2) : 0;
        else if (cat.name === 'Saves') value = Math.round((Math.random() * 5) * baseMultiplier);
        else if (cat.name === 'TD') value = Math.random() < baseMultiplier * 0.4 ? Math.ceil(Math.random() * 2) : 0;
        else if (cat.name === 'YDS') value = Math.round((Math.random() * 100 + 20) * baseMultiplier);
        else if (cat.name === 'INT') value = Math.random() < (1 - baseMultiplier) * 0.3 ? 1 : 0;
        else value = Math.round(Math.random() * 10 * baseMultiplier);
      } else {
        // Satirical: funny ranges
        if (cat.name === 'Aux Mins') value = Math.round((Math.random() * 60 + 10) * baseMultiplier);
        else if (cat.name === 'Pee Breaks') value = Math.round((Math.random() * 5) * (1 - baseMultiplier * 0.5));
        else if (cat.name.includes('Shortcut')) value = Math.round((Math.random() * 30) * (1 - baseMultiplier * 0.7));
        else if (cat.name === 'Seconds to Venmo') value = Math.round((Math.random() * 300 + 10) * (1 - baseMultiplier * 0.8));
        else if (cat.name.includes('Salad')) value = Math.random() < (1 - baseMultiplier) * 0.5 ? 1 : 0;
        else if (cat.name === 'Tip % Calculated') value = Math.round(15 + (Math.random() * 10) * baseMultiplier);
        else if (cat.name === 'Phone Pickups') value = Math.round((Math.random() * 20) * (1 - baseMultiplier * 0.6));
        else if (cat.name.includes('What Happened')) value = Math.round((Math.random() * 10) * (1 - baseMultiplier * 0.7));
        else if (cat.name.includes('Before Sleep')) value = Math.round((60 + Math.random() * 60) * baseMultiplier);
        else if (cat.name === 'Slides Made') value = Math.round((Math.random() * 15 + 2) * baseMultiplier);
        else if (cat.name.includes('Sorry Busy')) value = Math.round((Math.random() * 10) * (1 - baseMultiplier * 0.6));
        else if (cat.name === '3AM Commits') value = Math.round((Math.random() * 20) * baseMultiplier);
        else if (cat.name.includes('Pre-Speech')) value = Math.round((Math.random() * 6 + 1) * (1.2 - baseMultiplier * 0.5));
        else if (cat.name.includes('Embarrassing')) value = Math.round((Math.random() * 5) * (1 - baseMultiplier * 0.6));
        else if (cat.name.includes('Dance Floor')) value = Math.round((Math.random() * 60 + 10) * baseMultiplier);
        else if (cat.name === 'Days Survived') value = Math.round((Math.random() * 30 + 5) * baseMultiplier);
        else if (cat.name.includes('Check It')) value = Math.random() < (1 - baseMultiplier) * 0.4 ? 1 : 0;
        else if (cat.name === 'Supplies Found') value = Math.round((Math.random() * 20 + 5) * baseMultiplier);
        else value = Math.round(Math.random() * 10 * baseMultiplier);
      }
      
      return { category: cat.name, value };
    });
    
    return { card, stats };
  });
}

// Calculate team totals from box scores
function calculateTeamTotal(boxScores: PlayerBoxScore[], categories: ScoreCategory[]): number {
  let total = 0;
  
  categories.forEach((cat, catIndex) => {
    const catTotal = boxScores.reduce((sum, ps) => sum + ps.stats[catIndex].value, 0);
    // For lowIsBetter categories, invert the contribution
    if (cat.lowIsBetter) {
      total += Math.max(0, 100 - catTotal * 5); // Penalty for bad stats
    } else {
      total += catTotal;
    }
  });
  
  return total;
}

// Calculate chemistry
function calculateChemistry(cards: (Card | ComputerCard)[], bonuses: ChemistryBonus[]): { total: number; active: string[] } {
  const rarities = cards.map(c => c.rarity);
  const ovrs = cards.map(c => c.overallRating);
  let total = 0;
  const active: string[] = [];
  
  bonuses.forEach(bonus => {
    let applies = false;
    
    if (bonus.condition.includes('Gold or better') || bonus.condition.includes('Legendary/Holo')) {
      const count = rarities.filter(r => ['gold', 'legendary', 'holo', 'glitch'].includes(r)).length;
      applies = count >= 3;
    } else if (bonus.condition.includes('Legendary')) {
      applies = rarities.filter(r => r === 'legendary').length >= 2;
    } else if (bonus.condition.includes('Bronze/Silver') || bonus.condition.includes('All Bronze')) {
      applies = rarities.every(r => r === 'bronze' || r === 'silver');
    } else if (bonus.condition.includes('Bronze')) {
      applies = rarities.filter(r => r === 'bronze').length >= (bonus.condition.includes('4+') ? 4 : 3);
    } else if (bonus.condition.includes('same rarity')) {
      const counts = rarities.reduce((acc, r) => ({ ...acc, [r]: (acc[r] || 0) + 1 }), {} as Record<string, number>);
      applies = Math.max(...Object.values(counts)) >= (bonus.condition.includes('5+') ? 5 : 2);
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
    } else if (bonus.condition.includes('Highest OVR')) {
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

interface BattleResult {
  playerBoxScores: PlayerBoxScore[];
  computerBoxScores: PlayerBoxScore[];
  playerTotal: number;
  computerTotal: number;
  playerChemistry: { total: number; active: string[] };
  computerChemistry: { total: number; active: string[] };
  playerFinal: number;
  computerFinal: number;
  winner: 'player' | 'computer' | 'tie';
  mvp: { card: Card | ComputerCard; highlight: string };
}

// Get pack cards only
function getPackCards(cards: Card[]): Card[] {
  return cards.filter(card => card.mode === 'unserious');
}

// Rarity color helper
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

export default function BattlePage() {
  const { cards } = useCardCollection();
  const packCards = getPackCards(cards);
  
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [computerTeam, setComputerTeam] = useState<ComputerCard[]>([]);
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [battlePhase, setBattlePhase] = useState<'select' | 'lineup' | 'preview' | 'battle' | 'result'>('select');

  const proceedToPreview = () => {
    if (!selectedScenario || selectedCards.length !== selectedScenario.slots) return;
    const cpuTeam = generateComputerTeam(selectedScenario.slots, difficulty);
    setComputerTeam(cpuTeam);
    setBattlePhase('preview');
  };

  const startBattle = () => {
    if (!selectedScenario) return;
    setBattlePhase('battle');
    
    setTimeout(() => {
      // Generate box scores
      const playerBoxScores = generateBoxScore(selectedCards, selectedScenario.scoring.categories, selectedScenario.isSport);
      const computerBoxScores = generateBoxScore(computerTeam, selectedScenario.scoring.categories, selectedScenario.isSport);
      
      // Calculate totals
      const playerTotal = calculateTeamTotal(playerBoxScores, selectedScenario.scoring.categories);
      const computerTotal = calculateTeamTotal(computerBoxScores, selectedScenario.scoring.categories);
      
      // Chemistry
      const playerChemistry = calculateChemistry(selectedCards, selectedScenario.scoring.chemistryBonuses);
      const computerChemistry = calculateChemistry(computerTeam, selectedScenario.scoring.chemistryBonuses);
      
      const playerFinal = playerTotal + playerChemistry.total;
      const computerFinal = computerTotal + computerChemistry.total;
      
      // MVP - highest individual contribution
      const allBoxScores = [...playerBoxScores, ...computerBoxScores];
      const mvpScore = allBoxScores.reduce((best, ps) => {
        const total = ps.stats.reduce((sum, s) => sum + s.value, 0);
        return total > best.total ? { total, ps } : best;
      }, { total: 0, ps: allBoxScores[0] });
      
      const mvpHighlight = mvpScore.ps.stats
        .sort((a, b) => b.value - a.value)[0];
      
      setBattleResult({
        playerBoxScores,
        computerBoxScores,
        playerTotal,
        computerTotal,
        playerChemistry,
        computerChemistry,
        playerFinal,
        computerFinal,
        winner: playerFinal > computerFinal ? 'player' : playerFinal < computerFinal ? 'computer' : 'tie',
        mvp: { 
          card: mvpScore.ps.card, 
          highlight: `${mvpHighlight.value} ${mvpHighlight.category}` 
        },
      });
      setBattlePhase('result');
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
    setComputerTeam([]);
    setBattleResult(null);
    setBattlePhase('select');
  };

  // Card display component
  const MiniCard = ({ card, showStats = false }: { card: Card | ComputerCard; showStats?: boolean }) => (
    <div 
      className="relative rounded-lg overflow-hidden bg-slate-800"
      style={{ border: `2px solid ${getRarityColor(card.rarity)}` }}
    >
      <div className="aspect-square overflow-hidden">
        {card.image ? (
          <img 
            src={card.image} 
            alt={card.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${card.name}&backgroundColor=1e293b`;
            }}
          />
        ) : (
          <div className="w-full h-full bg-slate-700 flex items-center justify-center">
            <User className="w-8 h-8 text-slate-500" />
          </div>
        )}
      </div>
      <div className="p-2 bg-slate-900">
        <div className="text-white text-xs font-bold truncate">{card.name}</div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-xs">{card.overallRating} OVR</span>
          <span 
            className="text-xs font-bold uppercase"
            style={{ color: getRarityColor(card.rarity) }}
          >
            {card.rarity.slice(0, 3)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950/20 to-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-3">
            <Swords className="w-10 h-10 text-red-400" />
            Battle Arena
          </h1>
          <p className="text-slate-400">Build your squad. Face the CPU. Claim victory.</p>
        </div>

        {/* PHASE: Select Scenario */}
        {battlePhase === 'select' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <h2 className="text-xl font-bold text-white mb-4">Choose Scenario</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {SCENARIOS.map(scenario => (
                <motion.button
                  key={scenario.id}
                  onClick={() => { setSelectedScenario(scenario); setSelectedCards([]); setBattlePhase('lineup'); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-xl border-2 border-slate-700 bg-slate-800/50 hover:border-slate-500 transition-all text-left"
                >
                  <div className="text-3xl mb-2">{scenario.icon}</div>
                  <div className="font-bold text-white text-sm">{scenario.name}</div>
                  <div className="text-slate-400 text-xs">{scenario.subtitle}</div>
                  <div className="text-slate-500 text-xs mt-1">{scenario.slots} cards</div>
                </motion.button>
              ))}
            </div>
            
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

        {/* PHASE: Build Lineup */}
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

            {/* Difficulty */}
            <div className="flex items-center gap-4 justify-center">
              <span className="text-slate-400">Difficulty:</span>
              {(['easy', 'medium', 'hard'] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
                    difficulty === d
                      ? d === 'easy' ? 'bg-green-500 text-white' : d === 'medium' ? 'bg-yellow-500 text-black' : 'bg-red-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Selected Cards */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Your Lineup ({selectedCards.length}/{selectedScenario.slots})</h3>
              <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-11 gap-2">
                {Array.from({ length: selectedScenario.slots }).map((_, i) => {
                  const card = selectedCards[i];
                  return (
                    <div key={i} className={`aspect-[3/4] rounded-lg ${card ? '' : 'border-2 border-dashed border-slate-600 bg-slate-800/30'} flex items-center justify-center`}>
                      {card ? (
                        <div className="w-full h-full cursor-pointer" onClick={() => toggleCardSelection(card)}>
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

            {/* Available Cards */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Your Pack Cards ({packCards.length} available)</h3>
              {packCards.length === 0 ? (
                <div className="text-center py-8 bg-slate-800/30 rounded-xl">
                  <p className="text-slate-400 mb-4">No pack cards yet!</p>
                  <Link href="/packs" className="text-purple-400 hover:text-purple-300">Open some packs →</Link>
                </div>
              ) : (
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {packCards.map(card => {
                    const isSelected = selectedCards.find(c => c.id === card.id);
                    const isDisabled = !isSelected && selectedCards.length >= selectedScenario.slots;
                    return (
                      <motion.button
                        key={card.id}
                        onClick={() => toggleCardSelection(card)}
                        disabled={isDisabled}
                        whileHover={{ scale: isDisabled ? 1 : 1.05 }}
                        className={`relative ${isSelected ? 'ring-2 ring-green-400 ring-offset-2 ring-offset-slate-900' : ''} ${isDisabled ? 'opacity-40' : ''}`}
                      >
                        <MiniCard card={card} />
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Continue Button */}
            <div className="flex justify-center pt-4">
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
                <ChevronRight className="w-6 h-6" />
                See Opponent
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* PHASE: Preview (See Teams) */}
        {battlePhase === 'preview' && selectedScenario && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Your Team */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-cyan-500/30">
                <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" /> Your Squad
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {selectedCards.map(card => (
                    <MiniCard key={card.id} card={card} />
                  ))}
                </div>
                <div className="mt-4 text-slate-400 text-sm">
                  Avg OVR: {Math.round(selectedCards.reduce((s, c) => s + c.overallRating, 0) / selectedCards.length)}
                </div>
              </div>

              {/* CPU Team */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-red-500/30">
                <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" /> CPU Squad ({difficulty})
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {computerTeam.map(card => (
                    <MiniCard key={card.id} card={card} />
                  ))}
                </div>
                <div className="mt-4 text-slate-400 text-sm">
                  Avg OVR: {Math.round(computerTeam.reduce((s, c) => s + c.overallRating, 0) / computerTeam.length)}
                </div>
              </div>
            </div>

            {/* Scoring Categories */}
            <div className="bg-slate-800/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">Scoring: {selectedScenario.name}</h3>
              <div className="flex flex-wrap gap-4">
                {selectedScenario.scoring.categories.map(cat => (
                  <div key={cat.name} className="flex items-center gap-2 bg-slate-700/50 px-3 py-2 rounded-lg">
                    <span>{cat.icon}</span>
                    <span className="text-slate-300">{cat.name}</span>
                    {cat.lowIsBetter && <span className="text-xs text-yellow-400">(lower is better)</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
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
                <Swords className="w-6 h-6" /> START BATTLE
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* PHASE: Battle Animation */}
        {battlePhase === 'battle' && selectedScenario && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-8xl"
            >
              {selectedScenario.icon}
            </motion.div>
            <h2 className="text-3xl font-bold text-white">Battle in Progress...</h2>
            <motion.div className="h-2 w-64 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-red-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5 }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* PHASE: Results */}
        {battlePhase === 'result' && battleResult && selectedScenario && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            {/* Winner Banner */}
            <motion.div
              initial={{ y: -30 }}
              animate={{ y: 0 }}
              className={`p-6 rounded-2xl text-center ${
                battleResult.winner === 'player' ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                  : battleResult.winner === 'computer' ? 'bg-gradient-to-r from-red-500 to-rose-600'
                  : 'bg-gradient-to-r from-yellow-500 to-amber-600'
              }`}
            >
              {battleResult.winner === 'player' ? <Trophy className="w-16 h-16 text-white mx-auto mb-2" />
                : battleResult.winner === 'computer' ? <Skull className="w-16 h-16 text-white mx-auto mb-2" />
                : <Star className="w-16 h-16 text-white mx-auto mb-2" />}
              <h2 className="text-3xl font-bold text-white">
                {battleResult.winner === 'player' ? 'VICTORY!' : battleResult.winner === 'computer' ? 'DEFEAT' : 'TIE'}
              </h2>
              <p className="text-white/90 text-xl">{battleResult.playerFinal} - {battleResult.computerFinal}</p>
            </motion.div>

            {/* Box Scores */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Player Box Score */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-cyan-500/30 overflow-x-auto">
                <h3 className="text-lg font-bold text-cyan-400 mb-3">Your Box Score</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-700">
                      <th className="text-left pb-2">Player</th>
                      {selectedScenario.scoring.categories.map(cat => (
                        <th key={cat.name} className="text-center pb-2">{cat.icon}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {battleResult.playerBoxScores.map(ps => (
                      <tr key={ps.card.id} className="border-b border-slate-800">
                        <td className="py-2 text-white font-medium">{ps.card.name.split(' ')[0]}</td>
                        {ps.stats.map((stat, i) => (
                          <td key={i} className="text-center text-slate-300">{stat.value}</td>
                        ))}
                      </tr>
                    ))}
                    <tr className="font-bold">
                      <td className="pt-2 text-white">TOTAL</td>
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
                      <span key={i} className="text-green-400 text-xs ml-2">{b}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* CPU Box Score */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-red-500/30 overflow-x-auto">
                <h3 className="text-lg font-bold text-red-400 mb-3">CPU Box Score</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-700">
                      <th className="text-left pb-2">Player</th>
                      {selectedScenario.scoring.categories.map(cat => (
                        <th key={cat.name} className="text-center pb-2">{cat.icon}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {battleResult.computerBoxScores.map(ps => (
                      <tr key={ps.card.id} className="border-b border-slate-800">
                        <td className="py-2 text-white font-medium">{ps.card.name.split(' ')[0]}</td>
                        {ps.stats.map((stat, i) => (
                          <td key={i} className="text-center text-slate-300">{stat.value}</td>
                        ))}
                      </tr>
                    ))}
                    <tr className="font-bold">
                      <td className="pt-2 text-white">TOTAL</td>
                      {selectedScenario.scoring.categories.map((_, i) => (
                        <td key={i} className="text-center pt-2 text-red-400">
                          {battleResult.computerBoxScores.reduce((s, ps) => s + ps.stats[i].value, 0)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
                {battleResult.computerChemistry.active.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-700">
                    <span className="text-slate-400 text-xs">Chemistry: </span>
                    {battleResult.computerChemistry.active.map((b, i) => (
                      <span key={i} className="text-green-400 text-xs ml-2">{b}</span>
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

            {/* Actions */}
            <div className="flex justify-center gap-4">
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
            My Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
