/**
 * NAVAR MP — WEB AUDIO API SYNTHESIZER
 * Zero external audio files; generates pristine haptic clicks, chimes & feedback.
 * Activated on user interaction with persistent mute preference.
 */

class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('navar_sound_muted') === 'true';
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      this.ctx = new AudioContext();
      this.isInitialized = true;
    }
  }

  ensureContext() {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('navar_sound_muted', this.isMuted ? 'true' : 'false');
    this.updateHUDButton();
    if (!this.isMuted) {
      this.ensureContext();
      this.playChime();
    }
    return !this.isMuted;
  }

  updateHUDButton() {
    const btn = document.getElementById('audio-toggle-btn');
    if (!btn) return;
    if (this.isMuted) {
      btn.classList.remove('audio-active');
      btn.setAttribute('aria-label', 'Unmute sound effects');
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
          <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      `;
    } else {
      btn.classList.add('audio-active');
      btn.setAttribute('aria-label', 'Mute sound effects');
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      `;
    }
  }

  // Subtle 12ms soft click on hover
  playHover() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.015);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.015);
    } catch (_) {}
  }

  // Tactile woody click on select
  playClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.025);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch (_) {}
  }

  // Resonant golden chime on modal launch
  playChime() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 1046.5].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.035);

        gain.gain.setValueAtTime(0.05, now + idx * 0.035);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.035 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.035);
        osc.stop(now + idx * 0.035 + 0.25);
      });
    } catch (_) {}
  }
}

export const soundFX = new AudioSynthesizer();

export function initAudio() {
  // Prime context on first user interaction anywhere
  const primeContext = () => {
    soundFX.ensureContext();
    window.removeEventListener('pointerdown', primeContext);
    window.removeEventListener('keydown', primeContext);
  };
  window.addEventListener('pointerdown', primeContext);
  window.addEventListener('keydown', primeContext);

  const toggleBtn = document.getElementById('audio-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      soundFX.ensureContext();
      soundFX.toggleMute();
    });
  }

  soundFX.updateHUDButton();

  // Attach hover sounds to interactive elements
  const attachSounds = () => {
    const interactables = document.querySelectorAll('a, button, .channel-card, .project-card, .filter-btn, .cmd-item');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => soundFX.playHover(), { passive: true });
      el.addEventListener('click', () => soundFX.playClick(), { passive: true });
    });
  };

  attachSounds();
  return attachSounds;
}
