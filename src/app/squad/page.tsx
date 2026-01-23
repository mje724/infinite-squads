'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCardCollection, useCardCreator } from '@/store/store';
import { RARITY_STYLES, ImageFilter, Card } from '@/types/schema';
import { TRAIT_PRESETS } from '@/data/presets';
import { Users, Plus, X, User, ArrowLeft, Trophy, Trash2, Link2, Unlink, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Scenario Definitions
const SCENARIOS = [
  {
    id: 'starting5',
    name: 'Starting 5',
    description: 'Basketball lineup',
    slots: 5,
    background: 'linear-gradient(135deg, #7c2d12 0%, #c2410c 50%, #ea580c 100%)',
    backgroundImage: '🏀',
    roles: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
    positions: [
      { x: 50, y: 85 },
      { x: 20, y: 65 },
      { x: 80, y: 65 },
      { x: 30, y: 35 },
      { x: 70, y: 35 },
    ]
  },
  {
    id: 'soccer11',
    name: '11v11 Soccer',
    description: '4-3-3 Formation',
    slots: 11,
    background: 'linear-gradient(135deg, #14532d 0%, #166534 50%, #15803d 100%)',
    backgroundImage: '⚽',
    roles: ['GK', 'LB', 'CB', 'CB', 'RB', 'CDM', 'CM', 'CM', 'LW', 'ST', 'RW'],
    positions: [
      { x: 50, y: 90 },
      { x: 15, y: 70 },
      { x: 38, y: 75 },
      { x: 62, y: 75 },
      { x: 85, y: 70 },
      { x: 50, y: 55 },
      { x: 30, y: 45 },
      { x: 70, y: 45 },
      { x: 15, y: 25 },
      { x: 50, y: 15 },
      { x: 85, y: 25 },
    ]
  },
  {
    id: 'football7',
    name: '7on7 Football',
    description: 'Offense lineup',
    slots: 7,
    background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #3b82f6 100%)',
    backgroundImage: '🏈',
    roles: ['QB', 'RB', 'WR', 'WR', 'WR', 'TE', 'Center'],
    positions: [
      { x: 50, y: 70 },
      { x: 50, y: 85 },
      { x: 10, y: 30 },
      { x: 50, y: 30 },
      { x: 90, y: 30 },
      { x: 75, y: 55 },
      { x: 25, y: 55 },
    ]
  },
  {
    id: 'road-trip',
    name: 'The Road Trip',
    description: '4 friends, one car',
    slots: 4,
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    backgroundImage: '🚗',
    roles: ['The Driver', 'The DJ', 'The Sleeper', 'The Backseat Driver'],
    positions: [
      { x: 25, y: 30 },  // Driver
      { x: 75, y: 30 },  // DJ (passenger)
      { x: 25, y: 70 },  // Back left
      { x: 75, y: 70 },  // Back right
    ]
  },
  {
    id: 'dinner-bill',
    name: 'The Dinner Bill',
    description: '5 people, one check',
    slots: 5,
    background: 'linear-gradient(135deg, #2d132c 0%, #801336 50%, #c72c41 100%)',
    backgroundImage: '🍽️',
    roles: ['The Payer', 'The Moocher', 'The Math Whiz', 'The Splitter', 'The Ghost'],
    positions: [
      { x: 50, y: 20 },  // Head of table
      { x: 20, y: 45 },
      { x: 80, y: 45 },
      { x: 30, y: 75 },
      { x: 70, y: 75 },
    ]
  },
  {
    id: 'movie-night',
    name: 'Movie Night',
    description: '6 on the couch',
    slots: 6,
    background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #2d2d44 100%)',
    backgroundImage: '🎬',
    roles: ['The Picker', 'The Critic', 'The Sleeper', 'The Talker', 'The Snacker', 'The Quoter'],
    positions: [
      { x: 15, y: 50 },
      { x: 32, y: 50 },
      { x: 50, y: 50 },
      { x: 68, y: 50 },
      { x: 85, y: 50 },
      { x: 50, y: 85 },  // Floor seat
    ]
  },
  {
    id: 'group-project',
    name: 'Group Project',
    description: '4 students, 1 grade',
    slots: 4,
    background: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%)',
    backgroundImage: '📚',
    roles: ['The Carrier', 'The Ghost', 'The Editor', 'The Presenter'],
    positions: [
      { x: 50, y: 25 },
      { x: 20, y: 55 },
      { x: 80, y: 55 },
      { x: 50, y: 80 },
    ]
  },
  {
    id: 'wedding',
    name: 'Wedding Party',
    description: '8 in the bridal party',
    slots: 8,
    background: 'linear-gradient(135deg, #fdf6f0 0%, #f5e6d3 50%, #e8d4c4 100%)',
    backgroundImage: '💒',
    roles: ['The Bride', 'The Groom', 'Best Man', 'Maid of Honor', 'Bridesmaid', 'Bridesmaid', 'Groomsman', 'Groomsman'],
    positions: [
      { x: 40, y: 20 },  // Bride
      { x: 60, y: 20 },  // Groom
      { x: 75, y: 45 },  // Best Man
      { x: 25, y: 45 },  // Maid of Honor
      { x: 15, y: 70 },
      { x: 35, y: 70 },
      { x: 65, y: 70 },
      { x: 85, y: 70 },
    ]
  },
  {
    id: 'zombie',
    name: 'Zombie Apocalypse',
    description: '5 survivors',
    slots: 5,
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #404040 100%)',
    backgroundImage: '🧟',
    roles: ['The Leader', 'The Medic', 'The Muscle', 'The Brains', 'First to Die'],
    positions: [
      { x: 50, y: 25 },
      { x: 25, y: 50 },
      { x: 75, y: 50 },
      { x: 35, y: 78 },
      { x: 65, y: 78 },
    ]
  },
];

