// ============================================
// INFINITE SQUADS - Zustand Store
// Global State Management
// ============================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  Card, 
  Team, 
  ChemistryLink, 
  CardMode, 
  Stat, 
  Rarity, 
  Theme, 
  ImageFilter,
  GlobalModifier 
} from '@/types/schema';
import { getRandomStats, getRandomQuote, STAT_PRESETS } from '@/data/presets';
import { nanoid } from 'nanoid';

// ─────────────────────────────────────────────
// CARD COLLECTION STORE
// ─────────────────────────────────────────────

interface CardCollectionState {
  cards: Card[];
  
  // Actions
  addCard: (card: Card) => void;
  updateCard: (id: string, updates: Partial<Card>) => void;
  removeCard: (id: string) => void;
  duplicateCard: (id: string) => Card | null;
  getCardById: (id: string) => Card | undefined;
  clearCollection: () => void;
}

export const useCardCollection = create<CardCollectionState>()(
  persist(
    (set, get) => ({
      cards: [],
      
      addCard: (card) => set((state) => ({ 
        cards: [...state.cards, card] 
      })),
      
      updateCard: (id, updates) => set((state) => ({
        cards: state.cards.map((card) => 
          card.id === id ? { ...card, ...updates, updatedAt: new Date() } : card
        ),
      })),
      
      removeCard: (id) => set((state) => ({
        cards: state.cards.filter((card) => card.id !== id),
      })),
      
      duplicateCard: (id) => {
        const card = get().cards.find((c) => c.id === id);
        if (!card) return null;
        
        const newCard: Card = {
          ...card,
          id: nanoid(),
          name: `${card.name} (Copy)`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set((state) => ({ cards: [...state.cards, newCard] }));
        return newCard;
      },
      
      getCardById: (id) => get().cards.find((c) => c.id === id),
      
      clearCollection: () => set({ cards: [] }),
    }),
    {
      name: 'infinite-squads-cards',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// ─────────────────────────────────────────────
// CARD CREATOR STORE (Active Editor State)
// ─────────────────────────────────────────────

interface CardCreatorState {
  // Mode
  mode: CardMode;
  setMode: (mode: CardMode) => void;
  
  // Current Card Being Edited
  currentCard: Partial<Card>;
  
  // Card Field Updates
  setName: (name: string) => void;
  setNickname: (nickname: string) => void;
  setImage: (image: string | null) => void;
  setImageFilter: (filter: ImageFilter) => void;
  setRarity: (rarity: Rarity) => void;
  setTheme: (theme: Theme) => void;
  setPosition: (position: string) => void;
  setBio: (bio: string) => void;
  setQuote: (quote: string) => void;
  
  // Stats Management
  setStatBlock: (stats: Stat[]) => void;
  updateStat: (index: number, updates: Partial<Stat>) => void;
  addStat: (stat: Stat) => void;
  removeStat: (index: number) => void;
  
  // Traits Management
  addTrait: (traitId: string) => void;
  removeTrait: (traitId: string) => void;
  setTraits: (traitIds: string[]) => void;
  toggleEffect: (effectId: string) => void;
  setEffects: (effectIds: string[]) => void;
  clearEffects: () => void;
  
  // Computed
  calculateOverallRating: () => number;
  
  // Actions
  resetCard: () => void;
  loadCard: (card: Card) => void;
  randomizeQuote: (category?: 'serious' | 'funny' | 'roast' | 'inspirational') => void;
  loadPresetStats: (category: string) => void;
  
  // Finalize
  finalizeCard: () => Card;
}

const createDefaultCard = (mode: CardMode = 'serious'): Partial<Card> => ({
  id: nanoid(),
  name: '',
  nickname: '',
  image: null,
  imageFilter: 'normal',
  rarity: mode === 'serious' ? 'gold' : 'glitch',
  theme: mode === 'serious' ? 'sports' : 'roast',
  mode,
  overallRating: 0,
  statBlock: [],
  traits: [],
  activeEffects: [],
  bio: '',
  quote: '',
  position: '',
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const useCardCreator = create<CardCreatorState>()((set, get) => ({
  mode: 'serious',
  currentCard: createDefaultCard('serious'),
  
  setMode: (mode) => {
    const currentCard = get().currentCard;
    set({ 
      mode,
      currentCard: {
        ...currentCard,
        mode,
        rarity: mode === 'serious' ? 'gold' : 'glitch',
        theme: mode === 'serious' ? 'sports' : 'roast',
        imageFilter: mode === 'serious' ? 'normal' : 'deepfried',
      }
    });
  },
  
  setName: (name) => set((state) => ({
    currentCard: { ...state.currentCard, name }
  })),
  
  setNickname: (nickname) => set((state) => ({
    currentCard: { ...state.currentCard, nickname }
  })),
  
  setImage: (image) => set((state) => ({
    currentCard: { ...state.currentCard, image }
  })),
  
  setImageFilter: (imageFilter) => set((state) => ({
    currentCard: { ...state.currentCard, imageFilter }
  })),
  
  setRarity: (rarity) => set((state) => ({
    currentCard: { ...state.currentCard, rarity }
  })),
  
  setTheme: (theme) => set((state) => ({
    currentCard: { ...state.currentCard, theme }
  })),
  
  setPosition: (position) => set((state) => ({
    currentCard: { ...state.currentCard, position }
  })),
  
  setBio: (bio) => set((state) => ({
    currentCard: { ...state.currentCard, bio }
  })),
  
  setQuote: (quote) => set((state) => ({
    currentCard: { ...state.currentCard, quote }
  })),
  
  setStatBlock: (statBlock) => set((state) => ({
    currentCard: { ...state.currentCard, statBlock }
  })),
  
  updateStat: (index, updates) => set((state) => {
    const statBlock = [...(state.currentCard.statBlock || [])];
    if (statBlock[index]) {
      statBlock[index] = { ...statBlock[index], ...updates };
    }
    return { currentCard: { ...state.currentCard, statBlock } };
  }),
  
  addStat: (stat) => set((state) => ({
    currentCard: {
      ...state.currentCard,
      statBlock: [...(state.currentCard.statBlock || []), stat]
    }
  })),
  
  removeStat: (index) => set((state) => ({
    currentCard: {
      ...state.currentCard,
      statBlock: (state.currentCard.statBlock || []).filter((_, i) => i !== index)
    }
  })),
  
  addTrait: (traitId) => set((state) => ({
    currentCard: {
      ...state.currentCard,
      traits: [...(state.currentCard.traits || []), traitId]
    }
  })),
  
  removeTrait: (traitId) => set((state) => ({
    currentCard: {
      ...state.currentCard,
      traits: (state.currentCard.traits || []).filter((id) => id !== traitId)
    }
  })),
  
  setTraits: (traitIds) => set((state) => ({
    currentCard: { ...state.currentCard, traits: traitIds }
  })),

  toggleEffect: (effectId) => set((state) => {
    const currentEffects = state.currentCard.activeEffects || [];
    const hasEffect = currentEffects.includes(effectId);
    return { currentCard: { ...state.currentCard, activeEffects: hasEffect ? currentEffects.filter((id) => id !== effectId) : [...currentEffects, effectId] } };
  }),

  setEffects: (effectIds) => set((state) => ({
    currentCard: { ...state.currentCard, activeEffects: effectIds }
  })),

  clearEffects: () => set((state) => ({
    currentCard: { ...state.currentCard, activeEffects: [] }
  })),
  
  calculateOverallRating: () => {
    const stats = get().currentCard.statBlock || [];
    if (stats.length === 0) return 0;
    const sum = stats.reduce((acc, stat) => acc + stat.value, 0);
    return Math.round(sum / stats.length);
  },
  
  resetCard: () => {
    const mode = get().mode;
    set({ currentCard: createDefaultCard(mode) });
  },
  
  loadCard: (card) => set({
    mode: card.mode,
    currentCard: { ...card }
  }),
  
  randomizeQuote: (category) => {
    const mode = get().mode;
    const defaultCategory = mode === 'serious' ? 'serious' : 'funny';
    const quote = getRandomQuote(category || defaultCategory);
    set((state) => ({
      currentCard: { ...state.currentCard, bio: quote.text }
    }));
  },
  
  loadPresetStats: (category) => {
    const presets = getRandomStats(category, 6);
    const statBlock: Stat[] = presets.map((preset) => ({
      id: nanoid(),
      label: preset.label,
      value: preset.defaultValue || Math.floor(Math.random() * 40) + 50,
      icon: preset.icon,
      category: preset.category,
    }));
    set((state) => ({
      currentCard: { ...state.currentCard, statBlock }
    }));
  },
  
  finalizeCard: () => {
    const state = get();
    const overallRating = state.calculateOverallRating();
    
    const card: Card = {
      id: state.currentCard.id || nanoid(),
      name: state.currentCard.name || 'Unnamed Card',
      nickname: state.currentCard.nickname,
      image: state.currentCard.image || null,
      imageFilter: state.currentCard.imageFilter || 'normal',
      rarity: state.currentCard.rarity || 'gold',
      theme: state.currentCard.theme || 'sports',
      mode: state.mode,
      overallRating,
      statBlock: state.currentCard.statBlock || [],
      traits: state.currentCard.traits || [],
      bio: state.currentCard.bio || '',
      quote: state.currentCard.quote,
      position: state.currentCard.position,
      createdAt: state.currentCard.createdAt || new Date(),
      updatedAt: new Date(),
    };
    
    return card;
  },
}));

// ─────────────────────────────────────────────
// TEAM BUILDER STORE
// ─────────────────────────────────────────────

interface TeamBuilderState {
  currentTeam: Team | null;
  teams: Team[];
  selectedSlot: number | null;
  showChemistryLines: boolean;
  
  // Team Actions
  createTeam: (name: string, theme: Theme) => Team;
  loadTeam: (id: string) => void;
  saveTeam: () => void;
  deleteTeam: (id: string) => void;
  
  // Slot Management
  selectSlot: (index: number | null) => void;
  assignCardToSlot: (slotIndex: number, cardId: string) => void;
  removeCardFromSlot: (slotIndex: number) => void;
  setCaptain: (cardId: string) => void;
  
  // Chemistry
  addChemistryLink: (link: Omit<ChemistryLink, 'id'>) => void;
  removeChemistryLink: (linkId: string) => void;
  toggleChemistryLines: () => void;
  
  // Modifiers
  addGlobalModifier: (modifierId: string) => void;
  removeGlobalModifier: (modifierId: string) => void;
  
  // Computed
  calculateTeamRating: () => number;
  calculateChemistry: () => number;
}

const createDefaultTeam = (name: string, theme: Theme): Team => ({
  id: nanoid(),
  name,
  theme,
  slots: Array.from({ length: 11 }, (_, i) => ({
    position: { 
      x: (i % 4) * 25 + 12.5, 
      y: Math.floor(i / 4) * 30 + 15 
    },
    cardId: null,
    role: i === 0 ? 'Captain' : undefined,
  })),
  chemistryLinks: [],
  activeModifiers: [],
  overallRating: 0,
  chemistryScore: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const useTeamBuilder = create<TeamBuilderState>()(
  persist(
    (set, get) => ({
      currentTeam: null,
      teams: [],
      selectedSlot: null,
      showChemistryLines: true,
      
      createTeam: (name, theme) => {
        const team = createDefaultTeam(name, theme);
        set((state) => ({
          teams: [...state.teams, team],
          currentTeam: team,
        }));
        return team;
      },
      
      loadTeam: (id) => {
        const team = get().teams.find((t) => t.id === id);
        if (team) {
          set({ currentTeam: { ...team } });
        }
      },
      
      saveTeam: () => {
        const currentTeam = get().currentTeam;
        if (!currentTeam) return;
        
        set((state) => ({
          teams: state.teams.map((t) =>
            t.id === currentTeam.id
              ? { ...currentTeam, updatedAt: new Date() }
              : t
          ),
        }));
      },
      
      deleteTeam: (id) => set((state) => ({
        teams: state.teams.filter((t) => t.id !== id),
        currentTeam: state.currentTeam?.id === id ? null : state.currentTeam,
      })),
      
      selectSlot: (index) => set({ selectedSlot: index }),
      
      assignCardToSlot: (slotIndex, cardId) => set((state) => {
        if (!state.currentTeam) return state;
        
        const slots = [...state.currentTeam.slots];
        slots[slotIndex] = { ...slots[slotIndex], cardId };
        
        return {
          currentTeam: { ...state.currentTeam, slots },
          selectedSlot: null,
        };
      }),
      
      removeCardFromSlot: (slotIndex) => set((state) => {
        if (!state.currentTeam) return state;
        
        const slots = [...state.currentTeam.slots];
        slots[slotIndex] = { ...slots[slotIndex], cardId: null };
        
        return {
          currentTeam: { ...state.currentTeam, slots },
        };
      }),
      
      setCaptain: (cardId) => set((state) => {
        if (!state.currentTeam) return state;
        return {
          currentTeam: { ...state.currentTeam, captainId: cardId },
        };
      }),
      
      addChemistryLink: (link) => set((state) => {
        if (!state.currentTeam) return state;
        
        const newLink: ChemistryLink = {
          ...link,
          id: nanoid(),
        };
        
        return {
          currentTeam: {
            ...state.currentTeam,
            chemistryLinks: [...state.currentTeam.chemistryLinks, newLink],
          },
        };
      }),
      
      removeChemistryLink: (linkId) => set((state) => {
        if (!state.currentTeam) return state;
        
        return {
          currentTeam: {
            ...state.currentTeam,
            chemistryLinks: state.currentTeam.chemistryLinks.filter(
              (l) => l.id !== linkId
            ),
          },
        };
      }),
      
      toggleChemistryLines: () => set((state) => ({
        showChemistryLines: !state.showChemistryLines,
      })),
      
      addGlobalModifier: (modifierId) => set((state) => {
        if (!state.currentTeam) return state;
        
        return {
          currentTeam: {
            ...state.currentTeam,
            activeModifiers: [...state.currentTeam.activeModifiers, modifierId],
          },
        };
      }),
      
      removeGlobalModifier: (modifierId) => set((state) => {
        if (!state.currentTeam) return state;
        
        return {
          currentTeam: {
            ...state.currentTeam,
            activeModifiers: state.currentTeam.activeModifiers.filter(
              (id) => id !== modifierId
            ),
          },
        };
      }),
      
      calculateTeamRating: () => {
        const { currentTeam } = get();
        const cardCollection = useCardCollection.getState();
        
        if (!currentTeam) return 0;
        
        const cardIds = currentTeam.slots
          .map((s) => s.cardId)
          .filter(Boolean) as string[];
        
        if (cardIds.length === 0) return 0;
        
        const totalRating = cardIds.reduce((sum, id) => {
          const card = cardCollection.getCardById(id);
          return sum + (card?.overallRating || 0);
        }, 0);
        
        return Math.round(totalRating / cardIds.length);
      },
      
      calculateChemistry: () => {
        const { currentTeam } = get();
        if (!currentTeam) return 0;
        
        const filledSlots = currentTeam.slots.filter((s) => s.cardId).length;
        const links = currentTeam.chemistryLinks.length;
        
        // Base chemistry from filled slots
        const baseChemistry = (filledSlots / currentTeam.slots.length) * 50;
        
        // Bonus from chemistry links (max 50)
        const linkBonus = Math.min(links * 10, 50);
        
        return Math.round(baseChemistry + linkBonus);
      },
    }),
    {
      name: 'infinite-squads-teams',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// ─────────────────────────────────────────────
// UI STATE STORE
// ─────────────────────────────────────────────

interface UIState {
  isSidebarOpen: boolean;
  activeModal: string | null;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  
  toggleSidebar: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;
}

export const useUIState = create<UIState>()((set) => ({
  isSidebarOpen: false,
  activeModal: null,
  toast: null,
  
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
  showToast: (message, type = 'info') => set({ toast: { message, type } }),
  clearToast: () => set({ toast: null }),
}));
