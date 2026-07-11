// ============================================
// INFINITE SQUADS - CHEMISTRY & PERFORMANCE ENGINE
//
// The design law: every point has a "why".
//  1. SCENARIO WEIGHTS  — which core stats matter where.
//     Negative weights exist: CHAOS actively ruins a wedding,
//     CLOUT gets you mobbed in a zombie apocalypse.
//  2. TAG AFFINITIES    — flat scenario bonuses/penalties by identity.
//     Survivors thrive in the apocalypse; philosophers ruin movie night.
//  3. TAG SYNERGIES     — pair chemistry from who they ARE.
//     Two hustlers scam each other. Wholesome + chaos = babysitting.
//  4. NAMED DUOS        — hand-written history. Diogenes told Alexander
//     to get out of his sunlight. That's worth +8 and you know why.
//  5. ERA BONDS         — contemporaries get each other.
// ============================================

import { Card } from '@/types/schema';
import { PresetCard, calculateOVR } from '@/data/presetCards';
import { getGameData, CoreStats, Tag, Era } from '@/data/cardRegistry';

type AnyCard = PresetCard | Card;

function cardOVR(c: AnyCard): number {
  return 'overallRating' in c ? c.overallRating : calculateOVR((c as PresetCard).stats);
}

// ─────────────────────────────────────────────
// 1. SCENARIO WEIGHTS over core stats
//    (canonical keys; both Battle and Squad ids alias into these)
// ─────────────────────────────────────────────

export type ScenarioKey =
  | 'basketball' | 'soccer' | 'football' | 'roadtrip' | 'dinner'
  | 'movie' | 'groupproject' | 'wedding' | 'zombie';

const SCENARIO_ALIASES: Record<string, ScenarioKey> = {
  basketball: 'basketball', starting5: 'basketball',
  soccer: 'soccer', soccer11: 'soccer',
  football: 'football', football7: 'football',
  roadtrip: 'roadtrip', 'road-trip': 'roadtrip',
  dinner: 'dinner', 'dinner-bill': 'dinner',
  movie: 'movie', 'movie-night': 'movie',
  groupproject: 'groupproject', 'group-project': 'groupproject',
  wedding: 'wedding',
  zombie: 'zombie',
};

export function toScenarioKey(id: string): ScenarioKey {
  return SCENARIO_ALIASES[id] ?? 'roadtrip';
}

// Weights express the scenario's soul. They loosely sum to ~1 net.
export const SCENARIO_WEIGHTS: Record<ScenarioKey, CoreStats> = {
  //                might  brains charm  chaos  grit  clout
  basketball:   { might: .40, brains: .10, charm: .05, chaos: .05, grit: .25, clout: .15 },
  soccer:       { might: .35, brains: .15, charm: .05, chaos: .05, grit: .30, clout: .10 },
  football:     { might: .45, brains: .05, charm: .00, chaos: .10, grit: .30, clout: .10 },
  roadtrip:     { might: .05, brains: .10, charm: .30, chaos: .20, grit: .25, clout: .10 },
  dinner:       { might: .00, brains: .25, charm: .35, chaos: -.10, grit: .15, clout: .35 },
  movie:        { might: .00, brains: .15, charm: .30, chaos: .10, grit: .20, clout: .25 },
  groupproject: { might: .00, brains: .55, charm: .10, chaos: -.15, grit: .35, clout: .15 },
  wedding:      { might: .05, brains: .10, charm: .45, chaos: -.20, grit: .15, clout: .45 },
  zombie:       { might: .30, brains: .15, charm: -.05, chaos: .15, grit: .45, clout: -.10 },
};

// ─────────────────────────────────────────────
// 2. TAG AFFINITIES per scenario — identity meets situation
// ─────────────────────────────────────────────

