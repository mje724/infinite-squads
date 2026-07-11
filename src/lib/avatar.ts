// ============================================
// MEME DOODLE AVATAR SYSTEM
// Hand-drawn-style cartoon caricatures — thick outlines,
// flat colors, goofy expressions, one signature "prop" sticker.
// This is deliberately NOT photorealistic: no real photos, no
// precise likeness — pure original parody/caricature art, safe
// to use for public figures (living or dead) since nothing here
// reproduces an actual photograph or exact likeness.
// ============================================

export type HairStyle =
  | 'bald' | 'wild' | 'afro' | 'slick' | 'bowl' | 'bun' | 'furhat'
  | 'tophat' | 'bicorne' | 'bowler' | 'wig' | 'helmet' | 'bandana'
  | 'spiky' | 'buzzcut' | 'dreads' | 'bow' | 'headscarf' | 'laurel'
  | 'mohawk' | 'wavy' | 'ponytail' | 'blob';

export type FacialHair = 'none' | 'mustache' | 'full' | 'goatee' | 'horseshoe' | 'longbeard' | 'stubble' | 'sideburns';

export type EyeStyle = 'normal' | 'shades' | 'wink' | 'angry' | 'wide' | 'sleepy' | 'smug' | 'intense' | 'dot';

export type MouthStyle = 'smile' | 'grin' | 'smirk' | 'frown' | 'neutral' | 'open' | 'smug';

export interface AvatarTraits {
  bg: string;
  skin: string;
  hair: HairStyle;
  hairColor: string;
  facial: FacialHair;
  eyes: EyeStyle;
  mouth: MouthStyle;
  prop: string; // emoji sticker badge
}

const esc = (s: string) => s.replace(/&/g, '&amp;');

function hairShape(style: HairStyle, color: string): string {
  const c = color;
  switch (style) {
    case 'bald':
      return `<ellipse cx="100" cy="70" rx="30" ry="10" fill="#fff" opacity="0.25"/>`;
    case 'wild':
      return `<path d="M46,90 C30,60 40,20 62,35 C66,10 95,8 100,32 C108,6 138,12 138,38 C158,25 168,58 150,88 C150,60 130,55 122,68 C116,45 90,45 84,66 C72,50 52,58 46,90 Z" fill="${c}" stroke="#111" stroke-width="6" stroke-linejoin="round"/>`;
    case 'afro':
      return `<circle cx="100" cy="72" r="56" fill="${c}" stroke="#111" stroke-width="6"/><ellipse cx="100" cy="100" rx="54" ry="46" fill="${c}"/>`;
    case 'slick':
      return `<path d="M44,95 C40,55 62,28 100,28 C138,28 160,55 156,95 C150,70 130,80 120,64 C130,50 108,40 90,48 C70,56 78,74 60,78 C50,82 48,88 44,95 Z" fill="${c}" stroke="#111" stroke-width="6" stroke-linejoin="round"/>`;
    case 'bowl':
      return `<path d="M42,88 C38,30 66,16 100,16 C134,16 162,30 158,88 C158,68 150,60 100,60 C50,60 42,68 42,88 Z" fill="${c}" stroke="#111" stroke-width="6" stroke-linejoin="round"/>`;
    case 'bun':
      return `<path d="M44,92 C40,50 64,26 100,26 C136,26 160,50 156,92 C150,74 128,64 100,64 C72,64 50,74 44,92 Z" fill="${c}" stroke="#111" stroke-width="6" stroke-linejoin="round"/><circle cx="100" cy="14" r="16" fill="${c}" stroke="#111" stroke-width="6"/>`;
    case 'furhat':
      return `<path d="M38,80 C34,30 60,10 100,10 C140,10 166,30 162,80 C162,86 150,90 150,78 C150,50 130,34 100,34 C70,34 50,50 50,78 C50,90 38,86 38,80 Z" fill="${c}" stroke="#111" stroke-width="6" stroke-linejoin="round"/>`;
    case 'tophat':
      return `<rect x="66" y="0" width="68" height="52" rx="4" fill="${c}" stroke="#111" stroke-width="6"/><rect x="46" y="48" width="108" height="14" rx="4" fill="${c}" stroke="#111" stroke-width="6"/>`;
    case 'bicorne':
      return `<path d="M36,48 C50,18 80,10 100,26 C120,10 150,18 164,48 C168,56 160,64 148,58 C132,50 116,54 100,44 C84,54 68,50 52,58 C40,64 32,56 36,48 Z" fill="${c}" stroke="#111" stroke-width="6" stroke-linejoin="round"/><ellipse cx="100" cy="10" rx="10" ry="6" fill="#c9302c" stroke="#111" stroke-width="3"/>`;
    case 'bowler':
      return `<ellipse cx="100" cy="34" rx="42" ry="28" fill="${c}" stroke="#111" stroke-width="6"/><rect x="48" y="52" width="104" height="12" rx="6" fill="${c}" stroke="#111" stroke-width="6"/>`;
    case 'wig':
      return `<path d="M38,100 C30,50 50,14 100,14 C150,14 170,50 162,100 C158,80 150,90 146,68 C142,90 130,92 124,70 C120,92 108,94 100,72 C92,94 80,92 76,70 C70,92 58,90 54,68 C50,90 42,80 38,100 Z" fill="${c}" stroke="#111" stroke-width="6" stroke-linejoin="round"/><ellipse cx="42" cy="100" rx="10" ry="20" fill="${c}" stroke="#111" stroke-width="5"/><ellipse cx="158" cy="100" rx="10" ry="20" fill="${c}" stroke="#111" stroke-width="5"/>`;
    case 'helmet':
      return `<path d="M42,96 C38,44 64,20 100,20 C136,20 162,44 158,96 C158,60 132,44 100,44 C68,44 42,60 42,96 Z" fill="${c}" stroke="#111" stroke-width="6" stroke-linejoin="round"/><rect x="94" y="0" width="12" height="26" fill="#c0392b" stroke="#111" stroke-width="4"/><path d="M84,4 Q100,-10 116,4" stroke="#c0392b" stroke-width="8" fill="none"/>`;
    case 'bandana':
      return `<path d="M40,84 C36,46 64,24 100,24 C136,24 164,46 160,84 C154,64 130,52 100,52 C70,52 46,64 40,84 Z" fill="${c}" stroke="#111" stroke-width="6" stroke-linejoin="round"/><path d="M156,70 L182,86 L156,92 Z" fill="${c}" stroke="#111" stroke-width="5" stroke-linejoin="round"/>`;
    case 'spiky':
      return `<path d="M46,86 L52,40 L68,66 L78,26 L92,60 L100,20 L108,60 L122,26 L132,66 L148,40 L154,86 Z" fill="${c}" stroke="#111" stroke-width="6" stroke-linejoin="round"/>`;
    case 'buzzcut':
      return `<path d="M44,84 C42,50 66,32 100,32 C134,32 158,50 156,84 C156,72 148,68 100,68 C52,68 44,72 44,84 Z" fill="${c}" stroke="#111" stroke-width="5" stroke-linejoin="round"/>`;
    case 'dreads':
      return `<path d="M44,90 C40,50 64,26 100,26 C136,26 160,50 156,90" fill="none" stroke="#111" stroke-width="0"/>
        ${[62, 78, 100, 122, 138].map((x, i) => `<rect x="${x - 6}" y="${40 + (i % 2) * 6}" width="12" height="${70 - (i % 2) * 10}" rx="6" fill="${c}" stroke="#111" stroke-width="5"/>`).join('')}
        <path d="M44,70 C42,44 66,24 100,24 C134,24 158,44 156,70 C150,50 130,38 100,38 C70,38 50,50 44,70 Z" fill="${c}" stroke="#111" stroke-width="6" stroke-linejoin="round"/>`;
    case 'bow':
      return `<ellipse cx="100" cy="78" rx="52" ry="50" fill="${c}" stroke="#111" stroke-width="6"/><path d="M100,10 L70,-14 L74,20 Z" fill="#ff4d94" stroke="#111" stroke-width="5" stroke-linejoin="round"/><path d="M100,10 L130,-14 L126,20 Z" fill="#ff4d94" stroke="#111" stroke-width="5" stroke-linejoin="round"/><circle cx="100" cy="8" r="9" fill="#ff4d94" stroke="#111" stroke-width="5"/>`;
    case 'headscarf':
      return `<path d="M38,92 C34,42 64,18 100,18 C136,18 166,42 162,92 C158,60 134,44 100,44 C66,44 42,60 38,92 Z" fill="${c}" stroke="#111" stroke-width="6" stroke-linejoin="round"/><path d="M148,60 L176,74 L150,84 Z" fill="${c}" stroke="#111" stroke-width="5" stroke-linejoin="round"/>`;
    case 'laurel':
      return `<path d="M40,70 Q30,50 44,34 Q40,50 52,58" fill="none" stroke="#2e7d32" stroke-width="8" stroke-linecap="round"/><path d="M160,70 Q170,50 156,34 Q160,50 148,58" fill="none" stroke="#2e7d32" stroke-width="8" stroke-linecap="round"/>`;
    case 'mohawk':
      return `<path d="M88,70 L92,10 L108,10 L112,70 Z" fill="${c}" stroke="#111" stroke-width="6" stroke-linejoin="round"/>`;
    case 'wavy':
      return `<path d="M40,110 C34,60 60,22 100,22 C140,22 166,60 160,110 C156,84 152,96 146,74 C144,100 134,104 130,78 C126,100 116,104 112,80 C110,98 90,98 88,80 C84,104 74,100 70,78 C66,104 56,100 54,74 C48,96 44,84 40,110 Z" fill="${c}" stroke="#111" stroke-width="6" stroke-linejoin="round"/>`;
    case 'ponytail':
      return `<path d="M44,92 C40,50 64,26 100,26 C136,26 160,50 156,92 C150,72 128,62 100,62 C72,62 50,72 44,92 Z" fill="${c}" stroke="#111" stroke-width="6" stroke-linejoin="round"/><path d="M156,58 C176,66 180,96 164,110 C170,88 162,70 150,64 Z" fill="${c}" stroke="#111" stroke-width="5" stroke-linejoin="round"/>`;
    case 'blob':
      return '';
    default:
      return '';
  }
}

