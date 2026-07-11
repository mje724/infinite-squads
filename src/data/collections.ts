// ============================================
// INFINITE SQUADS - COLLECTIONS (SBC) SYSTEM
// Burn a cluster of cards that belong together,
// unlock a card you cannot get any other way.
//
// Two requirement styles, mixable per set:
//  - specific card names ("hand over Tesla AND Curie")
//  - generic rarity counts ("any 5 bronze")
//
// Reward styles:
//  - a fixed ICON card (exclusive, never in packs)
//  - a random card of a given rarity (repeatable
//    furnace sets — the dupe economy's exit valve)
// ============================================

import { PresetCard, calculateOVR } from '@/data/presetCards';
import { getImageUrl } from '@/lib/avatar';
import { Rarity } from '@/types/schema';
import { Tag } from '@/data/cardRegistry';

// ─────────────────────────────────────────────
// ICON REWARD CARDS (exclusive to collections)
// ─────────────────────────────────────────────

export interface IconCard extends Omit<PresetCard, 'rarity'> {
  rarity: 'icon';
}

export const ICON_CARDS: IconCard[] = [
  {
    name: 'Prime Da Vinci',
    nickname: 'Carried Every Group Project',
    stats: [
      { label: 'Group Project Carrying', value: 99, emoji: '🎨' },
      { label: 'Unfinished Masterpieces', value: 96, emoji: '🖼️' },
      { label: 'Notebook Encryption', value: 97, emoji: '🪞' },
      { label: 'Inventing Too Early', value: 98, emoji: '🚁' },
      { label: 'Side Quest Volume', value: 99, emoji: '🗺️' },
      { label: 'Beard Flow', value: 91, emoji: '🧔' },
    ],
    rarity: 'icon', image: getImageUrl('Prime Da Vinci'),
  },
  {
    name: 'Hannibal of Carthage',
    nickname: 'Brought Elephants To A Mountain Fight',
    stats: [
      { label: 'Elephant Logistics', value: 99, emoji: '🐘' },
      { label: 'Alpine Navigation', value: 97, emoji: '🏔️' },
      { label: 'Rome Annoyance', value: 98, emoji: '🏛️' },
      { label: 'Tactical Audacity', value: 99, emoji: '🎲' },
      { label: 'Commitment To The Bit', value: 99, emoji: '🎭' },
      { label: 'Winter Preparedness', value: 89, emoji: '❄️' },
    ],
    rarity: 'icon', image: getImageUrl('Hannibal of Carthage'),
  },
  {
    name: 'Charles Ponzi',
    nickname: 'The Original',
    stats: [
      { label: 'Scheme Architecture', value: 99, emoji: '🏗️' },
      { label: 'Investor Confidence', value: 98, emoji: '🤝' },
      { label: 'Math That Almost Works', value: 97, emoji: '📊' },
      { label: 'Charisma Per Dollar', value: 99, emoji: '💸' },
      { label: 'Legacy Branding', value: 99, emoji: '™️' },
      { label: 'Exit Strategy', value: 55, emoji: '🚪' },
    ],
    rarity: 'icon', image: getImageUrl('Charles Ponzi'),
  },
  {
    name: 'Doge',
    nickname: 'Much Icon. Very Rare.',
    stats: [
      { label: 'Wow Factor', value: 99, emoji: '✨' },
      { label: 'Meme Longevity', value: 99, emoji: '📅' },
      { label: 'Shiba Composure', value: 97, emoji: '🐕' },
      { label: 'Market Influence', value: 96, emoji: '📈' },
      { label: 'Side Eye', value: 98, emoji: '👀' },
      { label: 'Loyalty', value: 99, emoji: '❤️' },
    ],
    rarity: 'icon', image: getImageUrl('Doge'),
  },
  {
    name: 'Prime Rasputin',
    nickname: 'Actually Immortal This Time',
    stats: [
      { label: 'Refusing To Die', value: 99, emoji: '💀' },
      { label: 'Royal Whispering', value: 98, emoji: '👑' },
      { label: 'Beard Magnitude', value: 99, emoji: '🧔' },
      { label: 'Poison Tolerance', value: 99, emoji: '☠️' },
      { label: 'Party Stamina', value: 97, emoji: '🕺' },
      { label: 'Aura', value: 99, emoji: '🔮' },
    ],
    rarity: 'icon', image: getImageUrl('Prime Rasputin'),
  },
  {
    name: 'Marcus Aurelius',
    nickname: 'Journaled Through The Plague',
    stats: [
      { label: 'Journaling Consistency', value: 99, emoji: '📖' },
      { label: 'Stoic Composure', value: 99, emoji: '🗿' },
      { label: 'Empire Management', value: 96, emoji: '🏛️' },
      { label: 'Not Reading Comments', value: 98, emoji: '🙈' },
      { label: 'Quotability', value: 99, emoji: '💬' },
      { label: 'Succession Planning', value: 61, emoji: '👶' },
    ],
    rarity: 'icon', image: getImageUrl('Marcus Aurelius'),
  },
  {
    name: 'George Washington',
    nickname: 'Could Not Tell A Lie. Could Cross A River.',
    stats: [
      { label: 'River Crossing', value: 99, emoji: '🛶' },
      { label: 'Term Limit Respect', value: 99, emoji: '🏛️' },
      { label: 'Cherry Tree Honesty', value: 97, emoji: '🍒' },
      { label: 'Wooden Teeth Endurance', value: 95, emoji: '🦷' },
      { label: 'Farewell Address Quality', value: 98, emoji: '📜' },
      { label: 'Aura', value: 98, emoji: '🦅' },
    ],
    rarity: 'icon', image: getImageUrl('George Washington'),
  },
  {
    name: 'The Missing Link',
    nickname: 'Cryptid Family Reunion',
    stats: [
      { label: 'Existence Ambiguity', value: 99, emoji: '❓' },
      { label: 'Family Tree Chaos', value: 97, emoji: '🌳' },
      { label: 'Documentary Bait', value: 96, emoji: '🎥' },
      { label: 'Fossil Record Evasion', value: 98, emoji: '🦴' },
      { label: 'Reunion Attendance', value: 91, emoji: '🎪' },
      { label: 'Anthropologist Torment', value: 95, emoji: '🔬' },
    ],
    rarity: 'icon', image: getImageUrl('The Missing Link'),
  },
  {
    name: 'The GOAT',
    nickname: 'Greatest Of All Time, Literally',
    stats: [
      { label: 'Being The GOAT', value: 99, emoji: '🐐' },
      { label: 'Debate Ending Power', value: 98, emoji: '🎤' },
      { label: 'Fence Climbing', value: 95, emoji: '🧗' },
      { label: 'Eating Anything', value: 97, emoji: '🍽️' },
      { label: 'Screaming Like A Human', value: 94, emoji: '📢' },
      { label: 'Humility', value: 90, emoji: '🙇' },
    ],
    rarity: 'icon', image: getImageUrl('The GOAT'),
  },
  {
    name: 'The Speedgod',
    nickname: 'Frame-Perfect Everything',
    stats: [
      { label: 'Frame Perfection', value: 99, emoji: '🎯' },
      { label: 'Reality Clipping', value: 97, emoji: '🌀' },
      { label: 'Load Time Immunity', value: 96, emoji: '⚡' },
      { label: 'RNG Manipulation', value: 95, emoji: '🎲' },
      { label: 'Sleep Schedule', value: 92, emoji: '😴' },
      { label: 'World Record Permanence', value: 94, emoji: '🏆' },
    ],
    rarity: 'icon', image: getImageUrl('The Speedgod'),
  },
  {
    name: 'Main Character',
    nickname: 'The Algorithm Chose Them',
    stats: [
      { label: 'Plot Armor', value: 99, emoji: '🛡️' },
      { label: 'Feed Domination', value: 98, emoji: '📱' },
      { label: 'Being Perceived', value: 97, emoji: '👁️' },
      { label: 'Consequence Immunity', value: 93, emoji: '🃏' },
      { label: 'Arc Development', value: 95, emoji: '📈' },
      { label: 'Spotlight Gravity', value: 99, emoji: '🔦' },
    ],
    rarity: 'icon', image: getImageUrl('Main Character'),
  },
  {
    name: 'Zeus',
    nickname: 'Upper Management',
    stats: [
      { label: 'Lightning Accuracy', value: 99, emoji: '⚡' },
      { label: 'Sky Management', value: 97, emoji: '☁️' },
      { label: 'Family Tree Complexity', value: 99, emoji: '🌳' },
      { label: 'Final Say In Arguments', value: 98, emoji: '🗯️' },
      { label: 'Disguise Creativity', value: 96, emoji: '🦢' },
      { label: 'HR Complaint Volume', value: 95, emoji: '📋' },
    ],
    rarity: 'icon', image: getImageUrl('Zeus'),
  },
  {
    name: 'Dolly Party',
    nickname: 'Immune To Scandal',
    stats: [
      { label: 'Scandal Immunity', value: 99, emoji: '🛡️' },
      { label: 'Songwriting Speed', value: 99, emoji: '🎵' },
      { label: 'Wig Architecture', value: 97, emoji: '💇' },
      { label: 'Literacy Distribution', value: 98, emoji: '📚' },
      { label: 'Theme Park Ownership', value: 96, emoji: '🎢' },
      { label: 'Universal Approval', value: 99, emoji: '🌎' },
    ],
    rarity: 'icon', image: getImageUrl('Dolly Party'),
  },
];

