/**
 * testimonials.js
 * Auto-advancing testimonial carousel on the home page.
 *
 * - Rotates every 4.8 seconds automatically.
 * - Clicking a dot switches immediately and resets the timer.
 */

(function initTestimonials() {

  /* ── Data ─────────────────────────────────── */
  const TESTI = [
    {
      q: '"Aura Framing didn\'t just photograph our wedding — they understood the very essence of our relationship and translated it into the most beautiful moments we\'ve ever seen."',
      a: '— Priya &amp; Arjun, Kerala 2024'
    },
    {
      q: '"The candid shots captured every tear, every laugh, every glance — emotions we didn\'t even know were happening. Absolutely breathtaking work from start to finish."',
      a: '— Sophie &amp; James, Tuscany 2024'
    },
    {
      q: '"The album arrived and we couldn\'t stop crying — in the best way. Every page is a masterpiece. Aura Framing is truly in a class of their own."',
      a: '— Nadia &amp; Rohan, Mumbai 2023'
    }
  ];

  /* ── DOM refs ─────────────────────────────── */
  const tq   = document.getElementById('tq');
  const ta   = document.getElementById('ta');
  const dots = document.querySelectorAll('.tdot');

  if (!tq || !ta || !dots.length) return; // guard if elements not found

  let current = 0;
  let timer;

  /* ── Show a specific slide ───────────────── */
  function show(n) {
    current = n;
    tq.textContent = TESTI[n].q;
    ta.innerHTML   = TESTI[n].a;
    dots.forEach((d, i) => d.classList.toggle('on', i === n));
  }

  /* ── Auto-advance ────────────────────────── */
  function startAutoplay() {
    timer = setInterval(() => show((current + 1) % TESTI.length), 4800);
  }

  /* ── Manual dot clicks ───────────────────── */
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      show(parseInt(dot.dataset.t, 10));
      startAutoplay(); // restart after manual interaction
    });
  });

  /* ── Init ────────────────────────────────── */
  startAutoplay();

})();
