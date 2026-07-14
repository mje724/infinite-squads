'use client';

import { motion } from 'framer-motion';
import { Coins, LogIn, LogOut, ChevronDown, Settings } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import LoginModal from './LoginModal';

export default function CoinDisplay() {
  const { user, profile, loading, signOut } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!showDropdown) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowDropdown(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [showDropdown]);

  // Still resolving auth, OR signed in but profile still fetching:
  // show a skeleton. "Sign In" only renders when we KNOW there's no user —
  // flashing it at logged-in players reads as being logged out.
  if (loading || (user && !profile)) {
    return (
      <div aria-label="Loading account" className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 bg-slate-800/50 rounded-xl animate-pulse">
        <div className="w-5 h-5 bg-slate-700 rounded-full" />
        <div className="w-16 h-4 bg-slate-700 rounded" />
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <>
        <button
          onClick={() => setShowLoginModal(true)}
          aria-label="Sign in"
          className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <LogIn aria-hidden="true" className="w-4 h-4" />
          <span className="hidden sm:inline">Sign In</span>
        </button>
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-1 sm:gap-3">
      {/* Coin Balance */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        aria-label={`${profile.coin_balance.toLocaleString()} coins`}
        className="flex items-center gap-1 sm:gap-2 p-2 sm:px-4 sm:py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl"
      >
        <Coins aria-hidden="true" className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
        <span aria-hidden="true" className="text-yellow-400 text-xs sm:text-base font-bold">{profile.coin_balance.toLocaleString()}</span>
      </motion.div>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          aria-label={`Account menu for ${profile.display_name}`}
          aria-expanded={showDropdown}
          aria-haspopup="menu"
          className="flex items-center gap-1 sm:gap-2 p-2 sm:px-3 sm:py-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt="" className="w-6 h-6 rounded-full" />
          ) : (
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {profile.display_name?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
          )}
          <span className="hidden md:block text-white text-sm font-medium max-w-[100px] truncate">
            {profile.display_name}
          </span>
          <ChevronDown aria-hidden="true" className="hidden sm:block w-4 h-4 text-slate-400" />
        </button>

        {showDropdown && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowDropdown(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              role="menu"
              aria-label="Account menu"
              className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden"
            >
              <div className="p-3 border-b border-slate-700">
                <div className="text-white font-semibold truncate">{profile.display_name}</div>
                <div className="text-slate-400 text-xs truncate">{profile.email}</div>
              </div>
              <div className="p-2">
                <div className="px-3 py-2 text-slate-400 text-sm">
                  <div className="flex justify-between">
                    <span>Packs Opened:</span>
                    <span className="text-white">{profile.packs_opened}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Battles Won:</span>
                    <span className="text-green-400">{profile.battles_won}</span>
                  </div>
                </div>
              </div>
              <div className="p-2 border-t border-slate-700">
                <Link
                  role="menuitem"
                  href="/account"
                  onClick={() => setShowDropdown(false)}
                  className="mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-slate-200 transition-colors hover:bg-slate-700"
                >
                  <Settings aria-hidden="true" className="h-4 w-4" />
                  Account Settings
                </Link>
                <button
                  role="menuitem"
                  onClick={() => {
                    signOut();
                    setShowDropdown(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut aria-hidden="true" className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
