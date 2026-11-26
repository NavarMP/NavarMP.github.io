/**
 * NAVAR MP — OMNICHANNEL CONTACT & CONNECT ENGINE
 * Direct WhatsApp launcher, email copy, vCard export, and reliable contact submission.
 */
import { showToast } from './modal-cv.js';
import { soundFX } from './audio.js';

export function initContact() {
  const emailCopyBtn = document.getElementById('copy-email-btn');
  const vcardBtn = document.getElementById('download-vcard-btn');
  const contactForm = document.getElementById('contact-form');
  const whatsappQuickBtn = document.getElementById('whatsapp-quick-btn');

  // Copy Email Address with 1-click Toast
  if (emailCopyBtn) {
    emailCopyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'NavarMP@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        soundFX.playClick();
        showToast('Email (NavarMP@gmail.com) copied to clipboard!');
      });
    });
  }

  // Quick WhatsApp Launcher with dynamic greeting
  if (whatsappQuickBtn) {
    whatsappQuickBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const message = encodeURIComponent('Hello Muḥammed, I visited your portfolio (NavarMP.github.io) and would like to discuss a project commission.');
      window.open(`https://api.whatsapp.com/send?phone=919746902268&text=${message}`, '_blank', 'noopener,noreferrer');
    });
  }

  // Generate & Download vCard (.vcf)
  if (vcardBtn) {
    vcardBtn.addEventListener('click', (e) => {
      e.preventDefault();
      soundFX.playClick();

      const vcardData = `BEGIN:VCARD
VERSION:3.0
N:Navār;Muḥammed;;;
FN:Muḥammed Navār
NICKNAME:NavarMP
ORG:Freelance Web Development & Design
TITLE:Creative Technologist & Full-Stack Developer
TEL;TYPE=CELL,VOICE,WHATSAPP:+919746902268
EMAIL;TYPE=INTERNET,PREF:NavarMP@gmail.com
URL;TYPE=WORK:https://NavarMP.github.io
URL;TYPE=PORTFOLIO:https://navarmp.digibayt.com
URL;TYPE=LINKEDIN:https://linkedin.com/in/NavarMP
URL;TYPE=GITHUB:https://github.com/NavarMP
URL;TYPE=BEHANCE:https://www.behance.net/NavarMP
ADR;TYPE=WORK:;;Kerala;India;;;
NOTE:Creative Technologist bridging architectural engineering and visual artistry.
END:VCARD`;

      const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Muhammed_Navar.vcf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast('vCard contact downloaded to your device!');
    });
  }

  // Robust Contact Form Handling (Free, Zero-Drop Delivery)
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      soundFX.playClick();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : 'Project Inquiry via NavarMP.github.io';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('Please fill in your name, email, and message.');
        return;
      }

      // 1. Direct formatted mailto URL trigger
      const mailtoUrl = `mailto:NavarMP@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      // 2. Format pre-populated WhatsApp message as instant option
      const waText = encodeURIComponent(`*New Project Inquiry via NavarMP.github.io*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:*\n${message}`);
      const waUrl = `https://api.whatsapp.com/send?phone=919746902268&text=${waText}`;

      // Open mailto and show delivery options
      window.location.href = mailtoUrl;

      showToast('Opening email client! You can also click below to send via WhatsApp.');

      // Create quick WhatsApp action button if preferred
      setTimeout(() => {
        const waPrompt = confirm('Would you also like to send this message directly via WhatsApp?');
        if (waPrompt) {
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        }
      }, 600);

      contactForm.reset();
    });
  }
}
