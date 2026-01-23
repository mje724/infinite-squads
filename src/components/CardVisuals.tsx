'use client';
import React, { useEffect, useState } from 'react';

interface CardVisualsProps {
  activeEffects: string[];
}

const LightningBolt: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 80, y: 10 });
  useEffect(() => {
    const flash = () => {
      setPosition({ x: Math.random() * 60 + 20, y: Math.random() * 30 });
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 150);
    };
    const scheduleFlash = () => {
      const delay = Math.random() * 2000 + 800;
      setTimeout(() => { flash(); scheduleFlash(); }, delay);
    };
    flash();
    scheduleFlash();
  }, []);
  return (
    <>
      {/* Lightning bolt */}
      <svg
        className="absolute w-20 h-28 transition-opacity duration-75"
        style={{ 
          opacity: isVisible ? 1 : 0, 
          filter: 'drop-shadow(0 0 20px rgba(255, 255, 100, 1)) drop-shadow(0 0 40px rgba(255, 255, 0, 0.8))',
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, 0)'
        }}
        viewBox="0 0 24 32"
        fill="none"
      >
        <path d="M13 2L4 18h7l-2 12 11-16h-7l4-12H13z" fill="#fff" stroke="#fef08a" strokeWidth="1" />
      </svg>
      {/* Screen flash */}
      <div 
        className="absolute inset-0 bg-white/30 pointer-events-none transition-opacity duration-75"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      {/* Constant electric crackle at edges */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: 'inset 0 0 30px rgba(255, 255, 0, 0.3), inset 0 0 60px rgba(100, 200, 255, 0.2)',
        animation: 'lightning-flicker 0.2s ease-in-out infinite'
      }} />
    </>
  );
};

const GlitchEffect: React.FC = () => (
  <>
    {/* RGB split layers */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 animate-glitch-r" style={{ 
        background: 'rgba(255, 0, 0, 0.15)',
        mixBlendMode: 'screen',
      }} />
      <div className="absolute inset-0 animate-glitch-c" style={{ 
        background: 'rgba(0, 255, 255, 0.15)',
        mixBlendMode: 'screen',
      }} />
    </div>
    {/* Heavy scanlines */}
    <div className="absolute inset-0 pointer-events-none opacity-50" style={{
      background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0, 0, 0, 0.4) 2px, rgba(0, 0, 0, 0.4) 4px)',
    }} />
    {/* Glitch bars */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute w-full h-4 bg-cyan-400/40 animate-glitch-bar-1" style={{ top: '15%' }} />
      <div className="absolute w-full h-2 bg-red-500/40 animate-glitch-bar-2" style={{ top: '45%' }} />
      <div className="absolute w-full h-6 bg-purple-500/30 animate-glitch-bar-3" style={{ top: '70%' }} />
      <div className="absolute w-3/4 h-3 bg-white/20 animate-glitch-bar-1" style={{ top: '85%', left: '10%' }} />
    </div>
    {/* Noise overlay */}
    <div className="absolute inset-0 pointer-events-none opacity-20 animate-noise" style={{
      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
    }} />
    {/* Chromatic aberration border */}
    <div className="absolute inset-0 pointer-events-none rounded-xl" style={{
      boxShadow: 'inset 3px 0 0 rgba(255, 0, 0, 0.5), inset -3px 0 0 rgba(0, 255, 255, 0.5), inset 0 3px 0 rgba(255, 0, 255, 0.3), inset 0 -3px 0 rgba(0, 255, 0, 0.3)'
    }} />
  </>
);

