const DURATION = 3500;
const FONT_TIMEOUT = 1500;

// The lock-up slides left by half the overshoot so the mark lands centred.
function setOffset(intro) {
  const word = intro.querySelector('.word');
  const lock = intro.querySelector('.lock');
  const span = word?.firstElementChild;
  if (!span) return;
  const markSize = parseFloat(getComputedStyle(span).fontSize) * 0.5;
  const off = (word.getBoundingClientRect().width + markSize - lock.getBoundingClientRect().width) / 2;
  intro.style.setProperty('--off', `${off.toFixed(1)}px`);
}

function fontReady() {
  if (!document.fonts) return Promise.resolve();
  return Promise.race([
    document.fonts.load("1em 'Anton'").then(() => document.fonts.ready),
    new Promise((resolve) => setTimeout(resolve, FONT_TIMEOUT)),
  ]);
}

export default function playIntro(lenis) {
  const intro = document.getElementById('intro');
  const end = () => {
    intro?.remove();
    document.body.classList.remove('intro-lock');
    lenis?.start();
  };

  if (!intro || matchMedia('(prefers-reduced-motion: reduce)').matches) return end();

  window.scrollTo(0, 0);
  lenis?.stop();

  fontReady().then(() => {
    setOffset(intro);
    intro.classList.add('play');
    setTimeout(end, DURATION);
  });
}
