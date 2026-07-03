/* ════════════════════════════════════
   script.js — Brutalist Overhaul
   ════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 0. INITIALIZE SCROLLSMOOTHER ── */
  let smoother;
  if (typeof ScrollSmoother !== 'undefined') {
    document.documentElement.classList.add('has-smooth-scrollbar');
    smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.1
    });
  }

  /* ── 1. CINEMATIC INTRO SEQUENCE (GSAP) ── */
  const introOverlay = document.getElementById('intro-overlay');
  const mainContent = document.getElementById('main-content');
  const navbar = document.getElementById('navbar');

  if (introOverlay && mainContent && typeof gsap !== 'undefined') {
    // Lock scroll during intro animation
    if (smoother) {
      smoother.paused(true);
    } else {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Unlock scroll after completion
        if (smoother) {
          smoother.paused(false);
        } else {
          document.documentElement.style.overflow = '';
          document.body.style.overflow = '';
        }
        introOverlay.style.display = 'none';

        // Calibrate positions & progress calculations
        onScroll();

        // Recalculate ScrollTrigger markers after content reveal
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
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
    const scrollTop = smoother ? smoother.scrollTop() : (window.scrollY || document.documentElement.scrollTop);
    const scrollHeight = smoother ? ScrollTrigger.maxScroll(window) : (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (rail) {
      rail.style.height = scrollPercent + '%';
    }

    // Navbar blurred background state
    if (navbar) {
      const isHomepage = document.getElementById('hero') !== null;
      if (!isHomepage || scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }

  if (smoother && typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.addEventListener("scroll", onScroll);
  } else {
    window.addEventListener('scroll', onScroll);
  }
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
          if (smoother) {
            smoother.scrollTo(target, true, "top top");
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });

  /* ── 4. SCROLL-DRIVEN REVEAL ANIMATIONS ── */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // Reveal Section Titles and eyebrows
    const titleSections = ['.projects-head', '#about', '#proof', '.contact-top'];
    titleSections.forEach(selector => {
      const section = document.querySelector(selector);
      if (section) {
        // Collect eyebrow and title to animate
        const elementsToAnimate = [];
        const eyebrow = section.querySelector('.eyebrow');
        const title = section.querySelector('.title, .contact-main-title, .about-title');
        if (eyebrow) elementsToAnimate.push(eyebrow);
        if (title) elementsToAnimate.push(title);

        if (elementsToAnimate.length > 0) {
          gsap.from(elementsToAnimate, {
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none"
            },
            y: 35,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out"
          });
        }
      }
    });

    // About Me bio reveal
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      const bioParagraphs = aboutSection.querySelectorAll('.about-bio p');
      const locationText = aboutSection.querySelector('.about-location');

      if (bioParagraphs.length > 0) {
        gsap.from(bioParagraphs, {
          scrollTrigger: {
            trigger: aboutSection,
            start: "top 75%",
            toggleActions: "play none none none"
          },
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out"
        });
      }

      if (locationText) {
        gsap.from(locationText, {
          scrollTrigger: {
            trigger: aboutSection,
            start: "top 75%",
            toggleActions: "play none none none"
          },
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    }

    // Case study reveals
    document.querySelectorAll('.case').forEach(caseEl => {
      // Left side content
      const leftContent = caseEl.querySelector('.case-left');
      if (leftContent) {
        gsap.from(leftContent.children, {
          scrollTrigger: {
            trigger: caseEl,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out"
        });
      }

      // Right side content (Problem, Build, Impact rows)
      const rightRows = caseEl.querySelectorAll('.case-right .row');
      if (rightRows.length > 0) {
        gsap.from(rightRows, {
          scrollTrigger: {
            trigger: caseEl,
            start: "top 75%",
            toggleActions: "play none none none"
          },
          x: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    });

    // Tech Stack cells stagger reveal
    const pcells = document.querySelectorAll('.proof-grid .pcell');
    if (pcells.length > 0) {
      gsap.from(pcells, {
        scrollTrigger: {
          trigger: '.proof-grid',
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    // Tag strip pills stagger reveal
    const pills = document.querySelectorAll('.tag-strip .pill');
    if (pills.length > 0) {
      gsap.from(pills, {
        scrollTrigger: {
          trigger: '.tag-strip',
          start: "top 90%",
          toggleActions: "play none none none"
        },
        scale: 0.9,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "back.out(1.5)"
      });
    }

    // Contact Banner columns reveal
    const bannerCols = document.querySelectorAll('.banner-grid .banner-col');
    if (bannerCols.length > 0) {
      gsap.from(bannerCols, {
        scrollTrigger: {
          trigger: '.contact-banner',
          start: "top 90%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  }

});
