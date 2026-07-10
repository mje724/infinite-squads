// ============================================
// DAILY STREAK REWARD
// Server-authoritative claim (claim_daily_reward RPC).
// The hook auto-detects an unclaimed day and exposes
// state for the celebration modal.
// ============================================

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { getSupabase } from '@/lib/supabase';

export interface DailyClaimResult {
  claimed: boolean;
  streak?: number;
  reward?: number;
  reason?: string;
}

function todayUTC(): string {
  return new Date().toISOString().slice(0, 10);
}

export function useDailyReward() {
  const { user, profile, refreshProfile } = useAuth();
  const supabase = getSupabase();
  const [claiming, setClaiming] = useState(false);
  const [result, setResult] = useState<DailyClaimResult | null>(null);

  // Claimable if logged in and last claim wasn't today (UTC)
  const lastClaim = profile?.last_daily_claim ?? null;
  const streak = profile?.daily_streak ?? 0;
  const claimable = !!user && !!profile && lastClaim !== todayUTC();

  const claim = useCallback(async (): Promise<DailyClaimResult | null> => {
    if (!user || claiming) return null;
    setClaiming(true);
    const { data, error } = await supabase.rpc('claim_daily_reward', {
      p_user_id: user.id,
    });
    setClaiming(false);
    if (error) {
      console.error('Daily claim failed:', error);
      return null;
    }
    const res = data as DailyClaimResult;
    setResult(res);
    if (res?.claimed) await refreshProfile();
    return res;
  }, [user, claiming, supabase, refreshProfile]);

  // reset stored result when user changes
  useEffect(() => {
    setResult(null);
  }, [user?.id]);

  return { claimable, claim, claiming, result, streak };
}
