/**
 * NAVAR MP — MASTER APPLICATION ORCHESTRATOR
 * Architectural synthesis of all modules, kinetic interactions, and dynamic data rendering.
 */

import { initTheme } from './modules/theme.js';
import { initAudio, soundFX } from './modules/audio.js';
import { initCanvasParticles } from './modules/canvas-particles.js';
import { initCustomCursor } from './modules/cursor.js';
import { initProjectModals } from './modules/modal-projects.js';
import { initCVModal } from './modules/modal-cv.js';
import { initContact } from './modules/contact.js';
import { initCommandPalette } from './modules/command-palette.js';
import { projectsData } from './data/projects.js';
import { skillsData } from './data/skills.js';
import { timelineData } from './data/timeline.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Core Engines
  initTheme();
  const attachSounds = initAudio();
  initCanvasParticles();
  const updateCursorTargets = initCustomCursor();
  initProjectModals();
  initCVModal();
  initContact();
  initCommandPalette();

  // 2. Render Dynamic Data
  renderProjects('all');
  renderSkills();
  renderTimeline();
  initProjectFilters();

  // 3. Setup Micro-Interactions & UI Features
  initPreloader();
  initLiveClock();
  initPortrait3DTilt();
  initScrollSpy();
  initMobileDrawer();

  // Refresh cursor and audio listeners after rendering
  setTimeout(() => {
    if (attachSounds) attachSounds();
    if (updateCursorTargets) updateCursorTargets();
  }, 100);
});

/* --------------------------------------------------------------------------
   Preloader Management
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const bar = document.querySelector('.preloader-bar-fill');
  const counter = document.querySelector('.preloader-counter');
  if (!preloader || !bar || !counter) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 18) + 12;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      bar.style.width = '100%';
      counter.textContent = '100%';
      setTimeout(() => {
        preloader.classList.add('loaded');
        soundFX.playChime();
      }, 350);
    } else {
      bar.style.width = `${progress}%`;
      counter.textContent = `${progress < 10 ? '0' + progress : progress}%`;
    }
  }, 40);
}

/* --------------------------------------------------------------------------
   Render Featured Projects
   -------------------------------------------------------------------------- */
function renderProjects(filterCategory = 'all') {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const filtered = filterCategory === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === filterCategory);

  container.innerHTML = filtered.map(p => `
    <article class="project-card" data-category="${p.category}">
      <div class="project-media-wrap">
        <span class="project-badge-tag">${p.badge}</span>
        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, ${p.accentColor}22 0%, var(--bg-surface-3) 100%); display: flex; align-items: center; justify-content: center; position: relative;">
          <!-- SVG Project Icon Mockup -->
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${p.accentColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 15px ${p.accentColor}66);">
            ${p.category === 'web' 
              ? '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>'
              : '<circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/>'}
          </svg>
        </div>
      </div>
      <div class="project-body">
        <h3 class="project-name">${p.title}</h3>
        <p class="project-summary">${p.summary}</p>
        <div class="project-tags">
          ${p.stack.slice(0, 4).map(s => `<span class="badge">${s}</span>`).join('')}
        </div>
        <div class="project-card-actions">
          <button class="view-case-study-btn" data-project-id="${p.id}" aria-label="View case study for ${p.title}">
            <span>Case Study</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <div class="project-external-links">
            ${p.liveUrl ? `
              <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon-only" aria-label="Visit live project" style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; text-decoration: none;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            ` : ''}
            ${p.githubUrl ? `
              <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon-only" aria-label="View source code on GitHub" style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; text-decoration: none;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      soundFX.playClick();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderProjects(cat);
    });
  });
}

/* --------------------------------------------------------------------------
   Render Skills Matrix
   -------------------------------------------------------------------------- */
function renderSkills() {
  const container = document.getElementById('skills-container');
  const cloudContainer = document.getElementById('skills-cloud-container');

  if (container) {
    container.innerHTML = skillsData.categories.map(cat => `
      <div class="skills-category-card">
        <h3 class="skills-cat-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
          ${cat.title}
        </h3>
        <div class="skills-bars-list">
          ${cat.items.map(item => `
            <div class="skill-bar-item">
              <div class="skill-bar-header">
                <span>${item.name}</span>
                <span class="skill-percentage">${item.level}%</span>
              </div>
              <div class="skill-track">
                <div class="skill-fill" data-level="${item.level}" style="width: 0%;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    // Trigger animation when skills enter viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-fill').forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = `${level}%`;
          });
        }
      });
    }, { threshold: 0.2 });

    container.querySelectorAll('.skills-category-card').forEach(card => observer.observe(card));
  }

  if (cloudContainer) {
    cloudContainer.innerHTML = skillsData.cloudPills.map(pill => `
      <span class="skill-tag-pill">
        <span style="color: var(--accent-gold);">#</span>
        ${pill}
      </span>
    `).join('');
  }
}

/* --------------------------------------------------------------------------
   Render Timeline
   -------------------------------------------------------------------------- */
function renderTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  container.innerHTML = timelineData.map(item => `
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-card">
        <div class="timeline-meta">
          <h3 class="timeline-role">${item.role}</h3>
          <span class="timeline-period">${item.period}</span>
        </div>
        <div class="timeline-org">${item.organization} · ${item.location}</div>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.65rem;">
          ${item.highlights.map(h => `
            <li style="display: flex; gap: 0.65rem; font-size: 0.925rem; color: var(--text-secondary); line-height: 1.6;">
              <span style="color: var(--accent-gold); flex-shrink: 0;">▸</span>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   3D Tilt Effect on Hero Portrait
   -------------------------------------------------------------------------- */
function initPortrait3DTilt() {
  const card = document.querySelector('.portrait-tilt-card');
  const container = document.querySelector('.portrait-container');
  if (!card || !container) return;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  container.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

/* --------------------------------------------------------------------------
   Scroll-Spy & Floating HUD Scroll Shrink
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const header = document.querySelector('.site-header .nav-dock');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    if (header) {
      if (scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   Live Kerala (IST UTC+5:30) Clock
   -------------------------------------------------------------------------- */
function initLiveClock() {
  const clockEl = document.getElementById('live-time-display');
  if (!clockEl) return;

  function update() {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const timeStr = new Intl.DateTimeFormat('en-US', options).format(new Date());
    clockEl.textContent = `Kerala, India (IST): ${timeStr}`;
  }

  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const openBtn = document.getElementById('mobile-menu-open');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-drawer');
  const links = document.querySelectorAll('.mobile-drawer-link');

  if (!openBtn || !drawer) return;

  function openDrawer() {
    soundFX.playClick();
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    soundFX.playClick();
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  links.forEach(l => l.addEventListener('click', closeDrawer));
}
