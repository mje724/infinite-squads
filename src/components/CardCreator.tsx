'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Upload, Shuffle, Sparkles, Zap, Save, RotateCcw, ChevronDown, Plus, X, Image as ImageIcon, User, Trophy, Flame, Star, Dices, Crop as CropIcon, Check } from 'lucide-react';
import { useCardCreator, useCardCollection } from '@/store/store';
import { STAT_PRESETS, TRAIT_PRESETS, POSITION_PRESETS } from '@/data/presets';
import { Rarity, ImageFilter, Stat, RARITY_STYLES } from '@/types/schema';
import { nanoid } from 'nanoid';

function cn(...classes: (string | boolean | undefined)[]) { return classes.filter(Boolean).join(' '); }

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight), mediaWidth, mediaHeight);
}

const ImageCropper: React.FC<{ imageSrc: string; onCropComplete: (croppedImage: string) => void; onCancel: () => void }> = ({ imageSrc, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const aspect = 4 / 5;
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => { const { width, height } = e.currentTarget; setCrop(centerAspectCrop(width, height, aspect)); };
  const getCroppedImg = useCallback(() => {
    if (!completedCrop || !imgRef.current) return;
    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelCrop = { x: completedCrop.x * scaleX, y: completedCrop.y * scaleY, width: completedCrop.width * scaleX, height: completedCrop.height * scaleY };
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
    onCropComplete(canvas.toDataURL('image/jpeg', 0.95));
  }, [completedCrop, onCropComplete]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onCancel}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-slate-900 rounded-2xl border border-slate-700 p-6 w-full max-w-2xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><CropIcon className="w-5 h-5 text-cyan-400" />Crop Image</h3>
        <p className="text-slate-400 text-sm mb-4">Drag to adjust the crop area.</p>
        <div className="flex justify-center mb-6 bg-slate-800 rounded-lg p-4">
          <ReactCrop crop={crop} onChange={(_, percentCrop) => setCrop(percentCrop)} onComplete={(c) => setCompletedCrop(c)} aspect={aspect} className="max-h-[60vh]">
            <img ref={imgRef} src={imageSrc} alt="Crop preview" onLoad={onImageLoad} className="max-h-[60vh] object-contain" />
          </ReactCrop>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-semibold transition-colors">Cancel</button>
          <button onClick={getCroppedImg} className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"><Check className="w-5 h-5" />Apply Crop</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CardPreview: React.FC = () => {
  const { currentCard, calculateOverallRating } = useCardCreator();
  const overallRating = calculateOverallRating();
  const rarityStyle = RARITY_STYLES[currentCard.rarity || 'gold'];
  const getFilterStyle = (filter: ImageFilter): string => {
    switch (filter) { case 'bw': return 'grayscale(100%)'; case 'deepfried': return 'contrast(150%) saturate(200%) brightness(110%)'; case 'security': return 'grayscale(80%) contrast(120%) brightness(90%)'; case 'vhs': return 'sepia(30%) contrast(110%) saturate(130%)'; case 'glitch': return 'hue-rotate(90deg) contrast(120%)'; default: return 'none'; }
  };
  return (
    <motion.div className="relative w-[320px] h-[460px]" style={{ perspective: '1000px' }} initial={{ rotateY: -10, scale: 0.9 }} animate={{ rotateY: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 100 }}>
      <div className="absolute inset-0 rounded-2xl blur-xl opacity-60" style={{ background: rarityStyle.gradient, transform: 'scale(1.1)', zIndex: -1 }} />
      <div className="relative w-full h-full rounded-2xl overflow-hidden" style={{ background: rarityStyle.gradient, boxShadow: rarityStyle.glow }}>
        <div className="absolute inset-[3px] rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-4 z-20">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black" style={{ color: rarityStyle.border, textShadow: '0 0 20px ' + rarityStyle.border }}>{overallRating || '??'}</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400">OVR</span>
            </div>
            {currentCard.position && <div className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: rarityStyle.border + '20', color: rarityStyle.border, border: '1px solid ' + rarityStyle.border + '40' }}>{currentCard.position}</div>}
            <div className="flex items-center gap-1">
              {currentCard.rarity === 'legendary' && <Flame className="w-4 h-4 text-orange-500" />}
              {currentCard.rarity === 'holo' && <Sparkles className="w-4 h-4 text-pink-500" />}
              {currentCard.rarity === 'glitch' && <Zap className="w-4 h-4 text-cyan-400" />}
            </div>
          </div>
          <div className="absolute top-14 left-0 right-0 h-48 overflow-hidden">
            {currentCard.image ? <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(' + currentCard.image + ')', filter: getFilterStyle(currentCard.imageFilter || 'normal') }} /> : <div className="w-full h-full flex items-center justify-center bg-slate-800/50"><User className="w-20 h-20 text-slate-600" /></div>}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          </div>
          <div className="absolute top-56 left-0 right-0 text-center px-4 z-20">
            <h2 className="text-2xl font-black uppercase tracking-tight truncate" style={{ color: rarityStyle.border, textShadow: '0 0 10px ' + rarityStyle.border + '50' }}>{currentCard.name || 'PLAYER NAME'}</h2>
            {currentCard.nickname && <p className="text-sm text-slate-400 italic">&ldquo;{currentCard.nickname}&rdquo;</p>}
          </div>
          <div className="absolute top-[280px] left-4 right-4 z-20">
            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
              {(currentCard.statBlock || []).slice(0, 6).map((stat, i) => (
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
          {(currentCard.traits || []).length > 0 && (
            <div className="absolute bottom-16 left-4 right-4 flex gap-2 justify-center flex-wrap z-20">
              {(currentCard.traits || []).slice(0, 4).map((traitId) => { const trait = TRAIT_PRESETS.find((t) => t.id === traitId); if (!trait) return null; return <div key={traitId} className="w-8 h-8 rounded-full bg-slate-700/80 flex items-center justify-center text-lg" title={trait.name}>{trait.icon}</div>; })}
            </div>
          )}
          {currentCard.bio && <div className="absolute bottom-4 left-4 right-4 z-20"><p className="text-[10px] text-slate-400 italic text-center" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', wordWrap: 'break-word' }}>&ldquo;{currentCard.bio}&rdquo;</p></div>}
          {(currentCard.rarity === 'holo' || currentCard.rarity === 'glitch') && <motion.div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)', backgroundSize: '200% 200%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />}
          {currentCard.rarity === 'glitch' && <motion.div className="absolute inset-0 pointer-events-none mix-blend-screen" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)' }} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.1, repeat: Infinity }} />}
        </div>
      </div>
    </motion.div>
  );
};

const StatSlider: React.FC<{ stat: Stat; index: number; onUpdate: (index: number, updates: Partial<Stat>) => void; onRemove: (index: number) => void; availableStats: typeof STAT_PRESETS }> = ({ stat, index, onUpdate, onRemove, availableStats }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const getValueColor = (value: number) => { if (value >= 80) return 'bg-green-500'; if (value >= 60) return 'bg-yellow-500'; if (value >= 40) return 'bg-orange-500'; return 'bg-red-500'; };
  return (
    <div className="group relative bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 hover:border-slate-600 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="relative flex-1">
          <button onClick={() => setIsSelectOpen(!isSelectOpen)} className="flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-white transition-colors"><span className="text-lg">{stat.icon}</span><span>{stat.label}</span><ChevronDown className="w-3 h-3 text-slate-400" /></button>
          <AnimatePresence>
            {isSelectOpen && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 mt-1 w-56 max-h-32 overflow-y-auto bg-slate-900 rounded-lg border border-slate-700 shadow-xl z-50">
                {availableStats.map((preset) => <button key={preset.id} onClick={() => { onUpdate(index, { label: preset.label, icon: preset.icon, category: preset.category }); setIsSelectOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-left"><span>{preset.icon}</span><span>{preset.label}</span><span className="ml-auto text-xs text-slate-500">{preset.category}</span></button>)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-white w-8 text-right" style={{ fontVariantNumeric: 'tabular-nums' }}>{stat.value}</span>
          <button onClick={() => onRemove(index)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"><X className="w-3 h-3 text-red-400" /></button>
        </div>
      </div>
      <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
        <motion.div className={cn('h-full rounded-full', getValueColor(stat.value))} initial={{ width: 0 }} animate={{ width: stat.value + '%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
        <input type="range" min="0" max="99" value={stat.value} onChange={(e) => onUpdate(index, { value: parseInt(e.target.value) })} className="absolute inset-0 w-full opacity-0 cursor-pointer" />
      </div>
    </div>
  );
};

const ModeToggle: React.FC = () => {
  const { mode, setMode } = useCardCreator();
  return (
    <div className="flex items-center justify-center gap-2 p-1 bg-slate-800/50 rounded-full border border-slate-700">
      <button onClick={() => setMode('serious')} className={cn('px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300', mode === 'serious' ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg' : 'text-slate-400 hover:text-white')} style={mode === 'serious' ? { boxShadow: '0 0 20px rgba(245, 158, 11, 0.25)' } : {}}><span className="flex items-center gap-2"><Trophy className="w-4 h-4" />Serious Mode</span></button>
      <button onClick={() => setMode('unserious')} className={cn('px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300', mode === 'unserious' ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-black shadow-lg' : 'text-slate-400 hover:text-white')} style={mode === 'unserious' ? { boxShadow: '0 0 20px rgba(236, 72, 153, 0.25)' } : {}}><span className="flex items-center gap-2"><Zap className="w-4 h-4" />Unserious Mode</span></button>
    </div>
  );
};

const TraitSelector: React.FC = () => {
  const { currentCard, addTrait, removeTrait } = useCardCreator();
  const [isOpen, setIsOpen] = useState(false);
  const selectedTraits = (currentCard.traits || []).map((id) => TRAIT_PRESETS.find((t) => t.id === id)).filter(Boolean);
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-slate-300">Traits & Badges</label>
      <div className="flex flex-wrap gap-2">
        {selectedTraits.map((trait) => trait && <motion.div key={trait.id} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className={cn('flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border', trait.type === 'positive' && 'bg-green-500/10 border-green-500/30 text-green-400', trait.type === 'negative' && 'bg-red-500/10 border-red-500/30 text-red-400', trait.type === 'neutral' && 'bg-slate-500/10 border-slate-500/30 text-slate-400', trait.type === 'chaotic' && 'bg-purple-500/10 border-purple-500/30 text-purple-400')}><span>{trait.icon}</span><span>{trait.name}</span><button onClick={() => removeTrait(trait.id)} className="ml-1 hover:text-white transition-colors"><X className="w-3 h-3" /></button></motion.div>)}
        <button onClick={() => setIsOpen(true)} className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border border-dashed border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-colors"><Plus className="w-3 h-3" />Add Trait</button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950 flex items-center justify-center z-[9999] p-4" onClick={() => setIsOpen(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-lg max-h-[70vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 pb-4 border-b border-slate-700"><h3 className="text-xl font-bold text-white">Select Traits</h3></div><div className="flex-1 overflow-y-auto p-6 pb-2">
              {(['positive', 'negative', 'neutral', 'chaotic'] as const).map((type) => (
                <div key={type} className="mb-4">
                  <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">{type}</h4>
                  <div className="flex flex-wrap gap-2">
                    {TRAIT_PRESETS.filter((t) => t.type === type).map((trait) => { const isSelected = currentCard.traits?.includes(trait.id); return <button key={trait.id} onClick={() => { if (isSelected) { removeTrait(trait.id); } else { addTrait(trait.id); } }} className={cn('flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all', isSelected ? 'bg-white/10 border-white/30 text-white' : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600')}><span>{trait.icon}</span><span>{trait.name}</span></button>; })}
                  </div>
                </div>
              ))}
              </div><div className="p-6 pt-4 border-t border-slate-700"><button onClick={() => setIsOpen(false)} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity">Done</button></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default function CardCreator() {
  const { mode, currentCard, setName, setNickname, setImage, setImageFilter, setRarity, setPosition, setBio, updateStat, addStat, removeStat, resetCard, randomizeQuote, loadPresetStats, finalizeCard } = useCardCreator();
  const { addCard } = useCardCollection();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const availableStats = STAT_PRESETS;
  const positions = [...(POSITION_PRESETS.sports || []), ...(POSITION_PRESETS.office || []), ...(POSITION_PRESETS.party || []), ...(POSITION_PRESETS.roast || [])];
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (file) { const reader = new FileReader(); reader.onload = (event) => { setImageToCrop(event.target?.result as string); setShowCropper(true); }; reader.readAsDataURL(file); } }, []);
  const handleCropComplete = useCallback((croppedImage: string) => { setImage(croppedImage); setShowCropper(false); setImageToCrop(null); }, [setImage]);
  const handleCropCancel = useCallback(() => { setShowCropper(false); setImageToCrop(null); if (fileInputRef.current) { fileInputRef.current.value = ''; } }, []);
  useEffect(() => { if ((currentCard.statBlock || []).length === 0) { loadPresetStats(mode === 'serious' ? 'sports' : 'roast'); } }, [mode, currentCard.statBlock, loadPresetStats]);
  const handleSave = () => { const card = finalizeCard(); addCard(card); setSaveSuccess(true); setTimeout(() => { setSaveSuccess(false); resetCard(); }, 1500); };
  const handleAddStat = () => { const randomPreset = availableStats[Math.floor(Math.random() * availableStats.length)]; addStat({ id: nanoid(), label: randomPreset.label, value: randomPreset.defaultValue || 50, icon: randomPreset.icon, category: randomPreset.category }); };
  const rarityOptions: Rarity[] = mode === 'serious' ? ['bronze', 'silver', 'gold', 'legendary'] : ['silver', 'gold', 'holo', 'glitch', 'legendary'];
  const filterOptions: { value: ImageFilter; label: string }[] = mode === 'serious' ? [{ value: 'normal', label: 'Normal' }, { value: 'bw', label: 'Black & White' }] : [{ value: 'normal', label: 'Normal' }, { value: 'deepfried', label: 'Deep Fried' }, { value: 'security', label: 'Security Cam' }, { value: 'vhs', label: 'VHS' }, { value: 'glitch', label: 'Glitch' }];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="fixed inset-0 overflow-hidden pointer-events-none"><div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-3xl" /><div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full blur-3xl" /></div>
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <motion.h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>Card Creator</motion.h1>
          <p className="text-slate-400 mt-2">Build your ultimate squad card</p>
          <div className="mt-6"><ModeToggle /></div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <motion.div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 isolate" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><User className="w-5 h-5 text-cyan-400" />Basic Info</h3>
              <div className="space-y-4">
                <div><label className="text-sm font-medium text-slate-300 mb-1 block">Name</label><input type="text" value={currentCard.name || ''} onChange={(e) => setName(e.target.value)} placeholder="Enter player name..." className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors" /></div>
                <div><label className="text-sm font-medium text-slate-300 mb-1 block">Nickname (Optional)</label><input type="text" value={currentCard.nickname || ''} onChange={(e) => setNickname(e.target.value)} placeholder="The GOAT, Big Money, etc..." className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors" /></div>
                <div><label className="text-sm font-medium text-slate-300 mb-1 block">Position</label><select value={currentCard.position || ''} onChange={(e) => setPosition(e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"><option value="">Select position...</option>{positions.map((pos) => <option key={pos} value={pos}>{pos}</option>)}</select></div>
              </div>
            </motion.div>
            <motion.div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 isolate" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><ImageIcon className="w-5 h-5 text-cyan-400" />Image</h3>
              <div onClick={() => fileInputRef.current?.click()} className="relative h-32 border-2 border-dashed border-slate-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500 transition-colors group">
                {currentCard.image ? <div className="absolute inset-0 rounded-xl overflow-hidden"><img src={currentCard.image} alt="Preview" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><span className="text-white text-sm">Click to change</span></div></div> : <><Upload className="w-8 h-8 text-slate-500 group-hover:text-cyan-400 transition-colors" /><span className="text-sm text-slate-500 mt-2">Click to upload image</span></>}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>
              {currentCard.image && <button onClick={() => { setImageToCrop(currentCard.image!); setShowCropper(true); }} className="mt-3 w-full py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-300 text-sm font-medium transition-colors flex items-center justify-center gap-2"><CropIcon className="w-4 h-4" />Re-crop Image</button>}
              <div className="mt-4"><label className="text-sm font-medium text-slate-300 mb-2 block">Image Filter</label><div className="flex flex-wrap gap-2">{filterOptions.map((option) => <button key={option.value} onClick={() => setImageFilter(option.value)} className={cn('px-3 py-1.5 rounded-lg text-sm border transition-all', currentCard.imageFilter === option.value ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600')}>{option.label}</button>)}</div></div>
            </motion.div>
            <motion.div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 isolate" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-cyan-400" />Rarity</h3>
              <div className="flex flex-wrap gap-2">{rarityOptions.map((rarity) => <button key={rarity} onClick={() => setRarity(rarity)} className={cn('px-4 py-2 rounded-lg text-sm font-semibold border transition-all capitalize', currentCard.rarity === rarity ? 'text-white' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600')} style={currentCard.rarity === rarity ? { background: RARITY_STYLES[rarity].gradient, borderColor: RARITY_STYLES[rarity].border, boxShadow: RARITY_STYLES[rarity].glow } : {}}>{rarity}</button>)}</div>
            </motion.div>
            <motion.div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 isolate" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-cyan-400" />Stats</h3><div className="flex gap-2"><button onClick={() => loadPresetStats(mode === 'serious' ? 'sports' : 'roast')} className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors" title="Randomize stats"><Shuffle className="w-4 h-4" /></button>{(currentCard.statBlock || []).length < 8 && <button onClick={handleAddStat} className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg text-cyan-400 transition-colors" title="Add stat"><Plus className="w-4 h-4" /></button>}</div></div>
              <div className="space-y-3">{(currentCard.statBlock || []).map((stat, index) => <StatSlider key={stat.id} stat={stat} index={index} onUpdate={updateStat} onRemove={removeStat} availableStats={availableStats} />)}</div>
            </motion.div>
            <motion.div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 isolate" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}><TraitSelector /></motion.div>
            <motion.div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 isolate" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-white">Bio / Quote</h3><button onClick={() => randomizeQuote(mode === 'serious' ? 'serious' : 'funny')} className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-purple-400 text-sm transition-colors"><Dices className="w-4 h-4" />Random</button></div>
              <textarea value={currentCard.bio || ''} onChange={(e) => setBio(e.target.value)} placeholder="Add a bio, quote, or roast..." rows={3} className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none" />
            </motion.div>
            <motion.div className="flex gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <button onClick={resetCard} className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-300 font-semibold transition-colors"><RotateCcw className="w-5 h-5" />Reset</button>
              <button onClick={handleSave} disabled={!currentCard.name} className={cn('flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all', saveSuccess ? 'bg-green-500 text-white' : currentCard.name ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90' : 'bg-slate-700 text-slate-500 cursor-not-allowed')}>{saveSuccess ? <><Star className="w-5 h-5" />Saved!</> : <><Save className="w-5 h-5" />Save Card</>}</button>
            </motion.div>
          </div>
          <div className="lg:sticky lg:top-8">
            <motion.div className="flex flex-col items-center" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <h3 className="text-lg font-bold text-white mb-6">Live Preview</h3>
              <CardPreview />
              <div className="mt-6 flex items-center gap-6 text-sm">
                <div className="text-center"><div className="text-2xl font-bold text-cyan-400">{(currentCard.statBlock || []).length}</div><div className="text-slate-500">Stats</div></div>
                <div className="text-center"><div className="text-2xl font-bold text-purple-400">{(currentCard.traits || []).length}</div><div className="text-slate-500">Traits</div></div>
                <div className="text-center"><div className="text-2xl font-bold text-pink-400">{(currentCard.activeEffects || []).length}</div><div className="text-slate-500">VFX</div></div>
                <div className="text-center"><div className="text-2xl font-bold capitalize" style={{ color: RARITY_STYLES[currentCard.rarity || 'gold'].border }}>{currentCard.rarity || 'Gold'}</div><div className="text-slate-500">Rarity</div></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <AnimatePresence>{showCropper && imageToCrop && <ImageCropper imageSrc={imageToCrop} onCropComplete={handleCropComplete} onCancel={handleCropCancel} />}</AnimatePresence>
    </div>
  );
}
