'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Sparkles, Clock, Check, Home, User } from 'lucide-react';
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

// All verified working image URLs from Wikimedia Commons
const PRESET_CARDS: PresetCard[] = [
  // GLITCH (1%) - Chaos incarnate
  { 
    name: 'Florida Man', 
    nickname: 'Headlines Daily', 
    stats: [{ label: 'Mugshot Angles', value: 99 }, { label: 'Impulse Control', value: 2 }, { label: 'Gator Wrangling', value: 94 }], 
    rarity: 'glitch', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/We_Buy_Gold_Shop.jpg/320px-We_Buy_Gold_Shop.jpg'
  },
  { 
    name: 'Harambe', 
    nickname: 'Never Forget', 
    stats: [{ label: 'Innocence', value: 100 }, { label: 'Zoo Design', value: 0 }, { label: 'Cultural Impact', value: 99 }], 
    rarity: 'glitch', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Gorilla_gorilla_gorilla8.jpg/320px-Gorilla_gorilla_gorilla8.jpg'
  },
  { 
    name: 'Killdozer', 
    nickname: 'Reasonable Response', 
    stats: [{ label: 'Welding', value: 100 }, { label: 'Conflict Resolution', value: 3 }, { label: 'Property Values', value: 0 }], 
    rarity: 'glitch', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Caterpillar_D9T_crawler_tractor.jpg/320px-Caterpillar_D9T_crawler_tractor.jpg'
  },

  // HOLO (4%) - Legends who actually earned it
  { 
    name: 'Nikola Tesla', 
    nickname: 'Died Broke & Right', 
    stats: [{ label: 'Inventions Stolen', value: 99 }, { label: 'Business Acumen', value: 4 }, { label: 'Pigeon Love', value: 100 }], 
    rarity: 'holo', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/N.Tesla.JPG/220px-N.Tesla.JPG'
  },
  { 
    name: 'Bruce Lee', 
    nickname: 'Be Water', 
    stats: [{ label: 'One Inch Punch', value: 100 }, { label: 'Films Finished', value: 45 }, { label: 'Philosophy', value: 97 }], 
    rarity: 'holo', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Bruce_Lee_Ed_Parker_1967.jpg/220px-Bruce_Lee_Ed_Parker_1967.jpg'
  },
  { 
    name: 'Hunter S. Thompson', 
    nickname: 'Buy The Ticket', 
    stats: [{ label: 'Gonzo', value: 100 }, { label: 'Liver Function', value: 8 }, { label: 'Deadlines Met', value: 35 }], 
    rarity: 'holo', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Hunter_S._Thompson.jpg/220px-Hunter_S._Thompson.jpg'
  },
  { 
    name: 'Rasputin', 
    nickname: 'Hard to Kill', 
    stats: [{ label: 'Dying', value: 3 }, { label: 'Influence', value: 96 }, { label: 'Beard Game', value: 100 }], 
    rarity: 'holo', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Grigori_Rasputin_1916.jpg/220px-Grigori_Rasputin_1916.jpg'
  },
  { 
    name: 'Diogenes', 
    nickname: 'Behold, A Man', 
    stats: [{ label: 'F*cks Given', value: 0 }, { label: 'Barrel Living', value: 100 }, { label: 'Public Decency', value: 5 }], 
    rarity: 'holo', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_Diogenes_-_Walters_37131.jpg/300px-Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_Diogenes_-_Walters_37131.jpg'
  },

  // LEGENDARY (10%) - Actually impressive humans
  { 
    name: 'Genghis Khan', 
    nickname: 'Your Ancestor', 
    stats: [{ label: 'Conquest', value: 100 }, { label: 'Descendants', value: 100 }, { label: 'Mercy', value: 2 }], 
    rarity: 'legendary', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/YuanEmperorAlbumGenghisPortrait.jpg/220px-YuanEmperorAlbumGenghisPortrait.jpg'
  },
  { 
    name: 'Cleopatra', 
    nickname: 'Not About Looks', 
    stats: [{ label: 'Languages', value: 95 }, { label: 'Empire Saved', value: 40 }, { label: 'Romans Collected', value: 100 }], 
    rarity: 'legendary', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Kleopatra-VII.-Altes-Museum-Berlin1.jpg/220px-Kleopatra-VII.-Altes-Museum-Berlin1.jpg'
  },
  { 
    name: 'Leonardo da Vinci', 
    nickname: 'ADHD King', 
    stats: [{ label: 'Started Projects', value: 100 }, { label: 'Finished Projects', value: 25 }, { label: 'Centuries Ahead', value: 99 }], 
    rarity: 'legendary', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Francesco_Melzi_-_Portrait_of_Leonardo.png/220px-Francesco_Melzi_-_Portrait_of_Leonardo.png'
  },
  { 
    name: 'Sun Tzu', 
    nickname: 'LinkedIn Influencer', 
    stats: [{ label: 'Strategy', value: 100 }, { label: 'Misquoted', value: 99 }, { label: 'May Not Exist', value: 50 }], 
    rarity: 'legendary', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Erta_Sunzi.jpg/220px-Erta_Sunzi.jpg'
  },
  { 
    name: 'Julius Caesar', 
    nickname: 'Trust Issues', 
    stats: [{ label: 'Leadership', value: 97 }, { label: 'Friend Selection', value: 8 }, { label: 'Salad Legacy', value: 0 }], 
    rarity: 'legendary', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Rimini083.jpg/220px-Rimini083.jpg'
  },
  { 
    name: 'Frederick Douglass', 
    nickname: 'Self-Made Legend', 
    stats: [{ label: 'Oratory', value: 100 }, { label: 'Escape Artist', value: 95 }, { label: 'Photo Game', value: 99 }], 
    rarity: 'legendary', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Frederick_Douglass_portrait.jpg/220px-Frederick_Douglass_portrait.jpg'
  },

  // GOLD (20%) - Solid legends
  { 
    name: 'Muhammad Ali', 
    nickname: 'Talks the Talk', 
    stats: [{ label: 'Boxing', value: 98 }, { label: 'Humility', value: 15 }, { label: 'Proved It', value: 100 }], 
    rarity: 'gold', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/220px-Muhammad_Ali_NYWTS.jpg'
  },
  { 
    name: 'Bob Ross', 
    nickname: 'No Mistakes', 
    stats: [{ label: 'Happy Trees', value: 100 }, { label: 'Indoor Voice', value: 100 }, { label: 'Got Screwed', value: 90 }], 
    rarity: 'gold', 
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Bob_at_Easel.jpg/220px-Bob_at_Easel.jpg'
  },
  { 
    name: 'Steve Irwin', 
    nickname: 'Crikey Forever', 
    stats: [{ label: 'Animal Love', value: 100 }, { label: 'Personal Space', value: 5 }, { label: 'Khaki Drip', value: 95 }], 
    rarity: 'gold', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Steve_Irwin.jpg/220px-Steve_Irwin.jpg'
  },
  { 
    name: 'Freddie Mercury', 
    nickname: 'The Show', 
    stats: [{ label: 'Vocal Range', value: 100 }, { label: 'Stage Presence', value: 100 }, { label: 'Cats Owned', value: 95 }], 
    rarity: 'gold', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Freddie_Mercury_1985.jpg/220px-Freddie_Mercury_1985.jpg'
  },
  { 
    name: 'Mr. Rogers', 
    nickname: 'Actual Saint', 
    stats: [{ label: 'Kindness', value: 100 }, { label: 'Cardigan Game', value: 99 }, { label: 'Senate W', value: 100 }], 
    rarity: 'gold', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Fred_Rogers%2C_late_1960s.jpg/220px-Fred_Rogers%2C_late_1960s.jpg'
  },
  { 
    name: 'Teddy Roosevelt', 
    nickname: 'Shot Mid-Speech', 
    stats: [{ label: 'Toughness', value: 100 }, { label: 'Trust Busting', value: 95 }, { label: 'Kept Talking', value: 100 }], 
    rarity: 'gold', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Theodore_Roosevelt_by_the_Pach_Bros.jpg/220px-Theodore_Roosevelt_by_the_Pach_Bros.jpg'
  },
  { 
    name: 'Marie Curie', 
    nickname: 'Glowing Review', 
    stats: [{ label: 'Nobel Prizes', value: 100 }, { label: 'Safety Gear', value: 10 }, { label: 'Still Radioactive', value: 95 }], 
    rarity: 'gold', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/220px-Marie_Curie_c1920.jpg'
  },
  { 
    name: 'Harriet Tubman', 
    nickname: 'Never Lost One', 
    stats: [{ label: 'Navigation', value: 100 }, { label: 'Trips Made', value: 95 }, { label: 'On the $20', value: 0 }], 
    rarity: 'gold', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Harriet_Tubman_c1868-69.jpg/220px-Harriet_Tubman_c1868-69.jpg'
  },

  // SILVER (30%) - Entertaining humans
  { 
    name: 'Gordon Ramsay', 
    nickname: 'Its F*cking Raw', 
    stats: [{ label: 'Cooking', value: 95 }, { label: 'Volume Control', value: 5 }, { label: 'Lamb Sauce', value: 0 }], 
    rarity: 'silver', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Gordon_Ramsay.jpg/220px-Gordon_Ramsay.jpg'
  },
  { 
    name: 'Nicolas Cage', 
    nickname: 'Yes To Everything', 
    stats: [{ label: 'Range', value: 100 }, { label: 'Script Reading', value: 20 }, { label: 'Bees Avoided', value: 0 }], 
    rarity: 'silver', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Nicolas_Cage_2011_CC.jpg/220px-Nicolas_Cage_2011_CC.jpg'
  },
  { 
    name: 'Danny DeVito', 
    nickname: 'Started Blasting', 
    stats: [{ label: 'Comedy', value: 95 }, { label: 'Height', value: 15 }, { label: 'Egg Offers', value: 100 }], 
    rarity: 'silver', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Danny_DeVito_by_Gage_Skidmore.jpg/220px-Danny_DeVito_by_Gage_Skidmore.jpg'
  },
  { 
    name: 'Snoop Dogg', 
    nickname: 'Fo Shizzle', 
    stats: [{ label: 'Flow', value: 94 }, { label: 'Cooking Shows', value: 90 }, { label: 'Martha BFF', value: 100 }], 
    rarity: 'silver', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Snoop_Dogg_2019_by_Glenn_Francis.jpg/220px-Snoop_Dogg_2019_by_Glenn_Francis.jpg'
  },
  { 
    name: 'Keanu Reeves', 
    nickname: 'Too Pure', 
    stats: [{ label: 'Kindness', value: 100 }, { label: 'Aging', value: 0 }, { label: 'Bench Sitting', value: 95 }], 
    rarity: 'silver', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Keanu_Reeves_2023.jpg/220px-Keanu_Reeves_2023.jpg'
  },
  { 
    name: 'Guy Fieri', 
    nickname: 'Mayor of Flavortown', 
    stats: [{ label: 'Donkey Sauce', value: 100 }, { label: 'Hair Gel', value: 99 }, { label: 'Diners Found', value: 95 }], 
    rarity: 'silver', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Guy_Fieri_at_Guantanamo_2.jpg/220px-Guy_Fieri_at_Guantanamo_2.jpg'
  },
  { 
    name: 'Shaq', 
    nickname: 'Kazaam', 
    stats: [{ label: 'Basketball', value: 96 }, { label: 'Free Throws', value: 25 }, { label: 'Ads Done', value: 100 }], 
    rarity: 'silver', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Shaquille_O%27Neal_in_2023.jpg/220px-Shaquille_O%27Neal_in_2023.jpg'
  },
  { 
    name: 'Martha Stewart', 
    nickname: 'Did Her Time', 
    stats: [{ label: 'Crafts', value: 98 }, { label: 'Prison Rep', value: 95 }, { label: 'Stock Tips', value: 85 }], 
    rarity: 'silver', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Martha_Stewart_2024.jpg/220px-Martha_Stewart_2024.jpg'
  },
  { 
    name: 'Mike Tyson', 
    nickname: 'Ear Collector', 
    stats: [{ label: 'Punching', value: 100 }, { label: 'Ear Biting', value: 95 }, { label: 'Pigeon Care', value: 99 }], 
    rarity: 'silver', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mike_Tyson_2019_by_Glenn_Francis.jpg/220px-Mike_Tyson_2019_by_Glenn_Francis.jpg'
  },
  { 
    name: 'Weird Al', 
    nickname: 'Outlasted Them All', 
    stats: [{ label: 'Parodies', value: 100 }, { label: 'Relevance', value: 95 }, { label: 'Wholesome', value: 100 }], 
    rarity: 'silver', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/%22Weird_Al%22_Yankovic_in_2018.jpg/220px-%22Weird_Al%22_Yankovic_in_2018.jpg'
  },

  // BRONZE (35%) - The everyday legends
  { 
    name: 'The Rock', 
    nickname: 'Cant Stop Working', 
    stats: [{ label: 'Wake Up Time', value: 100 }, { label: 'Movie Variety', value: 30 }, { label: 'Eyebrow', value: 99 }], 
    rarity: 'bronze', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/220px-Dwayne_Johnson_2014_%28cropped%29.jpg'
  },
  { 
    name: 'Joe Rogan', 
    nickname: 'Have You Tried', 
    stats: [{ label: 'Podcast Length', value: 100 }, { label: 'Height', value: 40 }, { label: 'Elk Consumed', value: 99 }], 
    rarity: 'bronze', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Joe_Rogan_in_2019.jpg/220px-Joe_Rogan_in_2019.jpg'
  },
  { 
    name: 'Post Malone', 
    nickname: 'Face Tattoo Math', 
    stats: [{ label: 'Music', value: 85 }, { label: 'Hygiene Rumors', value: 60 }, { label: 'Beer Pong', value: 100 }], 
    rarity: 'bronze', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Post_Malone_2018.png/220px-Post_Malone_2018.png'
  },
  { 
    name: 'DJ Khaled', 
    nickname: 'Another One', 
    stats: [{ label: 'Keys', value: 100 }, { label: 'Suffering', value: 99 }, { label: 'Actual DJing', value: 25 }], 
    rarity: 'bronze', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/DJ_Khaled_2021.jpg/220px-DJ_Khaled_2021.jpg'
  },
  { 
    name: 'Elon Musk', 
    nickname: 'Reply Guy', 
    stats: [{ label: 'Posting', value: 100 }, { label: 'Touch Grass', value: 5 }, { label: 'Child Names', value: 0 }], 
    rarity: 'bronze', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/220px-Elon_Musk_Royal_Society_%28crop2%29.jpg'
  },
  { 
    name: 'Mark Zuckerberg', 
    nickname: 'Definitely Human', 
    stats: [{ label: 'Data Harvested', value: 100 }, { label: 'Blinking', value: 15 }, { label: 'Sweet Baby Rays', value: 99 }], 
    rarity: 'bronze', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/220px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg'
  },
  { 
    name: 'Jeff Bezos', 
    nickname: 'Bathroom Breaks', 
    stats: [{ label: 'Wealth', value: 100 }, { label: 'Worker Comfort', value: 0 }, { label: 'Space Cowboy', value: 85 }], 
    rarity: 'bronze', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg/220px-Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg'
  },
  { 
    name: 'Arnold Schwarzenegger', 
    nickname: 'Ill Be Back', 
    stats: [{ label: 'Muscles', value: 95 }, { label: 'Pronunciation', value: 60 }, { label: 'Governating', value: 70 }], 
    rarity: 'bronze', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg/220px-Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg'
  },
  { 
    name: 'Ozzy Osbourne', 
    nickname: 'Medical Marvel', 
    stats: [{ label: 'Survival', value: 100 }, { label: 'Enunciation', value: 10 }, { label: 'Bats Bitten', value: 95 }], 
    rarity: 'bronze', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Ozzy_Osbourne_2020_%28cropped%29.jpg/220px-Ozzy_Osbourne_2020_%28cropped%29.jpg'
  },
  { 
    name: 'Flavor Flav', 
    nickname: 'Yeah Boyyyy', 
    stats: [{ label: 'Hype', value: 100 }, { label: 'Clock Size', value: 99 }, { label: 'Punctuality', value: 50 }], 
    rarity: 'bronze', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Flavor_Flav_2018.jpg/220px-Flavor_Flav_2018.jpg'
  },
  { 
    name: 'Hulk Hogan', 
    nickname: 'Brother Brother', 
    stats: [{ label: 'Wrestling', value: 90 }, { label: 'Brother Count', value: 100 }, { label: 'Gawker Killer', value: 99 }], 
    rarity: 'bronze', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Hulk_Hogan_2017.jpg/220px-Hulk_Hogan_2017.jpg'
  },
  { 
    name: 'Charlie Sheen', 
    nickname: 'Winning', 
    stats: [{ label: 'Tiger Blood', value: 100 }, { label: 'Career Moves', value: 10 }, { label: 'Goddesses', value: 95 }], 
    rarity: 'bronze', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Charlie_Sheen_2012.jpg/220px-Charlie_Sheen_2012.jpg'
  },
  { 
    name: 'Gary Busey', 
    nickname: 'No Helmet', 
    stats: [{ label: 'Intensity', value: 100 }, { label: 'Teeth', value: 95 }, { label: 'Normal Behavior', value: 5 }], 
    rarity: 'bronze', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Gary_Busey_2009_%28cropped%29.jpg/220px-Gary_Busey_2009_%28cropped%29.jpg'
  },
  { 
    name: 'Tommy Wiseau', 
    nickname: 'Oh Hi Mark', 
    stats: [{ label: 'Acting', value: 20 }, { label: 'Confidence', value: 100 }, { label: 'Origin Story', value: 0 }], 
    rarity: 'bronze', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Tommy_Wiseau_by_Gage_Skidmore.jpg/220px-Tommy_Wiseau_by_Gage_Skidmore.jpg'
  },
];

