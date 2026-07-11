// ============================================
// EXPANSION A — Terminally Online
// Internet culture, gaming archetypes, and the
// entities that rule modern life. All original
// characters or parody archetypes — no real
// names, no real likenesses.
// ============================================

import { getImageUrl } from '@/lib/avatar';
import type { PresetCard } from '@/data/presetCards';

export const EXPANSION_A: PresetCard[] = [
  // ── Internet & memes ──
  {
    name: 'Grouchy Kat', nickname: 'Permanently Unimpressed',
    stats: [
      { label: 'Disdain Projection', value: 99, emoji: '😾' },
      { label: 'Meme Economy Value', value: 96, emoji: '📈' },
      { label: 'Enthusiasm', value: 3, emoji: '🎉' },
      { label: 'Photogenic Misery', value: 96, emoji: '📸' },
      { label: 'Petting Tolerance', value: 12, emoji: '🖐️' },
      { label: 'Brand Deals Declined', value: 85, emoji: '💼' },
    ], rarity: 'silver', image: getImageUrl('Grouchy Kat') },
  {
    name: 'Rickrolla', nickname: 'You Just Got Got',
    stats: [
      { label: 'Never Giving You Up', value: 99, emoji: '🎤' },
      { label: 'Never Letting You Down', value: 99, emoji: '🤝' },
      { label: 'Refusing To Run Around', value: 99, emoji: '🏃' },
      { label: 'Desertion Immunity', value: 99, emoji: '🏜️' },
      { label: 'Link Disguise Craft', value: 88, emoji: '🔗' },
      { label: 'Eternal Relevance', value: 75, emoji: '♾️' },
    ], rarity: 'legendary', image: getImageUrl('Rickrolla') },
  {
    name: 'The Gigachud', nickname: 'Jawline of Destiny',
    stats: [
      { label: 'Jaw Sharpness', value: 99, emoji: '🗿' },
      { label: 'Black & White Aura', value: 95, emoji: '🎞️' },
      { label: 'Actual Dialogue', value: 10, emoji: '💬' },
      { label: 'Mirror Time', value: 92, emoji: '🪞' },
      { label: 'Average Enjoyer Energy', value: 88, emoji: '👍' },
      { label: 'Humility', value: 74, emoji: '🙇' },
    ], rarity: 'gold', image: getImageUrl('The Gigachud') },
  {
    name: 'Mister Feast', nickname: 'Philanthropy Speedrunner',
    stats: [
      { label: 'Money Given Away', value: 99, emoji: '💸' },
      { label: 'Thumbnail Face', value: 97, emoji: '😱' },
      { label: 'Video Budget Scale', value: 97, emoji: '📉' },
      { label: 'Island Purchases', value: 90, emoji: '🏝️' },
      { label: 'Attention Span Required', value: 98, emoji: '⏱️' },
      { label: 'Chocolate Empire', value: 92, emoji: '🍫' },
    ], rarity: 'legendary', image: getImageUrl('Mister Feast') },
  {
    name: 'PewDeeGuy', nickname: 'Bro Fist Emeritus',
    stats: [
      { label: 'Bro Fists Delivered', value: 99, emoji: '👊' },
      { label: 'Chair Quality', value: 95, emoji: '🪑' },
      { label: 'Retirement Attempts', value: 85, emoji: '🏖️' },
      { label: 'Sub Count Wars Won', value: 90, emoji: '⚔️' },
      { label: 'Floor Gang Loyalty', value: 88, emoji: '🧎' },
      { label: 'Japan Relocation Speed', value: 20, emoji: '🗾' },
    ], rarity: 'gold', image: getImageUrl('PewDeeGuy') },
  {
    name: 'Reply Guy', nickname: 'Well, Actually',
    stats: [
      { label: 'Well Actuallys', value: 97, emoji: '☝️' },
      { label: 'Being Asked', value: 2, emoji: '❓' },
      { label: 'First Reply Speed', value: 90, emoji: '⚡' },
      { label: 'Reading The Article', value: 8, emoji: '📰' },
      { label: 'Blocking Recovery', value: 55, emoji: '🚫' },
      { label: 'Source Provision', value: 12, emoji: '📎' },
    ], rarity: 'bronze', image: getImageUrl('Reply Guy') },
  {
    name: 'Doomscroller', nickname: 'Thumb of Iron',
    stats: [
      { label: 'Thumb Stamina', value: 99, emoji: '👍' },
      { label: 'Bedtime Discipline', value: 4, emoji: '😴' },
      { label: 'Bad News Absorption', value: 95, emoji: '📉' },
      { label: 'One More Scroll', value: 98, emoji: '🔄' },
      { label: 'Screen Time Honesty', value: 10, emoji: '📱' },
      { label: 'Morning Regret', value: 88, emoji: '🌅' },
    ], rarity: 'bronze', image: getImageUrl('Doomscroller') },
  {
    name: 'The Lurker', nickname: 'Read 4,000 Posts, Wrote 0',
    stats: [
      { label: 'Post History', value: 1, emoji: '📝' },
      { label: 'Knowledge of Drama', value: 96, emoji: '🍵' },
      { label: 'Account Age', value: 93, emoji: '📅' },
      { label: 'Upvotes Given', value: 85, emoji: '⬆️' },
      { label: 'Being Perceived', value: 5, emoji: '👁️' },
      { label: 'Exit Speed When Tagged', value: 97, emoji: '💨' },
    ], rarity: 'bronze', image: getImageUrl('The Lurker') },
  {
    name: 'Ratio King', nickname: 'Won The Quote Tweets',
    stats: [
      { label: 'Ratio Success Rate', value: 92, emoji: '📊' },
      { label: 'L Distribution', value: 90, emoji: '🇱' },
      { label: 'Own Takes Quality', value: 25, emoji: '🗑️' },
      { label: 'Notification Addiction', value: 88, emoji: '🔔' },
      { label: 'Touch Grass Frequency', value: 8, emoji: '🌱' },
      { label: 'Timing', value: 94, emoji: '⏰' },
    ], rarity: 'silver', image: getImageUrl('Ratio King') },
  {
    name: 'Milk Crate Challenger', nickname: 'Peaked Mid-Stack',
    stats: [
      { label: 'Crate Ascension', value: 70, emoji: '🪜' },
      { label: 'Crate Descension', value: 6, emoji: '🚑' },
      { label: 'Risk Assessment', value: 4, emoji: '⚠️' },
      { label: 'Crowd Energy', value: 92, emoji: '📣' },
      { label: 'Insurance Coverage', value: 2, emoji: '📋' },
      { label: 'Legend Status (Local)', value: 85, emoji: '🏆' },
    ], rarity: 'bronze', image: getImageUrl('Milk Crate Challenger') },
  {
    name: 'NPC Streamer', nickname: 'Ice Cream So Good',
    stats: [
      { label: 'Loop Consistency', value: 95, emoji: '🔁' },
      { label: 'Gift Reaction Speed', value: 92, emoji: '🎁' },
      { label: 'Free Will', value: 8, emoji: '🧠' },
      { label: 'Yes Yes Yes Cadence', value: 90, emoji: '🗣️' },
      { label: 'Hourly Rate', value: 88, emoji: '💰' },
      { label: 'Existential Dread (Hidden)', value: 75, emoji: '🕳️' },
    ], rarity: 'silver', image: getImageUrl('NPC Streamer') },
  {
    name: 'VTuber Prime', nickname: 'The Digital Idol',
    stats: [
      { label: 'Avatar Rigging', value: 94, emoji: '🎭' },
      { label: 'Parasocial Gravity', value: 92, emoji: '🧲' },
      { label: 'True Identity Security', value: 96, emoji: '🕵️' },
      { label: 'Keyboard Volume', value: 85, emoji: '⌨️' },
      { label: 'Lore Complexity', value: 90, emoji: '📖' },
      { label: 'Sleep Schedule', value: 12, emoji: '🌙' },
    ], rarity: 'gold', image: getImageUrl('VTuber Prime') },
  {
    name: 'Speedrun Kid', nickname: 'Any% World Record',
    stats: [
      { label: 'Frame Perfection', value: 97, emoji: '🎯' },
      { label: 'Glitch Exploitation', value: 95, emoji: '🐛' },
      { label: 'Cutscene Skip Speed', value: 99, emoji: '⏭️' },
      { label: 'Attempt Counter', value: 99, emoji: '🔢' },
      { label: 'Splits Anxiety', value: 90, emoji: '📉' },
      { label: 'Indoor Optimization', value: 93, emoji: '🌳' },
    ], rarity: 'legendary', image: getImageUrl('Speedrun Kid') },
  {
    name: 'Wojak Doomer', nickname: "It's Over",
    stats: [
      { label: 'It Being Over', value: 95, emoji: '🌆' },
      { label: 'We Being So Back', value: 15, emoji: '🌅' },
      { label: 'Night Walk Mileage', value: 88, emoji: '🚶' },
      { label: 'Playlist Melancholy', value: 92, emoji: '🎧' },
      { label: 'Hope Reserves', value: 10, emoji: '🕯️' },
      { label: 'Aesthetic Commitment', value: 80, emoji: '🖤' },
    ], rarity: 'bronze', image: getImageUrl('Wojak Doomer') },
  {
    name: 'Sigma Grindset', nickname: '4AM Cold Shower Enjoyer',
    stats: [
      { label: 'Wake Up Hour (Inverse)', value: 96, emoji: '⏰' },
      { label: 'Cold Shower Tolerance', value: 93, emoji: '🚿' },
      { label: 'Hustle Quotes Posted', value: 90, emoji: '📜' },
      { label: 'Actual Revenue', value: 15, emoji: '💵' },
      { label: 'Friends Retained', value: 12, emoji: '👥' },
      { label: 'Grind Authenticity', value: 68, emoji: '⚙️' },
    ], rarity: 'silver', image: getImageUrl('Sigma Grindset') },
  {
    name: 'The Manager Summoner', nickname: 'A Word, Please',
    stats: [
      { label: 'Manager Summons', value: 98, emoji: '🗣️' },
      { label: 'Coupon Expiry Acceptance', value: 4, emoji: '🎟️' },
      { label: 'Haircut Sharpness', value: 90, emoji: '💇' },
      { label: 'Review Threats', value: 92, emoji: '⭐' },
      { label: 'Volume Control', value: 8, emoji: '🔊' },
      { label: 'Corporate Escalation', value: 88, emoji: '📞' },
    ], rarity: 'silver', image: getImageUrl('The Manager Summoner') },
  {
    name: 'Area Man', nickname: "Florida Man's Northern Cousin",
    stats: [
      { label: 'Headline Generation', value: 90, emoji: '📰' },
      { label: 'Reportedly Doing Things', value: 93, emoji: '🗞️' },
      { label: 'Identifying Details', value: 5, emoji: '🪪' },
      { label: 'Local Sources Say', value: 88, emoji: '🎙️' },
      { label: 'Onion Adjacent Energy', value: 85, emoji: '🧅' },
      { label: 'Plausibility', value: 30, emoji: '🤔' },
    ], rarity: 'silver', image: getImageUrl('Area Man') },

  // ── Gaming archetypes ──
  {
    name: 'Rage Quitter', nickname: 'Alt+F4 Warrior',
    stats: [
      { label: 'Quit Speed', value: 97, emoji: '🚪' },
      { label: 'Controller Lifespan', value: 8, emoji: '🎮' },
      { label: 'Lag Blamed', value: 95, emoji: '📶' },
      { label: 'Self Reflection', value: 3, emoji: '🪞' },
      { label: 'Rematch Requests', value: 85, emoji: '🔄' },
      { label: 'Wall Punch Accuracy', value: 60, emoji: '🧱' },
    ], rarity: 'bronze', image: getImageUrl('Rage Quitter') },
  {
    name: 'The Completionist', nickname: '100% or Nothing',
    stats: [
      { label: 'Achievement Hunger', value: 98, emoji: '🏆' },
      { label: 'Skipping Content', value: 2, emoji: '⏭️' },
      { label: 'Collectible Radar', value: 94, emoji: '📡' },
      { label: 'Hours Logged', value: 96, emoji: '⏳' },
      { label: 'Moving On Gracefully', value: 10, emoji: '👋' },
      { label: 'Wiki Contributions', value: 82, emoji: '📚' },
    ], rarity: 'silver', image: getImageUrl('The Completionist') },
  {
    name: 'Loot Goblin', nickname: "It's All Mine",
    stats: [
      { label: 'Inventory Tetris', value: 95, emoji: '🎒' },
      { label: 'Sharing Instinct', value: 4, emoji: '🤲' },
      { label: 'Vendor Trash Hoarding', value: 97, emoji: '🗑️' },
      { label: 'Ninja Looting', value: 90, emoji: '🥷' },
      { label: 'Encumbrance Denial', value: 93, emoji: '⚖️' },
      { label: 'Might Need It Later', value: 99, emoji: '📦' },
    ], rarity: 'silver', image: getImageUrl('Loot Goblin') },
  {
    name: 'Tutorial Boss', nickname: 'Designed To Lose',
    stats: [
      { label: 'Intimidation Intro', value: 88, emoji: '😤' },
      { label: 'Actual Threat Level', value: 6, emoji: '⚔️' },
      { label: 'Telegraphed Attacks', value: 90, emoji: '📢' },
      { label: 'Losing Gracefully', value: 95, emoji: '🎭' },
      { label: 'Teaching Moments', value: 90, emoji: '🏫' },
      { label: 'Rematch Potential', value: 25, emoji: '🔁' },
    ], rarity: 'bronze', image: getImageUrl('Tutorial Boss') },
  {
    name: 'Final Boss', nickname: 'Phase Three Awaits',
    stats: [
      { label: 'Phase Count', value: 95, emoji: '🌗' },
      { label: 'Health Bar Length', value: 98, emoji: '❤️' },
      { label: 'Monologue Duration', value: 92, emoji: '🎙️' },
      { label: 'Arena Destruction', value: 94, emoji: '💥' },
      { label: 'Unfairness', value: 98, emoji: '⚖️' },
      { label: 'Secret Fourth Phase', value: 90, emoji: '👁️' },
    ], rarity: 'legendary', image: getImageUrl('Final Boss') },
  {
    name: 'Side Quest NPC', nickname: '! Above Head',
    stats: [
      { label: 'Exclamation Visibility', value: 93, emoji: '❗' },
      { label: 'Fetch Quest Creativity', value: 12, emoji: '📦' },
      { label: 'Standing In One Spot', value: 99, emoji: '🧍' },
      { label: 'Gratitude Per Rat Killed', value: 88, emoji: '🐀' },
      { label: 'Reward Generosity', value: 20, emoji: '💰' },
      { label: 'Lore Nuggets', value: 75, emoji: '💎' },
    ], rarity: 'bronze', image: getImageUrl('Side Quest NPC') },
  {
    name: 'Pay2Win Whale', nickname: 'Swiped For Power',
    stats: [
      { label: 'Credit Card Endurance', value: 96, emoji: '💳' },
      { label: 'Skill Substitution', value: 92, emoji: '💰' },
      { label: 'Gacha Luck (Purchased)', value: 90, emoji: '🎰' },
      { label: 'Wallet Supremacy', value: 95, emoji: '🤝' },
      { label: 'Server First Flexes', value: 88, emoji: '🏅' },
      { label: 'Statement Avoidance', value: 97, emoji: '📄' },
    ], rarity: 'gold', image: getImageUrl('Pay2Win Whale') },
  {
    name: 'The Dungeon Master', nickname: 'Rocks Fall',
    stats: [
      { label: 'World Building', value: 96, emoji: '🗺️' },
      { label: 'Improv Under Pressure', value: 93, emoji: '🎭' },
      { label: 'Player Herding', value: 60, emoji: '🐑' },
      { label: 'Voice Acting Range', value: 96, emoji: '🎙️' },
      { label: 'Mercy For Murderhobos', value: 20, emoji: '⚰️' },
      { label: 'Snack Table Curation', value: 95, emoji: '🍕' },
    ], rarity: 'gold', image: getImageUrl('The Dungeon Master') },
  {
    name: 'Esports Washout', nickname: 'Retired at 24',
    stats: [
      { label: 'Peak Reflexes (Former)', value: 92, emoji: '⚡' },
      { label: 'Current Reflexes', value: 55, emoji: '🐢' },
      { label: 'Back In My Day Stories', value: 90, emoji: '📖' },
      { label: 'Coaching Pivot', value: 70, emoji: '📋' },
      { label: 'Wrist Health', value: 15, emoji: '🤕' },
      { label: 'One More Comeback', value: 65, emoji: '🔄' },
    ], rarity: 'silver', image: getImageUrl('Esports Washout') },

  // ── Modern archetypes & entities ──
  {
    name: 'Gym Bro', nickname: "It's All Natty",
    stats: [
      { label: 'Mirror Selfie Cadence', value: 92, emoji: '🤳' },
      { label: 'Leg Day Attendance', value: 25, emoji: '🦵' },
      { label: 'Protein Math', value: 88, emoji: '🥤' },
      { label: 'Spotting Reliability', value: 90, emoji: '🤝' },
      { label: 'Rest Day Acceptance', value: 15, emoji: '🛋️' },
      { label: 'Advice Nobody Asked For', value: 85, emoji: '🗣️' },
    ], rarity: 'silver', image: getImageUrl('Gym Bro') },
  {
    name: 'Crypto Bro', nickname: 'Down 97%, Still Bullish',
    stats: [
      { label: 'Diamond Hand Grip', value: 95, emoji: '💎' },
      { label: 'Portfolio Health', value: 4, emoji: '📉' },
      { label: 'WAGMI Conviction', value: 92, emoji: '🚀' },
      { label: 'Explaining It At Parties', value: 88, emoji: '🥳' },
      { label: 'Exit Timing', value: 6, emoji: '🚪' },
      { label: 'Generational Wealth (Soon)', value: 50, emoji: '⏳' },
    ], rarity: 'bronze', image: getImageUrl('Crypto Bro') },
  {
    name: 'LinkedIn Lion', nickname: 'Thrilled To Announce',
    stats: [
      { label: 'Humble Brag Craft', value: 93, emoji: '🙏' },
      { label: 'Thrilled-ness', value: 96, emoji: '🎉' },
      { label: 'Genuine Connection', value: 8, emoji: '❤️' },
      { label: 'Agree? Endings', value: 90, emoji: '❓' },
      { label: 'Hustle Parable Length', value: 80, emoji: '📖' },
      { label: 'Actually Working', value: 30, emoji: '💼' },
    ], rarity: 'bronze', image: getImageUrl('LinkedIn Lion') },
  {
    name: 'Podcast Bro', nickname: 'Two Hours, No Point',
    stats: [
      { label: 'Mic Quality', value: 92, emoji: '🎙️' },
      { label: 'Episode Length Control', value: 5, emoji: '⏰' },
      { label: 'Guest Interruption', value: 88, emoji: '✋' },
      { label: 'Sponsor Read Smoothness', value: 85, emoji: '📻' },
      { label: 'Research Depth', value: 20, emoji: '📚' },
      { label: 'That Reminds Me Of Segues', value: 94, emoji: '🔀' },
    ], rarity: 'silver', image: getImageUrl('Podcast Bro') },
  {
    name: 'Astrology Girlie', nickname: 'Mercury Did This',
    stats: [
      { label: 'Blame Deflection To Planets', value: 96, emoji: '🪐' },
      { label: 'Birth Chart Recall', value: 93, emoji: '📜' },
      { label: 'Red Flag Detection', value: 85, emoji: '🚩' },
      { label: 'Red Flag Avoidance', value: 15, emoji: '🏃' },
      { label: 'Vibe Assessment', value: 90, emoji: '✨' },
      { label: 'Skeptic Conversion', value: 45, emoji: '🔮' },
    ], rarity: 'silver', image: getImageUrl('Astrology Girlie') },
  {
    name: 'HOA President', nickname: 'Lawn Enforcement',
    stats: [
      { label: 'Grass Height Vigilance', value: 97, emoji: '📏' },
      { label: 'Fine Issuance Speed', value: 94, emoji: '💸' },
      { label: 'Being Liked', value: 5, emoji: '💔' },
      { label: 'Clipboard Presence', value: 92, emoji: '📋' },
      { label: 'Flamingo Tolerance', value: 3, emoji: '🦩' },
      { label: 'Reelection Machinery', value: 88, emoji: '🗳️' },
    ], rarity: 'silver', image: getImageUrl('HOA President') },
  {
    name: 'The Intern', nickname: 'Unpaid, Unbothered',
    stats: [
      { label: 'Coffee Run Efficiency', value: 80, emoji: '☕' },
      { label: 'Salary', value: 1, emoji: '💰' },
      { label: 'Exposure Accumulated', value: 70, emoji: '📸' },
      { label: 'Meeting Invisibility', value: 75, emoji: '👻' },
      { label: 'Resume Padding', value: 70, emoji: '📄' },
      { label: 'Hope', value: 65, emoji: '🌟' },
    ], rarity: 'bronze', image: getImageUrl('The Intern') },
  {
    name: 'Fantasy Commissioner', nickname: 'League Tyrant',
    stats: [
      { label: 'Rule Book Length', value: 92, emoji: '📚' },
      { label: 'Trade Veto Tyranny', value: 90, emoji: '🚫' },
      { label: 'Group Chat Control', value: 88, emoji: '💬' },
      { label: 'Punishment Creativity', value: 94, emoji: '🎭' },
      { label: 'Own Team Quality', value: 35, emoji: '📉' },
      { label: 'League Retention', value: 80, emoji: '🤝' },
    ], rarity: 'silver', image: getImageUrl('Fantasy Commissioner') },
  {
    name: 'Group Chat Ghost', nickname: 'Seen 11:47 PM',
    stats: [
      { label: 'Read Receipt Cruelty', value: 94, emoji: '👁️' },
      { label: 'Response Latency (Days)', value: 96, emoji: '📆' },
      { label: 'Event Attendance', value: 10, emoji: '🎉' },
      { label: 'Sudden Resurrections', value: 85, emoji: '⚰️' },
      { label: 'Meme Reacts Only', value: 90, emoji: '😂' },
      { label: 'Guilt Felt', value: 20, emoji: '😔' },
    ], rarity: 'bronze', image: getImageUrl('Group Chat Ghost') },
];
