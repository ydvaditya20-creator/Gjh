/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Player {
  x: number;
  y: number;
  radius: number;
  targetX: number;
  targetY: number;
  speed: number;
  hp: number;
  maxHp: number;
  shield: number; // 0 to 100
  score: number;
  coins: number;
  shootCooldown: number;
  powerUpTimer: number;
  powerUpType: PowerUpType | null;
  invulnerableTimer: number;
  combo: number;
  comboTimer: number;
  weaponLevel: number; // nozzle/weapon level (1 to 5+)
}

export type PowerUpType = 'TRIPLE_SHOT' | 'SHIELD' | 'RAPID_FIRE' | 'BEAM';

export interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  damage: number;
  isPlayer: boolean;
  angle?: number;
}

export interface Enemy {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  hp: number;
  maxHp: number;
  color: string;
  type: 'scout' | 'sine' | 'shooter' | 'kamikaze' | 'pulsar' | 'bomber' | 'interceptor' | 'meteorite' | 'tracker' | 'stealth';
  shootCooldown: number;
  scoreValue: number;
  level?: number;
  isBodyguard?: boolean;
}

export interface Boss {
  active: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  hp: number;
  maxHp: number;
  color: string;
  shootCooldown: number;
  attackPatternTimer: number;
  pattern: 'spray' | 'laser' | 'charge';
  name: string;
}

export interface Obstacle {
  id: string;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  hp: number;
  maxHp: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  level?: number;
}

export interface Coin {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  pulse: number;
  value: number;
  isSuper?: boolean;
}

export interface PowerUpItem {
  id: string;
  x: number;
  y: number;
  radius: number;
  type: PowerUpType;
  color: string;
  vy: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  decay: number;
  glow?: boolean;
  ring?: boolean;
  maxRadius?: number;
}

export interface GameLevel {
  levelNumber: number;
  name: string;
  colorPalette: {
    background: string;
    primary: string;
    secondary: string;
    accent: string;
    player: string;
  };
  enemySpawnRate: number; // spawns per frame (0.01)
  obstacleSpawnRate: number;
  coinSpawnRate: number;
  bossHp: number;
  speedMultiplier: number;
}
