// ============================================
// INFINITE SQUADS - Type Definitions
// The "Omni-Stat" Engine Schema
// ============================================

// ─────────────────────────────────────────────
// ENUMS & CONSTANTS
// ─────────────────────────────────────────────

export type Rarity = 'bronze' | 'silver' | 'gold' | 'holo' | 'glitch' | 'legendary';

export type Theme = 'sports' | 'office' | 'party' | 'roast' | 'rpg' | 'custom';

export type CardMode = 'serious' | 'unserious';

export type ImageFilter = 'normal' | 'bw' | 'deepfried' | 'security' | 'vhs' | 'glitch';

// ─────────────────────────────────────────────
// STAT SYSTEM (Flexible "Omni-Stat")
// ─────────────────────────────────────────────

export interface Stat {
  id: string;
  label: string;
  value: number; // 0-99
  icon: string; // Lucide icon name or emoji
  category?: string; // For grouping in UI
}

export interface StatPreset {
  id: string;
  label: string;
  icon: string;
  category: 'sports' | 'office' | 'roast' | 'party' | 'rpg' | 'custom';
  defaultValue?: number;
}

// ─────────────────────────────────────────────
// TRAITS & BADGES
// ─────────────────────────────────────────────

export interface Trait {
  id: string;
  name: string;
  icon: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral' | 'chaotic';
  effects?: TraitEffect[];
}

export interface TraitEffect {
  statLabel: string; // Which stat to modify
  modifier: number; // +/- value
  condition?: string; // Optional condition text
}

// ─────────────────────────────────────────────
// THE CARD OBJECT
// ─────────────────────────────────────────────

export interface Card {
  id: string;
  name: string;
  nickname?: string;
  image: string | null; // Base64 or URL
  imageFilter: ImageFilter;
  rarity: Rarity;
  theme: Theme;
  mode: CardMode;
  overallRating: number; // 0-99, calculated from stats
  
  // The flexible stat system
  statBlock: Stat[];
  
  // Traits/Badges
  traits: string[]; // Array of trait IDs
  
  // Flavor
  bio: string;
  quote?: string;
  activeEffects?: string[];
  
  // Metadata
  position?: string; // "Striker", "Project Manager", "The Enabler"
  teamId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─────────────────────────────────────────────
// TEAM CHEMISTRY SYSTEM
// ─────────────────────────────────────────────

export interface ChemistryLink {
  id: string;
  name: string; // "Divorced Dads", "College Roommates"
  cardIds: [string, string]; // The two cards linked
  effects: TraitEffect[];
  icon?: string;
  description?: string;
}

export interface GlobalModifier {
  id: string;
  name: string;
  description: string;
  icon: string;
  effects: TraitEffect[];
  duration?: 'permanent' | 'temporary';
  rarity: Rarity;
}

// ─────────────────────────────────────────────
// TEAM / SQUAD
// ─────────────────────────────────────────────

export interface TeamSlot {
  position: { x: number; y: number }; // Grid position
  cardId: string | null;
  role?: string; // "Captain", "Benchwarmer"
}

export interface Team {
  id: string;
  name: string;
  theme: Theme;
  background?: string; // Custom background image/gradient
  
  // The squad
  slots: TeamSlot[];
  captainId?: string;
  
  // Chemistry
  chemistryLinks: ChemistryLink[];
  activeModifiers: string[]; // GlobalModifier IDs
  
  // Calculated
  overallRating: number;
  chemistryScore: number; // 0-100
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

// ─────────────────────────────────────────────
// UI STATE TYPES
// ─────────────────────────────────────────────

export interface CardCreatorState {
  mode: CardMode;
  currentCard: Partial<Card>;
  selectedStatPresets: StatPreset[];
  previewScale: number;
}

export interface TeamBuilderState {
  currentTeam: Team | null;
  selectedCardId: string | null;
  isDragging: boolean;
  showChemistryLines: boolean;
}

// ─────────────────────────────────────────────
// PRESET LIBRARY TYPES
// ─────────────────────────────────────────────

export interface PresetLibrary {
  stats: StatPreset[];
  traits: Trait[];
  quotes: QuotePreset[];
  globalModifiers: GlobalModifier[];
}

export interface QuotePreset {
  id: string;
  text: string;
  category: 'serious' | 'funny' | 'roast' | 'inspirational';
  theme?: Theme;
}

// ─────────────────────────────────────────────
// UTILITY TYPES
// ─────────────────────────────────────────────

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface Position {
  x: number;
  y: number;
}

// Card frame styles based on rarity
export const RARITY_STYLES: Record<Rarity, { gradient: string; glow: string; border: string }> = {
  bronze: {
    gradient: 'linear-gradient(135deg, #CD7F32 0%, #8B4513 50%, #CD7F32 100%)',
    glow: '0 0 20px rgba(205, 127, 50, 0.5)',
    border: '#CD7F32',
  },
  silver: {
    gradient: 'linear-gradient(135deg, #C0C0C0 0%, #808080 50%, #C0C0C0 100%)',
    glow: '0 0 20px rgba(192, 192, 192, 0.5)',
    border: '#C0C0C0',
  },
  gold: {
    gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
    glow: '0 0 30px rgba(255, 215, 0, 0.6)',
    border: '#FFD700',
  },
  holo: {
    gradient: 'linear-gradient(135deg, #ff0080 0%, #00ffff 25%, #ff00ff 50%, #00ff00 75%, #ff0080 100%)',
    glow: '0 0 40px rgba(255, 0, 255, 0.5)',
    border: '#fff',
  },
  glitch: {
    gradient: 'linear-gradient(135deg, #0ff 0%, #f0f 50%, #ff0 100%)',
    glow: '0 0 50px rgba(0, 255, 255, 0.7), 0 0 100px rgba(255, 0, 255, 0.5)',
    border: '#0ff',
  },
  legendary: {
    gradient: 'linear-gradient(135deg, #FFD700 0%, #FF4500 25%, #FFD700 50%, #FF6347 75%, #FFD700 100%)',
    glow: '0 0 60px rgba(255, 69, 0, 0.8), 0 0 120px rgba(255, 215, 0, 0.5)',
    border: '#FF4500',
  },
};

// Theme backgrounds
export const THEME_BACKGROUNDS: Record<Theme, string> = {
  sports: 'url("/backgrounds/grass.jpg")',
  office: 'url("/backgrounds/office.jpg")',
  party: 'url("/backgrounds/club.jpg")',
  roast: 'url("/backgrounds/flames.jpg")',
  rpg: 'url("/backgrounds/dungeon.jpg")',
  custom: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
};
