'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCardCollection } from '@/store/store';
import { TRAIT_PRESETS } from '@/data/presets';
import { RARITY_STYLES, ImageFilter, Card } from '@/types/schema';
import { Trash2, Users, Sparkles, Flame, Zap, User, X, Share2, Download, Copy, Check, Loader2, Package } from 'lucide-react';
import Link from 'next/link';
import CardVisuals from '@/components/CardVisuals';
import html2canvas from 'html2canvas';

const FullCardView: React.FC<{ card: Card; onClose: () => void; onDelete: () => void }> = ({ card, onClose, onDelete }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);
  const rarityStyle = RARITY_STYLES[card.rarity || 'gold'];
  const getFilterStyle = (filter: ImageFilter): string => {
    switch (filter) { case 'bw': return 'grayscale(100%)'; case 'deepfried': return 'contrast(150%) saturate(200%) brightness(110%)'; case 'security': return 'grayscale(80%) contrast(120%) brightness(90%)'; case 'vhs': return 'sepia(30%) contrast(110%) saturate(130%)'; case 'glitch': return 'hue-rotate(90deg) contrast(120%)'; default: return 'none'; }
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
        <div ref={cardRef} className="relative w-[340px] h-[480px] p-[10px] bg-slate-900"><div className="relative w-[320px] h-[460px]" style={{ perspective: '1000px' }}>
          <div className="absolute inset-0 rounded-2xl blur-xl opacity-60" style={{ background: rarityStyle.gradient, transform: 'scale(1.1)', zIndex: -1 }} />
          <div className="relative w-full h-full rounded-2xl overflow-hidden" style={{ background: rarityStyle.gradient, boxShadow: rarityStyle.glow }}>
            <div className="absolute inset-[3px] rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
              <CardVisuals activeEffects={card.activeEffects || []} />
              <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-4 z-20">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-black" style={{ color: rarityStyle.border, textShadow: '0 0 20px ' + rarityStyle.border }}>{card.overallRating}</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400">OVR</span>
                </div>
                {card.position && <div className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: rarityStyle.border + '20', color: rarityStyle.border, border: '1px solid ' + rarityStyle.border + '40' }}>{card.position}</div>}
              </div>
              <div className="absolute top-14 left-0 right-0 h-48 overflow-hidden">
                {card.image ? <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(' + card.image + ')', filter: getFilterStyle(card.imageFilter || 'normal') }} /> : <div className="w-full h-full flex items-center justify-center bg-slate-800/50"><User className="w-20 h-20 text-slate-600" /></div>}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              </div>
              <div className="absolute top-56 left-0 right-0 text-center px-4 z-20">
                <h2 className="text-2xl font-black uppercase tracking-tight truncate" style={{ color: rarityStyle.border }}>{card.name}</h2>
                {card.nickname && <p className="text-sm text-slate-400 italic">&ldquo;{card.nickname}&rdquo;</p>}
              </div>
              <div className="absolute top-[280px] left-4 right-4 z-20">
                <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                  {(card.statBlock || []).slice(0, 6).map((stat, i) => (
                    <div key={stat.id || i} className="flex items-start justify-between gap-1">
                      <span className="text-slate-400 flex items-start gap-1 min-w-0 flex-1">
                        <span className="text-xs flex-shrink-0">{stat.icon}</span>
                        <span className="uppercase text-[9px] leading-tight">{stat.label}</span>
                      </span>
                      <span className="text-xs font-bold flex-shrink-0" style={{ color: stat.value >= 80 ? '#22c55e' : stat.value >= 60 ? '#eab308' : stat.value >= 40 ? '#f97316' : '#ef4444' }}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              {(card.traits || []).length > 0 && (
                <div className="absolute bottom-16 left-4 right-4 flex gap-2 justify-center flex-wrap z-20">
                  {(card.traits || []).slice(0, 4).map((traitId) => { const trait = TRAIT_PRESETS.find((t) => t.id === traitId); if (!trait) return null; return <div key={traitId} className="w-8 h-8 rounded-full bg-slate-700/80 flex items-center justify-center text-lg" title={trait.name}>{trait.icon}</div>; })}
                </div>
              )}
              {card.bio && <div className="absolute bottom-4 left-4 right-4 z-20"><p className="text-[10px] text-slate-400 italic text-center line-clamp-2">&ldquo;{card.bio}&rdquo;</p></div>}
            </div>
          </div>
        </div></div>
        <div className="flex gap-3 mt-4">
          <button onClick={async () => { if (!cardRef.current) return; setIsSharing(true); try { const canvas = await html2canvas(cardRef.current, { backgroundColor: "#0f172a", scale: 2, useCORS: true, allowTaint: true, logging: false, width: 320, height: 460, scrollX: 0, scrollY: 0 }); const dataUrl = canvas.toDataURL("image/png"); const blob = await (await fetch(dataUrl)).blob(); const file = new File([blob], `${card.name}-card.png`, { type: "image/png" }); if (navigator.share && navigator.canShare?.({ files: [file] })) { await navigator.share({ files: [file], title: `${card.name} Card`, text: "Check out my card!" }); } else { const link = document.createElement("a"); link.download = `${card.name}-card.png`; link.href = dataUrl; link.click(); } } catch (e) { console.error(e); } setIsSharing(false); }} disabled={isSharing} className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">{isSharing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Share2 className="w-5 h-5" />}</button>
          <button onClick={onDelete} className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-red-400 transition-colors"><Trash2 className="w-5 h-5" /></button>
        </div>
      </motion.div>
    </motion.div>
  );
};

function MiniCard({ card, onClick }: { card: Card; onClick: () => void }) {
  const rarityStyle = RARITY_STYLES[card.rarity || 'gold'];
  const getFilterStyle = (filter: ImageFilter): string => {
    switch (filter) { case 'bw': return 'grayscale(100%)'; case 'deepfried': return 'contrast(150%) saturate(200%) brightness(110%)'; case 'security': return 'grayscale(80%) contrast(120%) brightness(90%)'; case 'vhs': return 'sepia(30%) contrast(110%) saturate(130%)'; case 'glitch': return 'hue-rotate(90deg) contrast(120%)'; default: return 'none'; }
  };
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} whileHover={{ scale: 1.02 }} className="relative cursor-pointer" onClick={onClick}>
      <div className="absolute inset-0 rounded-xl blur-lg opacity-40" style={{ background: rarityStyle.gradient, transform: 'scale(1.05)', zIndex: -1 }} />
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden" style={{ background: rarityStyle.gradient, boxShadow: rarityStyle.glow }}>
        <div className="absolute inset-[2px] rounded-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
          <div className="absolute top-2 left-2 z-10"><span className="text-2xl font-black" style={{ color: rarityStyle.border, textShadow: '0 0 10px ' + rarityStyle.border }}>{card.overallRating}</span></div>
          <div className="absolute top-2 right-2 z-10">
            {card.rarity === 'legendary' && <Flame className="w-4 h-4 text-orange-500" />}
            {card.rarity === 'holo' && <Sparkles className="w-4 h-4 text-pink-500" />}
            {card.rarity === 'glitch' && <Zap className="w-4 h-4 text-cyan-400" />}
          </div>
          <div className="absolute top-8 left-0 right-0 h-24 overflow-hidden">
            {card.image ? <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(' + card.image + ')', filter: getFilterStyle(card.imageFilter || 'normal') }} /> : <div className="w-full h-full flex items-center justify-center bg-slate-800/50"><User className="w-10 h-10 text-slate-600" /></div>}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          </div>
          <div className="absolute top-32 left-0 right-0 text-center px-2">
            <h3 className="text-sm font-bold uppercase truncate" style={{ color: rarityStyle.border }}>{card.name}</h3>
            {card.position && <p className="text-[10px] text-slate-400">{card.position}</p>}
          </div>
          <div className="absolute bottom-2 left-2 right-2">
            <div className="grid grid-cols-3 gap-1">
              {(card.statBlock || []).slice(0, 3).map((stat, i) => (
                <div key={i} className="text-center"><div className="text-[10px] text-slate-500">{stat.icon}</div><div className="text-xs font-bold" style={{ color: stat.value >= 80 ? '#22c55e' : stat.value >= 60 ? '#eab308' : '#f97316' }}>{stat.value}</div></div>
              ))}
            </div>
          </div>
          {(card.rarity === 'holo' || card.rarity === 'glitch') && <motion.div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)', backgroundSize: '200% 200%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />}
        </div>
      </div>
    </motion.div>
  );
}

