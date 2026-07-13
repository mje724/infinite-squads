'use client';

// ============================================
// DAILY OBJECTIVES PANEL
// The cheapest retention lever in the genre:
// three small promises the player can keep today.
// ============================================

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Check, Target } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { getSupabase } from '@/lib/supabase';
import { DAILY_OBJECTIVES, getObjectiveProgress, onObjectivesChanged } from '@/data/objectives';

function todayUTC(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function DailyObjectives() {
  const { user, refreshProfile } = useAuth();
  const supabase = getSupabase();
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [claimed, setClaimed] = useState<Set<string>>(new Set());
  const [claiming, setClaiming] = useState<string | null>(null);
  const [justClaimed, setJustClaimed] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setProgress(getObjectiveProgress());
    if (!user) return;
    const { data } = await supabase
      .from('objective_claims')
      .select('objective_id')
      .eq('user_id', user.id)
      .eq('claim_date', todayUTC());
    setClaimed(new Set((data ?? []).map((r: { objective_id: string }) => r.objective_id)));
  }, [user, supabase]);

  useEffect(() => {
    refresh();
    return onObjectivesChanged(() => setProgress(getObjectiveProgress()));
  }, [refresh]);

  const claim = async (objectiveId: string) => {
    if (!user || claiming) return;
    setClaiming(objectiveId);
    const { data, error } = await supabase.rpc('claim_objective', {
      p_user_id: user.id,
      p_objective_id: objectiveId,
    });
    setClaiming(null);
    if (!error && typeof data === 'number' && data > 0) {
      setClaimed(prev => new Set([...prev, objectiveId]));
      setJustClaimed(objectiveId);
      setTimeout(() => setJustClaimed(null), 2000);
      await refreshProfile();
    } else {
      await refresh(); // already claimed elsewhere / stale state
    }
  };

  if (!user) return null;

  const done = DAILY_OBJECTIVES.filter(o => claimed.has(o.id)).length;

  return (
    <div className="max-w-2xl mx-auto px-4 pb-12">
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-400" /> Daily Objectives
          </h3>
          <span className="text-slate-400 text-sm font-semibold">{done}/{DAILY_OBJECTIVES.length} · resets midnight UTC</span>
        </div>
        <div className="space-y-2">
          {DAILY_OBJECTIVES.map(obj => {
            const have = Math.min(progress[obj.event] ?? 0, obj.target);
            const ready = have >= obj.target && !claimed.has(obj.id);
            const isClaimed = claimed.has(obj.id);
            return (
              <div key={obj.id} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 border ${isClaimed ? 'bg-slate-800/30 border-slate-800' : ready ? 'bg-green-500/10 border-green-500/40' : 'bg-slate-800/60 border-slate-700'}`}>
                <span className="text-lg">{obj.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${isClaimed ? 'text-slate-500 line-through' : 'text-white'}`}>{obj.label}</p>
                  <div className="h-1 bg-slate-700 rounded-full mt-1.5 overflow-hidden">
                    <div className={`h-full rounded-full ${isClaimed ? 'bg-slate-600' : 'bg-gradient-to-r from-orange-500 to-amber-400'}`} style={{ width: `${(isClaimed ? 1 : have / obj.target) * 100}%` }} />
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-bold w-8 text-center">{isClaimed ? '✓' : `${have}/${obj.target}`}</span>
                {isClaimed ? (
                  <span className="w-20 text-center text-slate-500 text-xs font-bold flex items-center justify-center gap-1"><Check className="w-3 h-3" /> Done</span>
                ) : (
                  <motion.button
                    onClick={() => claim(obj.id)}
                    disabled={!ready || claiming !== null}
                    whileTap={ready ? { scale: 0.94 } : {}}
                    className={`w-20 py-1.5 rounded-lg text-xs font-black flex items-center justify-center gap-1 ${ready ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-slate-900' : 'bg-slate-800 text-slate-500'}`}
                  >
                    <Coins className="w-3 h-3" /> {justClaimed === obj.id ? '+' + obj.reward : obj.reward}
                  </motion.button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
