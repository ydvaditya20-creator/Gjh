/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private masterVolume: GainNode | null = null;
  private bgmInterval: any = null;
  private bgmStep = 0;
  private isMuted = false;
  private isBgmPlaying = false;

  constructor() {
    // Lazy initialize on first gesture
  }

  private init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    this.ctx = new AudioContextClass();
    this.masterVolume = this.ctx.createGain();
    this.masterVolume.gain.setValueAtTime(0.2, this.ctx.currentTime); // default comfortable volume
    this.masterVolume.connect(this.ctx.destination);
  }

  public resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterVolume && this.ctx) {
      this.masterVolume.gain.setValueAtTime(this.isMuted ? 0 : 0.2, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMuteState() {
    return this.isMuted;
  }

  public playShoot() {
    this.resume();
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const oscSub = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    oscSub.connect(gain);
    gain.connect(this.masterVolume!);

    osc.type = 'sawtooth';
    oscSub.type = 'triangle';

    const now = this.ctx.currentTime;
    // Layered sweep for maximum punchy feedback
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.15);

    oscSub.frequency.setValueAtTime(700, now);
    oscSub.frequency.exponentialRampToValueAtTime(60, now + 0.15);

    // Doubled volume/gain and expanded length slightly for extra meatiness
    gain.gain.setValueAtTime(0.75, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 0.15);

    osc.start();
    oscSub.start();
    osc.stop(now + 0.16);
    oscSub.stop(now + 0.16);
  }

  public playTripleShoot() {
    this.resume();
    if (!this.ctx || this.isMuted) return;

    // A futuristic rapid hyper-drive triple pulse
    const now = this.ctx.currentTime;
    [0, 0.03, 0.06].forEach((delay, idx) => {
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterVolume!);

      osc.type = 'sawtooth';
      osc2.type = 'sine';

      // Pitch climbs slightly for each subsequent rapid-shot
      const baseFreq = 1050 + idx * 100;
      osc.frequency.setValueAtTime(baseFreq, now + delay);
      osc.frequency.exponentialRampToValueAtTime(180, now + delay + 0.09);

      osc2.frequency.setValueAtTime(baseFreq / 2, now + delay);
      osc2.frequency.exponentialRampToValueAtTime(90, now + delay + 0.09);

      // Doubled volume gain for extreme impact
      gain.gain.setValueAtTime(0.55, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.005, now + delay + 0.09);

      osc.start(now + delay);
      osc2.start(now + delay);
      osc.stop(now + delay + 0.10);
      osc2.stop(now + delay + 0.10);
    });
  }

  public playCoin() {
    this.resume();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterVolume!);

    osc.type = 'sine';
    osc2.type = 'triangle';

    // Sparkly chime
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.setValueAtTime(783.99, now + 0.06); // G5
    osc.frequency.setValueAtTime(1174.66, now + 0.12); // D6

    osc2.frequency.setValueAtTime(1174.66, now);
    osc2.frequency.setValueAtTime(1567.98, now + 0.06);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 0.3);
    osc2.stop(now + 0.3);
  }

  public playPowerup() {
    this.resume();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // Rapid majestic upward scale
    
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.masterVolume!);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + idx * 0.04 + 0.1);

      gain.gain.setValueAtTime(0.12, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.005, now + idx * 0.04 + 0.12);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.14);
    });
  }

  public playExplode() {
    this.resume();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    
    // 1. Crispy retro White Noise for main explosion debris
    const bufferSize = this.ctx.sampleRate * 0.45; // Longer duration (0.45s)
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(750, now);
    filter.frequency.exponentialRampToValueAtTime(50, now + 0.4);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.55, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.42);

    noiseNode.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterVolume!);

    // 2. Heavy Sub-Bass Boom (Square wave sweep) to rattle the speakers
    const boomOsc = this.ctx.createOscillator();
    const boomGain = this.ctx.createGain();
    
    boomOsc.connect(boomGain);
    boomGain.connect(this.masterVolume!);

    boomOsc.type = 'square';
    boomOsc.frequency.setValueAtTime(140, now);
    boomOsc.frequency.linearRampToValueAtTime(30, now + 0.35);

    boomGain.gain.setValueAtTime(0.45, now);
    boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    // 3. Medium crash rumble (Triangle wave)
    const midOsc = this.ctx.createOscillator();
    const midGain = this.ctx.createGain();

    midOsc.connect(midGain);
    midGain.connect(this.masterVolume!);

    midOsc.type = 'sawtooth';
    midOsc.frequency.setValueAtTime(250, now);
    midOsc.frequency.exponentialRampToValueAtTime(60, now + 0.3);

    midGain.gain.setValueAtTime(0.3, now);
    midGain.gain.exponentialRampToValueAtTime(0.01, now + 0.32);

    // Start all
    noiseNode.start(now);
    boomOsc.start(now);
    midOsc.start(now);

    noiseNode.stop(now + 0.47);
    boomOsc.stop(now + 0.4);
    midOsc.stop(now + 0.35);
  }

  public playHit() {
    this.resume();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const oscMetal = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    oscMetal.connect(gain);
    gain.connect(this.masterVolume!);

    osc.type = 'sawtooth';
    oscMetal.type = 'triangle';

    osc.frequency.setValueAtTime(240, now);
    osc.frequency.linearRampToValueAtTime(40, now + 0.15);

    oscMetal.frequency.setValueAtTime(480, now);
    oscMetal.frequency.exponentialRampToValueAtTime(120, now + 0.15);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.16);

    osc.start(now);
    oscMetal.start(now);
    osc.stop(now + 0.17);
    oscMetal.stop(now + 0.17);
  }

  public playLevelUp() {
    this.resume();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    // Super heroic arpeggiated chime
    const chords = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];

    chords.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscSquare = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      oscSquare.connect(gain);
      gain.connect(this.masterVolume!);

      osc.type = 'sine';
      oscSquare.type = 'triangle';

      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      oscSquare.frequency.setValueAtTime(freq * 2, now + idx * 0.05);

      gain.gain.setValueAtTime(0.18, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.05 + 0.25);

      osc.start(now + idx * 0.05);
      oscSquare.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.3);
      oscSquare.stop(now + idx * 0.05 + 0.3);
    });
  }

  public playGameOver() {
    this.resume();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    // Sad descending minor arpeggio
    const chord = [392.00, 311.13, 261.63, 196.00]; // G minor chord downward

    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.masterVolume!);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);
      osc.frequency.linearRampToValueAtTime(freq - 30, now + idx * 0.12 + 0.3);

      gain.gain.setValueAtTime(0.2, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.35);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.4);
    });
  }

  public playBossWarning() {
    this.resume();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const duration = 1.2;
    // Epic dual-tone sweep siren
    for (let i = 0; i < 4; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.masterVolume!);

      osc.type = 'sawtooth';
      const startTime = now + i * 0.28;
      
      osc.frequency.setValueAtTime(320, startTime);
      osc.frequency.linearRampToValueAtTime(640, startTime + 0.12);
      osc.frequency.linearRampToValueAtTime(320, startTime + 0.25);

      gain.gain.setValueAtTime(0.28, startTime);
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.27);

      osc.start(startTime);
      osc.stop(startTime + 0.28);
    }
  }

  public playCombo(comboCount: number) {
    this.resume();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.masterVolume!);

    osc.type = 'sine';
    const baseFreq = 400 + Math.min(comboCount, 15) * 50; // Pitch ascends with combo!
    
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.linearRampToValueAtTime(baseFreq * 1.5, now + 0.15);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);

    osc.start(now);
    osc.stop(now + 0.17);
  }

  public playShieldBreak() {
    this.resume();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    // Electric glass-shatter noise
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterVolume!);

    osc1.type = 'triangle';
    osc2.type = 'sawtooth';

    osc1.frequency.setValueAtTime(880, now);
    osc1.frequency.linearRampToValueAtTime(220, now + 0.25);

    osc2.frequency.setValueAtTime(1200, now);
    osc2.frequency.exponentialRampToValueAtTime(100, now + 0.22);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.27);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.28);
    osc2.stop(now + 0.28);
  }

  public startBgm() {
    this.resume();
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;

    // Classic 8-bit retro loop
    // Simple synth base line step sequencer
    this.bgmStep = 0;
    
    // Notes of a sci-fi cyber theme (Key depends on current level / progress)
    // Level 1: Am (A, C, E, G)
    const melody = [
      440.00, 440.00, 523.25, 440.00,
      493.88, 493.88, 587.33, 493.88,
      392.00, 392.00, 493.88, 392.00,
      440.00, 440.00, 659.25, 523.25
    ];

    const stepDuration = 0.20; // 200ms per sixteenth note / eighth note

    this.bgmInterval = setInterval(() => {
      if (!this.ctx || this.isMuted || !this.isBgmPlaying) return;
      if (this.ctx.state === 'suspended') return;

      const now = this.ctx.currentTime;
      const freq = melody[this.bgmStep % melody.length];

      // Play bass note
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.connect(bassGain);
      bassGain.connect(this.masterVolume!);
      
      bassOsc.type = 'sawtooth';
      bassOsc.frequency.setValueAtTime(freq / 2, now); // 1 octave lower
      
      // Plucky sound envelope
      bassGain.gain.setValueAtTime(0.06, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration - 0.02);

      bassOsc.start(now);
      bassOsc.stop(now + stepDuration);

      // Play high harmonic on some beats
      if (this.bgmStep % 4 === 0 || this.bgmStep % 6 === 3) {
        const leadOsc = this.ctx.createOscillator();
        const leadGain = this.ctx.createGain();
        leadOsc.connect(leadGain);
        leadGain.connect(this.masterVolume!);

        leadOsc.type = 'triangle';
        leadOsc.frequency.setValueAtTime(freq, now);

        leadGain.gain.setValueAtTime(0.04, now);
        leadGain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 0.8);

        leadOsc.start(now);
        leadOsc.stop(now + stepDuration * 0.8);
      }

      this.bgmStep++;
    }, stepDuration * 1000);
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const sound = new SoundManager();
