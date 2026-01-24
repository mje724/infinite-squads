'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Sparkles, Clock, Check, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';
import { useCardCollection } from '@/store/store';
import { nanoid } from 'nanoid';
import { RARITY_STYLES } from '@/types/schema';

// Types
interface PresetCard {
  name: string;
  nickname: string;
  stats: { label: string; value: number }[];
  rarity: 'bronze' | 'silver' | 'gold' | 'legendary' | 'holo' | 'glitch';
  image: string;
}

// Preset cards database with Wikipedia images
const PRESET_CARDS: PresetCard[] = [
  // GLITCH (1%)
  { name: 'Florida Man', nickname: 'Agent of Chaos', stats: [{ label: 'Unpredictability', value: 99 }, { label: 'Survival', value: 88 }, { label: 'Headlines', value: 95 }], rarity: 'glitch', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Florida_Man_Birthday_Challenge.png/440px-Florida_Man_Birthday_Challenge.png' },
  { name: 'Harambe', nickname: 'Gone Too Soon', stats: [{ label: 'Strength', value: 94 }, { label: 'Legacy', value: 99 }, { label: 'Meme Power', value: 100 }], rarity: 'glitch', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Harambe_at_Cincinnati_Zoo.jpg/440px-Harambe_at_Cincinnati_Zoo.jpg' },
  { name: 'Killdozer', nickname: 'Reasonable Man', stats: [{ label: 'Armor', value: 100 }, { label: 'Revenge', value: 99 }, { label: 'Zoning Laws', value: 0 }], rarity: 'glitch', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Killdozer_%28event%29.jpg/440px-Killdozer_%28event%29.jpg' },

  // HOLO (4%)
  { name: 'Nikola Tesla', nickname: 'The Forgotten Genius', stats: [{ label: 'Innovation', value: 98 }, { label: 'Business', value: 25 }, { label: 'Pigeons', value: 95 }], rarity: 'holo', image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Tesla_circa_1890.jpeg' },
  { name: 'Bruce Lee', nickname: 'The Dragon', stats: [{ label: 'Speed', value: 99 }, { label: 'Philosophy', value: 92 }, { label: 'One Inch Punch', value: 100 }], rarity: 'holo', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Bruce_Lee_1973.jpg/440px-Bruce_Lee_1973.jpg' },
  { name: 'Hunter S. Thompson', nickname: 'Gonzo', stats: [{ label: 'Writing', value: 96 }, { label: 'Substances', value: 99 }, { label: 'Firearms', value: 94 }], rarity: 'holo', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Hunter_S._Thompson%2C_Las_Vegas_1971.jpg/440px-Hunter_S._Thompson%2C_Las_Vegas_1971.jpg' },
  { name: 'Rasputin', nickname: 'The Mad Monk', stats: [{ label: 'Survival', value: 100 }, { label: 'Influence', value: 95 }, { label: 'Mystique', value: 98 }], rarity: 'holo', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Grigori_Rasputin_1916.jpg/440px-Grigori_Rasputin_1916.jpg' },
  { name: 'Diogenes', nickname: 'The Cynic', stats: [{ label: 'Zero F*cks', value: 100 }, { label: 'Philosophy', value: 94 }, { label: 'Barrel Living', value: 99 }], rarity: 'holo', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_Diogenes_-_Walters_37131.jpg/440px-Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_Diogenes_-_Walters_37131.jpg' },

  // LEGENDARY (10%)
  { name: 'Julius Caesar', nickname: 'Et Tu Brute?', stats: [{ label: 'Leadership', value: 98 }, { label: 'Trust', value: 15 }, { label: 'Salads', value: 100 }], rarity: 'legendary', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Bust_of_Julius_Caesar_from_History_of_the_World_%281902%29.png/440px-Bust_of_Julius_Caesar_from_History_of_the_World_%281902%29.png' },
  { name: 'Genghis Khan', nickname: '0.5% of All Men', stats: [{ label: 'Conquest', value: 100 }, { label: 'Genetics', value: 99 }, { label: 'Mercy', value: 5 }], rarity: 'legendary', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/YuanEmperorAlbumGenghisPortrait.jpg/440px-YuanEmperorAlbumGenghisPortrait.jpg' },
  { name: 'Cleopatra', nickname: 'Queen of the Nile', stats: [{ label: 'Seduction', value: 97 }, { label: 'Politics', value: 95 }, { label: 'Snakes', value: 88 }], rarity: 'legendary', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Kleopatra-VII.-Altes-Museum-Berlin1.jpg/440px-Kleopatra-VII.-Altes-Museum-Berlin1.jpg' },
  { name: 'Leonardo da Vinci', nickname: 'The OG Polymath', stats: [{ label: 'Art', value: 99 }, { label: 'Science', value: 97 }, { label: 'Finishing Projects', value: 40 }], rarity: 'legendary', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Francesco_Melzi_-_Portrait_of_Leonardo.png/440px-Francesco_Melzi_-_Portrait_of_Leonardo.png' },
  { name: 'Albert Einstein', nickname: 'E=MC Drip', stats: [{ label: 'Intelligence', value: 99 }, { label: 'Hair Care', value: 10 }, { label: 'Tongue Game', value: 95 }], rarity: 'legendary', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Albert_Einstein_1947.jpg/440px-Albert_Einstein_1947.jpg' },
  { name: 'Sun Tzu', nickname: 'The Art of War', stats: [{ label: 'Strategy', value: 100 }, { label: 'Quotes', value: 99 }, { label: 'LinkedIn Posts', value: 95 }], rarity: 'legendary', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Erta_Sunzi.jpg/440px-Erta_Sunzi.jpg' },

  // GOLD (20%)
  { name: 'Napoleon Bonaparte', nickname: 'Smol King Energy', stats: [{ label: 'Strategy', value: 96 }, { label: 'Height', value: 45 }, { label: 'Ego', value: 100 }], rarity: 'gold', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/440px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg' },
  { name: 'Muhammad Ali', nickname: 'Float & Sting', stats: [{ label: 'Boxing', value: 98 }, { label: 'Trash Talk', value: 100 }, { label: 'Humility', value: 25 }], rarity: 'gold', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/440px-Muhammad_Ali_NYWTS.jpg' },
  { name: 'Bob Ross', nickname: 'Happy Accidents', stats: [{ label: 'Calm', value: 100 }, { label: 'Painting', value: 92 }, { label: 'ASMR', value: 99 }], rarity: 'gold', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Bob_at_Easel.jpg/440px-Bob_at_Easel.jpg' },
  { name: 'Steve Irwin', nickname: 'Crikey!', stats: [{ label: 'Animals', value: 99 }, { label: 'Enthusiasm', value: 100 }, { label: 'Stingray Awareness', value: 5 }], rarity: 'gold', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Steve_Irwin.jpg/440px-Steve_Irwin.jpg' },
  { name: 'Freddie Mercury', nickname: 'The Show Must Go On', stats: [{ label: 'Voice', value: 100 }, { label: 'Showmanship', value: 99 }, { label: 'Mustache', value: 98 }], rarity: 'gold', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1977.jpg/440px-Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1977.jpg' },
  { name: 'Mr. Rogers', nickname: 'The Neighbor', stats: [{ label: 'Kindness', value: 100 }, { label: 'Cardigan Game', value: 99 }, { label: 'Puppets', value: 95 }], rarity: 'gold', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Fred_Rogers%2C_late_1960s.jpg/440px-Fred_Rogers%2C_late_1960s.jpg' },
  { name: 'Teddy Roosevelt', nickname: 'Bull Moose', stats: [{ label: 'Toughness', value: 99 }, { label: 'Mustache', value: 95 }, { label: 'Speaking After Being Shot', value: 100 }], rarity: 'gold', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/President_Roosevelt_-_Pach_Bros.jpg/440px-President_Roosevelt_-_Pach_Bros.jpg' },
  { name: 'Marie Curie', nickname: 'Radioactive', stats: [{ label: 'Science', value: 99 }, { label: 'Nobel Prizes', value: 100 }, { label: 'Glow', value: 95 }], rarity: 'gold', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Marie_Curie_%28Nobel-Chem%29.jpg/440px-Marie_Curie_%28Nobel-Chem%29.jpg' },

  // SILVER (30%)
  { name: 'Gordon Ramsay', nickname: 'Its RAW', stats: [{ label: 'Cooking', value: 97 }, { label: 'Insults', value: 100 }, { label: 'Patience', value: 5 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Gordon_Ramsay.jpg/440px-Gordon_Ramsay.jpg' },
  { name: 'Nicolas Cage', nickname: 'NOT THE BEES', stats: [{ label: 'Acting Range', value: 99 }, { label: 'Movie Choices', value: 35 }, { label: 'Declaration Stealing', value: 90 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Nicolas_Cage_2011_CC.jpg/440px-Nicolas_Cage_2011_CC.jpg' },
  { name: 'Danny DeVito', nickname: 'Trash Man', stats: [{ label: 'Comedy', value: 95 }, { label: 'Height', value: 20 }, { label: 'Egg Offering', value: 100 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Danny_DeVito_by_Gage_Skidmore_3.jpg/440px-Danny_DeVito_by_Gage_Skidmore_3.jpg' },
  { name: 'Snoop Dogg', nickname: 'D-O-Double-G', stats: [{ label: 'Flow', value: 94 }, { label: 'Chill', value: 100 }, { label: 'Cooking Shows', value: 88 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Snoop_Dogg_2019_by_Glenn_Francis.jpg/440px-Snoop_Dogg_2019_by_Glenn_Francis.jpg' },
  { name: 'Keanu Reeves', nickname: 'Breathtaking', stats: [{ label: 'Acting', value: 88 }, { label: 'Kindness', value: 100 }, { label: 'Immortality', value: 95 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Keanu_Reeves_2023.jpg/440px-Keanu_Reeves_2023.jpg' },
  { name: 'Guy Fieri', nickname: 'Mayor of Flavortown', stats: [{ label: 'Flavor', value: 95 }, { label: 'Hair Gel', value: 100 }, { label: 'Diners', value: 99 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Guy_Fieri_at_Guantanamo_2.jpg/440px-Guy_Fieri_at_Guantanamo_2.jpg' },
  { name: 'Shaq', nickname: 'Diesel', stats: [{ label: 'Basketball', value: 96 }, { label: 'Free Throws', value: 30 }, { label: 'Commercials', value: 100 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Shaq_Heat.jpg/440px-Shaq_Heat.jpg' },
  { name: 'Martha Stewart', nickname: 'OG Homemaker', stats: [{ label: 'Crafts', value: 98 }, { label: 'Prison Survival', value: 95 }, { label: 'Snoop Friendship', value: 100 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Martha_Stewart_2023.jpg/440px-Martha_Stewart_2023.jpg' },
  { name: 'Mike Tyson', nickname: 'Iron Mike', stats: [{ label: 'Punching', value: 99 }, { label: 'Ear Biting', value: 100 }, { label: 'Pigeons', value: 95 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mike_Tyson_2019_by_Glenn_Francis.jpg/440px-Mike_Tyson_2019_by_Glenn_Francis.jpg' },

  // BRONZE (35%)
  { name: 'The Rock', nickname: 'Can You Smell It?', stats: [{ label: 'Muscles', value: 96 }, { label: 'Eyebrow', value: 100 }, { label: 'Movie Variety', value: 40 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/440px-Dwayne_Johnson_2014_%28cropped%29.jpg' },
  { name: 'Joe Rogan', nickname: 'Have You Tried DMT?', stats: [{ label: 'Podcasting', value: 95 }, { label: 'BJJ', value: 85 }, { label: 'Elk Meat', value: 100 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Joe_Rogan_2019_by_Glenn_Francis_%28cropped%29.jpg/440px-Joe_Rogan_2019_by_Glenn_Francis_%28cropped%29.jpg' },
  { name: 'Post Malone', nickname: 'Sunflower', stats: [{ label: 'Music', value: 90 }, { label: 'Face Tattoos', value: 100 }, { label: 'Bud Light', value: 99 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Post_Malone_Stavernfestivalen_2018_%28cropped%29.jpg/440px-Post_Malone_Stavernfestivalen_2018_%28cropped%29.jpg' },
  { name: 'DJ Khaled', nickname: 'Another One', stats: [{ label: 'Keys', value: 100 }, { label: 'Suffering', value: 99 }, { label: 'Jet Ski', value: 95 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/DJ_Khaled_2019_by_Glenn_Francis.jpg/440px-DJ_Khaled_2019_by_Glenn_Francis.jpg' },
  { name: 'Elon Musk', nickname: 'Technoking', stats: [{ label: 'Business', value: 92 }, { label: 'Twitter', value: 100 }, { label: 'Child Naming', value: 15 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/440px-Elon_Musk_Royal_Society_%28crop2%29.jpg' },
  { name: 'Mark Zuckerberg', nickname: 'The Zucc', stats: [{ label: 'Coding', value: 95 }, { label: 'Human Behavior', value: 25 }, { label: 'Sweet Baby Rays', value: 100 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/440px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg' },
  { name: 'Jeff Bezos', nickname: 'Lex Luthor', stats: [{ label: 'Wealth', value: 99 }, { label: 'Space Obsession', value: 95 }, { label: 'Worker Rights', value: 10 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg/440px-Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg' },
  { name: 'Arnold Schwarzenegger', nickname: 'Ill Be Back', stats: [{ label: 'Muscles', value: 98 }, { label: 'Accent', value: 100 }, { label: 'Politics', value: 75 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg/440px-Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg' },
  { name: 'Ozzy Osbourne', nickname: 'Prince of Darkness', stats: [{ label: 'Music', value: 93 }, { label: 'Bat Biting', value: 100 }, { label: 'Comprehensibility', value: 20 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Ozzy_Osbourne_2019.jpg/440px-Ozzy_Osbourne_2019.jpg' },
  { name: 'Flavor Flav', nickname: 'YEAHHH BOYYYY', stats: [{ label: 'Hype', value: 100 }, { label: 'Clock Fashion', value: 99 }, { label: 'Time Management', value: 90 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Flavor_Flav_at_Walmart.jpg/440px-Flavor_Flav_at_Walmart.jpg' },
  { name: 'Hulk Hogan', nickname: 'Brother', stats: [{ label: 'Wrestling', value: 95 }, { label: 'Vitamins', value: 100 }, { label: 'Saying Brother', value: 99 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Hulk_Hogan.jpg/440px-Hulk_Hogan.jpg' },
  { name: 'Charlie Sheen', nickname: 'Winning', stats: [{ label: 'Acting', value: 80 }, { label: 'Tiger Blood', value: 100 }, { label: 'Life Choices', value: 15 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Charlie_Sheen_2012.jpg/440px-Charlie_Sheen_2012.jpg' },
];

// Rarity weights for random selection
const RARITY_WEIGHTS = {
  bronze: 35,
  silver: 30,
  gold: 20,
  legendary: 10,
  holo: 4,
  glitch: 1,
};

function getRandomCards(count: number): PresetCard[] {
  const result: PresetCard[] = [];
  const totalWeight = Object.values(RARITY_WEIGHTS).reduce((a, b) => a + b, 0);
  
  for (let i = 0; i < count; i++) {
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
    const randomCard = rarityCards[Math.floor(Math.random() * rarityCards.length)];
    
    // Avoid duplicates in same pack
    if (randomCard && !result.find(c => c.name === randomCard.name)) {
      result.push(randomCard);
    } else {
      i--; // retry
    }
  }
  
  return result;
}

const PACK_LIMIT = 5;
const COOLDOWN_MS = 30 * 60 * 1000; // 30 minutes

export default function PacksPage() {
  const { addCard } = useCardCollection();
  const [packsRemaining, setPacksRemaining] = useState(PACK_LIMIT);
  const [cooldownEnd, setCooldownEnd] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [packCards, setPackCards] = useState<PresetCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<PresetCard | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Load state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('packState');
    if (stored) {
      const state = JSON.parse(stored);
      const now = Date.now();
      
      if (state.cooldownEnd && now < state.cooldownEnd) {
        setCooldownEnd(state.cooldownEnd);
        setPacksRemaining(0);
      } else if (state.cooldownEnd && now >= state.cooldownEnd) {
        // Cooldown expired, reset
        setPacksRemaining(PACK_LIMIT);
        setCooldownEnd(null);
        localStorage.removeItem('packState');
      } else {
        setPacksRemaining(state.packsRemaining ?? PACK_LIMIT);
      }
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!cooldownEnd) {
      setTimeLeft('');
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = cooldownEnd - now;
      
      if (diff <= 0) {
        setPacksRemaining(PACK_LIMIT);
        setCooldownEnd(null);
        setTimeLeft('');
        localStorage.removeItem('packState');
        return;
      }
      
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [cooldownEnd]);

  const openPack = () => {
    if (packsRemaining <= 0) return;
    
    const cards = getRandomCards(3);
    setPackCards(cards);
    setSelectedCard(null);
    setIsRevealed(false);
    
    // Animate reveal after a short delay
    setTimeout(() => setIsRevealed(true), 500);
  };

  const selectCard = (card: PresetCard) => {
    setSelectedCard(card);
  };

  const confirmSelection = () => {
    if (!selectedCard) return;
    
    // Add card to collection
    const now = new Date();
    const stats = selectedCard.stats.map((s, i) => ({
      id: `stat-${i}`,
      label: s.label,
      value: s.value,
      icon: '📊',
      category: 'custom',
    }));
    const overallRating = Math.round(stats.reduce((sum, s) => sum + s.value, 0) / stats.length);
    
    addCard({
      id: nanoid(),
      name: selectedCard.name,
      nickname: selectedCard.nickname,
      position: '',
      image: selectedCard.image,
      imageFilter: 'normal',
      rarity: selectedCard.rarity,
      theme: 'custom',
      mode: 'unserious',
      overallRating,
      statBlock: stats,
      traits: [],
      bio: `"${selectedCard.nickname}"`,
      activeEffects: [],
      createdAt: now,
      updatedAt: now,
    });
    
    // Update packs remaining
    const newPacksRemaining = packsRemaining - 1;
    setPacksRemaining(newPacksRemaining);
    
    // Set cooldown if out of packs
    if (newPacksRemaining <= 0) {
      const newCooldownEnd = Date.now() + COOLDOWN_MS;
      setCooldownEnd(newCooldownEnd);
      localStorage.setItem('packState', JSON.stringify({ packsRemaining: 0, cooldownEnd: newCooldownEnd }));
    } else {
      localStorage.setItem('packState', JSON.stringify({ packsRemaining: newPacksRemaining }));
    }
    
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setPackCards([]);
      setSelectedCard(null);
    }, 2000);
  };

  const getRarityGlow = (rarity: string) => {
    return RARITY_STYLES[rarity as keyof typeof RARITY_STYLES]?.glow || '';
  };

  const getRarityGradient = (rarity: string) => {
    return RARITY_STYLES[rarity as keyof typeof RARITY_STYLES]?.gradient || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Card Packs
          </h1>
          <p className="text-slate-400">Open packs, pick your favorite card!</p>
        </div>

        {/* Stats Bar */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl px-6 py-3 flex items-center gap-3">
            <Package className="w-5 h-5 text-purple-400" />
            <span className="text-white font-semibold">{packsRemaining} / {PACK_LIMIT} Packs</span>
          </div>
          {timeLeft && (
            <div className="bg-slate-800/50 border border-orange-500/30 rounded-xl px-6 py-3 flex items-center gap-3">
              <Clock className="w-5 h-5 text-orange-400" />
              <span className="text-orange-400 font-semibold">{timeLeft}</span>
            </div>
          )}
        </div>

        {/* Main Content */}
        {packCards.length === 0 ? (
          /* Open Pack Button */
          <div className="flex flex-col items-center gap-6">
            <motion.button
              onClick={openPack}
              disabled={packsRemaining <= 0}
              whileHover={packsRemaining > 0 ? { scale: 1.05 } : {}}
              whileTap={packsRemaining > 0 ? { scale: 0.95 } : {}}
              className={`relative px-12 py-6 rounded-2xl font-bold text-xl transition-all ${
                packsRemaining > 0
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span className="flex items-center gap-3">
                <Package className="w-6 h-6" />
                {packsRemaining > 0 ? 'Open Pack' : 'No Packs Available'}
              </span>
              {packsRemaining > 0 && (
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>

            {packsRemaining <= 0 && timeLeft && (
              <p className="text-slate-400">New packs in {timeLeft}</p>
            )}

            <Link
              href="/my-cards"
              className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
            >
              View My Collection →
            </Link>
          </div>
        ) : (
          /* Card Selection */
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center text-white">
              {showConfirmation ? '✨ Card Added!' : 'Choose One Card'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimatePresence>
                {packCards.map((card, index) => (
                  <motion.div
                    key={card.name}
                    initial={{ rotateY: 180, opacity: 0 }}
                    animate={isRevealed ? { rotateY: 0, opacity: 1 } : {}}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    onClick={() => !showConfirmation && selectCard(card)}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      selectedCard?.name === card.name
                        ? 'scale-105 z-10'
                        : selectedCard
                        ? 'opacity-50 scale-95'
                        : 'hover:scale-105'
                    }`}
                  >
                    {/* Card */}
                    <div
                      className="relative rounded-2xl overflow-hidden aspect-[3/4]"
                      style={{
                        background: getRarityGradient(card.rarity),
                        boxShadow: selectedCard?.name === card.name ? getRarityGlow(card.rarity) : '',
                      }}
                    >
                      {/* Card Inner */}
                      <div className="absolute inset-1 bg-slate-900 rounded-xl overflow-hidden">
                        {/* Image */}
                        <div className="h-1/2 overflow-hidden">
                          <img
                            src={card.image}
                            alt={card.name}
                            className="w-full h-full object-cover object-top"
                            crossOrigin="anonymous"
                          />
                        </div>
                        
                        {/* Info */}
                        <div className="p-4 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-white text-lg leading-tight">{card.name}</h3>
                              <p className="text-slate-400 text-sm">"{card.nickname}"</p>
                            </div>
                            <span
                              className="px-2 py-0.5 rounded text-xs font-bold uppercase"
                              style={{
                                background: getRarityGradient(card.rarity),
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                              }}
                            >
                              {card.rarity}
                            </span>
                          </div>
                          
                          {/* Stats */}
                          <div className="space-y-1">
                            {card.stats.map((stat, i) => (
                              <div key={i} className="flex justify-between text-sm">
                                <span className="text-slate-400">{stat.label}</span>
                                <span className="text-white font-semibold">{stat.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Selected indicator */}
                      {selectedCard?.name === card.name && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <Check className="w-5 h-5 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Confirm Button */}
            {selectedCard && !showConfirmation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center"
              >
                <button
                  onClick={confirmSelection}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold text-white text-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Add {selectedCard.name} to Collection
                </button>
              </motion.div>
            )}

            {/* After confirmation */}
            {showConfirmation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center"
              >
                <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
              </motion.div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 flex justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 font-medium transition-colors flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Card Creator
          </Link>
          <Link
            href="/my-cards"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 font-medium transition-colors"
          >
            My Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