const TAG_AFFINITY: Record<ScenarioKey, Partial<Record<Tag, number>>> = {
  basketball:   { athlete: 12, animal: 4, gamer: -3, philosopher: -4 },
  soccer:       { athlete: 12, warlord: 4, animal: 4, entity: -3 },
  football:     { athlete: 12, warlord: 6, wholesome: -3 },
  roadtrip:     { musician: 8, survivor: 5, internet: 3, ruler: -6, cryptid: -4 },
  dinner:       { hustler: 8, ruler: 6, wholesome: 4, chaos: -6, animal: -3 },
  movie:        { entertainer: 8, internet: 6, gamer: 4, philosopher: -5 },
  groupproject: { genius: 10, philosopher: 6, inventor: 6, gamer: 3, chaos: -8, entertainer: -3 },
  wedding:      { wholesome: 8, entertainer: 6, musician: 6, villain: -6, cryptid: -8, animal: 3 },
  zombie:       { survivor: 12, cryptid: 8, warlord: 6, animal: 4, wholesome: -8, entertainer: -4 },
};

// ─────────────────────────────────────────────
// 3. TAG SYNERGIES — pair chemistry between teammates
//    (order-independent; first match applies per pair)
// ─────────────────────────────────────────────

interface TagRule { a: Tag; b: Tag; name: string; bonus: number }

const TAG_SYNERGY: TagRule[] = [
  { a: 'philosopher', b: 'warlord', name: 'The Art of War', bonus: 5 },
  { a: 'warlord', b: 'warlord', name: 'War Council', bonus: 4 },
  { a: 'warlord', b: 'ruler', name: 'Chain of Command', bonus: 3 },
  { a: 'genius', b: 'inventor', name: 'Lab Partners', bonus: 4 },
  { a: 'genius', b: 'chaos', name: 'Mad Science', bonus: 4 },
  { a: 'genius', b: 'philosopher', name: 'Deep Thoughts', bonus: 3 },
  { a: 'artist', b: 'musician', name: 'Creative Collective', bonus: 3 },
  { a: 'athlete', b: 'athlete', name: 'Locker Room', bonus: 3 },
  { a: 'musician', b: 'entertainer', name: 'Headliners', bonus: 3 },
  { a: 'hustler', b: 'villain', name: 'The Syndicate', bonus: 4 },
  { a: 'hustler', b: 'hustler', name: 'Exit Scam', bonus: -3 },
  { a: 'wholesome', b: 'wholesome', name: 'Support System', bonus: 4 },
  { a: 'wholesome', b: 'chaos', name: 'Please Stop', bonus: -4 },
  { a: 'wholesome', b: 'villain', name: 'Moral Friction', bonus: -3 },
  { a: 'chaos', b: 'chaos', name: 'Critical Mass', bonus: 5 },
  { a: 'animal', b: 'wholesome', name: 'Emotional Support', bonus: 4 },
  { a: 'animal', b: 'villain', name: 'PETA Incident', bonus: -4 },
  { a: 'animal', b: 'animal', name: 'The Pack', bonus: 3 },
  { a: 'cryptid', b: 'cryptid', name: 'Blurry Group Photo', bonus: 4 },
  { a: 'internet', b: 'internet', name: 'Ratio Party', bonus: 3 },
  { a: 'gamer', b: 'internet', name: 'Content Farm', bonus: 3 },
  { a: 'gamer', b: 'gamer', name: 'Co-op Campaign', bonus: 3 },
  { a: 'entity', b: 'entity', name: 'Forces of Nature', bonus: 4 },
  { a: 'survivor', b: 'survivor', name: 'Bunker Buddies', bonus: 3 },
  { a: 'entertainer', b: 'entertainer', name: 'Upstaging', bonus: -2 },
  { a: 'ruler', b: 'villain', name: 'Palace Intrigue', bonus: -3 },
  { a: 'ruler', b: 'ruler', name: 'Two Thrones', bonus: -2 },
];

// ─────────────────────────────────────────────
// 4. NAMED DUOS — hand-authored history and beef.
//    These override tag synergy for that pair.
// ─────────────────────────────────────────────

interface NamedDuo { pair: [string, string]; name: string; bonus: number }

