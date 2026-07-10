'use client';

// ============================================
// DAILY STREAK MODAL
// Pops once per day for logged-in users. Shows the
// 7-day ladder so tomorrow's bigger number does the
// retention work for us.
// ============================================

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Flame } from 'lucide-react';
import { useDailyReward } from '@/hooks/useDailyReward';
import { STREAK_REWARDS } from '@/data/gameEconomy';

export default function DailyRewardModal() {
  const { claimable, claim, claiming, result } = useDailyReward();
  const [open, setOpen] = useState(false);
  const [attempted, setAttempted] = useState(false);

  // Auto-claim once when a fresh day is detected, then celebrate.
  useEffect(() => {
    if (claimable && !attempted) {
      setAttempted(true);
      claim().then(res => {
        if (res?.claimed) setOpen(true);
      });
    }
  }, [claimable, attempted, claim]);

  if (!result?.claimed) return null;

  const streak = result.streak ?? 1;
  const reward = result.reward ?? 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.7, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 18 }}
            className="bg-gradient-to-b from-slate-800 to-slate-900 border border-yellow-500/30 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/40"
            >
              <Flame className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-3xl font-black text-white mb-1">
              Day {streak} Streak
            </h2>
            <p className="text-slate-400 mb-6">
              {streak === 1
                ? 'A journey of a thousand packs begins with a single login.'
                : streak < 7
                ? 'Showing up is 90% of history. Ask literally anyone on these cards.'
                : 'Full streak. Historians will study your consistency.'}
            </p>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <Coins className="w-8 h-8 text-yellow-400" />
              <span className="text-4xl font-black text-yellow-400">+{reward.toLocaleString()}</span>
            </motion.div>

            {/* 7-day ladder */}
            <div className="grid grid-cols-7 gap-1.5 mb-6">
              {STREAK_REWARDS.map((amt, i) => {
                const day = i + 1;
                const done = day <= Math.min(streak, 7);
                const isToday = day === Math.min(streak, 7);
                return (
                  <div
                    key={day}
                    className={`rounded-lg py-2 flex flex-col items-center text-[10px] font-bold border ${
                      isToday
                        ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300'
                        : done
                        ? 'bg-slate-700/60 border-slate-600 text-slate-400'
                        : 'bg-slate-800/60 border-slate-700 text-slate-500'
                    }`}
                  >
                    <span>D{day}</span>
                    <span>{amt}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setOpen(false)}
              disabled={claiming}
              className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-bold text-slate-900 text-lg hover:opacity-90 transition-opacity"
            >
              Collect
            </button>
            <p className="text-slate-500 text-xs mt-3">
              Miss a day and the streak resets. History remembers.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
