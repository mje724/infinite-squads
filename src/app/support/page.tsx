import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Support', description: 'Get help with Infinite Squads.' };

export default function SupportPage() {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Player care</p>
      <h1 className="text-4xl font-black text-white">How can we help?</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-300">For account access, missing progress, purchases, safety concerns, or privacy requests, contact the support team and include the email on your account. Never send your password.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-bold text-white">Contact support</h2>
          {supportEmail ? (
            <a className="mt-3 inline-block font-semibold text-cyan-400 hover:text-cyan-300" href={`mailto:${supportEmail}?subject=Infinite%20Squads%20Support`}>
              {supportEmail}
            </a>
          ) : (
            <p className="mt-3 text-amber-300">The public support address is being finalized before release.</p>
          )}
          <p className="mt-3 text-sm text-slate-400">Target response time: two business days.</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-bold text-white">Account and privacy</h2>
          <p className="mt-3 text-slate-300">Review our <Link className="text-purple-400" href="/privacy">privacy policy</Link> or <Link className="text-purple-400" href="/delete-account">permanently delete your account</Link>.</p>
        </div>
      </div>
    </section>
  );
}