const FireEffect: React.FC = () => (
  <>
    {/* Intense fire gradient from bottom */}
    <div className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none animate-fire-rise">
      <div className="w-full h-full" style={{
        background: 'linear-gradient(to top, rgba(255, 50, 0, 0.7) 0%, rgba(255, 100, 0, 0.5) 20%, rgba(255, 150, 0, 0.3) 40%, rgba(255, 200, 0, 0.15) 60%, transparent 100%)',
      }} />
    </div>
    {/* Fire glow border */}
    <div className="absolute inset-0 pointer-events-none rounded-xl animate-fire-border" style={{
      boxShadow: 'inset 0 0 40px rgba(255, 100, 0, 0.5), inset 0 -60px 60px rgba(255, 50, 0, 0.4), 0 0 30px rgba(255, 100, 0, 0.3)'
    }} />
    {/* Ember particles - more and bigger */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute w-2 h-2 bg-orange-400 rounded-full animate-ember-1" style={{ left: '15%', bottom: '5%', boxShadow: '0 0 10px rgba(255, 150, 0, 0.8)' }} />
      <div className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-ember-2" style={{ left: '45%', bottom: '0%', boxShadow: '0 0 15px rgba(255, 200, 0, 0.8)' }} />
      <div className="absolute w-2 h-2 bg-red-500 rounded-full animate-ember-3" style={{ left: '75%', bottom: '8%', boxShadow: '0 0 10px rgba(255, 50, 0, 0.8)' }} />
      <div className="absolute w-1.5 h-1.5 bg-orange-300 rounded-full animate-ember-4" style={{ left: '30%', bottom: '3%', boxShadow: '0 0 8px rgba(255, 150, 0, 0.8)' }} />
      <div className="absolute w-2.5 h-2.5 bg-yellow-500 rounded-full animate-ember-1" style={{ left: '60%', bottom: '2%', boxShadow: '0 0 12px rgba(255, 200, 0, 0.8)', animationDelay: '0.5s' }} />
      <div className="absolute w-1 h-1 bg-red-400 rounded-full animate-ember-3" style={{ left: '85%', bottom: '10%', boxShadow: '0 0 6px rgba(255, 100, 0, 0.8)', animationDelay: '0.3s' }} />
      <div className="absolute w-2 h-2 bg-orange-500 rounded-full animate-ember-2" style={{ left: '25%', bottom: '0%', boxShadow: '0 0 10px rgba(255, 100, 0, 0.8)', animationDelay: '0.7s' }} />
    </div>
    {/* Heat distortion wave */}
    <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none animate-heat-wave" style={{
      background: 'linear-gradient(to top, rgba(255, 100, 0, 0.1), transparent)',
    }} />
  </>
);

const FrozenEffect: React.FC = () => (
  <>
    {/* Heavy frost overlay on all corners */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 w-2/3 h-2/3" style={{
        background: 'radial-gradient(ellipse at top left, rgba(180, 220, 255, 0.6) 0%, rgba(150, 200, 255, 0.3) 30%, transparent 60%)',
      }} />
      <div className="absolute top-0 right-0 w-2/3 h-2/3" style={{
        background: 'radial-gradient(ellipse at top right, rgba(180, 220, 255, 0.5) 0%, rgba(150, 200, 255, 0.2) 30%, transparent 60%)',
      }} />
      <div className="absolute bottom-0 left-0 w-2/3 h-2/3" style={{
        background: 'radial-gradient(ellipse at bottom left, rgba(150, 200, 255, 0.5) 0%, rgba(120, 180, 255, 0.2) 30%, transparent 60%)',
      }} />
      <div className="absolute bottom-0 right-0 w-2/3 h-2/3" style={{
        background: 'radial-gradient(ellipse at bottom right, rgba(150, 200, 255, 0.4) 0%, rgba(120, 180, 255, 0.15) 30%, transparent 60%)',
      }} />
    </div>
    {/* Ice crystal shimmer - moving diagonally */}
    <div className="absolute inset-0 pointer-events-none animate-ice-shimmer opacity-60" />
    {/* Frozen border with icicle effect */}
    <div className="absolute inset-0 pointer-events-none rounded-xl" style={{
      boxShadow: 'inset 0 0 50px rgba(150, 200, 255, 0.5), inset 0 0 100px rgba(100, 180, 255, 0.3), 0 0 20px rgba(150, 200, 255, 0.4)',
    }} />
    {/* Ice crystals / snowflakes */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute w-3 h-3 animate-snowflake-1" style={{ left: '10%', top: '20%' }}>❄</div>
      <div className="absolute w-4 h-4 animate-snowflake-2 text-lg" style={{ right: '15%', top: '30%' }}>❄</div>
      <div className="absolute w-2 h-2 animate-snowflake-3 text-sm" style={{ left: '80%', top: '60%' }}>❄</div>
      <div className="absolute w-3 h-3 animate-snowflake-1 text-base" style={{ left: '20%', top: '70%', animationDelay: '1s' }}>❄</div>
    </div>
    {/* Slight blue tint overlay */}
    <div className="absolute inset-0 pointer-events-none bg-blue-400/10 rounded-xl" />
  </>
);

