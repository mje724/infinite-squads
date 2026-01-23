'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCardCreator } from '@/store/store';
import { TRAIT_PRESETS } from '@/data/presets';
import { cn } from '@/lib/utils';

interface TraitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TraitModal({ isOpen, onClose }: TraitModalProps) {
  const { currentCard, addTrait, removeTrait } = useCardCreator();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950 flex items-center justify-center p-4"
          style={{ zIndex: 99999 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-lg max-h-[70vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 pb-4 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Select Traits</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-6 pb-2">
              {(['positive', 'negative', 'neutral', 'chaotic'] as const).map((type) => (
                <div key={type} className="mb-4">
                  <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">{type}</h4>
                  <div className="flex flex-wrap gap-2">
                    {TRAIT_PRESETS.filter((t) => t.type === type).map((trait) => {
                      const isSelected = currentCard.traits?.includes(trait.id);
                      return (
                        <button
                          key={trait.id}
                          onClick={() => {
                            if (isSelected) {
                              removeTrait(trait.id);
                            } else {
                              addTrait(trait.id);
                            }
                          }}
                          className={cn(
                            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all',
                            isSelected
                              ? 'bg-white/10 border-white/30 text-white'
                              : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600'
                          )}
                        >
                          <span>{trait.icon}</span>
                          <span>{trait.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 pt-4 border-t border-slate-700">
              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
              >
                Done
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
