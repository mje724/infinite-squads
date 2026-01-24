'use client';
import Link from 'next/link';
import { useCardCollection } from '@/store/store';
import { useAuth } from '@/contexts/AuthContext';
import { Layers, Users, Plus, Trophy, Package, Coins, LogIn, LogOut, User, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function NavHeader() {
  const { cards } = useCardCollection();
  const { user, profile, loading, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white text-lg hidden sm:block">Infinite Squads</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          {/* Coins Display (only if logged in) */}
          {user && profile && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mr-2">
              <Coins className="w-4 h-4 text-yellow-500" />
              <span className="text-yellow-500 font-semibold">{profile.coins.toLocaleString()}</span>
            </div>
          )}

          <Link 
            href="/packs" 
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 border border-purple-400 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-colors"
          >
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline">Packs</span>
          </Link>

          <Link 
            href="/squad" 
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white text-sm font-medium transition-colors"
          >
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">Squad</span>
          </Link>

          <Link 
            href="/my-cards" 
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white text-sm font-medium transition-colors"
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">My Cards</span>
            {cards.length > 0 && (
              <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
                {cards.length}
              </span>
            )}
          </Link>

          <Link 
            href="/" 
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create</span>
          </Link>

          {/* Auth Section */}
          {loading ? (
            <div className="w-10 h-10 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
            </div>
          ) : user ? (
            /* User Dropdown */
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 p-1.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-full transition-colors"
              >
                {profile?.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt="Avatar" 
                    className="w-7 h-7 rounded-full"
                  />
                ) : (
                  <div className="w-7 h-7 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>

              {showDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-20 overflow-hidden">
                    <div className="p-4 border-b border-slate-700">
                      <p className="text-white font-medium truncate">
                        {profile?.display_name || user.email}
                      </p>
                      <p className="text-slate-400 text-sm truncate">{user.email}</p>
                      <div className="flex items-center gap-2 mt-2 text-yellow-500">
                        <Coins className="w-4 h-4" />
                        <span className="font-semibold">{profile?.coins.toLocaleString() || 0} coins</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Login Button */
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
