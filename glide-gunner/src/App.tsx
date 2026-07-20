/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Pause, 
  Award, 
  Coins, 
  Heart, 
  Tv, 
  ShieldAlert, 
  Flame, 
  Info,
  ChevronRight,
  Zap
} from 'lucide-react';
import { sound } from './utils/sound';
import { getLevelConfig } from './data/levels';
import { 
  Player, 
  Bullet, 
  Enemy, 
  Obstacle, 
  Coin, 
  PowerUpItem, 
  Particle, 
  Boss, 
  PowerUpType 
} from './types';

const TRANSLATIONS = {
  en: {
    gameTitle: "GLIDE GUNNER",
    tagline: "Infinite Glide Shooter",
    startSubtitle: "INFINITE GLIDE & GUN COMBAT",
    instructionsTitle: "Rules & Controls",
    howToPlay: "How to Play",
    rule1Label: "Touch & Slide",
    rule1Desc: "Glide ship with your finger anywhere on screen.",
    rule2Label: "Auto-Shooting",
    rule2Desc: "Gunfire is automated. Shatter obstacles to collect coins.",
    rule3Label: "Revive Power",
    rule3Desc: "Watch an ad when defeated to save your score!",
    dodgeLabel: "Dodge Lasers",
    dodgeDesc: "Avoid red bullets and incoming hostile ships!",
    breakLabel: "Break Asteroids",
    breakDesc: "Shatter heavy asteroids to secure shiny coins!",
    bestScore: "BEST SCORE",
    startGame: "START GAME",
    selectLanguage: "Select Language / भाषा चुनें",
    hindi: "हिन्दी (Hindi)",
    english: "English (EN)",
    weaponAndPowers: "Weapon & Power-Ups",
    tripleShotDesc: "Triple Shot: Fire 3 projectiles simultaneously",
    rapidFireDesc: "Rapid Fire: Extremely fast attack speed",
    shieldBarrierDesc: "Shield Barrier: Active protection energy shield",
    beamDesc: "Vibrant Laser Beam: Constant flow laser",
    copyright: "© 2026 Glide Gunner Studio.",
    designedForYt: "Designed for YouTube Playables.",
    memoryOptimized: "Memory-optimized. No Local Storage.",
    points: "POINTS",
    coins: "COINS",
    hullIntegrity: "HULL INTEGRITY",
    nozzle: "NOZZLE",
    zone: "ZONE",
    bossActiveMsg: "BOSS ACTIVE: DESTROY ENEMIES!",
    gamePaused: "GAME PAUSED",
    pauseDesc: "Slide with your finger to start playing again!",
    resumeGameBtn: "Resume Game",
    gameOver: "GAME OVER",
    gameOverDesc: "You played wonderfully! Outstanding performance.",
    scoreLabel: "SCORE",
    coinsLabel: "COINS",
    watchAdRevive: "Watch Ad: Free Revive",
    reviveLimitReached: "(Free Revive Limit Reached)",
    playAgain: "PLAY AGAIN",
    sponsoredAd: "Sponsored Arcade Ad",
    adClosesIn: "AD CLOSES IN",
    ad1Title: "AI Studio Arcade App",
    ad1Desc: "Build spectacular mobile HTML5 playables and multiplayer web games instantly using Gemini AI!",
    ad1Action: "Install Now • FREE",
    ad2Title: "Coin Tycoon Pro",
    ad2Desc: "Unleash explosive multipliers, upgrade cosmic weapons, and collect trillions of coins!",
    ad2Action: "Download • Play Free",
    ad3Title: "Cyber Heart Hero",
    ad3Desc: "Protect the central energy shield from giant bosses and incoming meteor waves!",
    ad3Action: "Get on Store",
    adFooter: "Ad rewarded revive will grant 1 Full Life, a 3-second Force Shield, and instant Triple-Shot weapon load!",
    ytPlayableSpec: "YouTube Playable Spec",
    optimizedSpec: "Optimized Specifications",
    playableSpecIntro: "This app complies strictly with YouTube Playables technical design requirements:",
    memoryStorageOnly: "Memory Storage Only",
    memoryStoragePassed: "PASSED",
    memoryStorageDesc: "Does not touch localStorage or disk storage, making it completely sandbox friendly.",
    audioSynth: "Immediate Audio Synth",
    audioSynthPassed: "PASSED",
    audioSynthDesc: "Uses HTML5 Web Audio API context for sound effects, bypassing network fetch blocks.",
    colorsTheme: "Vivid Colors Theme",
    colorsThemePassed: "PASSED",
    colorsThemeDesc: "Dynamic, colorful backgrounds, enemies, and power-up indicators instead of plain dark themes.",
    proTipTitle: "Pro Tip",
    proTipDesc: "Shatter asteroids to spawn maximum coins. Collecting power-ups instantly triggers special high-potency sound tracks!"
  },
  hi: {
    gameTitle: "ग्लाइड गनर",
    tagline: "अनंत ग्लाइड शूटर",
    startSubtitle: "अनंत ग्लाइड और गन मुकाबला",
    instructionsTitle: "नियम और नियंत्रण",
    howToPlay: "कैसे खेलें",
    rule1Label: "टच और स्लाइड",
    rule1Desc: "स्क्रीन पर कहीं भी उंगली घुमाकर जहाज़ चलाएं।",
    rule2Label: "ऑटो-शूटिंग",
    rule2Desc: "गोलियां खुद चलेंगी। पत्थरों को तोड़कर पीले सिक्के बटोरें।",
    rule3Label: "पुनर्जीवन शक्ति",
    rule3Desc: "ख़त्म होने पर विज्ञापन देखकर अपना स्कोर बचाएं!",
    dodgeLabel: "गोलियों से बचें",
    dodgeDesc: "लाल गोलियों और आक्रामक दुश्मनों से दूर रहें!",
    breakLabel: "चट्टानें तोड़ें",
    breakDesc: "एस्टेरॉयड पत्थरों को फोड़कर चमकदार सिक्के बटोरे!",
    bestScore: "सर्वश्रेष्ठ स्कोर",
    startGame: "खेल शुरू करें",
    selectLanguage: "भाषा चुनें / Select Language",
    hindi: "हिन्दी (Hindi)",
    english: "English (EN)",
    weaponAndPowers: "हथियार और पावर्स",
    tripleShotDesc: "ट्रिपल शॉट: एक साथ ३ गोलियां छोड़ें",
    rapidFireDesc: "रैपिड फायर: अत्यधिक तेज़ हमले",
    shieldBarrierDesc: "सुरक्षा कवच: सक्रिय सुरक्षा कवच ढाल",
    beamDesc: "वाइब्रेंट लेजर बीम: लगातार बहने वाली लेजर",
    copyright: "© 2026 ग्लाइड गनर स्टूडियो।",
    designedForYt: "यूट्यूब प्लेबल्स के लिए डिज़ाइन किया गया।",
    memoryOptimized: "मेमोरी-अनुकूलित। कोई लोकल स्टोरेज नहीं।",
    points: "अंक",
    coins: "सिक्के",
    hullIntegrity: "जहाज की स्थिति",
    nozzle: "नोजल",
    zone: "क्षेत्र",
    bossActiveMsg: "बॉस आ गया है: दुश्मनों को नष्ट करें!",
    gamePaused: "खेल रुका हुआ है",
    pauseDesc: "उंगली से स्लाइड करके फिर से खेलना शुरू करें!",
    resumeGameBtn: "खेल जारी रखें",
    gameOver: "खेल समाप्त",
    gameOverDesc: "आप बहुत बढ़िया खेले! आपका शानदार प्रदर्शन रहा।",
    scoreLabel: "कुल स्कोर",
    coinsLabel: "सिक्के",
    watchAdRevive: "विज्ञापन देखें: मुफ्त पुनर्जीवन",
    reviveLimitReached: "(मुफ़्त पुनर्जीवन सीमा समाप्त)",
    playAgain: "फिर से खेलें",
    sponsoredAd: "प्रायोजित आर्केड विज्ञापन",
    adClosesIn: "विज्ञापन समाप्त होने में",
    ad1Title: "एआई स्टूडियो आर्केड ऐप",
    ad1Desc: "जेमिनी एआई मॉडल का उपयोग करके तुरंत शानदार मोबाइल HTML5 प्लेबल्स और मल्टीप्लेयर वेब गेम बनाएं!",
    ad1Action: "अभी इंस्टॉल करें • मुफ्त",
    ad2Title: "सिक्का टाइकून प्रो",
    ad2Desc: "विस्फोटक मल्टीप्लायरों को सक्रिय करें, ब्रह्मांडीय अंतरिक्ष हथियारों को अपग्रेड करें, और खरबों सिक्के एकत्र करें!",
    ad2Action: "डाउनलोड • मुफ्त खेलें",
    ad3Title: "साइबर हार्ट हीरो",
    ad3Desc: "विशाल मालिकों और आने वाली उल्का तरंगों से केंद्रीय ऊर्जा ढाल की रक्षा करें!",
    ad3Action: "स्टोर पर प्राप्त करें",
    adFooter: "विज्ञापन पुरस्कृत पुनर्जीवन से 1 पूर्ण जीवन, 3-सेकंड फोर्स शील्ड और त्वरित ट्रिपल-शॉट हथियार लोड मिलेगा!",
    ytPlayableSpec: "यूट्यूब प्लेबल्स विशिष्टता",
    optimizedSpec: "अनुकूलित विनिर्देश",
    playableSpecIntro: "यह ऐप यूट्यूब प्लेबल्स तकनीकी डिजाइन आवश्यकताओं का कड़ाई से अनुपालन करता है:",
    memoryStorageOnly: "केवल मेमोरी स्टोरेज",
    memoryStoragePassed: "सफल",
    memoryStorageDesc: "स्थानीय संग्रहण या डिस्क संग्रहण को नहीं छूता है, जिससे यह पूरी तरह से सैंडबॉक्स अनुकूल बन जाता है।",
    audioSynth: "तत्काल ऑडियो सिंथेसिस",
    audioSynthPassed: "सफल",
    audioSynthDesc: "ध्वनि प्रभावों के लिए HTML5 वेब ऑडियो एपीआई का उपयोग करता है, जिससे नेटवर्क डाउनलोड ब्लॉक नहीं होते।",
    colorsTheme: "जीवंत रंग थीम",
    colorsThemePassed: "सफल",
    colorsThemeDesc: "सादे काले थीम के बजाय गतिशील, रंगीन पृष्ठभूमि, दुश्मन और पावर-अप संकेतक।",
    proTipTitle: "सुझाव",
    proTipDesc: "अधिकतम सिक्के प्राप्त करने के लिए एस्टेरॉयड (पत्थर) तोड़ें। पावर-अप प्राप्त करने पर विशेष संगीत बजता है!"
  }
};

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Game States
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'BOSS_WARNING' | 'GAMEOVER' | 'REVIVE_AD' | 'VICTORY'>('START');
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0); // Kept in memory, no localStorage
  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [soundMuted, setSoundMuted] = useState(false);
  const [weaponLevel, setWeaponLevel] = useState(1);
  const [language, setLanguage] = useState<'en' | 'hi'>('hi'); // Default to Hindi, high-action feel!
  const t = TRANSLATIONS[language];
  
  // Simulated Ads State
  const [adCountdown, setAdCountdown] = useState(5);
  const [hasUsedRevive, setHasUsedRevive] = useState(false);
  const [activeAdBanner, setActiveAdBanner] = useState(0);

  // Level progress (0 to 100)
  const [levelProgress, setLevelProgress] = useState(0);
  const [bossActive, setBossActive] = useState(false);

  // References for the game loop to avoid state update lag
  const stateRef = useRef({
    gameState: 'START',
    isPaused: false,
    score: 0,
    coins: 0,
    level: 1,
    lives: 3,
    levelProgress: 0,
    bossActive: false,
    hasUsedRevive: false,
    screenShake: 0,
    activePowerUp: null as PowerUpType | null,
    powerUpTimer: 0,
    weaponLevel: 1,
  });

  // Sync state values with refs for game loop
  useEffect(() => {
    stateRef.current.gameState = gameState;
    stateRef.current.isPaused = isPaused;
    stateRef.current.score = score;
    stateRef.current.coins = coins;
    stateRef.current.level = level;
    stateRef.current.lives = lives;
    stateRef.current.levelProgress = levelProgress;
    stateRef.current.bossActive = bossActive;
    stateRef.current.hasUsedRevive = hasUsedRevive;
    stateRef.current.weaponLevel = weaponLevel;
  }, [gameState, isPaused, score, coins, level, lives, levelProgress, bossActive, hasUsedRevive, weaponLevel]);

  // Entities state handled in ref for 60fps performance
  const entitiesRef = useRef<{
    player: Player;
    bullets: Bullet[];
    enemies: Enemy[];
    obstacles: Obstacle[];
    coins: Coin[];
    powerUps: PowerUpItem[];
    particles: Particle[];
    boss: Boss;
    stars: { x: number; y: number; size: number; speed: number; color: string }[];
  }>({
    player: {
      x: 200,
      y: 500,
      radius: 18,
      targetX: 200,
      targetY: 500,
      speed: 0.18, // LERP factor
      hp: 100,
      maxHp: 100,
      shield: 0,
      score: 0,
      coins: 0,
      shootCooldown: 0,
      powerUpTimer: 0,
      powerUpType: null,
      invulnerableTimer: 0,
      combo: 0,
      comboTimer: 0,
      weaponLevel: 1,
    },
    bullets: [],
    enemies: [],
    obstacles: [],
    coins: [],
    powerUps: [],
    particles: [],
    boss: {
      active: false,
      x: 200,
      y: -100,
      width: 120,
      height: 80,
      vx: 2,
      vy: 1.5,
      hp: 150,
      maxHp: 150,
      color: '#ec4899',
      shootCooldown: 0,
      attackPatternTimer: 0,
      pattern: 'spray',
      name: 'Alpha Sentinel',
    },
    stars: [],
  });

  // Controls dragging helpers
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    playerStartX: 0,
    playerStartY: 0,
  });

  // Initialize Stars
  useEffect(() => {
    const starsList = [];
    const colors = ['#38bdf8', '#fb7185', '#fef08a', '#c084fc', '#4ade80'];
    for (let i = 0; i < 40; i++) {
      starsList.push({
        x: Math.random() * 400,
        y: Math.random() * 600,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 1.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    entitiesRef.current.stars = starsList;
  }, []);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Relocate player to center bottom if out of bounds
      const player = entitiesRef.current.player;
      player.x = canvas.width / 2;
      player.y = canvas.height * 0.8;
      player.targetX = player.x;
      player.targetY = player.y;
    };

    window.addEventListener('resize', handleResize);
    // Trigger initial size
    setTimeout(handleResize, 100);
    return () => window.removeEventListener('resize', handleResize);
  }, [gameState]);

  // Handle background sound initialization & mute
  const handleToggleMute = () => {
    const currentMuted = sound.toggleMute();
    setSoundMuted(currentMuted);
  };

  // Start BGM on user interaction
  const initAudio = () => {
    sound.resume();
    sound.startBgm();
  };

  const handleStartGame = () => {
    initAudio();
    setGameState('PLAYING');
    setIsPaused(false);
    setScore(0);
    setCoins(0);
    setLevel(1);
    setLives(3);
    setLevelProgress(0);
    setBossActive(false);
    setHasUsedRevive(false);
    setWeaponLevel(1);

    // Reset entities
    const canvas = canvasRef.current;
    const w = canvas ? canvas.width : 400;
    const h = canvas ? canvas.height : 600;

    entitiesRef.current.player = {
      x: w / 2,
      y: h * 0.8,
      radius: 18,
      targetX: w / 2,
      targetY: h * 0.8,
      speed: 0.18,
      hp: 100,
      maxHp: 100,
      shield: 0,
      score: 0,
      coins: 0,
      shootCooldown: 0,
      powerUpTimer: 0,
      powerUpType: null,
      invulnerableTimer: 120, // start with temporary grace invulnerability
      combo: 0,
      comboTimer: 0,
      weaponLevel: 1,
    };
    entitiesRef.current.bullets = [];
    entitiesRef.current.enemies = [];
    entitiesRef.current.obstacles = [];
    entitiesRef.current.coins = [];
    entitiesRef.current.powerUps = [];
    entitiesRef.current.particles = [];
    entitiesRef.current.boss.active = false;
  };

  // Watch ad to revive implementation
  const handleWatchAd = () => {
    if (hasUsedRevive) return;
    initAudio();
    setGameState('REVIVE_AD');
    setAdCountdown(5);
    
    // Pick a funny random mobile/AI game ad to display
    setActiveAdBanner(Math.floor(Math.random() * 3));

    // Start timer countdown
    const adInterval = setInterval(() => {
      setAdCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(adInterval);
          // Revive the player!
          setGameState('PLAYING');
          setLives(1); // Give 1 fresh life
          setHasUsedRevive(true);
          
          // Re-initialize player parameters
          const canvas = canvasRef.current;
          const w = canvas ? canvas.width : 200;
          const h = canvas ? canvas.height : 500;
          
          const player = entitiesRef.current.player;
          player.x = w / 2;
          player.y = h * 0.8;
          player.targetX = w / 2;
          player.targetY = h * 0.8;
          player.invulnerableTimer = 180; // 3 seconds shield protection
          player.shield = 100; // instant power protection shield
          player.powerUpType = 'TRIPLE_SHOT'; // Reward triple shot on revive!
          player.powerUpTimer = 300; // 5 seconds duration
          player.weaponLevel = Math.max(player.weaponLevel || 1, 3);
          setWeaponLevel(player.weaponLevel);
          
          // Play energetic upgrade chime
          sound.playLevelUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Helper to spawn explosion particles
  const spawnExplosion = (x: number, y: number, color: string, count = 12) => {
    // 1. Spawning standard spark particles with higher speed and glow
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6.5 + 1.5;
      entitiesRef.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 4 + 1.5,
        color,
        alpha: 1,
        decay: Math.random() * 0.045 + 0.015,
        glow: Math.random() > 0.4,
      });
    }

    // 2. Spawn beautiful glowing shockwave rings for high-impact explosions
    if (count >= 10) {
      // Primary shockwave ring
      entitiesRef.current.particles.push({
        x,
        y,
        vx: 0,
        vy: 0,
        radius: 4,
        maxRadius: 42 + Math.random() * 20,
        color: '#f97316', // energetic orange
        alpha: 1,
        decay: 0.045,
        ring: true,
      });
      // Bright core ring
      entitiesRef.current.particles.push({
        x,
        y,
        vx: 0,
        vy: 0,
        radius: 2,
        maxRadius: 26 + Math.random() * 14,
        color: '#ffffff', // stellar white core
        alpha: 1,
        decay: 0.06,
        ring: true,
      });

      // 3. Spawning dusty puff fireball clouds for smoke trails
      const cloudColors = ['#f43f5e', '#f97316', '#facc15', '#4b5563'];
      const numClouds = Math.floor(count / 2.5);
      for (let j = 0; j < numClouds; j++) {
        const cloudAngle = Math.random() * Math.PI * 2;
        const cloudSpeed = Math.random() * 1.6 + 0.3;
        entitiesRef.current.particles.push({
          x,
          y,
          vx: Math.cos(cloudAngle) * cloudSpeed,
          vy: Math.sin(cloudAngle) * cloudSpeed,
          radius: Math.random() * 12 + 6,
          color: cloudColors[Math.floor(Math.random() * cloudColors.length)],
          alpha: 0.8,
          decay: Math.random() * 0.035 + 0.025,
        });
      }
    }
  };

  // Helper to trigger screen shake
  const triggerScreenShake = (intensity: number) => {
    stateRef.current.screenShake = intensity;
  };

  // Core touch/pointer handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameState !== 'PLAYING' || isPaused) return;
    initAudio();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    dragRef.current = {
      isDragging: true,
      startX: clientX,
      startY: clientY,
      playerStartX: entitiesRef.current.player.x,
      playerStartY: entitiesRef.current.player.y,
    };
    
    // Set pointer capture so we drag even off canvas boundary
    canvas.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current.isDragging || gameState !== 'PLAYING' || isPaused) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Relative slide calculation
    const dx = clientX - dragRef.current.startX;
    const dy = clientY - dragRef.current.startY;

    const player = entitiesRef.current.player;
    // Update player target with relative offset
    player.targetX = dragRef.current.playerStartX + dx;
    player.targetY = dragRef.current.playerStartY + dy;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    dragRef.current.isDragging = false;
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Safe fallback if not supported
      }
    }
  };

  // Main Game Loop Hook
  useEffect(() => {
    let animId: number;

    const updateAndRender = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animId = requestAnimationFrame(updateAndRender);
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animId = requestAnimationFrame(updateAndRender);
        return;
      }

      const w = canvas.width;
      const h = canvas.height;

      // Clean background matching level's colorful design
      const currentLevelCfg = getLevelConfig(stateRef.current.level);
      ctx.fillStyle = currentLevelCfg.colorPalette.background;
      ctx.fillRect(0, 0, w, h);

      // Handle screen shake viewport offset
      ctx.save();
      if (stateRef.current.screenShake > 0.5) {
        const shakeX = (Math.random() - 0.5) * stateRef.current.screenShake;
        const shakeY = (Math.random() - 0.5) * stateRef.current.screenShake;
        ctx.translate(shakeX, shakeY);
        stateRef.current.screenShake *= 0.88; // decay
      }

      // Draw background stars/nebula glow for rich depth
      entitiesRef.current.stars.forEach((star) => {
        star.y += star.speed * currentLevelCfg.speedMultiplier;
        if (star.y > h) {
          star.y = 0;
          star.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
      });

      if (stateRef.current.gameState === 'PLAYING' && !stateRef.current.isPaused) {
        // --- 1. UPDATE LOGIC ---
        const player = entitiesRef.current.player;

        // Smooth LERP movement glide towards target
        player.x += (player.targetX - player.x) * player.speed;
        player.y += (player.targetY - player.y) * player.speed;

        // Force stay inside canvas boundary
        player.x = Math.max(player.radius, Math.min(w - player.radius, player.x));
        player.y = Math.max(player.radius * 1.5, Math.min(h - player.radius * 2, player.y));

        // Timers & power-ups update
        if (player.invulnerableTimer > 0) player.invulnerableTimer--;
        if (player.powerUpTimer > 0) {
          player.powerUpTimer--;
          if (player.powerUpTimer <= 0) {
            player.powerUpType = null;
            stateRef.current.activePowerUp = null;
          }
        }

        // Combo decay
        if (player.comboTimer > 0) {
          player.comboTimer--;
          if (player.comboTimer <= 0) {
            player.combo = 0;
          }
        }

        // Periodic Player auto-firing
        if (player.shootCooldown > 0) {
          player.shootCooldown--;
        } else {
          // Tactical Proximity Sensor: check if any target is directly in front
          const isTargetInFront = () => {
            // Check obstacles
            for (const obs of entitiesRef.current.obstacles) {
              if (obs.y < player.y && Math.abs(obs.x - player.x) < obs.radius + 35) {
                return true;
              }
            }
            // Check enemies
            for (const nme of entitiesRef.current.enemies) {
              if (nme.y < player.y && Math.abs(nme.x - player.x) < nme.width / 2 + 35) {
                return true;
              }
            }
            // Check boss
            const boss = entitiesRef.current.boss;
            if (boss.active && boss.y < player.y && Math.abs(boss.x - player.x) < boss.width / 2 + 65) {
              return true;
            }
            return false;
          };

          if (isTargetInFront()) {
            // Adjust fire rate depending on powerups - Super fast and action-packed!
            const baseRate = player.powerUpType === 'RAPID_FIRE' ? 1.5 : 5;
            player.shootCooldown = baseRate;

            const nozzleLvl = player.weaponLevel || 1;

            // Sound trigger for shooting
          if (player.powerUpType === 'TRIPLE_SHOT') {
            sound.playTripleShoot();
            if (nozzleLvl === 1) {
              // 3 shots
              entitiesRef.current.bullets.push(
                { x: player.x, y: player.y - 15, vx: 0, vy: -28, radius: 7.5, color: '#0ea5e9', damage: 25, isPlayer: true },
                { x: player.x, y: player.y - 15, vx: -5, vy: -26, radius: 6, color: '#38bdf8', damage: 20, isPlayer: true },
                { x: player.x, y: player.y - 15, vx: 5, vy: -26, radius: 6, color: '#38bdf8', damage: 20, isPlayer: true }
              );
            } else if (nozzleLvl === 2) {
              // 4 shots (spread)
              entitiesRef.current.bullets.push(
                { x: player.x - 8, y: player.y - 15, vx: -2, vy: -28, radius: 7.5, color: '#0ea5e9', damage: 25, isPlayer: true },
                { x: player.x + 8, y: player.y - 15, vx: 2, vy: -28, radius: 7.5, color: '#0ea5e9', damage: 25, isPlayer: true },
                { x: player.x - 12, y: player.y - 10, vx: -6, vy: -26, radius: 6, color: '#38bdf8', damage: 20, isPlayer: true },
                { x: player.x + 12, y: player.y - 10, vx: 6, vy: -26, radius: 6, color: '#38bdf8', damage: 20, isPlayer: true }
              );
            } else if (nozzleLvl === 3) {
              // 5 shots (Penta spread!)
              entitiesRef.current.bullets.push(
                { x: player.x, y: player.y - 18, vx: 0, vy: -30, radius: 8, color: '#0ea5e9', damage: 28, isPlayer: true },
                { x: player.x - 10, y: player.y - 12, vx: -4, vy: -28, radius: 6.5, color: '#38bdf8', damage: 22, isPlayer: true },
                { x: player.x + 10, y: player.y - 12, vx: 4, vy: -28, radius: 6.5, color: '#38bdf8', damage: 22, isPlayer: true },
                { x: player.x - 18, y: player.y - 8, vx: -8, vy: -26, radius: 6, color: '#60a5fa', damage: 18, isPlayer: true },
                { x: player.x + 18, y: player.y - 8, vx: 8, vy: -26, radius: 6, color: '#60a5fa', damage: 18, isPlayer: true }
              );
            } else {
              // 7 shots (Hepta spread!) - Massive bullet hell!
              const angles = [-0.4, -0.25, -0.1, 0, 0.1, 0.25, 0.4];
              angles.forEach((ang) => {
                const bulletSpeed = 30;
                entitiesRef.current.bullets.push({
                  x: player.x + ang * 30,
                  y: player.y - 15,
                  vx: Math.sin(ang) * bulletSpeed,
                  vy: -Math.cos(ang) * bulletSpeed,
                  radius: 7,
                  color: ang === 0 ? '#0ea5e9' : '#38bdf8',
                  damage: 25,
                  isPlayer: true
                });
              });
            }
          } else if (player.powerUpType === 'BEAM') {
            sound.playShoot();
            // Scaling the beam width/damage with nozzleLevel!
            const beamRadius = 10 + nozzleLvl * 4.5; // Up to 35px massive high-limit beam!
            const beamDamage = 35 + nozzleLvl * 8;
            entitiesRef.current.bullets.push({
              x: player.x,
              y: player.y - 15,
              vx: 0,
              vy: -34,
              radius: beamRadius,
              color: '#d946ef',
              damage: beamDamage,
              isPlayer: true
            });
            if (nozzleLvl >= 3) {
              entitiesRef.current.bullets.push(
                { x: player.x - beamRadius - 5, y: player.y - 5, vx: -3, vy: -30, radius: 5.5, color: '#a855f7', damage: 18, isPlayer: true },
                { x: player.x + beamRadius + 5, y: player.y - 5, vx: 3, vy: -30, radius: 5.5, color: '#a855f7', damage: 18, isPlayer: true }
              );
            }
          } else if (player.powerUpType === 'RAPID_FIRE') {
            sound.playShoot();
            const speed = -32;
            if (nozzleLvl === 1) {
              entitiesRef.current.bullets.push({
                x: player.x, y: player.y - 15, vx: 0, vy: speed, radius: 6.5, color: '#fb7185', damage: 20, isPlayer: true
              });
            } else if (nozzleLvl === 2) {
              entitiesRef.current.bullets.push(
                { x: player.x - 6, y: player.y - 15, vx: 0, vy: speed, radius: 6.5, color: '#fb7185', damage: 20, isPlayer: true },
                { x: player.x + 6, y: player.y - 15, vx: 0, vy: speed, radius: 6.5, color: '#fb7185', damage: 20, isPlayer: true }
              );
            } else if (nozzleLvl === 3) {
              entitiesRef.current.bullets.push(
                { x: player.x - 10, y: player.y - 12, vx: -1.5, vy: speed, radius: 6.5, color: '#fb7185', damage: 18, isPlayer: true },
                { x: player.x, y: player.y - 16, vx: 0, vy: speed - 3, radius: 7.5, color: '#ec4899', damage: 24, isPlayer: true },
                { x: player.x + 10, y: player.y - 12, vx: 1.5, vy: speed, radius: 6.5, color: '#fb7185', damage: 18, isPlayer: true }
              );
            } else {
              entitiesRef.current.bullets.push(
                { x: player.x - 14, y: player.y - 10, vx: -3, vy: speed, radius: 6, color: '#fb7185', damage: 16, isPlayer: true },
                { x: player.x - 5, y: player.y - 15, vx: -0.8, vy: speed - 2, radius: 6.5, color: '#ec4899', damage: 20, isPlayer: true },
                { x: player.x + 5, y: player.y - 15, vx: 0.8, vy: speed - 2, radius: 6.5, color: '#ec4899', damage: 20, isPlayer: true },
                { x: player.x + 14, y: player.y - 10, vx: 3, vy: speed, radius: 6, color: '#fb7185', damage: 16, isPlayer: true }
              );
            }
          } else {
            sound.playShoot();
            if (nozzleLvl === 1) {
              entitiesRef.current.bullets.push({
                x: player.x, y: player.y - 15, vx: 0, vy: -25, radius: 7, color: currentLevelCfg.colorPalette.player, damage: 22, isPlayer: true
              });
            } else if (nozzleLvl === 2) {
              entitiesRef.current.bullets.push(
                { x: player.x - 6, y: player.y - 15, vx: 0, vy: -25, radius: 7, color: currentLevelCfg.colorPalette.player, damage: 22, isPlayer: true },
                { x: player.x + 6, y: player.y - 15, vx: 0, vy: -25, radius: 7, color: currentLevelCfg.colorPalette.player, damage: 22, isPlayer: true }
              );
            } else if (nozzleLvl === 3) {
              entitiesRef.current.bullets.push(
                { x: player.x - 10, y: player.y - 12, vx: -2, vy: -25, radius: 6.5, color: '#38bdf8', damage: 18, isPlayer: true },
                { x: player.x, y: player.y - 16, vx: 0, vy: -28, radius: 8, color: currentLevelCfg.colorPalette.player, damage: 26, isPlayer: true },
                { x: player.x + 10, y: player.y - 12, vx: 2, vy: -25, radius: 6.5, color: '#38bdf8', damage: 18, isPlayer: true }
              );
            } else {
              entitiesRef.current.bullets.push(
                { x: player.x - 12, y: player.y - 12, vx: -1.5, vy: -28, radius: 7, color: '#38bdf8', damage: 22, isPlayer: true },
                { x: player.x - 4, y: player.y - 16, vx: 0, vy: -28, radius: 8, color: currentLevelCfg.colorPalette.player, damage: 26, isPlayer: true },
                { x: player.x + 4, y: player.y - 16, vx: 0, vy: -28, radius: 8, color: currentLevelCfg.colorPalette.player, damage: 26, isPlayer: true },
                { x: player.x + 12, y: player.y - 12, vx: 1.5, vy: -28, radius: 7, color: '#38bdf8', damage: 22, isPlayer: true }
              );
            }
          }
        }
      }

        // Spawners (Dynamic based on progress, speeds, levels)
        if (!stateRef.current.bossActive) {
          // Progress bar ticks up much faster as you stay alive and gain scores
          const nextProgress = stateRef.current.levelProgress + 0.15;
          if (nextProgress >= 100) {
            setLevelProgress(100);
            setBossActive(true);
            stateRef.current.bossActive = true;
            
            // Set up boss properties
            const boss = entitiesRef.current.boss;
            boss.active = true;
            boss.x = w / 2;
            boss.y = -100;
            boss.vx = 2;
            boss.vy = 1;
            boss.hp = currentLevelCfg.bossHp;
            boss.maxHp = currentLevelCfg.bossHp;
            
            const lvl = stateRef.current.level;
            boss.name = lvl === 1 ? 'Alpha Sentinel (अल्फा सेंटिनल)' 
                      : lvl === 2 ? 'Fuchsia Overlord (फ्यूशिया ओवरलॉर्ड)'
                      : lvl === 3 ? 'Solar Annihilator (सोलर एनिहिलेटर)'
                      : lvl === 4 ? 'Prismatic Void (प्रिज्मैटिक वॉइड)'
                      : lvl === 5 ? 'Infinity Colossus (इन्फिनिटी कोलोसस)'
                      : lvl === 6 ? 'Ashen Core (आशेन कोर)'
                      : lvl === 7 ? 'Vortex Titan (वोर्टेक्स टाइटन)'
                      : lvl === 8 ? 'Frostbite Empress (फ्रॉस्टबाइट एम्प्रेस)'
                      : lvl === 9 ? 'Toxic Overlord (टॉक्सिक ओवरलॉर्ड)'
                      : 'Oblivion Nemesis (ऑब्लिवियन नेमेसिस)';
            
            // Spawn bodyguard minions for the Boss - SIGNIFICANTLY MORE DANGEROUS!
            const bodyguardCount = 3 + Math.floor(lvl / 2);
            for (let i = 0; i < bodyguardCount; i++) {
              const startAngle = (i / bodyguardCount) * Math.PI * 2;
              entitiesRef.current.enemies.push({
                id: `bodyguard-${Math.random()}`,
                x: boss.x + Math.cos(startAngle) * 75,
                y: boss.y + Math.sin(startAngle) * 75,
                width: 28,
                height: 28,
                vx: startAngle, // Store current orbit angle
                vy: 75,         // Store orbit radius
                hp: 60 + lvl * 25,
                maxHp: 60 + lvl * 25,
                color: '#38bdf8', // Bright glowing energy blue
                type: 'scout', // Will be rendered with bodyguard design
                shootCooldown: 25 + Math.random() * 30,
                scoreValue: 200,
                level: lvl,
                isBodyguard: true,
              });
            }

            // Red flash screen alert sound
            sound.playLevelUp();
            sound.playBossWarning();
          } else {
            setLevelProgress(nextProgress);
          }

          // Force-spawn check: screen per kam se kam ek enami ya obstacle zarur ho (at least one enemy or obstacle is guaranteed!)
          const totalTargetsCount = entitiesRef.current.enemies.length + entitiesRef.current.obstacles.length;
          const forceSpawn = totalTargetsCount === 0;

          // Enemy spawner
          if ((forceSpawn && Math.random() < 0.6) || Math.random() < currentLevelCfg.enemySpawnRate) {
            const enemyTypes: ('scout' | 'sine' | 'shooter' | 'kamikaze' | 'pulsar' | 'bomber' | 'interceptor' | 'meteorite' | 'tracker' | 'stealth')[] = [
              'scout', 'sine', 'shooter', 'kamikaze', 'pulsar', 'bomber', 'interceptor', 'meteorite', 'tracker', 'stealth'
            ];
            
            // Unlock higher enemy types as player level increases
            const lvl = stateRef.current.level;
            const maxTypeIndex = Math.min(10, lvl + 1);
            const activeTypes = enemyTypes.slice(0, maxTypeIndex);
            const type = activeTypes[Math.floor(Math.random() * activeTypes.length)];

            // Custom attributes based on the selected enemy type
            let baseSize = 32;
            let baseHp = 20;
            let vy = 1.5;
            let vx = 0;
            let color = '#f43f5e';
            let scoreVal = 100;

            switch (type) {
              case 'scout':
                baseSize = 30; baseHp = 20; vy = Math.random() * 1.3 + 1.5; vx = 0; color = '#f43f5e'; scoreVal = 100;
                break;
              case 'sine':
                baseSize = 32; baseHp = 25; vy = Math.random() * 1.1 + 1.3; vx = 2; color = '#d946ef'; scoreVal = 120;
                break;
              case 'shooter':
                baseSize = 35; baseHp = 45; vy = Math.random() * 0.9 + 1.1; vx = 0; color = '#3b82f6'; scoreVal = 150;
                break;
              case 'kamikaze':
                baseSize = 28; baseHp = 15; vy = Math.random() * 1.8 + 2.2; vx = 0; color = '#f97316'; scoreVal = 130;
                break;
              case 'pulsar':
                baseSize = 32; baseHp = 35; vy = Math.random() * 0.9 + 1.1; vx = 1; color = '#a855f7'; scoreVal = 160;
                break;
              case 'bomber':
                baseSize = 40; baseHp = 70; vy = Math.random() * 0.7 + 0.9; vx = 0; color = '#eab308'; scoreVal = 200;
                break;
              case 'interceptor':
                baseSize = 28; baseHp = 22; vy = Math.random() * 1.7 + 2.0; vx = 1.5; color = '#10b981'; scoreVal = 140;
                break;
              case 'meteorite':
                baseSize = 36; baseHp = 55; vy = Math.random() * 1.0 + 1.2; vx = 0; color = '#78716c'; scoreVal = 150;
                break;
              case 'tracker':
                baseSize = 32; baseHp = 30; vy = Math.random() * 1.1 + 1.3; vx = 0; color = '#06b6d4'; scoreVal = 170;
                break;
              case 'stealth':
                baseSize = 30; baseHp = 26; vy = Math.random() * 1.3 + 1.5; vx = 0; color = '#6366f1'; scoreVal = 180;
                break;
            }

            // Scale enemy size and HP dynamically based on current weapon/nozzle level!
            const pWeaponLvl = entitiesRef.current.player.weaponLevel || 1;
            const scaleFactor = 1 + (pWeaponLvl - 1) * 0.25; // Level 1 is 1x, Level 5 is 2x physical size!
            const enemyWidth = baseSize * scaleFactor;
            const enemyHeight = baseSize * scaleFactor;
            const enemyHp = Math.floor(baseHp * scaleFactor * (1 + (pWeaponLvl - 1) * 0.15));

            entitiesRef.current.enemies.push({
              id: Math.random().toString(),
              x: Math.random() * (w - 40) + 20,
              y: -40,
              width: enemyWidth,
              height: enemyHeight,
              vx: vx,
              vy: vy * currentLevelCfg.speedMultiplier,
              hp: enemyHp,
              maxHp: enemyHp,
              color: color,
              type,
              shootCooldown: Math.random() * 90 + 40,
              scoreValue: Math.floor(scoreVal * scaleFactor),
              level: stateRef.current.level,
            });
          }

          // Obstacles (Asteroids) spawner - Unconditional if forced and no enemies spawned
          const currentEnemiesCount = entitiesRef.current.enemies.length;
          if ((forceSpawn && currentEnemiesCount === 0) || Math.random() < currentLevelCfg.obstacleSpawnRate) {
            const rad = Math.random() * 20 + 15;
            entitiesRef.current.obstacles.push({
              id: Math.random().toString(),
              x: Math.random() * (w - 60) + 30,
              y: -50,
              radius: rad,
              vx: (Math.random() - 0.5) * 1.5,
              vy: (Math.random() * 1 + 1) * currentLevelCfg.speedMultiplier,
              hp: Math.floor(rad * 1.5),
              maxHp: Math.floor(rad * 1.5),
              color: '#d97706', // Rocky brown amber
              rotation: Math.random() * Math.PI,
              rotationSpeed: (Math.random() - 0.5) * 0.04,
              level: stateRef.current.level,
            });
          }

          // Random Falling Coins (apart from breaking obstacles)
          if (Math.random() < currentLevelCfg.coinSpawnRate) {
            entitiesRef.current.coins.push({
              id: Math.random().toString(),
              x: Math.random() * (w - 20) + 10,
              y: -20,
              radius: 6,
              color: '#eab308',
              pulse: 0,
              value: 1,
            });
          }
        }

        // --- 2. UPDATE ENTITIES & DETECT COLLISIONS ---

        // UPDATE Player Bullets
        entitiesRef.current.bullets.forEach((bullet) => {
          bullet.x += bullet.vx;
          bullet.y += bullet.vy;
        });

        // Filter out bullets off-screen
        entitiesRef.current.bullets = entitiesRef.current.bullets.filter(
          (b) => b.y > -20 && b.y < h + 20 && b.x > -20 && b.x < w + 20
        );

        // UPDATE Obstacles
        entitiesRef.current.obstacles.forEach((obstacle) => {
          obstacle.x += obstacle.vx;
          obstacle.y += obstacle.vy;
          obstacle.rotation += obstacle.rotationSpeed;

          // Bounce off side boundaries
          if (obstacle.x < obstacle.radius || obstacle.x > w - obstacle.radius) {
            obstacle.vx = -obstacle.vx;
          }
        });

        // Remove off-screen obstacles
        entitiesRef.current.obstacles = entitiesRef.current.obstacles.filter(
          (obs) => obs.y < h + 50
        );

        // UPDATE Enemies
        entitiesRef.current.enemies.forEach((enemy) => {
          // 1. Guard Sentinel / Bodyguard orbit behavior
          if (enemy.isBodyguard) {
            const boss = entitiesRef.current.boss;
            if (boss.active) {
              // Orbit the boss using vx as current angle (radians) and vy as orbit radius (px)
              enemy.vx += 0.035; // Speed up orbit rotation slightly (faster shields!)
              enemy.x = boss.x + Math.cos(enemy.vx) * enemy.vy;
              enemy.y = boss.y + Math.sin(enemy.vx) * enemy.vy;

              // Periodic covering fire (Targeted towards player!)
              enemy.shootCooldown--;
              if (enemy.shootCooldown <= 0) {
                enemy.shootCooldown = 25 + Math.random() * 30; // fire much faster
                const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
                entitiesRef.current.bullets.push({
                  x: enemy.x,
                  y: enemy.y + 12,
                  vx: Math.cos(angle) * 7.5,
                  vy: Math.sin(angle) * 7.5,
                  radius: 4.5,
                  color: '#38bdf8', // Glowing cyan blue
                  damage: 10,
                  isPlayer: false,
                });
              }
            } else {
              // Boss is dead! Guard goes rogue, turns into a normal kamikaze
              enemy.isBodyguard = false;
              enemy.type = 'kamikaze';
              enemy.vy = 4;
              enemy.vx = 0;
            }
          } else {
            // 2. Normal 10-type movement paths
            if (enemy.type === 'sine') {
              enemy.x += Math.sin(enemy.y * 0.05) * enemy.vx;
            } else if (enemy.type === 'interceptor') {
              enemy.x += Math.cos(enemy.y * 0.1) * 3;
            } else if (enemy.type === 'kamikaze') {
              // Seek/Home in on player's horizontal position
              enemy.x += (player.x - enemy.x) * 0.02;
            } else if (enemy.type === 'tracker') {
              // Aggressive alignment with player X
              enemy.x += (player.x - enemy.x) * 0.035;
            } else {
              enemy.x += enemy.vx;
            }
            enemy.y += enemy.vy;

            // 3. Normal 10-type custom shooting logic
            enemy.shootCooldown--;
            if (enemy.shootCooldown <= 0) {
              if (enemy.type === 'shooter') {
                enemy.shootCooldown = 65;
                const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
                [-0.15, 0.15].forEach((offsetAngle) => {
                  const finalAngle = angle + offsetAngle;
                  entitiesRef.current.bullets.push({
                    x: enemy.x,
                    y: enemy.y + 15,
                    vx: Math.cos(finalAngle) * 8.5,
                    vy: Math.sin(finalAngle) * 8.5,
                    radius: 4.5,
                    color: '#ef4444',
                    damage: 10,
                    isPlayer: false,
                  });
                });
              } else if (enemy.type === 'pulsar') {
                enemy.shootCooldown = 80;
                // Radial shockwave: 4 bullets
                for (let i = 0; i < 4; i++) {
                  const angle = (Math.PI / 2) * i;
                  entitiesRef.current.bullets.push({
                    x: enemy.x,
                    y: enemy.y,
                    vx: Math.cos(angle) * 5.5,
                    vy: Math.sin(angle) * 5.5,
                    radius: 4,
                    color: '#c084fc',
                    damage: 8,
                    isPlayer: false,
                  });
                }
              } else if (enemy.type === 'bomber') {
                enemy.shootCooldown = 100;
                // Drop a massive static bomb mine
                entitiesRef.current.bullets.push({
                  x: enemy.x,
                  y: enemy.y + 18,
                  vx: 0,
                  vy: 2.0, // Slow vertical speed (acting as a mine)
                  radius: 9,
                  color: '#fbbf24',
                  damage: 18,
                  isPlayer: false,
                });
              } else if (enemy.type === 'tracker') {
                enemy.shootCooldown = 75;
                // Fast cyan laser beam straight down
                entitiesRef.current.bullets.push({
                  x: enemy.x,
                  y: enemy.y + 15,
                  vx: 0,
                  vy: 9.0,
                  radius: 3.5,
                  color: '#22d3ee',
                  damage: 12,
                  isPlayer: false,
                });
              }
            }
          }
        });

        // Remove off-screen enemies
        entitiesRef.current.enemies = entitiesRef.current.enemies.filter(
          (en) => en.y < h + 40
        );

        // UPDATE Boss
        const boss = entitiesRef.current.boss;
        if (boss.active) {
          // Entry animation
          if (boss.y < h * 0.18) {
            boss.y += boss.vy;
          } else {
            // Patrol horizontal path
            boss.x += boss.vx;
            if (boss.x < boss.width / 2 + 10 || boss.x > w - boss.width / 2 - 10) {
              boss.vx = -boss.vx;
            }

            // Shoot cycles
            boss.shootCooldown--;
            if (boss.shootCooldown <= 0) {
              boss.shootCooldown = Math.max(25, 45 - stateRef.current.level * 4); // shoots faster on higher levels and with tighter limits

              // Alternate boss firing schemes - EXTREMELY KHATARNAK (ULTIMATE PATTERNS!)
              const randPattern = Math.random();
              if (randPattern < 0.4) {
                // Wide spray - Expanded density! (13 bullets with wider/faster coverage)
                for (let i = -6; i <= 6; i++) {
                  entitiesRef.current.bullets.push({
                    x: boss.x + i * 14,
                    y: boss.y + 35,
                    vx: i * 1.15,
                    vy: 6.5,
                    radius: 5.5,
                    color: '#f43f5e',
                    damage: 15,
                    isPlayer: false,
                  });
                }
              } else if (randPattern < 0.8) {
                // Double spiral vortex (Nested rings rotating in opposite directions!)
                for (let i = 0; i < 12; i++) {
                  const angle1 = (Math.PI / 6) * i + (Date.now() * 0.002);
                  entitiesRef.current.bullets.push({
                    x: boss.x,
                    y: boss.y + 20,
                    vx: Math.cos(angle1) * 6.0,
                    vy: Math.sin(angle1) * 6.0,
                    radius: 4.5,
                    color: '#d946ef',
                    damage: 10,
                    isPlayer: false,
                  });
                  const angle2 = (Math.PI / 6) * i - (Date.now() * 0.002);
                  entitiesRef.current.bullets.push({
                    x: boss.x,
                    y: boss.y + 20,
                    vx: Math.cos(angle2) * 4.5,
                    vy: Math.sin(angle2) * 4.5,
                    radius: 4.0,
                    color: '#a855f7',
                    damage: 8,
                    isPlayer: false,
                  });
                }
              } else {
                // Triple homing plasma orbs in a spreading fan!
                const baseAngle = Math.atan2(player.y - boss.y, player.x - boss.x);
                [-0.25, 0, 0.25].forEach((offset) => {
                  const angle = baseAngle + offset;
                  entitiesRef.current.bullets.push({
                    x: boss.x,
                    y: boss.y + 30,
                    vx: Math.cos(angle) * 8.5,
                    vy: Math.sin(angle) * 8.5,
                    radius: 8.0,
                    color: '#eab308',
                    damage: 20,
                    isPlayer: false,
                  });
                });
              }
            }
          }
        }

        // UPDATE Coins & Magnet draw pull
        entitiesRef.current.coins.forEach((coin) => {
          coin.pulse += 0.08;

          // Magnet Effect: Pull coin towards player if within 110px range
          const dx = player.x - coin.x;
          const dy = player.y - coin.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            // Speed up pull as it gets closer
            const pullForce = 8 / (dist * 0.05 + 1);
            coin.x += (dx / dist) * pullForce * 1.5;
            coin.y += (dy / dist) * pullForce * 1.5;
          } else {
            coin.y += 1.8 * currentLevelCfg.speedMultiplier;
          }
        });

        // Filter off-screen coins
        entitiesRef.current.coins = entitiesRef.current.coins.filter(
          (c) => c.y < h + 20
        );

        // UPDATE Power-Ups
        entitiesRef.current.powerUps.forEach((pu) => {
          pu.y += pu.vy * currentLevelCfg.speedMultiplier;
        });

        // Filter power-ups
        entitiesRef.current.powerUps = entitiesRef.current.powerUps.filter(
          (pu) => pu.y < h + 20
        );

        // --- 3. COLLISION CHECKS & DAMAGE HANDLERS ---

        // Check 1: Player Bullets hitting enemies
        entitiesRef.current.bullets.forEach((bullet) => {
          if (!bullet.isPlayer) return;

          // Hit enemies
          entitiesRef.current.enemies.forEach((enemy) => {
            const dist = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y);
            // Enemy box collision fallback to circle distance for speed
            if (dist < enemy.width / 2 + bullet.radius) {
              bullet.y = -100; // destroy bullet
              enemy.hp -= bullet.damage;
              
              // Spark particle
              spawnExplosion(bullet.x, bullet.y, enemy.color, 4);

              if (enemy.hp <= 0) {
                // Kill Enemy
                enemy.y = h * 2; // flag remove
                spawnExplosion(enemy.x, enemy.y - h * 2, enemy.color, 15);
                sound.playExplode();
                triggerScreenShake(3);

                // Add scores & update combos
                player.combo++;
                player.comboTimer = 180; // 3 seconds
                if (player.combo >= 2) {
                  sound.playCombo(player.combo);
                }
                const points = enemy.scoreValue * (1 + Math.floor(player.combo / 5));
                setScore((s) => s + points);

                // Reward chance for drops
                const coinDropRoll = Math.random();
                if (coinDropRoll < 0.45) {
                  entitiesRef.current.coins.push({
                    id: Math.random().toString(),
                    x: enemy.x,
                    y: enemy.y - h * 2,
                    radius: 6,
                    color: '#eab308',
                    pulse: 0,
                    value: 1,
                  });
                }
                
                // Super low chance of spawning power-up drop
                if (Math.random() < 0.08) {
                  const types: PowerUpType[] = ['TRIPLE_SHOT', 'RAPID_FIRE', 'SHIELD', 'BEAM'];
                  const selectedType = types[Math.floor(Math.random() * types.length)];
                  const colors = {
                    TRIPLE_SHOT: '#3b82f6',
                    RAPID_FIRE: '#fb7185',
                    SHIELD: '#10b981',
                    BEAM: '#d946ef'
                  };
                  entitiesRef.current.powerUps.push({
                    id: Math.random().toString(),
                    x: enemy.x,
                    y: enemy.y - h * 2,
                    radius: 12,
                    type: selectedType,
                    color: colors[selectedType],
                    vy: 1.5,
                  });
                }
              }
            }
          });

          // Hit Obstacles
          entitiesRef.current.obstacles.forEach((obstacle) => {
            const dist = Math.hypot(bullet.x - obstacle.x, bullet.y - obstacle.y);
            if (dist < obstacle.radius + bullet.radius) {
              bullet.y = -100; // destroy bullet
              obstacle.hp -= bullet.damage;
              spawnExplosion(bullet.x, bullet.y, '#f59e0b', 3);

              if (obstacle.hp <= 0) {
                obstacle.y = h * 2; // flag remove
                spawnExplosion(obstacle.x, obstacle.y - h * 2, '#f59e0b', 18);
                sound.playExplode();
                triggerScreenShake(4);

                setScore((s) => s + 50);

                // Obstacles break into multi-coins! High reward!
                const numCoins = Math.floor(Math.random() * 3) + 2;
                for (let k = 0; k < numCoins; k++) {
                  entitiesRef.current.coins.push({
                    id: Math.random().toString(),
                    x: obstacle.x + (Math.random() - 0.5) * 20,
                    y: obstacle.y - h * 2 + (Math.random() - 0.5) * 20,
                    radius: 6,
                    color: '#eab308',
                    pulse: 0,
                    value: 1,
                  });
                }
              }
            }
          });

          // Hit Boss
          if (boss.active && boss.y > 0) {
            const dist = Math.hypot(bullet.x - boss.x, bullet.y - boss.y);
            if (dist < boss.width / 2 + bullet.radius) {
              bullet.y = -100; // destroy bullet
              boss.hp -= bullet.damage;
              spawnExplosion(bullet.x, bullet.y, '#ec4899', 5);
              triggerScreenShake(1.5);

              if (boss.hp <= 0) {
                // Defeated Boss! Massive reward explosion
                boss.active = false;
                setBossActive(false);
                stateRef.current.bossActive = false;
                
                // Sparklers
                spawnExplosion(boss.x, boss.y, '#f43f5e', 45);
                sound.playExplode();
                triggerScreenShake(15);

                // Big points and stars!
                setScore((s) => s + 2000);
                
                // Spawn lots of premium coins
                for (let c = 0; c < 12; c++) {
                  entitiesRef.current.coins.push({
                    id: Math.random().toString(),
                    x: boss.x + (Math.random() - 0.5) * 60,
                    y: boss.y + (Math.random() - 0.5) * 40,
                    radius: 8,
                    color: '#f59e0b',
                    pulse: 0,
                    value: 5, // super gold coin value
                    isSuper: true,
                  });
                }

                // Level Up trigger!
                sound.playLevelUp();
                
                const nextLvl = stateRef.current.level + 1;
                setLevel(nextLvl);
                stateRef.current.level = nextLvl;
                setLevelProgress(0); // Reset progress meter
                setLives((l) => Math.min(3, l + 1)); // bonus life reward
              }
            }
          }
        });

        // Filter out destroyed enemies & obstacles
        entitiesRef.current.enemies = entitiesRef.current.enemies.filter((e) => e.y < h);
        entitiesRef.current.obstacles = entitiesRef.current.obstacles.filter((o) => o.y < h);

        // Check 2: Enemy bullets hitting Player
        entitiesRef.current.bullets.forEach((bullet) => {
          if (bullet.isPlayer) return;

          const dist = Math.hypot(bullet.x - player.x, bullet.y - player.y);
          if (dist < player.radius + bullet.radius) {
            bullet.y = h * 2; // flag remove

            // If player is invulnerable, skip damage
            if (player.invulnerableTimer > 0) return;

            // Take damage
            handlePlayerHit();
          }
        });

        // Check 3: Active enemies crashing into Player
        entitiesRef.current.enemies.forEach((enemy) => {
          const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
          if (dist < player.radius + enemy.width / 2) {
            // Remove enemy with explosion
            enemy.y = h * 2;
            spawnExplosion(enemy.x, enemy.y - h * 2, enemy.color, 12);
            sound.playExplode();

            if (player.invulnerableTimer > 0) return;
            handlePlayerHit();
          }
        });

        // Check 4: Obstacles slamming Player
        entitiesRef.current.obstacles.forEach((obstacle) => {
          const dist = Math.hypot(obstacle.x - player.x, obstacle.y - player.y);
          if (dist < player.radius + obstacle.radius) {
            // Bounce obstacle away
            obstacle.vx = -obstacle.vx * 1.5;
            obstacle.vy = -1; // bounce up slightly

            if (player.invulnerableTimer > 0) return;
            handlePlayerHit();
          }
        });

        // Player Hit Function
        function handlePlayerHit() {
          player.invulnerableTimer = 100; // 1.6 seconds grace
          player.combo = 0; // reset multiplier
          triggerScreenShake(12);

          // If shield power-up is active, break shield instead of losing a life!
          if (player.powerUpType === 'SHIELD') {
            player.powerUpType = null;
            stateRef.current.activePowerUp = null;
            sound.playShieldBreak();
            // Spawn shield shattered particles!
            spawnExplosion(player.x, player.y, '#10b981', 25);
            return;
          }

          sound.playHit();
          
          setLives((prevLives) => {
            const nextLvl = prevLives - 1;
            if (nextLvl <= 0) {
              // Game Over triggered!
              sound.playGameOver();
              setGameState('GAMEOVER');
              stateRef.current.gameState = 'GAMEOVER';
              
              // Record high scores
              setHighScore((h) => Math.max(h, stateRef.current.score));
            }
            return nextLvl;
          });
        }

        // Check 5: Player collecting Coins
        entitiesRef.current.coins.forEach((coin) => {
          const dist = Math.hypot(coin.x - player.x, coin.y - player.y);
          if (dist < player.radius + coin.radius + 2) {
            coin.y = h * 2; // flag remove
            sound.playCoin();
            
            const addValue = coin.isSuper ? 5 : 1;
            setCoins((c) => {
              const nextC = c + addValue;
              // If coins crossed multiples of 15, level up nozzle!
              if (Math.floor(nextC / 15) > Math.floor(c / 15)) {
                player.weaponLevel = Math.min(5, (player.weaponLevel || 1) + 1);
                setWeaponLevel(player.weaponLevel);
                sound.playLevelUp();
                
                // Spawn level-up sparkles
                spawnExplosion(player.x, player.y, '#eab308', 14);
              }
              return nextC;
            });
            setScore((s) => s + addValue * 15);
          }
        });
        entitiesRef.current.coins = entitiesRef.current.coins.filter((c) => c.y < h);

        // Check 6: Player collecting Power-Ups
        entitiesRef.current.powerUps.forEach((pu) => {
          const dist = Math.hypot(pu.x - player.x, pu.y - player.y);
          if (dist < player.radius + pu.radius) {
            pu.y = h * 2; // flag remove
            sound.playPowerup();

            player.powerUpType = pu.type;
            player.powerUpTimer = 480; // 8 seconds of pure chaos!
            stateRef.current.activePowerUp = pu.type;

            const oldWeaponLvl = player.weaponLevel || 1;
            player.weaponLevel = Math.min(5, oldWeaponLvl + 1);
            setWeaponLevel(player.weaponLevel);
            if (player.weaponLevel > oldWeaponLvl) {
              sound.playLevelUp();
            }
            
            // Score bonus
            setScore((s) => s + 250);
            
            // Flash a glowing combo alert or particles
            spawnExplosion(player.x, player.y, pu.color, 16);
          }
        });
        entitiesRef.current.powerUps = entitiesRef.current.powerUps.filter((p) => p.y < h);
      }

      // --- 4. RENDER GRAPHICS ---

      // DRAW Obstacles
      entitiesRef.current.obstacles.forEach((obstacle) => {
        ctx.save();
        ctx.translate(obstacle.x, obstacle.y);
        ctx.rotate(obstacle.rotation);

        const obsLvl = obstacle.level || 1;

        if (obsLvl === 1) {
          // Level 1: Beautiful vibrant orange-amber rocky asteroids
          ctx.beginPath();
          const steps = 8;
          for (let i = 0; i < steps; i++) {
            const angle = (i / steps) * Math.PI * 2;
            const rockyOffset = 1 + (Math.sin(angle * 3) * 0.15);
            const r = obstacle.radius * rockyOffset;
            const px = Math.cos(angle) * r;
            const py = Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();

          const rockGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, obstacle.radius);
          rockGrad.addColorStop(0, '#fbbf24');
          rockGrad.addColorStop(0.7, '#d97706');
          rockGrad.addColorStop(1, '#78350f');
          ctx.fillStyle = rockGrad;
          ctx.fill();

          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#b45309';
          ctx.stroke();

          // Cracks on rocky surface
          ctx.beginPath();
          ctx.moveTo(-obstacle.radius * 0.3, -obstacle.radius * 0.2);
          ctx.lineTo(obstacle.radius * 0.2, obstacle.radius * 0.4);
          ctx.strokeStyle = 'rgba(0,0,0,0.3)';
          ctx.stroke();
        } 
        else if (obsLvl === 2) {
          // Level 2: Toxic emerald crystal shards
          ctx.beginPath();
          const steps = 5; // Pentagonal crystalline structure
          for (let i = 0; i < steps; i++) {
            const angle = (i / steps) * Math.PI * 2;
            const crystalOffset = 1 + (i % 2 === 0 ? 0.18 : -0.1);
            const r = obstacle.radius * crystalOffset;
            const px = Math.cos(angle) * r;
            const py = Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();

          const crystalGrad = ctx.createRadialGradient(-2, -2, 2, 0, 0, obstacle.radius);
          crystalGrad.addColorStop(0, '#a7f3d0'); // mint emerald core
          crystalGrad.addColorStop(0.6, '#10b981'); // vivid green
          crystalGrad.addColorStop(1, '#064e3b'); // dark forest void
          ctx.fillStyle = crystalGrad;
          ctx.fill();

          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#059669';
          ctx.stroke();

          // Crystalline facets / inner highlights
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(0) * obstacle.radius * 0.5, Math.sin(0) * obstacle.radius * 0.5);
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(Math.PI * 0.8) * obstacle.radius * 0.5, Math.sin(Math.PI * 0.8) * obstacle.radius * 0.5);
          ctx.strokeStyle = 'rgba(255,255,255,0.45)';
          ctx.stroke();
        }
        else if (obsLvl === 3) {
          // Level 3: Glacier Cobalt frozen space ice meteors
          ctx.beginPath();
          const steps = 10; // Highly multifaceted sharp shard
          for (let i = 0; i < steps; i++) {
            const angle = (i / steps) * Math.PI * 2;
            const iceOffset = 1 + (Math.cos(angle * 5) * 0.22);
            const r = obstacle.radius * iceOffset;
            const px = Math.cos(angle) * r;
            const py = Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();

          const iceGrad = ctx.createRadialGradient(-3, -3, 3, 0, 0, obstacle.radius);
          iceGrad.addColorStop(0, '#e0f2fe'); // frosty white
          iceGrad.addColorStop(0.5, '#38bdf8'); // sky blue
          iceGrad.addColorStop(1, '#1e3a8a'); // deep cobalt
          ctx.fillStyle = iceGrad;
          ctx.fill();

          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#0284c7';
          ctx.stroke();

          // Frost sparkle details
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(-2, -obstacle.radius * 0.3, 4, 4);
          ctx.fillRect(obstacle.radius * 0.2, 2, 3, 3);
        }
        else if (obsLvl === 4) {
          // Level 4: Plasma Magma volcanic stones with inner fire cracks
          ctx.beginPath();
          const steps = 7;
          for (let i = 0; i < steps; i++) {
            const angle = (i / steps) * Math.PI * 2;
            const magmaOffset = 1 + (Math.sin(angle * 4) * 0.16);
            const r = obstacle.radius * magmaOffset;
            const px = Math.cos(angle) * r;
            const py = Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();

          const magmaGrad = ctx.createRadialGradient(-2, -2, 2, 0, 0, obstacle.radius);
          magmaGrad.addColorStop(0, '#fef08a'); // blazing yellow lava core
          magmaGrad.addColorStop(0.5, '#ea580c'); // intense orange magma
          magmaGrad.addColorStop(1, '#4c0519'); // crusted carbon dark ruby
          ctx.fillStyle = magmaGrad;
          ctx.fill();

          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#dc2626';
          ctx.stroke();

          // Molten crack lines on surface
          ctx.beginPath();
          ctx.moveTo(-obstacle.radius * 0.4, 0);
          ctx.lineTo(0, obstacle.radius * 0.2);
          ctx.lineTo(obstacle.radius * 0.4, -obstacle.radius * 0.2);
          ctx.strokeStyle = '#facc15';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        else {
          // Level 5+: Cosmic Dark Matter void anomalies / Vortices!
          const angleOffset = Date.now() * 0.005;
          ctx.beginPath();
          ctx.arc(0, 0, obstacle.radius, 0, Math.PI * 2);
          ctx.closePath();

          const voidGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, obstacle.radius);
          voidGrad.addColorStop(0, '#020617'); // Pitch-black void
          voidGrad.addColorStop(0.5, '#6b21a8'); // glowing violet dark matter
          voidGrad.addColorStop(1, '#c084fc'); // bright fuchsia fringe
          ctx.fillStyle = voidGrad;
          ctx.fill();

          // Swirling vortex filaments
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = 'rgba(255,255,255,0.7)';
          for (let k = 0; k < 3; k++) {
            ctx.beginPath();
            ctx.arc(0, 0, obstacle.radius * (0.35 + k * 0.25), angleOffset + k * 2, angleOffset + k * 2 + Math.PI);
            ctx.stroke();
          }
        }

        ctx.restore();
      });

      // DRAW Enemies
      // DRAW Enemies
      entitiesRef.current.enemies.forEach((enemy) => {
        ctx.save();
        ctx.translate(enemy.x, enemy.y);

        const nmeLvl = enemy.level || 1;
        const type = enemy.type || 'scout';

        // 1. Sleek Shadow / Thruster glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = enemy.color;

        if (enemy.isBodyguard) {
          // Guard Sentinel / Bodyguard rendering: custom protective shield shell & orb core
          ctx.beginPath();
          ctx.arc(0, 0, enemy.width * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(96, 165, 250, 0.22)'; // Outer energy shell
          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = '#60a5fa';
          ctx.stroke();

          // Bodyguard Core
          ctx.beginPath();
          ctx.moveTo(0, -enemy.height * 0.45);
          ctx.lineTo(-enemy.width * 0.35, enemy.height * 0.3);
          ctx.lineTo(enemy.width * 0.35, enemy.height * 0.3);
          ctx.closePath();

          const gGrad = ctx.createLinearGradient(0, -enemy.height / 2, 0, enemy.height / 2);
          gGrad.addColorStop(0, '#93c5fd');
          gGrad.addColorStop(1, '#1d4ed8');
          ctx.fillStyle = gGrad;
          ctx.fill();

          ctx.lineWidth = 1;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();

          // Glowing scanning lens
          ctx.beginPath();
          ctx.arc(0, 0, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        } 
        else if (type === 'scout') {
          // SCOUT: Fast interceptor (Arrowhead spear shape with back stabilizer fins)
          ctx.beginPath();
          ctx.moveTo(0, enemy.height * 0.5); // Sharp forward nose cone
          ctx.lineTo(-enemy.width * 0.45, -enemy.height * 0.35); // Left wingtip
          ctx.lineTo(-enemy.width * 0.15, -enemy.height * 0.15); // Left inner fuselage indent
          ctx.lineTo(-enemy.width * 0.1, -enemy.height * 0.45);  // Left stabilizer fin
          ctx.lineTo(enemy.width * 0.1, -enemy.height * 0.45);   // Right stabilizer fin
          ctx.lineTo(enemy.width * 0.15, -enemy.height * 0.15);  // Right inner fuselage indent
          ctx.lineTo(enemy.width * 0.45, -enemy.height * 0.35);  // Right wingtip
          ctx.closePath();

          const scoutGrad = ctx.createLinearGradient(0, -enemy.height / 2, 0, enemy.height / 2);
          scoutGrad.addColorStop(0, '#f43f5e');
          scoutGrad.addColorStop(1, '#9f1239');
          ctx.fillStyle = scoutGrad;
          ctx.fill();

          ctx.lineWidth = 1.5;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();

          // Small single scanner eye
          ctx.beginPath();
          ctx.arc(0, enemy.height * 0.15, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#67e8f9';
          ctx.fill();
        } 
        else if (type === 'sine') {
          // SINE: Slithering glider (Crescent dual-curve aerodynamic boomerang)
          ctx.beginPath();
          ctx.moveTo(0, enemy.height * 0.45); // Curvy center prow
          ctx.quadraticCurveTo(-enemy.width * 0.45, enemy.height * 0.25, -enemy.width * 0.5, -enemy.height * 0.4); // Sweeping left wing
          ctx.quadraticCurveTo(-enemy.width * 0.2, -enemy.height * 0.15, 0, -enemy.height * 0.1); // Back inner curve
          ctx.quadraticCurveTo(enemy.width * 0.2, -enemy.height * 0.15, enemy.width * 0.5, -enemy.height * 0.4);  // Sweeping right wing
          ctx.quadraticCurveTo(enemy.width * 0.45, enemy.height * 0.25, 0, enemy.height * 0.45);
          ctx.closePath();

          const sineGrad = ctx.createLinearGradient(-enemy.width / 2, 0, enemy.width / 2, 0);
          sineGrad.addColorStop(0, '#d946ef');
          sineGrad.addColorStop(1, '#701a75');
          ctx.fillStyle = sineGrad;
          ctx.fill();

          ctx.lineWidth = 1.5;
          ctx.strokeStyle = '#e0f2fe';
          ctx.stroke();

          // Double bio-luminescent scanner stripes
          ctx.beginPath();
          ctx.moveTo(-enemy.width * 0.25, enemy.height * 0.05);
          ctx.lineTo(-enemy.width * 0.1, enemy.height * 0.15);
          ctx.moveTo(enemy.width * 0.25, enemy.height * 0.05);
          ctx.lineTo(enemy.width * 0.1, enemy.height * 0.15);
          ctx.strokeStyle = '#22d3ee';
          ctx.lineWidth = 2;
          ctx.stroke();
        } 
        else if (type === 'shooter') {
          // SHOOTER: Heavy armor gunship (Hexagonal twin blaster fortress)
          ctx.beginPath();
          ctx.moveTo(0, enemy.height * 0.3); // Shield plate
          ctx.lineTo(-enemy.width * 0.35, enemy.height * 0.1);
          ctx.lineTo(-enemy.width * 0.5, -enemy.height * 0.4); // Solid left hull plate
          ctx.lineTo(-enemy.width * 0.2, -enemy.height * 0.4);
          ctx.lineTo(0, -enemy.height * 0.25);                  // Central energy reactor slit
          ctx.lineTo(enemy.width * 0.2, -enemy.height * 0.4);
          ctx.lineTo(enemy.width * 0.5, -enemy.height * 0.4);  // Solid right hull plate
          ctx.lineTo(enemy.width * 0.35, enemy.height * 0.1);
          ctx.closePath();

          const shooterGrad = ctx.createLinearGradient(0, -enemy.height / 2, 0, enemy.height / 2);
          shooterGrad.addColorStop(0, '#475569');
          shooterGrad.addColorStop(0.5, '#3b82f6');
          shooterGrad.addColorStop(1, '#0f172a');
          ctx.fillStyle = shooterGrad;
          ctx.fill();

          ctx.lineWidth = 2;
          ctx.strokeStyle = '#f1f5f9';
          ctx.stroke();

          // Protruding blaster barrels
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(-enemy.width * 0.3 - 2.5, enemy.height * 0.1, 5, 12);
          ctx.fillRect(enemy.width * 0.3 - 2.5, enemy.height * 0.1, 5, 12);
          ctx.strokeStyle = '#f8fafc';
          ctx.strokeRect(-enemy.width * 0.3 - 2.5, enemy.height * 0.1, 5, 12);
          ctx.strokeRect(enemy.width * 0.3 - 2.5, enemy.height * 0.1, 5, 12);

          // Glowing laser ignition core
          ctx.beginPath();
          ctx.arc(0, -enemy.height * 0.05, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#f43f5e';
          ctx.fill();
        } 
        else if (type === 'kamikaze') {
          // KAMIKAZE: Self-destructive nuclear drone
          ctx.save();
          ctx.rotate(Date.now() * 0.015);
          ctx.beginPath();
          const spikes = 8;
          const outerR = enemy.width * 0.55;
          const innerR = enemy.width * 0.25;
          for (let i = 0; i < spikes * 2; i++) {
            const angle = (i / spikes) * Math.PI;
            const r = i % 2 === 0 ? outerR : innerR;
            const px = Math.cos(angle) * r;
            const py = Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();

          const kamGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, enemy.width * 0.55);
          kamGrad.addColorStop(0, '#ffffff');
          kamGrad.addColorStop(0.4, '#fb923c');
          kamGrad.addColorStop(1, '#ea580c');
          ctx.fillStyle = kamGrad;
          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = '#fef08a';
          ctx.stroke();
          ctx.restore();
        }
        else if (type === 'pulsar') {
          // PULSAR: Pulsating diamond crystal
          const pulse = Math.sin(Date.now() * 0.012) * 0.15;
          const rX = enemy.width * (0.5 + pulse);
          const rY = enemy.height * (0.55 + pulse);

          ctx.beginPath();
          ctx.moveTo(0, -rY);
          ctx.lineTo(rX, 0);
          ctx.lineTo(0, rY);
          ctx.lineTo(-rX, 0);
          ctx.closePath();

          const pGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, rX);
          pGrad.addColorStop(0, '#ffffff');
          pGrad.addColorStop(0.5, '#c084fc');
          pGrad.addColorStop(1, '#581c87');
          ctx.fillStyle = pGrad;
          ctx.fill();

          ctx.lineWidth = 1.8;
          ctx.strokeStyle = '#d8b4fe';
          ctx.stroke();

          // Satellite dots orbiting around
          const angle = Date.now() * 0.005;
          ctx.fillStyle = '#f472b6';
          for (let i = 0; i < 3; i++) {
            const dotX = Math.cos(angle + (i * Math.PI * 2) / 3) * (enemy.width * 0.7);
            const dotY = Math.sin(angle + (i * Math.PI * 2) / 3) * (enemy.height * 0.7);
            ctx.beginPath();
            ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        else if (type === 'bomber') {
          // BOMBER: Shielded heavy drop ship
          ctx.beginPath();
          ctx.moveTo(-enemy.width * 0.5, -enemy.height * 0.45);
          ctx.lineTo(enemy.width * 0.5, -enemy.height * 0.45);
          ctx.lineTo(enemy.width * 0.35, enemy.height * 0.25);
          ctx.lineTo(0, enemy.height * 0.5); // heavy drop nose
          ctx.lineTo(-enemy.width * 0.35, enemy.height * 0.25);
          ctx.closePath();

          const bGrad = ctx.createLinearGradient(0, -enemy.height / 2, 0, enemy.height / 2);
          bGrad.addColorStop(0, '#7c2d12');
          bGrad.addColorStop(0.5, '#eab308');
          bGrad.addColorStop(1, '#ca8a04');
          ctx.fillStyle = bGrad;
          ctx.fill();

          ctx.lineWidth = 2.2;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();

          // Double central exhaust chambers
          ctx.fillStyle = '#f97316';
          ctx.fillRect(-8, -enemy.height * 0.45, 6, 8);
          ctx.fillRect(2, -enemy.height * 0.45, 6, 8);
        }
        else if (type === 'interceptor') {
          // INTERCEPTOR: Forward-swept sharp V-wing
          ctx.beginPath();
          ctx.moveTo(0, -enemy.height * 0.4);
          ctx.lineTo(-enemy.width * 0.5, enemy.height * 0.35); // left wing
          ctx.lineTo(-enemy.width * 0.2, enemy.height * 0.15); // sweep inside
          ctx.lineTo(0, enemy.height * 0.45); // front tip
          ctx.lineTo(enemy.width * 0.2, enemy.height * 0.15); // sweep inside
          ctx.lineTo(enemy.width * 0.5, enemy.height * 0.35); // right wing
          ctx.closePath();

          const iGrad = ctx.createLinearGradient(-enemy.width / 2, 0, enemy.width / 2, 0);
          iGrad.addColorStop(0, '#065f46');
          iGrad.addColorStop(0.5, '#10b981');
          iGrad.addColorStop(1, '#065f46');
          ctx.fillStyle = iGrad;
          ctx.fill();

          ctx.lineWidth = 1.8;
          ctx.strokeStyle = '#a7f3d0';
          ctx.stroke();
        }
        else if (type === 'meteorite') {
          // METEORITE: Rocky armored drone
          ctx.save();
          ctx.rotate(Date.now() * 0.006);
          ctx.beginPath();
          const points = 7;
          for (let i = 0; i < points; i++) {
            const angle = (i / points) * Math.PI * 2;
            const r = enemy.width * 0.48 * (1 + (i % 2 === 0 ? 0.12 : -0.08));
            const px = Math.cos(angle) * r;
            const py = Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();

          const mGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, enemy.width * 0.5);
          mGrad.addColorStop(0, '#a8a29e');
          mGrad.addColorStop(0.7, '#57534e');
          mGrad.addColorStop(1, '#292524');
          ctx.fillStyle = mGrad;
          ctx.fill();

          ctx.lineWidth = 2;
          ctx.strokeStyle = '#d6d3d1';
          ctx.stroke();
          ctx.restore();
        }
        else if (type === 'tracker') {
          // TRACKER: Seeker scout (sweeping antennas and glowing panning sensor eye)
          ctx.beginPath();
          ctx.arc(0, 0, enemy.width * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = '#0f172a';
          ctx.fill();
          ctx.lineWidth = 1.8;
          ctx.strokeStyle = '#06b6d4';
          ctx.stroke();

          // Left/Right side antenna blades
          ctx.beginPath();
          ctx.moveTo(-enemy.width * 0.45, 0);
          ctx.lineTo(-enemy.width * 0.7, -enemy.height * 0.25);
          ctx.moveTo(enemy.width * 0.45, 0);
          ctx.lineTo(enemy.width * 0.7, -enemy.height * 0.25);
          ctx.strokeStyle = '#22d3ee';
          ctx.stroke();

          // Active red eye moving back and forth
          const sweep = Math.sin(Date.now() * 0.015) * (enemy.width * 0.2);
          ctx.beginPath();
          ctx.arc(sweep, 0, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.fill();
        }
        else if (type === 'stealth') {
          // STEALTH: Cloaked semi-translucent flat wing shadow
          ctx.globalAlpha = 0.22 + Math.sin(Date.now() * 0.005) * 0.12;
          ctx.beginPath();
          ctx.moveTo(0, enemy.height * 0.45);
          ctx.lineTo(-enemy.width * 0.55, -enemy.height * 0.35);
          ctx.lineTo(0, -enemy.height * 0.1);
          ctx.lineTo(enemy.width * 0.55, -enemy.height * 0.35);
          ctx.closePath();

          ctx.fillStyle = '#4f46e5';
          ctx.fill();

          ctx.lineWidth = 2.0;
          ctx.strokeStyle = '#818cf8';
          ctx.stroke();
        }

        ctx.restore();
        ctx.shadowBlur = 0; // reset
        ctx.globalAlpha = 1.0; // reset alpha in case stealth edited it
      });

      // DRAW Boss
      const boss = entitiesRef.current.boss;
      if (boss.active && boss.y > -boss.height) {
        ctx.save();
        ctx.translate(boss.x, boss.y);

        // Heavy epic cinematic glow
        ctx.shadowBlur = 25;
        ctx.shadowColor = boss.color;

        const bossLvl = stateRef.current.level;

        if (bossLvl === 1) {
          // LEVEL 1: ALPHA SENTINEL (Tech delta defense platform with side energy cells)
          ctx.beginPath();
          ctx.moveTo(0, boss.height * 0.5 + 8); // main cannon nozzle
          ctx.lineTo(-boss.width * 0.25, boss.height * 0.35);
          ctx.lineTo(-boss.width * 0.5, -boss.height * 0.4); // left sweep wing
          ctx.lineTo(-boss.width * 0.2, -boss.height * 0.2); // reactor bay indent
          ctx.lineTo(boss.width * 0.2, -boss.height * 0.2);  // reactor bay indent
          ctx.lineTo(boss.width * 0.5, -boss.height * 0.4);  // right sweep wing
          ctx.lineTo(boss.width * 0.25, boss.height * 0.35);
          ctx.closePath();

          const bGrad1 = ctx.createLinearGradient(0, -boss.height / 2, 0, boss.height / 2);
          bGrad1.addColorStop(0, '#334155'); // Gunmetal structural plates
          bGrad1.addColorStop(0.5, '#475569'); // slate steel
          bGrad1.addColorStop(1, '#facc15'); // glowing yellow exhaust/cannons
          ctx.fillStyle = bGrad1;
          ctx.fill();

          ctx.lineWidth = 3;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();

          // Side generator wings
          ctx.fillStyle = '#fbbf24';
          ctx.fillRect(-boss.width * 0.42, -boss.height * 0.3, 10, 18);
          ctx.fillRect(boss.width * 0.42 - 10, -boss.height * 0.3, 10, 18);
          ctx.strokeRect(-boss.width * 0.42, -boss.height * 0.3, 10, 18);
          ctx.strokeRect(boss.width * 0.42 - 10, -boss.height * 0.3, 10, 18);

          // Central hyper pulse core
          const pulseSize = 7 + Math.sin(Date.now() * 0.015) * 2.5;
          ctx.beginPath();
          ctx.arc(0, boss.height * 0.05, pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = '#eab308';
          ctx.fill();
        } 
        else if (bossLvl === 2) {
          // LEVEL 2: FUCHSIA OVERLORD (Bio-mechanical dreadnought alien carrier with curved mandibles)
          ctx.beginPath();
          ctx.moveTo(0, boss.height * 0.6); // sharp mandible point
          ctx.quadraticCurveTo(-boss.width * 0.25, boss.height * 0.2, -boss.width * 0.55, -boss.height * 0.45); // curved outer left claw
          ctx.lineTo(-boss.width * 0.3, -boss.height * 0.2); // sweep back
          ctx.lineTo(-boss.width * 0.15, -boss.height * 0.5); // left thruster fin
          ctx.lineTo(boss.width * 0.15, -boss.height * 0.5);  // right thruster fin
          ctx.lineTo(boss.width * 0.3, -boss.height * 0.2);  // sweep back
          ctx.lineTo(boss.width * 0.55, -boss.height * 0.45);  // curved outer right claw
          ctx.quadraticCurveTo(boss.width * 0.25, boss.height * 0.2, 0, boss.height * 0.6);
          ctx.closePath();

          const bGrad2 = ctx.createLinearGradient(0, -boss.height / 2, 0, boss.height / 2);
          bGrad2.addColorStop(0, '#701a75'); // Dark cosmic amethyst
          bGrad2.addColorStop(0.5, '#d946ef'); // vivid fuchsia Overlord core
          bGrad2.addColorStop(1, '#ec4899'); // cyber hot pink claws
          ctx.fillStyle = bGrad2;
          ctx.fill();

          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#e0f2fe';
          ctx.stroke();

          // Luminescent biological eyes
          ctx.fillStyle = '#06b6d4'; // bright cyan eyes
          ctx.beginPath();
          ctx.arc(-boss.width * 0.15, boss.height * 0.15, 5, 0, Math.PI * 2);
          ctx.arc(boss.width * 0.15, boss.height * 0.15, 5, 0, Math.PI * 2);
          ctx.fill();

          // Pulsating bio-reactor tubes
          ctx.beginPath();
          ctx.moveTo(-boss.width * 0.3, -boss.height * 0.1);
          ctx.lineTo(-boss.width * 0.4, -boss.height * 0.35);
          ctx.moveTo(boss.width * 0.3, -boss.height * 0.1);
          ctx.lineTo(boss.width * 0.4, -boss.height * 0.35);
          ctx.strokeStyle = '#a855f7';
          ctx.lineWidth = 3;
          ctx.stroke();
        } 
        else if (bossLvl === 3) {
          // LEVEL 3: SOLAR ANNIHILATOR (Star destroyer with massive central thermonuclear core)
          ctx.beginPath();
          // Symmetrical octagon star-shaped armor hull
          ctx.moveTo(0, boss.height * 0.55); // giant fusion nozzle facing down
          ctx.lineTo(-boss.width * 0.3, boss.height * 0.2);
          ctx.lineTo(-boss.width * 0.52, boss.height * 0.05); // side wing left
          ctx.lineTo(-boss.width * 0.48, -boss.height * 0.45); // top stabilizer corner left
          ctx.lineTo(-boss.width * 0.18, -boss.height * 0.45);
          ctx.lineTo(0, -boss.height * 0.28);                 // nuclear cooling valve
          ctx.lineTo(boss.width * 0.18, -boss.height * 0.45);
          ctx.lineTo(boss.width * 0.48, -boss.height * 0.45);  // top stabilizer corner right
          ctx.lineTo(boss.width * 0.52, boss.height * 0.05);  // side wing right
          ctx.lineTo(boss.width * 0.3, boss.height * 0.2);
          ctx.closePath();

          const bGrad3 = ctx.createLinearGradient(0, -boss.height / 2, 0, boss.height / 2);
          bGrad3.addColorStop(0, '#f97316'); // Volcanic sunspots
          bGrad3.addColorStop(0.5, '#ef4444'); // high heat magma red
          bGrad3.addColorStop(1, '#facc15'); // blinding fusion yellow
          ctx.fillStyle = bGrad3;
          ctx.fill();

          ctx.lineWidth = 3;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();

          // Active magma thermal lines
          ctx.beginPath();
          ctx.moveTo(-boss.width * 0.25, 0);
          ctx.lineTo(0, boss.height * 0.2);
          ctx.lineTo(boss.width * 0.25, 0);
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Four active plasma vents
          ctx.fillStyle = '#ffffff';
          [-boss.width * 0.38, -boss.width * 0.2, boss.width * 0.2, boss.width * 0.38].forEach((vx) => {
            ctx.beginPath();
            ctx.arc(vx, -boss.height * 0.35, 4.5, 0, Math.PI * 2);
            ctx.fill();
          });
        } 
        else if (bossLvl === 4) {
          // LEVEL 4: PRISMATIC VOID (Holographic stealth crystal singularity that hue-shifts)
          const hueShift = (Date.now() * 0.05) % 360;
          ctx.beginPath();
          // Sharp fractal diamond facets
          ctx.moveTo(0, boss.height * 0.65); // sharp crystal tip
          ctx.lineTo(-boss.width * 0.3, boss.height * 0.2);
          ctx.lineTo(-boss.width * 0.55, -boss.height * 0.1); // side spike left
          ctx.lineTo(-boss.width * 0.25, -boss.height * 0.5); // back prong left
          ctx.lineTo(0, -boss.height * 0.15);                 // void vortex slot
          ctx.lineTo(boss.width * 0.25, -boss.height * 0.5);  // back prong right
          ctx.lineTo(boss.width * 0.55, -boss.height * 0.1);  // side spike right
          ctx.lineTo(boss.width * 0.3, boss.height * 0.2);
          ctx.closePath();

          const bGrad4 = ctx.createLinearGradient(0, -boss.height / 2, 0, boss.height / 2);
          bGrad4.addColorStop(0, `hsl(${hueShift}, 90%, 50%)`);
          bGrad4.addColorStop(0.5, `hsl(${(hueShift + 120) % 360}, 95%, 45%)`);
          bGrad4.addColorStop(1, `hsl(${(hueShift + 240) % 360}, 100%, 60%)`);
          ctx.fillStyle = bGrad4;
          ctx.fill();

          ctx.lineWidth = 2;
          ctx.strokeStyle = 'rgba(255,255,255,0.95)';
          ctx.stroke();

          // Inner crystal facet lines for 3D holographic structure
          ctx.beginPath();
          ctx.moveTo(0, boss.height * 0.65);
          ctx.lineTo(0, -boss.height * 0.15);
          ctx.moveTo(-boss.width * 0.55, -boss.height * 0.1);
          ctx.lineTo(0, 0);
          ctx.lineTo(boss.width * 0.55, -boss.height * 0.1);
          ctx.strokeStyle = 'rgba(255,255,255,0.5)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Black hole singularity core inside!
          ctx.beginPath();
          ctx.arc(0, 0, 11, 0, Math.PI * 2);
          ctx.fillStyle = '#020617'; // pitch black void core
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#22d3ee'; // bright cyan event horizon ring
          ctx.stroke();
        } 
        else if (bossLvl === 5) {
          // LEVEL 5: INFINITY COLOSSUS (Ultimate six-winged demonic dark matter leviathan)
          ctx.beginPath();
          // Triple horned fork geometry
          ctx.moveTo(0, boss.height * 0.7); // massive central doomsday horn
          ctx.lineTo(-boss.width * 0.12, boss.height * 0.25);
          ctx.lineTo(-boss.width * 0.38, boss.height * 0.55); // left doomsday prong!
          ctx.lineTo(-boss.width * 0.42, boss.height * 0.12);
          ctx.lineTo(-boss.width * 0.65, -boss.height * 0.4);  // outer left titan stabilizer
          ctx.lineTo(-boss.width * 0.22, -boss.height * 0.22);
          ctx.lineTo(0, -boss.height * 0.55);                  // dark matter hyper-drive exhaust
          ctx.lineTo(boss.width * 0.22, -boss.height * 0.22);
          ctx.lineTo(boss.width * 0.65, -boss.height * 0.4);   // outer right titan stabilizer
          ctx.lineTo(boss.width * 0.42, boss.height * 0.12);
          ctx.lineTo(boss.width * 0.38, boss.height * 0.55);  // right doomsday prong!
          ctx.lineTo(boss.width * 0.12, boss.height * 0.25);
          ctx.closePath();

          const bGrad5 = ctx.createLinearGradient(0, -boss.height / 2, 0, boss.height / 2);
          bGrad5.addColorStop(0, '#e11d48'); // Blazing Demonic crimson
          bGrad5.addColorStop(0.4, '#312e81'); // infinite dark void indigo
          bGrad5.addColorStop(1, '#020617'); // obsidian black carbon
          ctx.fillStyle = bGrad5;
          ctx.fill();

          ctx.lineWidth = 3.5;
          ctx.strokeStyle = '#fca5a5';
          ctx.stroke();

          // Draw rotating radioactive golden gravity ring around the boss reactor
          const ringAngle = Date.now() * 0.035;
          ctx.save();
          ctx.rotate(ringAngle);
          ctx.beginPath();
          ctx.ellipse(0, 0, 24, 7, 0, 0, Math.PI * 2);
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 2.5;
          ctx.stroke();
          ctx.restore();

          // Glowing white-hot radioactive energy reactor
          ctx.beginPath();
          ctx.arc(0, 0, 9 + Math.sin(Date.now() * 0.03) * 2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
        else if (bossLvl === 6) {
          // LEVEL 6: ASHEN CORE (A fiery massive molten engine with revolving heat shields)
          ctx.beginPath();
          ctx.arc(0, 0, boss.width * 0.4, 0, Math.PI * 2);
          const ashenGrad = ctx.createRadialGradient(-5, -5, 5, 0, 0, boss.width * 0.4);
          ashenGrad.addColorStop(0, '#f97316'); // lava orange
          ashenGrad.addColorStop(0.7, '#451a03'); // deep brown coal
          ashenGrad.addColorStop(1, '#0c0a09'); // black stone
          ctx.fillStyle = ashenGrad;
          ctx.fill();
          ctx.lineWidth = 3;
          ctx.strokeStyle = '#ea580c';
          ctx.stroke();

          // Outer revolving thermal vents (rotating segment arcs)
          const rotAngle = Date.now() * 0.015;
          ctx.lineWidth = 4;
          ctx.strokeStyle = '#f97316';
          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(0, 0, boss.width * 0.52, rotAngle + (i * Math.PI * 2) / 3, rotAngle + (i * Math.PI * 2) / 3 + 1.2);
            ctx.stroke();
          }

          // Blazing central magma nozzle
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, 0, 12, 0, Math.PI * 2);
          ctx.fill();
        }
        else if (bossLvl === 7) {
          // LEVEL 7: VORTEX TITAN (An electric-blue twin-tornado energy battery that sparks lightning)
          ctx.fillStyle = '#1e3a8a';
          ctx.strokeStyle = '#60a5fa';
          ctx.lineWidth = 2.5;

          ctx.beginPath();
          ctx.rect(-boss.width * 0.42, -boss.height * 0.35, 18, boss.height * 0.7);
          ctx.fill();
          ctx.stroke();

          // Draw right generator cylinder
          ctx.beginPath();
          ctx.rect(boss.width * 0.42 - 18, -boss.height * 0.35, 18, boss.height * 0.7);
          ctx.fill();
          ctx.stroke();

          // Connective electric reactor body
          ctx.beginPath();
          ctx.moveTo(-boss.width * 0.25, -boss.height * 0.15);
          ctx.lineTo(boss.width * 0.25, -boss.height * 0.15);
          ctx.lineTo(boss.width * 0.15, boss.height * 0.25);
          ctx.lineTo(-boss.width * 0.15, boss.height * 0.25);
          ctx.closePath();
          const voltGrad = ctx.createLinearGradient(0, -boss.height / 2, 0, boss.height / 2);
          voltGrad.addColorStop(0, '#2563eb');
          voltGrad.addColorStop(1, '#1d4ed8');
          ctx.fillStyle = voltGrad;
          ctx.fill();
          ctx.stroke();

          // Lightning sparks in the center
          ctx.beginPath();
          ctx.moveTo(-boss.width * 0.18, 0);
          ctx.lineTo(-5, -12);
          ctx.lineTo(5, 12);
          ctx.lineTo(boss.width * 0.18, 0);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        else if (bossLvl === 8) {
          // LEVEL 8: FROSTBITE EMPRESS (A sharp, geometric icy crown platform with floating frost spears)
          ctx.beginPath();
          ctx.moveTo(0, boss.height * 0.55); // center ice spike
          ctx.lineTo(-boss.width * 0.15, boss.height * 0.2);
          ctx.lineTo(-boss.width * 0.4, boss.height * 0.35); // side left spike
          ctx.lineTo(-boss.width * 0.3, -boss.height * 0.2);
          ctx.lineTo(-boss.width * 0.5, -boss.height * 0.4); // top left peak
          ctx.lineTo(-boss.width * 0.15, -boss.height * 0.25);
          ctx.lineTo(0, -boss.height * 0.45); // top center crown
          ctx.lineTo(boss.width * 0.15, -boss.height * 0.25);
          ctx.lineTo(boss.width * 0.5, -boss.height * 0.4);  // top right peak
          ctx.lineTo(boss.width * 0.3, -boss.height * 0.2);
          ctx.lineTo(boss.width * 0.4, boss.height * 0.35);  // side right spike
          ctx.lineTo(boss.width * 0.15, boss.height * 0.2);
          ctx.closePath();

          const frostGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, boss.width * 0.5);
          frostGrad.addColorStop(0, '#e0f2fe'); // ice white
          frostGrad.addColorStop(0.5, '#38bdf8'); // deep glacier blue
          frostGrad.addColorStop(1, '#0369a1'); // crystal cobalt
          ctx.fillStyle = frostGrad;
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();

          // Float icy diamond needles around
          const iceAngle = Date.now() * 0.01;
          ctx.fillStyle = '#ffffff';
          for (let i = 0; i < 4; i++) {
            const ix = Math.cos(iceAngle + (i * Math.PI) / 2) * (boss.width * 0.58);
            const iy = Math.sin(iceAngle + (i * Math.PI) / 2) * (boss.width * 0.58);
            ctx.beginPath();
            ctx.moveTo(ix, iy - 8);
            ctx.lineTo(ix + 5, iy);
            ctx.lineTo(ix, iy + 8);
            ctx.lineTo(ix - 5, iy);
            ctx.closePath();
            ctx.fill();
          }
        }
        else if (bossLvl === 9) {
          // LEVEL 9: TOXIC OVERLORD (A nuclear-bio hazard tank dripping sludge and releasing gas rings)
          ctx.beginPath();
          ctx.arc(0, -5, boss.width * 0.35, 0, Math.PI * 2);
          const toxGrad = ctx.createRadialGradient(-8, -8, 2, 0, 0, boss.width * 0.35);
          toxGrad.addColorStop(0, '#a3e635'); // bio acid lime green
          toxGrad.addColorStop(0.6, '#4d7c0f'); // poison slime forest green
          toxGrad.addColorStop(1, '#1c1917'); // rusty dark steel
          ctx.fillStyle = toxGrad;
          ctx.fill();
          ctx.lineWidth = 3;
          ctx.strokeStyle = '#65a30d';
          ctx.stroke();

          // Left/Right glowing toxic exhaust vents
          ctx.fillStyle = '#3f3f46';
          ctx.fillRect(-boss.width * 0.46, -boss.height * 0.2, 14, 28);
          ctx.fillRect(boss.width * 0.46 - 14, -boss.height * 0.2, 14, 28);
          ctx.strokeStyle = '#a3e635';
          ctx.strokeRect(-boss.width * 0.46, -boss.height * 0.2, 14, 28);
          ctx.strokeRect(boss.width * 0.46 - 14, -boss.height * 0.2, 14, 28);

          // Acid gas glowing ring
          const scaleGas = 1 + Math.sin(Date.now() * 0.02) * 0.1;
          ctx.beginPath();
          ctx.ellipse(0, 5, boss.width * 0.45 * scaleGas, boss.height * 0.15 * scaleGas, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(163, 230, 53, 0.4)';
          ctx.lineWidth = 4;
          ctx.stroke();
        }
        else {
          // LEVEL 10+: OBLIVION NEMESIS (Ultimate black hole singularity with red cosmic void eyes)
          ctx.beginPath();
          ctx.moveTo(-boss.width * 0.1, boss.height * 0.3);
          ctx.quadraticCurveTo(-boss.width * 0.65, boss.height * 0.6, -boss.width * 0.72, -boss.height * 0.3); // left massive wing sweep
          ctx.quadraticCurveTo(-boss.width * 0.38, -boss.height * 0.15, 0, -boss.height * 0.45);
          ctx.quadraticCurveTo(boss.width * 0.38, -boss.height * 0.15, boss.width * 0.72, -boss.height * 0.3);  // right massive wing sweep
          ctx.quadraticCurveTo(boss.width * 0.65, boss.height * 0.6, boss.width * 0.1, boss.height * 0.3);
          ctx.closePath();

          const nemGrad = ctx.createLinearGradient(0, -boss.height / 2, 0, boss.height / 2);
          nemGrad.addColorStop(0, '#f43f5e'); // hot radioactive solar red
          nemGrad.addColorStop(0.5, '#4c1d95'); // dark matter nebula violet
          nemGrad.addColorStop(1, '#090514'); // absolute pitch-black horizon
          ctx.fillStyle = nemGrad;
          ctx.fill();
          ctx.lineWidth = 3.5;
          ctx.strokeStyle = '#fda4af';
          ctx.stroke();

          // Accretion gravity disk
          const diskRot = -Date.now() * 0.045;
          ctx.save();
          ctx.rotate(diskRot);
          ctx.beginPath();
          ctx.ellipse(0, 0, boss.width * 0.4, 9, 0, 0, Math.PI * 2);
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 3.5;
          ctx.stroke();
          ctx.restore();

          // Singularity void core
          ctx.beginPath();
          ctx.arc(0, 0, 16, 0, Math.PI * 2);
          ctx.fillStyle = '#000000';
          ctx.fill();
          ctx.lineWidth = 3.5;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();

          // Menacing void eye slits
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.ellipse(-8, -4, 4, 1.5, Math.PI * 0.15, 0, Math.PI * 2);
          ctx.ellipse(8, -4, 4, 1.5, -Math.PI * 0.15, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
        ctx.shadowBlur = 0; // reset shadow
      }

      // DRAW Player Bullets & Lasers
      entitiesRef.current.bullets.forEach((bullet) => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fillStyle = bullet.color;
        ctx.fill();

        // Shiny inner core
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      });

      // DRAW Coins
      entitiesRef.current.coins.forEach((coin) => {
        ctx.save();
        ctx.translate(coin.x, coin.y);

        // Golden spin glow
        ctx.beginPath();
        ctx.arc(0, 0, coin.radius + Math.sin(coin.pulse) * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(234, 179, 8, 0.25)';
        ctx.fill();

        // Main Coin
        ctx.beginPath();
        ctx.arc(0, 0, coin.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.fill();

        // Outline & border
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#ca8a04';
        ctx.stroke();

        // Inner star emblem
        ctx.beginPath();
        ctx.arc(0, 0, coin.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#fef08a';
        ctx.fill();

        ctx.restore();
      });

      // DRAW Power-Ups
      entitiesRef.current.powerUps.forEach((pu) => {
        ctx.save();
        ctx.translate(pu.x, pu.y);

        // Ring glow
        ctx.beginPath();
        ctx.arc(0, 0, pu.radius + Math.sin(Date.now() * 0.01) * 3, 0, Math.PI * 2);
        ctx.strokeStyle = pu.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Capsule background
        ctx.beginPath();
        ctx.arc(0, 0, pu.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#1e293b';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = pu.color;
        ctx.stroke();

        // Power-Up Type Initial Character
        ctx.fillStyle = pu.color;
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const letter = pu.type === 'TRIPLE_SHOT' ? '3' 
                     : pu.type === 'RAPID_FIRE' ? 'R' 
                     : pu.type === 'SHIELD' ? 'S' 
                     : 'B';
        ctx.fillText(letter, 0, 0);

        ctx.restore();
      });

      // DRAW Particles
      entitiesRef.current.particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        
        if (p.ring) {
          // Render as a high-impact expanding shockwave ring
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.lineWidth = 4;
          ctx.strokeStyle = p.color;
          ctx.stroke();
        } else {
          // Standard particle or glowing ember
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          // Sparkle glow overlay
          if (p.glow) {
            ctx.shadowBlur = 12;
            ctx.shadowColor = p.color;
            ctx.fillStyle = '#ffffff';
            ctx.fill();
          }
        }
        ctx.restore();

        // Update physics
        if (p.ring) {
          // Accelerate ring expansion
          p.radius += (p.maxRadius ? (p.maxRadius - p.radius) * 0.18 : 3);
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }
        p.alpha -= p.decay;
      });

      // Filter decayed particles
      entitiesRef.current.particles = entitiesRef.current.particles.filter(
        (p) => p.alpha > 0.04
      );

      // DRAW Player (Spaceship)
      const player = entitiesRef.current.player;
      if (stateRef.current.gameState === 'PLAYING') {
        const isInvulnerable = player.invulnerableTimer > 0;
        
        // Flickering when invulnerable
        if (!isInvulnerable || Math.floor(Date.now() / 50) % 2 === 0) {
          ctx.save();
          ctx.translate(player.x, player.y);

          // Draw thrust fire behind ship
          const flameHeight = 12 + Math.random() * 8;
          ctx.beginPath();
          ctx.moveTo(-6, player.radius - 2);
          ctx.lineTo(0, player.radius + flameHeight);
          ctx.lineTo(6, player.radius - 2);
          ctx.closePath();
          ctx.fillStyle = '#f97316';
          ctx.fill();

          // Core flame
          ctx.beginPath();
          ctx.moveTo(-3, player.radius - 2);
          ctx.lineTo(0, player.radius + flameHeight * 0.6);
          ctx.lineTo(3, player.radius - 2);
          ctx.closePath();
          ctx.fillStyle = '#facc15';
          ctx.fill();

          // Spacejet Wing Geometry (High quality vector shape)
          ctx.beginPath();
          ctx.moveTo(0, -player.radius); // nose
          ctx.lineTo(-player.radius, player.radius * 0.6); // wing left tip
          ctx.lineTo(-player.radius * 0.4, player.radius * 0.2); // inner wing
          ctx.lineTo(-player.radius * 0.3, player.radius); // engine pod left
          ctx.lineTo(player.radius * 0.3, player.radius);  // engine pod right
          ctx.lineTo(player.radius * 0.4, player.radius * 0.2);  // inner wing
          ctx.lineTo(player.radius, player.radius * 0.6);  // wing right tip
          ctx.closePath();

          // Glossy cockpit gradient
          const playerGrad = ctx.createLinearGradient(0, -player.radius, 0, player.radius);
          playerGrad.addColorStop(0, '#38bdf8');
          playerGrad.addColorStop(0.6, currentLevelCfg.colorPalette.player);
          playerGrad.addColorStop(1, '#0369a1');
          ctx.fillStyle = playerGrad;
          ctx.fill();

          // High Contrast White Outer Border
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();

          // Draw physical gun barrels protruding based on weapon/nozzle level
          const pLvl = player.weaponLevel || 1;
          ctx.fillStyle = '#64748b'; // steel gun metal
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 1.5;

          if (pLvl >= 2) {
            ctx.fillRect(-player.radius - 4, -4, 6, 12);
            ctx.strokeRect(-player.radius - 4, -4, 6, 12);
            ctx.fillRect(player.radius - 2, -4, 6, 12);
            ctx.strokeRect(player.radius - 2, -4, 6, 12);

            // Bright glowing laser tips
            ctx.fillStyle = player.powerUpType ? '#f43f5e' : '#38bdf8';
            ctx.fillRect(-player.radius - 3, -7, 4, 3);
            ctx.fillRect(player.radius - 1, -7, 4, 3);
          }

          if (pLvl >= 4) {
            // Draw extra shoulder heavy cannons!
            ctx.fillStyle = '#475569';
            ctx.fillRect(-player.radius * 0.5 - 3, -12, 6, 16);
            ctx.strokeRect(-player.radius * 0.5 - 3, -12, 6, 16);
            ctx.fillRect(player.radius * 0.5 - 3, -12, 6, 16);
            ctx.strokeRect(player.radius * 0.5 - 3, -12, 6, 16);

            ctx.fillStyle = player.powerUpType === 'BEAM' ? '#d946ef' : '#ec4899';
            ctx.fillRect(-player.radius * 0.5 - 2, -15, 4, 3);
            ctx.fillRect(player.radius * 0.5 - 2, -15, 4, 3);
          }

          // Draw central power core
          ctx.beginPath();
          ctx.arc(0, 0, 5, 0, Math.PI * 2);
          ctx.fillStyle = player.powerUpType ? '#f43f5e' : '#22c55e';
          ctx.fill();

          // Draw active power protective shield bubble
          if (player.powerUpType === 'SHIELD' || player.shield > 0) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#10b981';
            ctx.beginPath();
            ctx.arc(0, 0, player.radius * 1.8, 0, Math.PI * 2);
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }

          ctx.restore();
        }
      }

      ctx.restore(); // restore viewport shake translation

      animId = requestAnimationFrame(updateAndRender);
    };

    animId = requestAnimationFrame(updateAndRender);
    return () => cancelAnimationFrame(animId);
  }, []);
  return (
    <div id="game-root-container" className="min-h-screen w-full bg-slate-100 flex flex-col md:flex-row items-center justify-center font-sans select-none overflow-x-hidden">
      
      {/* 1. LEFT SIDE PANEL (Desktop Instructions & Branding) */}
      <div id="left-info-panel" className="hidden lg:flex flex-col max-w-xs w-full bg-white border-r border-slate-200 p-6 self-stretch justify-between shadow-sm">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="p-2.5 bg-sky-500 text-white rounded-xl shadow-md shadow-sky-200">
              <Zap className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800">{t.gameTitle}</h1>
              <p className="text-xs text-sky-600 font-semibold uppercase tracking-wider">{t.tagline}</p>
            </div>
          </div>

          <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 space-y-2">
            <h3 className="text-sm font-bold text-sky-900 flex items-center gap-1.5">
              <Info className="h-4 w-4" /> {t.howToPlay}
            </h3>
            <ul className="text-xs text-sky-800 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li>
                <strong>{t.rule1Label}</strong>: {t.rule1Desc}
              </li>
              <li>
                <strong>{t.rule2Label}</strong>: {t.rule2Desc}
              </li>
              <li>
                <strong>{t.dodgeLabel}</strong>: {t.dodgeDesc}
              </li>
              <li>
                <strong>{t.breakLabel}</strong>: {t.breakDesc}
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.weaponAndPowers}</h4>
            <div className="grid grid-cols-1 gap-2.5">
              <div className="flex items-center space-x-2.5 p-2 bg-slate-50 rounded-lg text-xs text-slate-700">
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">3</span>
                <span>{t.tripleShotDesc}</span>
              </div>
              <div className="flex items-center space-x-2.5 p-2 bg-slate-50 rounded-lg text-xs text-slate-700">
                <span className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold">R</span>
                <span>{t.rapidFireDesc}</span>
              </div>
              <div className="flex items-center space-x-2.5 p-2 bg-slate-50 rounded-lg text-xs text-slate-700">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">S</span>
                <span>{t.shieldBarrierDesc}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 text-[11px] text-slate-400 leading-normal space-y-1">
          <p>{t.copyright}</p>
          <p>{t.designedForYt}</p>
          <p className="text-emerald-600 font-medium">{t.memoryOptimized}</p>
        </div>
      </div>

      {/* 2. CENTER STAGE (The Actual Responsive Game Screen) */}
      <div id="center-game-stage" className="flex-1 max-w-lg w-full aspect-[9/16] md:max-h-[92vh] md:rounded-3xl bg-white shadow-2xl relative overflow-hidden border-4 border-slate-800 md:my-4 flex flex-col">
        
        {/* ACTIVE POWER-UP OVERLAY ALERT (SMALLER & LEFT-ALIGNED) */}
        {entitiesRef.current.player.powerUpType && (
          <div className="absolute top-12 left-4 bg-slate-900/90 text-white py-0.5 px-2 rounded-lg border border-pink-500 flex items-center gap-1 text-[10px] font-black shadow-lg animate-pulse z-10">
            <Flame className="h-3 w-3 text-pink-500 animate-pulse" />
            <span>
              {entitiesRef.current.player.powerUpType === 'TRIPLE_SHOT' ? '3-SHOT' 
               : entitiesRef.current.player.powerUpType === 'RAPID_FIRE' ? 'RAPID' 
               : entitiesRef.current.player.powerUpType === 'SHIELD' ? 'SHIELD' 
               : 'LASER'}
            </span>
            <span className="text-[9px] text-pink-400 font-mono pl-1 border-l border-slate-700">
              {Math.ceil(entitiesRef.current.player.powerUpTimer / 60)}s
            </span>
          </div>
        )}

        {/* DYNAMIC LEVEL OVERLAY POPUP */}
        <div className="absolute bottom-20 left-4 bg-sky-400 text-slate-950 px-3 py-1 rounded-lg font-black text-xs shadow-lg flex items-center gap-1 border-2 border-slate-950 rotate-[-4deg] z-10">
          <Zap className="h-3 w-3 fill-slate-950 animate-bounce text-yellow-300" />
          {language === 'hi' ? 'स्तर' : 'LEVEL'} {level}
        </div>

        {/* ACTIVE MAIN CANVAS GAMEBOARD */}
        <canvas 
          ref={canvasRef} 
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="flex-1 w-full h-full block cursor-crosshair touch-none"
        />

        {/* PHYSICAL BOTTOM TACTICAL COCKPIT DASHBOARD CONSOLE */}
        <div id="cockpit-hud-bottom" className="w-full bg-slate-950 border-t-2 border-slate-800 text-slate-100 p-3 select-none flex flex-col relative shrink-0 shadow-inner">
          
          {/* Neon Level Progress Line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-slate-900 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                bossActive ? 'bg-rose-500 animate-pulse shadow-[0_0_8px_#f43f5e]' : 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
              }`} 
              style={{ width: `${levelProgress}%` }}
            />
          </div>

          {/* Quick Boss Announcement Bar */}
          {bossActive && (
            <div className="text-center text-[9px] text-rose-400 font-black tracking-widest animate-pulse uppercase mb-1 flex items-center justify-center gap-1">
              <ShieldAlert className="h-3 w-3 text-rose-400 animate-bounce" />
              {t.bossActiveMsg}
            </div>
          )}

          {/* Grid Panel Layout */}
          <div className="grid grid-cols-3 gap-2 items-center">
            
            {/* Panel 1: Tactical Readings (Left) */}
            <div className="flex flex-col space-y-1 text-left pl-1 border-r border-slate-800/80">
              <div>
                <span className="block text-[8px] text-slate-500 font-extrabold uppercase tracking-wider">{t.points}</span>
                <div className="flex items-center gap-1">
                  <Award className="h-3.5 w-3.5 text-yellow-500" />
                  <span className="text-base font-black text-yellow-400 font-mono tracking-tight">
                    {score.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Coins className="h-3 w-3 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-amber-400">{coins}</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest ml-1">{t.coins}</span>
              </div>
            </div>

            {/* Panel 2: Hull Integrity & Guns (Center) */}
            <div className="flex flex-col items-center justify-center space-y-1.5 px-1 border-r border-slate-800/80">
              <div>
                <span className="block text-[8px] text-slate-500 font-extrabold uppercase tracking-wider text-center">{t.hullIntegrity}</span>
                <div className="flex space-x-0.5 justify-center mt-0.5">
                  {[...Array(3)].map((_, i) => (
                    <Heart 
                      key={i} 
                      className={`h-4.5 w-4.5 transition-all duration-300 ${
                        i < lives ? 'text-rose-500 fill-rose-500 filter drop-shadow-[0_0_3px_#f43f5e]' : 'text-slate-800'
                      }`} 
                    />
                  ))}
                </div>
              </div>

              {/* Weapon level slider */}
              <div className="w-full flex flex-col items-center">
                <div className="flex items-center justify-between w-full px-2 text-[8px] text-slate-500 font-bold tracking-widest uppercase">
                  <span>{t.nozzle}</span>
                  <span className="text-cyan-400">LVL {weaponLevel}</span>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mt-0.5 max-w-[80px]">
                  <div 
                    className="bg-cyan-400 h-full transition-all duration-300" 
                    style={{ width: `${Math.min(100, (weaponLevel / 4) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Panel 3: Sector Info & System overrides (Right) */}
            <div className="flex items-center justify-between pl-1">
              {/* Sector info */}
              <div className="flex flex-col text-left">
                <span className="block text-[8px] text-slate-500 font-extrabold uppercase tracking-wider">{t.zone}</span>
                <span className="text-sm font-black text-emerald-400 font-mono tracking-tight flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 fill-emerald-400 text-emerald-400 animate-pulse" />
                  Z-{level}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-1 pr-1">
                <button 
                  onClick={handleToggleMute}
                  className="p-1 bg-slate-900 hover:bg-slate-800 rounded-md border border-slate-800 text-slate-300 transition duration-150 flex items-center justify-center shadow-sm"
                  title="Mute / Unmute"
                >
                  {soundMuted ? <VolumeX className="h-3 w-3 text-rose-400" /> : <Volume2 className="h-3 w-3 text-emerald-400" />}
                </button>
                {gameState === 'PLAYING' && (
                  <button 
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-1 bg-slate-900 hover:bg-slate-800 rounded-md border border-slate-800 text-slate-300 transition duration-150 flex items-center justify-center shadow-sm"
                    title="Pause game"
                  >
                    <Pause className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* OVERLAY: PAUSE SCREEN */}
        <AnimatePresence>
          {isPaused && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/75 backdrop-blur-md flex flex-col items-center justify-center z-20 text-white p-6"
            >
              <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl text-center space-y-6 max-w-xs w-full">
                <h2 className="text-2xl font-black tracking-tight text-yellow-400">{t.gamePaused}</h2>
                <p className="text-sm text-slate-300">{t.pauseDesc}</p>
                <button
                  onClick={() => setIsPaused(false)}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-slate-950 font-black rounded-xl transition shadow-lg shadow-emerald-500/20 uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                >
                  <Play className="h-4 w-4 fill-slate-950" /> {t.resumeGameBtn}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* OVERLAY: START SCREEN */}
        <AnimatePresence>
          {gameState === 'START' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-amber-50 to-emerald-50 flex flex-col items-center justify-center z-20 p-6"
            >
              <div className="text-center space-y-5 max-w-sm w-full">
                <div className="space-y-2">
                  <div className="inline-block p-4 bg-sky-500 text-white rounded-3xl shadow-xl shadow-sky-500/30 animate-bounce">
                    <Zap className="h-10 w-10 fill-white" />
                  </div>
                  <h2 className="text-4xl font-extrabold text-slate-900 tracking-tighter">
                    {t.gameTitle}
                  </h2>
                  <p className="text-xs font-bold text-sky-600 uppercase tracking-widest">
                    {t.startSubtitle}
                  </p>
                </div>

                {/* LANGUAGE SELECTION CONTROL (Prominent Pill switcher) */}
                <div className="bg-white/90 backdrop-blur border border-slate-200/80 p-3 rounded-2xl shadow-md flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1 shrink-0">
                    {language === 'en' ? 'Language' : 'भाषा चुनें'}
                  </span>
                  <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50 w-full justify-end max-w-[200px]">
                    <button
                      onClick={() => setLanguage('en')}
                      className={`flex-1 py-1 px-3 text-xs font-black rounded-lg transition-all ${
                        language === 'en' 
                          ? 'bg-sky-500 text-white shadow-md' 
                          : 'text-slate-600 hover:bg-slate-200/50'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setLanguage('hi')}
                      className={`flex-1 py-1 px-3 text-xs font-black rounded-lg transition-all ${
                        language === 'hi' 
                          ? 'bg-sky-500 text-white shadow-md' 
                          : 'text-slate-600 hover:bg-slate-200/50'
                      }`}
                    >
                      हिन्दी
                    </button>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur border border-slate-200/80 p-4 rounded-2xl shadow-lg text-left space-y-3">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">{t.instructionsTitle}</h4>
                  <div className="space-y-2.5">
                    <div className="flex gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5">१</div>
                      <p className="text-xs text-slate-700 leading-snug">
                        <strong>{t.rule1Label}</strong>: {t.rule1Desc}
                      </p>
                    </div>
                    <div className="flex gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5">२</div>
                      <p className="text-xs text-slate-700 leading-snug">
                        <strong>{t.rule2Label}</strong>: {t.rule2Desc}
                      </p>
                    </div>
                    <div className="flex gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5">३</div>
                      <p className="text-xs text-slate-700 leading-snug">
                        <strong>{t.rule3Label}</strong>: {t.rule3Desc}
                      </p>
                    </div>
                  </div>
                </div>

                {highScore > 0 && (
                  <div className="bg-amber-100 border border-amber-200 py-2.5 px-4 rounded-xl text-amber-900 font-extrabold text-sm flex items-center justify-center gap-2">
                    <Award className="h-5 w-5 text-amber-600 fill-amber-300" />
                    {t.bestScore}: {highScore.toLocaleString()}
                  </div>
                )}

                <button
                  onClick={handleStartGame}
                  className="w-full py-4 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 hover:opacity-95 text-white font-black rounded-2xl text-lg transition-all shadow-xl shadow-sky-500/20 hover:scale-[1.02] flex items-center justify-center gap-2 uppercase tracking-wide"
                >
                  {t.startGame} <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* OVERLAY: GAME OVER PANEL */}
        <AnimatePresence>
          {gameState === 'GAMEOVER' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center z-20 p-6 text-white"
            >
              <div className="text-center space-y-6 max-w-sm w-full">
                <div className="space-y-2">
                  <div className="inline-block p-4 bg-rose-500/10 text-rose-500 rounded-full border border-rose-500/30 mb-2">
                    <ShieldAlert className="h-12 w-12 animate-pulse" />
                  </div>
                  <h2 className="text-3xl font-black text-rose-500 tracking-tight">{t.gameOver}</h2>
                  <p className="text-xs text-slate-400">{t.gameOverDesc}</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl grid grid-cols-2 gap-4">
                  <div className="text-center border-r border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-black">{t.scoreLabel}</span>
                    <p className="text-2xl font-black text-yellow-400">{score.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-black">{t.coinsLabel}</span>
                    <p className="text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
                      <Coins className="h-5 w-5" /> {coins}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  {/* Revive for Ad simulated feature */}
                  {!hasUsedRevive ? (
                    <button
                      onClick={handleWatchAd}
                      className="w-full py-4 bg-gradient-to-r from-emerald-400 to-green-500 text-slate-950 font-black rounded-xl text-sm transition shadow-lg shadow-emerald-400/20 hover:scale-[1.01] flex items-center justify-center gap-2 uppercase tracking-wider"
                    >
                      <Tv className="h-4.5 w-4.5 animate-bounce" /> {t.watchAdRevive}
                    </button>
                  ) : (
                    <div className="text-xs text-slate-500 font-medium py-1">
                      {t.reviveLimitReached}
                    </div>
                  )}

                  <button
                    onClick={handleStartGame}
                    className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm transition border border-slate-700 flex items-center justify-center gap-2 uppercase"
                  >
                    <RotateCcw className="h-4 w-4" /> {t.playAgain}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* OVERLAY: SIMULATED VIDEO AD SCREEN */}
        <AnimatePresence>
          {gameState === 'REVIVE_AD' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950 flex flex-col items-stretch justify-between z-30 p-6 text-white"
            >
              {/* Header */}
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-900 pb-3">
                <span className="flex items-center gap-1 text-sky-400 font-extrabold uppercase tracking-widest text-[10px]">
                  <Tv className="h-3.5 w-3.5 animate-pulse" /> {t.sponsoredAd}
                </span>
                <span className="bg-slate-800 text-white font-mono px-2.5 py-1 rounded-md text-[10px] font-black">
                  {t.adClosesIn} {adCountdown}S
                </span>
              </div>

              {/* Video Ad Simulator Player Screen */}
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center my-6">
                
                {activeAdBanner === 0 && (
                  <div className="space-y-6">
                    <div className="w-24 h-24 mx-auto rounded-3xl bg-indigo-600 text-white flex items-center justify-center shadow-2xl animate-spin">
                      <Zap className="h-12 w-12 fill-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-indigo-400">{t.ad1Title}</h3>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                        "{t.ad1Desc}"
                      </p>
                    </div>
                    <div className="inline-block bg-indigo-500 text-slate-950 px-4 py-1.5 rounded-full text-xs font-black uppercase">
                      {t.ad1Action}
                    </div>
                  </div>
                )}

                {activeAdBanner === 1 && (
                  <div className="space-y-6">
                    <div className="w-24 h-24 mx-auto rounded-3xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl animate-bounce">
                      <Coins className="h-12 w-12 fill-slate-950" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-emerald-400">{t.ad2Title}</h3>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                        "{t.ad2Desc}"
                      </p>
                    </div>
                    <div className="inline-block bg-emerald-400 text-slate-950 px-4 py-1.5 rounded-full text-xs font-black uppercase">
                      {t.ad2Action}
                    </div>
                  </div>
                )}

                {activeAdBanner === 2 && (
                  <div className="space-y-6">
                    <div className="w-24 h-24 mx-auto rounded-3xl bg-rose-500 text-white flex items-center justify-center shadow-2xl animate-pulse">
                      <Heart className="h-12 w-12 fill-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-rose-400">{t.ad3Title}</h3>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                        "{t.ad3Desc}"
                      </p>
                    </div>
                    <div className="inline-block bg-rose-400 text-slate-950 px-4 py-1.5 rounded-full text-xs font-black uppercase">
                      {t.ad3Action}
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom footer bar */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center text-[10px] text-slate-500">
                {t.adFooter}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* 3. RIGHT SIDE PANEL (Mobile guidelines / YouTube Playable Stats info) */}
      <div id="right-info-panel" className="hidden lg:flex flex-col max-w-xs w-full bg-white border-l border-slate-200 p-6 self-stretch justify-between shadow-sm">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="p-2.5 bg-emerald-500 text-slate-950 rounded-xl shadow-md">
              <Coins className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-md font-bold text-slate-800">{t.ytPlayableSpec}</h3>
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">{t.optimizedSpec}</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <p>
              {t.playableSpecIntro}
            </p>
            <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
              <div className="flex items-center justify-between font-bold text-[11px] text-slate-700">
                <span>{t.memoryStorageOnly}</span>
                <span className="text-emerald-600 font-semibold">{t.memoryStoragePassed}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                {t.memoryStorageDesc}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
              <div className="flex items-center justify-between font-bold text-[11px] text-slate-700">
                <span>{t.audioSynth}</span>
                <span className="text-emerald-600 font-semibold">{t.audioSynthPassed}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                {t.audioSynthDesc}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
              <div className="flex items-center justify-between font-bold text-[11px] text-slate-700">
                <span>{t.colorsTheme}</span>
                <span className="text-emerald-600 font-semibold">{t.colorsThemePassed}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                {t.colorsThemeDesc}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 space-y-1">
          <h4 className="text-xs font-bold text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
            💡 {t.proTipTitle}
          </h4>
          <p className="text-[11px] text-amber-700 leading-normal">
            {t.proTipDesc}
          </p>
        </div>
      </div>

    </div>
  );
}
