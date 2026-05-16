/* ════════════════════════════════════
   script.js — Binit S. Portfolio
════════════════════════════════════ */

/* ── 1. CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

// Update true mouse position instantly for the dot
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

// Lerp the ring for a smooth trailing effect
function lerpRing() {
  ringX += (mouseX - ringX) * 0.14;
  ringY += (mouseY - ringY) * 0.14;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(lerpRing);
}
lerpRing();

// Expand cursor on interactive elements
const interactables = document.querySelectorAll(
  'a, button, .badge, .social-icon, .photo-img, .proj-block, .skill-list li'
);
interactables.forEach((el) => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});


/* ── 2. HOVER-ENLARGE on text elements ── */
const enlargeTargets = document.querySelectorAll(
  '.badge span, .logo, .about-label, .skills-title, .git-label, .work-btn-label, .creative-footer p'
);
enlargeTargets.forEach(el => {
  el.classList.add('enlarge');
});


/* ── 3. SMOOTH ANCHOR SCROLL & SNAP FIX ── */
let isScrolling = false;
let isTrackpad = false;
let wheelTimer;

window.addEventListener('wheel', (e) => {
  // A trackpad usually sends fractional deltas OR very small initial deltas
  if (e.deltaY % 1 !== 0 || Math.abs(e.deltaY) < 50) {
    isTrackpad = true;
  }
  
  // Reset trackpad detection after scrolling pauses
  clearTimeout(wheelTimer);
  wheelTimer = setTimeout(() => {
    isTrackpad = false;
  }, 400);

  if (isTrackpad) {
    // If it's a trackpad, let native CSS scroll-snap handle the momentum smoothly
    document.documentElement.style.scrollSnapType = 'y mandatory';
    return;
  }

  // --- Mouse Wheel Custom Snap Logic ---
  e.preventDefault();

  if (isScrolling) return;
  isScrolling = true;

  // Temporarily disable CSS snap so it doesn't fight our JS scroll
  document.documentElement.style.scrollSnapType = 'none';

  const direction = e.deltaY > 0 ? 1 : -1;
  const sectionHeight = window.innerHeight;
  const current = Math.round(window.scrollY / sectionHeight);
  const next = Math.max(0, current + direction);

  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const targetScroll = Math.min(next * sectionHeight, maxScroll);

  window.scrollTo({
    top: targetScroll,
    behavior: 'smooth'
  });

  setTimeout(() => {
    isScrolling = false;
  }, 800);
}, { passive: false });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Logo → scroll to top
const logo = document.getElementById('logo');
if (logo) {
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ── 4. BADGE WOBBLE on hover ── */
const badges = document.querySelectorAll('.badge');
const baseRotations = [-6, -1, 4]; // matches CSS transforms
badges.forEach((badge, i) => {
  badge.addEventListener('mouseenter', () => {
    const wobble = (Math.random() - 0.5) * 8;
    badge.style.transform = `rotate(${wobble}deg) scale(1.06)`;
  });
  badge.addEventListener('mouseleave', () => {
    badge.style.transform = `rotate(${baseRotations[i] || 0}deg)`;
  });
});


/* ── 5. PROJECT BLOCKS — stagger reveal on scroll ── */
const projBlocks = document.querySelectorAll('.proj-block');

const blockObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const i = [...projBlocks].indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, i * 140);
      blockObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

projBlocks.forEach(block => blockObserver.observe(block));


/* ── 5b. TOPOGRAPHIC CANVAS BACKGROUND ── */
const topoCanvas = document.getElementById('topoCanvas');
if (topoCanvas) {
  const ctx = topoCanvas.getContext('2d');
  function resizeTopo() {
    const rect = topoCanvas.parentElement.getBoundingClientRect();
    topoCanvas.width = rect.width * window.devicePixelRatio;
    topoCanvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    drawTopo(rect.width, rect.height);
  }

  function drawTopo(w, h) {
    ctx.clearRect(0, 0, w, h);
    const layers = 18;
    for (let i = 0; i < layers; i++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255,255,255,${0.03 + Math.random() * 0.06})`;
      ctx.lineWidth = 0.8;
      const yBase = (h / layers) * i + Math.random() * 20;
      ctx.moveTo(0, yBase);
      for (let x = 0; x < w; x += 30) {
        const y = yBase + Math.sin(x * 0.008 + i * 0.7) * (15 + i * 2) + Math.cos(x * 0.003 + i) * 10;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  resizeTopo();
  window.addEventListener('resize', resizeTopo);
}


/* ── 6. SKILLS ICON — rotate on card hover ── */
const skillsCard = document.querySelector('.skills-card');
const skillsIcon = document.querySelector('.skills-icon-wrap');
if (skillsCard && skillsIcon) {
  skillsCard.addEventListener('mouseenter', () => {
    skillsIcon.style.transform = 'rotate(20deg)';
    skillsIcon.style.transition = 'transform 0.4s ease';
  });
  skillsCard.addEventListener('mouseleave', () => {
    skillsIcon.style.transform = 'rotate(0deg)';
  });
}


/* ── 7. GET IN TOUCH arrow — translate to down-right on hover ── */
// Already handled by CSS (.git-btn:hover .git-arrow)
// The arrow SVG points right; on hover it nudges right+up → looks diagonal "go"
// No extra JS needed.


/* ── 8. WORK BTN — bounce arrow continues via CSS animation ── */
// Already handled by CSS @keyframes bounceY.


/* ── 9. FADE-UP elements on first load ── */
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => fadeObserver.observe(el));


/* ── 10. PHOTO STACK tilt on mouse proximity ── */
const photoStack = document.querySelector('.photo-stack');
const photoImg = document.querySelector('.photo-img');
if (photoStack && photoImg) {
  photoStack.addEventListener('mousemove', (e) => {
    const rect = photoStack.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    photoImg.style.transform = `rotate(${-8 + dx * 6}deg) scale(1.03) translateX(${dx * 6}px) translateY(${dy * 4}px)`;
  });
  photoStack.addEventListener('mouseleave', () => {
    photoImg.style.transform = 'rotate(-8deg)';
  });
}

/* ── 11. MENU TOGGLE ── */
const menuToggleBtns = document.querySelectorAll('.menu-toggle');
const menuOverlay = document.getElementById('menu-overlay');

menuToggleBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const isLink = btn.classList.contains('menu-link') || btn.classList.contains('menu-item');
    
    // Toggle active class
    if (menuOverlay.classList.contains('active')) {
      menuOverlay.classList.remove('active');
    } else {
      menuOverlay.classList.add('active');
    }

    // If it's a link, scroll to target after delay
    if (isLink) {
      setTimeout(() => {
        const targetId = btn.getAttribute('href');
        if (targetId && targetId !== '#') {
          const target = document.querySelector(targetId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 300);
    }
  });
});
