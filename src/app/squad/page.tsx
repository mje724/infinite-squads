'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCardCollection, useCardCreator } from '@/store/store';
import { RARITY_STYLES, ImageFilter, Card } from '@/types/schema';
import { Users, Plus, X, User, Flame, Sparkles, Zap, ArrowLeft, Trophy, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CardVisuals from '@/components/CardVisuals';

const LINEUP_TYPES = [
  { id: 'starting5', name: 'Starting 5', description: 'Basketball lineup', slots: 5, layout: 'basketball' },
  { id: '7on7', name: '7 on 7', description: 'Football lineup', slots: 7, layout: 'football7' },
  { id: '11v11', name: '11 v 11', description: 'Soccer lineup', slots: 11, layout: 'soccer' },
];

const MiniCardSlot: React.FC<{ card: Card | null; onClick: () => void; onRemove?: () => void; label?: string }> = ({ card, onClick, onRemove, label }) => {
  if (!card) {
    return (
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        onClick={onClick}
        className="w-20 h-28 md:w-24 md:h-32 border-2 border-dashed border-slate-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500 hover:bg-cyan-500/10 transition-all"
      >
        <Plus className="w-6 h-6 text-slate-500" />
        {label && <span className="text-[10px] text-slate-500 mt-1">{label}</span>}
      </motion.div>
    );
  }

  const rarityStyle = RARITY_STYLES[card.rarity || 'gold'];
  const getFilterStyle = (filter: ImageFilter): string => {
    switch (filter) { case 'bw': return 'grayscale(100%)'; case 'deepfried': return 'contrast(150%) saturate(200%) brightness(110%)'; default: return 'none'; }
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} className="relative w-20 h-28 md:w-24 md:h-32 cursor-pointer group" onClick={onClick}>
      <div className="absolute inset-0 rounded-xl blur-md opacity-50" style={{ background: rarityStyle.gradient }} />
      <div className="relative w-full h-full rounded-xl overflow-hidden" style={{ background: rarityStyle.gradient }}>
        <div className="absolute inset-[2px] rounded-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
          <div className="absolute top-1 left-1 z-10">
            <span className="text-lg font-black" style={{ color: rarityStyle.border }}>{card.overallRating}</span>
          </div>
          <div className="absolute top-6 left-0 right-0 h-12 overflow-hidden">
            {card.image ? <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(' + card.image + ')', filter: getFilterStyle(card.imageFilter || 'normal') }} /> : <div className="w-full h-full flex items-center justify-center bg-slate-800/50"><User className="w-6 h-6 text-slate-600" /></div>}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-1 left-0 right-0 text-center px-1">
            <h3 className="text-[9px] font-bold uppercase truncate" style={{ color: rarityStyle.border }}>{card.name}</h3>
            {card.position && <p className="text-[8px] text-slate-400">{card.position}</p>}
          </div>
        </div>
      </div>
      {onRemove && (
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <X className="w-3 h-3 text-white" />
        </button>
      )}
      {label && <div className="absolute -bottom-5 left-0 right-0 text-center"><span className="text-[10px] text-slate-400">{label}</span></div>}
    </motion.div>
  );
};

const CardPicker: React.FC<{ cards: Card[]; onSelect: (card: Card) => void; onClose: () => void; onCreateNew: () => void }> = ({ cards, onSelect, onClose, onCreateNew }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-2xl max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-xl font-bold text-white">Select a Card</h3>
          <p className="text-slate-400 text-sm">Choose from your collection or create new</p>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {cards.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {cards.map((card) => {
                const rarityStyle = RARITY_STYLES[card.rarity || 'gold'];
                return (
                  <motion.div key={card.id} whileHover={{ scale: 1.05 }} onClick={() => onSelect(card)} className="cursor-pointer">
                    <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden" style={{ background: rarityStyle.gradient }}>
                      <div className="absolute inset-[2px] rounded-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                        <div className="absolute top-1 left-1"><span className="text-sm font-black" style={{ color: rarityStyle.border }}>{card.overallRating}</span></div>
                        <div className="absolute top-5 left-0 right-0 h-10 overflow-hidden">
                          {card.image ? <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(' + card.image + ')' }} /> : <div className="w-full h-full flex items-center justify-center bg-slate-800/50"><User className="w-4 h-4 text-slate-600" /></div>}
                        </div>
                        <div className="absolute bottom-1 left-0 right-0 text-center px-1">
                          <h3 className="text-[8px] font-bold uppercase truncate" style={{ color: rarityStyle.border }}>{card.name}</h3>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10">
              <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No cards in your collection</p>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-slate-700 flex gap-3">
          <button onClick={onCreateNew} className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />Create New Card
          </button>
          <button onClick={onClose} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 font-semibold transition-colors">Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BasketballLayout: React.FC<{ lineup: (Card | null)[]; onSlotClick: (index: number) => void; onRemove: (index: number) => void }> = ({ lineup, onSlotClick, onRemove }) => {
  const positions = ['PG', 'SG', 'SF', 'PF', 'C'];
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/4] bg-gradient-to-b from-orange-900/20 to-orange-800/10 rounded-2xl border border-orange-500/20 p-4">
      <div className="absolute inset-4 border-2 border-orange-500/30 rounded-xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-orange-500/30 rounded-full" />
      <div className="relative h-full flex flex-col justify-between py-4">
        <div className="flex justify-center"><MiniCardSlot card={lineup[4]} onClick={() => onSlotClick(4)} onRemove={lineup[4] ? () => onRemove(4) : undefined} label={positions[4]} /></div>
        <div className="flex justify-around px-4"><MiniCardSlot card={lineup[2]} onClick={() => onSlotClick(2)} onRemove={lineup[2] ? () => onRemove(2) : undefined} label={positions[2]} /><MiniCardSlot card={lineup[3]} onClick={() => onSlotClick(3)} onRemove={lineup[3] ? () => onRemove(3) : undefined} label={positions[3]} /></div>
        <div className="flex justify-around px-8"><MiniCardSlot card={lineup[0]} onClick={() => onSlotClick(0)} onRemove={lineup[0] ? () => onRemove(0) : undefined} label={positions[0]} /><MiniCardSlot card={lineup[1]} onClick={() => onSlotClick(1)} onRemove={lineup[1] ? () => onRemove(1) : undefined} label={positions[1]} /></div>
      </div>
    </div>
  );
};

const Football7Layout: React.FC<{ lineup: (Card | null)[]; onSlotClick: (index: number) => void; onRemove: (index: number) => void }> = ({ lineup, onSlotClick, onRemove }) => {
  const positions = ['QB', 'RB', 'WR', 'WR', 'WR', 'TE', 'C'];
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] bg-gradient-to-b from-green-900/20 to-green-800/10 rounded-2xl border border-green-500/20 p-4">
      <div className="absolute inset-x-4 top-1/2 h-0.5 bg-white/20" />
      <div className="relative h-full flex flex-col justify-between py-2">
        <div className="flex justify-around"><MiniCardSlot card={lineup[2]} onClick={() => onSlotClick(2)} onRemove={lineup[2] ? () => onRemove(2) : undefined} label={positions[2]} /><MiniCardSlot card={lineup[3]} onClick={() => onSlotClick(3)} onRemove={lineup[3] ? () => onRemove(3) : undefined} label={positions[3]} /><MiniCardSlot card={lineup[4]} onClick={() => onSlotClick(4)} onRemove={lineup[4] ? () => onRemove(4) : undefined} label={positions[4]} /></div>
        <div className="flex justify-around px-8"><MiniCardSlot card={lineup[5]} onClick={() => onSlotClick(5)} onRemove={lineup[5] ? () => onRemove(5) : undefined} label={positions[5]} /><MiniCardSlot card={lineup[1]} onClick={() => onSlotClick(1)} onRemove={lineup[1] ? () => onRemove(1) : undefined} label={positions[1]} /></div>
        <div className="flex justify-center gap-8"><MiniCardSlot card={lineup[0]} onClick={() => onSlotClick(0)} onRemove={lineup[0] ? () => onRemove(0) : undefined} label={positions[0]} /><MiniCardSlot card={lineup[6]} onClick={() => onSlotClick(6)} onRemove={lineup[6] ? () => onRemove(6) : undefined} label={positions[6]} /></div>
      </div>
    </div>
  );
};

const SoccerLayout: React.FC<{ lineup: (Card | null)[]; onSlotClick: (index: number) => void; onRemove: (index: number) => void }> = ({ lineup, onSlotClick, onRemove }) => {
  const positions = ['GK', 'LB', 'CB', 'CB', 'RB', 'LM', 'CM', 'CM', 'RM', 'ST', 'ST'];
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[3/4] bg-gradient-to-b from-green-900/20 to-green-800/10 rounded-2xl border border-green-500/20 p-2">
      <div className="absolute inset-x-2 top-1/2 h-0.5 bg-white/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white/20 rounded-full" />
      <div className="relative h-full flex flex-col justify-between py-2">
        <div className="flex justify-center gap-4"><MiniCardSlot card={lineup[9]} onClick={() => onSlotClick(9)} onRemove={lineup[9] ? () => onRemove(9) : undefined} label={positions[9]} /><MiniCardSlot card={lineup[10]} onClick={() => onSlotClick(10)} onRemove={lineup[10] ? () => onRemove(10) : undefined} label={positions[10]} /></div>
        <div className="flex justify-around"><MiniCardSlot card={lineup[5]} onClick={() => onSlotClick(5)} onRemove={lineup[5] ? () => onRemove(5) : undefined} label={positions[5]} /><MiniCardSlot card={lineup[6]} onClick={() => onSlotClick(6)} onRemove={lineup[6] ? () => onRemove(6) : undefined} label={positions[6]} /><MiniCardSlot card={lineup[7]} onClick={() => onSlotClick(7)} onRemove={lineup[7] ? () => onRemove(7) : undefined} label={positions[7]} /><MiniCardSlot card={lineup[8]} onClick={() => onSlotClick(8)} onRemove={lineup[8] ? () => onRemove(8) : undefined} label={positions[8]} /></div>
        <div className="flex justify-around px-4"><MiniCardSlot card={lineup[1]} onClick={() => onSlotClick(1)} onRemove={lineup[1] ? () => onRemove(1) : undefined} label={positions[1]} /><MiniCardSlot card={lineup[2]} onClick={() => onSlotClick(2)} onRemove={lineup[2] ? () => onRemove(2) : undefined} label={positions[2]} /><MiniCardSlot card={lineup[3]} onClick={() => onSlotClick(3)} onRemove={lineup[3] ? () => onRemove(3) : undefined} label={positions[3]} /><MiniCardSlot card={lineup[4]} onClick={() => onSlotClick(4)} onRemove={lineup[4] ? () => onRemove(4) : undefined} label={positions[4]} /></div>
        <div className="flex justify-center"><MiniCardSlot card={lineup[0]} onClick={() => onSlotClick(0)} onRemove={lineup[0] ? () => onRemove(0) : undefined} label={positions[0]} /></div>
      </div>
    </div>
  );
};

export default function SquadPage() {
  const { cards } = useCardCollection();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState(LINEUP_TYPES[0]);
  const [lineup, setLineup] = useState<(Card | null)[]>(Array(11).fill(null));
  const [showPicker, setShowPicker] = useState(false);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  const handleSlotClick = (index: number) => {
    setActiveSlot(index);
    setShowPicker(true);
  };

  const handleSelectCard = (card: Card) => {
    if (activeSlot !== null) {
      const newLineup = [...lineup];
      newLineup[activeSlot] = card;
      setLineup(newLineup);
    }
    setShowPicker(false);
    setActiveSlot(null);
  };

  const handleRemoveCard = (index: number) => {
    const newLineup = [...lineup];
    newLineup[index] = null;
    setLineup(newLineup);
  };

  const handleCreateNew = () => {
    setShowPicker(false);
    router.push('/');
  };

  const handleClearLineup = () => {
    setLineup(Array(11).fill(null));
  };

  const filledSlots = lineup.slice(0, selectedType.slots).filter(Boolean).length;
  const totalRating = lineup.slice(0, selectedType.slots).filter(Boolean).reduce((sum, card) => sum + (card?.overallRating || 0), 0);
  const avgRating = filledSlots > 0 ? Math.round(totalRating / filledSlots) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-green-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-500/5 to-transparent rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">Squad Builder</h1>
            <p className="text-slate-400 text-sm">Build your ultimate lineup</p>
          </div>
          <div className="flex gap-3">
            {filledSlots > 0 && (
              <button onClick={handleClearLineup} className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <Link href="/my-cards" className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-sm font-medium transition-colors">
              <Users className="w-4 h-4" />My Cards
            </Link>
          </div>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {LINEUP_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => { setSelectedType(type); setLineup(Array(11).fill(null)); }}
              className={`px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                selectedType.id === type.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <div>{type.name}</div>
              <div className="text-[10px] opacity-70">{type.description}</div>
            </button>
          ))}
        </div>

        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 mb-6">
          {selectedType.layout === 'basketball' && <BasketballLayout lineup={lineup} onSlotClick={handleSlotClick} onRemove={handleRemoveCard} />}
          {selectedType.layout === 'football7' && <Football7Layout lineup={lineup} onSlotClick={handleSlotClick} onRemove={handleRemoveCard} />}
          {selectedType.layout === 'soccer' && <SoccerLayout lineup={lineup} onSlotClick={handleSlotClick} onRemove={handleRemoveCard} />}
        </div>

        <div className="flex items-center justify-between bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{filledSlots}/{selectedType.slots}</div>
              <div className="text-xs text-slate-500">Players</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{avgRating}</div>
              <div className="text-xs text-slate-500">Avg Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{totalRating}</div>
              <div className="text-xs text-slate-500">Total</div>
            </div>
          </div>
          <button disabled={filledSlots < selectedType.slots} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${filledSlots === selectedType.slots ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}>
            <Trophy className="w-5 h-5" />
            {filledSlots === selectedType.slots ? 'Squad Complete!' : `Need ${selectedType.slots - filledSlots} more`}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showPicker && (
          <CardPicker cards={cards} onSelect={handleSelectCard} onClose={() => { setShowPicker(false); setActiveSlot(null); }} onCreateNew={handleCreateNew} />
        )}
      </AnimatePresence>
    </div>
  );
}
