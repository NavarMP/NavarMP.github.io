/**
 * NAVAR MP — CONTEXT-AWARE MAGNETIC CURSOR
 * Smooth lerp tracking with dynamic interactive states.
 */

export function initCustomCursor() {
  // Disable on touch screens
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
    if (!isMoving) {
      isMoving = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
    isMoving = false;
  });

  // Smooth lerp loop for the ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Attach contextual states
  function updateCursorTargets() {
    // Project card hover => 'VIEW'
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-view');
        const text = ring.querySelector('.cursor-text');
        if (text) text.textContent = 'View';
      });
      card.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-view');
      });
    });

    // Links & Buttons => Expand ring
    const interactiveEls = document.querySelectorAll('a, button, input, textarea, .filter-btn, .channel-card');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  updateCursorTargets();
  return updateCursorTargets;
}
