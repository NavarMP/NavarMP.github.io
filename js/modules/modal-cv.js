/**
 * NAVAR MP — INTERACTIVE CV VIEWER & ATS EXPORT ENGINE
 * Elevates navar_cv.html into an interactive, printable digital document.
 */
import { soundFX } from './audio.js';

export function initCVModal() {
  const modalBackdrop = document.getElementById('cv-modal');
  const openBtns = document.querySelectorAll('[data-action="open-cv"]');
  const closeBtn = document.getElementById('cv-modal-close');
  const printBtn = document.getElementById('cv-print-btn');
  const copyAtsBtn = document.getElementById('cv-copy-ats-btn');
  const downloadBtn = document.getElementById('cv-download-btn');

  if (!modalBackdrop) return;

  function openCV() {
    soundFX.playChime();
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCV() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openCV();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeCV);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeCV();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeCV();
    }
  });

  // Print Clean PDF
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Copy Plain Text ATS Resume
  if (copyAtsBtn) {
    copyAtsBtn.addEventListener('click', () => {
      const atsResumeText = `
MUHAMMED NAVAR
Creative Technologist · Full-Stack Web Developer & Graphic Designer
Kerala, India | NavarMP@gmail.com | https://NavarMP.github.io
GitHub: https://github.com/NavarMP | LinkedIn: https://linkedin.com/in/NavarMP | Behance: https://behance.net/NavarMP

PROFESSIONAL SUMMARY
Creative technologist bridging engineering precision and visual artistry. Experienced in modern web technologies (Next.js, React, Supabase, APIs) and refined design systems (UI/UX, Branding, Typography). Delivered end-to-end solutions from architecture to production.

CORE TECHNICAL SKILLS
- Frontend: HTML5, CSS3, SCSS, JavaScript ES6+, React.js, Next.js, Tailwind CSS, GSAP Motion
- Backend & Cloud: Supabase (PostgreSQL, Auth, RLS), REST APIs, Vercel, Git/GitHub
- Design: Adobe Illustrator, Adobe Photoshop, Figma, UI/UX Design, Branding, Multilingual Typography
- Languages: English (Fluent), Malayalam (Native), Arabic (Reading & Typography)

FEATURED PROJECTS
1. Arivolam — Educational Management Platform
   Stack: Next.js, Supabase, PostgreSQL, Auth & RBAC
   All-in-one educational platform with role-based access control, gradebook computation, and student tracking.

2. Attar al Jannah — Luxury E-Commerce PWA
   Stack: Next.js 15, Supabase, Razorpay API, GSAP Motion
   Progressive web app featuring glassmorphism UI, integrated payments, and student sales gamification engine.

3. Personal Flagship & Digital Ecosystem (NavarMP.github.io)
   Stack: Modern Frontend Architecture, Canvas WebGL, Web Audio API, Fastly CDN
   100/100 Lighthouse benchmark portfolio with zero framework bloat and tactile interactions.

EXPERIENCE
Independent Freelance Graphic Designer & Web Developer (2022 — Present)
Kerala, India & Remote
- Delivered visual design solutions, posters, event branding, and full-stack web applications for diverse clients.
- Managed end-to-end creative and technical briefs with 100% on-time delivery.

EDUCATION
Bachelor of Computer Applications (BCA) (2023 — 2026)
SAFI Institute of Advanced Study, Vazhayur (Calicut University, Kerala)
      `.trim();

      navigator.clipboard.writeText(atsResumeText).then(() => {
        showToast('ATS Plain-Text Resume copied to clipboard!');
      });
    });
  }

  // Download CV HTML Document
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.href = 'assets/navar_cv.html';
      link.download = 'Muhammed_Navar_CV.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Downloading Curriculum Vitae...');
    });
  }
}

// Global Toast Helper
export function showToast(message) {
  const container = document.querySelector('.toast-container') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastSlideOut 0.35s ease forwards';
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

function createToastContainer() {
  const c = document.createElement('div');
  c.className = 'toast-container';
  document.body.appendChild(c);
  return c;
}
