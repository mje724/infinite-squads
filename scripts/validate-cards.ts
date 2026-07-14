// ============================================
// INFINITE SQUADS — CARD INTEGRITY GATE
// Fails the build if the card universe is not airtight:
//  - every collectible card is fully defined across ALL layers
//  - stats are in range, names unique, no dangling references
// Run: npx tsx scripts/validate-cards.ts
// ============================================
import { PRESET_CARDS } from '../src/data/presetCards';
import { CARD_REGISTRY } from '../src/data/cardRegistry';
import { AVATAR_TRAITS } from '../src/lib/avatar';
import { ICON_CARDS, COLLECTION_SETS } from '../src/data/collections';
import { NAMED_DUOS } from '../src/data/chemistry';

const errors: string[] = [];
const warnings: string[] = [];
const E = (m: string) => errors.push(m);
const W = (m: string) => warnings.push(m);

const presetNames = PRESET_CARDS.map(c => c.name);
const iconNames = ICON_CARDS.map(c => c.name);
const collectibleNames = new Set([...presetNames, ...iconNames]);
const registryNames = new Set(Object.keys(CARD_REGISTRY));
const avatarNames = new Set(Object.keys(AVATAR_TRAITS));

// 1. Unique preset names
const seen = new Set<string>();
for (const n of presetNames) {
  if (seen.has(n)) E(`DUPLICATE preset card name: "${n}"`);
  seen.add(n);
}
for (const n of iconNames) {
  if (collectibleNames.has(n) && presetNames.includes(n)) E(`ICON name collides with preset: "${n}"`);
}

// 2. Every collectible card fully defined across layers
for (const c of PRESET_CARDS) {
  if (!avatarNames.has(c.name)) E(`MISSING avatar traits: "${c.name}"`);
  if (!registryNames.has(c.name)) E(`MISSING registry entry: "${c.name}"`);
  // flavor stats
  if (!Array.isArray(c.stats) || c.stats.length !== 6) E(`"${c.name}" must have exactly 6 stats (has ${c.stats?.length})`);
  for (const s of c.stats || []) {
    if (typeof s.value !== 'number' || s.value < 0 || s.value > 100) E(`"${c.name}" stat "${s.label}" out of [0,100]: ${s.value}`);
    if (!s.label || !s.emoji) E(`"${c.name}" stat missing label/emoji`);
  }
}
for (const c of ICON_CARDS) {
  if (!avatarNames.has(c.name)) E(`MISSING avatar traits (icon): "${c.name}"`);
  if (!registryNames.has(c.name)) W(`icon "${c.name}" has no registry entry (uses fallback stats)`);
}

// 3. Registry core stats in range + tag/era validity happens at type level
for (const [name, gd] of Object.entries(CARD_REGISTRY)) {
  for (const [k, v] of Object.entries(gd.core)) {
    if (v < 1 || v > 99) E(`registry "${name}" core.${k} out of [1,99]: ${v}`);
  }
  if (gd.tags.length === 0) W(`registry "${name}" has no tags (no chemistry identity)`);
}

// 4. Named duos must reference real, defined cards
for (const duo of NAMED_DUOS) {
  for (const p of duo.pair) {
    if (!registryNames.has(p)) E(`NAMED_DUO "${duo.name}" references unknown card: "${p}"`);
  }
}

// 5. Collection requirements/rewards must reference real cards
for (const set of COLLECTION_SETS) {
  for (const r of set.requirements) {
    if (r.kind === 'specific' && r.cardName && !collectibleNames.has(r.cardName) && !registryNames.has(r.cardName))
      E(`collection "${set.id}" requires unknown card: "${r.cardName}"`);
  }
  if (set.reward.kind === 'icon' && !iconNames.includes(set.reward.cardName))
    E(`collection "${set.id}" rewards unknown icon: "${set.reward.cardName}"`);
}

// ── Report ──
console.log(`\n=== CARD INTEGRITY REPORT ===`);
console.log(`Preset cards:      ${presetNames.length}`);
console.log(`Icon cards:        ${iconNames.length}`);
console.log(`Collectible total: ${collectibleNames.size}`);
console.log(`Registry entries:  ${registryNames.size}`);
console.log(`Avatar entries:    ${avatarNames.size}`);
console.log(`Named duos:        ${NAMED_DUOS.length}`);
console.log(`Collection sets:   ${COLLECTION_SETS.length}`);
console.log(`\nWarnings: ${warnings.length}`);
if (warnings.length) console.log(warnings.map(w => '  ⚠ ' + w).join('\n'));
console.log(`\nErrors: ${errors.length}`);
if (errors.length) {
  console.log(errors.map(e => '  ✗ ' + e).join('\n'));
  console.log(`\n❌ INTEGRITY GATE FAILED`);
  process.exit(1);
}
console.log(`\n✅ INTEGRITY GATE PASSED`);
