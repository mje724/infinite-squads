'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { Share2, Download, Copy, X, Check, Loader2, User, Flame, Sparkles, Zap } from 'lucide-react';
import { useCardCreator } from '@/store/store';
import { TRAIT_PRESETS } from '@/data/presets';
import { RARITY_STYLES, ImageFilter } from '@/types/schema';

interface ShareButtonProps {
  className?: string;
}

// Static card renderer optimized for html2canvas export
// No transforms, no motion, no blur - just clean, flat rendering
const ExportableCard: React.FC = () => {
  const { currentCard, calculateOverallRating } = useCardCreator();
  const overallRating = calculateOverallRating();
  const rarityStyle = RARITY_STYLES[currentCard.rarity || 'gold'];

  const getFilterStyle = (filter: ImageFilter): string => {
    switch (filter) {
      case 'bw': return 'grayscale(100%)';
      case 'deepfried': return 'contrast(150%) saturate(200%) brightness(110%)';
      case 'security': return 'grayscale(80%) contrast(120%) brightness(90%)';
      case 'vhs': return 'sepia(30%) contrast(110%) saturate(130%)';
      case 'glitch': return 'hue-rotate(90deg) contrast(120%)';
      default: return 'none';
    }
  };

  return (
    <div
      style={{
        width: '320px',
        height: '460px',
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        background: rarityStyle.gradient,
        boxShadow: `0 0 30px ${rarityStyle.border}40`,
      }}
    >
      {/* Inner card container */}
      <div
        style={{
          position: 'absolute',
          inset: '3px',
          borderRadius: '12px',
          background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
          overflow: 'hidden',
        }}
      >
        {/* Top bar with OVR and position */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            zIndex: 20,
          }}
        >
          {/* OVR Rating */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '36px',
                fontWeight: 900,
                color: rarityStyle.border,
                textShadow: `0 0 20px ${rarityStyle.border}`,
                lineHeight: 1,
              }}
            >
              {overallRating || '??'}
            </span>
            <span
              style={{
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#94a3b8',
              }}
            >
              OVR
            </span>
          </div>

          {/* Position badge */}
          {currentCard.position && (
            <div
              style={{
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                background: `${rarityStyle.border}20`,
                color: rarityStyle.border,
                border: `1px solid ${rarityStyle.border}40`,
              }}
            >
              {currentCard.position}
            </div>
          )}

          {/* Rarity icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '40px', justifyContent: 'flex-end' }}>
            {currentCard.rarity === 'legendary' && <Flame style={{ width: '16px', height: '16px', color: '#f97316' }} />}
            {currentCard.rarity === 'holo' && <Sparkles style={{ width: '16px', height: '16px', color: '#ec4899' }} />}
            {currentCard.rarity === 'glitch' && <Zap style={{ width: '16px', height: '16px', color: '#22d3ee' }} />}
          </div>
        </div>

        {/* Player image area */}
        <div
          style={{
            position: 'absolute',
            top: '56px',
            left: 0,
            right: 0,
            height: '192px',
            overflow: 'hidden',
          }}
        >
          {currentCard.image ? (
            <img
              src={currentCard.image}
              alt="Player"
              crossOrigin="anonymous"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                filter: getFilterStyle(currentCard.imageFilter || 'normal'),
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#1e293b80',
              }}
            >
              <User style={{ width: '80px', height: '80px', color: '#475569' }} />
            </div>
          )}
          {/* Gradient fade at bottom of image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, #0f172a 0%, transparent 50%)',
            }}
          />
        </div>

        {/* Player name */}
        <div
          style={{
            position: 'absolute',
            top: '224px',
            left: 0,
            right: 0,
            textAlign: 'center',
            padding: '0 16px',
            zIndex: 20,
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.025em',
              color: rarityStyle.border,
              textShadow: `0 0 10px ${rarityStyle.border}50`,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              margin: 0,
            }}
          >
            {currentCard.name || 'PLAYER NAME'}
          </h2>
          {currentCard.nickname && (
            <p
              style={{
                fontSize: '14px',
                color: '#94a3b8',
                fontStyle: 'italic',
                margin: '4px 0 0 0',
              }}
            >
              "{currentCard.nickname}"
            </p>
          )}
        </div>

        {/* Stats grid */}
        <div
          style={{
            position: 'absolute',
            top: '280px',
            left: '16px',
            right: '16px',
            zIndex: 20,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px 12px',
            }}
          >
            {(currentCard.statBlock || []).slice(0, 6).map((stat, i) => (
              <div
                key={stat.id || i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '4px',
                }}
              >
                <span
                  style={{
                    color: '#94a3b8',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '4px',
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <span style={{ fontSize: '12px', flexShrink: 0 }}>{stat.icon}</span>
                  <span
                    style={{
                      textTransform: 'uppercase',
                      fontSize: '9px',
                      lineHeight: 1.3,
                    }}
                  >
                    {stat.label}
                  </span>
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    flexShrink: 0,
                    color:
                      stat.value >= 80
                        ? '#22c55e'
                        : stat.value >= 60
                        ? '#eab308'
                        : stat.value >= 40
                        ? '#f97316'
                        : '#ef4444',
                  }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Traits */}
        {(currentCard.traits || []).length > 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: '64px',
              left: '16px',
              right: '16px',
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              zIndex: 20,
            }}
          >
            {(currentCard.traits || []).slice(0, 4).map((traitId) => {
              const trait = TRAIT_PRESETS.find((t) => t.id === traitId);
              if (!trait) return null;
              return (
                <div
                  key={traitId}
                  title={trait.name}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#33415580',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                  }}
                >
                  {trait.icon}
                </div>
              );
            })}
          </div>
        )}

        {/* Bio/quote */}
        {currentCard.bio && (
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              zIndex: 20,
            }}
          >
            <p
              style={{
                fontSize: '10px',
                color: '#94a3b8',
                fontStyle: 'italic',
                textAlign: 'center',
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                wordWrap: 'break-word',
              }}
            >
              "{currentCard.bio}"
            </p>
          </div>
        )}

        {/* Holo shimmer overlay (static gradient for export) */}
        {(currentCard.rarity === 'holo' || currentCard.rarity === 'glitch') && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.08) 25%, transparent 50%, rgba(255,255,255,0.08) 75%, transparent 100%)',
            }}
          />
        )}

        {/* Glitch scanlines (static for export) */}
        {currentCard.rarity === 'glitch' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              mixBlendMode: 'screen',
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default function ShareButton({ className = '' }: ShareButtonProps) {
  const { currentCard } = useCardCreator();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const filename = currentCard.name
    ? currentCard.name.toLowerCase().replace(/\s+/g, '-') + '-card'
    : 'card';

  const captureImage = async () => {
    if (!exportRef.current) return null;

    setIsLoading(true);
    try {
      // Wait a frame for the DOM to settle
      await new Promise((r) => setTimeout(r, 100));

      const canvas = await html2canvas(exportRef.current, {
        backgroundColor: '#0f172a',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        // Critical: capture only the exact element dimensions
        width: 320,
        height: 460,
        windowWidth: 320,
        windowHeight: 460,
      });

      const dataUrl = canvas.toDataURL('image/png');
      setImageData(dataUrl);
      setIsLoading(false);
      return dataUrl;
    } catch (error) {
      console.error('Error capturing image:', error);
      setIsLoading(false);
      return null;
    }
  };

  const handleOpen = async () => {
    setIsOpen(true);
    setImageData(null);
    // Small delay to let the modal render with the export card
    setTimeout(() => captureImage(), 150);
  };

  const handleDownload = async () => {
    const data = imageData || (await captureImage());
    if (!data) return;

    const link = document.createElement('a');
    link.download = `${filename}-${Date.now()}.png`;
    link.href = data;
    link.click();
  };

  const handleCopyToClipboard = async () => {
    const data = imageData || (await captureImage());
    if (!data) return;

    try {
      const response = await fetch(data);
      const blob = await response.blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const handleNativeShare = async () => {
    const data = imageData || (await captureImage());
    if (!data) return;

    try {
      const response = await fetch(data);
      const blob = await response.blob();
      const file = new File([blob], `${filename}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Check out my card!',
          text: 'Made with Infinite Squads',
        });
      } else {
        handleDownload();
      }
    } catch (error) {
      console.error('Error sharing:', error);
      handleDownload();
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity ${className}`}
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Share Card</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="p-6">
                {/* Hidden export container - this is what gets captured */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    top: 0,
                  }}
                >
                  <div ref={exportRef}>
                    <ExportableCard />
                  </div>
                </div>

                {/* Preview area */}
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                    <span className="ml-3 text-slate-400">Generating image...</span>
                  </div>
                ) : imageData ? (
                  <div className="mb-6">
                    <img
                      src={imageData}
                      alt="Card Preview"
                      className="w-full rounded-lg border border-slate-700"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleDownload}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white font-medium transition-colors disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={handleCopyToClipboard}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white font-medium transition-colors disabled:opacity-50"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <button
                  onClick={handleNativeShare}
                  disabled={isLoading}
                  className="w-full mt-3 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <Share2 className="w-4 h-4" />
                  Share to...
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
