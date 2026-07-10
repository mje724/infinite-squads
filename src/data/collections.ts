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
  kind: 'specific' | 'rarity';
  // kind === 'specific'
  cardName?: string;
  // kind === 'rarity'
  rarity?: Rarity;
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
      { kind: 'specific', cardName: 'Elizabeth Homes' },
      { kind: 'specific', cardName: 'Sam Bankster-Fried' },
      { kind: 'specific', cardName: 'Billy MacFarland' },
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
      { kind: 'specific', cardName: 'Keanu Reevos' },
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
      { kind: 'specific', cardName: 'Mike Tyzon' },
      { kind: 'specific', cardName: 'Bulk Hogan' },
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

export function getSet(id: string): CollectionSet | undefined {
  return COLLECTION_SETS.find(s => s.id === id);
}
