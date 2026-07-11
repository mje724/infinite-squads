// ============================================
// INFINITE SQUADS - CARD REGISTRY
// The gameplay identity layer. Every card has:
//  - era     : when they're from (drives "Contemporaries" chemistry)
//  - tags    : what they ARE (drives synergies, affinities, collections)
//  - core    : six attributes that decide performance per scenario
//
// OVR (the big number on the card) = fame. Core stats = function.
// A 95-OVR sweetheart can be a disaster in a zombie apocalypse.
// That gap between fame and fit is the entire strategy layer.
//
// Core stats, 1-99:
//  might  – physical power & presence
//  brains – intellect, planning, wit
//  charm  – social gravity, likability
//  chaos  – unpredictability (an asset at parties, a bomb at weddings)
//  grit   – durability, survival, stubbornness
//  clout  – fame, influence, aura
// ============================================

export type Era = 'ancient' | 'classical' | 'renaissance' | 'industrial' | 'modern' | 'internet' | 'timeless';

export type Tag =
  | 'warlord' | 'ruler' | 'genius' | 'inventor' | 'philosopher'
  | 'artist' | 'musician' | 'athlete' | 'entertainer' | 'hustler'
  | 'villain' | 'wholesome' | 'chaos' | 'survivor' | 'animal'
  | 'entity' | 'cryptid' | 'gamer' | 'internet';

export const TAG_LABELS: Record<Tag, string> = {
  warlord: 'Warlord', ruler: 'Ruler', genius: 'Genius', inventor: 'Inventor',
  philosopher: 'Philosopher', artist: 'Artist', musician: 'Musician',
  athlete: 'Athlete', entertainer: 'Entertainer', hustler: 'Hustler',
  villain: 'Villain', wholesome: 'Wholesome', chaos: 'Chaos Agent',
  survivor: 'Survivor', animal: 'Animal', entity: 'Entity',
  cryptid: 'Cryptid', gamer: 'Gamer', internet: 'Terminally Online',
};

export interface CoreStats {
  might: number; brains: number; charm: number; chaos: number; grit: number; clout: number;
}

export interface CardGameData {
  era: Era;
  tags: Tag[];
  core: CoreStats;
}

// compact constructor: d(era, tags, might, brains, charm, chaos, grit, clout)
function d(era: Era, tags: Tag[], mi: number, br: number, ch: number, cx: number, gr: number, cl: number): CardGameData {
  return { era, tags, core: { might: mi, brains: br, charm: ch, chaos: cx, grit: gr, clout: cl } };
}