export function getIconCard(name: string): IconCard | undefined {
  return ICON_CARDS.find(c => c.name === name);
}

export function iconOVR(card: IconCard): number {
  return calculateOVR(card.stats);
}

// ─────────────────────────────────────────────
// SET DEFINITIONS
// ─────────────────────────────────────────────

export interface SetRequirement {
  kind: 'specific' | 'rarity' | 'tag';
  // kind === 'specific'
  cardName?: string;
  // kind === 'rarity'
  rarity?: Rarity;
  // kind === 'tag' — any cards carrying this identity tag
  tag?: Tag;
  count?: number;
}

export interface CollectionSet {
  id: string;
  name: string;
  blurb: string; // the funny sell
  emoji: string;
  requirements: SetRequirement[];
  reward:
    | { kind: 'icon'; cardName: string }
    | { kind: 'random'; rarity: Rarity; label: string };
  bonusCoins: number;
  repeatable: boolean;
}

export const COLLECTION_SETS: CollectionSet[] = [
  // ── Furnaces (repeatable dupe sinks) ──
  {
    id: 'bronze-furnace',
    name: 'The Bronze Furnace',
    blurb: 'Five nobodies walk in. One somebody walks out. History is written by the smelters.',
    emoji: '🔥',
    requirements: [{ kind: 'rarity', rarity: 'bronze', count: 5 }],
    reward: { kind: 'random', rarity: 'gold', label: 'Random GOLD card' },
    bonusCoins: 0,
    repeatable: true,
  },
  {
    id: 'silver-smelter',
    name: 'The Silver Smelter',
    blurb: 'Six mid careers, one shot at greatness. The industrial revolution of your card binder.',
    emoji: '⚒️',
    requirements: [{ kind: 'rarity', rarity: 'silver', count: 6 }],
    reward: { kind: 'random', rarity: 'legendary', label: 'Random LEGENDARY card' },
    bonusCoins: 0,
    repeatable: true,
  },

  // ── Icon sets (one-time, exclusive rewards) ──
  {
    id: 'doomed-geniuses',
    name: 'Doomed Geniuses',
    blurb: 'They changed the world and the world said "thanks, anyway—". Reunite them for one guy who actually got credit. Eventually. Centuries later.',
    emoji: '⚡',
    requirements: [
      { kind: 'specific', cardName: 'Nikola Tesla' },
      { kind: 'specific', cardName: 'Marie Curie' },
      { kind: 'specific', cardName: 'Ludwig van Beethoven' },
      { kind: 'specific', cardName: 'Socrates' },
    ],
    reward: { kind: 'icon', cardName: 'Prime Da Vinci' },
    bonusCoins: 250,
    repeatable: false,
  },
  {
    id: 'ancient-menaces',
    name: 'Ancient Menaces',
    blurb: 'Four men who saw the known world and thought "mine." Burn the whole conquering committee to summon the one who did it with elephants.',
    emoji: '⚔️',
    requirements: [
      { kind: 'specific', cardName: 'Genghis Khan' },
      { kind: 'specific', cardName: 'Attila the Hun' },
      { kind: 'specific', cardName: 'Alexander the Great' },
      { kind: 'specific', cardName: 'Julius Caesar' },
    ],
    reward: { kind: 'icon', cardName: 'Hannibal of Carthage' },
    bonusCoins: 250,
    repeatable: false,
  },
  {
    id: 'certified-frauds',
    name: 'Certified Frauds',
    blurb: 'Assemble the modern masters of "trust me." Their combined sentences: several. Their teacher: one. Pay respects to the original.',
    emoji: '💼',
    requirements: [
      { kind: 'specific', cardName: 'Lizzy Holmz' },
      { kind: 'specific', cardName: 'Sam Bankster-Fried' },
      { kind: 'specific', cardName: 'Billy FyreFarland' },
      { kind: 'specific', cardName: 'George Santoro' },
    ],
    reward: { kind: 'icon', cardName: 'Charles Ponzi' },
    bonusCoins: 250,
    repeatable: false,
  },
  {
    id: 'wholesome-firewall',
    name: 'The Wholesome Firewall',
    blurb: 'The four nicest people ever recorded. Yes, you have to burn them. No, we don\'t feel good about it either. She would want you to have this.',
    emoji: '💛',
    requirements: [
      { kind: 'specific', cardName: 'Mr. Rogers' },
      { kind: 'specific', cardName: 'Bob Ross' },
      { kind: 'specific', cardName: 'Steve Irwin' },
      { kind: 'specific', cardName: 'Kianu Reaves' },
    ],
    reward: { kind: 'icon', cardName: 'Dolly Party' },
    bonusCoins: 250,
    repeatable: false,
  },
  {
    id: 'internet-antiquity',
    name: 'Internet Antiquity',
    blurb: 'The founding relics of being online. Sacrifice five ancient memes to awaken the oldest and most powerful of them all.',
    emoji: '🗿',
    requirements: [
      { kind: 'specific', cardName: 'Florida Man' },
      { kind: 'specific', cardName: 'Harambe' },
      { kind: 'specific', cardName: 'Bad Luck Brian' },
      { kind: 'specific', cardName: 'Scumbag Steve' },
      { kind: 'specific', cardName: 'Grimace' },
    ],
    reward: { kind: 'icon', cardName: 'Doge' },
    bonusCoins: 250,
    repeatable: false,
  },
  {
    id: 'hard-to-kill',
    name: 'Hard To Kill',
    blurb: 'Men who treated death like a scheduling conflict. Merge their stubbornness into its final form: the guy who needed poison, bullets, AND a river.',
    emoji: '🛡️',
    requirements: [
      { kind: 'specific', cardName: 'Rasputin' },
      { kind: 'specific', cardName: 'Killdozer' },
      { kind: 'specific', cardName: 'Iron Mike Tyzen' },
      { kind: 'specific', cardName: 'Bulk Hogman' },
    ],
    reward: { kind: 'icon', cardName: 'Prime Rasputin' },
    bonusCoins: 250,
    repeatable: false,
  },
  {
    id: 'philosophy-department',
    name: 'The Philosophy Department',
    blurb: 'Four men who asked "but why though" professionally. Trade the whole faculty for the emperor who did philosophy AND had an army.',
    emoji: '🏛️',
    requirements: [
      { kind: 'specific', cardName: 'Diogenes' },
      { kind: 'specific', cardName: 'Sun Tzu' },
      { kind: 'specific', cardName: 'Confucius' },
      { kind: 'specific', cardName: 'Socrates' },
    ],
    reward: { kind: 'icon', cardName: 'Marcus Aurelius' },
    bonusCoins: 250,
    repeatable: false,
  },
  {
    id: 'dead-presidents-club',
    name: 'Dead Presidents & Associates',
    blurb: 'American history\'s starting lineup. Retire their jerseys to unlock the man who invented walking away from power (once).',
    emoji: '🦅',
    requirements: [
      { kind: 'specific', cardName: 'Abraham Lincoln' },
      { kind: 'specific', cardName: 'Benjamin Franklin' },
      { kind: 'specific', cardName: 'Teddy Roosevelt' },
      { kind: 'specific', cardName: 'Frederick Douglass' },
    ],
    reward: { kind: 'icon', cardName: 'George Washington' },
    bonusCoins: 250,
    repeatable: false,
  },
];

