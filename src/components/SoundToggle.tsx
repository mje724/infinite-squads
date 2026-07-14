'use client';

import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { isSoundEnabled, onSoundChanged, setSoundEnabled } from '@/lib/gameAudio';

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    const refresh = () => setEnabled(isSoundEnabled());
    refresh();
    return onSoundChanged(refresh);
  }, []);
  return (
    <button onClick={() => setSoundEnabled(!enabled)} aria-label={enabled ? 'Mute game sounds' : 'Enable game sounds'} title={enabled ? 'Mute game sounds' : 'Enable game sounds'} className="hidden rounded-lg border border-slate-700 bg-slate-800/50 p-2 text-slate-400 transition-colors hover:text-white lg:block">
      {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
