'use client';
import React, { useEffect, useState } from 'react';

interface CardVisualsProps {
  activeEffects: string[];
}

const LightningBolt: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const flash = () => { setIsVisible(true); setTimeout(() => setIsVisible(false), 100); };
    const scheduleFlash = () => { const delay = Math.random() * 2500 + 500; setTimeout(() => { flash(); scheduleFlash(); }, delay); };
    scheduleFlash();
  }, []);
  return (
    <svg className="absolute top-2 right-2 w-12 h-16 transition-opacity duration-75" style={{ opacity: isVisible ? 1 : 0, filter: 'drop-shadow(0 0 10px rgba(255, 255, 100, 0.8))' }} viewBox="0 0 24 32" fill="none">
      <path d="M13 2L4 18h7l-2 12 11-16h-7l4-12H13z" fill="url(#lightning-gradient)" stroke="#fff" strokeWidth="0.5" />
      <defs><linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fff" /><stop offset="50%" stopColor="#fef08a" /><stop offset="100%" stopColor="#facc15" /></linearGradient></defs>
    </svg>
  );
};

const GlitchEffect: React.FC = () => (
  <>
    <div className="absolute inset-0 bg-red-500/10 mix-blend-multiply animate-glitch-r pointer-events-none" />
    <div className="absolute inset-0 bg-cyan-500/10 mix-blend-multiply animate-glitch-c pointer-events-none" />
    <div className="absolute inset-0 pointer-events-none opacity-30" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px)' }} />
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute w-full h-2 bg-cyan-400/20 animate-glitch-bar-1" style={{ top: '20%' }} />
      <div className="absolute w-full h-1 bg-red-400/20 animate-glitch-bar-2" style={{ top: '60%' }} />
      <div className="absolute w-full h-3 bg-white/10 animate-glitch-bar-3" style={{ top: '80%' }} />
    </div>
  </>
);

const FireEffect: React.FC = () => (
  <>
    <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none animate-fire-rise">
      <div className="w-full h-full" style={{ background: 'linear-gradient(to top, rgba(255, 100, 0, 0.4) 0%, rgba(255, 50, 0, 0.2) 30%, rgba(255, 200, 0, 0.1) 60%, transparent 100%)' }} />
    </div>
    <div className="absolute inset-0 pointer-events-none animate-fire-border rounded-xl" />
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ember-1" style={{ left: '20%', bottom: '10%' }} />
      <div className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ember-2" style={{ left: '50%', bottom: '5%' }} />
      <div className="absolute w-1 h-1 bg-red-400 rounded-full animate-ember-3" style={{ left: '70%', bottom: '15%' }} />
      <div className="absolute w-0.5 h-0.5 bg-orange-300 rounded-full animate-ember-4" style={{ left: '35%', bottom: '8%' }} />
    </div>
  </>
);

const FrozenEffect: React.FC = () => (
  <>
    <div className="absolute top-0 left-0 w-1/2 h-1/2 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top left, rgba(200, 230, 255, 0.4) 0%, rgba(150, 200, 255, 0.1) 30%, transparent 70%)' }} />
    <div className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top right, rgba(200, 230, 255, 0.3) 0%, rgba(150, 200, 255, 0.1) 30%, transparent 70%)' }} />
    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(180, 220, 255, 0.3) 0%, transparent 60%)' }} />
    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom right, rgba(180, 220, 255, 0.25) 0%, transparent 60%)' }} />
    <div className="absolute inset-0 pointer-events-none animate-ice-shimmer opacity-40" />
    <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ boxShadow: 'inset 0 0 30px rgba(150, 200, 255, 0.3), 0 0 15px rgba(150, 200, 255, 0.2)' }} />
  </>
);

const GodModeEffect: React.FC = () => (
  <>
    <div className="absolute -inset-1 pointer-events-none animate-god-pulse rounded-2xl" />
    <div className="absolute inset-0 pointer-events-none rounded-xl animate-god-inner" style={{ background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.15) 0%, transparent 70%)' }} />
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute w-1 h-1 bg-yellow-200 rounded-full animate-sparkle-1" style={{ top: '10%', left: '20%' }} />
      <div className="absolute w-1.5 h-1.5 bg-yellow-100 rounded-full animate-sparkle-2" style={{ top: '30%', right: '15%' }} />
      <div className="absolute w-1 h-1 bg-amber-200 rounded-full animate-sparkle-3" style={{ bottom: '20%', left: '30%' }} />
      <div className="absolute w-0.5 h-0.5 bg-white rounded-full animate-sparkle-4" style={{ top: '50%', right: '25%' }} />
    </div>
  </>
);

export default function CardVisuals({ activeEffects }: CardVisualsProps) {
  if (activeEffects.length === 0) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl z-10">
      {activeEffects.includes('god') && <GodModeEffect />}
      {activeEffects.includes('fire') && <FireEffect />}
      {activeEffects.includes('lightning') && <LightningBolt />}
      {activeEffects.includes('glitch') && <GlitchEffect />}
      {activeEffects.includes('frozen') && <FrozenEffect />}
    </div>
  );
}
