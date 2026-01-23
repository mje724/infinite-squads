// ============================================
// INFINITE SQUADS - Preset Libraries
// The "Omni-Stat" Content Database
// ============================================

import { StatPreset, Trait, QuotePreset, GlobalModifier } from '@/types/schema';

// ─────────────────────────────────────────────
// STAT PRESETS - The Heart of the System
// ─────────────────────────────────────────────

export const STAT_PRESETS: StatPreset[] = [
  // ═══════════════════════════════════════════
  // SPORTS (FIFA/2K Style)
  // ═══════════════════════════════════════════
  { id: 'pace', label: 'Pace', icon: '⚡', category: 'sports', defaultValue: 75 },
  { id: 'shooting', label: 'Shooting', icon: '🎯', category: 'sports', defaultValue: 70 },
  { id: 'passing', label: 'Passing', icon: '🔄', category: 'sports', defaultValue: 72 },
  { id: 'dribbling', label: 'Dribbling', icon: '⚽', category: 'sports', defaultValue: 68 },
  { id: 'defense', label: 'Defense', icon: '🛡️', category: 'sports', defaultValue: 65 },
  { id: 'physical', label: 'Physical', icon: '💪', category: 'sports', defaultValue: 70 },
  { id: 'three-pt', label: '3PT Shot', icon: '🏀', category: 'sports', defaultValue: 60 },
  { id: 'dunk', label: 'Dunk', icon: '🔥', category: 'sports', defaultValue: 55 },
  { id: 'handle', label: 'Handle', icon: '🎮', category: 'sports', defaultValue: 65 },
  { id: 'basketball-iq', label: 'Basketball IQ', icon: '🧠', category: 'sports', defaultValue: 70 },
  { id: 'stamina', label: 'Stamina', icon: '❤️', category: 'sports', defaultValue: 80 },
  { id: 'aggression', label: 'Aggression', icon: '😤', category: 'sports', defaultValue: 60 },
  { id: 'clutch', label: 'Clutch', icon: '🎪', category: 'sports', defaultValue: 50 },
  { id: 'vision', label: 'Vision', icon: '👁️', category: 'sports', defaultValue: 65 },
  { id: 'strength', label: 'Strength', icon: '🦾', category: 'sports', defaultValue: 70 },
  { id: 'speed', label: 'Speed', icon: '💨', category: 'sports', defaultValue: 75 },

  // ═══════════════════════════════════════════
  // CORPORATE/OFFICE
  // ═══════════════════════════════════════════
  { id: 'efficiency', label: 'Efficiency', icon: '📊', category: 'office', defaultValue: 65 },
  { id: 'synergy', label: 'Synergy', icon: '🤝', category: 'office', defaultValue: 70 },
  { id: 'email-speed', label: 'Email Speed', icon: '📧', category: 'office', defaultValue: 85 },
  { id: 'meeting-survival', label: 'Meeting Survival', icon: '😴', category: 'office', defaultValue: 45 },
  { id: 'spreadsheet-iq', label: 'Spreadsheet IQ', icon: '📈', category: 'office', defaultValue: 60 },
  { id: 'delegating', label: 'Delegating', icon: '👉', category: 'office', defaultValue: 75 },
  { id: 'coffee-intake', label: 'Coffee Intake', icon: '☕', category: 'office', defaultValue: 90 },
  { id: 'fake-laugh', label: 'Fake Laugh', icon: '😂', category: 'office', defaultValue: 80 },
  { id: 'buzzword-usage', label: 'Buzzword Usage', icon: '💬', category: 'office', defaultValue: 88 },
  { id: 'slack-game', label: 'Slack Game', icon: '💻', category: 'office', defaultValue: 95 },
  { id: 'deadline-dodge', label: 'Deadline Dodge', icon: '🏃', category: 'office', defaultValue: 70 },
  { id: 'credit-stealing', label: 'Credit Stealing', icon: '🏆', category: 'office', defaultValue: 40 },
  { id: 'pto-hoarding', label: 'PTO Hoarding', icon: '🏖️', category: 'office', defaultValue: 55 },
  { id: 'linkedin-presence', label: 'LinkedIn Presence', icon: '🔗', category: 'office', defaultValue: 45 },
  { id: 'passive-aggression', label: 'Passive Aggression', icon: '🙂', category: 'office', defaultValue: 60 },
  { id: 'reply-all-chaos', label: 'Reply All Chaos', icon: '💥', category: 'office', defaultValue: 25 },

  // ═══════════════════════════════════════════
  // THE "DISRESPECT" PACK (Roast/Funny)
  // ═══════════════════════════════════════════
  { id: 'delusion', label: 'Delusion', icon: '🌈', category: 'roast', defaultValue: 85 },
  { id: 'cap-level', label: 'Cap Level', icon: '🧢', category: 'roast', defaultValue: 90 },
  { id: 'simp-level', label: 'Simp Level', icon: '🥺', category: 'roast', defaultValue: 65 },
  { id: 'rizz', label: 'Rizz', icon: '😏', category: 'roast', defaultValue: 35 },
  { id: 'toxic-trait', label: 'Toxic Trait', icon: '☢️', category: 'roast', defaultValue: 75 },
  { id: 'gaslighting', label: 'Gaslighting', icon: '🔥', category: 'roast', defaultValue: 80 },
  { id: 'hater-energy', label: 'Hater Energy', icon: '🧂', category: 'roast', defaultValue: 70 },
  { id: 'petty', label: 'Petty', icon: '💅', category: 'roast', defaultValue: 88 },
  { id: 'mooch-factor', label: 'Mooch Factor', icon: '🪱', category: 'roast', defaultValue: 60 },
  { id: 'hairline-recession', label: 'Hairline Recession', icon: '👴', category: 'roast', defaultValue: 45 },
  { id: 'bad-takes', label: 'Bad Takes', icon: '🗑️', category: 'roast', defaultValue: 95 },
  { id: 'main-character', label: 'Main Character', icon: '⭐', category: 'roast', defaultValue: 99 },
  { id: 'victim-complex', label: 'Victim Complex', icon: '😢', category: 'roast', defaultValue: 85 },
  { id: 'accountability', label: 'Accountability', icon: '🪞', category: 'roast', defaultValue: 12 },
  { id: 'self-awareness', label: 'Self-Awareness', icon: '🔍', category: 'roast', defaultValue: 8 },
  { id: 'emotional-damage', label: 'Emotional Damage', icon: '💔', category: 'roast', defaultValue: 92 },

  // ═══════════════════════════════════════════
  // PARTY/NIGHTLIFE
  // ═══════════════════════════════════════════
  { id: 'alcohol-tolerance', label: 'Alcohol Tolerance', icon: '🍺', category: 'party', defaultValue: 70 },
  { id: 'dance-moves', label: 'Dance Moves', icon: '💃', category: 'party', defaultValue: 55 },
  { id: 'aux-control', label: 'Aux Cord Control', icon: '🎵', category: 'party', defaultValue: 60 },
  { id: 'chaos', label: 'Chaos', icon: '🌪️', category: 'party', defaultValue: 75 },
  { id: 'flirting', label: 'Flirting', icon: '😘', category: 'party', defaultValue: 45 },
  { id: 'wallet-depth', label: 'Wallet Depth', icon: '💰', category: 'party', defaultValue: 30 },
  { id: 'hangover-recovery', label: 'Hangover Recovery', icon: '🤢', category: 'party', defaultValue: 40 },
  { id: 'uber-rating', label: 'Uber Rating', icon: '⭐', category: 'party', defaultValue: 4.2 },
  { id: 'pregame-energy', label: 'Pregame Energy', icon: '🚀', category: 'party', defaultValue: 90 },
  { id: 'afterparty-stamina', label: 'Afterparty Stamina', icon: '🌙', category: 'party', defaultValue: 65 },
  { id: 'shot-taking', label: 'Shot Taking', icon: '🥃', category: 'party', defaultValue: 80 },
  { id: 'wingman-ability', label: 'Wingman Ability', icon: '🦅', category: 'party', defaultValue: 50 },
  { id: 'drunk-texting', label: 'Drunk Texting', icon: '📱', category: 'party', defaultValue: 95 },
  { id: 'karaoke', label: 'Karaoke', icon: '🎤', category: 'party', defaultValue: 35 },

  // ═══════════════════════════════════════════
  // RPG/FANTASY
  // ═══════════════════════════════════════════
  { id: 'attack', label: 'Attack', icon: '⚔️', category: 'rpg', defaultValue: 70 },
  { id: 'magic', label: 'Magic', icon: '✨', category: 'rpg', defaultValue: 60 },
  { id: 'hp', label: 'HP', icon: '💚', category: 'rpg', defaultValue: 100 },
  { id: 'mana', label: 'Mana', icon: '💙', category: 'rpg', defaultValue: 80 },
  { id: 'luck', label: 'Luck', icon: '🍀', category: 'rpg', defaultValue: 50 },
  { id: 'charisma', label: 'Charisma', icon: '👑', category: 'rpg', defaultValue: 65 },
  { id: 'stealth', label: 'Stealth', icon: '🥷', category: 'rpg', defaultValue: 55 },
  { id: 'intelligence', label: 'Intelligence', icon: '📚', category: 'rpg', defaultValue: 70 },
];

