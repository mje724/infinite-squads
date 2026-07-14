'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { emptyPlayerProgress, getPlayerProgress, PlayerProgress, PROGRESS_CHANGED_EVENT, savePlayerProgress } from '@/data/progression';
import { getSupabase } from '@/lib/supabase';

function mergeProgress(local: PlayerProgress, remote: PlayerProgress): PlayerProgress {
  const counters = { ...local.counters };
  for (const event of Object.keys(counters) as (keyof typeof counters)[]) {
    counters[event] = Math.max(local.counters[event] ?? 0, remote.counters[event] ?? 0);
  }
  return {
    xp: Math.max(local.xp, remote.xp),
    counters,
    achievements: Array.from(new Set([...local.achievements, ...remote.achievements])),
  };
}

export function usePlayerProgress(identity: string) {
  // The server and first browser paint must agree. Device progress loads after
  // hydration, avoiding a flash/error when localStorage already contains XP.
  const [progress, setProgress] = useState<PlayerProgress>(() => emptyPlayerProgress());
  const syncing = useRef(false);

  const refresh = useCallback(() => setProgress(getPlayerProgress(identity)), [identity]);

  useEffect(() => {
    refresh();
    window.addEventListener(PROGRESS_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(PROGRESS_CHANGED_EVENT, refresh);
  }, [refresh]);

  useEffect(() => {
    if (identity === 'guest') return;
    const supabase = getSupabase();

    const sync = async () => {
      if (syncing.current) return;
      syncing.current = true;
      try {
        const local = getPlayerProgress(identity);
        const { data, error } = await supabase
          .from('player_progress')
          .select('xp,counters,achievements')
          .eq('user_id', identity)
          .maybeSingle();
        if (error) return;
        const remote: PlayerProgress = data ? {
          xp: Number(data.xp) || 0,
          counters: { ...emptyPlayerProgress().counters, ...((data.counters as PlayerProgress['counters']) ?? {}) },
          achievements: Array.isArray(data.achievements) ? data.achievements as string[] : [],
        } : emptyPlayerProgress();
        const merged = mergeProgress(local, remote);
        savePlayerProgress(identity, merged, false);
        setProgress(merged);
        await supabase.from('player_progress').upsert({
          user_id: identity,
          xp: merged.xp,
          counters: merged.counters,
          achievements: merged.achievements,
          updated_at: new Date().toISOString(),
        });
      } finally {
        syncing.current = false;
      }
    };

    void sync();
    const onProgress = () => { void sync(); };
    window.addEventListener(PROGRESS_CHANGED_EVENT, onProgress);
    return () => window.removeEventListener(PROGRESS_CHANGED_EVENT, onProgress);
  }, [identity]);

  return progress;
}