type Connection = {
  from: number;
  to: number;
  type: 'good' | 'bad';
};

const MiniCardSlot: React.FC<{ 
  card: Card | null; 
  onClick: () => void; 
  onRemove?: () => void; 
  label?: string;
  isConnecting?: boolean;
  isSelected?: boolean;
}> = ({ card, onClick, onRemove, label, isConnecting, isSelected }) => {
  if (!card) {
    return (
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        onClick={onClick}
        className={`w-20 h-28 md:w-24 md:h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
          isConnecting ? 'border-cyan-500 bg-cyan-500/20' : 'border-slate-600 hover:border-cyan-500 hover:bg-cyan-500/10'
        }`}
      >
        <Plus className="w-6 h-6 text-slate-500" />
        {label && <span className="text-[10px] text-slate-400 mt-1 text-center px-1">{label}</span>}
      </motion.div>
    );
  }

  const rarityStyle = RARITY_STYLES[card.rarity || 'gold'];
  const getFilterStyle = (filter: ImageFilter): string => {
    switch (filter) { case 'bw': return 'grayscale(100%)'; case 'deepfried': return 'contrast(150%) saturate(200%) brightness(110%)'; default: return 'none'; }
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      className={`relative w-20 h-28 md:w-24 md:h-32 cursor-pointer group ${isSelected ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-900' : ''}`} 
      onClick={onClick}
    >
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
          </div>
        </div>
      </div>
      {onRemove && !isConnecting && (
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <X className="w-3 h-3 text-white" />
        </button>
      )}
      {label && <div className="absolute -bottom-6 left-0 right-0 text-center"><span className="text-[10px] text-slate-300 font-medium">{label}</span></div>}
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

// SVG Connection Lines Component
const ConnectionLines: React.FC<{
  connections: Connection[];
  positions: { x: number; y: number }[];
  containerRef: React.RefObject<HTMLDivElement>;
  onConnectionClick: (index: number) => void;
}> = ({ connections, positions, containerRef, onConnectionClick }) => {
  const [dims, setDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const updateDims = () => {
        setDims({
          width: containerRef.current?.offsetWidth || 0,
          height: containerRef.current?.offsetHeight || 0
        });
      };
      updateDims();
      window.addEventListener('resize', updateDims);
      return () => window.removeEventListener('resize', updateDims);
    }
  }, [containerRef]);

  if (dims.width === 0) return null;

  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
      {connections.map((conn, idx) => {
        const fromPos = positions[conn.from];
        const toPos = positions[conn.to];
        if (!fromPos || !toPos) return null;
        
        const x1 = (fromPos.x / 100) * dims.width;
        const y1 = (fromPos.y / 100) * dims.height;
        const x2 = (toPos.x / 100) * dims.width;
        const y2 = (toPos.y / 100) * dims.height;

        return (
          <g key={idx} style={{ pointerEvents: 'auto' }} onClick={() => onConnectionClick(idx)}>
            <line
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={conn.type === 'good' ? '#22c55e' : '#ef4444'}
              strokeWidth={4}
              strokeLinecap="round"
              className="cursor-pointer hover:opacity-70 transition-opacity"
            />
            <line
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="transparent"
              strokeWidth={20}
              className="cursor-pointer"
            />
          </g>
        );
      })}
    </svg>
  );
};