export default function MyCardsPage() {
  const { cards, removeCard, clearCollection } = useCardCollection();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const handleDelete = (cardId: string) => {
    removeCard(cardId);
    setSelectedCard(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="fixed inset-0 overflow-hidden pointer-events-none"><div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-3xl" /><div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-500/5 to-transparent rounded-full blur-3xl" /></div>
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">My Cards</h1><p className="text-slate-400 text-sm">{cards.length} card{cards.length !== 1 ? 's' : ''} in collection</p></div>
          <div className="flex gap-3">
            {cards.length > 0 && <button onClick={() => setShowClearConfirm(true)} className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium transition-colors">Clear All</button>}
            <Link href="/packs" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity"><Package className="w-4 h-4" />Open a Pack</Link>
          </div>
        </div>
        {cards.length > 0 ? (
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <AnimatePresence>{cards.map((card) => <MiniCard key={card.id} card={card} onClick={() => setSelectedCard(card)} />)}</AnimatePresence>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mb-6"><Users className="w-12 h-12 text-slate-600" /></div>
            <h2 className="text-xl font-bold text-white mb-2">No Cards Yet</h2>
            <p className="text-slate-400 mb-6">Open a pack to start building your collection!</p>
            <Link href="/packs" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"><Package className="w-5 h-5" />Open Your First Pack</Link>
          </motion.div>
        )}
        {cards.length >= 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-12 p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-2xl text-center">
            <h3 className="text-lg font-bold text-white mb-2">Ready to Build a Squad?</h3>
            <p className="text-slate-400 text-sm mb-4">You have {cards.length} cards - enough to start building your ultimate team!</p>
            <Link href="/squad" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"><Users className="w-5 h-5" />Build Squad</Link>
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowClearConfirm(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-slate-900 rounded-2xl border border-slate-700 p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold text-white mb-2">Clear Collection?</h3>
              <p className="text-slate-400 text-sm mb-6">This will delete all {cards.length} cards. This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowClearConfirm(false)} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 font-semibold transition-colors">Cancel</button>
                <button onClick={() => { clearCollection(); setShowClearConfirm(false); }} className="flex-1 py-3 bg-red-500 hover:bg-red-600 rounded-xl text-white font-semibold transition-colors">Delete All</button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {selectedCard && (
          <FullCardView card={selectedCard} onClose={() => setSelectedCard(null)} onDelete={() => handleDelete(selectedCard.id)} />
        )}
      </AnimatePresence>
    </div>
  );
}
