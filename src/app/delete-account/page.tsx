import type { Metadata } from 'next';
import AccountDeletion from '@/components/AccountDeletion';

export const metadata: Metadata = {
  title: 'Delete Account',
  description: 'Delete your Infinite Squads account and associated data.',
};

export default function DeleteAccountPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-red-400">Your data</p>
      <h1 className="text-3xl font-black text-white">Delete your account</h1>
      <p className="mt-4 text-slate-300">This page is available on the web and inside the app. Deletion normally completes immediately after identity verification.</p>
      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <AccountDeletion />
      </div>
    </section>
  );
}