export default function SquadPage() {
  const { cards } = useCardCollection();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [lineup, setLineup] = useState<(Card | null)[]>(Array(8).fill(null));
  const [showPicker, setShowPicker] = useState(false);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  
  // Connection state
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isConnectMode, setIsConnectMode] = useState(false);
  const [connectingFrom, setConnectingFrom] = useState<number | null>(null);

  const handleSlotClick = (index: number) => {
    if (isConnectMode) {
      // Connection mode logic
      if (lineup[index]) {
        if (connectingFrom === null) {
          setConnectingFrom(index);
        } else if (connectingFrom !== index) {
          // Create connection
          const existingIdx = connections.findIndex(
            c => (c.from === connectingFrom && c.to === index) || (c.from === index && c.to === connectingFrom)
          );
          if (existingIdx === -1) {
            setConnections([...connections, { from: connectingFrom, to: index, type: 'good' }]);
          }
          setConnectingFrom(null);
        }
      }
    } else {
      // Normal mode - open picker
      setActiveSlot(index);
      setShowPicker(true);
    }
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
    // Remove connections involving this card
    setConnections(connections.filter(c => c.from !== index && c.to !== index));
  };

  const handleConnectionClick = (index: number) => {
    const newConnections = [...connections];
    newConnections[index] = {
      ...newConnections[index],
      type: newConnections[index].type === 'good' ? 'bad' : 'good'
    };
    setConnections(newConnections);
  };

  const handleAutoConnect = () => {
    const newConnections: Connection[] = [];
    const filledSlots = lineup.map((card, idx) => card ? idx : -1).filter(idx => idx !== -1);
    
    for (let i = 0; i < filledSlots.length; i++) {
      for (let j = i + 1; j < filledSlots.length; j++) {
        const cardA = lineup[filledSlots[i]];
        const cardB = lineup[filledSlots[j]];
        if (!cardA || !cardB) continue;

        // Check for shared traits
        const traitsA = cardA.traits || [];
        const traitsB = cardB.traits || [];
        const sharedTraits = traitsA.filter(t => traitsB.includes(t));
        
        if (sharedTraits.length > 0) {
          newConnections.push({ from: filledSlots[i], to: filledSlots[j], type: 'good' });
        }
      }
    }
    
    setConnections(newConnections);
  };

  const handleCreateNew = () => {
    setShowPicker(false);
    router.push('/');
  };

  const handleClearLineup = () => {
    setLineup(Array(8).fill(null));
    setConnections([]);
  };

  const handleScenarioChange = (scenario: typeof SCENARIOS[0]) => {
    setSelectedScenario(scenario);
    setLineup(Array(8).fill(null));
    setConnections([]);
    setIsConnectMode(false);
    setConnectingFrom(null);
  };

  const filledSlots = lineup.slice(0, selectedScenario.slots).filter(Boolean).length;

  return (
    <div className="min-h-screen" style={{ background: selectedScenario.background }}>
      {/* Background Emoji */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-10 text-[300px]">
        {selectedScenario.backgroundImage}
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Scenario Builder</h1>
            <p className="text-slate-400 text-sm">Build your squad for any situation</p>
          </div>
          <div className="flex gap-2">
            {filledSlots > 0 && (
              <button onClick={handleClearLineup} className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            <Link href="/my-cards" className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-sm font-medium transition-colors">
              <Users className="w-4 h-4" />My Cards
            </Link>
          </div>
        </div>

        {/* Scenario Selector */}
        <div className="mb-6">
          <label className="text-sm text-slate-400 mb-2 block">Choose Scenario</label>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => handleScenarioChange(scenario)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedScenario.id === scenario.id
                    ? 'bg-white/20 text-white border-2 border-white/50'
                    : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{scenario.backgroundImage}</span>
                  <div className="text-left">
                    <div>{scenario.name}</div>
                    <div className="text-[10px] opacity-70">{scenario.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Connection Controls */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => { setIsConnectMode(!isConnectMode); setConnectingFrom(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isConnectMode
                ? 'bg-cyan-500 text-white'
                : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {isConnectMode ? <Unlink className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
            {isConnectMode ? 'Done Connecting' : 'Draw Connections'}
          </button>
          <button
            onClick={handleAutoConnect}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Auto-Connect
          </button>
          {connections.length > 0 && (
            <button
              onClick={() => setConnections([])}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 hover:text-white text-sm font-medium transition-colors"
            >
              Clear Lines
            </button>
          )}
        </div>

        {isConnectMode && (
          <div className="mb-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-300 text-sm">
            {connectingFrom !== null 
              ? `Click another card to connect, or click same card to cancel`
              : `Click a card to start a connection. Click existing lines to toggle Good (green) / Bad (red)`
            }
          </div>
        )}

        {/* Scenario Board */}
        <div 
          ref={containerRef}
          className="relative bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 mb-6"
          style={{ height: '500px' }}
        >
          <ConnectionLines 
            connections={connections}
            positions={selectedScenario.positions}
            containerRef={containerRef}
            onConnectionClick={handleConnectionClick}
          />
          
          {selectedScenario.positions.slice(0, selectedScenario.slots).map((pos, index) => (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <MiniCardSlot
                card={lineup[index]}
                onClick={() => handleSlotClick(index)}
                onRemove={lineup[index] ? () => handleRemoveCard(index) : undefined}
                label={selectedScenario.roles[index]}
                isConnecting={isConnectMode}
                isSelected={connectingFrom === index}
              />
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="flex items-center justify-between bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{filledSlots}/{selectedScenario.slots}</div>
              <div className="text-xs text-slate-500">Filled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{connections.filter(c => c.type === 'good').length}</div>
              <div className="text-xs text-slate-500">Good Links</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{connections.filter(c => c.type === 'bad').length}</div>
              <div className="text-xs text-slate-500">Bad Links</div>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold ${
            filledSlots === selectedScenario.slots 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
              : 'bg-slate-700 text-slate-500'
          }`}>
            <Trophy className="w-5 h-5" />
            {filledSlots === selectedScenario.slots ? 'Squad Complete!' : `Need ${selectedScenario.slots - filledSlots} more`}
          </div>
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
