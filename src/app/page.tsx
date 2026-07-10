import Link from 'next/link';
import { Package, Swords, Users, Sparkles, Flame, Gem } from 'lucide-react';
import { getImageUrl } from '@/lib/avatar';

const SHOWCASE_NAMES = ['Albert Einstein', 'Napoleon Bonaparte', 'Grimace', 'Elvis Presley', 'Snoop Doggo', 'Cleopatra'];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-24 text-center">
        <div className="flex justify-center gap-3 mb-6">
          {SHOWCASE_NAMES.map((name) => (
            <div key={name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-slate-700 shadow-lg -rotate-3 first:rotate-0 even:rotate-3 hover:rotate-0 hover:scale-110 transition-transform">
              <img src={getImageUrl(name)} alt={name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <h1 className="text-4xl sm:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          Infinite Squads
        </h1>
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Pull legends and internet icons in card packs, build your ultimate squad, and battle it out in simmed events.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
          <Link href="/packs" className="flex flex-col items-center gap-2 p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20">
            <Package className="w-8 h-8" />
            Open Packs
          </Link>
          <Link href="/collections" className="flex flex-col items-center gap-2 p-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/20">
            <Flame className="w-8 h-8" />
            Collections
          </Link>
          <Link href="/squad" className="flex flex-col items-center gap-2 p-6 bg-slate-800/70 border border-slate-700 rounded-2xl text-white font-semibold hover:bg-slate-800 transition-colors">
            <Users className="w-8 h-8 text-cyan-400" />
            Build a Squad
          </Link>
          <Link href="/battle" className="flex flex-col items-center gap-2 p-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-red-500/20">
            <Swords className="w-8 h-8" />
            Battle Arena
          </Link>
        </div>

        <div className="flex items-center justify-center gap-6">
          <Link href="/my-cards" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
            <Sparkles className="w-4 h-4" />
            View My Collection →
          </Link>
          <Link href="/store" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
            <Gem className="w-4 h-4" />
            Store →
          </Link>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl mb-2">📦</div>
            <h3 className="font-bold text-white mb-1">Open Packs</h3>
            <p className="text-sm text-slate-400">Pull from a roster of dead legends and internet-famous chaos icons — every rating computed straight from the card&apos;s own stats.</p>
          </div>
          <div>
            <div className="text-2xl mb-2">🔥</div>
            <h3 className="font-bold text-white mb-1">Burn Collections</h3>
            <p className="text-sm text-slate-400">Sacrifice the right cluster of history — all four Ancient Menaces, say — to unlock ICON cards that exist nowhere else.</p>
          </div>
          <div>
            <div className="text-2xl mb-2">🧩</div>
            <h3 className="font-bold text-white mb-1">Build a Squad</h3>
            <p className="text-sm text-slate-400">Line up your collection for a basketball five, a road trip, a zombie apocalypse, and more — chemistry bonuses included.</p>
          </div>
          <div>
            <div className="text-2xl mb-2">⚔️</div>
            <h3 className="font-bold text-white mb-1">Battle</h3>
            <p className="text-sm text-slate-400">Face an AI-generated opponent squad matched to your team&apos;s strength and see who comes out on top.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
