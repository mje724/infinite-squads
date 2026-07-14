export type ProgressEvent =
  | 'starter_claimed'
  | 'pack_opened'
  | 'card_added'
  | 'squad_completed'
  | 'battle_played'
  | 'battle_won'
  | 'hard_win'
  | 'quicksell';

export interface PlayerProgress {
  xp: number;
  counters: Record<ProgressEvent, number>;
  achievements: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  event: ProgressEvent;
  target: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_recruit', name: 'First Recruit', description: 'Add your first card.', emoji: '🪪', event: 'card_added', target: 1 },
  { id: 'squad_ready', name: 'Squad Goals', description: 'Complete your first squad.', emoji: '🧩', event: 'squad_completed', target: 1 },
  { id: 'first_blood', name: 'First Blood', description: 'Win your first battle.', emoji: '⚔️', event: 'battle_won', target: 1 },
  { id: 'upset_artist', name: 'Upset Artist', description: 'Win a hard battle.', emoji: '💀', event: 'hard_win', target: 1 },
  { id: 'collector', name: 'Collector', description: 'Recruit 25 cards.', emoji: '🗃️', event: 'card_added', target: 25 },
  { id: 'pack_rat', name: 'Pack Rat', description: 'Open 10 packs.', emoji: '📦', event: 'pack_opened', target: 10 },
  { id: 'architect', name: 'Architect', description: 'Complete 5 squads.', emoji: '🏗️', event: 'squad_completed', target: 5 },
  { id: 'veteran', name: 'Veteran', description: 'Play 25 battles.', emoji: '🎖️', event: 'battle_played', target: 25 },
];

export const PROGRESS_XP: Record<ProgressEvent, number> = {
  starter_claimed: 100,
  pack_opened: 20,
  card_added: 15,
  squad_completed: 50,
  battle_played: 25,
  battle_won: 50,
  hard_win: 75,
  quicksell: 10,
};

export const PROGRESS_CHANGED_EVENT = 'is:progress-changed';

const emptyCounters = (): Record<ProgressEvent, number> => ({
  starter_claimed: 0,
  pack_opened: 0,
  card_added: 0,
  squad_completed: 0,
  battle_played: 0,
  battle_won: 0,
  hard_win: 0,
  quicksell: 0,
});

export function emptyPlayerProgress(): PlayerProgress {
  return { xp: 0, counters: emptyCounters(), achievements: [] };
}

export function progressIdentity(userId?: string | null): string {
  return userId ?? 'guest';
}

function progressKey(identity: string): string {
  return `is-player-progress-${identity}`;
}

export function getPlayerProgress(identity: string): PlayerProgress {
  const fallback = emptyPlayerProgress();
  if (typeof window === 'undefined') return fallback;
  try {
    const parsed = JSON.parse(localStorage.getItem(progressKey(identity)) ?? 'null') as Partial<PlayerProgress> | null;
    if (!parsed) return fallback;
    return {
      xp: Math.max(0, parsed.xp ?? 0),
      counters: { ...emptyCounters(), ...(parsed.counters ?? {}) },
      achievements: Array.isArray(parsed.achievements) ? parsed.achievements : [],
    };
  } catch {
    return fallback;
  }
}

export function recordProgress(identity: string, event: ProgressEvent, amount = 1): PlayerProgress {
  const current = getPlayerProgress(identity);
  const nextCounters = { ...current.counters, [event]: current.counters[event] + amount };
  const unlocked = ACHIEVEMENTS
    .filter(achievement => nextCounters[achievement.event] >= achievement.target)
    .map(achievement => achievement.id);
  const next: PlayerProgress = {
    xp: current.xp + PROGRESS_XP[event] * amount,
    counters: nextCounters,
    achievements: Array.from(new Set([...current.achievements, ...unlocked])),
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(progressKey(identity), JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(PROGRESS_CHANGED_EVENT, { detail: { event, progress: next } }));
  }
  return next;
}

export function levelForXp(xp: number): number {
  return Math.floor(Math.sqrt(Math.max(0, xp) / 100)) + 1;
}

export function levelProgress(xp: number): { level: number; current: number; needed: number; percent: number } {
  const level = levelForXp(xp);
  const floor = (level - 1) ** 2 * 100;
  const ceiling = level ** 2 * 100;
  const current = xp - floor;
  const needed = ceiling - floor;
  return { level, current, needed, percent: Math.min(100, Math.round((current / needed) * 100)) };
}
