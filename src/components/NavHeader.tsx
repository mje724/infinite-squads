'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, Users, Package, Swords, Flame } from 'lucide-react';
import CoinDisplay from './CoinDisplay';
import { useGameCollection } from '@/hooks/useGameCollection';
import { useAuth } from './AuthProvider';

export default function NavHeader() {
  const pathname = usePathname();
  const { cards } = useGameCollection();
  const { profile } = useAuth();
  const streak = profile?.daily_streak ?? 0;

  return (
    <nav aria-label="Primary navigation" className="fixed top-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 flex items-center justify-between gap-1 sm:gap-3">
        {/* Logo */}
        <Link href="/" aria-label="Infinite Squads home" aria-current={pathname === '/' ? 'page' : undefined} className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Layers aria-hidden="true" className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white text-lg hidden sm:block">Infinite Squads</span>
          {streak > 0 && (
            <span aria-label={`${streak}-day login streak`} className="hidden sm:flex items-center gap-0.5 text-orange-400 text-xs font-bold">
              <Flame aria-hidden="true" className="w-3.5 h-3.5" />{streak}
            </span>
          )}
        </Link>

        {/* Navigation Links */}
        <div className="flex min-w-0 items-center gap-1 sm:gap-2">
          <Link
            href="/packs"
            aria-label="Packs"
            aria-current={pathname === '/packs' ? 'page' : undefined}
            className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Package aria-hidden="true" className="w-4 h-4" />
            <span className="hidden sm:inline">Packs</span>
          </Link>

          <Link
            href="/collections"
            aria-label="Collections"
            aria-current={pathname === '/collections' ? 'page' : undefined}
            className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Flame aria-hidden="true" className="w-4 h-4" />
            <span className="hidden sm:inline">Collections</span>
          </Link>

          <Link
            href="/battle"
            aria-label="Battle"
            aria-current={pathname === '/battle' ? 'page' : undefined}
            className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Swords aria-hidden="true" className="w-4 h-4" />
            <span className="hidden sm:inline">Battle</span>
          </Link>

          <Link
            href="/my-cards"
            aria-label={`My Cards, ${cards.length} owned`}
            aria-current={pathname === '/my-cards' ? 'page' : undefined}
            className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <Users aria-hidden="true" className="w-4 h-4" />
            <span className="hidden sm:inline">My Cards</span>
            {cards.length > 0 && (
              <span aria-hidden="true" className="hidden min-[360px]:inline bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cards.length}
              </span>
            )}
          </Link>

          {/* Coin Display & User Menu */}
          <CoinDisplay />
        </div>
      </div>
    </nav>
  );
}
