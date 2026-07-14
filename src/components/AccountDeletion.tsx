'use client';

import { useState } from 'react';
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import LoginModal from '@/components/LoginModal';

export default function AccountDeletion() {
  const { user, loading, deleteAccount } = useAuth();
  const [confirmation, setConfirmation] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleDelete = async () => {
    if (confirmation !== 'DELETE') return;
    setDeleting(true);
    setError('');
    const result = await deleteAccount();
    if (result.error) {
      setError(result.error.message);
      setDeleting(false);
      return;
    }
    window.location.assign('/?accountDeleted=true');
  };

  if (loading) {
    return <div className="h-28 animate-pulse rounded-2xl bg-slate-800" aria-label="Loading account" />;
  }

  if (!user) {
    return (
      <>
        <p className="text-slate-300">Sign in to verify ownership and permanently delete your account.</p>
        <button onClick={() => setShowLogin(true)} className="mt-5 rounded-xl bg-white px-5 py-3 font-bold text-slate-950">
          Sign in to continue
        </button>
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      </>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-100">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden="true" />
        <p>This permanently deletes your login, profile, balances, cards, squads, battle history, and reward history. It cannot be undone.</p>
      </div>
      <div>
        <label htmlFor="delete-confirmation" className="mb-2 block font-semibold text-white">
          Type DELETE to confirm
        </label>
        <input
          id="delete-confirmation"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          autoComplete="off"
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-red-400 focus:outline-none"
        />
      </div>
      {error && <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-red-300">{error}</p>}
      <button
        onClick={handleDelete}
        disabled={confirmation !== 'DELETE' || deleting}
        className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {deleting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
        Permanently delete my account
      </button>
    </div>
  );
}