// ─────────────────────────────────────────────
// TRAITS / BADGES
// ─────────────────────────────────────────────

export const TRAIT_PRESETS: Trait[] = [
  // ═══════════════════════════════════════════
  // POSITIVE TRAITS
  // ═══════════════════════════════════════════
  {
    id: 'leader',
    name: 'Leader',
    icon: '👑',
    description: 'Boosts team morale and chemistry',
    type: 'positive',
    effects: [{ statLabel: 'Synergy', modifier: 10 }],
  },
  {
    id: 'clutch-gene',
    name: 'Clutch Gene',
    icon: '🎯',
    description: 'Stats increase in final moments',
    type: 'positive',
    effects: [{ statLabel: 'Clutch', modifier: 15, condition: 'Last 5 minutes' }],
  },
  {
    id: 'moneybags',
    name: 'Moneybags',
    icon: '💸',
    description: 'Always pays for dinner',
    type: 'positive',
    effects: [{ statLabel: 'Wallet Depth', modifier: 20 }],
  },
  {
    id: 'designated-driver',
    name: 'Designated Driver',
    icon: '🚗',
    description: '+10 Safety, +∞ Respect',
    type: 'positive',
    effects: [{ statLabel: 'Chaos', modifier: -15 }],
  },
  {
    id: 'hype-man',
    name: 'Hype Man',
    icon: '📣',
    description: 'Gets everyone pumped up',
    type: 'positive',
    effects: [{ statLabel: 'Pregame Energy', modifier: 20 }],
  },
  {
    id: 'secret-weapon',
    name: 'Secret Weapon',
    icon: '🔮',
    description: 'Unexpected clutch performances',
    type: 'positive',
    effects: [{ statLabel: 'Clutch', modifier: 25 }],
  },
  {
    id: 'glue-guy',
    name: 'Glue Guy',
    icon: '🧲',
    description: 'Holds the team together',
    type: 'positive',
    effects: [{ statLabel: 'Synergy', modifier: 15 }],
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    icon: '🐦',
    description: 'Always on time, somehow',
    type: 'positive',
    effects: [{ statLabel: 'Efficiency', modifier: 10 }],
  },

  // ═══════════════════════════════════════════
  // TOXIC/FUNNY TRAITS
  // ═══════════════════════════════════════════
  {
    id: 'the-ghost',
    name: 'The Ghost',
    icon: '👻',
    description: 'Disappears when the bill comes',
    type: 'negative',
    effects: [{ statLabel: 'Mooch Factor', modifier: 30 }],
  },
  {
    id: 'keyboard-warrior',
    name: 'Keyboard Warrior',
    icon: '⌨️',
    description: '+99 Twitter, 0 Real Life',
    type: 'negative',
    effects: [{ statLabel: 'Hater Energy', modifier: 25 }],
  },
  {
    id: 'karen',
    name: 'Karen',
    icon: '💇‍♀️',
    description: 'Can summon any manager',
    type: 'chaotic',
    effects: [{ statLabel: 'Chaos', modifier: 40 }],
  },
  {
    id: 'reply-guy',
    name: 'Reply Guy',
    icon: '↩️',
    description: 'First in every comment section',
    type: 'negative',
    effects: [{ statLabel: 'Simp Level', modifier: 20 }],
  },
  {
    id: 'main-character-syndrome',
    name: 'Main Character Syndrome',
    icon: '🎬',
    description: 'Everything is about them',
    type: 'negative',
    effects: [{ statLabel: 'Main Character', modifier: 30 }],
  },
  {
    id: 'chronic-latecomer',
    name: 'Chronic Latecomer',
    icon: '⏰',
    description: '"OMW" means just left the house',
    type: 'negative',
    effects: [{ statLabel: 'Efficiency', modifier: -20 }],
  },
  {
    id: 'screenshot-historian',
    name: 'Screenshot Historian',
    icon: '📸',
    description: 'Has receipts from 2016',
    type: 'chaotic',
    effects: [{ statLabel: 'Petty', modifier: 35 }],
  },
  {
    id: 'one-upper',
    name: 'One-Upper',
    icon: '☝️',
    description: 'Always has a bigger story',
    type: 'negative',
    effects: [{ statLabel: 'Cap Level', modifier: 25 }],
  },
  {
    id: 'venmo-requester',
    name: 'Venmo Requester',
    icon: '💳',
    description: 'Will request $0.50',
    type: 'negative',
    effects: [{ statLabel: 'Petty', modifier: 20 }],
  },
  {
    id: 'double-texter',
    name: 'Double Texter',
    icon: '📱',
    description: 'Will follow up after 3 minutes',
    type: 'negative',
    effects: [{ statLabel: 'Simp Level', modifier: 15 }],
  },
  {
    id: 'crypto-bro',
    name: 'Crypto Bro',
    icon: '📈',
    description: '"This is actually good for Bitcoin"',
    type: 'negative',
    effects: [{ statLabel: 'Delusion', modifier: 40 }],
  },
  {
    id: 'gym-rat',
    name: 'Gym Rat',
    icon: '🏋️',
    description: 'Will mention PRs unprompted',
    type: 'neutral',
    effects: [{ statLabel: 'Physical', modifier: 15 }],
  },
  {
    id: 'plant-parent',
    name: 'Plant Parent',
    icon: '🌿',
    description: 'Has names for all of them',
    type: 'neutral',
    effects: [{ statLabel: 'Self-Awareness', modifier: 10 }],
  },
  {
    id: 'group-chat-lurker',
    name: 'Group Chat Lurker',
    icon: '👀',
    description: 'Online but silent',
    type: 'neutral',
    effects: [{ statLabel: 'Stealth', modifier: 20 }],
  },
  {
    id: 'walking-red-flag',
    name: 'Walking Red Flag',
    icon: '🚩',
    description: 'Obvious warning signs',
    type: 'negative',
    effects: [{ statLabel: 'Toxic Trait', modifier: 30 }],
  },
  {
    id: 'situationship-expert',
    name: 'Situationship Expert',
    icon: '🤷',
    description: '"We\'re just talking"',
    type: 'chaotic',
    effects: [{ statLabel: 'Rizz', modifier: 10 }, { statLabel: 'Accountability', modifier: -20 }],
  },
];

