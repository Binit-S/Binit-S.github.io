/* ════════════════════════════════════
   script.js — Brutalist Overhaul
   ════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. CINEMATIC INTRO SEQUENCE (GSAP) ── */
  const introOverlay = document.getElementById('intro-overlay');
  const mainContent = document.getElementById('main-content');
  const navbar = document.getElementById('navbar');
  
  if (introOverlay && mainContent && typeof gsap !== 'undefined') {
    // Lock scroll during intro animation
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        // Unlock scroll after completion
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        introOverlay.style.display = 'none';
        
        // Calibrate positions & progress calculations
        onScroll();
      }
    });

    // Frame 1: BUILD.
    tl.to('#intro-text-1', { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
      .to('#intro-text-1', { opacity: 0, y: -30, duration: 0.25, ease: 'power2.in' }, '+=0.3')

    // Frame 2: SYSTEMS.
    tl.to('#intro-text-2', { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
      .to('#intro-text-2', { opacity: 0, y: -30, duration: 0.25, ease: 'power2.in' }, '+=0.3')

    // Frame 3: THAT SHIP.
    tl.to('#intro-text-3', { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' })
      // Fade/Scale intro overlay
      .to(introOverlay, { opacity: 0, scale: 0.96, duration: 0.45, ease: 'power3.inOut' }, '+=0.4')
      
      // Smoothly reveal primary viewport content
      .to(mainContent, { opacity: 1, duration: 0.35 }, '-=0.35')
      .to(navbar, { opacity: 1, duration: 0.35 }, '-=0.35')
      
      // Editorial stagger reveal of massive hero titles
      .from('.hero-title-large .word', {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.25')
      
      // Reveal details (subtitle, description, CTA buttons)
      .from('.hero-details', {
        opacity: 0,
        y: 15,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.3');
  } else {
    // Fallback if GSAP is blocked or fails to load
    if (introOverlay) introOverlay.style.display = 'none';
    if (mainContent) mainContent.style.opacity = 1;
    if (navbar) navbar.style.opacity = 1;
  }

  /* ── 2. SCROLL PROGRESS & NAVBAR SCROLL BLUR ── */
  const rail = document.getElementById('rail');
  
  function onScroll() {
    const doc = document.documentElement;
    const scrollPercent = (doc.scrollTop) / (doc.scrollHeight - doc.clientHeight) * 100;
    
    if (rail) {
      rail.style.height = scrollPercent + '%';
    }
    
    // Navbar blurred background state
    if (navbar) {
      const isHomepage = document.getElementById('hero') !== null;
      if (!isHomepage || doc.scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }
  
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ── 3. SMOOTH ANCHOR NAVIGATION ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      if (id.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

});