function facialHairShape(style: FacialHair, color: string): string {
  const c = color;
  switch (style) {
    case 'none':
      return '';
    case 'mustache':
      return `<path d="M72,148 Q86,138 100,146 Q114,138 128,148 Q114,156 100,150 Q86,156 72,148 Z" fill="${c}" stroke="#111" stroke-width="4" stroke-linejoin="round"/>`;
    case 'full':
      return `<path d="M56,140 C54,172 74,196 100,196 C126,196 146,172 144,140 C140,166 122,178 100,178 C78,178 60,166 56,140 Z" fill="${c}" stroke="#111" stroke-width="5" stroke-linejoin="round"/>`;
    case 'goatee':
      return `<path d="M84,158 C84,182 92,194 100,194 C108,194 116,182 116,158 C110,172 90,172 84,158 Z" fill="${c}" stroke="#111" stroke-width="5" stroke-linejoin="round"/>`;
    case 'horseshoe':
      return `<path d="M68,146 C66,178 78,192 82,168 M132,146 C134,178 122,192 118,168" stroke="${c}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M70,148 Q100,158 130,148" stroke="${c}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
    case 'longbeard':
      return `<path d="M54,140 C48,190 70,220 100,222 C130,220 152,190 146,140 C140,180 118,196 100,196 C82,196 60,180 54,140 Z" fill="${c}" stroke="#111" stroke-width="5" stroke-linejoin="round"/>`;
    case 'stubble':
      return `<ellipse cx="100" cy="165" rx="42" ry="26" fill="${c}" opacity="0.35"/>`;
    case 'sideburns':
      return `<rect x="42" y="95" width="10" height="40" rx="4" fill="${c}" stroke="#111" stroke-width="3"/><rect x="148" y="95" width="10" height="40" rx="4" fill="${c}" stroke="#111" stroke-width="3"/>`;
    default:
      return '';
  }
}

function eyesShape(style: EyeStyle): string {
  switch (style) {
    case 'normal':
      return `<circle cx="78" cy="108" r="7" fill="#111"/><circle cx="122" cy="108" r="7" fill="#111"/>`;
    case 'dot':
      return `<circle cx="78" cy="108" r="4" fill="#111"/><circle cx="122" cy="108" r="4" fill="#111"/>`;
    case 'shades':
      return `<rect x="60" y="96" width="80" height="24" rx="10" fill="#111"/><rect x="64" y="100" width="30" height="10" rx="4" fill="#5dd5ff" opacity="0.7"/><rect x="106" y="100" width="30" height="10" rx="4" fill="#5dd5ff" opacity="0.7"/><rect x="94" y="102" width="12" height="6" fill="#111"/>`;
    case 'wink':
      return `<circle cx="78" cy="108" r="7" fill="#111"/><path d="M114,108 Q122,100 130,108" stroke="#111" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    case 'angry':
      return `<circle cx="78" cy="110" r="7" fill="#111"/><circle cx="122" cy="110" r="7" fill="#111"/><path d="M66,96 L88,102" stroke="#111" stroke-width="6" stroke-linecap="round"/><path d="M134,96 L112,102" stroke="#111" stroke-width="6" stroke-linecap="round"/>`;
    case 'wide':
      return `<circle cx="78" cy="108" r="12" fill="#fff" stroke="#111" stroke-width="4"/><circle cx="122" cy="108" r="12" fill="#fff" stroke="#111" stroke-width="4"/><circle cx="78" cy="108" r="4" fill="#111"/><circle cx="122" cy="108" r="4" fill="#111"/>`;
    case 'sleepy':
      return `<path d="M68,108 L88,108" stroke="#111" stroke-width="5" stroke-linecap="round"/><path d="M112,108 L132,108" stroke="#111" stroke-width="5" stroke-linecap="round"/>`;
    case 'smug':
      return `<path d="M68,110 Q78,104 88,110" stroke="#111" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="122" cy="108" r="7" fill="#111"/><path d="M112,96 L134,92" stroke="#111" stroke-width="5" stroke-linecap="round"/>`;
    case 'intense':
      return `<circle cx="78" cy="110" r="9" fill="#fff" stroke="#111" stroke-width="4"/><circle cx="122" cy="110" r="9" fill="#fff" stroke="#111" stroke-width="4"/><circle cx="78" cy="110" r="5" fill="#111"/><circle cx="122" cy="110" r="5" fill="#111"/><path d="M62,92 L92,100" stroke="#111" stroke-width="6" stroke-linecap="round"/><path d="M138,92 L108,100" stroke="#111" stroke-width="6" stroke-linecap="round"/>`;
    default:
      return '';
  }
}

function mouthShape(style: MouthStyle): string {
  switch (style) {
    case 'smile':
      return `<path d="M74,140 Q100,162 126,140" stroke="#111" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    case 'grin':
      return `<path d="M70,138 Q100,166 130,138 Q100,150 70,138 Z" fill="#fff" stroke="#111" stroke-width="5" stroke-linejoin="round"/>`;
    case 'smirk':
      return `<path d="M76,144 Q104,156 128,138" stroke="#111" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    case 'frown':
      return `<path d="M76,152 Q100,134 124,152" stroke="#111" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    case 'neutral':
      return `<path d="M78,144 L122,144" stroke="#111" stroke-width="6" stroke-linecap="round"/>`;
    case 'open':
      return `<ellipse cx="100" cy="146" rx="18" ry="14" fill="#7a2020" stroke="#111" stroke-width="5"/>`;
    case 'smug':
      return `<path d="M78,142 Q98,150 116,138" stroke="#111" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    default:
      return '';
  }
}

// Deterministic small rotation so each card feels hand-placed, not machine-perfect
function jitter(name: string, spread = 6): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return ((h % 1000) / 1000 - 0.5) * spread * 2;
}

