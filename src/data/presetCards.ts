// ============================================
// INFINITE SQUADS - PRESET CARDS DATABASE
// Tone: Daniel Tosh / Dry Roast Comedy
// Every card has 6 stats with emojis
// ============================================

import { getImageUrl } from '@/lib/avatar';
import { EXPANSION_A } from '@/data/presetCardsExpansionA';
import { EXPANSION_B } from '@/data/presetCardsExpansionB';
import { EXPANSION_C } from '@/data/presetCardsExpansionC';

export interface PresetCard {
  name: string;
  nickname: string;
  stats: { label: string; value: number; emoji: string }[];
  rarity: 'bronze' | 'silver' | 'gold' | 'legendary' | 'holo' | 'glitch';
  image: string;
}

// Calculate OVR from stats (average, capped at 99)
export function calculateOVR(stats: { value: number }[]): number {
  const validStats = stats.filter(s => typeof s.value === 'number' && !isNaN(s.value));
  if (validStats.length === 0) return 50;
  const sum = validStats.reduce((acc, s) => acc + Math.max(0, Math.min(100, s.value)), 0);
  return Math.min(99, Math.round(sum / validStats.length));
}

export const PRESET_CARDS: PresetCard[] = [
  // ============================================
  // Internet Chaos Icons (rarity is now computed from OVR, see calculateOVR)
  // ============================================
  {
    name: 'Florida Man',
    nickname: 'The Daily Headline',
    stats: [
      { label: 'Mugshot Variety', value: 100, emoji: '📸' },
      { label: 'Impulse Control', value: 21, emoji: '🧠' },
      { label: 'Gator Wrestling', value: 100, emoji: '🐊' },
      { label: 'Meth Lab Safety', value: 26, emoji: '🔥' },
      { label: 'Walmart Incidents', value: 100, emoji: '🛒' },
      { label: 'Clutch in Crisis', value: 88, emoji: '🚨' },
    ],
    rarity: 'silver', image: getImageUrl('Florida Man') },
  {
    name: 'Harambe',
    nickname: 'Gorilla Down',
    stats: [
      { label: 'Innocence', value: 100, emoji: '😇' },
      { label: 'Zoo Fence Design', value: 18, emoji: '🚧' },
      { label: 'Parenting on Display', value: 23, emoji: '👶' },
      { label: 'Cultural Impact', value: 100, emoji: '📈' },
      { label: 'Meme Immortality', value: 100, emoji: '🦍' },
      { label: 'Post Game Strength', value: 96, emoji: '💪' },
    ],
    rarity: 'silver', image: getImageUrl('Harambe') },
  {
    name: 'Killdozer',
    nickname: 'Reasonable Man',
    stats: [
      { label: 'Welding Skill', value: 100, emoji: '🔧' },
      { label: 'Conflict Resolution', value: 18, emoji: '🤝' },
      { label: 'Property Damage', value: 100, emoji: '🏚️' },
      { label: 'Patience', value: 20, emoji: '⏰' },
      { label: 'City Council Relations', value: 18, emoji: '🏛️' },
      { label: 'Interior Presence', value: 90, emoji: '🧱' },
    ],
    rarity: 'bronze', image: getImageUrl('Killdozer') },

  // ============================================
  // Legends With Edge
  // ============================================
  {
    name: 'Nikola Tesla',
    nickname: 'Died Broke & Right',
    stats: [
      { label: 'Inventions Stolen', value: 100, emoji: '💡' },
      { label: 'Business Acumen', value: 10, emoji: '💼' },
      { label: 'Pigeon Romance', value: 100, emoji: '🕊️' },
      { label: 'Edison Hatred', value: 100, emoji: '😤' },
      { label: 'Credit Received', value: 21, emoji: '📜' },
      { label: 'Playmaking IQ', value: 95, emoji: '🧠' },
    ],
    rarity: 'silver', image: getImageUrl('Nikola Tesla') },
  {
    name: 'Diogenes',
    nickname: 'Public Menace',
    stats: [
      { label: 'F*cks Given', value: 6, emoji: '🤷' },
      { label: 'Barrel Living', value: 100, emoji: '🛢️' },
      { label: 'Public Decency', value: 11, emoji: '🚫' },
      { label: 'Alexander Roasting', value: 100, emoji: '🔥' },
      { label: 'Chicken Plucking', value: 100, emoji: '🐔' },
      { label: 'Unguardable Attitude', value: 80, emoji: '🛡️' },
    ],
    rarity: 'silver', image: getImageUrl('Diogenes') },
  {
    name: 'Rasputin',
    nickname: 'Hard To Kill',
    stats: [
      { label: 'Dying Skill', value: 9, emoji: '💀' },
      { label: 'Royal Manipulation', value: 100, emoji: '👑' },
      { label: 'Beard Magnitude', value: 100, emoji: '🧔' },
      { label: 'Poison Resistance', value: 100, emoji: '☠️' },
      { label: 'Drowning Resistance', value: 96, emoji: '🌊' },
      { label: 'Iron Man Durability', value: 99, emoji: '🛡️' },
    ],
    rarity: 'gold', image: getImageUrl('Rasputin') },
  {
    name: 'Hunter S. Thompson',
    nickname: 'Gonzo',
    stats: [
      { label: 'Journalism Ethics', value: 26, emoji: '📰' },
      { label: 'Liver Function', value: 14, emoji: '🫀' },
      { label: 'Deadline Adherence', value: 41, emoji: '⏰' },
      { label: 'Drug Inventory', value: 100, emoji: '💊' },
      { label: 'Shotgun Skills', value: 100, emoji: '🔫' },
      { label: 'Fourth Quarter Chaos', value: 70, emoji: '🌀' },
    ],
    rarity: 'bronze', image: getImageUrl('Hunter S. Thompson') },
  {
    name: 'Yusuf Dilek',
    nickname: 'Turkish Minimalist',
    stats: [
      { label: 'Aura', value: 100, emoji: '🕶️' },
      { label: 'Gear Budget', value: 18, emoji: '📉' },
      { label: 'Hand in Pocket', value: 100, emoji: '👖' },
      { label: 'Vision', value: 100, emoji: '🎯' },
      { label: 'F*cks Given', value: 18, emoji: '🤷' },
      { label: 'Clutch Gene', value: 99, emoji: '🎯' },
    ],
    rarity: 'silver', image: getImageUrl('Yusuf Dilek') },

  // ============================================
  // Actually Impressive
  // ============================================
  {
    name: 'Genghis Khan',
    nickname: 'Your Ancestor',
    stats: [
      { label: 'Conquest', value: 100, emoji: '⚔️' },
      { label: 'Descendants', value: 100, emoji: '👶' },
      { label: 'Mercy Shown', value: 2, emoji: '🙏' },
      { label: 'City Burning', value: 99, emoji: '🔥' },
      { label: 'DNA Distribution', value: 100, emoji: '🧬' },
      { label: 'Fast Break Domination', value: 97, emoji: '🐎' },
    ],
    rarity: 'gold', image: getImageUrl('Genghis Khan') },
  {
    name: 'Cleopatra',
    nickname: 'Not About Looks',
    stats: [
      { label: 'Languages Spoken', value: 95, emoji: '🗣️' },
      { label: 'Roman Collectors', value: 100, emoji: '🇮🇹' },
      { label: 'Empire Saving', value: 40, emoji: '👑' },
      { label: 'Brother Marriage', value: 100, emoji: '💀' },
      { label: 'Snake Handling', value: 5, emoji: '🐍' },
      { label: 'Floor General Presence', value: 93, emoji: '👑' },
    ],
    rarity: 'silver', image: getImageUrl('Cleopatra') },
  {
    name: 'Frederick Douglass',
    nickname: 'Self-Made Legend',
    stats: [
      { label: 'Oratory', value: 100, emoji: '🎤' },
      { label: 'Escape Artistry', value: 95, emoji: '🏃' },
      { label: 'Photo Game', value: 99, emoji: '📸' },
      { label: 'Book Sales', value: 92, emoji: '📚' },
      { label: 'Slave Owner Roasting', value: 100, emoji: '🔥' },
      { label: 'Locker Room Leadership', value: 96, emoji: '🗣️' },
    ],
    rarity: 'legendary', image: getImageUrl('Frederick Douglass') },
  {
    name: 'Sun Tzu',
    nickname: 'LinkedIn Influencer',
    stats: [
      { label: 'Strategy', value: 100, emoji: '🧠' },
      { label: 'Being Misquoted', value: 100, emoji: '❌' },
      { label: 'May Not Exist', value: 62, emoji: '👻' },
      { label: 'Corporate Retreats', value: 100, emoji: '💼' },
      { label: 'Crypto Bro Citations', value: 100, emoji: '📉' },
      { label: 'Playcalling IQ', value: 98, emoji: '🧠' },
    ],
    rarity: 'holo', image: getImageUrl('Sun Tzu') },
  {
    name: 'Bruce Lee',
    nickname: 'Be Water',
    stats: [
      { label: 'One Inch Punch', value: 100, emoji: '👊' },
      { label: 'Films Finished', value: 45, emoji: '🎬' },
      { label: 'Philosophy', value: 97, emoji: '🧘' },
      { label: 'Cardio', value: 99, emoji: '❤️' },
      { label: 'Chuck Norris Superiority', value: 100, emoji: '🥋' },
      { label: 'First Step Quickness', value: 99, emoji: '💨' },
    ],
    rarity: 'gold', image: getImageUrl('Bruce Lee') },
  {
    name: 'Julius Caesar',
    nickname: 'Trust Issues',
    stats: [
      { label: 'Leadership', value: 97, emoji: '👑' },
      { label: 'Friend Selection', value: 8, emoji: '🤝' },
      { label: 'Stab Wound Count', value: 23, emoji: '🔪' },
      { label: 'Salad Legacy', value: 0, emoji: '🥗' },
      { label: 'Last Words Quality', value: 100, emoji: '💬' },
      { label: 'Team Captain Energy', value: 85, emoji: '👑' },
    ],
    rarity: 'bronze', image: getImageUrl('Julius Caesar') },

  // ============================================
  // Solid Legends
  // ============================================
  {
    name: 'Mr. Rogers',
    nickname: 'Actual Saint',
    stats: [
      { label: 'Kindness', value: 100, emoji: '💖' },
      { label: 'Cardigan Collection', value: 99, emoji: '🧥' },
      { label: 'Senate Destruction', value: 100, emoji: '🏛️' },
      { label: 'Neighbor Relations', value: 100, emoji: '🏠' },
      { label: 'Puppetry', value: 95, emoji: '🧸' },
      { label: 'Team Chemistry Booster', value: 100, emoji: '🤝' },
    ],
    rarity: 'legendary', image: getImageUrl('Mr. Rogers') },
  {
    name: 'Bob Ross',
    nickname: 'Happy Accidents',
    stats: [
      { label: 'Happy Trees', value: 100, emoji: '🌲' },
      { label: 'Indoor Voice', value: 100, emoji: '🤫' },
      { label: 'Got Screwed by BRI', value: 95, emoji: '💔' },
      { label: 'Perm Maintenance', value: 99, emoji: '💇' },
      { label: 'Drill Sergeant Past', value: 100, emoji: '🪖' },
      { label: 'Bench Calm Factor', value: 97, emoji: '🧘' },
    ],
    rarity: 'legendary', image: getImageUrl('Bob Ross') },
  {
    name: 'Steve Irwin',
    nickname: 'Crikey Forever',
    stats: [
      { label: 'Animal Love', value: 100, emoji: '🐊' },
      { label: 'Personal Space', value: 5, emoji: '📏' },
      { label: 'Khaki Drip', value: 95, emoji: '👕' },
      { label: 'Stingray Relations', value: 5, emoji: '🦈' },
      { label: 'Australian Energy', value: 100, emoji: '🇦🇺' },
      { label: 'Hustle Plays', value: 96, emoji: '🔥' },
    ],
    rarity: 'silver', image: getImageUrl('Steve Irwin') },
  {
    name: 'Freddie Mercury',
    nickname: 'The Show Must Go On',
    stats: [
      { label: 'Vocal Range', value: 100, emoji: '🎤' },
      { label: 'Stage Presence', value: 100, emoji: '🎭' },
      { label: 'Cat Ownership', value: 95, emoji: '🐱' },
      { label: 'Teeth Coverage', value: 20, emoji: '🦷' },
      { label: 'Mustache Power', value: 99, emoji: '👨' },
      { label: 'Crowd Energy', value: 100, emoji: '🙌' },
    ],
    rarity: 'gold', image: getImageUrl('Freddie Mercury') },
  {
    name: 'Teddy Roosevelt',
    nickname: 'Shot Mid-Speech',
    stats: [
      { label: 'Bullet Absorption', value: 100, emoji: '🔫' },
      { label: 'Trust Busting', value: 95, emoji: '💥' },
      { label: 'Speech Continuation', value: 100, emoji: '🎤' },
      { label: 'Big Stick Energy', value: 99, emoji: '🪵' },
      { label: 'Rough Riding', value: 98, emoji: '🐎' },
      { label: 'Toughness Rating', value: 98, emoji: '🦴' },
    ],
    rarity: 'legendary', image: getImageUrl('Teddy Roosevelt') },
  {
    name: 'Marie Curie',
    nickname: 'Glowing Review',
    stats: [
      { label: 'Nobel Prizes', value: 100, emoji: '🏆' },
      { label: 'Radiation Safety', value: 10, emoji: '☢️' },
      { label: 'Still Radioactive', value: 95, emoji: '💀' },
      { label: 'Glass Ceiling Shattering', value: 99, emoji: '🔨' },
      { label: 'Husband Credit Stealing', value: 0, emoji: '👫' },
      { label: 'Lab-Tested IQ', value: 99, emoji: '🧠' },
    ],
    rarity: 'silver', image: getImageUrl('Marie Curie') },
  {
    name: 'Harriet Tubman',
    nickname: 'Never Lost One',
    stats: [
      { label: 'Navigation', value: 100, emoji: '🧭' },
      { label: 'Trips Completed', value: 95, emoji: '🚶' },
      { label: 'On the $20', value: 0, emoji: '💵' },
      { label: 'Narcolepsy Management', value: 90, emoji: '😴' },
      { label: 'Gun Usage', value: 85, emoji: '🔫' },
      { label: 'Transition Speed', value: 95, emoji: '💨' },
    ],
    rarity: 'silver', image: getImageUrl('Harriet Tubman') },
  {
    name: 'Muhammad Ali',
    nickname: 'The Greatest',
    stats: [
      { label: 'Boxing', value: 98, emoji: '🥊' },
      { label: 'Humility', value: 15, emoji: '🙏' },
      { label: 'Draft Dodging', value: 100, emoji: '✌️' },
      { label: 'Trash Talk', value: 100, emoji: '🗣️' },
      { label: 'Butterfly Floating', value: 99, emoji: '🦋' },
      { label: 'Footwork', value: 98, emoji: '👟' },
    ],
    rarity: 'gold', image: getImageUrl('Muhammad Ali') },

  // ============================================
  // Entertaining Humans
  // ============================================
  {
    name: 'Kianu Reaves',
    nickname: 'Breathtaking',
    stats: [
      { label: 'Kindness', value: 100, emoji: '💖' },
      { label: 'Aging', value: 12, emoji: '👴' },
      { label: 'Sad Bench Sitting', value: 100, emoji: '🪑' },
      { label: 'Gun Training', value: 100, emoji: '🔫' },
      { label: 'Whoa Count', value: 100, emoji: '😮' },
      { label: 'Team Chemistry', value: 90, emoji: '🤝' },
    ],
    rarity: 'gold', image: getImageUrl('Kianu Reaves') },
  {
    name: 'Donny DeVeeto',
    nickname: 'Trash Man',
    stats: [
      { label: 'Height', value: 21, emoji: '📏' },
      { label: 'Egg Offerings', value: 100, emoji: '🥚' },
      { label: 'Blasting Started', value: 100, emoji: '🔫' },
      { label: 'Penguin Energy', value: 100, emoji: '🐧' },
      { label: 'Rum Ham Finding', value: 96, emoji: '🍖' },
      { label: 'Low Post Sneakiness', value: 70, emoji: '😏' },
    ],
    rarity: 'gold', image: getImageUrl('Donny DeVeeto') },
  {
    name: 'Nicolaus Kage',
    nickname: 'Yes To Everything',
    stats: [
      { label: 'Script Reading', value: 32, emoji: '📜' },
      { label: 'Range', value: 100, emoji: '🎭' },
      { label: 'Bee Avoidance', value: 12, emoji: '🐝' },
      { label: 'Declaration Stealing', value: 100, emoji: '📜' },
      { label: 'Financial Decisions', value: 22, emoji: '💸' },
      { label: 'X-Factor Energy', value: 85, emoji: '⚡' },
    ],
    rarity: 'bronze', image: getImageUrl('Nicolaus Kage') },
  {
    name: 'Snoop Doggo',
    nickname: 'Fo Shizzle',
    stats: [
      { label: 'Flow', value: 100, emoji: '🎤' },
      { label: 'Martha Stewart BFF', value: 100, emoji: '👵' },
      { label: 'Smoke Consumption', value: 100, emoji: '🌿' },
      { label: 'Cooking Show Hosting', value: 100, emoji: '🍳' },
      { label: 'Murder Trial Survival', value: 100, emoji: '⚖️' },
      { label: 'Bench Mob Vibes', value: 95, emoji: '😎' },
    ],
    rarity: 'legendary', image: getImageUrl('Snoop Doggo') },
  {
    name: 'Gordo Ramzey',
    nickname: 'Its Raw',
    stats: [
      { label: 'Cooking', value: 100, emoji: '👨‍🍳' },
      { label: 'Volume Control', value: 17, emoji: '📢' },
      { label: 'Lamb Sauce Locating', value: 12, emoji: '🍖' },
      { label: 'Idiot Sandwich Making', value: 100, emoji: '🥪' },
      { label: 'British Insults', value: 100, emoji: '🇬🇧' },
      { label: 'Halftime Speech Intensity', value: 97, emoji: '😤' },
    ],
    rarity: 'silver', image: getImageUrl('Gordo Ramzey') },
  {
    name: 'Shaqster',
    nickname: 'Kazaam',
    stats: [
      { label: 'Basketball', value: 96, emoji: '🏀' },
      { label: 'Free Throws', value: 25, emoji: '🎯' },
      { label: 'Ads Appeared In', value: 100, emoji: '📺' },
      { label: 'Genie Acting', value: 40, emoji: '🧞' },
      { label: 'Charles Barkley Roasting', value: 95, emoji: '🔥' },
      { label: 'Paint Domination', value: 96, emoji: '🏀' },
    ],
    rarity: 'silver', image: getImageUrl('Shaqster') },
  {
    name: 'Marfa Stewhart',
    nickname: 'Did Her Time',
    stats: [
      { label: 'Crafts', value: 98, emoji: '✂️' },
      { label: 'Prison Rep Built', value: 95, emoji: '🔒' },
      { label: 'Insider Trading', value: 85, emoji: '📈' },
      { label: 'Snoop Friendship', value: 100, emoji: '🌿' },
      { label: 'Table Setting', value: 100, emoji: '🍽️' },
      { label: 'Game Plan Precision', value: 92, emoji: '📋' },
    ],
    rarity: 'holo', image: getImageUrl('Marfa Stewhart') },
  {
    name: 'Iron Mike Tyzen',
    nickname: 'Ear Collector',
    stats: [
      { label: 'Punching Power', value: 100, emoji: '👊' },
      { label: 'Ear Consumption', value: 100, emoji: '👂' },
      { label: 'Pigeon Love', value: 100, emoji: '🕊️' },
      { label: 'Lisp Intimidation', value: 96, emoji: '🗣️' },
      { label: 'Face Tattoo Timing', value: 91, emoji: '🎭' },
      { label: 'Knockout Power', value: 99, emoji: '👊' },
    ],
    rarity: 'legendary', image: getImageUrl('Iron Mike Tyzen') },
  {
    name: 'Odd Al',
    nickname: 'Outlasted Them All',
    stats: [
      { label: 'Parody Quality', value: 100, emoji: '🎵' },
      { label: 'Relevance Maintained', value: 100, emoji: '📈' },
      { label: 'Wholesome Energy', value: 100, emoji: '😊' },
      { label: 'Accordion Mastery', value: 100, emoji: '🪗' },
      { label: 'Career Outlasting', value: 100, emoji: '⏰' },
      { label: 'Versatility Rating', value: 93, emoji: '🎸' },
    ],
    rarity: 'legendary', image: getImageUrl('Odd Al') },
  {
    name: 'Guy Fierro',
    nickname: 'Mayor of Flavortown',
    stats: [
      { label: 'Donkey Sauce', value: 100, emoji: '🍔' },
      { label: 'Hair Bleaching', value: 100, emoji: '💇' },
      { label: 'Diner Discovery', value: 100, emoji: '🍽️' },
      { label: 'Shirt Flames', value: 100, emoji: '🔥' },
      { label: 'Sunglasses Backwards', value: 100, emoji: '🕶️' },
      { label: 'Locker Room Flavor', value: 88, emoji: '🔥' },
    ],
    rarity: 'legendary', image: getImageUrl('Guy Fierro') },
  {
    name: 'Bad Luck Brian',
    nickname: 'The Vest',
    stats: [
      { label: 'Sweater Vest Game', value: 100, emoji: '👔' },
      { label: 'Orthodontic Bills', value: 100, emoji: '🦷' },
      { label: 'Winning', value: 18, emoji: '🏆' },
      { label: 'Internet Legacy', value: 100, emoji: '🖥️' },
      { label: 'Virginity Shield', value: 100, emoji: '🛡️' },
      { label: 'Underdog Grit', value: 55, emoji: '🍀' },
    ],
    rarity: 'silver', image: getImageUrl('Bad Luck Brian') },
  {
    name: 'Grimace',
    nickname: 'Purple Enigma',
    stats: [
      { label: 'Taste Buds Killed', value: 100, emoji: '🟣' },
      { label: 'Mets Championship', value: 100, emoji: '⚾' },
      { label: 'Species Ambiguity', value: 100, emoji: '❓' },
      { label: 'Calorie Density', value: 100, emoji: '🍔' },
      { label: 'Shake Sales', value: 100, emoji: '📈' },
      { label: 'Post-Up Mass', value: 90, emoji: '🟣' },
    ],
    rarity: 'legendary', image: getImageUrl('Grimace') },

  // ============================================
  // The Everyday Legends (Roasted)
  // ============================================
  {
    name: 'Elan Muskrat',
    nickname: 'Reply Guy',
    stats: [
      { label: 'Posting Frequency', value: 100, emoji: '🐦' },
      { label: 'Touch Grass', value: 17, emoji: '🌿' },
      { label: 'Child Naming', value: 12, emoji: '👶' },
      { label: 'Funding Secured', value: 62, emoji: '💰' },
      { label: 'Employee Morale', value: 22, emoji: '😢' },
      { label: 'Big Swing Ideas', value: 60, emoji: '🧠' },
    ],
    rarity: 'bronze', image: getImageUrl('Elan Muskrat') },
  {
    name: 'Mark Zuckerbot',
    nickname: 'Definitely Human',
    stats: [
      { label: 'Sunscreen Application', value: 100, emoji: '🧴' },
      { label: 'Human Emotions', value: 12, emoji: '🤖' },
      { label: 'Sweet Baby Ray Display', value: 100, emoji: '📚' },
      { label: 'Data Harvesting', value: 100, emoji: '🕵️' },
      { label: 'Jiu Jitsu', value: 92, emoji: '🥋' },
      { label: 'Algorithmic IQ', value: 90, emoji: '🧠' },
    ],
    rarity: 'gold', image: getImageUrl('Mark Zuckerbot') },
  {
    name: 'Geoff Bezel',
    nickname: 'Bathroom Breaks Denied',
    stats: [
      { label: 'Wealth', value: 100, emoji: '💰' },
      { label: 'Employee Comfort', value: 12, emoji: '🚽' },
      { label: 'Space Cowboy Cosplay', value: 97, emoji: '🤠' },
      { label: 'Head Shine', value: 100, emoji: '✨' },
      { label: 'Yacht Collecting', value: 100, emoji: '🛥️' },
      { label: 'Logistics IQ', value: 95, emoji: '📦' },
    ],
    rarity: 'gold', image: getImageUrl('Geoff Bezel') },
  {
    name: 'The Pebble',
    nickname: 'Eyebrow Cinema',
    stats: [
      { label: 'Wake Up Time', value: 100, emoji: '⏰' },
      { label: 'Movie Role Variety', value: 42, emoji: '🎬' },
      { label: 'Eyebrow Control', value: 100, emoji: '🤨' },
      { label: 'Cheat Meal Documentation', value: 100, emoji: '🍕' },
      { label: 'Tequila Sales', value: 100, emoji: '🥃' },
      { label: 'Locker Room Leadership', value: 96, emoji: '🗣️' },
    ],
    rarity: 'gold', image: getImageUrl('The Pebble') },
  {
    name: 'Joey Rogaine',
    nickname: 'Have You Tried DMT',
    stats: [
      { label: 'Podcast Length', value: 100, emoji: '🎙️' },
      { label: 'Height', value: 40, emoji: '📏' },
      { label: 'Elk Consumption', value: 99, emoji: '🦌' },
      { label: 'Expert Credentials', value: 30, emoji: '🎓' },
      { label: 'Sauna Time', value: 100, emoji: '🧖' },
      { label: 'Broadcast Presence', value: 90, emoji: '🎙️' },
    ],
    rarity: 'silver', image: getImageUrl('Joey Rogaine') },
  {
    name: 'DJ Khaleb',
    nickname: 'Another One',
    stats: [
      { label: 'Instrument Playing', value: 12, emoji: '🎸' },
      { label: 'Shouting Own Name', value: 100, emoji: '📢' },
      { label: 'Jet Ski Navigation', value: 22, emoji: '🌊' },
      { label: 'Wife Oral Relations', value: 12, emoji: '👅' },
      { label: 'Key Possession', value: 100, emoji: '🔑' },
      { label: 'Hype Man Energy', value: 97, emoji: '📢' },
    ],
    rarity: 'bronze', image: getImageUrl('DJ Khaleb') },
  {
    name: 'Tommy Weisau',
    nickname: 'Oh Hi Mark',
    stats: [
      { label: 'Acting Ability', value: 32, emoji: '🎭' },
      { label: 'Confidence Level', value: 100, emoji: '💪' },
      { label: 'Origin Story Clarity', value: 12, emoji: '❓' },
      { label: 'Football Throwing', value: 27, emoji: '🏈' },
      { label: 'Budget Management', value: 17, emoji: '💸' },
      { label: 'Cult Following Factor', value: 60, emoji: '🎬' },
    ],
    rarity: 'bronze', image: getImageUrl('Tommy Weisau') },
  {
    name: 'Gary Buseye',
    nickname: 'No Helmet',
    stats: [
      { label: 'Intensity', value: 100, emoji: '😳' },
      { label: 'Teeth Size', value: 95, emoji: '🦷' },
      { label: 'Normal Behavior', value: 5, emoji: '🤔' },
      { label: 'Motorcycle Helmet Usage', value: 0, emoji: '🏍️' },
      { label: 'Interview Predictability', value: 5, emoji: '🎤' },
      { label: 'Wildcard Intensity', value: 75, emoji: '😳' },
    ],
    rarity: 'bronze', image: getImageUrl('Gary Buseye') },
  {
    name: 'Charlee Sheenz',
    nickname: 'Winning',
    stats: [
      { label: 'Tiger Blood', value: 100, emoji: '🐯' },
      { label: 'Career Preservation', value: 16, emoji: '📉' },
      { label: 'Goddesses Collected', value: 100, emoji: '👯' },
      { label: 'Winning', value: 100, emoji: '🏆' },
      { label: 'Anger Management', value: 21, emoji: '😤' },
      { label: 'Streaky Confidence', value: 65, emoji: '🔥' },
    ],
    rarity: 'silver', image: getImageUrl('Charlee Sheenz') },
  {
    name: 'Flavor Flame',
    nickname: 'Yeah Boyyyy',
    stats: [
      { label: 'Hype Generation', value: 100, emoji: '📢' },
      { label: 'Clock Size', value: 100, emoji: '⏰' },
      { label: 'Punctuality', value: 56, emoji: '🕐' },
      { label: 'Child Support Cases', value: 91, emoji: '👶' },
      { label: 'Reality TV Chaos', value: 100, emoji: '📺' },
      { label: 'Hype Generation', value: 92, emoji: '📢' },
    ],
    rarity: 'gold', image: getImageUrl('Flavor Flame') },
  {
    name: 'Bulk Hogman',
    nickname: 'Brother Brother',
    stats: [
      { label: 'Wrestling', value: 96, emoji: '💪' },
      { label: 'Brother Count', value: 100, emoji: '🗣️' },
      { label: 'Gawker Destruction', value: 100, emoji: '⚖️' },
      { label: 'Tape Awareness', value: 6, emoji: '📹' },
      { label: 'Racial Sensitivity', value: 16, emoji: '😬' },
      { label: 'Main Event Strength', value: 88, emoji: '💪' },
    ],
    rarity: 'silver', image: getImageUrl('Bulk Hogman') },
  {
    name: 'Ozzy Ozzborne',
    nickname: 'Medical Marvel',
    stats: [
      { label: 'Survival Odds Defied', value: 100, emoji: '💀' },
      { label: 'Enunciation', value: 22, emoji: '🗣️' },
      { label: 'Bat Head Consumption', value: 100, emoji: '🦇' },
      { label: 'Sharon Dependence', value: 100, emoji: '👰' },
      { label: 'Substance Absorption', value: 100, emoji: '💊' },
      { label: 'Survives Anything', value: 90, emoji: '🦇' },
    ],
    rarity: 'gold', image: getImageUrl('Ozzy Ozzborne') },
  {
    name: 'Arnold Schwarzenlifter',
    nickname: 'Ill Be Back',
    stats: [
      { label: 'Muscles', value: 100, emoji: '💪' },
      { label: 'Pronunciation', value: 66, emoji: '🗣️' },
      { label: 'Governating', value: 76, emoji: '🏛️' },
      { label: 'Maid Relations', value: 96, emoji: '🏠' },
      { label: 'Catchphrase Creation', value: 100, emoji: '🎬' },
      { label: 'Raw Strength', value: 93, emoji: '💪' },
    ],
    rarity: 'gold', image: getImageUrl('Arnold Schwarzenlifter') },
  {
    name: 'Toast Malone',
    nickname: 'Face Tattoo Math',
    stats: [
      { label: 'Music Talent', value: 91, emoji: '🎵' },
      { label: 'Hygiene Rumors', value: 66, emoji: '🚿' },
      { label: 'Beer Pong Skill', value: 100, emoji: '🍺' },
      { label: 'Face Real Estate Used', value: 100, emoji: '🎨' },
      { label: 'Bud Light Consumption', value: 100, emoji: '🍻' },
      { label: 'Vibe Check', value: 78, emoji: '🎵' },
    ],
    rarity: 'gold', image: getImageUrl('Toast Malone') },
  {
    name: 'Isle Boys',
    nickname: 'Im An Island Boy',
    stats: [
      { label: 'Hair Structure', value: 100, emoji: '🌴' },
      { label: 'Synchronization', value: 12, emoji: '👯' },
      { label: 'Freestyle Ability', value: 17, emoji: '🎤' },
      { label: 'Pool Video Quality', value: 100, emoji: '🏊' },
      { label: 'One Hit Wonder', value: 100, emoji: '📉' },
      { label: 'One-Hit Wonder Burst', value: 45, emoji: '📈' },
    ],
    rarity: 'bronze', image: getImageUrl('Isle Boys') },
  {
    name: 'Scumbag Steve',
    nickname: 'The Original',
    stats: [
      { label: 'Hat Angle', value: 100, emoji: '🧢' },
      { label: 'Lighter Borrowing', value: 100, emoji: '🚬' },
      { label: 'Item Returning', value: 18, emoji: '🔙' },
      { label: 'Couch Surfing', value: 100, emoji: '🛋️' },
      { label: 'Rap Career', value: 19, emoji: '💿' },
      { label: 'Unreliable Hustle', value: 30, emoji: '🧢' },
    ],
    rarity: 'bronze', image: getImageUrl('Scumbag Steve') },

  // ============================================
  // MODERN ERA - The New Roasts
  // ============================================
  {
    name: 'Lizzy Holmz',
    nickname: 'Fake It Till Jail',
    stats: [
      { label: 'Voice Depth', value: 100, emoji: '📉' },
      { label: 'Blinking Rate', value: 12, emoji: '👁️' },
      { label: 'Blood Testing', value: 12, emoji: '🩸' },
      { label: 'Turtleneck Collection', value: 100, emoji: '🐢' },
      { label: 'Gaslighting', value: 100, emoji: '🕯️' },
      { label: 'Sales Pitch IQ', value: 85, emoji: '🕯️' },
    ],
    rarity: 'silver', image: getImageUrl('Lizzy Holmz') },
  {
    name: 'George Santoro',
    nickname: 'Kitara Ravache',
    stats: [
      { label: 'Resume Writing', value: 100, emoji: '📝' },
      { label: 'Volleyball Career', value: 12, emoji: '🏐' },
      { label: 'Jewish Heritage', value: 62, emoji: '🕍' },
      { label: 'Truth Telling', value: 12, emoji: '🤥' },
      { label: 'Drag Performance', value: 97, emoji: '👠' },
      { label: 'Improv Ability', value: 80, emoji: '🎭' },
    ],
    rarity: 'bronze', image: getImageUrl('George Santoro') },
  {
    name: 'Sam Bankster-Fried',
    nickname: 'Effective Altruism',
    stats: [
      { label: 'LoL Rank', value: 37, emoji: '🎮' },
      { label: 'Hair Care', value: 12, emoji: '💇' },
      { label: 'Funds Misplaced (B)', value: 21, emoji: '💸' },
      { label: 'Actual Altruism', value: 12, emoji: '😇' },
      { label: 'Snitching Speed', value: 100, emoji: '🐀' },
      { label: 'Risk Management (Bad)', value: 20, emoji: '🎮' },
    ],
    rarity: 'bronze', image: getImageUrl('Sam Bankster-Fried') },
  {
    name: 'Billy FyreFarland',
    nickname: 'Fyre Starter',
    stats: [
      { label: 'Sandwich Quality', value: 12, emoji: '🥪' },
      { label: 'Water Logistics', value: 17, emoji: '💧' },
      { label: 'Fraud Level', value: 100, emoji: '⚖️' },
      { label: 'Island Ownership', value: 12, emoji: '🏝️' },
      { label: 'Hype Generation', value: 100, emoji: '📢' },
      { label: 'Hype Generation', value: 88, emoji: '📢' },
    ],
    rarity: 'bronze', image: getImageUrl('Billy FyreFarland') },
  {
    name: 'Kidney King',
    nickname: 'Natty or Not',
    stats: [
      { label: 'Natural Status', value: 12, emoji: '💉' },
      { label: 'Steroid Budget (K/mo)', value: 23, emoji: '💊' },
      { label: 'Testicle Eating', value: 100, emoji: '🥚' },
      { label: 'Ab Authenticity', value: 32, emoji: '🧱' },
      { label: 'Ancestral Tenets', value: 14, emoji: '📜' },
      { label: 'Gym Strength', value: 85, emoji: '💪' },
    ],
    rarity: 'bronze', image: getImageUrl('Kidney King') },
  {
    name: 'Antonio Braun',
    nickname: 'Mr Big Chest',
    stats: [
      { label: 'CTE Levels', value: 100, emoji: '🧠' },
      { label: 'Shirt Removal', value: 100, emoji: '👕' },
      { label: 'Employability', value: 12, emoji: '💼' },
      { label: 'Rap Skills', value: 17, emoji: '🎤' },
      { label: 'Twitter Fingers', value: 100, emoji: '🐦' },
      { label: 'Highlight Reel Energy', value: 70, emoji: '📱' },
    ],
    rarity: 'silver', image: getImageUrl('Antonio Braun') },
  {
    name: 'Rachael Dolezall',
    nickname: 'Transracial Pioneer',
    stats: [
      { label: 'DNA Accuracy', value: 18, emoji: '🧬' },
      { label: 'Bronzer Usage', value: 100, emoji: '🧴' },
      { label: 'Braiding Skill', value: 100, emoji: '💇' },
      { label: 'Cultural Appropriation', value: 100, emoji: '💃' },
      { label: 'Delusion', value: 100, emoji: '🧠' },
      { label: 'Commitment to the Bit', value: 90, emoji: '🎭' },
    ],
    rarity: 'gold', image: getImageUrl('Rachael Dolezall') },
  {
    name: '7ix8ine',
    nickname: 'Rainbow Snitch',
    stats: [
      { label: 'Snitching', value: 100, emoji: '🐀' },
      { label: 'Hair Color Count', value: 100, emoji: '🌈' },
      { label: 'Street Cred', value: 18, emoji: '🧱' },
      { label: 'Witness Protection', value: 100, emoji: '🕵️' },
      { label: 'N-Word Pass', value: 18, emoji: '🚫' },
      { label: 'Chart Chaos', value: 65, emoji: '🌈' },
    ],
    rarity: 'silver', image: getImageUrl('7ix8ine') },
  {
    name: 'Atom Levine',
    nickname: 'DM Slider',
    stats: [
      { label: 'DM Sliding', value: 100, emoji: '📨' },
      { label: 'Cringey Texts', value: 100, emoji: '🤳' },
      { label: 'Tattoo Coverage', value: 100, emoji: '🖊️' },
      { label: 'Body Absurdity', value: 100, emoji: '🤪' },
      { label: 'Marriage Loyalty', value: 22, emoji: '💍' },
      { label: 'Stage Presence', value: 85, emoji: '🎶' },
    ],
    rarity: 'gold', image: getImageUrl('Atom Levine') },
  {
    name: 'Coco Siwa',
    nickname: 'Karma Is My Boyfriend',
    stats: [
      { label: 'Rebrand Success', value: 12, emoji: '🖤' },
      { label: 'Hairline Tension', value: 100, emoji: '🎀' },
      { label: 'Gay Pop Invention', value: 62, emoji: '🏳️‍🌈' },
      { label: 'Edge Level', value: 17, emoji: '😈' },
      { label: 'Yelling Volume', value: 100, emoji: '🗣️' },
      { label: 'Energy On The Bench', value: 92, emoji: '🎀' },
    ],
    rarity: 'bronze', image: getImageUrl('Coco Siwa') },
  {
    name: 'Wil Smyth',
    nickname: 'Keep My Wifes Name',
    stats: [
      { label: 'Slap Power', value: 100, emoji: '👋' },
      { label: 'Entanglement Tolerance', value: 100, emoji: '🕸️' },
      { label: 'Crying Memes', value: 100, emoji: '😭' },
      { label: 'Career Recovery', value: 66, emoji: '📉' },
      { label: 'Oscar Keeping', value: 100, emoji: '🏆' },
      { label: 'Clutch Slap Power', value: 90, emoji: '👋' },
    ],
    rarity: 'holo', image: getImageUrl('Wil Smyth') },
  {
    name: 'Logang Paulson',
    nickname: 'Forest Navigator',
    stats: [
      { label: 'Forest Judgment', value: 12, emoji: '🌲' },
      { label: 'Kid Scamming', value: 100, emoji: '🪙' },
      { label: 'Prime Sales', value: 100, emoji: '🥤' },
      { label: 'Likability', value: 22, emoji: '😐' },
      { label: 'Floyd Survival', value: 100, emoji: '🥊' },
      { label: 'Content Hustle', value: 85, emoji: '📹' },
    ],
    rarity: 'silver', image: getImageUrl('Logang Paulson') },
  {
    name: 'Pepper Bae',
    nickname: 'Elbow Seasoning',
    stats: [
      { label: 'Elbow Hygiene', value: 12, emoji: '🧂' },
      { label: 'Meat Prices', value: 100, emoji: '🥩' },
      { label: 'World Cup Cringe', value: 100, emoji: '🏆' },
      { label: 'Indoor Sunglasses', value: 100, emoji: '🕶️' },
      { label: 'Actual Cooking', value: 62, emoji: '🍳' },
      { label: 'Showmanship', value: 90, emoji: '🧂' },
    ],
    rarity: 'silver', image: getImageUrl('Pepper Bae') },
  {
    name: 'Hilarya Baldwing',
    nickname: 'How You Say Cucumber',
    stats: [
      { label: 'Spanish Accent', value: 12, emoji: '🇪🇸' },
      { label: 'Yoga Poses', value: 100, emoji: '🧘' },
      { label: 'Cucumber Knowledge', value: 12, emoji: '🥒' },
      { label: 'Boston Heritage', value: 100, emoji: '🇺🇸' },
      { label: 'Child Count', value: 19, emoji: '👶' },
      { label: 'Improv Confidence', value: 70, emoji: '🧘' },
    ],
    rarity: 'bronze', image: getImageUrl('Hilarya Baldwing') },
  {
    name: 'Ben Shapirno',
    nickname: 'Facts Dont Care',
    stats: [
      { label: 'Speaking Speed', value: 100, emoji: '⏩' },
      { label: 'WAP Understanding', value: 12, emoji: '💦' },
      { label: 'Height', value: 42, emoji: '📏' },
      { label: 'Wife Doctor Status', value: 100, emoji: '🩺' },
      { label: 'Libs Owned', value: 62, emoji: '📉' },
      { label: 'Debate Speed', value: 96, emoji: '⏩' },
    ],
    rarity: 'silver', image: getImageUrl('Ben Shapirno') },
  {
    name: 'Travesty Scott',
    nickname: 'Its Lit',
    stats: [
      { label: 'Autotune Reliance', value: 100, emoji: '🤖' },
      { label: 'Apology Lighting', value: 100, emoji: '🌑' },
      { label: 'Crowd Control', value: 12, emoji: '🚧' },
      { label: 'McDonalds Collabs', value: 100, emoji: '🍔' },
      { label: 'Robot Dance', value: 100, emoji: '💃' },
      { label: 'Crowd Control (Literally)', value: 85, emoji: '🔥' },
    ],
    rarity: 'gold', image: getImageUrl('Travesty Scott') },
  {
    name: 'Raegun',
    nickname: 'Breaking PhD',
    stats: [
      { label: 'Kangaroo Hop', value: 100, emoji: '🦘' },
      { label: 'Rhythm', value: 18, emoji: '🎵' },
      { label: 'PhD in Yapping', value: 100, emoji: '📜' },
      { label: 'National Embarrassment', value: 100, emoji: '🇦🇺' },
      { label: 'Floor Cleaning', value: 100, emoji: '🧹' },
      { label: 'Fearless Attempt Rate', value: 99, emoji: '🦘' },
    ],
    rarity: 'gold', image: getImageUrl('Raegun') },

  // ============================================
  // HISTORICAL LEGENDS - Dead Men (and Women)
  // Tell No Tales (About Lawsuits)
  // ============================================
  {
    name: 'Napoleon Bonaparte',
    nickname: 'Short King Energy',
    stats: [
      { label: 'Empire Building', value: 100, emoji: '🗺️' },
      { label: 'Actual Height (5\'7")', value: 55, emoji: '📏' },
      { label: 'Josephine Love Letters', value: 99, emoji: '💌' },
      { label: 'Waterloo Punctuality', value: 0, emoji: '⏰' },
      { label: 'Times Exiled', value: 100, emoji: '🏝️' },
      { label: 'Field Generalship', value: 98, emoji: '🧠' },
    ],
    rarity: 'silver', image: getImageUrl('Napoleon Bonaparte') },
  {
    name: 'Alexander the Great',
    nickname: 'Ran Out of World',
    stats: [
      { label: 'Conquest by Age 30', value: 100, emoji: '⚔️' },
      { label: 'Crying About No More Worlds', value: 100, emoji: '😭' },
      { label: 'Horse Taming', value: 95, emoji: '🐎' },
      { label: 'Empire Size', value: 99, emoji: '🗺️' },
      { label: 'Succession Planning', value: 0, emoji: '📋' },
      { label: 'Fast Break Conquest', value: 97, emoji: '🐎' },
    ],
    rarity: 'gold', image: getImageUrl('Alexander the Great') },
  {
    name: 'Albert Einstein',
    nickname: 'Relatively Smart',
    stats: [
      { label: 'Big Brain Energy', value: 100, emoji: '🧠' },
      { label: 'Sock Wearing', value: 0, emoji: '🧦' },
      { label: 'Hair Physics', value: 100, emoji: '💇' },
      { label: 'Patent Clerk Grind', value: 80, emoji: '📎' },
      { label: 'Violin Hobby', value: 75, emoji: '🎻' },
      { label: 'Big Brain Playmaking', value: 99, emoji: '🧠' },
    ],
    rarity: 'silver', image: getImageUrl('Albert Einstein') },
  {
    name: 'Elvis Presley',
    nickname: 'The King',
    stats: [
      { label: 'Hip Shaking', value: 100, emoji: '🕺' },
      { label: 'Jumpsuit Budget', value: 99, emoji: '👑' },
      { label: 'Peanut Butter Banana Sandwiches', value: 100, emoji: '🥪' },
      { label: 'Vegas Residency', value: 95, emoji: '🎰' },
      { label: 'Actual Black Belt', value: 85, emoji: '🥋' },
      { label: 'Stage Presence', value: 99, emoji: '🎤' },
    ],
    rarity: 'holo', image: getImageUrl('Elvis Presley') },
  {
    name: 'Leonardo da Vinci',
    nickname: 'Never Finishes Anything',
    stats: [
      { label: 'Renaissance Genius', value: 100, emoji: '🧠' },
      { label: 'Project Completion Rate', value: 15, emoji: '📋' },
      { label: 'Mirror Handwriting', value: 100, emoji: '🪞' },
      { label: 'Anatomy Sketching', value: 98, emoji: '🫀' },
      { label: 'Flying Machine Success Rate', value: 0, emoji: '🛩️' },
      { label: 'Vision & IQ', value: 98, emoji: '🎨' },
    ],
    rarity: 'silver', image: getImageUrl('Leonardo da Vinci') },
  {
    name: 'Winston Churchill',
    nickname: 'Cigar and a Dream',
    stats: [
      { label: 'Cigars Smoked (Lifetime)', value: 100, emoji: '🚬' },
      { label: 'Alcohol Tolerance', value: 99, emoji: '🥃' },
      { label: 'One-Liners', value: 100, emoji: '🗣️' },
      { label: 'Amateur Painting', value: 65, emoji: '🎨' },
      { label: 'Afternoon Naps Required', value: 90, emoji: '😴' },
      { label: 'Wartime Leadership', value: 97, emoji: '🐶' },
    ],
    rarity: 'gold', image: getImageUrl('Winston Churchill') },
  {
    name: 'Ludwig van Beethoven',
    nickname: 'Composed Deaf, Still Undefeated',
    stats: [
      { label: 'Composing While Deaf', value: 100, emoji: '🎼' },
      { label: 'Temper', value: 92, emoji: '😤' },
      { label: 'Hairstyle Chaos', value: 95, emoji: '💇' },
      { label: 'Pianos Broken (Playing Too Hard)', value: 88, emoji: '🎹' },
      { label: 'Patron Begging', value: 55, emoji: '💰' },
      { label: 'Focus Under Pressure', value: 92, emoji: '🎼' },
    ],
    rarity: 'gold', image: getImageUrl('Ludwig van Beethoven') },
  {
    name: 'Wolfgang Amadeus Mozart',
    nickname: 'Child Prodigy Energy',
    stats: [
      { label: 'Composing Speed', value: 100, emoji: '🎼' },
      { label: 'Childhood Free Time', value: 0, emoji: '🧸' },
      { label: 'Documented Poop Jokes', value: 95, emoji: '💩' },
      { label: 'Salieri Rivalry (Mostly Myth)', value: 55, emoji: '🎭' },
      { label: 'Symphonies Written', value: 100, emoji: '🎻' },
      { label: 'Prodigy Precision', value: 99, emoji: '🎻' },
    ],
    rarity: 'silver', image: getImageUrl('Wolfgang Amadeus Mozart') },
  {
    name: 'Abraham Lincoln',
    nickname: 'Honest Abe',
    stats: [
      { label: 'Height', value: 99, emoji: '📏' },
      { label: 'Honesty Reputation', value: 100, emoji: '🪓' },
      { label: 'Debate Skills', value: 98, emoji: '🗣️' },
      { label: 'Hat Storage Capacity', value: 95, emoji: '🎩' },
      { label: 'Wrestling Record (Near-Undefeated)', value: 97, emoji: '🤼' },
      { label: 'Locker Room Respect', value: 98, emoji: '🪓' },
    ],
    rarity: 'legendary', image: getImageUrl('Abraham Lincoln') },
  {
    name: 'Attila the Hun',
    nickname: 'Scourge of Empires',
    stats: [
      { label: 'Conquest', value: 99, emoji: '⚔️' },
      { label: 'Diplomacy', value: 5, emoji: '🤝' },
      { label: 'Horde Size', value: 100, emoji: '🐎' },
      { label: 'Rome Tribute Extraction', value: 95, emoji: '💰' },
      { label: 'Surprisingly Modest Table Manners', value: 60, emoji: '🍖' },
      { label: 'Conquest Power', value: 96, emoji: '⚔️' },
    ],
    rarity: 'silver', image: getImageUrl('Attila the Hun') },
  {
    name: 'David Bowie',
    nickname: 'Starman',
    stats: [
      { label: 'Persona Changes', value: 100, emoji: '🎭' },
      { label: 'Fashion Risk-Taking', value: 100, emoji: '👗' },
      { label: 'Genre Hopping', value: 99, emoji: '🎸' },
      { label: 'Ziggy Stardust Commitment', value: 100, emoji: '⭐' },
      { label: 'Mime Training (Actually True)', value: 70, emoji: '🎪' },
      { label: 'Stage Presence', value: 98, emoji: '⭐' },
    ],
    rarity: 'holo', image: getImageUrl('David Bowie') },
  {
    name: 'Prince',
    nickname: 'The Artist Formerly Known As',
    stats: [
      { label: 'Guitar Skills', value: 100, emoji: '🎸' },
      { label: 'Height', value: 30, emoji: '📏' },
      { label: 'Purple Commitment', value: 100, emoji: '💜' },
      { label: 'Vault of Unreleased Music', value: 100, emoji: '🔒' },
      { label: 'Secrecy', value: 95, emoji: '🤫' },
      { label: 'Multi-Tool Ability', value: 97, emoji: '🎸' },
    ],
    rarity: 'gold', image: getImageUrl('Prince') },
  {
    name: 'Harry Houdini',
    nickname: 'Never Stayed Locked Up',
    stats: [
      { label: 'Escape Speed', value: 100, emoji: '🔓' },
      { label: 'Handcuff Collection', value: 95, emoji: '⛓️' },
      { label: 'Spiritualist Debunking', value: 100, emoji: '👻' },
      { label: 'Underwater Breath Holding', value: 90, emoji: '🫁' },
      { label: 'Straitjacket Wiggling', value: 99, emoji: '🎪' },
      { label: 'Clutch Escape Ability', value: 97, emoji: '🔓' },
    ],
    rarity: 'legendary', image: getImageUrl('Harry Houdini') },
  {
    name: 'Confucius',
    nickname: 'Misquoted Since 500 BC',
    stats: [
      { label: 'Wisdom', value: 100, emoji: '📚' },
      { label: 'Misattributed Quotes', value: 100, emoji: '❌' },
      { label: 'Fortune Cookie Association (Actually American)', value: 100, emoji: '🥠' },
      { label: 'Government Career Success', value: 52, emoji: '🏛️' },
      { label: 'Student Count (Traditionally 3,000)', value: 100, emoji: '🎓' },
      { label: 'Wisdom IQ', value: 96, emoji: '📚' },
    ],
    rarity: 'gold', image: getImageUrl('Confucius') },
  {
    name: 'Socrates',
    nickname: 'Asked Too Many Questions',
    stats: [
      { label: 'Questioning Everyone', value: 100, emoji: '❓' },
      { label: 'Public Annoyance Caused', value: 95, emoji: '😤' },
      { label: 'Wrote Anything Down Himself', value: 0, emoji: '📝' },
      { label: 'Hemlock Tolerance', value: 0, emoji: '☠️' },
      { label: 'Debate Skills', value: 100, emoji: '🗣️' },
      { label: 'Question Everything IQ', value: 95, emoji: '❓' },
    ],
    rarity: 'silver', image: getImageUrl('Socrates') },
  {
    name: 'Benjamin Franklin',
    nickname: 'Founding Flirt',
    stats: [
      { label: 'Inventions', value: 100, emoji: '💡' },
      { label: 'Kite Safety', value: 0, emoji: '⚡' },
      { label: 'Diplomatic Charm', value: 95, emoji: '🎩' },
      { label: 'Almanac Wisdom', value: 90, emoji: '📖' },
      { label: 'Flirtation Reputation in France', value: 99, emoji: '💋' },
      { label: 'Inventive IQ', value: 96, emoji: '💡' },
    ],
    rarity: 'silver', image: getImageUrl('Benjamin Franklin') },
  {
    name: 'P.T. Barnum',
    nickname: 'Greatest Showman (Allegedly)',
    stats: [
      { label: 'Showmanship', value: 100, emoji: '🎪' },
      { label: 'Humbug Level', value: 95, emoji: '🎩' },
      { label: 'Sucker Identification', value: 99, emoji: '🎯' },
      { label: 'Circus Building', value: 100, emoji: '🎡' },
      { label: 'Fact Checking', value: 10, emoji: '📰' },
      { label: 'Showmanship', value: 98, emoji: '🎪' },
    ],
    rarity: 'gold', image: getImageUrl('P.T. Barnum') },
  {
    name: 'Andy Warhol',
    nickname: '15 Minutes Guy',
    stats: [
      { label: 'Fame Prediction Accuracy', value: 100, emoji: '⏱️' },
      { label: 'Soup Can Appreciation', value: 100, emoji: '🥫' },
      { label: 'Silver Wig Game', value: 99, emoji: '💇' },
      { label: 'Factory Productivity', value: 95, emoji: '🏭' },
      { label: 'Small Talk Skills', value: 20, emoji: '💬' },
      { label: 'Cultural IQ', value: 90, emoji: '🎨' },
    ],
    rarity: 'gold', image: getImageUrl('Andy Warhol') },
];

// Get card with calculated OVR
export function getCardWithOVR(card: PresetCard): PresetCard & { overallRating: number } {
  return {
    ...card,
    overallRating: calculateOVR(card.stats),
  };
}

// Get all cards with OVR
export function getAllCardsWithOVR(): (PresetCard & { overallRating: number })[] {
  return PRESET_CARDS.map(getCardWithOVR);
}

// Get cards by rarity
export function getCardsByRarity(rarity: PresetCard['rarity']): PresetCard[] {
  return PRESET_CARDS.filter(c => c.rarity === rarity);
}

// ── Expansions: Terminally Online (A) + Legends & Folklore (B) ──
// Pushed onto the same pool so packs, battles, and opponent
// generation all pick them up automatically.
PRESET_CARDS.push(...EXPANSION_A, ...EXPANSION_B, ...EXPANSION_C);
