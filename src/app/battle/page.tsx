'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Trophy, Zap, Users, ChevronRight, Home, RotateCcw, Crown, Skull, Star, Package, Check, User } from 'lucide-react';
import Link from 'next/link';
import { useCardCollection } from '@/store/store';
import { Card } from '@/types/schema';

// ============================================
// PRESET CARDS DATABASE (same as packs)
// ============================================

interface PresetCard {
  name: string;
  nickname: string;
  stats: { label: string; value: number }[];
  rarity: 'bronze' | 'silver' | 'gold' | 'legendary' | 'holo' | 'glitch';
  image: string;
  overallRating: number;
}

const PRESET_CARDS: PresetCard[] = [
  // GLITCH (1%)
  { name: 'Florida Man', nickname: 'Headlines Daily', stats: [{ label: 'Mugshot Angles', value: 99 }, { label: 'Impulse Control', value: 2 }, { label: 'Gator Wrangling', value: 94 }], rarity: 'glitch', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Flstatehood.jpg/220px-Flstatehood.jpg', overallRating: 65 },
  { name: 'Harambe', nickname: 'Never Forget', stats: [{ label: 'Innocence', value: 100 }, { label: 'Zoo Design', value: 0 }, { label: 'Cultural Impact', value: 99 }], rarity: 'glitch', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Gorilla_gorilla_gorilla8.jpg/320px-Gorilla_gorilla_gorilla8.jpg', overallRating: 66 },
  { name: 'Killdozer', nickname: 'Reasonable Response', stats: [{ label: 'Welding', value: 100 }, { label: 'Conflict Resolution', value: 3 }, { label: 'Property Values', value: 0 }], rarity: 'glitch', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Caterpillar_D9T_crawler_tractor.jpg/320px-Caterpillar_D9T_crawler_tractor.jpg', overallRating: 34 },

  // HOLO (4%)
  { name: 'Nikola Tesla', nickname: 'Died Broke & Right', stats: [{ label: 'Inventions Stolen', value: 99 }, { label: 'Business Acumen', value: 4 }, { label: 'Pigeon Love', value: 100 }], rarity: 'holo', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/N.Tesla.JPG/220px-N.Tesla.JPG', overallRating: 68 },
  { name: 'Bruce Lee', nickname: 'Be Water', stats: [{ label: 'One Inch Punch', value: 100 }, { label: 'Films Finished', value: 45 }, { label: 'Philosophy', value: 97 }], rarity: 'holo', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Bruce_Lee_Ed_Parker_1967.jpg/220px-Bruce_Lee_Ed_Parker_1967.jpg', overallRating: 81 },
  { name: 'Hunter S. Thompson', nickname: 'Buy The Ticket', stats: [{ label: 'Gonzo', value: 100 }, { label: 'Liver Function', value: 8 }, { label: 'Deadlines Met', value: 35 }], rarity: 'holo', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Hunter_S._Thompson%2C_Las_Vegas_1971.jpg/220px-Hunter_S._Thompson%2C_Las_Vegas_1971.jpg', overallRating: 48 },
  { name: 'Rasputin', nickname: 'Hard to Kill', stats: [{ label: 'Dying', value: 3 }, { label: 'Influence', value: 96 }, { label: 'Beard Game', value: 100 }], rarity: 'holo', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Grigori_Rasputin_1916.jpg/220px-Grigori_Rasputin_1916.jpg', overallRating: 66 },
  { name: 'Diogenes', nickname: 'Behold, A Man', stats: [{ label: 'F*cks Given', value: 0 }, { label: 'Barrel Living', value: 100 }, { label: 'Public Decency', value: 5 }], rarity: 'holo', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_Diogenes_-_Walters_37131.jpg/300px-Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_Diogenes_-_Walters_37131.jpg', overallRating: 35 },

  // LEGENDARY (10%)
  { name: 'Genghis Khan', nickname: 'Your Ancestor', stats: [{ label: 'Conquest', value: 100 }, { label: 'Descendants', value: 100 }, { label: 'Mercy', value: 2 }], rarity: 'legendary', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/YuanEmperorAlbumGenghisPortrait.jpg/220px-YuanEmperorAlbumGenghisPortrait.jpg', overallRating: 67 },
  { name: 'Cleopatra', nickname: 'Not About Looks', stats: [{ label: 'Languages', value: 95 }, { label: 'Empire Saved', value: 40 }, { label: 'Romans Collected', value: 100 }], rarity: 'legendary', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Kleopatra-VII.-Altes-Museum-Berlin1.jpg/220px-Kleopatra-VII.-Altes-Museum-Berlin1.jpg', overallRating: 78 },
  { name: 'Leonardo da Vinci', nickname: 'ADHD King', stats: [{ label: 'Started Projects', value: 100 }, { label: 'Finished Projects', value: 25 }, { label: 'Centuries Ahead', value: 99 }], rarity: 'legendary', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Francesco_Melzi_-_Portrait_of_Leonardo.png/220px-Francesco_Melzi_-_Portrait_of_Leonardo.png', overallRating: 75 },
  { name: 'Sun Tzu', nickname: 'LinkedIn Influencer', stats: [{ label: 'Strategy', value: 100 }, { label: 'Misquoted', value: 99 }, { label: 'May Not Exist', value: 50 }], rarity: 'legendary', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Erta_Sunzi.jpg/220px-Erta_Sunzi.jpg', overallRating: 83 },
  { name: 'Julius Caesar', nickname: 'Trust Issues', stats: [{ label: 'Leadership', value: 97 }, { label: 'Friend Selection', value: 8 }, { label: 'Salad Legacy', value: 0 }], rarity: 'legendary', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Rimini083.jpg/220px-Rimini083.jpg', overallRating: 35 },
  { name: 'Frederick Douglass', nickname: 'Self-Made Legend', stats: [{ label: 'Oratory', value: 100 }, { label: 'Escape Artist', value: 95 }, { label: 'Photo Game', value: 99 }], rarity: 'legendary', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Frederick_Douglass_portrait.jpg/220px-Frederick_Douglass_portrait.jpg', overallRating: 98 },

  // GOLD (20%)
  { name: 'Muhammad Ali', nickname: 'Talks the Talk', stats: [{ label: 'Boxing', value: 98 }, { label: 'Humility', value: 15 }, { label: 'Proved It', value: 100 }], rarity: 'gold', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/220px-Muhammad_Ali_NYWTS.jpg', overallRating: 71 },
  { name: 'Bob Ross', nickname: 'No Mistakes', stats: [{ label: 'Happy Trees', value: 100 }, { label: 'Indoor Voice', value: 100 }, { label: 'Got Screwed', value: 90 }], rarity: 'gold', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Bob_at_Easel.jpg/220px-Bob_at_Easel.jpg', overallRating: 97 },
  { name: 'Steve Irwin', nickname: 'Crikey Forever', stats: [{ label: 'Animal Love', value: 100 }, { label: 'Personal Space', value: 5 }, { label: 'Khaki Drip', value: 95 }], rarity: 'gold', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Steve_Irwin.jpg/220px-Steve_Irwin.jpg', overallRating: 67 },
  { name: 'Freddie Mercury', nickname: 'The Show', stats: [{ label: 'Vocal Range', value: 100 }, { label: 'Stage Presence', value: 100 }, { label: 'Cats Owned', value: 95 }], rarity: 'gold', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Freddie_Mercury_1985.jpg/220px-Freddie_Mercury_1985.jpg', overallRating: 98 },
  { name: 'Mr. Rogers', nickname: 'Actual Saint', stats: [{ label: 'Kindness', value: 100 }, { label: 'Cardigan Game', value: 99 }, { label: 'Senate W', value: 100 }], rarity: 'gold', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Fred_Rogers%2C_late_1960s.jpg/220px-Fred_Rogers%2C_late_1960s.jpg', overallRating: 100 },
  { name: 'Teddy Roosevelt', nickname: 'Shot Mid-Speech', stats: [{ label: 'Toughness', value: 100 }, { label: 'Trust Busting', value: 95 }, { label: 'Kept Talking', value: 100 }], rarity: 'gold', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Theodore_Roosevelt_by_the_Pach_Bros.jpg/220px-Theodore_Roosevelt_by_the_Pach_Bros.jpg', overallRating: 98 },
  { name: 'Marie Curie', nickname: 'Glowing Review', stats: [{ label: 'Nobel Prizes', value: 100 }, { label: 'Safety Gear', value: 10 }, { label: 'Still Radioactive', value: 95 }], rarity: 'gold', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/220px-Marie_Curie_c1920.jpg', overallRating: 68 },
  { name: 'Harriet Tubman', nickname: 'Never Lost One', stats: [{ label: 'Navigation', value: 100 }, { label: 'Trips Made', value: 95 }, { label: 'On the $20', value: 0 }], rarity: 'gold', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Harriet_Tubman_c1868-69.jpg/220px-Harriet_Tubman_c1868-69.jpg', overallRating: 65 },

  // SILVER (30%)
  { name: 'Gordon Ramsay', nickname: 'Its F*cking Raw', stats: [{ label: 'Cooking', value: 95 }, { label: 'Volume Control', value: 5 }, { label: 'Lamb Sauce', value: 0 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Gordon_Ramsay.jpg/220px-Gordon_Ramsay.jpg', overallRating: 33 },
  { name: 'Nicolas Cage', nickname: 'Yes To Everything', stats: [{ label: 'Range', value: 100 }, { label: 'Script Reading', value: 20 }, { label: 'Bees Avoided', value: 0 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Nicolas_Cage_2011_CC.jpg/220px-Nicolas_Cage_2011_CC.jpg', overallRating: 40 },
  { name: 'Danny DeVito', nickname: 'Started Blasting', stats: [{ label: 'Comedy', value: 95 }, { label: 'Height', value: 15 }, { label: 'Egg Offers', value: 100 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Danny_DeVito_by_Gage_Skidmore.jpg/220px-Danny_DeVito_by_Gage_Skidmore.jpg', overallRating: 70 },
  { name: 'Snoop Dogg', nickname: 'Fo Shizzle', stats: [{ label: 'Flow', value: 94 }, { label: 'Cooking Shows', value: 90 }, { label: 'Martha BFF', value: 100 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Snoop_Dogg_2019_by_Glenn_Francis.jpg/220px-Snoop_Dogg_2019_by_Glenn_Francis.jpg', overallRating: 95 },
  { name: 'Keanu Reeves', nickname: 'Too Pure', stats: [{ label: 'Kindness', value: 100 }, { label: 'Aging', value: 0 }, { label: 'Bench Sitting', value: 95 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Keanu_Reeves_2023.jpg/220px-Keanu_Reeves_2023.jpg', overallRating: 65 },
  { name: 'Guy Fieri', nickname: 'Mayor of Flavortown', stats: [{ label: 'Donkey Sauce', value: 100 }, { label: 'Hair Gel', value: 99 }, { label: 'Diners Found', value: 95 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Guy_Fieri_at_Guantanamo_2.jpg/220px-Guy_Fieri_at_Guantanamo_2.jpg', overallRating: 98 },
  { name: 'Shaq', nickname: 'Kazaam', stats: [{ label: 'Basketball', value: 96 }, { label: 'Free Throws', value: 25 }, { label: 'Ads Done', value: 100 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Shaquille_O%27Neal_in_2023.jpg/220px-Shaquille_O%27Neal_in_2023.jpg', overallRating: 74 },
  { name: 'Martha Stewart', nickname: 'Did Her Time', stats: [{ label: 'Crafts', value: 98 }, { label: 'Prison Rep', value: 95 }, { label: 'Stock Tips', value: 85 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Martha_Stewart_2024.jpg/220px-Martha_Stewart_2024.jpg', overallRating: 93 },
  { name: 'Mike Tyson', nickname: 'Ear Collector', stats: [{ label: 'Punching', value: 100 }, { label: 'Ear Biting', value: 95 }, { label: 'Pigeon Care', value: 99 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mike_Tyson_2019_by_Glenn_Francis.jpg/220px-Mike_Tyson_2019_by_Glenn_Francis.jpg', overallRating: 98 },
  { name: 'Weird Al', nickname: 'Outlasted Them All', stats: [{ label: 'Parodies', value: 100 }, { label: 'Relevance', value: 95 }, { label: 'Wholesome', value: 100 }], rarity: 'silver', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/%22Weird_Al%22_Yankovic_in_2018.jpg/220px-%22Weird_Al%22_Yankovic_in_2018.jpg', overallRating: 98 },

  // BRONZE (35%)
  { name: 'The Rock', nickname: 'Cant Stop Working', stats: [{ label: 'Wake Up Time', value: 100 }, { label: 'Movie Variety', value: 30 }, { label: 'Eyebrow', value: 99 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/220px-Dwayne_Johnson_2014_%28cropped%29.jpg', overallRating: 76 },
  { name: 'Joe Rogan', nickname: 'Have You Tried DMT', stats: [{ label: 'Podcast Length', value: 100 }, { label: 'Height', value: 40 }, { label: 'Elk Consumed', value: 99 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Joe_Rogan_in_2019.jpg/220px-Joe_Rogan_in_2019.jpg', overallRating: 80 },
  { name: 'Post Malone', nickname: 'Face Tattoo Math', stats: [{ label: 'Music', value: 85 }, { label: 'Hygiene Rumors', value: 60 }, { label: 'Beer Pong', value: 100 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Post_Malone_2018.png/220px-Post_Malone_2018.png', overallRating: 82 },
  { name: 'DJ Khaled', nickname: 'Another One', stats: [{ label: 'Keys', value: 100 }, { label: 'Suffering', value: 99 }, { label: 'Actual DJing', value: 25 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/DJ_Khaled_2021.jpg/220px-DJ_Khaled_2021.jpg', overallRating: 75 },
  { name: 'Elon Musk', nickname: 'Reply Guy', stats: [{ label: 'Posting', value: 100 }, { label: 'Touch Grass', value: 5 }, { label: 'Child Names', value: 0 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/220px-Elon_Musk_Royal_Society_%28crop2%29.jpg', overallRating: 35 },
  { name: 'Mark Zuckerberg', nickname: 'Definitely Human', stats: [{ label: 'Data Harvested', value: 100 }, { label: 'Blinking', value: 15 }, { label: 'Sweet Baby Rays', value: 99 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/220px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg', overallRating: 71 },
  { name: 'Jeff Bezos', nickname: 'Bathroom Breaks', stats: [{ label: 'Wealth', value: 100 }, { label: 'Worker Comfort', value: 0 }, { label: 'Space Cowboy', value: 85 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg/220px-Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg', overallRating: 62 },
  { name: 'Arnold Schwarzenegger', nickname: 'Ill Be Back', stats: [{ label: 'Muscles', value: 95 }, { label: 'Pronunciation', value: 60 }, { label: 'Governating', value: 70 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg/220px-Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg', overallRating: 75 },
  { name: 'Ozzy Osbourne', nickname: 'Medical Marvel', stats: [{ label: 'Survival', value: 100 }, { label: 'Enunciation', value: 10 }, { label: 'Bats Bitten', value: 95 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Ozzy_Osbourne_2020_%28cropped%29.jpg/220px-Ozzy_Osbourne_2020_%28cropped%29.jpg', overallRating: 68 },
  { name: 'Flavor Flav', nickname: 'Yeah Boyyyy', stats: [{ label: 'Hype', value: 100 }, { label: 'Clock Size', value: 99 }, { label: 'Punctuality', value: 50 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Flavor_Flav_2018.jpg/220px-Flavor_Flav_2018.jpg', overallRating: 83 },
  { name: 'Hulk Hogan', nickname: 'Brother Brother', stats: [{ label: 'Wrestling', value: 90 }, { label: 'Brother Count', value: 100 }, { label: 'Gawker Killer', value: 99 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Hulk_Hogan_2017.jpg/220px-Hulk_Hogan_2017.jpg', overallRating: 96 },
  { name: 'Charlie Sheen', nickname: 'Winning', stats: [{ label: 'Tiger Blood', value: 100 }, { label: 'Career Moves', value: 10 }, { label: 'Goddesses', value: 95 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Charlie_Sheen_2012.jpg/220px-Charlie_Sheen_2012.jpg', overallRating: 68 },
  { name: 'Gary Busey', nickname: 'No Helmet', stats: [{ label: 'Intensity', value: 100 }, { label: 'Teeth', value: 95 }, { label: 'Normal Behavior', value: 5 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Gary_Busey_2009_%28cropped%29.jpg/220px-Gary_Busey_2009_%28cropped%29.jpg', overallRating: 67 },
  { name: 'Tommy Wiseau', nickname: 'Oh Hi Mark', stats: [{ label: 'Acting', value: 20 }, { label: 'Confidence', value: 100 }, { label: 'Origin Story', value: 0 }], rarity: 'bronze', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Tommy_Wiseau_by_Gage_Skidmore.jpg/220px-Tommy_Wiseau_by_Gage_Skidmore.jpg', overallRating: 40 },
];

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
    color: 'from-pink-400 to-rose-500',
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
  excludeNames: string[]
): PresetCard[] {
  // Difficulty affects target OVR
  const ovrAdjust = difficulty === 'easy' ? -10 : difficulty === 'hard' ? 10 : 0;
  const targetOVR = Math.max(30, Math.min(95, playerAvgOVR + ovrAdjust));
  
  // Filter out cards already on player's team
  const available = PRESET_CARDS.filter(c => !excludeNames.includes(c.name));
  
  // Sort by how close they are to target OVR
  const sorted = [...available].sort((a, b) => 
    Math.abs(a.overallRating - targetOVR) - Math.abs(b.overallRating - targetOVR)
  );
  
  // Pick cards, trying to get close to target average
  const selected: PresetCard[] = [];
  let currentSum = 0;
  
  // First pass: pick cards close to target
  for (const card of sorted) {
    if (selected.length >= slots) break;
    if (!selected.find(c => c.name === card.name)) {
      selected.push(card);
      currentSum += card.overallRating;
    }
  }
  
  // Fill remaining slots if needed
  while (selected.length < slots) {
    const remaining = available.filter(c => !selected.find(s => s.name === c.name));
    if (remaining.length === 0) break;
    const pick = remaining[Math.floor(Math.random() * remaining.length)];
    selected.push(pick);
  }
  
  // Shuffle for variety
  return selected.sort(() => Math.random() - 0.5);
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
  isSport: boolean
): PlayerBoxScore[] {
  return cards.map(card => {
    const ovr = 'overallRating' in card ? card.overallRating : 50;
    const baseMultiplier = ovr / 100;
    
    const stats = categories.map(cat => {
      let value: number;
      const rand = Math.random();
      
      if (isSport) {
        if (cat.name === 'PTS') value = Math.round((rand * 25 + 5) * baseMultiplier);
        else if (cat.name === 'REB') value = Math.round((rand * 12 + 2) * baseMultiplier);
        else if (cat.name === 'AST') value = Math.round((rand * 10 + 1) * baseMultiplier);
        else if (cat.name === 'Goals') value = rand < baseMultiplier * 0.35 ? Math.ceil(rand * 2) : 0;
        else if (cat.name === 'Assists') value = rand < baseMultiplier * 0.4 ? Math.ceil(rand * 2) : 0;
        else if (cat.name === 'Saves') value = Math.round((rand * 6) * baseMultiplier);
        else if (cat.name === 'TD') value = rand < baseMultiplier * 0.45 ? Math.ceil(rand * 2) : 0;
        else if (cat.name === 'YDS') value = Math.round((rand * 120 + 15) * baseMultiplier);
        else if (cat.name === 'INT') value = rand < (1 - baseMultiplier) * 0.35 ? 1 : 0;
        else value = Math.round(rand * 15 * baseMultiplier);
      } else {
        // Satirical - values that make sense for each category
        if (cat.name === 'Aux Mins') value = Math.round((rand * 45 + 15) * baseMultiplier);
        else if (cat.name === 'Pee Breaks') value = Math.round((rand * 4) * (1.2 - baseMultiplier));
        else if (cat.name === 'Wrong Turns') value = Math.round((rand * 3) * (1.2 - baseMultiplier));
        else if (cat.name === 'Venmo Speed') value = Math.round(100 * baseMultiplier - rand * 20);
        else if (cat.name === 'Salad Claims') value = rand < (1 - baseMultiplier) * 0.4 ? 1 : 0;
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
        else if (cat.name === 'Dumb Deaths') value = rand < (1 - baseMultiplier) * 0.4 ? 1 : 0;
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

export default function BattlePage() {
  const { cards } = useCardCollection();
  const packCards = getPackCards(cards);
  
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [opponentTeam, setOpponentTeam] = useState<PresetCard[]>([]);
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [battlePhase, setBattlePhase] = useState<'select' | 'lineup' | 'preview' | 'battle' | 'result'>('select');

  const proceedToPreview = () => {
    if (!selectedScenario || selectedCards.length !== selectedScenario.slots) return;
    
    const playerAvgOVR = selectedCards.reduce((s, c) => s + c.overallRating, 0) / selectedCards.length;
    const excludeNames = selectedCards.map(c => c.name);
    const opponents = generateOpponentTeam(selectedScenario.slots, playerAvgOVR, difficulty, excludeNames);
    
    setOpponentTeam(opponents);
    setBattlePhase('preview');
  };

  const startBattle = () => {
    if (!selectedScenario) return;
    setBattlePhase('battle');
    
    setTimeout(() => {
      const playerBoxScores = generateBoxScore(selectedCards, selectedScenario.scoring.categories, selectedScenario.isSport);
      const opponentBoxScores = generateBoxScore(opponentTeam, selectedScenario.scoring.categories, selectedScenario.isSport);
      
      const playerTotal = calculateTeamTotal(playerBoxScores, selectedScenario.scoring.categories);
      const opponentTotal = calculateTeamTotal(opponentBoxScores, selectedScenario.scoring.categories);
      
      const playerChemistry = calculateChemistry(selectedCards, selectedScenario.scoring.chemistryBonuses);
      const opponentChemistry = calculateChemistry(opponentTeam, selectedScenario.scoring.chemistryBonuses);
      
      const playerFinal = playerTotal + playerChemistry.total;
      const opponentFinal = opponentTotal + opponentChemistry.total;
      
      // Find MVP
      const allBoxScores = [...playerBoxScores, ...opponentBoxScores];
      const mvpData = allBoxScores.reduce((best, ps) => {
        const total = ps.stats.reduce((sum, s) => sum + s.value, 0);
        return total > best.total ? { total, ps } : best;
      }, { total: 0, ps: allBoxScores[0] });
      
      const topStat = mvpData.ps.stats.sort((a, b) => b.value - a.value)[0];
      
      setBattleResult({
        playerBoxScores,
        opponentBoxScores,
        playerTotal,
        opponentTotal,
        playerChemistry,
        opponentChemistry,
        playerFinal,
        opponentFinal,
        winner: playerFinal > opponentFinal ? 'player' : playerFinal < opponentFinal ? 'opponent' : 'tie',
        mvp: { card: mvpData.ps.card, highlight: `${topStat.value} ${topStat.category}` },
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
    setOpponentTeam([]);
    setBattleResult(null);
    setBattlePhase('select');
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

            {/* Difficulty */}
            <div className="flex items-center gap-4 justify-center">
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
                <ChevronRight className="w-6 h-6" /> See Opponent
              </motion.button>
            </div>
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
                  <Zap className="w-5 h-5" /> Opponent Squad
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