export function buildDoodleAvatarSVG(name: string, traits: AvatarTraits): string {
  const rot = jitter(name);
  const isBlob = traits.hair === 'blob';
  const headFill = isBlob ? traits.skin : traits.skin;

  const head = isBlob
    ? `<ellipse cx="100" cy="118" rx="66" ry="70" fill="${headFill}" stroke="#111" stroke-width="7"/>`
    : `<ellipse cx="76" cy="118" rx="9" ry="14" fill="${headFill}" stroke="#111" stroke-width="5"/>
       <ellipse cx="124" cy="118" rx="9" ry="14" fill="${headFill}" stroke="#111" stroke-width="5"/>
       <ellipse cx="100" cy="115" rx="56" ry="60" fill="${headFill}" stroke="#111" stroke-width="6"/>`;

  const face = isBlob ? '' : `${eyesShape(traits.eyes)}${mouthShape(traits.mouth)}${facialHairShape(traits.facial, '#2b2b2b')}`;
  const blobFace = isBlob ? `${eyesShape(traits.eyes)}${mouthShape(traits.mouth)}` : '';
  const hair = isBlob ? '' : hairShape(traits.hair, traits.hairColor);

  return `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="220" fill="${traits.bg}"/>
    <g transform="rotate(${rot.toFixed(1)} 100 115)">
      ${head}
      ${hair}
      ${face}
      ${blobFace}
    </g>
    <circle cx="168" cy="34" r="22" fill="#fff" stroke="#111" stroke-width="4"/>
    <text x="168" y="43" font-size="24" text-anchor="middle">${esc(traits.prop)}</text>
  </svg>`;
}

export function svgToDataUri(svg: string): string {
  const encoded = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22');
  return `data:image/svg+xml,${encoded}`;
}

