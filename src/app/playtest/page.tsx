'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Bug, CheckCircle2, Clipboard, Lightbulb, RotateCcw, Send, SlidersHorizontal } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';

const categories = [
  { id: 'bug', label: 'Something broke', icon: Bug },
  { id: 'confusing', label: 'Something was confusing', icon: Lightbulb },
  { id: 'balance', label: 'Balance felt wrong', icon: SlidersHorizontal },
  { id: 'good', label: 'Something felt great', icon: CheckCircle2 },
];

export default function PlaytestPage() {
  const [category, setCategory] = useState('bug');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const build = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 8) ?? 'local';

  const report = useMemo(() => {
    const diagnostics = typeof window === 'undefined' ? '' : [
      `Page: ${window.location.origin}${window.location.pathname}`,
      `Screen: ${window.innerWidth}x${window.innerHeight}`,
      `Build: ${build}`,
      `Browser: ${navigator.userAgent}`,
    ].join('\n');
    return `Infinite Squads playtest feedback\n\nCategory: ${category}\n\nWhat happened:\n${message.trim()}\n\nDiagnostics (safe to remove):\n${diagnostics}`;
  }, [build, category, message]);

  const sendReport = async () => {
    if (message.trim().length < 10) return;
    setSending(true);
    setCopied(false);
    try {
      const { data, error } = await getSupabase().rpc('submit_playtest_feedback', {
        p_category: category,
        p_message: message.trim(),
        p_page: `${window.location.origin}${window.location.pathname}`,
        p_screen: `${window.innerWidth}x${window.innerHeight}`,
        p_build: build,
        p_user_agent: navigator.userAgent,
      });
      if (!error && typeof data === 'string') {
        setSent(true);
        setMessage('');
        return;
      }
    } catch {
      // A copied report is a reliable fallback while a preview DB is offline.
    }
    await navigator.clipboard.writeText(report);
    setCopied(true);
    setSending(false);
  };

  const resetRun = () => {
    if (!confirmReset) { setConfirmReset(true); return; }
    const keys = Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index)).filter((key): key is string => Boolean(key));
    keys.filter(key => key.startsWith('is-') || key === 'infinite-squads-cards').forEach(key => localStorage.removeItem(key));
    window.location.href = '/';
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-400">Closed beta</p>
      <h1 className="mt-2 text-4xl font-black text-white">Tell us where the fun breaks.</h1>
      <p className="mt-3 text-slate-300">Play naturally. When something feels broken, confusing, unfair, or unexpectedly great, send it here. Never include a password or payment information.</p>

      <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/75 p-5 sm:p-6">
        <h2 className="text-lg font-black text-white">1. What kind of feedback is this?</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {categories.map(item => {
            const Icon = item.icon;
            return <button key={item.id} onClick={() => setCategory(item.id)} className={`flex items-center gap-3 rounded-xl border p-3 text-left text-sm font-bold ${category === item.id ? 'border-cyan-400 bg-cyan-500/15 text-cyan-100' : 'border-slate-700 bg-slate-950/50 text-slate-300'}`}><Icon className="h-4 w-4" />{item.label}</button>;
          })}
        </div>

        <label className="mt-6 block text-lg font-black text-white" htmlFor="playtest-message">2. What happened?</label>
        <p className="mt-1 text-xs text-slate-400">The best reports say what you expected, what actually happened, and what you did immediately before it.</p>
        <textarea id="playtest-message" value={message} onChange={event => setMessage(event.target.value)} rows={7} maxLength={2000} placeholder="I expected… Instead… Right before it happened, I…" className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-cyan-400" />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-500">{message.length}/2000 · build {build}</span>
          <button disabled={message.trim().length < 10 || sending || sent} onClick={sendReport} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-3 font-black text-white disabled:opacity-40">
            {copied ? <Clipboard className="h-4 w-4" /> : <Send className="h-4 w-4" />}{sent ? 'Feedback sent — thank you' : copied ? 'Copied as fallback' : sending ? 'Sending…' : 'Send feedback'}
          </button>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5">
        <h2 className="font-black text-amber-200">Need a completely fresh run?</h2>
        <p className="mt-1 text-sm text-amber-100/70">This removes this browser’s guest cards, tutorial, XP, and draft state. It does not delete a signed-in account or its server collection.</p>
        <button onClick={resetRun} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-400/40 px-4 py-2 text-sm font-black text-amber-200">
          <RotateCcw className="h-4 w-4" />{confirmReset ? 'Tap again to reset this browser' : 'Reset local playtest run'}
        </button>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="rounded-xl bg-white px-5 py-3 font-black text-slate-950">Back to game</Link>
        <Link href="/support" className="rounded-xl border border-slate-700 px-5 py-3 font-bold text-slate-200">Account support</Link>
      </div>
    </section>
  );
}
