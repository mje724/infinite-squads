// ============================================
// EXPANSION B — Legends & Folklore
// History's most meme-able humans (long dead),
// parody sports & music icons (names transformed),
// cryptids, and decorated war animals.
// ============================================

import { getImageUrl } from '@/lib/avatar';
import type { PresetCard } from '@/data/presetCards';

export const EXPANSION_B: PresetCard[] = [
  // ── Historical bangers ──
  {
    name: 'Joan of Arc', nickname: 'Heard Voices, Chose Violence',
    stats: [
      { label: 'Divine Mandate', value: 95, emoji: '⚡' },
      { label: 'Teenage Confidence', value: 99, emoji: '💪' },
      { label: 'Armor Fit (Tailored)', value: 88, emoji: '🛡️' },
      { label: 'Trial Injustice Survived', value: 93, emoji: '⚖️' },
      { label: 'Siege Breaking', value: 92, emoji: '🏰' },
      { label: 'Legacy Rehabilitation', value: 97, emoji: '👼' },
    ], rarity: 'legendary', image: getImageUrl('Joan of Arc') },
  {
    name: 'Vlad the Impaler', nickname: 'Hostile Landlord',
    stats: [
      { label: 'Deterrent Landscaping', value: 98, emoji: '🪵' },
      { label: 'Dinner Party Intimidation', value: 97, emoji: '🕯️' },
      { label: 'Ottoman Annoyance', value: 95, emoji: '⚔️' },
      { label: 'Infamy Cultivation', value: 95, emoji: '📰' },
      { label: 'Vampire Lore Spawned', value: 93, emoji: '🧛' },
      { label: 'Tenant Turnover', value: 96, emoji: '🏠' },
    ], rarity: 'legendary', image: getImageUrl('Vlad the Impaler') },
  {
    name: 'Caligula', nickname: 'HR Nightmare',
    stats: [
      { label: 'Executive Decisions (Unhinged)', value: 97, emoji: '👑' },
      { label: 'Horse Promotion Boldness', value: 95, emoji: '🐴' },
      { label: 'Senate Intimidation', value: 93, emoji: '🏛️' },
      { label: 'Party Budget Scale', value: 97, emoji: '💸' },
      { label: 'Declaring War On The Sea', value: 90, emoji: '🌊' },
      { label: 'Reign Duration', value: 20, emoji: '⏳' },
    ], rarity: 'gold', image: getImageUrl('Caligula') },
  {
    name: 'Nero', nickname: 'Fiddled Through It',
    stats: [
      { label: 'Crisis Musicianship', value: 97, emoji: '🎻' },
      { label: 'Fire Safety Protocol', value: 4, emoji: '🔥' },
      { label: 'Blame Redirection', value: 92, emoji: '👉' },
      { label: 'Poetry Recital Hostages', value: 85, emoji: '🎭' },
      { label: 'Mother Relations', value: 2, emoji: '💐' },
      { label: 'Denial Mastery', value: 95, emoji: '🪞' },
    ], rarity: 'silver', image: getImageUrl('Nero') },
  {
    name: 'Ivan the Terrible', nickname: 'Named By His Critics',
    stats: [
      { label: 'Nickname Accuracy', value: 94, emoji: '🏷️' },
      { label: 'Anger Management', value: 6, emoji: '😡' },
      { label: 'Fortress Aesthetic', value: 90, emoji: '🏰' },
      { label: 'Paranoia Productivity', value: 88, emoji: '👀' },
      { label: 'Family Dinner Terror', value: 97, emoji: '🍽️' },
      { label: 'Territory Expansion', value: 86, emoji: '🗺️' },
    ], rarity: 'gold', image: getImageUrl('Ivan the Terrible') },
  {
    name: 'Catherine the Great', nickname: 'The Enlightened Boss',
    stats: [
      { label: 'Coup Execution', value: 93, emoji: '👑' },
      { label: 'Enlightenment Sponsorship', value: 90, emoji: '💡' },
      { label: 'Empire Expansion', value: 92, emoji: '🗺️' },
      { label: 'Rumor Mill Survival', value: 85, emoji: '🗣️' },
      { label: 'Husband Retention', value: 10, emoji: '💍' },
      { label: 'Art Collection Flex', value: 94, emoji: '🖼️' },
    ], rarity: 'gold', image: getImageUrl('Catherine the Great') },
  {
    name: 'Galileo Galilei', nickname: 'And Yet It Moves',
    stats: [
      { label: 'Telescope Aim', value: 95, emoji: '🔭' },
      { label: 'Being Right Too Early', value: 97, emoji: '⏰' },
      { label: 'Church Diplomacy', value: 12, emoji: '⛪' },
      { label: 'House Arrest Productivity', value: 88, emoji: '🏠' },
      { label: 'Muttering Under Breath', value: 93, emoji: '🤫' },
      { label: 'Eventual Apology Received', value: 70, emoji: '📜' },
    ], rarity: 'gold', image: getImageUrl('Galileo Galilei') },
  {
    name: 'Isaac Newton', nickname: 'Apple Incident Survivor',
    stats: [
      { label: 'Gravity Comprehension', value: 99, emoji: '🍎' },
      { label: 'Inventing Calculus (Spite)', value: 97, emoji: '📐' },
      { label: 'Grudge Duration', value: 98, emoji: '⏳' },
      { label: 'Social Frostiness', value: 98, emoji: '🧊' },
      { label: 'Alchemy Side Quest Hours', value: 90, emoji: '⚗️' },
      { label: 'Credit Hoarding', value: 99, emoji: '🤝' },
    ], rarity: 'legendary', image: getImageUrl('Isaac Newton') },
  {
    name: 'Charles Darwin', nickname: 'Finch Enjoyer',
    stats: [
      { label: 'Finch Differentiation', value: 96, emoji: '🐦' },
      { label: 'Publication Procrastination', value: 92, emoji: '📚' },
      { label: 'Boat Trip Endurance', value: 85, emoji: '⛵' },
      { label: 'Barnacle Obsession Years', value: 90, emoji: '🦪' },
      { label: 'Controversy Comfort', value: 30, emoji: '🔥' },
      { label: 'Beard Progression', value: 94, emoji: '🧔' },
    ], rarity: 'gold', image: getImageUrl('Charles Darwin') },
  {
    name: 'Sigmund Freud', nickname: 'Tell Me About Your Mother',
    stats: [
      { label: 'Mother Mentions Per Session', value: 96, emoji: '👩' },
      { label: 'Cigar Symbolism Denial', value: 90, emoji: '🚬' },
      { label: 'Theory Falsifiability', value: 12, emoji: '🔬' },
      { label: 'Couch Investment', value: 93, emoji: '🛋️' },
      { label: 'Everything Being About One Thing', value: 95, emoji: '🧠' },
      { label: 'Billing Structure', value: 88, emoji: '💰' },
    ], rarity: 'silver', image: getImageUrl('Sigmund Freud') },
  {
    name: 'William Shakespeare', nickname: 'Invented Your Vocabulary',
    stats: [
      { label: 'Words Coined', value: 98, emoji: '📖' },
      { label: 'Plot Borrowing', value: 88, emoji: '🔄' },
      { label: 'Insult Craftsmanship', value: 97, emoji: '🗡️' },
      { label: 'Everyone Dies Endings', value: 92, emoji: '💀' },
      { label: 'Homework Generated (Centuries)', value: 99, emoji: '📝' },
      { label: 'Actually Existing Debate', value: 75, emoji: '❓' },
    ], rarity: 'legendary', image: getImageUrl('William Shakespeare') },
  {
    name: 'Vincent van Gogh', nickname: 'Sold One (1) Painting',
    stats: [
      { label: 'Starry Night Rendering', value: 99, emoji: '🌌' },
      { label: 'Lifetime Sales', value: 2, emoji: '💰' },
      { label: 'Posthumous Market Cap', value: 99, emoji: '📈' },
      { label: 'Ear Sacrifice Commitment', value: 93, emoji: '👂' },
      { label: 'Letter Writing To Theo', value: 94, emoji: '✉️' },
      { label: 'Yellow Paint Enthusiasm', value: 92, emoji: '🟡' },
    ], rarity: 'gold', image: getImageUrl('Vincent van Gogh') },
  {
    name: 'Mansa Musa', nickname: 'Inflation Machine',
    stats: [
      { label: 'Wealth (Adjusted)', value: 99, emoji: '💰' },
      { label: 'Gold Distribution Casualness', value: 96, emoji: '🪙' },
      { label: 'Economy Crashing (Accidental)', value: 93, emoji: '📉' },
      { label: 'Pilgrimage Entourage Size', value: 95, emoji: '🐫' },
      { label: 'Budget Transcendence', value: 99, emoji: '📊' },
      { label: 'Timbuktu Investment', value: 90, emoji: '🏛️' },
    ], rarity: 'legendary', image: getImageUrl('Mansa Musa') },
  {
    name: 'Emperor Norton', nickname: 'Self-Declared, Locally Beloved',
    stats: [
      { label: 'Self-Coronation Confidence', value: 97, emoji: '👑' },
      { label: 'Actual Authority', value: 3, emoji: '📜' },
      { label: 'Currency Acceptance (Local)', value: 85, emoji: '💵' },
      { label: 'City Adoration', value: 92, emoji: '❤️' },
      { label: 'Decree Quality', value: 88, emoji: '🖋️' },
      { label: 'Bridge Prophecy Accuracy', value: 90, emoji: '🌉' },
    ], rarity: 'silver', image: getImageUrl('Emperor Norton') },
  {
    name: 'Timothy Dexter', nickname: 'Failed Upward Forever',
    stats: [
      { label: 'Coal To Newcastle Profit', value: 95, emoji: '⛏️' },
      { label: 'Business Logic', value: 4, emoji: '🧮' },
      { label: 'Luck Density', value: 98, emoji: '🍀' },
      { label: 'Faking Own Funeral', value: 90, emoji: '⚰️' },
      { label: 'Punctuation Usage', value: 2, emoji: '✒️' },
      { label: 'Haters Proven Wrong', value: 93, emoji: '😤' },
    ], rarity: 'silver', image: getImageUrl('Timothy Dexter') },
  {
    name: 'Senator Incitatus', nickname: "Caligula's Horse, Confirmed",
    stats: [
      { label: 'Senate Attendance', value: 88, emoji: '🏛️' },
      { label: 'Policy Positions', value: 5, emoji: '📋' },
      { label: 'Marble Stable Luxury', value: 96, emoji: '🏰' },
      { label: 'Oat Budget', value: 94, emoji: '🌾' },
      { label: 'Bribery Immunity (Is Horse)', value: 96, emoji: '💰' },
      { label: 'Being A Horse', value: 99, emoji: '🐴' },
    ], rarity: 'gold', image: getImageUrl('Senator Incitatus') },
  {
    name: 'Pythagoras', nickname: 'Triangle Cult Leader',
    stats: [
      { label: 'Triangle Mastery', value: 99, emoji: '📐' },
      { label: 'Bean Phobia', value: 97, emoji: '🫘' },
      { label: 'Cult Management', value: 88, emoji: '🕯️' },
      { label: 'Theorem Branding', value: 95, emoji: '™️' },
      { label: 'Irrational Number Acceptance', value: 6, emoji: '🌀' },
      { label: 'Homework Generated (Millennia)', value: 96, emoji: '📝' },
    ], rarity: 'silver', image: getImageUrl('Pythagoras') },
  {
    name: 'Archimedes', nickname: 'Naked Eureka Sprinter',
    stats: [
      { label: 'Bathtub Insights', value: 96, emoji: '🛁' },
      { label: 'Clothing Optional Science', value: 90, emoji: '🏃' },
      { label: 'Lever Confidence', value: 95, emoji: '🌍' },
      { label: 'Circle Protection Instinct', value: 93, emoji: '⭕' },
      { label: 'Soldier Diplomacy', value: 4, emoji: '🗡️' },
      { label: 'Siege Engine Craft', value: 91, emoji: '🏹' },
    ], rarity: 'silver', image: getImageUrl('Archimedes') },
  {
    name: 'Ada Lovelace', nickname: 'Debugged The 1840s',
    stats: [
      { label: 'Programming (Pre-Computer)', value: 97, emoji: '💻' },
      { label: 'Vision Ahead Of Century', value: 96, emoji: '🔮' },
      { label: 'Poetic Science', value: 90, emoji: '✒️' },
      { label: 'Recognition Timeliness', value: 10, emoji: '⏰' },
      { label: 'Gambling Ambition', value: 88, emoji: '🎰' },
      { label: 'Founding An Entire Field', value: 94, emoji: '🏗️' },
    ], rarity: 'gold', image: getImageUrl('Ada Lovelace') },
  {
    name: 'Blackbeard', nickname: 'Fuse Beard Aesthetic',
    stats: [
      { label: 'Beard Pyrotechnics', value: 96, emoji: '🔥' },
      { label: 'Intimidation Theater', value: 94, emoji: '🎭' },
      { label: 'Ship Acquisition (Informal)', value: 92, emoji: '🏴‍☠️' },
      { label: 'Retirement Planning', value: 8, emoji: '🏖️' },
      { label: 'Treasure Secrecy', value: 95, emoji: '🗺️' },
      { label: 'Final Battle Stamina', value: 88, emoji: '⚔️' },
    ], rarity: 'gold', image: getImageUrl('Blackbeard') },
  {
    name: 'Spartacus', nickname: 'Union Organizer, Original',
    stats: [
      { label: 'Gladiator Solidarity', value: 96, emoji: '✊' },
      { label: 'Rome Embarrassment Caused', value: 93, emoji: '🏛️' },
      { label: 'Escape Coordination', value: 90, emoji: '🗺️' },
      { label: 'Identity Confusion Caused', value: 95, emoji: '🗣️' },
      { label: 'Alps Crossing Commitment', value: 40, emoji: '🏔️' },
      { label: 'Legacy In Films', value: 92, emoji: '🎬' },
    ], rarity: 'gold', image: getImageUrl('Spartacus') },
  {
    name: 'Hatshepsut', nickname: 'Wore The Beard Anyway',
    stats: [
      { label: 'Pharaoh Drip (Ceremonial)', value: 93, emoji: '👑' },
      { label: 'Glass Ceiling (Sandstone)', value: 90, emoji: '🔨' },
      { label: 'Trade Route Expansion', value: 88, emoji: '⛵' },
      { label: 'Monument Budget', value: 91, emoji: '🗿' },
      { label: 'Successor Gratitude', value: 5, emoji: '🙏' },
      { label: 'Being Chiseled Out Of History', value: 12, emoji: '🪨' },
    ], rarity: 'silver', image: getImageUrl('Hatshepsut') },
  {
    name: 'Dancing Plague Patient Zero', nickname: "Couldn't Stop, Wouldn't Stop",
    stats: [
      { label: 'Cardio Endurance', value: 95, emoji: '💃' },
      { label: 'Explanation Available', value: 3, emoji: '❓' },
      { label: 'Crowd Recruitment', value: 90, emoji: '👯' },
      { label: 'Stopping Ability', value: 2, emoji: '🛑' },
      { label: 'Playlist Variety (1518)', value: 15, emoji: '🎶' },
      { label: 'Historical Confusion Caused', value: 93, emoji: '📚' },
    ], rarity: 'bronze', image: getImageUrl('Dancing Plague Patient Zero') },

  // ── Sports parodies ──
  {
    name: 'Air Goatness', nickname: 'Six Rings, Zero Chill',
    stats: [
      { label: 'Ring Collection', value: 98, emoji: '💍' },
      { label: 'Taking It Personally', value: 99, emoji: '😤' },
      { label: 'Hang Time', value: 97, emoji: '🕊️' },
      { label: 'Golf Wagering Volume', value: 96, emoji: '⛳' },
      { label: 'Comeback Inevitability', value: 94, emoji: '🔙' },
      { label: 'Crying Meme Immortality', value: 95, emoji: '😢' },
    ], rarity: 'legendary', image: getImageUrl('Air Goatness') },
  {
    name: 'Leo Pessi', nickname: 'Left Foot of God',
    stats: [
      { label: 'Left Foot Sorcery', value: 99, emoji: '🦶' },
      { label: 'Gravity Defiance', value: 94, emoji: '🌍' },
      { label: 'Tax Paperwork Trauma', value: 88, emoji: '📋' },
      { label: 'Walking Efficiency', value: 96, emoji: '🚶' },
      { label: 'World Cup Completion', value: 95, emoji: '🏆' },
      { label: 'Humility Per Goal', value: 92, emoji: '🙇' },
    ], rarity: 'legendary', image: getImageUrl('Leo Pessi') },
  {
    name: 'Cris Penaldo', nickname: 'SIUUU Machine',
    stats: [
      { label: 'SIUUU Altitude', value: 97, emoji: '🦘' },
      { label: 'Penalty Magnetism', value: 94, emoji: '🧲' },
      { label: 'Abs Definition', value: 98, emoji: '💪' },
      { label: 'Soda Removal Impact', value: 90, emoji: '🥤' },
      { label: 'Aging Denial', value: 95, emoji: '⏳' },
      { label: 'Statue Superiority', value: 94, emoji: '🗿' },
    ], rarity: 'legendary', image: getImageUrl('Cris Penaldo') },
  {
    name: 'Insane Jolt', nickname: 'Chose Violence Against Physics',
    stats: [
      { label: 'Straight Line Speed', value: 99, emoji: '⚡' },
      { label: 'Mid-Race Showboating', value: 93, emoji: '😎' },
      { label: 'Chicken Nugget Fuel', value: 99, emoji: '🍗' },
      { label: 'Pose Trademark Power', value: 95, emoji: '🏹' },
      { label: 'Second Place Familiarity', value: 4, emoji: '🥈' },
      { label: 'Soccer Career Attempt', value: 70, emoji: '⚽' },
    ], rarity: 'gold', image: getImageUrl('Insane Jolt') },
  {
    name: 'Serena Willpower', nickname: '23 Reasons To Quit Arguing',
    stats: [
      { label: 'Grand Slam Hoarding', value: 98, emoji: '🏆' },
      { label: 'Serve Velocity', value: 96, emoji: '🎾' },
      { label: 'Comeback Authorship', value: 94, emoji: '📖' },
      { label: 'Line Call Fury', value: 95, emoji: '🤨' },
      { label: 'Era Domination Length', value: 97, emoji: '📅' },
      { label: 'Business Empire', value: 90, emoji: '💼' },
    ], rarity: 'legendary', image: getImageUrl('Serena Willpower') },
  {
    name: 'Lion Woods', nickname: 'Comeback Arc Speedrun',
    stats: [
      { label: 'Major Sunday Reds', value: 95, emoji: '🔴' },
      { label: 'Putt Clutchness', value: 94, emoji: '⛳' },
      { label: 'Comeback Frequency', value: 92, emoji: '🔄' },
      { label: 'Fire Hydrant Avoidance', value: 10, emoji: '🚒' },
      { label: 'Fist Pump Voltage', value: 93, emoji: '✊' },
      { label: 'Surgery Comeback Count', value: 94, emoji: '🦵' },
    ], rarity: 'gold', image: getImageUrl('Lion Woods') },
  {
    name: 'Wayne Greatzky', nickname: 'Skated Where It Was Going',
    stats: [
      { label: 'Puck Precognition', value: 99, emoji: '🔮' },
      { label: 'Record Unbreakability', value: 97, emoji: '📊' },
      { label: 'Physical Intimidation', value: 25, emoji: '💪' },
      { label: 'Being The Reference Quote', value: 96, emoji: '💬' },
      { label: 'Trade Trauma Caused (Canada)', value: 90, emoji: '🍁' },
      { label: 'Great One Trademark', value: 94, emoji: '™️' },
    ], rarity: 'gold', image: getImageUrl('Wayne Greatzky') },
  {
    name: 'Yogi Barely', nickname: 'Quote Machine',
    stats: [
      { label: 'Accidental Philosophy', value: 92, emoji: '💭' },
      { label: 'It Being Over Till It Is', value: 94, emoji: '⏰' },
      { label: 'Fork In Road Navigation', value: 90, emoji: '🍴' },
      { label: 'Sentence Coherence', value: 20, emoji: '📝' },
      { label: 'Catching Fundamentals', value: 92, emoji: '🧤' },
      { label: 'Déjà Vu All Over Again', value: 92, emoji: '🔁' },
    ], rarity: 'silver', image: getImageUrl('Yogi Barely') },
  {
    name: 'Dennis Rodzilla', nickname: 'Rebound & Chaos',
    stats: [
      { label: 'Rebound Magnetism', value: 97, emoji: '🏀' },
      { label: 'Hair Color Rotation', value: 95, emoji: '🌈' },
      { label: 'Vegas Trip Timing', value: 88, emoji: '🎰' },
      { label: 'Diplomatic Missions (Unsanctioned)', value: 85, emoji: '🕊️' },
      { label: 'Wedding Dress Ownership', value: 90, emoji: '👰' },
      { label: 'Predictability', value: 3, emoji: '📅' },
    ], rarity: 'gold', image: getImageUrl('Dennis Rodzilla') },
  {
    name: 'The Zamboni Guy', nickname: 'Smoothest Operator',
    stats: [
      { label: 'Ice Perfection', value: 85, emoji: '🧊' },
      { label: 'Intermission Stardom', value: 80, emoji: '🌟' },
      { label: 'Turning Radius Patience', value: 90, emoji: '🔄' },
      { label: 'Speed Demands', value: 6, emoji: '🐌' },
      { label: 'Job Satisfaction', value: 85, emoji: '😌' },
      { label: 'Emergency Goalie Readiness', value: 45, emoji: '🥅' },
    ], rarity: 'bronze', image: getImageUrl('The Zamboni Guy') },

  // ── Music & entertainment parodies ──
  {
    name: 'Tailor Quick', nickname: 'Wrote A Song About This',
    stats: [
      { label: 'Ex Documentation', value: 97, emoji: '📝' },
      { label: 'Era Transition Mastery', value: 96, emoji: '🦋' },
      { label: 'Easter Egg Density', value: 95, emoji: '🥚' },
      { label: 'Stadium Seismic Activity', value: 93, emoji: '📈' },
      { label: 'Masters Reclamation', value: 98, emoji: '🎖️' },
      { label: 'Paparazzi Material Provided', value: 96, emoji: '📸' },
    ], rarity: 'legendary', image: getImageUrl('Tailor Quick') },
  {
    name: 'The Hive Queen', nickname: 'Flawless Execution',
    stats: [
      { label: 'Performance Precision', value: 99, emoji: '🎯' },
      { label: 'Surprise Drop Stealth', value: 95, emoji: '🤫' },
      { label: 'Fanbase Mobilization', value: 97, emoji: '🐝' },
      { label: 'Interview Scarcity', value: 99, emoji: '🎤' },
      { label: 'Halftime Show Bar', value: 98, emoji: '🏟️' },
      { label: 'Off Days Concealment', value: 99, emoji: '📅' },
    ], rarity: 'legendary', image: getImageUrl('The Hive Queen') },
  {
    name: 'Slim Shadow', nickname: 'Will Really Stand Up',
    stats: [
      { label: 'Syllables Per Second', value: 98, emoji: '💨' },
      { label: 'Mom Spaghetti Composure', value: 15, emoji: '🍝' },
      { label: 'Alter Ego Management', value: 88, emoji: '🎭' },
      { label: 'Beef Longevity', value: 92, emoji: '🥩' },
      { label: 'Apology Songs To Mom', value: 80, emoji: '💐' },
      { label: 'Radio Censor Fatigue', value: 96, emoji: '📻' },
    ], rarity: 'gold', image: getImageUrl('Slim Shadow') },
  {
    name: 'Drayke', nickname: 'Started From The Meme',
    stats: [
      { label: 'Meme Format Generation', value: 95, emoji: '🖼️' },
      { label: 'Chart Occupation', value: 93, emoji: '📊' },
      { label: 'Beef Win Rate', value: 30, emoji: '🥩' },
      { label: 'Sad Boi Hours', value: 90, emoji: '🌧️' },
      { label: 'Courtside Emotions', value: 92, emoji: '🏀' },
      { label: 'Album Length Maximalism', value: 94, emoji: '💿' },
    ], rarity: 'gold', image: getImageUrl('Drayke') },
  {
    name: 'Bad Rabbit', nickname: 'El Conejo Malo',
    stats: [
      { label: 'Reggaeton Gravity', value: 96, emoji: '🎵' },
      { label: 'Language Barrier Demolition', value: 94, emoji: '🌎' },
      { label: 'Nail Polish Game', value: 90, emoji: '💅' },
      { label: 'Wrestling Cameo Quality', value: 88, emoji: '🤼' },
      { label: 'Phone Throwing Incidents', value: 70, emoji: '📱' },
      { label: 'Streaming Records Held', value: 95, emoji: '📈' },
    ], rarity: 'gold', image: getImageUrl('Bad Rabbit') },
  {
    name: 'Willie Nelsun', nickname: 'Outlaw Botanist',
    stats: [
      { label: 'Braid Longevity', value: 93, emoji: '💇' },
      { label: 'Botanical Enthusiasm', value: 97, emoji: '🌿' },
      { label: 'IRS Negotiation Experience', value: 88, emoji: '💸' },
      { label: 'Tour Bus Mileage', value: 94, emoji: '🚌' },
      { label: 'Outliving Everyone', value: 94, emoji: '⏳' },
      { label: 'Guitar Hole Authenticity', value: 92, emoji: '🎸' },
    ], rarity: 'gold', image: getImageUrl('Willie Nelsun') },
  {
    name: 'Lil Blimp', nickname: 'SoundCloud Admiral',
    stats: [
      { label: 'Face Tattoo Density', value: 90, emoji: '🖋️' },
      { label: 'Mixtape Fire (Claimed)', value: 85, emoji: '🔥' },
      { label: 'Mixtape Fire (Actual)', value: 20, emoji: '🧯' },
      { label: 'Ad-Lib Vocabulary', value: 88, emoji: '🗣️' },
      { label: 'Financial Planning', value: 5, emoji: '📊' },
      { label: 'Chain Weight Per Net Worth', value: 93, emoji: '⛓️' },
    ], rarity: 'bronze', image: getImageUrl('Lil Blimp') },
  {
    name: 'Festival DJ', nickname: 'Press Play Artist',
    stats: [
      { label: 'Button Pressing Theater', value: 92, emoji: '🎛️' },
      { label: 'Hands Up Demands', value: 95, emoji: '🙌' },
      { label: 'Actual Live Mixing', value: 15, emoji: '🎚️' },
      { label: 'Drop Anticipation Craft', value: 88, emoji: '⏳' },
      { label: 'Jesus Pose Frequency', value: 90, emoji: '🙏' },
      { label: 'Set Uniqueness', value: 12, emoji: '🔁' },
    ], rarity: 'silver', image: getImageUrl('Festival DJ') },
  {
    name: 'Garage Band Dad', nickname: 'One Pedal Away From Fame',
    stats: [
      { label: 'Pedal Board Investment', value: 93, emoji: '🎛️' },
      { label: 'Gig Frequency', value: 10, emoji: '📅' },
      { label: 'Wonderwall Resistance', value: 25, emoji: '🎸' },
      { label: 'Neighbor Patience Consumed', value: 85, emoji: '🏠' },
      { label: 'Almost Made It Stories', value: 92, emoji: '📖' },
      { label: 'Tone Chasing Budget', value: 90, emoji: '💸' },
    ], rarity: 'bronze', image: getImageUrl('Garage Band Dad') },
  {
    name: 'K-Pop Trainee', nickname: 'Year 7 Of The Grind',
    stats: [
      { label: 'Choreo Precision', value: 94, emoji: '💃' },
      { label: 'Practice Room Residency', value: 97, emoji: '🏢' },
      { label: 'Debut Proximity', value: 30, emoji: '🌅' },
      { label: 'Vocal Run Stamina', value: 90, emoji: '🎤' },
      { label: 'Free Time', value: 2, emoji: '🕐' },
      { label: 'Main Character Potential', value: 85, emoji: '🌟' },
    ], rarity: 'silver', image: getImageUrl('K-Pop Trainee') },

  // ── Cryptids & folklore ──
  {
    name: 'Bigfoot', nickname: 'Blurry On Purpose',
    stats: [
      { label: 'Camera Evasion', value: 99, emoji: '📷' },
      { label: 'Footprint Generosity', value: 92, emoji: '🦶' },
      { label: 'Forest Stealth (Size XXL)', value: 95, emoji: '🌲' },
      { label: 'Interview Evasion', value: 99, emoji: '🎤' },
      { label: 'Merchandise Empire (Unpaid)', value: 90, emoji: '👕' },
      { label: 'Existence Commitment', value: 88, emoji: '❓' },
    ], rarity: 'legendary', image: getImageUrl('Bigfoot') },
  {
    name: 'Mothman', nickname: 'Prophecy Enjoyer',
    stats: [
      { label: 'Red Eye Luminosity', value: 94, emoji: '👁️' },
      { label: 'Bridge Timing', value: 90, emoji: '🌉' },
      { label: 'Warning Clarity', value: 12, emoji: '📢' },
      { label: 'Statue Glute Definition', value: 96, emoji: '🍑' },
      { label: 'Festival Headliner Status', value: 88, emoji: '🎪' },
      { label: 'Lamp Restraint (Barely)', value: 88, emoji: '💡' },
    ], rarity: 'gold', image: getImageUrl('Mothman') },
  {
    name: 'The Loch Ness Monster', nickname: 'Tourism Engine',
    stats: [
      { label: 'Sonar Evasion', value: 95, emoji: '📡' },
      { label: 'Scottish GDP Contribution', value: 93, emoji: '💷' },
      { label: 'Photo Quality Control', value: 97, emoji: '📸' },
      { label: 'Surgeon Photo Denial', value: 90, emoji: '🩺' },
      { label: 'Neck Flexibility', value: 88, emoji: '🦕' },
      { label: 'About Tree Fiddy Owed', value: 85, emoji: '💰' },
    ], rarity: 'gold', image: getImageUrl('The Loch Ness Monster') },
  {
    name: 'Chupacabra', nickname: 'Goat GOAT',
    stats: [
      { label: 'Goat Menace Level', value: 93, emoji: '🐐' },
      { label: 'Description Consistency', value: 8, emoji: '📝' },
      { label: 'Border Hopping (Folklore)', value: 90, emoji: '🗺️' },
      { label: 'Mange Coyote Disguise', value: 85, emoji: '🐺' },
      { label: 'Farmer Testimony Generation', value: 95, emoji: '👨‍🌾' },
      { label: 'PR Team', value: 2, emoji: '📰' },
    ], rarity: 'silver', image: getImageUrl('Chupacabra') },
  {
    name: 'The Yeti', nickname: 'Alpine Introvert',
    stats: [
      { label: 'Altitude Comfort', value: 96, emoji: '🏔️' },
      { label: 'Social Battery', value: 5, emoji: '🔋' },
      { label: 'Snow Camouflage', value: 92, emoji: '❄️' },
      { label: 'Cooler Brand Confusion', value: 88, emoji: '🧊' },
      { label: 'Climber Avoidance', value: 94, emoji: '🧗' },
      { label: 'Footprint Mystery Upkeep', value: 90, emoji: '👣' },
    ], rarity: 'silver', image: getImageUrl('The Yeti') },
  {
    name: 'Jersey Devil', nickname: 'Pine Barrens HOA',
    stats: [
      { label: 'Thirteenth Child Energy', value: 80, emoji: '1️⃣3️⃣' },
      { label: 'Wing Aerodynamics (Cursed)', value: 85, emoji: '🦇' },
      { label: 'Screech Acoustics', value: 80, emoji: '📢' },
      { label: 'Turnpike Avoidance', value: 78, emoji: '🛣️' },
      { label: 'Hockey Team Inspiration', value: 78, emoji: '🏒' },
      { label: 'Diner Loyalty', value: 75, emoji: '🍳' },
    ], rarity: 'silver', image: getImageUrl('Jersey Devil') },
  {
    name: 'The Kraken', nickname: 'Release Conditions Apply',
    stats: [
      { label: 'Ship Hugging Strength', value: 99, emoji: '🐙' },
      { label: 'Release Dramatics', value: 97, emoji: '🌊' },
      { label: 'Patience In The Deep', value: 94, emoji: '⏳' },
      { label: 'Sailor Diplomacy', value: 3, emoji: '⚓' },
      { label: 'Ink Budget', value: 92, emoji: '🖤' },
      { label: 'Myth Persistence', value: 95, emoji: '📜' },
    ], rarity: 'holo', image: getImageUrl('The Kraken') },
  {
    name: 'Area 51 Intern', nickname: 'Seen Things, Signed NDAs',
    stats: [
      { label: 'NDA Stack Height', value: 95, emoji: '📄' },
      { label: 'Poker Face Under Questioning', value: 88, emoji: '😐' },
      { label: 'Badge Clearance Envy', value: 90, emoji: '🪪' },
      { label: 'Weather Balloon Explanations', value: 93, emoji: '🎈' },
      { label: 'Naruto Run Defense Training', value: 85, emoji: '🏃' },
      { label: 'Telling Their Therapist', value: 4, emoji: '🛋️' },
    ], rarity: 'silver', image: getImageUrl('Area 51 Intern') },

  // ── Heroic animals ──
  {
    name: 'Wojtek the Bear', nickname: 'Ammo Bear, Corporal',
    stats: [
      { label: 'Artillery Logistics', value: 94, emoji: '📦' },
      { label: 'Beer Ration Enthusiasm', value: 92, emoji: '🍺' },
      { label: 'Morale Generation', value: 96, emoji: '❤️' },
      { label: 'Wrestling (Friendly)', value: 90, emoji: '🤼' },
      { label: 'Military Paperwork Correctness', value: 88, emoji: '📋' },
      { label: 'Being A Literal Bear', value: 99, emoji: '🐻' },
    ], rarity: 'legendary', image: getImageUrl('Wojtek the Bear') },
  {
    name: 'Cher Ami', nickname: 'Message Delivered Anyway',
    stats: [
      { label: 'Delivery Commitment', value: 99, emoji: '✉️' },
      { label: 'Battle Damage Tolerance', value: 95, emoji: '🩹' },
      { label: 'Lives Saved Per Gram', value: 97, emoji: '⚖️' },
      { label: 'Flight Path Optimism', value: 90, emoji: '🕊️' },
      { label: 'Medal Collection', value: 90, emoji: '🏅' },
      { label: 'Excuse Making', value: 2, emoji: '🤷' },
    ], rarity: 'gold', image: getImageUrl('Cher Ami') },
  {
    name: 'Unsinkable Sam', nickname: 'Three Ships, Zero Regrets',
    stats: [
      { label: 'Shipwreck Survival', value: 99, emoji: '🚢' },
      { label: 'Navy Allegiance Flexibility', value: 90, emoji: '🏳️' },
      { label: 'Floating Board Acquisition', value: 95, emoji: '🪵' },
      { label: 'Bad Omen Reputation', value: 88, emoji: '🐈‍⬛' },
      { label: 'Ninth Life Conservation', value: 92, emoji: '9️⃣' },
      { label: 'Sea Career Enthusiasm', value: 15, emoji: '⚓' },
    ], rarity: 'gold', image: getImageUrl('Unsinkable Sam') },
  {
    name: 'Laika', nickname: 'Good Girl, Star Sailor',
    stats: [
      { label: 'Bravery Per Kilogram', value: 99, emoji: '🚀' },
      { label: 'Orbit Achievement (First Ever)', value: 98, emoji: '🌍' },
      { label: 'Good Girl Rating', value: 99, emoji: '🐕' },
      { label: 'Mission Trust', value: 99, emoji: '📋' },
      { label: 'Deserving Better', value: 99, emoji: '💔' },
      { label: 'Monument Count', value: 90, emoji: '🗿' },
    ], rarity: 'legendary', image: getImageUrl('Laika') },
  {
    name: 'Emu War Veteran', nickname: 'Undefeated (The Emu)',
    stats: [
      { label: 'Machine Gun Evasion', value: 96, emoji: '💨' },
      { label: 'Military Humiliation Dealt', value: 98, emoji: '🎖️' },
      { label: 'Guerrilla Tactics (Instinct)', value: 92, emoji: '🌾' },
      { label: 'Peace Treaty Interest', value: 5, emoji: '🕊️' },
      { label: 'Wheat Field Occupation', value: 94, emoji: '🚜' },
      { label: 'Moral High Ground', value: 99, emoji: '⚖️' },
    ], rarity: 'gold', image: getImageUrl('Emu War Veteran') },
  {
    name: 'Balto', nickname: 'The Serum Run',
    stats: [
      { label: 'Blizzard Navigation', value: 96, emoji: '🌨️' },
      { label: 'Serum Delivery Clutch', value: 97, emoji: '💉' },
      { label: 'Team Leadership (Sled)', value: 93, emoji: '🛷' },
      { label: 'Statue Placement (Central Park)', value: 90, emoji: '🗽' },
      { label: 'Credit Sharing With Togo', value: 25, emoji: '🤝' },
      { label: 'Good Boy Rating', value: 99, emoji: '🐕' },
    ], rarity: 'gold', image: getImageUrl('Balto') },
];
