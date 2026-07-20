/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameLevel } from '../types';

export const LEVELS: GameLevel[] = [
  {
    levelNumber: 1,
    name: 'Green Oasis (स्तर १: हरा नखलिस्तान)',
    colorPalette: {
      background: '#e0fcf3', // Soft bright minty/aquamarine
      primary: '#10b981',    // Emerald Green
      secondary: '#059669',  // Darker green
      accent: '#f59e0b',     // Amber
      player: '#0ea5e9',     // Cyan Blue
    },
    enemySpawnRate: 0.038,
    obstacleSpawnRate: 0.018,
    coinSpawnRate: 0.024,
    bossHp: 450, // Tripled for a real challenge!
    speedMultiplier: 1.85, // Much faster!
  },
  {
    levelNumber: 2,
    name: 'Neon Cyber Grid (स्तर २: नियॉन साइबर ग्रिड)',
    colorPalette: {
      background: '#fdf4ff', // Light magenta tint
      primary: '#ec4899',    // Hot Pink
      secondary: '#d946ef',  // Purple Fuchsia
      accent: '#8b5cf6',     // Violet
      player: '#10b981',     // Vibrant Emerald
    },
    enemySpawnRate: 0.048,
    obstacleSpawnRate: 0.022,
    coinSpawnRate: 0.028,
    bossHp: 750, // Tripled!
    speedMultiplier: 2.15,
  },
  {
    levelNumber: 3,
    name: 'Golden Sunset (स्तर ३: सुनहरा सूर्यास्त)',
    colorPalette: {
      background: '#fffbeb', // Light amber gold tint
      primary: '#f97316',    // Bright Orange
      secondary: '#ef4444',  // Intense Red
      accent: '#eab308',     // Sunflower Yellow
      player: '#ec4899',     // Neon Pink
    },
    enemySpawnRate: 0.058,
    obstacleSpawnRate: 0.026,
    coinSpawnRate: 0.032,
    bossHp: 1100, // Tripled!
    speedMultiplier: 2.35,
  },
  {
    levelNumber: 4,
    name: 'Prismatic Rift (स्तर ४: सतरंगी दरार)',
    colorPalette: {
      background: '#eef2ff', // Soft violet lavender tint
      primary: '#3b82f6',    // Electric Royal Blue
      secondary: '#6366f1',  // Deep Indigo
      accent: '#ec4899',     // Bright Magenta
      player: '#f97316',     // Electric Orange
    },
    enemySpawnRate: 0.068,
    obstacleSpawnRate: 0.032,
    coinSpawnRate: 0.036,
    bossHp: 1500, // Tripled!
    speedMultiplier: 2.55,
  },
  {
    levelNumber: 5,
    name: 'Cosmic Abyss (स्तर ५: ब्रह्मांडीय रसातल)',
    colorPalette: {
      background: '#faf5ff', // Soft violet-purple blush
      primary: '#8b5cf6',    // Deep Purple
      secondary: '#6d28d9',  // Royal Violet
      accent: '#ec4899',     // Hot Pink
      player: '#f43f5e',     // Radiant Crimson
    },
    enemySpawnRate: 0.078,
    obstacleSpawnRate: 0.036,
    coinSpawnRate: 0.04,
    bossHp: 2200, // Tripled!
    speedMultiplier: 2.75,
  },
  {
    levelNumber: 6,
    name: 'Crimson Volcano (स्तर ६: लाल ज्वालामुखी)',
    colorPalette: {
      background: '#fff1f2', // Soft rose blush
      primary: '#f43f5e',    // Flame Rose
      secondary: '#be123c',  // Dark Ruby
      accent: '#fb923c',     // Volcanic Orange
      player: '#0ea5e9',     // Cool blue
    },
    enemySpawnRate: 0.084,
    obstacleSpawnRate: 0.038,
    coinSpawnRate: 0.042,
    bossHp: 2700, // Tripled!
    speedMultiplier: 2.9,
  },
  {
    levelNumber: 7,
    name: 'Plasma Nebula (स्तर ७: प्लाज्मा नेबुला)',
    colorPalette: {
      background: '#f0fdf4', // Soft neon mint tint
      primary: '#06b6d4',    // Electric Cyan
      secondary: '#0891b2',  // Cyber Teal
      accent: '#a855f7',     // Neon Purple
      player: '#fb7185',     // Soft Coral Pink
    },
    enemySpawnRate: 0.09,
    obstacleSpawnRate: 0.042,
    coinSpawnRate: 0.044,
    bossHp: 3300, // Tripled!
    speedMultiplier: 3.1,
  },
  {
    levelNumber: 8,
    name: 'Glacier Core (स्तर ८: हिमनद कोर)',
    colorPalette: {
      background: '#f0f9ff', // Light frosty blue
      primary: '#0284c7',    // Frost Blue
      secondary: '#0369a1',  // Deep Ice
      accent: '#22d3ee',     // Vivid Cyan Glow
      player: '#f59e0b',     // Fire Gold
    },
    enemySpawnRate: 0.096,
    obstacleSpawnRate: 0.045,
    coinSpawnRate: 0.046,
    bossHp: 4000, // Tripled!
    speedMultiplier: 3.25,
  },
  {
    levelNumber: 9,
    name: 'Radioactive Zone (स्तर ९: रेडियोधर्मी क्षेत्र)',
    colorPalette: {
      background: '#f7fee7', // Light toxicity yellow-green
      primary: '#84cc16',    // Toxic Lime
      secondary: '#4d7c0f',  // Bio Moss Green
      accent: '#eab308',     // Radioactive Amber
      player: '#ec4899',     // Anti-hazard Magenta
    },
    enemySpawnRate: 0.1,
    obstacleSpawnRate: 0.048,
    coinSpawnRate: 0.048,
    bossHp: 4600, // Tripled!
    speedMultiplier: 3.45,
  },
  {
    levelNumber: 10,
    name: 'Ragnarok Horizon (स्तर १०: महाप्रलय क्षितिज)',
    colorPalette: {
      background: '#fef2f2', // Doom light crimson
      primary: '#dc2626',    // Hellfire Crimson
      secondary: '#7f1d1d',  // Deep Apocalypse Red
      accent: '#fbbf24',     // Supernova Gold
      player: '#10b981',     // Hope Emerald
    },
    enemySpawnRate: 0.11,
    obstacleSpawnRate: 0.052,
    coinSpawnRate: 0.05,
    bossHp: 5500, // Tripled!
    speedMultiplier: 3.6,
  }
];

export function getLevelConfig(level: number): GameLevel {
  if (level <= 10) {
    return LEVELS[level - 1];
  }
  // Infinite scaling levels past level 10
  return {
    levelNumber: level,
    name: `Hyper Core - Zone ${level} (हाइपर कोर - क्षेत्र ${level})`,
    colorPalette: LEVELS[(level - 1) % LEVELS.length].colorPalette,
    enemySpawnRate: 0.11 + (level - 10) * 0.006,
    obstacleSpawnRate: 0.052 + (level - 10) * 0.003,
    coinSpawnRate: 0.05,
    bossHp: 5500 + (level - 10) * 800, // Extremely strong boss scaling!
    speedMultiplier: 3.6 + (level - 10) * 0.15, // Blazing speeds!
  };
}
