import type { Metadata } from 'next';
import AccountDeletion from '@/components/AccountDeletion';

export const metadata: Metadata = { title: 'Account Settings' };

export default function AccountPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-purple-400">Account</p>
      <h1 className="text-3xl font-black text-white">Account settings</h1>
      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="mb-3 text-xl font-bold text-white">Delete account</h2>
        <AccountDeletion />
      </div>
    </section>
  );
}
