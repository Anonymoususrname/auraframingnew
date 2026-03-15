/**
 * forms.js
 * Provides visual success feedback when any form
 * submit button is clicked.
 *
 * In production: replace the click handler body
 * with a real fetch() call to your backend API
 * or a service like Formspree / EmailJS.
 */

(function initForms() {

  // Map of button ID → original label (set at runtime)
  const BUTTONS = ['careerSubmit', 'bookingSubmit', 'contactSubmit'];

  BUTTONS.forEach((id) => {
    const btn = document.getElementById(id);
    if (!btn) return;

    const originalText = btn.textContent;

    btn.addEventListener('click', () => {

      /* ── TODO: Add real form submission here ──
         Example with Formspree:

         const form = btn.closest('form') || btn.parentElement;
         const data = new FormData(form);

         fetch('https://formspree.io/f/YOUR_ID', {
           method: 'POST',
           body:   data,
           headers: { 'Accept': 'application/json' }
         })
         .then(res => res.ok ? showSuccess() : showError())
         .catch(() => showError());
      ─────────────────────────────────────────── */

      showSuccess(btn, originalText);
    });
  });

  function showSuccess(btn, originalText) {
    btn.textContent       = '✦  Sent — we\'ll be in touch soon!';
    btn.style.background  = 'var(--gk)';
    btn.style.letterSpacing = '.12em';

    // Reset after 4 seconds
    setTimeout(() => {
      btn.textContent        = originalText;
      btn.style.background   = '';
      btn.style.letterSpacing = '';
    }, 4000);
  }

})();
