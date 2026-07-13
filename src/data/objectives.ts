// ============================================
// DAILY OBJECTIVES
// Progress is tracked client-side (localStorage, per UTC day) —
// but every claim goes through the claim_objective RPC, which
// fixes reward amounts server-side and enforces once-per-day.
// Forging progress earns you at most the honest daily maximum.
// ============================================

export type ObjectiveEvent = 'battle_played' | 'battle_won' | 'hard_win' | 'pack_opened' | 'quicksell';

export interface Objective {
  id: string;
  label: string;
  event: ObjectiveEvent;
  target: number;
  reward: number; // display only — server is authoritative
  emoji: string;
}

export const DAILY_OBJECTIVES: Objective[] = [
  { id: 'daily_play_3', label: 'Play 3 battles', event: 'battle_played', target: 3, reward: 50, emoji: '⚔️' },
  { id: 'daily_win_2', label: 'Win 2 battles', event: 'battle_won', target: 2, reward: 75, emoji: '🏆' },
  { id: 'daily_hard_win', label: 'Win a hard battle', event: 'hard_win', target: 1, reward: 100, emoji: '💀' },
  { id: 'daily_pack', label: 'Open a pack', event: 'pack_opened', target: 1, reward: 40, emoji: '📦' },
  { id: 'daily_sell', label: 'Quicksell a card', event: 'quicksell', target: 1, reward: 30, emoji: '💰' },
];

const CHANGED_EVENT = 'is:objectives-changed';

function todayUTC(): string {
  return new Date().toISOString().slice(0, 10);
}

function storageKey(): string {
  return `is-objectives-${todayUTC()}`;
}

export function getObjectiveProgress(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(storageKey()) ?? '{}');
  } catch {
    return {};
  }
}

export function trackObjective(event: ObjectiveEvent): void {
  if (typeof window === 'undefined') return;
  const progress = getObjectiveProgress();
  progress[event] = (progress[event] ?? 0) + 1;
  localStorage.setItem(storageKey(), JSON.stringify(progress));
  window.dispatchEvent(new Event(CHANGED_EVENT));
}

export function onObjectivesChanged(handler: () => void): () => void {
  window.addEventListener(CHANGED_EVENT, handler);
  return () => window.removeEventListener(CHANGED_EVENT, handler);
}
