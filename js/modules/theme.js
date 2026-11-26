/**
 * NAVAR MP — DUAL THEME ENGINE
 * Toggles between Obsidian & Imperial Gold (Dark) and Warm Editorial Paper (Light)
 */

export function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('navar_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Initial theme resolution
  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'dark'); // Default to Obsidian Luxury
  applyTheme(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(activeTheme);
      localStorage.setItem('navar_theme', activeTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      updateThemeIcon(true);
    } else {
      document.documentElement.removeAttribute('data-theme');
      updateThemeIcon(false);
    }
  }

  function updateThemeIcon(isLight) {
    if (!toggleBtn) return;
    if (isLight) {
      toggleBtn.setAttribute('aria-label', 'Switch to Obsidian Dark Mode');
      toggleBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    } else {
      toggleBtn.setAttribute('aria-label', 'Switch to Warm Editorial Light Mode');
      toggleBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    }
  }
}
