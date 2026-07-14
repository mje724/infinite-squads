'use client';

import { useCallback, useEffect, useState } from 'react';
import { emptyPlayerProgress, getPlayerProgress, PlayerProgress, PROGRESS_CHANGED_EVENT } from '@/data/progression';

export function usePlayerProgress(identity: string) {
  // The server and first browser paint must agree. Device progress loads after
  // hydration, avoiding a flash/error when localStorage already contains XP.
  const [progress, setProgress] = useState<PlayerProgress>(() => emptyPlayerProgress());

  const refresh = useCallback(() => setProgress(getPlayerProgress(identity)), [identity]);

  useEffect(() => {
    refresh();
    window.addEventListener(PROGRESS_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(PROGRESS_CHANGED_EVENT, refresh);
  }, [refresh]);

  return progress;
}
