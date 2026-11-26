/**
 * NAVAR MP — COMMAND PALETTE (Cmd+K) & SHORTCUTS MODAL (?)
 * Fast spotlight search across projects, skills, sections, and socials.
 */
import { soundFX } from './audio.js';

export function initCommandPalette() {
  const paletteBackdrop = document.getElementById('command-palette');
  const paletteInput = document.getElementById('cmd-search-input');
  const paletteResults = document.getElementById('cmd-results-list');
  const shortcutsModal = document.getElementById('shortcuts-modal');
  const shortcutsClose = document.getElementById('shortcuts-modal-close');

  const searchIndex = [
    { type: 'Section', title: 'Explore Selected Works', icon: 'folder', action: () => scrollToSection('#works') },
    { type: 'Section', title: 'Technical Skills Matrix', icon: 'code', action: () => scrollToSection('#skills') },
    { type: 'Section', title: 'Career & Education Timeline', icon: 'git-commit', action: () => scrollToSection('#timeline') },
    { type: 'Section', title: 'Connect & Contact Hub', icon: 'mail', action: () => scrollToSection('#contact') },
    { type: 'Project', title: 'Arivolam (Educational Platform)', icon: 'layers', action: () => triggerProject('arivolam') },
    { type: 'Project', title: 'Attar al Jannah (Luxury PWA)', icon: 'shopping-bag', action: () => triggerProject('attar-al-jannah') },
    { type: 'Project', title: 'Behance Design Gallery', icon: 'image', action: () => window.open('https://www.behance.net/NavarMP', '_blank') },
    { type: 'Action', title: 'View & Print Curriculum Vitae', icon: 'file-text', action: () => triggerAction('open-cv') },
    { type: 'Social', title: 'Direct WhatsApp Chat (+91 9746902268)', icon: 'message-circle', action: () => window.open('https://api.whatsapp.com/send?phone=919746902268', '_blank') },
    { type: 'Social', title: 'GitHub Profile (@NavarMP)', icon: 'github', action: () => window.open('https://github.com/NavarMP', '_blank') },
    { type: 'Social', title: 'LinkedIn Profile (/in/NavarMP)', icon: 'linkedin', action: () => window.open('https://linkedin.com/in/NavarMP', '_blank') },
    { type: 'Social', title: 'Telegram Chat (@NavarMP)', icon: 'send', action: () => window.open('https://t.me/NavarMP', '_blank') },
    { type: 'Social', title: 'YouTube Channel (@NavarMP)', icon: 'youtube', action: () => window.open('https://www.youtube.com/@NavarMP', '_blank') },
    { type: 'Action', title: 'Toggle Theme (Dark / Light)', icon: 'sun', action: () => document.getElementById('theme-toggle-btn')?.click() },
    { type: 'Action', title: 'Toggle Audio FX', icon: 'volume-2', action: () => document.getElementById('audio-toggle-btn')?.click() }
  ];

  function openPalette() {
    if (!paletteBackdrop) return;
    soundFX.playChime();
    paletteBackdrop.classList.add('active');
    paletteInput.value = '';
    renderResults(searchIndex);
    setTimeout(() => paletteInput.focus(), 50);
  }

  function closePalette() {
    if (!paletteBackdrop) return;
    paletteBackdrop.classList.remove('active');
  }

  function renderResults(items) {
    if (!paletteResults) return;
    if (items.length === 0) {
      paletteResults.innerHTML = `<li style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">No matching commands found.</li>`;
      return;
    }

    paletteResults.innerHTML = items.map((item, idx) => `
      <li class="cmd-item ${idx === 0 ? 'selected' : ''}" data-index="${idx}">
        <div style="display: flex; align-items: center; gap: 0.85rem;">
          <span style="font-size: 0.72rem; font-family: var(--font-mono); text-transform: uppercase; color: var(--accent-gold); background: var(--accent-gold-subtle); padding: 0.2rem 0.5rem; border-radius: var(--radius-xs);">${item.type}</span>
          <span style="font-size: 0.925rem; font-weight: 500;">${item.title}</span>
        </div>
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">↵ Select</span>
      </li>
    `).join('');

    // Attach click events
    paletteResults.querySelectorAll('.cmd-item').forEach((el, idx) => {
      el.addEventListener('click', () => {
        soundFX.playClick();
        closePalette();
        items[idx].action();
      });
    });
  }

  if (paletteInput) {
    paletteInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = searchIndex.filter(item =>
        item.title.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)
      );
      renderResults(filtered);
    });
  }

  // Keyboard Navigation in Palette
  window.addEventListener('keydown', (e) => {
    // Cmd+K or Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (paletteBackdrop?.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    }

    // Question Mark (?) for shortcuts modal (when not inside inputs)
    if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      if (shortcutsModal) {
        soundFX.playChime();
        shortcutsModal.classList.add('active');
      }
    }

    // Escape closes modals
    if (e.key === 'Escape') {
      if (paletteBackdrop?.classList.contains('active')) closePalette();
      if (shortcutsModal?.classList.contains('active')) shortcutsModal.classList.remove('active');
    }
  });

  // HUD search button trigger
  document.querySelectorAll('[data-action="open-cmd"]').forEach(btn => {
    btn.addEventListener('click', openPalette);
  });

  if (paletteBackdrop) {
    paletteBackdrop.addEventListener('click', (e) => {
      if (e.target === paletteBackdrop) closePalette();
    });
  }

  if (shortcutsClose) {
    shortcutsClose.addEventListener('click', () => {
      shortcutsModal.classList.remove('active');
    });
  }

  function scrollToSection(selector) {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  function triggerProject(id) {
    const card = document.querySelector(`[data-project-id="${id}"]`);
    if (card) card.click();
  }

  function triggerAction(action) {
    const el = document.querySelector(`[data-action="${action}"]`);
    if (el) el.click();
  }
}
