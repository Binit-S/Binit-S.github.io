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
  'a, button, .badge, .social-icon, .photo-img, .project-card, .skill-list li'
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


/* ── 3. SMOOTH ANCHOR SCROLL ── */
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


/* ── 5. PROJECT CARDS — stagger in on scroll ── */
const projectCards = document.querySelectorAll('.project-card');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const i = [...projectCards].indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 120);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

projectCards.forEach(card => cardObserver.observe(card));


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