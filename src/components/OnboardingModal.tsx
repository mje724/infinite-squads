'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Package, Swords, Users, X } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useGameCollection } from '@/hooks/useGameCollection';
import { progressIdentity } from '@/data/progression';

export default function OnboardingModal() {
  const router = useRouter();
  const { user } = useAuth();
  const { cards, loading } = useGameCollection();
  const [open, setOpen] = useState(false);
  const identity = progressIdentity(user?.id);
  const key = `is-onboarding-seen-${identity}`;

  useEffect(() => {
    if (!loading && cards.length === 0 && localStorage.getItem(key) !== '1') setOpen(true);
  }, [cards.length, key, loading]);

  const dismiss = () => {
    localStorage.setItem(key, '1');
    setOpen(false);
  };

  const begin = () => {
    dismiss();
    router.push('/packs?starter=1');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} role="dialog" aria-modal="true" aria-labelledby="onboarding-title" className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-purple-400/30 bg-slate-900 shadow-2xl shadow-purple-950/50">
            <button onClick={dismiss} aria-label="Close introduction" className="absolute right-4 top-4 z-10 rounded-lg bg-slate-950/50 p-2 text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
            <div className="bg-gradient-to-br from-purple-600/35 via-pink-500/15 to-cyan-500/20 px-6 py-8 text-center sm:px-10">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300">Welcome, commander</p>
              <h2 id="onboarding-title" className="mt-3 text-4xl font-black text-white sm:text-5xl">Build the lineup history forgot.</h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-300">Your first complete run takes about three minutes. Recruit five starters, build for chemistry, then choose a tactic and fight.</p>
            </div>
            <div className="grid gap-3 p-6 sm:grid-cols-3 sm:p-8">
              {[
                { icon: Package, color: 'text-purple-300', title: '1. Draft', copy: 'Keep all five cards in your free starter draft.' },
                { icon: Users, color: 'text-cyan-300', title: '2. Build', copy: 'Choose cards for scenario fit and chemistry—not just fame.' },
                { icon: Swords, color: 'text-orange-300', title: '3. Counter', copy: 'Read the opponent plan and pick the tactic that beats it.' },
              ].map(item => (
                <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/45 p-4">
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                  <h3 className="mt-3 font-black text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.copy}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 border-t border-slate-800 p-6 sm:flex-row sm:justify-end">
              <button onClick={dismiss} className="rounded-xl px-5 py-3 font-bold text-slate-400 hover:text-white">Explore first</button>
              <button onClick={begin} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-black text-white shadow-lg shadow-purple-500/20">
                Draft my starter squad <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
