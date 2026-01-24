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

const IMAGE_URLS: Record<string, string> = {
  'Florida Man': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Flstatehood.jpg/220px-Flstatehood.jpg',
  'Harambe': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Gorilla_gorilla_gorilla8.jpg/320px-Gorilla_gorilla_gorilla8.jpg',
  'Killdozer': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Caterpillar_D9T_crawler_tractor.jpg/320px-Caterpillar_D9T_crawler_tractor.jpg',
  'Boeing Door Plug': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Alaska_Airlines_N704AL_fuselage_plug_area.jpg/220px-Alaska_Airlines_N704AL_fuselage_plug_area.jpg',
  'Nikola Tesla': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/N.Tesla.JPG/220px-N.Tesla.JPG',
  'Diogenes': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_Diogenes_-_Walters_37131.jpg/300px-Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_Diogenes_-_Walters_37131.jpg',
  'Rasputin': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Grigori_Rasputin_1916.jpg/220px-Grigori_Rasputin_1916.jpg',
  'Hunter S. Thompson': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Hunter_S._Thompson%2C_Las_Vegas_1971.jpg/220px-Hunter_S._Thompson%2C_Las_Vegas_1971.jpg',
  'Yusuf Dikec': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/2024-07-28_Jeux_Olympiques_de_Paris_Yusuf_Dikec.jpg/220px-2024-07-28_Jeux_Olympiques_de_Paris_Yusuf_Dikec.jpg',
  'Genghis Khan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/YuanEmperorAlbumGenghisPortrait.jpg/220px-YuanEmperorAlbumGenghisPortrait.jpg',
  'Cleopatra': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Kleopatra-VII.-Altes-Museum-Berlin1.jpg/220px-Kleopatra-VII.-Altes-Museum-Berlin1.jpg',
  'Frederick Douglass': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Frederick_Douglass_portrait.jpg/220px-Frederick_Douglass_portrait.jpg',
  'Sun Tzu': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Erta_Sunzi.jpg/220px-Erta_Sunzi.jpg',
  'Bruce Lee': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Bruce_Lee_Ed_Parker_1967.jpg/220px-Bruce_Lee_Ed_Parker_1967.jpg',
  'Julius Caesar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Rimini083.jpg/220px-Rimini083.jpg',
  'Mr. Rogers': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Fred_Rogers%2C_late_1960s.jpg/220px-Fred_Rogers%2C_late_1960s.jpg',
  'Bob Ross': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Bob_at_Easel.jpg/220px-Bob_at_Easel.jpg',
  'Steve Irwin': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Steve_Irwin.jpg/220px-Steve_Irwin.jpg',
  'Freddie Mercury': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Freddie_Mercury_1985.jpg/220px-Freddie_Mercury_1985.jpg',
  'Teddy Roosevelt': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Theodore_Roosevelt_by_the_Pach_Bros.jpg/220px-Theodore_Roosevelt_by_the_Pach_Bros.jpg',
  'Marie Curie': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/220px-Marie_Curie_c1920.jpg',
  'Harriet Tubman': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Harriet_Tubman_c1868-69.jpg/220px-Harriet_Tubman_c1868-69.jpg',
  'Muhammad Ali': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/220px-Muhammad_Ali_NYWTS.jpg',
  'Keanu Reeves': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Keanu_Reeves_2023.jpg/220px-Keanu_Reeves_2023.jpg',
  'Danny DeVito': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Danny_DeVito_by_Gage_Skidmore.jpg/220px-Danny_DeVito_by_Gage_Skidmore.jpg',
  'Nicolas Cage': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Nicolas_Cage_2011_CC.jpg/220px-Nicolas_Cage_2011_CC.jpg',
  'Snoop Dogg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Snoop_Dogg_2019_by_Glenn_Francis.jpg/220px-Snoop_Dogg_2019_by_Glenn_Francis.jpg',
  'Gordon Ramsay': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Gordon_Ramsay.jpg/220px-Gordon_Ramsay.jpg',
  'Shaq': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Shaquille_O%27Neal_in_2023.jpg/220px-Shaquille_O%27Neal_in_2023.jpg',
  'Martha Stewart': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Martha_Stewart_2024.jpg/220px-Martha_Stewart_2024.jpg',
  'Mike Tyson': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mike_Tyson_2019_by_Glenn_Francis.jpg/220px-Mike_Tyson_2019_by_Glenn_Francis.jpg',
  'Weird Al': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/%22Weird_Al%22_Yankovic_in_2018.jpg/220px-%22Weird_Al%22_Yankovic_in_2018.jpg',
  'Guy Fieri': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Guy_Fieri_at_Guantanamo_2.jpg/220px-Guy_Fieri_at_Guantanamo_2.jpg',
  'Bad Luck Brian': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/Bad_Luck_Brian.jpg/220px-Bad_Luck_Brian.jpg',
  'Grimace': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Grimace_character.webp/220px-Grimace_character.webp.png',
  'Elon Musk': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/220px-Elon_Musk_Royal_Society_%28crop2%29.jpg',
  'Mark Zuckerberg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/220px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg',
  'Jeff Bezos': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg/220px-Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg',
  'The Rock': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/220px-Dwayne_Johnson_2014_%28cropped%29.jpg',
  'Joe Rogan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Joe_Rogan_in_2019.jpg/220px-Joe_Rogan_in_2019.jpg',
  'DJ Khaled': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/DJ_Khaled_2021.jpg/220px-DJ_Khaled_2021.jpg',
  'Tommy Wiseau': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Tommy_Wiseau_by_Gage_Skidmore.jpg/220px-Tommy_Wiseau_by_Gage_Skidmore.jpg',
  'Gary Busey': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Gary_Busey_2009_%28cropped%29.jpg/220px-Gary_Busey_2009_%28cropped%29.jpg',
  'Charlie Sheen': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Charlie_Sheen_2012.jpg/220px-Charlie_Sheen_2012.jpg',
  'Flavor Flav': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Flavor_Flav_2018.jpg/220px-Flavor_Flav_2018.jpg',
  'Hulk Hogan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Hulk_Hogan_2017.jpg/220px-Hulk_Hogan_2017.jpg',
  'Ozzy Osbourne': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Ozzy_Osbourne_2020_%28cropped%29.jpg/220px-Ozzy_Osbourne_2020_%28cropped%29.jpg',
  'Arnold Schwarzenegger': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg/220px-Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg',
  'Post Malone': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Post_Malone_2018.png/220px-Post_Malone_2018.png',
  'Island Boys': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Island_Boys_2022.jpg/220px-Island_Boys_2022.jpg',
  'Scumbag Steve': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/Scumbag_Steve.jpg/220px-Scumbag_Steve.jpg',
  'Elizabeth Holmes': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Elizabeth_Holmes_2014_%28cropped%29.jpg/220px-Elizabeth_Holmes_2014_%28cropped%29.jpg',
  'George Santos': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Rep._George_Santos_Official_Portrait_%28cropped%29.jpg/220px-Rep._George_Santos_Official_Portrait_%28cropped%29.jpg',
  'Sam Bankman-Fried': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/SBF_in_2022.jpg/220px-SBF_in_2022.jpg',
  'Billy McFarland': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Billy_McFarland_mugshot.jpg/220px-Billy_McFarland_mugshot.jpg',
  'Liver King': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Liver_King.jpg/220px-Liver_King.jpg',
  'Antonio Brown': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Antonio_Brown_2018.jpg/220px-Antonio_Brown_2018.jpg',
  'Rachel Dolezal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Rachel_Dolezal%2C_in_2015.jpg/220px-Rachel_Dolezal%2C_in_2015.jpg',
  '6ix9ine': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/6ix9ine_2018.jpg/220px-6ix9ine_2018.jpg',
  'Adam Levine': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Adam_Levine_2013.jpg/220px-Adam_Levine_2013.jpg',
  'Jojo Siwa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/JoJo_Siwa_2019_by_Glenn_Francis.jpg/220px-JoJo_Siwa_2019_by_Glenn_Francis.jpg',
  'Will Smith': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg/220px-TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg',
  'Logan Paul': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Logan_Paul_2023.jpg/220px-Logan_Paul_2023.jpg',
  'Salt Bae': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Nusr-Et_Steakhouse%2C_Salt_Bae.jpg/220px-Nusr-Et_Steakhouse%2C_Salt_Bae.jpg',
  'Hilaria Baldwin': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Hilaria_Baldwin_2019.jpg/220px-Hilaria_Baldwin_2019.jpg',
  'Ben Shapiro': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Ben_Shapiro_2018.jpg/220px-Ben_Shapiro_2018.jpg',
  'Travis Scott': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Travis_Scott_2019.jpg/220px-Travis_Scott_2019.jpg',
  'Raygun': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Rachael_Gunn_2024_Olympics.jpg/220px-Rachael_Gunn_2024_Olympics.jpg',
};

function getImageUrl(name: string): string {
  return IMAGE_URLS[name] || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=1e293b`;
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
