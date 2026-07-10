'use client';

import Link from 'next/link';
import { Layers, Users, Package, Swords } from 'lucide-react';
import CoinDisplay from './CoinDisplay';
import { useCardCollection } from '@/store/store';

export default function NavHeader() {
  const { cards } = useCardCollection();
  
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
          <Link 
            href="/packs" 
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline">Packs</span>
          </Link>
          
          <Link 
            href="/battle" 
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Swords className="w-4 h-4" />
            <span className="hidden sm:inline">Battle</span>
          </Link>
          
          <Link 
            href="/my-cards" 
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white text-sm font-medium transition-colors"
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">My Cards</span>
            {cards.length > 0 && (
              <span className="bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded-full">
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