// ── Expansion sets: the new roster's trophy lines ──
COLLECTION_SETS.push(
  {
    id: 'cryptid-conference',
    name: 'The Cryptid Conference',
    blurb: 'Five creatures who have dodged cameras for a combined 400 years. Get them in one room and their common ancestor finally shows up.',
    emoji: '📸',
    requirements: [
      { kind: 'specific', cardName: 'Bigfoot' },
      { kind: 'specific', cardName: 'Mothman' },
      { kind: 'specific', cardName: 'The Loch Ness Monster' },
      { kind: 'specific', cardName: 'Chupacabra' },
      { kind: 'specific', cardName: 'The Yeti' },
    ],
    reward: { kind: 'icon', cardName: 'The Missing Link' },
    bonusCoins: 250,
    repeatable: false,
  },
  {
    id: 'war-pets-battalion',
    name: 'War Pets Battalion',
    blurb: 'A bear who carried artillery. A pigeon who finished the mission shot. A cat who out-survived three navies. Salute them all and meet their commanding officer.',
    emoji: '🎖️',
    requirements: [
      { kind: 'specific', cardName: 'Wojtek the Bear' },
      { kind: 'specific', cardName: 'Cher Ami' },
      { kind: 'specific', cardName: 'Unsinkable Sam' },
      { kind: 'specific', cardName: 'Laika' },
      { kind: 'specific', cardName: 'Balto' },
    ],
    reward: { kind: 'icon', cardName: 'The GOAT' },
    bonusCoins: 250,
    repeatable: false,
  },
  {
    id: 'terminally-online',
    name: 'Terminally Online',
    blurb: 'The ratio, the loop, the scroll, the lurk, the reply. Log all five off permanently and the feed anoints its Main Character.',
    emoji: '📶',
    requirements: [
      { kind: 'specific', cardName: 'Ratio King' },
      { kind: 'specific', cardName: 'NPC Streamer' },
      { kind: 'specific', cardName: 'Doomscroller' },
      { kind: 'specific', cardName: 'The Lurker' },
      { kind: 'specific', cardName: 'Reply Guy' },
    ],
    reward: { kind: 'icon', cardName: 'Main Character' },
    bonusCoins: 250,
    repeatable: false,
  },
  {
    id: 'speedrun-council',
    name: 'The Speedrun Council',
    blurb: 'The kid, the quitter, the completionist, the boss, and the man who ran in early. Burn the whole leaderboard to summon the one who beat the game before it loaded.',
    emoji: '⏱️',
    requirements: [
      { kind: 'specific', cardName: 'Speedrun Kid' },
      { kind: 'specific', cardName: 'Rage Quitter' },
      { kind: 'specific', cardName: 'The Completionist' },
      { kind: 'specific', cardName: 'Final Boss' },
      { kind: 'specific', cardName: 'Leeroy Jenkinz' },
    ],
    reward: { kind: 'icon', cardName: 'The Speedgod' },
    bonusCoins: 250,
    repeatable: false,
  },
  {
    id: 'olympus-rejects',
    name: 'Olympus Rejects',
    blurb: 'The demigod, the gorgon, the boulder guy, the flight risk, and the landlord of one very confusing house. Send them all up the mountain and management finally comes down.',
    emoji: '🏛️',
    requirements: [
      { kind: 'specific', cardName: 'Hercules' },
      { kind: 'specific', cardName: 'Medusa' },
      { kind: 'specific', cardName: 'Sisyphus' },
      { kind: 'specific', cardName: 'Icarus' },
      { kind: 'specific', cardName: 'The Minotaur' },
    ],
    reward: { kind: 'icon', cardName: 'Zeus' },
    bonusCoins: 250,
    repeatable: false,
  },
  // ── Tag furnaces: repeatable identity-based sinks ──
  {
    id: 'conquerors-cabinet',
    name: "Conqueror's Cabinet",
    blurb: 'Four warlords walk into a tent. History teaches us exactly one walks out — and it\'s always someone stronger.',
    emoji: '⚔️',
    requirements: [{ kind: 'tag', tag: 'warlord', count: 4 }],
    reward: { kind: 'random', rarity: 'legendary', label: 'Random LEGENDARY card' },
    bonusCoins: 0,
    repeatable: true,
  },
  {
    id: 'petting-zoo',
    name: 'The Petting Zoo',
    blurb: 'Four animals, one enclosure, zero supervision. Whatever comes out of that barn is shinier than what went in.',
    emoji: '🐾',
    requirements: [{ kind: 'tag', tag: 'animal', count: 4 }],
    reward: { kind: 'random', rarity: 'gold', label: 'Random GOLD card' },
    bonusCoins: 0,
    repeatable: true,
  },
  {
    id: 'villain-monologue',
    name: 'The Villain Monologue',
    blurb: 'Four villains explaining their master plans simultaneously creates enough hot air to forge something legendary.',
    emoji: '🎭',
    requirements: [{ kind: 'tag', tag: 'villain', count: 4 }],
    reward: { kind: 'random', rarity: 'legendary', label: 'Random LEGENDARY card' },
    bonusCoins: 0,
    repeatable: true,
  },
  {
    id: 'big-brain-time',
    name: 'Big Brain Time',
    blurb: 'Four geniuses in one study group. They argue about methodology until they collectively transcend.',
    emoji: '🧠',
    requirements: [{ kind: 'tag', tag: 'genius', count: 4 }],
    reward: { kind: 'random', rarity: 'legendary', label: 'Random LEGENDARY card' },
    bonusCoins: 0,
    repeatable: true,
  },
);

export function getSet(id: string): CollectionSet | undefined {
  return COLLECTION_SETS.find(s => s.id === id);
}

// Which one-time sets need a specific card by name — used to warn
// before someone quicksells a collection piece for pocket change.
export function setsNeedingCard(cardName: string): CollectionSet[] {
  return COLLECTION_SETS.filter(
    s => !s.repeatable && s.requirements.some(r => r.kind === 'specific' && r.cardName === cardName)
  );
}