// ─────────────────────────────────────────────
// QUOTE PRESETS
// ─────────────────────────────────────────────

export const QUOTE_PRESETS: QuotePreset[] = [
  // ═══════════════════════════════════════════
  // SERIOUS / SPORTS
  // ═══════════════════════════════════════════
  { id: 'q1', text: 'Averaged record numbers in Q3.', category: 'serious' },
  { id: 'q2', text: 'First round draft pick.', category: 'serious' },
  { id: 'q3', text: 'Built different.', category: 'serious' },
  { id: 'q4', text: 'Franchise player potential.', category: 'serious' },
  { id: 'q5', text: 'Elite mentality. Championship DNA.', category: 'serious' },
  { id: 'q6', text: 'The hardest worker in the room.', category: 'serious' },
  { id: 'q7', text: 'Generational talent.', category: 'serious' },
  { id: 'q8', text: 'Captain material.', category: 'serious' },

  // ═══════════════════════════════════════════
  // INSPIRATIONAL
  // ═══════════════════════════════════════════
  { id: 'q9', text: 'Pressure makes diamonds.', category: 'inspirational' },
  { id: 'q10', text: 'Started from the bottom.', category: 'inspirational' },
  { id: 'q11', text: 'Dream chaser. Goal getter.', category: 'inspirational' },
  { id: 'q12', text: 'Outworked everyone.', category: 'inspirational' },

  // ═══════════════════════════════════════════
  // FUNNY / ROAST
  // ═══════════════════════════════════════════
  { id: 'q13', text: 'Banned from Applebee\'s for conduct detrimental to the team.', category: 'funny' },
  { id: 'q14', text: 'Still thinks NFTs are coming back.', category: 'funny' },
  { id: 'q15', text: 'Has 40 unread texts and they are all from Groupon.', category: 'funny' },
  { id: 'q16', text: 'Peaked in High School (Class of 2014).', category: 'funny' },
  { id: 'q17', text: 'Claims he would\'ve gone Pro if not for his knee.', category: 'funny' },
  { id: 'q18', text: 'LinkedIn says "Open to Work" since 2019.', category: 'funny' },
  { id: 'q19', text: 'Still owes everyone money from that Airbnb.', category: 'funny' },
  { id: 'q20', text: 'Uber rating: 3.2 stars.', category: 'funny' },
  { id: 'q21', text: 'Gets "let\'s circle back" energy from everyone.', category: 'funny' },
  { id: 'q22', text: 'Their ex still follows them on Spotify.', category: 'funny' },
  { id: 'q23', text: 'Will bring up their study abroad forever.', category: 'funny' },
  { id: 'q24', text: 'Has a podcast with 7 listeners (5 are family).', category: 'funny' },
  { id: 'q25', text: '"I\'m not like other people" but is exactly like other people.', category: 'funny' },
  { id: 'q26', text: 'Gym selfie to workout ratio: 5:1.', category: 'funny' },
  { id: 'q27', text: 'Has strong opinions about things they know nothing about.', category: 'funny' },
  { id: 'q28', text: 'Once went viral for the wrong reasons.', category: 'funny' },
  { id: 'q29', text: 'Still thinks their takes are "ahead of their time."', category: 'funny' },
  { id: 'q30', text: 'Block list longer than their following list.', category: 'funny' },

  // ═══════════════════════════════════════════
  // ROAST SPECIFIC
  // ═══════════════════════════════════════════
  { id: 'q31', text: 'Brings up their SAT score at parties.', category: 'roast' },
  { id: 'q32', text: 'Will interrupt your story to tell theirs.', category: 'roast' },
  { id: 'q33', text: '"Actually, I saw it coming" about everything.', category: 'roast' },
  { id: 'q34', text: 'Orders off-menu to feel special.', category: 'roast' },
  { id: 'q35', text: 'Their personality is an astrology sign.', category: 'roast' },
  { id: 'q36', text: 'Has "Entrepreneur" in bio but sells MLM products.', category: 'roast' },
  { id: 'q37', text: 'Responds "k" to long messages.', category: 'roast' },
  { id: 'q38', text: 'Main character energy with background extra talent.', category: 'roast' },
  { id: 'q39', text: 'Would sell you out for a retweet.', category: 'roast' },
  { id: 'q40', text: 'Their red flags have red flags.', category: 'roast' },
];