export const CARD_REGISTRY: Record<string, CardGameData> = {
  // ── Original roster: internet chaos ──
  'Florida Man': d('internet', ['chaos', 'survivor'], 72, 20, 45, 99, 90, 80),
  'Harambe': d('internet', ['animal', 'wholesome'], 92, 40, 70, 20, 60, 96),
  'Killdozer': d('modern', ['chaos', 'villain'], 95, 55, 10, 88, 92, 55),
  'Boeing Door Plug': d('modern', ['entity', 'chaos'], 40, 5, 10, 97, 15, 70),
  'Yusuf Dilek': d('modern', ['hustler'], 45, 60, 55, 50, 55, 35),

  // ── Original roster: legends with edge ──
  'Nikola Tesla': d('industrial', ['genius', 'inventor'], 30, 99, 40, 55, 60, 75),
  'Diogenes': d('ancient', ['philosopher', 'chaos'], 35, 88, 30, 95, 85, 70),
  'Rasputin': d('industrial', ['villain', 'survivor'], 70, 60, 88, 80, 99, 78),
  'Hunter S. Thompson': d('modern', ['artist', 'chaos'], 45, 82, 60, 96, 70, 72),
  'Genghis Khan': d('classical', ['warlord', 'ruler'], 97, 85, 40, 70, 92, 95),
  'Cleopatra': d('ancient', ['ruler'], 40, 90, 97, 45, 65, 92),
  'Frederick Douglass': d('industrial', ['philosopher', 'survivor'], 65, 95, 90, 20, 95, 88),
  'Sun Tzu': d('ancient', ['philosopher', 'warlord', 'genius'], 55, 99, 60, 25, 75, 90),
  'Bruce Lee': d('modern', ['athlete', 'philosopher'], 96, 80, 75, 30, 88, 94),
  'Julius Caesar': d('ancient', ['ruler', 'warlord'], 75, 88, 80, 50, 40, 96),
  'Mr. Rogers': d('modern', ['wholesome', 'entertainer'], 20, 80, 99, 5, 70, 90),
  'Bob Ross': d('modern', ['wholesome', 'artist'], 30, 70, 96, 10, 75, 85),
  'Steve Irwin': d('modern', ['wholesome', 'survivor', 'entertainer'], 70, 65, 92, 60, 85, 88),
  'Freddie Mercury': d('modern', ['musician', 'entertainer'], 45, 70, 95, 55, 65, 97),
  'Teddy Roosevelt': d('industrial', ['ruler', 'warlord', 'survivor'], 88, 80, 78, 55, 96, 90),
  'Marie Curie': d('industrial', ['genius', 'inventor'], 25, 98, 50, 20, 88, 85),
  'Harriet Tubman': d('industrial', ['survivor', 'wholesome', 'warlord'], 70, 90, 70, 30, 99, 90),
  'Muhammad Ali': d('modern', ['athlete', 'entertainer'], 97, 70, 95, 45, 92, 98),
  'Napoleon Bonaparte': d('industrial', ['warlord', 'ruler'], 70, 94, 55, 55, 70, 95),
  'Alexander the Great': d('ancient', ['warlord', 'ruler'], 90, 88, 70, 60, 65, 97),
  'Albert Einstein': d('modern', ['genius'], 15, 99, 70, 35, 60, 99),
  'Elvis Presley': d('modern', ['musician', 'entertainer'], 50, 50, 96, 50, 45, 97),
  'Leonardo da Vinci': d('renaissance', ['genius', 'inventor', 'artist'], 45, 99, 65, 40, 60, 95),
  'Winston Churchill': d('modern', ['ruler', 'warlord'], 45, 90, 75, 45, 92, 92),
  'Ludwig van Beethoven': d('industrial', ['musician', 'artist'], 40, 92, 30, 60, 85, 92),
  'Wolfgang Amadeus Mozart': d('industrial', ['musician', 'chaos'], 25, 95, 70, 75, 40, 93),
  'Abraham Lincoln': d('industrial', ['ruler', 'philosopher'], 75, 92, 82, 15, 90, 96),
  'Attila the Hun': d('classical', ['warlord', 'villain'], 95, 70, 30, 75, 88, 88),
  'David Bowie': d('modern', ['musician', 'artist'], 35, 82, 92, 70, 60, 92),
  'Prince': d('modern', ['musician', 'artist'], 45, 78, 93, 55, 65, 90),
  'Harry Houdini': d('industrial', ['entertainer', 'survivor'], 75, 80, 78, 50, 90, 85),
  'Confucius': d('ancient', ['philosopher'], 25, 96, 78, 5, 70, 92),
  'Socrates': d('ancient', ['philosopher', 'chaos'], 45, 97, 55, 60, 80, 90),
  'Benjamin Franklin': d('industrial', ['genius', 'inventor', 'hustler'], 35, 95, 85, 40, 70, 92),
  'P.T. Barnum': d('industrial', ['hustler', 'entertainer'], 40, 82, 88, 65, 60, 85),
  'Andy Warhol': d('modern', ['artist', 'hustler'], 20, 80, 70, 55, 50, 88),

  // ── Original roster: parody moderns ──
  'Kianu Reaves': d('modern', ['wholesome', 'entertainer'], 80, 60, 92, 15, 85, 90),
  'Donny DeVeeto': d('modern', ['entertainer', 'chaos'], 35, 65, 90, 75, 70, 85),
  'Nicolaus Kage': d('modern', ['entertainer', 'chaos'], 55, 55, 70, 97, 75, 84),
  'Snoop Doggo': d('modern', ['musician', 'entertainer'], 40, 70, 94, 55, 80, 92),
  'Gordo Ramzey': d('modern', ['entertainer', 'villain'], 60, 80, 60, 70, 75, 88),
  'Shaqster': d('modern', ['athlete', 'entertainer'], 98, 55, 90, 50, 80, 92),
  'Marfa Stewhart': d('modern', ['hustler', 'entertainer', 'survivor'], 30, 88, 75, 40, 85, 82),
  'Iron Mike Tyzen': d('modern', ['athlete', 'chaos'], 99, 45, 55, 85, 95, 90),
  'Odd Al': d('modern', ['musician', 'entertainer', 'wholesome'], 30, 85, 80, 65, 70, 78),
  'Guy Fierro': d('modern', ['entertainer', 'wholesome'], 50, 55, 88, 45, 75, 80),
  'Bad Luck Brian': d('internet', ['internet', 'survivor'], 25, 40, 55, 60, 92, 70),
  'Grimace': d('modern', ['entity', 'wholesome', 'chaos'], 70, 10, 85, 80, 75, 85),
  'Elan Muskrat': d('internet', ['hustler', 'internet', 'chaos'], 30, 85, 35, 88, 60, 96),
  'Mark Zuckerbot': d('internet', ['hustler', 'internet'], 40, 90, 15, 30, 70, 88),
  'Geoff Bezel': d('internet', ['hustler', 'ruler'], 55, 92, 30, 25, 75, 90),
  'The Pebble': d('modern', ['athlete', 'entertainer'], 97, 60, 90, 30, 90, 95),
  'Joey Rogaine': d('internet', ['entertainer', 'internet'], 75, 50, 70, 65, 80, 85),
  'DJ Khaleb': d('modern', ['musician', 'hustler'], 45, 40, 80, 55, 60, 82),
  'Tommy Weisau': d('modern', ['artist', 'chaos'], 40, 30, 55, 92, 80, 72),
  'Gary Buseye': d('modern', ['entertainer', 'chaos'], 55, 25, 50, 95, 78, 60),
  'Charlee Sheenz': d('modern', ['entertainer', 'chaos'], 45, 40, 70, 90, 65, 75),
  'Flavor Flame': d('modern', ['musician', 'entertainer', 'chaos'], 40, 45, 82, 80, 70, 78),
  'Bulk Hogman': d('modern', ['athlete', 'entertainer'], 94, 35, 80, 60, 90, 88),
  'Ozzy Ozzborne': d('modern', ['musician', 'chaos', 'survivor'], 50, 30, 70, 92, 94, 86),
  'Arnold Schwarzenlifter': d('modern', ['athlete', 'entertainer', 'ruler'], 96, 65, 80, 35, 88, 92),
  'Toast Malone': d('internet', ['musician', 'wholesome'], 35, 55, 85, 50, 70, 84),
  'Isle Boys': d('internet', ['musician', 'internet'], 45, 50, 75, 70, 60, 72),
  'Scumbag Steve': d('internet', ['internet', 'villain', 'hustler'], 40, 35, 45, 75, 65, 62),
  'Lizzy Holmz': d('internet', ['hustler', 'villain'], 20, 78, 82, 45, 70, 75),
  'George Santoro': d('modern', ['hustler', 'villain', 'chaos'], 25, 55, 75, 88, 60, 68),
  'Sam Bankster-Fried': d('internet', ['hustler', 'villain', 'gamer'], 15, 80, 50, 70, 40, 72),
  'Billy FyreFarland': d('internet', ['hustler', 'villain'], 30, 60, 80, 82, 55, 70),
  'Kidney King': d('modern', ['hustler', 'villain', 'chaos'], 50, 45, 65, 85, 70, 55),
  'Antonio Braun': d('modern', ['athlete', 'chaos'], 88, 30, 50, 94, 75, 78),
  'Rachael Dolezall': d('modern', ['chaos', 'hustler'], 30, 50, 55, 80, 60, 58),
  '7ix8ine': d('internet', ['musician', 'villain', 'chaos'], 35, 30, 50, 90, 45, 76),
  'Atom Levine': d('modern', ['musician'], 40, 45, 78, 40, 50, 74),
  'Coco Siwa': d('internet', ['entertainer', 'internet'], 35, 50, 78, 70, 65, 76),
  'Wil Smyth': d('modern', ['entertainer'], 70, 60, 85, 60, 65, 86),
  'Logang Paulson': d('internet', ['internet', 'hustler', 'athlete'], 75, 45, 60, 78, 78, 84),
  'Pepper Bae': d('internet', ['entertainer', 'internet', 'hustler'], 45, 40, 72, 50, 55, 74),
  'Hilarya Baldwing': d('modern', ['chaos', 'hustler'], 25, 45, 65, 72, 50, 55),
  'Ben Shapirno': d('internet', ['internet', 'philosopher'], 25, 78, 40, 55, 65, 76),
  'Travesty Scott': d('modern', ['musician', 'entertainer'], 45, 50, 75, 70, 60, 85),
  'Raegun': d('modern', ['athlete', 'chaos', 'entertainer'], 45, 40, 55, 95, 60, 70),

  // ── Icons (collection rewards) ──
  'Prime Da Vinci': d('renaissance', ['genius', 'inventor', 'artist'], 55, 99, 75, 45, 70, 99),
  'Hannibal of Carthage': d('ancient', ['warlord', 'genius'], 90, 97, 60, 70, 90, 96),
  'Charles Ponzi': d('industrial', ['hustler', 'villain'], 30, 90, 96, 60, 55, 92),
  'Doge': d('internet', ['internet', 'animal', 'wholesome'], 40, 55, 96, 60, 75, 99),
  'Prime Rasputin': d('industrial', ['villain', 'survivor', 'entity'], 80, 70, 92, 85, 99, 95),
  'Marcus Aurelius': d('classical', ['ruler', 'philosopher'], 70, 97, 80, 10, 92, 95),
  'George Washington': d('industrial', ['ruler', 'warlord', 'wholesome'], 80, 88, 85, 20, 92, 98),
  'Dolly Party': d('modern', ['musician', 'wholesome', 'entertainer'], 40, 88, 99, 25, 88, 97),
  'The Missing Link': d('timeless', ['cryptid', 'animal', 'survivor'], 92, 60, 70, 75, 97, 96),
  'The GOAT': d('timeless', ['animal', 'wholesome', 'athlete'], 85, 50, 92, 65, 95, 99),
  'The Speedgod': d('internet', ['gamer', 'entity', 'genius'], 60, 96, 55, 80, 90, 95),
  'Main Character': d('internet', ['internet', 'entertainer'], 65, 70, 95, 85, 80, 99),

  // ── Expansion A: internet & memes ──
  'Grouchy Kat': d('internet', ['internet', 'animal', 'villain'], 30, 55, 70, 40, 80, 92),
  'Rickrolla': d('internet', ['internet', 'musician', 'wholesome'], 40, 60, 85, 55, 88, 90),
  'The Gigachud': d('internet', ['internet', 'athlete'], 92, 30, 75, 40, 85, 88),
  'Mister Feast': d('internet', ['internet', 'hustler', 'wholesome'], 45, 85, 80, 50, 75, 95),
  'PewDeeGuy': d('internet', ['internet', 'gamer', 'entertainer'], 35, 60, 75, 65, 80, 90),
  'Reply Guy': d('internet', ['internet'], 15, 45, 20, 50, 70, 30),
  'Doomscroller': d('internet', ['internet', 'survivor'], 10, 50, 25, 35, 88, 35),
  'The Lurker': d('internet', ['internet', 'survivor'], 20, 65, 15, 20, 85, 25),
  'Ratio King': d('internet', ['internet', 'villain'], 25, 70, 45, 65, 60, 68),
  'Milk Crate Challenger': d('internet', ['internet', 'chaos'], 60, 10, 40, 90, 30, 55),
  'NPC Streamer': d('internet', ['internet', 'entertainer'], 30, 25, 65, 70, 75, 70),
  'VTuber Prime': d('internet', ['internet', 'entertainer'], 25, 70, 90, 50, 65, 84),
  'Speedrun Kid': d('internet', ['gamer', 'internet', 'genius'], 35, 90, 45, 55, 85, 78),
  'Twitch Chat': d('internet', ['internet', 'entity', 'chaos'], 50, 40, 55, 99, 90, 92),
  'The Algorithm': d('internet', ['entity', 'internet', 'villain'], 60, 99, 70, 85, 95, 99),
  'Wojak Doomer': d('internet', ['internet', 'philosopher'], 15, 60, 25, 30, 75, 45),
  'Sigma Grindset': d('internet', ['internet', 'hustler', 'athlete'], 70, 40, 35, 45, 90, 60),
  'The Manager Summoner': d('modern', ['chaos', 'villain'], 40, 35, 15, 88, 85, 55),
  'Area Man': d('internet', ['internet', 'chaos', 'survivor'], 55, 30, 50, 85, 80, 60),

  // ── Expansion A: gaming archetypes ──
  'Rage Quitter': d('internet', ['gamer', 'chaos'], 45, 35, 20, 85, 15, 40),
  'The Completionist': d('internet', ['gamer', 'survivor'], 30, 80, 35, 15, 96, 60),
  'Loot Goblin': d('internet', ['gamer', 'hustler'], 35, 60, 25, 70, 75, 50),
  'Tutorial Boss': d('internet', ['gamer', 'wholesome'], 55, 30, 60, 10, 25, 45),
  'Final Boss': d('internet', ['gamer', 'villain', 'entity'], 96, 85, 40, 70, 92, 92),
  'Side Quest NPC': d('internet', ['gamer', 'wholesome'], 20, 40, 65, 15, 60, 35),
  'Pay2Win Whale': d('internet', ['gamer', 'hustler'], 45, 30, 40, 45, 70, 75),
  'The Dungeon Master': d('internet', ['gamer', 'genius', 'entertainer'], 35, 92, 75, 65, 80, 72),
  'Lag': d('internet', ['entity', 'chaos', 'villain'], 70, 30, 5, 99, 95, 85),
  'Patch Notes': d('internet', ['entity', 'gamer'], 50, 75, 30, 80, 60, 70),
  'Esports Washout': d('internet', ['gamer', 'athlete', 'survivor'], 40, 70, 45, 40, 65, 58),
  'The Backlog': d('internet', ['entity', 'gamer'], 30, 45, 20, 25, 97, 45),

  // ── Expansion A: modern archetypes & entities ──
  'Gym Bro': d('modern', ['athlete', 'wholesome'], 88, 25, 60, 35, 85, 55),
  'Crypto Bro': d('internet', ['hustler', 'internet'], 30, 40, 50, 75, 88, 45),
  'LinkedIn Lion': d('internet', ['hustler', 'internet'], 25, 55, 45, 30, 70, 42),
  'Podcast Bro': d('internet', ['entertainer', 'hustler', 'internet'], 45, 45, 65, 55, 70, 62),
  'Astrology Girlie': d('internet', ['philosopher', 'internet'], 20, 50, 78, 65, 60, 58),
  'HOA President': d('modern', ['villain', 'ruler'], 40, 60, 20, 55, 90, 48),
  'The Intern': d('modern', ['survivor', 'wholesome'], 35, 65, 70, 30, 92, 30),
  'Fantasy Commissioner': d('modern', ['ruler', 'gamer'], 30, 75, 50, 60, 80, 52),
  'Group Chat Ghost': d('internet', ['internet', 'survivor'], 25, 55, 40, 35, 85, 38),
  'The Wi-Fi Router': d('modern', ['entity', 'villain'], 45, 70, 10, 90, 40, 76),
  'Printer At Work': d('modern', ['entity', 'villain'], 30, 15, 5, 92, 55, 50),
  'Monday': d('timeless', ['entity', 'villain'], 75, 60, 10, 70, 99, 90),
  'Autocorrect': d('internet', ['entity', 'chaos'], 20, 55, 30, 94, 70, 66),
  'Student Loans': d('modern', ['entity', 'villain'], 65, 85, 5, 40, 99, 88),
  'The Aux Cord': d('modern', ['entity', 'musician'], 25, 40, 92, 60, 55, 80),
  'Jury Duty': d('modern', ['entity'], 40, 60, 15, 45, 88, 60),

  // ── Expansion B: historical bangers ──
  'Joan of Arc': d('renaissance', ['warlord', 'wholesome', 'survivor'], 80, 78, 85, 45, 95, 94),
  'Vlad the Impaler': d('renaissance', ['warlord', 'villain'], 90, 75, 20, 80, 88, 90),
  'Caligula': d('ancient', ['ruler', 'villain', 'chaos'], 55, 50, 60, 96, 40, 82),
  'Nero': d('ancient', ['ruler', 'chaos', 'musician'], 45, 45, 55, 90, 35, 74),
  'Ivan the Terrible': d('renaissance', ['ruler', 'villain'], 70, 72, 25, 78, 75, 84),
  'Catherine the Great': d('industrial', ['ruler', 'genius'], 50, 92, 85, 40, 80, 90),
  'Galileo Galilei': d('renaissance', ['genius', 'survivor'], 30, 97, 55, 45, 85, 90),
  'Isaac Newton': d('industrial', ['genius'], 25, 99, 25, 50, 75, 95),
  'Charles Darwin': d('industrial', ['genius', 'survivor'], 35, 96, 55, 25, 82, 90),
  'Sigmund Freud': d('industrial', ['genius', 'philosopher'], 20, 88, 60, 55, 65, 84),
  'William Shakespeare': d('renaissance', ['artist', 'genius'], 30, 97, 80, 50, 70, 97),
  'Vincent van Gogh': d('industrial', ['artist'], 35, 85, 40, 70, 78, 92),
  'Mansa Musa': d('classical', ['ruler', 'hustler'], 60, 85, 88, 35, 75, 96),
  'Emperor Norton': d('industrial', ['ruler', 'chaos', 'wholesome'], 25, 55, 88, 75, 70, 72),
  'Timothy Dexter': d('industrial', ['hustler', 'chaos'], 30, 20, 60, 92, 80, 62),
  'Senator Incitatus': d('ancient', ['animal', 'ruler'], 75, 10, 70, 60, 70, 78),
  'Pythagoras': d('ancient', ['genius', 'philosopher', 'chaos'], 30, 94, 50, 70, 60, 86),
  'Archimedes': d('ancient', ['genius', 'inventor'], 35, 96, 40, 60, 65, 88),
  'Ada Lovelace': d('industrial', ['genius', 'inventor'], 25, 96, 65, 30, 70, 86),
  'Blackbeard': d('industrial', ['warlord', 'villain', 'hustler'], 88, 70, 55, 78, 85, 86),
  'Spartacus': d('ancient', ['warlord', 'survivor'], 92, 72, 70, 50, 94, 88),
  'Hatshepsut': d('ancient', ['ruler'], 45, 85, 75, 25, 80, 78),
  'Dancing Plague Patient Zero': d('renaissance', ['chaos', 'survivor'], 40, 10, 45, 96, 88, 55),

  // ── Expansion B: sports parodies ──
  'Air Goatness': d('modern', ['athlete'], 95, 85, 70, 55, 96, 99),
  'Leo Pessi': d('modern', ['athlete', 'wholesome'], 80, 92, 70, 25, 88, 98),
  'Cris Penaldo': d('modern', ['athlete', 'entertainer'], 92, 75, 80, 45, 92, 98),
  'Insane Jolt': d('modern', ['athlete', 'entertainer'], 94, 55, 85, 40, 80, 92),
  'Serena Willpower': d('modern', ['athlete'], 93, 80, 75, 35, 94, 94),
  'Lion Woods': d('modern', ['athlete', 'survivor'], 85, 82, 60, 55, 90, 93),
  'Wayne Greatzky': d('modern', ['athlete', 'genius'], 75, 95, 65, 20, 80, 92),
  'Yogi Barely': d('modern', ['athlete', 'philosopher'], 70, 60, 80, 55, 75, 82),
  'Dennis Rodzilla': d('modern', ['athlete', 'chaos', 'entertainer'], 88, 50, 60, 92, 85, 84),
  'The Zamboni Guy': d('modern', ['athlete', 'wholesome'], 55, 40, 75, 15, 80, 45),

  // ── Expansion B: music & entertainment parodies ──
  'Tailor Quick': d('modern', ['musician', 'genius'], 35, 92, 90, 30, 85, 99),
  'The Hive Queen': d('modern', ['musician', 'ruler'], 55, 85, 95, 25, 90, 98),
  'Slim Shadow': d('modern', ['musician', 'chaos'], 45, 90, 55, 85, 80, 93),
  'Drayke': d('internet', ['musician', 'internet'], 40, 70, 78, 60, 60, 92),
  'Bad Rabbit': d('modern', ['musician', 'entertainer'], 50, 65, 88, 55, 70, 93),
  'Willie Nelsun': d('modern', ['musician', 'survivor', 'wholesome'], 35, 60, 90, 55, 95, 88),
  'Lil Blimp': d('internet', ['musician', 'internet'], 25, 30, 50, 75, 40, 48),
  'Festival DJ': d('modern', ['musician', 'hustler'], 30, 35, 70, 50, 60, 58),
  'Garage Band Dad': d('modern', ['musician', 'wholesome'], 40, 45, 65, 30, 75, 35),
  'K-Pop Trainee': d('modern', ['musician', 'athlete'], 60, 55, 80, 20, 92, 62),

  // ── Expansion B: cryptids & folklore ──
  'Bigfoot': d('timeless', ['cryptid', 'survivor'], 94, 40, 55, 45, 96, 95),
  'Mothman': d('timeless', ['cryptid'], 70, 65, 45, 70, 80, 86),
  'The Loch Ness Monster': d('timeless', ['cryptid', 'hustler'], 85, 50, 65, 40, 92, 90),
  'Chupacabra': d('timeless', ['cryptid', 'villain'], 72, 35, 25, 75, 82, 70),
  'The Yeti': d('timeless', ['cryptid', 'survivor'], 90, 45, 40, 35, 95, 78),
  'Jersey Devil': d('timeless', ['cryptid', 'chaos'], 68, 40, 30, 88, 78, 68),
  'The Kraken': d('timeless', ['cryptid', 'entity', 'warlord'], 99, 55, 20, 80, 96, 94),
  'Area 51 Intern': d('modern', ['survivor', 'internet'], 30, 70, 50, 40, 88, 55),

  // ── Expansion B: heroic animals ──
  'Wojtek the Bear': d('modern', ['animal', 'warlord', 'wholesome'], 95, 35, 88, 50, 92, 88),
  'Cher Ami': d('modern', ['animal', 'survivor', 'wholesome'], 30, 55, 75, 25, 98, 82),
  'Unsinkable Sam': d('modern', ['animal', 'survivor'], 35, 50, 80, 55, 99, 80),
  'Laika': d('modern', ['animal', 'wholesome'], 40, 45, 92, 20, 95, 94),
  'Emu War Veteran': d('modern', ['animal', 'warlord', 'chaos'], 80, 25, 45, 90, 94, 86),
  'Balto': d('modern', ['animal', 'wholesome', 'athlete'], 78, 55, 85, 25, 95, 88),

  // ── Expansion C: characters only ──
  'Leeroy Jenkinz': d('internet', ['gamer', 'chaos'], 85, 10, 70, 99, 60, 92),
  'Techno Norseman': d('internet', ['internet', 'chaos', 'musician'], 88, 40, 80, 75, 82, 78),
  'The Speedcuber': d('modern', ['gamer', 'genius'], 25, 90, 40, 20, 80, 50),
  'Couch Co-op Legend': d('modern', ['gamer', 'wholesome'], 40, 55, 82, 25, 75, 45),
  'Open Mic Comedian': d('modern', ['entertainer', 'survivor'], 30, 60, 65, 55, 90, 30),
  'Subway Pigeon': d('modern', ['animal', 'survivor', 'internet'], 35, 60, 55, 65, 94, 55),
  'Dumpster Raccoon': d('modern', ['animal', 'hustler', 'chaos'], 50, 70, 60, 85, 88, 60),
  'Tycho Brahe': d('renaissance', ['genius', 'chaos'], 45, 95, 75, 80, 55, 82),
  'Hercules': d('ancient', ['warlord', 'athlete'], 99, 45, 78, 65, 95, 97),
  'Medusa': d('ancient', ['cryptid', 'villain'], 80, 65, 40, 70, 85, 88),
  'Sisyphus': d('ancient', ['survivor', 'philosopher'], 88, 60, 50, 15, 99, 80),
  'Icarus': d('ancient', ['chaos'], 45, 25, 65, 95, 15, 75),
  'The Minotaur': d('ancient', ['cryptid', 'warlord'], 95, 35, 20, 70, 90, 84),
  'Zeus': d('ancient', ['ruler', 'entity', 'chaos'], 95, 80, 85, 90, 88, 99),
};

// Legacy/custom cards not in the registry still play: derive a flat
// profile from OVR so nothing breaks, it's just unspecialized.
export function getGameData(name: string, ovr: number): CardGameData {
  const found = CARD_REGISTRY[name];
  if (found) return found;
  const flat = Math.max(10, Math.min(95, Math.round(ovr * 0.85)));
  return { era: 'timeless', tags: [], core: { might: flat, brains: flat, charm: flat, chaos: flat, grit: flat, clout: flat } };
}