// Rarity weights
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
    
    if (randomCard && !result.find(c => c.name === randomCard.name)) {
      result.push(randomCard);
    } else {
      i--;
    }
  }
  
  return result;
}

// Image component with fallback to initials
function CardImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    // Show initials fallback
    const initials = alt.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
        <span className="text-4xl font-bold text-slate-400">{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover object-[center_15%]"
      onError={() => setHasError(true)}
      referrerPolicy="no-referrer"
    />
  );
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
    setHoveredCard(null);
    
    setTimeout(() => setIsRevealed(true), 500);
  };

  const selectCard = (card: PresetCard) => {
    if (showConfirmation) return;
    setSelectedCard(card);
  };

  const confirmSelection = () => {
    if (!selectedCard) return;
    
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
    setTimeout(() => {
      setShowConfirmation(false);
      setPackCards([]);
      setSelectedCard(null);
    }, 2000);
  };

  const getRarityGlow = (rarity: string) => {
    const glows: Record<string, string> = {
      bronze: '0 0 30px rgba(205, 127, 50, 0.6)',
      silver: '0 0 35px rgba(192, 192, 192, 0.7)',
      gold: '0 0 45px rgba(255, 215, 0, 0.8)',
      legendary: '0 0 60px rgba(255, 69, 0, 0.9)',
      holo: '0 0 50px rgba(255, 0, 255, 0.7)',
      glitch: '0 0 60px rgba(0, 255, 255, 0.9), 0 0 100px rgba(255, 0, 255, 0.6)',
    };
    return glows[rarity] || '';
  };

  const getRarityGradient = (rarity: string) => {
    const gradients: Record<string, string> = {
      bronze: 'linear-gradient(135deg, #CD7F32 0%, #8B4513 50%, #CD7F32 100%)',
      silver: 'linear-gradient(135deg, #C0C0C0 0%, #808080 50%, #C0C0C0 100%)',
      gold: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
      legendary: 'linear-gradient(135deg, #FF4500 0%, #FF6347 50%, #FF4500 100%)',
      holo: 'linear-gradient(135deg, #FF00FF 0%, #00FFFF 25%, #FF00FF 50%, #00FFFF 75%, #FF00FF 100%)',
      glitch: 'linear-gradient(135deg, #00FFFF 0%, #FF00FF 25%, #00FF00 50%, #FF00FF 75%, #00FFFF 100%)',
    };
    return gradients[rarity] || gradients.bronze;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Card Packs
          </h1>
          <p className="text-slate-400">Open packs, pick your favorite card</p>
        </div>

        {/* Stats Bar */}
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

        {/* Main Content */}
        {packCards.length === 0 ? (
          <div className="flex flex-col items-center gap-6">
            <motion.button
              onClick={openPack}
              disabled={packsRemaining <= 0}
              whileHover={packsRemaining > 0 ? { scale: 1.05 } : {}}
              whileTap={packsRemaining > 0 ? { scale: 0.95 } : {}}
              className={`relative px-12 py-6 rounded-2xl font-bold text-xl transition-all ${
                packsRemaining > 0
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span className="flex items-center gap-3">
                <Package className="w-6 h-6" />
                {packsRemaining > 0 ? 'Open Pack' : 'No Packs Available'}
              </span>
            </motion.button>

            {packsRemaining <= 0 && timeLeft && (
              <p className="text-slate-400">New packs in {timeLeft}</p>
            )}

            <Link
              href="/my-cards"
              className="text-purple-400 hover:text-purple-300 flex items-center gap-2 transition-colors"
            >
              View My Collection →
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center text-white">
              {showConfirmation ? '✨ Card Added!' : 'Choose One Card'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              <AnimatePresence>
                {packCards.map((card, index) => {
                  const isSelected = selectedCard?.name === card.name;
                  const isHovered = hoveredCard === card.name;
                  const otherSelected = selectedCard && !isSelected;

                  return (
                    <motion.div
                      key={card.name}
                      initial={{ rotateY: 180, opacity: 0, y: 50 }}
                      animate={isRevealed ? { 
                        rotateY: 0, 
                        opacity: otherSelected ? 0.4 : 1, 
                        y: isSelected ? -20 : isHovered ? -12 : 0,
                        scale: isSelected ? 1.05 : isHovered ? 1.03 : otherSelected ? 0.95 : 1,
                      } : {}}
                      transition={{ 
                        delay: index * 0.15, 
                        duration: 0.5,
                        y: { duration: 0.2, ease: "easeOut" },
                        scale: { duration: 0.2, ease: "easeOut" },
                        opacity: { duration: 0.2 },
                      }}
                      onClick={() => selectCard(card)}
                      onMouseEnter={() => !showConfirmation && setHoveredCard(card.name)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className="cursor-pointer"
                    >
                      {/* Card Container */}
                      <motion.div
                        className="relative rounded-2xl overflow-hidden aspect-[3/4]"
                        animate={{
                          boxShadow: isSelected 
                            ? getRarityGlow(card.rarity)
                            : isHovered 
                              ? `0 25px 50px rgba(0,0,0,0.5), ${getRarityGlow(card.rarity)}`
                              : '0 10px 30px rgba(0,0,0,0.3)',
                        }}
                        transition={{ duration: 0.2 }}
                        style={{ background: getRarityGradient(card.rarity) }}
                      >
                        {/* Animated border glow on hover */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl pointer-events-none"
                          animate={{
                            boxShadow: isHovered || isSelected
                              ? `inset 0 0 30px ${getRarityColor(card.rarity)}40`
                              : 'inset 0 0 0px transparent',
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Card Inner */}
                        <div className="absolute inset-[3px] bg-slate-900 rounded-xl overflow-hidden flex flex-col">
                          {/* Image Container */}
                          <div className="relative h-[55%] overflow-hidden">
                            <CardImage src={card.image} alt={card.name} />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                            {/* Rarity badge */}
                            <div 
                              className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm"
                              style={{ 
                                background: `${getRarityColor(card.rarity)}33`,
                                color: getRarityColor(card.rarity),
                                border: `1px solid ${getRarityColor(card.rarity)}66`,
                              }}
                            >
                              {card.rarity}
                            </div>
                          </div>
                          
                          {/* Info Section */}
                          <div className="flex-1 p-4 flex flex-col -mt-6 relative z-10">
                            <div className="mb-3">
                              <h3 className="font-bold text-white text-lg leading-tight">{card.name}</h3>
                              <p className="text-slate-400 text-sm italic">"{card.nickname}"</p>
                            </div>
                            
                            {/* Stats with animated bars */}
                            <div className="space-y-2 flex-1">
                              {card.stats.map((stat, i) => (
                                <div key={i} className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">{stat.label}</span>
                                    <span 
                                      className="font-bold"
                                      style={{ 
                                        color: stat.value > 80 ? '#22c55e' : stat.value > 50 ? '#eab308' : stat.value > 20 ? '#f97316' : '#ef4444'
                                      }}
                                    >
                                      {stat.value}
                                    </span>
                                  </div>
                                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                      className="h-full rounded-full"
                                      initial={{ width: 0 }}
                                      animate={isRevealed ? { width: `${stat.value}%` } : {}}
                                      transition={{ delay: index * 0.15 + 0.5 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                                      style={{ 
                                        background: stat.value > 80 
                                          ? 'linear-gradient(90deg, #22c55e, #10b981)' 
                                          : stat.value > 50 
                                            ? 'linear-gradient(90deg, #eab308, #f59e0b)'
                                            : stat.value > 20
                                              ? 'linear-gradient(90deg, #f97316, #ef4444)'
                                              : 'linear-gradient(90deg, #ef4444, #dc2626)'
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Selected checkmark */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute top-3 left-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50"
                            >
                              <Check className="w-6 h-6 text-white" />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Glitch effect for glitch rarity */}
                        {card.rarity === 'glitch' && (
                          <motion.div
                            className="absolute inset-0 pointer-events-none mix-blend-overlay"
                            animate={{
                              background: [
                                'transparent',
                                'rgba(0,255,255,0.15)',
                                'transparent',
                                'rgba(255,0,255,0.15)',
                                'transparent',
                              ],
                            }}
                            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1.5 }}
                          />
                        )}

                        {/* Holo shimmer effect */}
                        {card.rarity === 'holo' && (isHovered || isSelected) && (
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 55%, transparent 60%)',
                            }}
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                          />
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Confirm Button */}
            <AnimatePresence>
              {selectedCard && !showConfirmation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-center pt-4"
                >
                  <motion.button
                    onClick={confirmSelection}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold text-white text-lg shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-shadow flex items-center gap-3"
                  >
                    <Check className="w-5 h-5" />
                    Add {selectedCard.name} to Collection
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Confirmation sparkles */}
            {showConfirmation && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-center"
              >
                <Sparkles className="w-16 h-16 text-yellow-400 animate-pulse" />
              </motion.div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 flex justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white font-medium transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Card Creator
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
