import { useState, useCallback, useEffect } from 'react';

// Web Audio API Sound Synthesizer for Skeuomorphic tactile feedback
class SoundSynthesizer {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Realistic 5-star hotel concierge brass bell ding
  playBell() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Fundamental tone & bright brass harmonics
    const freqs = [1760, 2640, 3520]; // A6 and upper partials
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq + (idx === 0 ? 0 : Math.random() * 8), now);

      const peak = idx === 0 ? 0.35 : 0.15;
      gain.gain.setValueAtTime(peak, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (idx === 0 ? 2.5 : 1.8));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.5);
    });
  }

  // Tactile button mechanical click
  playClick() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.04);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Golden key turn / confirmation chime
  playSuccessChime() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Luxury Major Chord)

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.001, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 1.2);
    });
  }
}

const synth = new SoundSynthesizer();

export function useSoundEffects() {
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('grand_aurelia_sound') === 'muted';
    }
    return false;
  });

  const toggleSound = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem('grand_aurelia_sound', next ? 'muted' : 'enabled');
      if (!next) synth.playClick();
      return next;
    });
  }, []);

  const playBell = useCallback(() => {
    if (!muted) synth.playBell();
  }, [muted]);

  const playClick = useCallback(() => {
    if (!muted) synth.playClick();
  }, [muted]);

  const playSuccessChime = useCallback(() => {
    if (!muted) synth.playSuccessChime();
  }, [muted]);

  return {
    muted,
    toggleSound,
    playBell,
    playClick,
    playSuccessChime,
  };
}