const GodModeEffect: React.FC = () => (
  <>
    {/* Intense golden outer glow */}
    <div className="absolute -inset-2 pointer-events-none animate-god-pulse rounded-2xl" style={{
      boxShadow: '0 0 40px rgba(255, 215, 0, 0.6), 0 0 80px rgba(255, 200, 0, 0.4), 0 0 120px rgba(255, 180, 0, 0.2)',
    }} />
    {/* Inner radiance */}
    <div className="absolute inset-0 pointer-events-none rounded-xl animate-god-inner" style={{
      background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.25) 0%, rgba(255, 200, 0, 0.1) 40%, transparent 70%)',
    }} />
    {/* Golden rays from center */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
      <div className="absolute inset-0 animate-god-rays" style={{
        background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255, 215, 0, 0.15) 10deg, transparent 20deg, transparent 40deg, rgba(255, 215, 0, 0.15) 50deg, transparent 60deg, transparent 80deg, rgba(255, 215, 0, 0.15) 90deg, transparent 100deg, transparent 120deg, rgba(255, 215, 0, 0.15) 130deg, transparent 140deg, transparent 160deg, rgba(255, 215, 0, 0.15) 170deg, transparent 180deg, transparent 200deg, rgba(255, 215, 0, 0.15) 210deg, transparent 220deg, transparent 240deg, rgba(255, 215, 0, 0.15) 250deg, transparent 260deg, transparent 280deg, rgba(255, 215, 0, 0.15) 290deg, transparent 300deg, transparent 320deg, rgba(255, 215, 0, 0.15) 330deg, transparent 340deg, transparent 360deg)',
      }} />
    </div>
    {/* Sparkle particles - more visible */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute w-2 h-2 bg-yellow-200 rounded-full animate-sparkle-1" style={{ top: '8%', left: '15%', boxShadow: '0 0 10px rgba(255, 255, 200, 0.8)' }} />
      <div className="absolute w-3 h-3 bg-white rounded-full animate-sparkle-2" style={{ top: '25%', right: '10%', boxShadow: '0 0 15px rgba(255, 255, 255, 0.9)' }} />
      <div className="absolute w-2 h-2 bg-amber-200 rounded-full animate-sparkle-3" style={{ bottom: '30%', left: '25%', boxShadow: '0 0 10px rgba(255, 220, 100, 0.8)' }} />
      <div className="absolute w-1.5 h-1.5 bg-white rounded-full animate-sparkle-4" style={{ top: '50%', right: '20%', boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)' }} />
      <div className="absolute w-2.5 h-2.5 bg-yellow-100 rounded-full animate-sparkle-1" style={{ bottom: '15%', right: '30%', boxShadow: '0 0 12px rgba(255, 255, 200, 0.9)', animationDelay: '0.5s' }} />
      <div className="absolute w-2 h-2 bg-amber-100 rounded-full animate-sparkle-3" style={{ top: '35%', left: '10%', boxShadow: '0 0 10px rgba(255, 230, 150, 0.8)', animationDelay: '0.3s' }} />
    </div>
    {/* Gold border */}
    <div className="absolute inset-0 pointer-events-none rounded-xl" style={{
      boxShadow: 'inset 0 0 20px rgba(255, 215, 0, 0.4)',
    }} />
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