const NAMED_DUOS: NamedDuo[] = [
  // History said so
  { pair: ['Diogenes', 'Alexander the Great'], name: 'Stand Out Of My Sunlight', bonus: 8 },
  { pair: ['Sun Tzu', 'Napoleon Bonaparte'], name: 'Required Reading', bonus: 7 },
  { pair: ['Genghis Khan', 'Attila the Hun'], name: 'Horde Merger', bonus: 8 },
  { pair: ['Marie Curie', 'Albert Einstein'], name: 'Solvay Reunion', bonus: 7 },
  { pair: ['Ada Lovelace', 'Nikola Tesla'], name: 'Ahead Of Schedule', bonus: 7 },
  { pair: ['Isaac Newton', 'Albert Einstein'], name: 'Standing On Shoulders', bonus: 6 },
  { pair: ['Isaac Newton', 'Galileo Galilei'], name: 'Peer Review', bonus: 5 },
  { pair: ['Caligula', 'Senator Incitatus'], name: 'Executive Appointment', bonus: 9 },
  { pair: ['Julius Caesar', 'Cleopatra'], name: 'Alexandria Nights', bonus: 7 },
  { pair: ['Napoleon Bonaparte', 'Emperor Norton'], name: 'Emperor-Off', bonus: -4 },
  { pair: ['William Shakespeare', 'Ludwig van Beethoven'], name: 'The Canon', bonus: 6 },
  { pair: ['Vincent van Gogh', 'Andy Warhol'], name: 'Market Timing Debate', bonus: -3 },
  { pair: ['Joan of Arc', 'Harriet Tubman'], name: 'Divine Missions', bonus: 8 },
  { pair: ['Vlad the Impaler', 'Ivan the Terrible'], name: 'Terrible Twos', bonus: 6 },
  { pair: ['Mansa Musa', 'Geoff Bezel'], name: 'Wealth Summit', bonus: 6 },
  { pair: ['Mansa Musa', 'Timothy Dexter'], name: 'Opposite Portfolios', bonus: -3 },
  { pair: ['Spartacus', 'Muhammad Ali'], name: 'The Resistance', bonus: 7 },
  { pair: ['Pythagoras', 'Archimedes'], name: 'Geometry Gang', bonus: 6 },
  // Modern mythology
  { pair: ['Mr. Rogers', 'Bob Ross'], name: 'Public Television Dream Team', bonus: 8 },
  { pair: ['Mr. Rogers', 'Steve Irwin'], name: 'Pure Of Heart', bonus: 7 },
  { pair: ['Nikola Tesla', 'Lizzy Holmz'], name: 'Investor Beware', bonus: -6 },
  { pair: ['Rasputin', 'Prime Rasputin'], name: 'Temporal Anomaly', bonus: 9 },
  { pair: ['Bulk Hogman', 'Iron Mike Tyzen'], name: 'Crossover Event', bonus: 6 },
  { pair: ['Air Goatness', 'Dennis Rodzilla'], name: 'Ring Chemistry', bonus: 8 },
  { pair: ['Leo Pessi', 'Cris Penaldo'], name: 'The Eternal Debate', bonus: -5 },
  { pair: ['Tailor Quick', 'The Hive Queen'], name: 'Stadium Summit', bonus: 7 },
  { pair: ['Slim Shadow', 'Drayke'], name: 'Diss Track Pending', bonus: -5 },
  { pair: ['Elvis Presley', 'Freddie Mercury'], name: 'Kings Of The Stage', bonus: 7 },
  { pair: ['David Bowie', 'Prince'], name: 'Alien Royalty', bonus: 7 },
  { pair: ['Willie Nelsun', 'Snoop Doggo'], name: 'Botany Club', bonus: 8 },
  // Internet lore
  { pair: ['Doge', 'Grouchy Kat'], name: 'Ancient Rivals', bonus: -5 },
  { pair: ['Florida Man', 'Area Man'], name: 'Regional News Network', bonus: 7 },
  { pair: ['Florida Man', 'Chupacabra'], name: 'Local News Segment', bonus: 6 },
  { pair: ['Final Boss', 'Tutorial Boss'], name: 'Career Ladder', bonus: 5 },
  { pair: ['Crypto Bro', 'Sam Bankster-Fried'], name: 'Trust Exercise', bonus: -6 },
  { pair: ['Mister Feast', 'Pay2Win Whale'], name: 'Whale Watching', bonus: 5 },
  // Cryptid cinematic universe
  { pair: ['Bigfoot', 'The Yeti'], name: 'Cousins Reunion', bonus: 7 },
  { pair: ['Mothman', 'Jersey Devil'], name: 'East Coast Chapter', bonus: 6 },
  { pair: ['The Loch Ness Monster', 'The Kraken'], name: 'Deep Sea Union', bonus: 7 },
  { pair: ['Harambe', 'Bigfoot'], name: 'Cryptid-Adjacent Icons', bonus: 5 },
  // Animal kingdom
  { pair: ['Wojtek the Bear', 'Emu War Veteran'], name: 'Veterans Affairs', bonus: 6 },
  { pair: ['Laika', 'Balto'], name: 'Very Good Dogs', bonus: 8 },
  { pair: ['Unsinkable Sam', 'Cher Ami'], name: 'Against All Odds', bonus: 6 },
  { pair: ['Senator Incitatus', 'Emu War Veteran'], name: 'Animals In Government', bonus: 5 },
  // Expansion C character duos
  { pair: ['Leeroy Jenkinz', 'Sun Tzu'], name: 'The Plan Is Discarded', bonus: -7 },
  { pair: ['Leeroy Jenkinz', 'Rage Quitter'], name: 'Speedrun To Disaster', bonus: 5 },
  { pair: ['Speedrun Kid', 'Final Boss'], name: 'Skipped The Monologue', bonus: -6 },
  { pair: ['Sisyphus', 'The Completionist'], name: 'One More Attempt', bonus: 7 },
  { pair: ['Icarus', 'Milk Crate Challenger'], name: 'Altitude Problems', bonus: 6 },
  { pair: ['Tycho Brahe', 'Galileo Galilei'], name: 'Star Party', bonus: 6 },
  { pair: ['Hercules', 'Bulk Hogman'], name: 'The Gun Show', bonus: 5 },
  { pair: ['Medusa', 'The Gigachud'], name: 'Unbothered Eye Contact', bonus: 4 },
  { pair: ['The Minotaur', 'The Dungeon Master'], name: 'Boss Room Booking', bonus: 6 },
  { pair: ['Dumpster Raccoon', 'Loot Goblin'], name: 'Finders Keepers', bonus: 6 },
  { pair: ['Subway Pigeon', 'Cher Ami'], name: 'Distinguished Lineage', bonus: 7 },
  { pair: ['Techno Norseman', 'Festival DJ'], name: 'Crowd Ignition', bonus: 6 },
];

