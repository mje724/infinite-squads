export type GameSound = 'tap' | 'reveal' | 'success' | 'victory' | 'defeat';

const SOUND_KEY = 'is-sound-enabled';
const SOUND_EVENT = 'is:sound-changed';
let sharedContext: AudioContext | null = null;

export function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem(SOUND_KEY) !== '0';
}

export function setSoundEnabled(enabled: boolean) {
  localStorage.setItem(SOUND_KEY, enabled ? '1' : '0');
  window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: enabled }));
  if (enabled) playGameSound('tap');
}

export function onSoundChanged(listener: () => void) {
  window.addEventListener(SOUND_EVENT, listener);
  return () => window.removeEventListener(SOUND_EVENT, listener);
}

export function playGameSound(sound: GameSound) {
  if (!isSoundEnabled() || typeof window === 'undefined') return;
  const AudioContextCtor = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextCtor) return;
  try {
    const context = sharedContext && sharedContext.state !== 'closed' ? sharedContext : new AudioContextCtor();
    sharedContext = context;
    if (context.state === 'suspended') void context.resume();
    const gain = context.createGain();
    gain.connect(context.destination);
    const now = context.currentTime;
    const notes: Record<GameSound, number[]> = {
      tap: [240], reveal: [320, 480, 720], success: [440, 660, 880], victory: [392, 523, 659, 784], defeat: [330, 277, 220],
    };
    const sequence = notes[sound];
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(sound === 'tap' ? 0.025 : 0.06, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + sequence.length * 0.12 + 0.18);
    sequence.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = sound === 'defeat' ? 'sawtooth' : 'sine';
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      oscillator.start(now + index * 0.1);
      oscillator.stop(now + index * 0.1 + 0.16);
    });
  } catch {
    // Audio is optional; blocked autoplay policies should never interrupt play.
  }
}
