/**
 * router.js
 * Client-side SPA navigation with a gold curtain transition.
 *
 * How a page change works:
 *  1. User clicks any element with [data-page="X"]
 *  2. Gold curtain animates scaleY 0 → 1 (rises from bottom)
 *  3. At peak: old page hidden, new page shown, scroll reset
 *  4. Nav links updated to reflect active page
 *  5. Curtain animates scaleY 1 → 0 (falls from top)
 *  6. Scroll-reveal re-triggered on new page
 */

(function initRouter() {

  const curtain = document.getElementById('curtain');
  const navbar  = document.getElementById('navbar');

  let currentPage   = 'home';
  let transitioning = false;

  const ALL_PAGES = ['home', 'about', 'services', 'packages', 'careers', 'booking', 'contact'];

  /* ── Core navigate function ──────────────── */
  function navigateTo(id) {
    if (transitioning || id === currentPage) return;
    transitioning = true;

    // Step 1: curtain rises from bottom
    curtain.style.transition      = `transform .45s var(--ease-page)`;
    curtain.style.transformOrigin = 'bottom';
    curtain.style.transform       = 'scaleY(1)';

    setTimeout(() => {

      // Step 2: swap pages
      document.getElementById('page-' + currentPage).classList.remove('active');
      document.getElementById('page-' + id).classList.add('active');
      document.getElementById('page-' + id).scrollTop = 0;
      currentPage = id;

      // Step 3: update nav active state
      document.querySelectorAll('.nav-links a').forEach((a) => {
        a.classList.toggle('active', a.dataset.page === id);
      });

      // Step 4: update nav colour scheme
      // Home uses dark/solid nav (over hero image)
      // All other pages use light nav (over white content)
      navbar.className = (id === 'home') ? 'solid' : 'light';

      // Step 5: re-trigger scroll-reveal on new page
      if (window.ScrollReveal) window.ScrollReveal.observe();

      // Step 6: curtain falls from top
      curtain.style.transformOrigin = 'top';
      curtain.style.transform       = 'scaleY(0)';

      setTimeout(() => { transitioning = false; }, 460);

    }, 450); // wait for curtain to fully cover screen
  }

  /* ── Global click delegation ─────────────── */
  // Handles ALL [data-page] elements — nav links,
  // buttons, footer links, package CTA buttons, etc.
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-page]');
    if (!el) return;
    e.preventDefault();
    navigateTo(el.dataset.page);
    document.body.classList.remove('mobile-open');
  });

  /* ── Mobile nav hamburger ────────────────── */
  document.getElementById('hamburger').addEventListener('click', () => {
    document.body.classList.toggle('mobile-open');
  });

  document.getElementById('closeNav').addEventListener('click', () => {
    document.body.classList.remove('mobile-open');
  });

  /* ── Public API ──────────────────────────── */
  // Expose navigateTo in case other scripts need it
  window.Router = { navigateTo };

})();
