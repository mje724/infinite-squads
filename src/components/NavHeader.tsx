'use client';
import Link from 'next/link';
import { useCardCollection } from '@/store/store';
import { Layers, Users, Plus, Trophy, Package } from 'lucide-react';

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
        </div>
      </div>
    </nav>
  );
}
