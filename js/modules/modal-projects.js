/**
 * NAVAR MP — INTERACTIVE CASE STUDY MODAL ENGINE
 */
import { projectsData } from '../data/projects.js';
import { soundFX } from './audio.js';

export function initProjectModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalContainer = document.getElementById('project-modal-content');
  const closeBtn = document.getElementById('project-modal-close');

  if (!modalBackdrop || !modalContainer) return;

  function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    soundFX.playChime();

    modalContainer.innerHTML = `
      <div class="case-study-header" style="margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
          <span class="badge badge-gold">${project.badge}</span>
          <span class="badge">${project.categoryLabel}</span>
        </div>
        <h2 style="font-size: clamp(1.75rem, 3.5vw, 2.5rem); margin-bottom: 1rem; color: var(--text-primary);">
          ${project.title}
        </h2>
        <p style="font-size: 1.1rem; color: var(--text-secondary); line-height: 1.7;">
          ${project.overview}
        </p>
      </div>

      <!-- Metrics Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 1rem; margin-bottom: 2.5rem;">
        ${project.metrics.map(m => `
          <div style="background: var(--bg-surface-2); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); text-align: center;">
            <div style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; color: var(--accent-gold); margin-bottom: 0.25rem;">${m.value}</div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted);">${m.label}</div>
          </div>
        `).join('')}
      </div>

      <!-- Challenges & Solutions Split -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 2.5rem;">
        <div style="background: var(--bg-surface-2); padding: 1.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <h3 style="font-size: 1.15rem; margin-bottom: 1.25rem; color: var(--accent-gold); display: flex; align-items: center; gap: 0.5rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Key Challenges
          </h3>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.85rem;">
            ${project.challenges.map(c => `
              <li style="display: flex; gap: 0.65rem; font-size: 0.925rem; color: var(--text-secondary); line-height: 1.6;">
                <span style="color: var(--accent-gold); flex-shrink: 0;">▸</span>
                <span>${c}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="background: var(--bg-surface-2); padding: 1.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <h3 style="font-size: 1.15rem; margin-bottom: 1.25rem; color: var(--status-available); display: flex; align-items: center; gap: 0.5rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Engineered Solutions
          </h3>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.85rem;">
            ${project.solutions.map(s => `
              <li style="display: flex; gap: 0.65rem; font-size: 0.925rem; color: var(--text-secondary); line-height: 1.6;">
                <span style="color: var(--status-available); flex-shrink: 0;">✔</span>
                <span>${s}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <!-- Tech Stack Pills -->
      <div style="margin-bottom: 2.5rem;">
        <h4 style="font-size: 0.9rem; text-transform: uppercase; font-family: var(--font-mono); color: var(--text-muted); margin-bottom: 0.85rem;">Technologies Deployed</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.65rem;">
          ${project.stack.map(tech => `
            <span class="badge" style="font-size: 0.8rem; padding: 0.4rem 0.85rem;">${tech}</span>
          `).join('')}
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; border-top: 1px solid var(--border-subtle); padding-top: 1.75rem;">
        ${project.liveUrl ? `
          <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            Visit Live Project
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        ` : ''}
        ${project.githubUrl ? `
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            View Source on GitHub
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
          </a>
        ` : ''}
      </div>
    `;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Attach triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-project-id]');
    if (trigger) {
      e.preventDefault();
      const id = trigger.getAttribute('data-project-id');
      openProjectModal(id);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}