// ─────────────────────────────────────────────
// GLOBAL MODIFIERS (Cards you play on the field)
// ─────────────────────────────────────────────

export const GLOBAL_MODIFIER_PRESETS: GlobalModifier[] = [
  {
    id: 'rent-due',
    name: 'Rent Due',
    description: '-10 Morale to everyone',
    icon: '🏠',
    effects: [{ statLabel: 'Chaos', modifier: 10 }, { statLabel: 'Efficiency', modifier: -10 }],
    duration: 'temporary',
    rarity: 'gold',
  },
  {
    id: 'mercury-retrograde',
    name: 'Mercury Retrograde',
    description: 'All communication stats halved',
    icon: '☿️',
    effects: [{ statLabel: 'Email Speed', modifier: -30 }, { statLabel: 'Passing', modifier: -20 }],
    duration: 'temporary',
    rarity: 'holo',
  },
  {
    id: 'free-pizza',
    name: 'Free Pizza',
    description: '+15 Morale to everyone',
    icon: '🍕',
    effects: [{ statLabel: 'Synergy', modifier: 15 }, { statLabel: 'Efficiency', modifier: 10 }],
    duration: 'temporary',
    rarity: 'silver',
  },
  {
    id: 'wifi-down',
    name: 'WiFi Down',
    description: 'Digital stats disabled',
    icon: '📵',
    effects: [{ statLabel: 'Slack Game', modifier: -50 }, { statLabel: 'Email Speed', modifier: -50 }],
    duration: 'temporary',
    rarity: 'gold',
  },
  {
    id: 'main-character-moment',
    name: 'Main Character Moment',
    description: 'One player gets +20 to everything',
    icon: '🎬',
    effects: [],
    duration: 'temporary',
    rarity: 'legendary',
  },
  {
    id: 'group-therapy',
    name: 'Group Therapy',
    description: 'Reset all negative chemistry',
    icon: '🛋️',
    effects: [{ statLabel: 'Toxic Trait', modifier: -20 }],
    duration: 'permanent',
    rarity: 'holo',
  },
  {
    id: 'viral-moment',
    name: 'Viral Moment',
    description: 'Random stat becomes 99',
    icon: '📱',
    effects: [],
    duration: 'temporary',
    rarity: 'legendary',
  },
  {
    id: 'budget-cuts',
    name: 'Budget Cuts',
    description: '-25 Wallet Depth for all',
    icon: '✂️',
    effects: [{ statLabel: 'Wallet Depth', modifier: -25 }],
    duration: 'permanent',
    rarity: 'gold',
  },
  {
    id: 'open-bar',
    name: 'Open Bar',
    description: 'Party stats +30, Office stats -30',
    icon: '🍸',
    effects: [
      { statLabel: 'Chaos', modifier: 30 },
      { statLabel: 'Dance Moves', modifier: 20 },
      { statLabel: 'Efficiency', modifier: -30 },
    ],
    duration: 'temporary',
    rarity: 'gold',
  },
  {
    id: 'imposter-syndrome',
    name: 'Imposter Syndrome',
    description: '-15 to highest stat',
    icon: '🎭',
    effects: [{ statLabel: 'Delusion', modifier: -30 }],
    duration: 'temporary',
    rarity: 'silver',
  },
];

