/**
 * cursor.js
 * Drives the custom gold dot + ring cursor.
 *
 * - Dot snaps to mouse instantly.
 * - Ring follows with a smooth lerp (linear interpolation) lag.
 * - Ring enlarges on hover over interactive elements.
 */

(function initCursor() {

  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');

  // Current mouse position
  let mx = 0, my = 0;

  // Ring's smoothed (lerped) position
  let rx = 0, ry = 0;

  // How quickly the ring catches up (0–1, higher = faster)
  const LERP = 0.12;

  /* ── Track mouse & move dot instantly ────── */
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
  });

  /* ── Enlarge ring on interactive elements ── */
  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest('a, button, [data-page], .faq, .tdot, .job-apply');
    if (el) {
      ring.style.width   = '54px';
      ring.style.height  = '54px';
      ring.style.opacity = '.5';
    }
  });

  document.addEventListener('mouseout', (e) => {
    const el = e.target.closest('a, button, [data-page], .faq, .tdot, .job-apply');
    if (el) {
      ring.style.width   = '38px';
      ring.style.height  = '38px';
      ring.style.opacity = '1';
    }
  });

  /* ── Ring lerp animation loop ─────────────── */
  function animateRing() {
    rx += (mx - rx) * LERP;
    ry += (my - ry) * LERP;
    ring.style.transform = `translate(${rx - 19}px, ${ry - 19}px)`;
    requestAnimationFrame(animateRing);
  }

  animateRing();

})();
