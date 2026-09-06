import Lenis from 'lenis';

export default function initScroll() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = [...document.querySelectorAll('[data-card]')];
  const nav = document.querySelector('[data-nav]');
  const panel = document.querySelector('[data-nav-panel]');
  const hero = document.querySelector('[data-hero]');
  let collapsed;

  function update() {
    const y = window.scrollY;

    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      const rect = card.getBoundingClientRect();
      const q = Math.min(1, Math.max(0, (rect.bottom - next.getBoundingClientRect().top) / rect.height));
      card.style.transform = `scale(${1 - 0.055 * q})`;
      card.style.filter = `brightness(${1 - 0.28 * q})`;
    });

    if (nav) {
      const past = y > window.innerHeight * 0.7;
      if (past !== collapsed) {
        collapsed = past;
        nav.classList.toggle('collapsed', past);
        if (!past) panel?.classList.remove('open');
      }
    }

    if (hero) {
      const p = Math.min(1, y / (window.innerHeight * 0.85));
      hero.style.opacity = 1 - p * 0.85;
      hero.style.transform = `translateY(${p * -40}px)`;
    }
  }

  if (reduced) {
    window.addEventListener('scroll', update, { passive: true });
    update();
    return null;
  }

  const lenis = new Lenis({ duration: 1.1 });
  lenis.on('scroll', update);

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target);
    });
  });

  update();
  return lenis;
}