// ─────────────────────────────────────────────
// CHEMISTRY LINK PRESETS
// ─────────────────────────────────────────────

export const CHEMISTRY_LINK_PRESETS = [
  {
    name: 'Divorced Dads',
    icon: '👨‍👧',
    description: 'Bonded by shared custody schedules',
    effects: [{ statLabel: 'Petty', modifier: 10 }, { statLabel: 'Wallet Depth', modifier: -15 }],
  },
  {
    name: 'College Roommates',
    icon: '🎓',
    description: 'Know each other\'s secrets',
    effects: [{ statLabel: 'Synergy', modifier: 15 }, { statLabel: 'Chaos', modifier: 10 }],
  },
  {
    name: 'Work Wives',
    icon: '💼',
    description: 'Survive corporate together',
    effects: [{ statLabel: 'Meeting Survival', modifier: 20 }, { statLabel: 'Fake Laugh', modifier: 15 }],
  },
  {
    name: 'Gym Bros',
    icon: '💪',
    description: 'Spot each other through life',
    effects: [{ statLabel: 'Physical', modifier: 15 }, { statLabel: 'Hype', modifier: 10 }],
  },
  {
    name: 'Exes',
    icon: '💔',
    description: 'Awkward chemistry',
    effects: [{ statLabel: 'Synergy', modifier: -20 }, { statLabel: 'Petty', modifier: 25 }],
  },
  {
    name: 'Situationship Survivors',
    icon: '🤷',
    description: '"We\'re just friends now"',
    effects: [{ statLabel: 'Rizz', modifier: -10 }, { statLabel: 'Self-Awareness', modifier: 15 }],
  },
  {
    name: 'Podcast Co-hosts',
    icon: '🎙️',
    description: 'Perfectly rehearsed banter',
    effects: [{ statLabel: 'Synergy', modifier: 20 }, { statLabel: 'Bad Takes', modifier: 10 }],
  },
  {
    name: 'Fantasy League Rivals',
    icon: '🏈',
    description: 'Respect through competition',
    effects: [{ statLabel: 'Hater Energy', modifier: 15 }, { statLabel: 'Spreadsheet IQ', modifier: 10 }],
  },
];

