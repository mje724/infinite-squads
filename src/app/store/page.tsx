'use client';

// ============================================
// STORE — premium currency stub.
// The gem economy is designed and displayed, but
// purchases are intentionally disabled: no payment
// processor is wired and nothing here can charge
// anyone. Flip ENABLE_PURCHASES when payments land.
// ============================================

import { motion } from 'framer-motion';
import { Gem, Coins, Swords, Flame, CalendarCheck, Package } from 'lucide-react';
import Link from 'next/link';
import { GEM_BUNDLES } from '@/data/gameEconomy';

const ENABLE_PURCHASES = false; // real payments not wired — keep false

const EARN_ROUTES = [
  { icon: CalendarCheck, label: 'Log in daily', detail: '50 → 400 coins/day as your streak grows', href: '/', color: 'text-orange-400' },
  { icon: Swords, label: 'Win battles', detail: '25 / 50 / 100 coins by difficulty', href: '/battle', color: 'text-red-400' },
  { icon: Coins, label: 'Quicksell dupes', detail: '20 → 300 coins depending on rarity', href: '/my-cards', color: 'text-yellow-400' },
  { icon: Flame, label: 'Complete collections', detail: '+250 coins on top of the exclusive card', href: '/collections', color: 'text-amber-400' },
];

export default function StorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent mb-2">Store</h1>
          <p className="text-slate-400">Everything in the game is earnable with coins. Gems are coming — for the impatient.</p>
        </div>

        {/* Gem bundles (visible, disabled) */}
        <div className="relative mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GEM_BUNDLES.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative bg-slate-900/70 border border-indigo-500/20 rounded-2xl p-5 text-center"
              >
                {b.tag && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-indigo-500 text-white text-[10px] font-black uppercase rounded-full whitespace-nowrap">{b.tag}</span>
                )}
                <Gem className="w-10 h-10 text-cyan-300 mx-auto mb-3" />
                <p className="text-2xl font-black text-white">{b.gems.toLocaleString()}</p>
                <p className="text-slate-500 text-xs mb-4">gems</p>
                <button
                  disabled={!ENABLE_PURCHASES}
                  className="w-full py-2 rounded-xl font-bold text-sm bg-slate-800 text-slate-500 cursor-not-allowed"
                >
                  {b.priceLabel}
                </button>
              </motion.div>
            ))}
          </div>
          {/* Coming soon veil */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="px-6 py-2 bg-slate-950/90 border border-cyan-500/40 rounded-full rotate-[-4deg] shadow-xl">
              <span className="text-cyan-300 font-black tracking-widest uppercase text-sm">Coming soon</span>
            </div>
          </div>
        </div>

        {/* How to earn coins now */}
        <h2 className="text-lg font-bold text-white mb-4">Meanwhile, the coin printer is free:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {EARN_ROUTES.map(route => (
            <Link key={route.label} href={route.href} className="flex items-center gap-4 bg-slate-900/60 border border-slate-800 hover:border-slate-600 rounded-2xl p-4 transition-colors">
              <route.icon className={`w-8 h-8 ${route.color} flex-shrink-0`} />
              <div>
                <p className="font-bold text-white">{route.label}</p>
                <p className="text-slate-400 text-sm">{route.detail}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/packs" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-white text-lg hover:opacity-90 transition-opacity">
            <Package className="w-5 h-5" /> Spend it on packs
          </Link>
        </div>
      </div>
    </div>
  );
}