// ============================================
// PER-CHARACTER TRAITS (all 86 preset cards, post-parody-rename)
// Picked from widely-known, iconic visual signatures — never a
// real photo, just a couple of recognizable cartoon cues + a prop.
// ============================================
export const AVATAR_TRAITS: Record<string, AvatarTraits> = {
  'Florida Man': { bg: '#f4a13a', skin: '#e0a878', hair: 'wild', hairColor: '#5c3a1e', facial: 'stubble', eyes: 'wide', mouth: 'open', prop: '🐊' },
  'Harambe': { bg: '#2f3b2a', skin: '#3b2a20', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'sleepy', mouth: 'neutral', prop: '🦍' },
  'Killdozer': { bg: '#f2c14e', skin: '#d99a5b', hair: 'buzzcut', hairColor: '#333', facial: 'stubble', eyes: 'angry', mouth: 'frown', prop: '🚜' },
  'Boeing Door Plug': { bg: '#8fb8d6', skin: '#c9d6de', hair: 'bald', hairColor: '#000', facial: 'none', eyes: 'wide', mouth: 'open', prop: '✈️' },
  'Nikola Tesla': { bg: '#1f2a44', skin: '#e6c39a', hair: 'slick', hairColor: '#1a1a1a', facial: 'mustache', eyes: 'intense', mouth: 'neutral', prop: '⚡' },
  'Diogenes': { bg: '#8a7458', skin: '#c98f5e', hair: 'bald', hairColor: '#555', facial: 'longbeard', eyes: 'smug', mouth: 'smirk', prop: '🛢️' },
  'Rasputin': { bg: '#2b1f2e', skin: '#d8b48a', hair: 'wild', hairColor: '#3d2a1a', facial: 'longbeard', eyes: 'intense', mouth: 'neutral', prop: '🧔' },
  'Hunter S. Thompson': { bg: '#c94f4f', skin: '#e0b183', hair: 'bald', hairColor: '#000', facial: 'stubble', eyes: 'shades', mouth: 'smirk', prop: '🚬' },
  'Yusuf Dilek': { bg: '#3a3a3a', skin: '#dcb894', hair: 'slick', hairColor: '#222', facial: 'stubble', eyes: 'shades', mouth: 'neutral', prop: '🎯' },
  'Genghis Khan': { bg: '#5a3a2a', skin: '#c9955f', hair: 'furhat', hairColor: '#3b2a1a', facial: 'horseshoe', eyes: 'intense', mouth: 'neutral', prop: '⚔️' },
  'Cleopatra': { bg: '#c9a227', skin: '#c9895a', hair: 'bowl', hairColor: '#0a0a0a', facial: 'none', eyes: 'smug', mouth: 'smirk', prop: '🐍' },
  'Frederick Douglass': { bg: '#264653', skin: '#8a5a35', hair: 'wild', hairColor: '#d8d8d8', facial: 'full', eyes: 'intense', mouth: 'neutral', prop: '📚' },
  'Sun Tzu': { bg: '#1c3d3d', skin: '#d8b48a', hair: 'bald', hairColor: '#111', facial: 'longbeard', eyes: 'smug', mouth: 'smirk', prop: '📜' },
  'Bruce Lee': { bg: '#c0392b', skin: '#d9a066', hair: 'bowl', hairColor: '#0a0a0a', facial: 'none', eyes: 'intense', mouth: 'smirk', prop: '👊' },
  'Julius Caesar': { bg: '#7b2d26', skin: '#d9a066', hair: 'laurel', hairColor: '#2e7d32', facial: 'none', eyes: 'smug', mouth: 'smirk', prop: '🗡️' },
  'Mr. Rogers': { bg: '#f6d55c', skin: '#e6bd93', hair: 'slick', hairColor: '#8a8a8a', facial: 'none', eyes: 'normal', mouth: 'smile', prop: '🧶' },
  'Bob Ross': { bg: '#3d5a3d', skin: '#e0b28a', hair: 'afro', hairColor: '#3b2a1a', facial: 'stubble', eyes: 'normal', mouth: 'smile', prop: '🖌️' },
  'Steve Irwin': { bg: '#5b8a3a', skin: '#d99a5b', hair: 'spiky', hairColor: '#8a5a2a', facial: 'none', eyes: 'wide', mouth: 'grin', prop: '🐊' },
  'Freddie Mercury': { bg: '#8e2fc9', skin: '#c9905f', hair: 'slick', hairColor: '#1a1a1a', facial: 'mustache', eyes: 'normal', mouth: 'grin', prop: '🎤' },
  'Teddy Roosevelt': { bg: '#3a5a40', skin: '#dba875', hair: 'bald', hairColor: '#555', facial: 'horseshoe', eyes: 'wide', mouth: 'grin', prop: '🥊' },
  'Marie Curie': { bg: '#7fdb8e', skin: '#e2bd93', hair: 'bun', hairColor: '#2a2a2a', facial: 'none', eyes: 'normal', mouth: 'neutral', prop: '☢️' },
  'Harriet Tubman': { bg: '#4a3728', skin: '#7a4a2a', hair: 'headscarf', hairColor: '#3a2a5a', facial: 'none', eyes: 'intense', mouth: 'neutral', prop: '🧭' },
  'Muhammad Ali': { bg: '#c9302c', skin: '#7a4a2a', hair: 'buzzcut', hairColor: '#0a0a0a', facial: 'none', eyes: 'smug', mouth: 'grin', prop: '🥊' },
  'Kianu Reaves': { bg: '#2c2c3a', skin: '#d9a878', hair: 'wavy', hairColor: '#1a1a1a', facial: 'stubble', eyes: 'sleepy', mouth: 'smile', prop: '🕶️' },
  'Donny DeVeeto': { bg: '#8a6a2a', skin: '#d9a06a', hair: 'bald', hairColor: '#555', facial: 'stubble', eyes: 'wide', mouth: 'grin', prop: '🥚' },
  'Nicolaus Kage': { bg: '#4a4a2a', skin: '#d9a06a', hair: 'wild', hairColor: '#3a2a1a', facial: 'stubble', eyes: 'intense', mouth: 'open', prop: '🐝' },
  'Snoop Doggo': { bg: '#2e7d32', skin: '#7a4a2a', hair: 'braids' as HairStyle, hairColor: '#0a0a0a', facial: 'goatee', eyes: 'sleepy', mouth: 'smirk', prop: '🌿' },
  'Gordo Ramzey': { bg: '#c94040', skin: '#e0a878', hair: 'spiky', hairColor: '#8a8a8a', facial: 'stubble', eyes: 'angry', mouth: 'open', prop: '🔪' },
  'Shaqster': { bg: '#5a2d8a', skin: '#7a4a2a', hair: 'bald', hairColor: '#000', facial: 'goatee', eyes: 'smug', mouth: 'grin', prop: '🏀' },
  'Marfa Stewhart': { bg: '#a3c9a8', skin: '#e6c39a', hair: 'bowl', hairColor: '#d9c98a', facial: 'none', eyes: 'smug', mouth: 'smirk', prop: '✂️' },
  'Iron Mike Tyzen': { bg: '#232323', skin: '#5a3a20', hair: 'buzzcut', hairColor: '#000', facial: 'none', eyes: 'intense', mouth: 'neutral', prop: '👂' },
  'Odd Al': { bg: '#f4d35e', skin: '#e0b28a', hair: 'afro', hairColor: '#3a2a1a', facial: 'mustache', eyes: 'wide', mouth: 'grin', prop: '🪗' },
  'Guy Fierro': { bg: '#e8590c', skin: '#d9a06a', hair: 'spiky', hairColor: '#d9c98a', facial: 'goatee', eyes: 'shades', mouth: 'grin', prop: '🔥' },
  'Bad Luck Brian': { bg: '#8a5a3a', skin: '#e6bd93', hair: 'bowl', hairColor: '#8a5a2a', facial: 'none', eyes: 'wide', mouth: 'grin', prop: '🍀' },
  'Grimace': { bg: '#4a1a5a', skin: '#8a2be2', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'dot', mouth: 'smile', prop: '🥤' },
  'Elan Muskrat': { bg: '#1a1a2e', skin: '#d9a878', hair: 'buzzcut', hairColor: '#3a2a1a', facial: 'stubble', eyes: 'smug', mouth: 'smirk', prop: '🐦' },
  'Mark Zuckerbot': { bg: '#3b5998', skin: '#e0b28a', hair: 'bowl', hairColor: '#4a3a2a', facial: 'none', eyes: 'wide', mouth: 'neutral', prop: '🤖' },
  'Geoff Bezel': { bg: '#1a2a3a', skin: '#d9a878', hair: 'bald', hairColor: '#000', facial: 'stubble', eyes: 'smug', mouth: 'grin', prop: '💰' },
  'The Pebble': { bg: '#3a3a3a', skin: '#8a5a2a', hair: 'bald', hairColor: '#000', facial: 'none', eyes: 'smug', mouth: 'grin', prop: '🤨' },
  'Joey Rogaine': { bg: '#3a4a2a', skin: '#d9a878', hair: 'buzzcut', hairColor: '#3a2a1a', facial: 'stubble', eyes: 'wide', mouth: 'open', prop: '🎙️' },
  'DJ Khaleb': { bg: '#c9a227', skin: '#7a4a2a', hair: 'bandana', hairColor: '#c9302c', facial: 'full', eyes: 'shades', mouth: 'grin', prop: '🔑' },
  'Tommy Weisau': { bg: '#2a2a3a', skin: '#c9905f', hair: 'wavy', hairColor: '#0a0a0a', facial: 'stubble', eyes: 'shades', mouth: 'smirk', prop: '🎬' },
  'Gary Buseye': { bg: '#8a3a2a', skin: '#d9a06a', hair: 'wild', hairColor: '#8a8a6a', facial: 'stubble', eyes: 'wide', mouth: 'grin', prop: '🏍️' },
  'Charlee Sheenz': { bg: '#2a2a2a', skin: '#d9a878', hair: 'slick', hairColor: '#3a2a1a', facial: 'stubble', eyes: 'smug', mouth: 'smirk', prop: '🐯' },
  'Flavor Flame': { bg: '#e8b923', skin: '#5a3a20', hair: 'bandana', hairColor: '#1a1a1a', facial: 'goatee', eyes: 'wide', mouth: 'grin', prop: '⏰' },
  'Bulk Hogman': { bg: '#e8d923', skin: '#e0a06a', hair: 'bandana', hairColor: '#c9302c', facial: 'horseshoe', eyes: 'angry', mouth: 'grin', prop: '💪' },
  'Ozzy Ozzborne': { bg: '#4a2a5a', skin: '#d9a878', hair: 'wavy', hairColor: '#1a1a1a', facial: 'none', eyes: 'wide', mouth: 'open', prop: '🦇' },
  'Arnold Schwarzenlifter': { bg: '#2a4a8a', skin: '#d9a06a', hair: 'slick', hairColor: '#0a0a0a', facial: 'none', eyes: 'smug', mouth: 'grin', prop: '💪' },
  'Toast Malone': { bg: '#5a2a2a', skin: '#e0b28a', hair: 'braids' as HairStyle, hairColor: '#3a2a1a', facial: 'stubble', eyes: 'sleepy', mouth: 'neutral', prop: '🍺' },
  'Isle Boys': { bg: '#0a8a8a', skin: '#7a4a2a', hair: 'wavy', hairColor: '#0a0a0a', facial: 'none', eyes: 'wide', mouth: 'grin', prop: '🌴' },
  'Scumbag Steve': { bg: '#5a5a2a', skin: '#e0b28a', hair: 'bandana', hairColor: '#c9302c', facial: 'stubble', eyes: 'smug', mouth: 'smirk', prop: '🧢' },
  'Lizzy Holmz': { bg: '#1a1a1a', skin: '#e6c39a', hair: 'bowl', hairColor: '#d9c98a', facial: 'none', eyes: 'intense', mouth: 'neutral', prop: '🐢' },
  'George Santoro': { bg: '#8a2a8a', skin: '#e0b28a', hair: 'slick', hairColor: '#1a1a1a', facial: 'none', eyes: 'wide', mouth: 'grin', prop: '🎭' },
  'Sam Bankster-Fried': { bg: '#4a4a8a', skin: '#e6c39a', hair: 'wild', hairColor: '#8a6a3a', facial: 'none', eyes: 'wide', mouth: 'neutral', prop: '🎮' },
  'Billy FyreFarland': { bg: '#2a8a8a', skin: '#e0b28a', hair: 'slick', hairColor: '#3a2a1a', facial: 'none', eyes: 'smug', mouth: 'grin', prop: '🏝️' },
  'Kidney King': { bg: '#8a2a2a', skin: '#c9895a', hair: 'wild', hairColor: '#3a2a1a', facial: 'full', eyes: 'intense', mouth: 'grin', prop: '🥩' },
  'Antonio Braun': { bg: '#2a2a5a', skin: '#7a4a2a', hair: 'buzzcut', hairColor: '#000', facial: 'stubble', eyes: 'intense', mouth: 'open', prop: '📱' },
  'Rachael Dolezall': { bg: '#8a5a2a', skin: '#c9895a', hair: 'braids' as HairStyle, hairColor: '#3a2a1a', facial: 'none', eyes: 'smug', mouth: 'smirk', prop: '🧬' },
  '7ix8ine': { bg: '#1a1a1a', skin: '#e0b28a', hair: 'mohawk', hairColor: '#ff2ec4', facial: 'none', eyes: 'wide', mouth: 'grin', prop: '🌈' },
  'Atom Levine': { bg: '#2a2a2a', skin: '#d9a06a', hair: 'slick', hairColor: '#1a1a1a', facial: 'stubble', eyes: 'smug', mouth: 'smirk', prop: '📱' },
  'Coco Siwa': { bg: '#ff8fc4', skin: '#e6c39a', hair: 'bow', hairColor: '#0a0a0a', facial: 'none', eyes: 'wide', mouth: 'grin', prop: '🎀' },
  'Wil Smyth': { bg: '#2a4a8a', skin: '#5a3a20', hair: 'buzzcut', hairColor: '#000', facial: 'none', eyes: 'wide', mouth: 'grin', prop: '👋' },
  'Logang Paulson': { bg: '#3a8a3a', skin: '#e6bd93', hair: 'spiky', hairColor: '#d9c98a', facial: 'none', eyes: 'wide', mouth: 'open', prop: '🌲' },
  'Pepper Bae': { bg: '#8a1a1a', skin: '#c9895a', hair: 'bun', hairColor: '#0a0a0a', facial: 'stubble', eyes: 'shades', mouth: 'smirk', prop: '🧂' },
  'Hilarya Baldwing': { bg: '#8adbc9', skin: '#e6c39a', hair: 'bun', hairColor: '#2a1a0a', facial: 'none', eyes: 'normal', mouth: 'smile', prop: '🧘' },
  'Ben Shapirno': { bg: '#2a2a5a', skin: '#e0b28a', hair: 'buzzcut', hairColor: '#0a0a0a', facial: 'none', eyes: 'intense', mouth: 'neutral', prop: '⏩' },
  'Travesty Scott': { bg: '#2a1a1a', skin: '#5a3a20', hair: 'dreads', hairColor: '#0a0a0a', facial: 'stubble', eyes: 'sleepy', mouth: 'smirk', prop: '🔥' },
  'Raegun': { bg: '#2a8a4a', skin: '#e6bd93', hair: 'bandana', hairColor: '#c9a227', facial: 'none', eyes: 'wide', mouth: 'open', prop: '🦘' },
  'Napoleon Bonaparte': { bg: '#1a2a5a', skin: '#e0b28a', hair: 'bicorne', hairColor: '#0a0a0a', facial: 'none', eyes: 'smug', mouth: 'neutral', prop: '⚔️' },
  'Alexander the Great': { bg: '#8a6a1a', skin: '#d9a06a', hair: 'helmet', hairColor: '#8a8a8a', facial: 'none', eyes: 'intense', mouth: 'smirk', prop: '⚔️' },
  'Albert Einstein': { bg: '#2a3a5a', skin: '#e0b28a', hair: 'wild', hairColor: '#d9d9d9', facial: 'mustache', eyes: 'wide', mouth: 'smile', prop: '🧠' },
  'Elvis Presley': { bg: '#4a1a5a', skin: '#e0b28a', hair: 'slick', hairColor: '#0a0a0a', facial: 'sideburns', eyes: 'shades', mouth: 'smirk', prop: '🎤' },
  'Leonardo da Vinci': { bg: '#5a4a2a', skin: '#d9a06a', hair: 'wavy', hairColor: '#c9c9c9', facial: 'longbeard', eyes: 'normal', mouth: 'smirk', prop: '🎨' },
  'Winston Churchill': { bg: '#2a2a2a', skin: '#e6c39a', hair: 'bowler', hairColor: '#111', facial: 'none', eyes: 'angry', mouth: 'smirk', prop: '🚬' },
  'Ludwig van Beethoven': { bg: '#3a2a1a', skin: '#e0b28a', hair: 'wild', hairColor: '#c9c9c9', facial: 'none', eyes: 'angry', mouth: 'frown', prop: '🎼' },
  'Wolfgang Amadeus Mozart': { bg: '#8a1a3a', skin: '#e6c39a', hair: 'wig', hairColor: '#f0f0f0', facial: 'none', eyes: 'normal', mouth: 'smile', prop: '🎻' },
  'Abraham Lincoln': { bg: '#1a1a1a', skin: '#d9a878', hair: 'tophat', hairColor: '#0a0a0a', facial: 'horseshoe', eyes: 'normal', mouth: 'neutral', prop: '🎩' },
  'Attila the Hun': { bg: '#5a1a1a', skin: '#c9895a', hair: 'furhat', hairColor: '#3a2a1a', facial: 'longbeard', eyes: 'angry', mouth: 'frown', prop: '⚔️' },
  'David Bowie': { bg: '#e83e8c', skin: '#e6c39a', hair: 'spiky', hairColor: '#e8590c', facial: 'none', eyes: 'wide', mouth: 'smirk', prop: '⚡' },
  'Prince': { bg: '#6a1a8a', skin: '#7a4a2a', hair: 'wavy', hairColor: '#0a0a0a', facial: 'mustache', eyes: 'smug', mouth: 'smirk', prop: '🎸' },
  'Harry Houdini': { bg: '#1a1a2a', skin: '#d9a06a', hair: 'slick', hairColor: '#0a0a0a', facial: 'none', eyes: 'intense', mouth: 'smirk', prop: '🔓' },
  'Confucius': { bg: '#8a6a2a', skin: '#e0b28a', hair: 'bald', hairColor: '#555', facial: 'longbeard', eyes: 'sleepy', mouth: 'smile', prop: '📚' },
  'Socrates': { bg: '#5a5a8a', skin: '#d9a06a', hair: 'bald', hairColor: '#555', facial: 'full', eyes: 'normal', mouth: 'smirk', prop: '❓' },
  'Benjamin Franklin': { bg: '#2a5a3a', skin: '#e6c39a', hair: 'bald', hairColor: '#c9c9c9', facial: 'none', eyes: 'normal', mouth: 'smile', prop: '💡' },
  'P.T. Barnum': { bg: '#c9302c', skin: '#e6c39a', hair: 'tophat', hairColor: '#111', facial: 'mustache', eyes: 'wide', mouth: 'grin', prop: '🎪' },
  'Andy Warhol': { bg: '#e8e8e8', skin: '#e6c39a', hair: 'wig', hairColor: '#c9c9c9', facial: 'none', eyes: 'wide', mouth: 'neutral', prop: '🥫' },

  // ── Expansion A: internet & memes ──
  'Grouchy Kat': { bg: '#5a4a6a', skin: '#c9b8a8', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'angry', mouth: 'frown', prop: '😾' },
  'Rickrolla': { bg: '#c94f4f', skin: '#e6bd93', hair: 'wavy', hairColor: '#c9622a', facial: 'none', eyes: 'wink', mouth: 'grin', prop: '🎤' },
  'The Gigachud': { bg: '#3a3a3a', skin: '#a8a8a8', hair: 'buzzcut', hairColor: '#1a1a1a', facial: 'stubble', eyes: 'intense', mouth: 'smug', prop: '🗿' },
  'Mister Feast': { bg: '#2a8ad4', skin: '#e6bd93', hair: 'wavy', hairColor: '#5a3a1e', facial: 'stubble', eyes: 'wide', mouth: 'open', prop: '💸' },
  'PewDeeGuy': { bg: '#c93a3a', skin: '#e6c39a', hair: 'slick', hairColor: '#d9c98a', facial: 'stubble', eyes: 'sleepy', mouth: 'smirk', prop: '👊' },
  'Reply Guy': { bg: '#4a5a6a', skin: '#e0b28a', hair: 'bald', hairColor: '#333', facial: 'stubble', eyes: 'wide', mouth: 'open', prop: '☝️' },
  'Doomscroller': { bg: '#1a1a2e', skin: '#c9c0b8', hair: 'wild', hairColor: '#3a3a3a', facial: 'none', eyes: 'sleepy', mouth: 'neutral', prop: '📱' },
  'The Lurker': { bg: '#2a2a3a', skin: '#d9c8b8', hair: 'bowl', hairColor: '#2a2a2a', facial: 'none', eyes: 'dot', mouth: 'neutral', prop: '👁️' },
  'Ratio King': { bg: '#1d9bf0', skin: '#e0b28a', hair: 'spiky', hairColor: '#1a1a1a', facial: 'none', eyes: 'smug', mouth: 'smirk', prop: '📊' },
  'Milk Crate Challenger': { bg: '#e8a33a', skin: '#d9a06a', hair: 'buzzcut', hairColor: '#3a2a1a', facial: 'none', eyes: 'wide', mouth: 'open', prop: '🥛' },
  'NPC Streamer': { bg: '#ff2ec4', skin: '#e6c39a', hair: 'bun', hairColor: '#ff8fc4', facial: 'none', eyes: 'dot', mouth: 'open', prop: '🍦' },
  'VTuber Prime': { bg: '#8e2fc9', skin: '#f0d8c0', hair: 'ponytail', hairColor: '#5dd5ff', facial: 'none', eyes: 'wide', mouth: 'smile', prop: '🎭' },
  'Speedrun Kid': { bg: '#2ecc71', skin: '#e6c39a', hair: 'bowl', hairColor: '#8a5a2a', facial: 'none', eyes: 'intense', mouth: 'neutral', prop: '⏱️' },
  'Twitch Chat': { bg: '#9146ff', skin: '#b8a8f0', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'wide', mouth: 'open', prop: '💬' },
  'The Algorithm': { bg: '#0a0a0a', skin: '#3ad9c0', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'intense', mouth: 'neutral', prop: '👁️' },
  'Wojak Doomer': { bg: '#2a2a2e', skin: '#e8e0d8', hair: 'buzzcut', hairColor: '#2a2a2a', facial: 'stubble', eyes: 'sleepy', mouth: 'frown', prop: '🚬' },
  'Sigma Grindset': { bg: '#1a1a1a', skin: '#d9a878', hair: 'slick', hairColor: '#1a1a1a', facial: 'stubble', eyes: 'intense', mouth: 'neutral', prop: '⏰' },
  'The Manager Summoner': { bg: '#d4a017', skin: '#e6c39a', hair: 'wig', hairColor: '#d9b98a', facial: 'none', eyes: 'angry', mouth: 'open', prop: '📢' },
  'Area Man': { bg: '#6a7a8a', skin: '#e0b28a', hair: 'bandana', hairColor: '#5a5a5a', facial: 'stubble', eyes: 'wide', mouth: 'grin', prop: '🗞️' },

  // ── Expansion A: gaming ──
  'Rage Quitter': { bg: '#c0392b', skin: '#e09a8a', hair: 'spiky', hairColor: '#c94f2a', facial: 'none', eyes: 'angry', mouth: 'open', prop: '🎮' },
  'The Completionist': { bg: '#2a5a3a', skin: '#e6c39a', hair: 'bowl', hairColor: '#3a2a1a', facial: 'none', eyes: 'intense', mouth: 'neutral', prop: '💯' },
  'Loot Goblin': { bg: '#5a8a2a', skin: '#9ac95a', hair: 'bald', hairColor: '#000', facial: 'none', eyes: 'wide', mouth: 'grin', prop: '💰' },
  'Tutorial Boss': { bg: '#8a6a3a', skin: '#c98f5e', hair: 'helmet', hairColor: '#8a8a8a', facial: 'none', eyes: 'normal', mouth: 'smile', prop: '🛡️' },
  'Final Boss': { bg: '#3a0a4a', skin: '#8a4ac9', hair: 'spiky', hairColor: '#2a0a3a', facial: 'goatee', eyes: 'intense', mouth: 'frown', prop: '👿' },
  'Side Quest NPC': { bg: '#c9a86a', skin: '#e6c39a', hair: 'furhat', hairColor: '#8a5a2a', facial: 'none', eyes: 'normal', mouth: 'smile', prop: '❗' },
  'Pay2Win Whale': { bg: '#2a4a8a', skin: '#e0b28a', hair: 'slick', hairColor: '#3a2a1a', facial: 'none', eyes: 'smug', mouth: 'grin', prop: '🐳' },
  'The Dungeon Master': { bg: '#4a2a6a', skin: '#e6c39a', hair: 'wild', hairColor: '#5a3a1e', facial: 'full', eyes: 'smug', mouth: 'grin', prop: '🎲' },
  'Lag': { bg: '#c9302c', skin: '#e8e8e8', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'dot', mouth: 'neutral', prop: '📶' },
  'Patch Notes': { bg: '#3a5a7a', skin: '#d9d9d9', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'normal', mouth: 'neutral', prop: '📜' },
  'Esports Washout': { bg: '#2a3a4a', skin: '#e0b28a', hair: 'buzzcut', hairColor: '#3a2a1a', facial: 'stubble', eyes: 'sleepy', mouth: 'frown', prop: '🏆' },
  'The Backlog': { bg: '#2a2a4a', skin: '#a8b8d9', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'sleepy', mouth: 'frown', prop: '📚' },

  // ── Expansion A: modern archetypes & entities ──
  'Gym Bro': { bg: '#c9302c', skin: '#d9955a', hair: 'buzzcut', hairColor: '#1a1a1a', facial: 'stubble', eyes: 'shades', mouth: 'grin', prop: '💪' },
  'Crypto Bro': { bg: '#f7931a', skin: '#e0b28a', hair: 'slick', hairColor: '#3a2a1a', facial: 'stubble', eyes: 'wide', mouth: 'grin', prop: '📉' },
  'LinkedIn Lion': { bg: '#0a66c2', skin: '#e6c39a', hair: 'slick', hairColor: '#5a3a1e', facial: 'none', eyes: 'smug', mouth: 'grin', prop: '💼' },
  'Podcast Bro': { bg: '#3a2a2a', skin: '#d9a878', hair: 'bun', hairColor: '#3a2a1a', facial: 'full', eyes: 'smug', mouth: 'open', prop: '🎙️' },
  'Astrology Girlie': { bg: '#4a2a6a', skin: '#e6c39a', hair: 'wavy', hairColor: '#8a4ac9', facial: 'none', eyes: 'wide', mouth: 'smile', prop: '🔮' },
  'HOA President': { bg: '#5a7a4a', skin: '#e6c39a', hair: 'bowl', hairColor: '#c9c9c9', facial: 'none', eyes: 'angry', mouth: 'frown', prop: '📋' },
  'The Intern': { bg: '#6a8aa8', skin: '#e0b28a', hair: 'bowl', hairColor: '#3a2a1a', facial: 'none', eyes: 'wide', mouth: 'smile', prop: '☕' },
  'Fantasy Commissioner': { bg: '#2a5a3a', skin: '#e0b28a', hair: 'bald', hairColor: '#333', facial: 'goatee', eyes: 'smug', mouth: 'smirk', prop: '🏈' },
  'Group Chat Ghost': { bg: '#3a3a4a', skin: '#e8e8f0', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'dot', mouth: 'neutral', prop: '👻' },
  'The Wi-Fi Router': { bg: '#1a2a3a', skin: '#3a3a3a', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'dot', mouth: 'neutral', prop: '📡' },
  'Printer At Work': { bg: '#5a5a5a', skin: '#d9d9d9', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'angry', mouth: 'frown', prop: '🖨️' },
  'Monday': { bg: '#2a2a3e', skin: '#8a8aa8', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'intense', mouth: 'frown', prop: '📅' },
  'Autocorrect': { bg: '#3a7ac9', skin: '#e8e8e8', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'smug', mouth: 'smirk', prop: '🦆' },
  'Student Loans': { bg: '#1a1a1a', skin: '#a83232', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'intense', mouth: 'grin', prop: '📈' },
  'The Aux Cord': { bg: '#2a1a3a', skin: '#e8d5a3', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'smug', mouth: 'smile', prop: '🎵' },
  'Jury Duty': { bg: '#4a3a2a', skin: '#d9cba8', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'normal', mouth: 'neutral', prop: '⚖️' },

  // ── Expansion B: historical ──
  'Joan of Arc': { bg: '#3a5a8a', skin: '#e6c39a', hair: 'helmet', hairColor: '#8a8a8a', facial: 'none', eyes: 'intense', mouth: 'neutral', prop: '⚔️' },
  'Vlad the Impaler': { bg: '#3a0a0a', skin: '#d9c0a8', hair: 'furhat', hairColor: '#2a1a0a', facial: 'mustache', eyes: 'intense', mouth: 'frown', prop: '🦇' },
  'Caligula': { bg: '#8a2a2a', skin: '#e0b28a', hair: 'laurel', hairColor: '#2e7d32', facial: 'none', eyes: 'wide', mouth: 'grin', prop: '🐴' },
  'Nero': { bg: '#c96a2a', skin: '#e0b28a', hair: 'laurel', hairColor: '#2e7d32', facial: 'stubble', eyes: 'smug', mouth: 'smirk', prop: '🎻' },
  'Ivan the Terrible': { bg: '#2a1a2a', skin: '#e0c0a0', hair: 'furhat', hairColor: '#3a2a1a', facial: 'longbeard', eyes: 'angry', mouth: 'frown', prop: '⚡' },
  'Catherine the Great': { bg: '#4a6a3a', skin: '#f0d8c0', hair: 'wig', hairColor: '#e8e8e8', facial: 'none', eyes: 'smug', mouth: 'smirk', prop: '👑' },
  'Galileo Galilei': { bg: '#1a2a4a', skin: '#e0b28a', hair: 'bald', hairColor: '#8a8a8a', facial: 'full', eyes: 'wide', mouth: 'neutral', prop: '🔭' },
  'Isaac Newton': { bg: '#5a2a2a', skin: '#f0d8c0', hair: 'wig', hairColor: '#d9d9d9', facial: 'none', eyes: 'angry', mouth: 'frown', prop: '🍎' },
  'Charles Darwin': { bg: '#3a5a3a', skin: '#e6c39a', hair: 'bald', hairColor: '#c9c9c9', facial: 'longbeard', eyes: 'normal', mouth: 'neutral', prop: '🐦' },
  'Sigmund Freud': { bg: '#4a3a2a', skin: '#e6c39a', hair: 'bald', hairColor: '#c9c9c9', facial: 'full', eyes: 'smug', mouth: 'neutral', prop: '🚬' },
  'William Shakespeare': { bg: '#3a2a4a', skin: '#e6c39a', hair: 'bald', hairColor: '#5a3a1e', facial: 'goatee', eyes: 'smug', mouth: 'smirk', prop: '🖋️' },
  'Vincent van Gogh': { bg: '#e8a33a', skin: '#e0b28a', hair: 'spiky', hairColor: '#c9622a', facial: 'full', eyes: 'intense', mouth: 'neutral', prop: '🌻' },
  'Mansa Musa': { bg: '#c9a227', skin: '#6a4a2a', hair: 'headscarf', hairColor: '#c9a227', facial: 'goatee', eyes: 'smug', mouth: 'smile', prop: '🪙' },
  'Emperor Norton': { bg: '#3a4a6a', skin: '#e6c39a', hair: 'bicorne', hairColor: '#1a1a1a', facial: 'full', eyes: 'wide', mouth: 'grin', prop: '👑' },
  'Timothy Dexter': { bg: '#6a5a2a', skin: '#e6c39a', hair: 'wig', hairColor: '#e8e8e8', facial: 'none', eyes: 'wide', mouth: 'grin', prop: '⛏️' },
  'Senator Incitatus': { bg: '#8a6a2a', skin: '#8a5a2a', hair: 'laurel', hairColor: '#2e7d32', facial: 'none', eyes: 'sleepy', mouth: 'neutral', prop: '🐴' },
  'Pythagoras': { bg: '#2a4a5a', skin: '#e0b28a', hair: 'bald', hairColor: '#8a8a8a', facial: 'longbeard', eyes: 'intense', mouth: 'neutral', prop: '📐' },
  'Archimedes': { bg: '#2a5a6a', skin: '#e0b28a', hair: 'wild', hairColor: '#c9c9c9', facial: 'full', eyes: 'wide', mouth: 'open', prop: '🛁' },
  'Ada Lovelace': { bg: '#4a2a5a', skin: '#f0d8c0', hair: 'bun', hairColor: '#2a1a0a', facial: 'none', eyes: 'intense', mouth: 'smile', prop: '💻' },
  'Blackbeard': { bg: '#1a2a3a', skin: '#d9a06a', hair: 'bandana', hairColor: '#1a1a1a', facial: 'longbeard', eyes: 'angry', mouth: 'grin', prop: '🏴‍☠️' },
  'Spartacus': { bg: '#6a3a2a', skin: '#d9a06a', hair: 'buzzcut', hairColor: '#2a1a0a', facial: 'stubble', eyes: 'intense', mouth: 'neutral', prop: '⛓️' },
  'Hatshepsut': { bg: '#c9a227', skin: '#c9895a', hair: 'headscarf', hairColor: '#1a4a8a', facial: 'goatee', eyes: 'smug', mouth: 'smirk', prop: '𓂀' },
  'Dancing Plague Patient Zero': { bg: '#5a2a4a', skin: '#e0b28a', hair: 'wild', hairColor: '#5a3a1e', facial: 'none', eyes: 'wide', mouth: 'open', prop: '💃' },

  // ── Expansion B: sports ──
  'Air Goatness': { bg: '#c9302c', skin: '#6a4a2a', hair: 'bald', hairColor: '#000', facial: 'mustache', eyes: 'intense', mouth: 'smirk', prop: '🐐' },
  'Leo Pessi': { bg: '#75aadb', skin: '#e0b28a', hair: 'wavy', hairColor: '#3a2a1a', facial: 'full', eyes: 'normal', mouth: 'smile', prop: '⚽' },
  'Cris Penaldo': { bg: '#c9302c', skin: '#d9a06a', hair: 'slick', hairColor: '#1a1a1a', facial: 'none', eyes: 'smug', mouth: 'grin', prop: '🦵' },
  'Insane Jolt': { bg: '#2a8a3a', skin: '#5a3a20', hair: 'buzzcut', hairColor: '#000', facial: 'stubble', eyes: 'smug', mouth: 'grin', prop: '⚡' },
  'Serena Willpower': { bg: '#3a5a2a', skin: '#7a4a2a', hair: 'bun', hairColor: '#1a1a1a', facial: 'none', eyes: 'intense', mouth: 'smirk', prop: '🎾' },
  'Lion Woods': { bg: '#c9302c', skin: '#a8703a', hair: 'buzzcut', hairColor: '#1a1a1a', facial: 'stubble', eyes: 'intense', mouth: 'neutral', prop: '⛳' },
  'Wayne Greatzky': { bg: '#2a4a8a', skin: '#e6c39a', hair: 'wavy', hairColor: '#d9c98a', facial: 'none', eyes: 'normal', mouth: 'smile', prop: '🏒' },
  'Yogi Barely': { bg: '#1a2a5a', skin: '#e0b28a', hair: 'bald', hairColor: '#555', facial: 'none', eyes: 'sleepy', mouth: 'smile', prop: '⚾' },
  'Dennis Rodzilla': { bg: '#8a2a8a', skin: '#5a3a20', hair: 'buzzcut', hairColor: '#ff2ec4', facial: 'none', eyes: 'shades', mouth: 'grin', prop: '🌈' },
  'The Zamboni Guy': { bg: '#5dd5ff', skin: '#e6c39a', hair: 'furhat', hairColor: '#c9302c', facial: 'stubble', eyes: 'normal', mouth: 'smile', prop: '🧊' },

  // ── Expansion B: music ──
  'Tailor Quick': { bg: '#e8b8c8', skin: '#f0d8c0', hair: 'wavy', hairColor: '#d9c98a', facial: 'none', eyes: 'wink', mouth: 'smile', prop: '🧵' },
  'The Hive Queen': { bg: '#c9a227', skin: '#a8703a', hair: 'wavy', hairColor: '#c9a86a', facial: 'none', eyes: 'intense', mouth: 'smirk', prop: '🐝' },
  'Slim Shadow': { bg: '#2a2a2a', skin: '#e6c39a', hair: 'buzzcut', hairColor: '#d9c98a', facial: 'none', eyes: 'angry', mouth: 'neutral', prop: '🍝' },
  'Drayke': { bg: '#3a2a4a', skin: '#a8703a', hair: 'buzzcut', hairColor: '#1a1a1a', facial: 'full', eyes: 'sleepy', mouth: 'smile', prop: '🦉' },
  'Bad Rabbit': { bg: '#c94f8a', skin: '#d9a06a', hair: 'buzzcut', hairColor: '#1a1a1a', facial: 'stubble', eyes: 'shades', mouth: 'neutral', prop: '🐰' },
  'Willie Nelsun': { bg: '#8a3a2a', skin: '#d9a878', hair: 'ponytail', hairColor: '#c94f2a', facial: 'full', eyes: 'sleepy', mouth: 'smile', prop: '🌿' },
  'Lil Blimp': { bg: '#2a2a4a', skin: '#d9a878', hair: 'dreads', hairColor: '#ff2ec4', facial: 'none', eyes: 'sleepy', mouth: 'neutral', prop: '🎈' },
  'Festival DJ': { bg: '#3a1a5a', skin: '#e0b28a', hair: 'bun', hairColor: '#3a2a1a', facial: 'stubble', eyes: 'shades', mouth: 'open', prop: '🎧' },
  'Garage Band Dad': { bg: '#4a4a3a', skin: '#e6c39a', hair: 'bald', hairColor: '#8a8a8a', facial: 'goatee', eyes: 'normal', mouth: 'smile', prop: '🎸' },
  'K-Pop Trainee': { bg: '#ff8fc4', skin: '#f0d8c0', hair: 'bowl', hairColor: '#8a4ac9', facial: 'none', eyes: 'wide', mouth: 'smile', prop: '🎤' },

  // ── Expansion B: cryptids ──
  'Bigfoot': { bg: '#2a4a2a', skin: '#5a3a20', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'wide', mouth: 'neutral', prop: '📷' },
  'Mothman': { bg: '#1a1a2e', skin: '#4a4a5a', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'intense', mouth: 'neutral', prop: '🦋' },
  'The Loch Ness Monster': { bg: '#1a3a4a', skin: '#3a7a5a', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'sleepy', mouth: 'smile', prop: '🌊' },
  'Chupacabra': { bg: '#4a2a1a', skin: '#6a5a3a', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'angry', mouth: 'open', prop: '🐐' },
  'The Yeti': { bg: '#5dd5ff', skin: '#e8e8f0', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'sleepy', mouth: 'neutral', prop: '🏔️' },
  'Jersey Devil': { bg: '#2a1a2a', skin: '#8a3a3a', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'angry', mouth: 'grin', prop: '🦇' },
  'The Kraken': { bg: '#0a1a2e', skin: '#5a3a8a', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'intense', mouth: 'frown', prop: '🐙' },
  'Area 51 Intern': { bg: '#2a3a2a', skin: '#e0b28a', hair: 'buzzcut', hairColor: '#3a2a1a', facial: 'none', eyes: 'wide', mouth: 'neutral', prop: '👽' },

  // ── Expansion B: heroic animals ──
  'Wojtek the Bear': { bg: '#5a4a2a', skin: '#8a5a2a', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'normal', mouth: 'smile', prop: '🎖️' },
  'Cher Ami': { bg: '#4a5a6a', skin: '#a8a8b8', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'normal', mouth: 'neutral', prop: '✉️' },
  'Unsinkable Sam': { bg: '#1a3a5a', skin: '#2a2a2a', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'sleepy', mouth: 'neutral', prop: '⚓' },
  'Laika': { bg: '#1a1a3e', skin: '#a8825a', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'normal', mouth: 'smile', prop: '🚀' },
  'Emu War Veteran': { bg: '#c9a86a', skin: '#6a5a3a', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'wide', mouth: 'open', prop: '🏅' },
  'Balto': { bg: '#3a5a7a', skin: '#4a4a4a', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'normal', mouth: 'smile', prop: '🛷' },

  // ── ICON cards (collection-set rewards, gilded backgrounds) ──
  'Prime Da Vinci': { bg: '#d4af37', skin: '#d9a06a', hair: 'wavy', hairColor: '#f0f0f0', facial: 'longbeard', eyes: 'intense', mouth: 'smirk', prop: '🎨' },
  'Hannibal of Carthage': { bg: '#b8860b', skin: '#b5804f', hair: 'helmet', hairColor: '#8a8a8a', facial: 'goatee', eyes: 'intense', mouth: 'smirk', prop: '🐘' },
  'Charles Ponzi': { bg: '#c9a227', skin: '#e0b28a', hair: 'slick', hairColor: '#1a1a1a', facial: 'mustache', eyes: 'smug', mouth: 'grin', prop: '💸' },
  'Doge': { bg: '#e8c56a', skin: '#e8b84a', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'smug', mouth: 'smile', prop: '🐕' },
  'Prime Rasputin': { bg: '#c9a227', skin: '#d8b48a', hair: 'wild', hairColor: '#3d2a1a', facial: 'longbeard', eyes: 'intense', mouth: 'smirk', prop: '🔮' },
  'Marcus Aurelius': { bg: '#b8963a', skin: '#d9a06a', hair: 'laurel', hairColor: '#2e7d32', facial: 'full', eyes: 'sleepy', mouth: 'neutral', prop: '📖' },
  'George Washington': { bg: '#c9a227', skin: '#e0b28a', hair: 'wig', hairColor: '#f0f0f0', facial: 'none', eyes: 'normal', mouth: 'neutral', prop: '🍒' },
  'Dolly Party': { bg: '#e8b84a', skin: '#e6c39a', hair: 'wavy', hairColor: '#f0e68c', facial: 'none', eyes: 'wink', mouth: 'grin', prop: '🦋' },
  'The Missing Link': { bg: '#c9a227', skin: '#6a4a2a', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'smug', mouth: 'smirk', prop: '🧬' },
  'The GOAT': { bg: '#d4af37', skin: '#d9cba8', hair: 'blob', hairColor: '#000', facial: 'longbeard', eyes: 'sleepy', mouth: 'smile', prop: '🐐' },
  'The Speedgod': { bg: '#b8963a', skin: '#e6c39a', hair: 'spiky', hairColor: '#5dd5ff', facial: 'none', eyes: 'intense', mouth: 'smirk', prop: '🏁' },
  'Main Character': { bg: '#e8b84a', skin: '#e0b28a', hair: 'wavy', hairColor: '#ff2ec4', facial: 'none', eyes: 'shades', mouth: 'grin', prop: '🎬' },

  // ── Expansion C: characters only ──
  'Leeroy Jenkinz': { bg: '#8a2a2a', skin: '#e0b28a', hair: 'helmet', hairColor: '#8a8a8a', facial: 'none', eyes: 'wide', mouth: 'open', prop: '🍗' },
  'Techno Norseman': { bg: '#2a3a5a', skin: '#e6c39a', hair: 'ponytail', hairColor: '#c9622a', facial: 'full', eyes: 'intense', mouth: 'neutral', prop: '🔊' },
  'The Speedcuber': { bg: '#2a8a5a', skin: '#e0b28a', hair: 'bowl', hairColor: '#3a2a1a', facial: 'none', eyes: 'intense', mouth: 'neutral', prop: '🧊' },
  'Couch Co-op Legend': { bg: '#5a4a2a', skin: '#d9a878', hair: 'buzzcut', hairColor: '#3a2a1a', facial: 'stubble', eyes: 'normal', mouth: 'smile', prop: '🎮' },
  'Open Mic Comedian': { bg: '#2a1a2a', skin: '#e0b28a', hair: 'wavy', hairColor: '#3a2a1a', facial: 'stubble', eyes: 'sleepy', mouth: 'grin', prop: '🎤' },
  'Subway Pigeon': { bg: '#4a4a5a', skin: '#8a8aa8', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'dot', mouth: 'neutral', prop: '🍕' },
  'Dumpster Raccoon': { bg: '#2a3a2a', skin: '#6a6a6a', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'shades', mouth: 'smirk', prop: '🗑️' },
  'Tycho Brahe': { bg: '#2a2a5a', skin: '#e6c39a', hair: 'slick', hairColor: '#c9622a', facial: 'mustache', eyes: 'normal', mouth: 'smile', prop: '🌟' },
  'Hercules': { bg: '#c9a227', skin: '#d9a06a', hair: 'wavy', hairColor: '#2a1a0a', facial: 'stubble', eyes: 'intense', mouth: 'smirk', prop: '🦁' },
  'Medusa': { bg: '#2a5a3a', skin: '#9ac97a', hair: 'dreads', hairColor: '#2e7d32', facial: 'none', eyes: 'shades', mouth: 'smirk', prop: '🐍' },
  'Sisyphus': { bg: '#5a4a3a', skin: '#d9a06a', hair: 'bald', hairColor: '#555', facial: 'stubble', eyes: 'sleepy', mouth: 'smile', prop: '🪨' },
  'Icarus': { bg: '#e8a33a', skin: '#e0b28a', hair: 'wavy', hairColor: '#d9c98a', facial: 'none', eyes: 'wide', mouth: 'grin', prop: '🪽' },
  'The Minotaur': { bg: '#4a2a1a', skin: '#6a4a2a', hair: 'blob', hairColor: '#000', facial: 'none', eyes: 'angry', mouth: 'frown', prop: '🌀' },
  'Zeus': { bg: '#d4af37', skin: '#e6c39a', hair: 'laurel', hairColor: '#e8e8e8', facial: 'longbeard', eyes: 'intense', mouth: 'neutral', prop: '⚡' },
};

const FALLBACK_TRAITS: AvatarTraits = { bg: '#334155', skin: '#e0b28a', hair: 'bald', hairColor: '#333', facial: 'none', eyes: 'normal', mouth: 'smile', prop: '❓' };

export function getImageUrl(name: string): string {
  const traits = AVATAR_TRAITS[name] || FALLBACK_TRAITS;
  return svgToDataUri(buildDoodleAvatarSVG(name, traits));
}
