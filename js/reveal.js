/**
 * reveal.js
 * Scroll-triggered fade-up reveal animation.
 *
 * Observes all elements with class="reveal" inside
 * the currently active page. When an element enters
 * the viewport it gets class="visible" (defined in
 * css/animations.css) which triggers the CSS transition.
 *
 * observe() is called:
 *  - On initial page load
 *  - After every page navigation (by router.js)
 */

window.ScrollReveal = (function () {

  let observer;

  function createObserver() {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger each visible element slightly for a cascade effect
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * 80);
            observer.unobserve(entry.target); // only trigger once
          }
        });
      },
      {
        threshold:   0.1,
        rootMargin: '0px 0px -50px 0px' // trigger slightly before bottom of screen
      }
    );
  }

  /**
   * Scans the currently active page for unresolved
   * .reveal elements and attaches the observer to each.
   */
  function observe() {
    if (observer) observer.disconnect();
    observer = createObserver();

    const activePage = document.querySelector('.page.active');
    if (!activePage) return;

    activePage
      .querySelectorAll('.reveal:not(.visible)')
      .forEach((el) => observer.observe(el));
  }

  // Initial call on page load
  observe();

  return { observe };

})();