const duoKey = (a: string, b: string) => [a, b].sort().join('|||');
const NAMED_DUO_MAP = new Map(NAMED_DUOS.map(d => [duoKey(d.pair[0], d.pair[1]), d]));

// ─────────────────────────────────────────────
// ENGINE
// ─────────────────────────────────────────────

export interface ChemEffect { name: string; detail: string; bonus: number }

// A card's scenario performance, 0-120 scale.
// OVR is fame; this is function. The gap is the game.
export function cardPerformance(card: AnyCard, scenarioId: string): number {
  const key = toScenarioKey(scenarioId);
  const w = SCENARIO_WEIGHTS[key];
  const gd = getGameData(card.name, cardOVR(card));
  const c = gd.core;
  let perf =
    w.might * c.might + w.brains * c.brains + w.charm * c.charm +
    w.chaos * c.chaos + w.grit * c.grit + w.clout * c.clout;
  // identity affinity
  const aff = TAG_AFFINITY[key];
  for (const t of gd.tags) perf += aff[t] ?? 0;
  return Math.max(5, Math.min(120, Math.round(perf)));
}

// Team chemistry: named duos > tag synergies (max 2 rule hits per pair),
// plus era bonds. Total capped so chemistry seasons the dish, never IS the dish.
export function teamChemistry(cards: AnyCard[], scenarioId: string): { total: number; effects: ChemEffect[] } {
  const effects: ChemEffect[] = [];
  const key = toScenarioKey(scenarioId);

  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      const A = cards[i], B = cards[j];
      const named = NAMED_DUO_MAP.get(duoKey(A.name, B.name));
      if (named) {
        effects.push({ name: named.name, detail: `${A.name} + ${B.name}`, bonus: named.bonus });
        continue;
      }
      const ga = getGameData(A.name, cardOVR(A));
      const gb = getGameData(B.name, cardOVR(B));
      let hits = 0;
      for (const rule of TAG_SYNERGY) {
        if (hits >= 2) break;
        const match =
          (ga.tags.includes(rule.a) && gb.tags.includes(rule.b)) ||
          (ga.tags.includes(rule.b) && gb.tags.includes(rule.a));
        if (match) {
          effects.push({ name: rule.name, detail: `${A.name} + ${B.name}`, bonus: rule.bonus });
          hits++;
        }
      }
      if (ga.era === gb.era && ga.era !== 'timeless' && hits < 2 && !named) {
        effects.push({ name: 'Contemporaries', detail: `${A.name} + ${B.name} (${ga.era})`, bonus: 2 });
      }
    }
  }

  // Team-level identity bonuses (why: a themed squad should feel like a squad)
  const allTags = cards.map(c => getGameData(c.name, cardOVR(c)).tags);
  const tagCount = (t: Tag) => allTags.filter(tags => tags.includes(t)).length;
  if (key === 'zombie' && tagCount('survivor') >= 3) {
    effects.push({ name: 'The Compound', detail: '3+ Survivors in the apocalypse', bonus: 8 });
  }
  if ((key === 'basketball' || key === 'soccer' || key === 'football') && tagCount('athlete') >= 3) {
    effects.push({ name: 'Actual Athletes', detail: '3+ Athletes on a sports team', bonus: 8 });
  }
  if (key === 'wedding' && tagCount('wholesome') >= 3) {
    effects.push({ name: 'Not A Dry Eye', detail: '3+ Wholesome in the bridal party', bonus: 8 });
  }
  if (key === 'groupproject' && tagCount('genius') >= 2) {
    effects.push({ name: 'Carried, Together', detail: '2+ Geniuses on the project', bonus: 6 });
  }

  let total = effects.reduce((s, e) => s + e.bonus, 0);
  total = Math.max(-40, Math.min(40, total));
  return { total, effects };
}

