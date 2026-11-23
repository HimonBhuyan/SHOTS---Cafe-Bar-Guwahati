// Lightweight Web Audio API synthesizer for Shots lounge ambience & tactile UI feedback
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.loungeGain = null;
    this.loungeNodes = [];
  }

  ensureContext() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  setEnabled(next) {
    this.enabled = next;
    if (next) {
      this.startLounge();
      this.playClink();
    } else {
      this.stopLounge();
    }
    return this.enabled;
  }

  startLounge() {
    const ctx = this.ensureContext();
    if (!ctx || this.loungeNodes.length > 0) return;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 1.4);
    master.connect(ctx.destination);
    this.loungeGain = master;

    const freqs = [164.81, 246.94, 311.13, 369.99, 440.0];
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      osc.detune.setValueAtTime((idx - 2) * 3.5, ctx.currentTime);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(540, ctx.currentTime);
      gain.gain.setValueAtTime(0.14 / freqs.length, ctx.currentTime);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(master);
      osc.start();
      this.loungeNodes.push(osc);
    });
  }

  stopLounge() {
    if (!this.ctx || !this.loungeGain) return;
    const now = this.ctx.currentTime;
    try {
      this.loungeGain.gain.cancelScheduledValues(now);
      this.loungeGain.gain.setValueAtTime(Math.max(this.loungeGain.gain.value, 0.0001), now);
      this.loungeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      const nodesToStop = [...this.loungeNodes];
      this.loungeNodes = [];
      setTimeout(() => {
        nodesToStop.forEach((n) => {
          try { n.stop(); } catch {}
        });
      }, 380);
    } catch {
      this.loungeNodes = [];
    }
  }

  playClink() {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [1318.5, 1975.5].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);
      gain.gain.setValueAtTime(0.05, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.28);
    });
  }

  playPaperFlip() {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const bufferSize = Math.floor(ctx.sampleRate * 0.12);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1800, now);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start(now);
  }
}

export const soundEngine = new SoundEngine();
