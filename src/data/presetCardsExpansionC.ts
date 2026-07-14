// ============================================
// EXPANSION C — Characters Only
// Replaces the retired object/concept cards.
// House rule: every card is a person, animal, or
// creature — something with a face you'd draft.
// (Concept cards like Lag return later as a
// separate "event card" type, not squad members.)
// ============================================

import { getImageUrl } from '@/lib/avatar';
import type { PresetCard } from '@/data/presetCards';

export const EXPANSION_C: PresetCard[] = [
  // ── Gaming & internet humans ──
  {
    name: 'Leeroy Jenkinz', nickname: 'At Least He Has Chicken',
    stats: [
      { label: 'Battle Cry Volume', value: 99, emoji: '📢' },
      { label: 'Plan Disregard', value: 99, emoji: '📋' },
      { label: 'Chicken Possession', value: 99, emoji: '🍗' },
      { label: 'Team Wipe Generation', value: 97, emoji: '💀' },
      { label: 'Regret Immunity', value: 95, emoji: '🛡️' },
      { label: 'Name Immortality', value: 98, emoji: '♾️' },
    ], rarity: 'legendary', image: getImageUrl('Leeroy Jenkinz') },
  {
    name: 'Techno Norseman', nickname: 'The March Begins',
    stats: [
      { label: 'Shirtless Confidence', value: 96, emoji: '💪' },
      { label: 'Bass Response Time', value: 94, emoji: '🔊' },
      { label: 'March Authority', value: 92, emoji: '🚶' },
      { label: 'Camera Staredown', value: 90, emoji: '📹' },
      { label: 'Rave Leadership', value: 93, emoji: '🕺' },
      { label: 'Modern Sighting Rate', value: 12, emoji: '🔍' },
    ], rarity: 'gold', image: getImageUrl('Techno Norseman') },
  {
    name: 'The Speedcuber', nickname: 'Sub-10 Or Nothing',
    stats: [
      { label: 'Cube Solve Speed', value: 97, emoji: '🧊' },
      { label: 'Finger Trick Dexterity', value: 92, emoji: '🖐️' },
      { label: 'Party Trick Readiness', value: 95, emoji: '🎉' },
      { label: 'Explaining Algorithms Briefly', value: 15, emoji: '🗣️' },
      { label: 'Lobby Small Talk', value: 25, emoji: '💬' },
      { label: 'Wrist Warmup Rituals', value: 90, emoji: '⌚' },
    ], rarity: 'silver', image: getImageUrl('The Speedcuber') },
  {
    name: 'Couch Co-op Legend', nickname: 'Player 2 Forever',
    stats: [
      { label: 'Player 2 Generosity', value: 92, emoji: '🎮' },
      { label: 'Split Screen Tolerance', value: 90, emoji: '📺' },
      { label: 'Snack Sharing', value: 88, emoji: '🍿' },
      { label: 'Controller 3 Ownership', value: 85, emoji: '🔌' },
      { label: 'Online Migration Interest', value: 40, emoji: '🌐' },
      { label: 'Cartridge Blowing Faith', value: 65, emoji: '💨' },
    ], rarity: 'silver', image: getImageUrl('Couch Co-op Legend') },
  {
    name: 'Open Mic Comedian', nickname: 'Tight Five, Loose Everything Else',
    stats: [
      { label: 'Mic Grip Tightness', value: 75, emoji: '🎤' },
      { label: 'Crowd Work Bravery', value: 80, emoji: '👥' },
      { label: 'Laughs Per Minute', value: 8, emoji: '😂' },
      { label: 'Bombing Recovery', value: 85, emoji: '💣' },
      { label: 'Day Job Retention', value: 70, emoji: '💼' },
      { label: 'Notebook Chaos', value: 60, emoji: '📓' },
    ], rarity: 'bronze', image: getImageUrl('Open Mic Comedian') },

  // ── Street animals ──
  {
    name: 'Subway Pigeon', nickname: 'Commutes Like You',
    stats: [
      { label: 'Turnstile Evasion', value: 95, emoji: '🚇' },
      { label: 'Pizza Slice Logistics', value: 92, emoji: '🍕' },
      { label: 'Fear Of Humans', value: 5, emoji: '😨' },
      { label: 'Rush Hour Composure', value: 90, emoji: '🕐' },
      { label: 'Fare Payment History', value: 2, emoji: '💳' },
      { label: 'Street Smarts', value: 96, emoji: '🧠' },
    ], rarity: 'silver', image: getImageUrl('Subway Pigeon') },
  {
    name: 'Dumpster Raccoon', nickname: 'Midnight Portfolio Manager',
    stats: [
      { label: 'Lock Picking (Paws)', value: 94, emoji: '🔓' },
      { label: 'Trash Appraisal', value: 96, emoji: '🗑️' },
      { label: 'Guilt', value: 4, emoji: '😇' },
      { label: 'Night Shift Hustle', value: 92, emoji: '🌙' },
      { label: 'Hand Washing Theater', value: 88, emoji: '🧼' },
      { label: 'Eye Mask Authenticity', value: 97, emoji: '🦝' },
    ], rarity: 'silver', image: getImageUrl('Dumpster Raccoon') },

  // ── History's weirdest ──

  // ── Olympus Rejects (mythology cluster) ──
  {
    name: 'Hercules', nickname: 'Twelve Labors, Zero Days Off',
    stats: [
      { label: 'Labor Completion', value: 99, emoji: '✅' },
      { label: 'Divine Strength', value: 99, emoji: '💪' },
      { label: 'Monster Wrestling', value: 97, emoji: '🦁' },
      { label: 'Hydra Problem Solving', value: 95, emoji: '🐍' },
      { label: 'Lion Skin Fashion', value: 93, emoji: '🧥' },
      { label: 'Hera Feud Endurance', value: 96, emoji: '⛈️' },
    ], rarity: 'legendary', image: getImageUrl('Hercules') },
  {
    name: 'Medusa', nickname: 'Eye Contact Discouraged',
    stats: [
      { label: 'Eye Contact Lethality', value: 98, emoji: '👁️' },
      { label: 'Hair Maintenance Complexity', value: 95, emoji: '🐍' },
      { label: 'Dating Profile Difficulty', value: 90, emoji: '💔' },
      { label: 'Statue Garden Curation', value: 93, emoji: '🗿' },
      { label: 'Sympathy Actually Deserved', value: 88, emoji: '📖' },
      { label: 'Mirror Avoidance', value: 92, emoji: '🪞' },
    ], rarity: 'gold', image: getImageUrl('Medusa') },
  {
    name: 'Sisyphus', nickname: 'One More Push',
    stats: [
      { label: 'Boulder Uphill Consistency', value: 99, emoji: '🪨' },
      { label: 'Job Security', value: 99, emoji: '💼' },
      { label: 'Morale (Imagined)', value: 95, emoji: '😊' },
      { label: 'Grindset Authenticity', value: 98, emoji: '⚙️' },
      { label: 'Retirement Options', value: 1, emoji: '🏖️' },
      { label: 'Leg Day Frequency', value: 99, emoji: '🦵' },
    ], rarity: 'gold', image: getImageUrl('Sisyphus') },
  {
    name: 'Icarus', nickname: 'Flew Too Close',
    stats: [
      { label: 'Altitude Ambition', value: 95, emoji: '📈' },
      { label: 'Wax Wing QA', value: 4, emoji: '🕯️' },
      { label: "Father's Advice Retention", value: 3, emoji: '👨' },
      { label: 'Sun Proximity Record', value: 99, emoji: '☀️' },
      { label: 'Landing Technique', value: 2, emoji: '🌊' },
      { label: 'Vibes Before The Fall', value: 93, emoji: '😎' },
    ], rarity: 'bronze', image: getImageUrl('Icarus') },
  {
    name: 'The Minotaur', nickname: 'Home Field Advantage',
    stats: [
      { label: 'Maze Navigation (Home)', value: 96, emoji: '🌀' },
      { label: 'Corridor Cardio', value: 90, emoji: '🏃' },
      { label: 'Uninvited Guest Handling', value: 94, emoji: '🚪' },
      { label: 'Labyrinth Property Value', value: 88, emoji: '🏠' },
      { label: 'String Detection', value: 15, emoji: '🧵' },
      { label: 'Horn Polish', value: 92, emoji: '✨' },
    ], rarity: 'gold', image: getImageUrl('The Minotaur') },
];
