'use client';

import Link from 'next/link';
import { ArrowRight, Check, Lock, Sparkles, Trophy } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useGameCollection } from '@/hooks/useGameCollection';
import { usePlayerProgress } from '@/hooks/usePlayerProgress';
import { ACHIEVEMENTS, levelProgress, progressIdentity } from '@/data/progression';

export default function JourneyPanel() {
  const { user } = useAuth();
  const { cards, loading } = useGameCollection();
  const identity = progressIdentity(user?.id);
  const progress = usePlayerProgress(identity);
  const level = levelProgress(progress.xp);

  const steps = [
    { label: 'Recruit 5 starters', done: cards.length >= 5 || progress.counters.starter_claimed > 0, href: '/packs', emoji: '📦' },
    { label: 'Build a complete squad', done: progress.counters.squad_completed > 0, href: '/squad', emoji: '🧩' },
    { label: 'Finish your first battle', done: progress.counters.battle_played > 0, href: '/battle', emoji: '⚔️' },
    { label: 'Earn your first win', done: progress.counters.battle_won > 0, href: '/battle', emoji: '🏆' },
  ];
  const next = steps.find(step => !step.done) ?? { label: 'Chase today’s objectives', href: '/battle', emoji: '🎯', done: false };
  const unlocked = ACHIEVEMENTS.filter(achievement => progress.achievements.includes(achievement.id));

  if (loading) return <div className="mx-auto mb-10 h-52 max-w-3xl animate-pulse rounded-3xl bg-slate-900/60" />;

  return (
    <section className="mx-auto mb-12 max-w-3xl rounded-3xl border border-purple-500/25 bg-slate-900/75 p-5 text-left shadow-2xl shadow-purple-950/20 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-purple-400">Your run</p>
          <h2 className="mt-1 text-2xl font-black text-white">Level {level.level} Commander</h2>
          <p className="mt-1 text-sm text-slate-400">Every recruit, squad, and battle advances your account.</p>
        </div>
        <div className="min-w-36 text-right">
          <p className="text-xs font-bold text-slate-400">{level.current}/{level.needed} XP</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" style={{ width: `${level.percent}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-4">
        {steps.map((step, index) => (
          <Link key={step.label} href={step.href} className={`rounded-xl border p-3 transition-colors ${step.done ? 'border-green-500/25 bg-green-500/10' : index === steps.findIndex(item => !item.done) ? 'border-purple-400/50 bg-purple-500/15 hover:bg-purple-500/25' : 'border-slate-800 bg-slate-950/40'}`}>
            <div className="flex items-center justify-between">
              <span>{step.emoji}</span>
              {step.done ? <Check className="h-4 w-4 text-green-400" /> : <Lock className="h-3.5 w-3.5 text-slate-600" />}
            </div>
            <p className={`mt-2 text-xs font-bold ${step.done ? 'text-green-300' : 'text-slate-300'}`}>{step.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-purple-500/15 to-cyan-500/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Recommended next move</p>
          <p className="font-bold text-white">{next.emoji} {next.label}</p>
        </div>
        <Link href={next.href} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-black text-slate-950 hover:bg-slate-100">
          Continue <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {unlocked.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-800 pt-4">
          <span className="mr-1 inline-flex items-center gap-1 text-xs font-bold text-slate-400"><Trophy className="h-3.5 w-3.5" /> Achievements</span>
          {unlocked.slice(-4).map(achievement => (
            <span key={achievement.id} title={achievement.description} className="rounded-full border border-yellow-500/25 bg-yellow-500/10 px-2.5 py-1 text-xs font-bold text-yellow-200">
              {achievement.emoji} {achievement.name}
            </span>
          ))}
          {unlocked.length === 0 && <Sparkles className="h-4 w-4 text-slate-600" />}
        </div>
      )}
    </section>
  );
}
