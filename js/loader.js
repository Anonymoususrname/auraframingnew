/**
 * loader.js
 * Hides the full-screen intro loader after the page
 * finishes loading, then triggers the hero background
 * zoom-in animation.
 *
 * The loader shows for a minimum of 2.6 seconds so
 * the brand animation plays fully even on fast connections.
 */

(function initLoader() {

  const loader = document.getElementById('loader');
  const heroBg = document.getElementById('heroBg');

  window.addEventListener('load', () => {
    setTimeout(() => {

      // Fade out the loader overlay
      loader.classList.add('hidden');

      // Trigger the hero background slow zoom
      if (heroBg) heroBg.classList.add('zoom');

    }, 2600); // minimum display time in ms
  });

})();
