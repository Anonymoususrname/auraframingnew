/**
 * faq.js
 * Click-to-expand FAQ accordion on the Packages page.
 *
 * Clicking a .faq element toggles .open on it.
 * The CSS in components.css handles the animation
 * via max-height transition on .faq-a.
 *
 * Uses event delegation on the document so it works
 * even if FAQ items are injected after page load.
 */

(function initFaq() {

  document.addEventListener('click', (e) => {
    const faq = e.target.closest('.faq');
    if (!faq) return;
    faq.classList.toggle('open');
  });

})();