// Legacy-compatible summary strings for the battle UI
export function chemistrySummary(cards: AnyCard[], scenarioId: string): { total: number; active: string[] } {
  const { total, effects } = teamChemistry(cards, scenarioId);
  const sorted = [...effects].sort((a, b) => Math.abs(b.bonus) - Math.abs(a.bonus));
  return {
    total,
    active: sorted.map(e => `${e.name}: ${e.detail} (${e.bonus > 0 ? '+' : ''}${e.bonus})`),
  };
}

// Pair verdict for squad-builder connection lines
export function pairVerdict(a: AnyCard, b: AnyCard): { type: 'good' | 'bad'; name: string; bonus: number } | null {
  const named = NAMED_DUO_MAP.get(duoKey(a.name, b.name));
  if (named) return { type: named.bonus >= 0 ? 'good' : 'bad', name: named.name, bonus: named.bonus };
  const ga = getGameData(a.name, cardOVR(a));
  const gb = getGameData(b.name, cardOVR(b));
  for (const rule of TAG_SYNERGY) {
    const match =
      (ga.tags.includes(rule.a) && gb.tags.includes(rule.b)) ||
      (ga.tags.includes(rule.b) && gb.tags.includes(rule.a));
    if (match) return { type: rule.bonus >= 0 ? 'good' : 'bad', name: rule.name, bonus: rule.bonus };
  }
  if (ga.era === gb.era && ga.era !== 'timeless') return { type: 'good', name: 'Contemporaries', bonus: 2 };
  return null;
}

export type { Era };