// ─────────────────────────────────────────────
// POSITION PRESETS BY THEME
// ─────────────────────────────────────────────

export const POSITION_PRESETS: Record<string, string[]> = {
  sports: ['Striker', 'Midfielder', 'Defender', 'Goalkeeper', 'Point Guard', 'Center', 'Power Forward', 'Quarterback', 'Wide Receiver'],
  office: ['CEO', 'Manager', 'Team Lead', 'Intern', 'HR Rep', 'IT Guy', 'Sales Lead', 'Remote Worker', 'Office Plant'],
  party: ['The Host', 'The DJ', 'The Bartender', 'The Designated Driver', 'The Wildcard', 'The Early Leaver', 'The Shot Caller'],
  roast: ['The Target', 'The Roastmaster', 'The Hype Man', 'The One Who Laughs Too Hard', 'The Note Taker'],
  rpg: ['Tank', 'Healer', 'DPS', 'Support', 'Mage', 'Rogue', 'Bard'],
  custom: ['Custom Position'],
};

// ─────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────

export function getStatsByCategory(category: string): StatPreset[] {
  return STAT_PRESETS.filter(stat => stat.category === category);
}

export function getTraitsByType(type: Trait['type']): Trait[] {
  return TRAIT_PRESETS.filter(trait => trait.type === type);
}

export function getQuotesByCategory(category: QuotePreset['category']): QuotePreset[] {
  return QUOTE_PRESETS.filter(quote => quote.category === category);
}

export function getRandomQuote(category?: QuotePreset['category']): QuotePreset {
  const pool = category ? getQuotesByCategory(category) : QUOTE_PRESETS;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getRandomStats(category: string, count: number = 6): StatPreset[] {
  const categoryStats = getStatsByCategory(category);
  const shuffled = [...categoryStats].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
