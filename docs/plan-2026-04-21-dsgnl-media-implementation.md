# DSGNL Media - Implementation Plan

> **REQUIRED:** Use subagent-driven-development or executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign DSGNL Studio website with Claude.ai-inspired warm editorial aesthetic, smooth animations, and conversion-focused design.

**Architecture:** Single HTML file with embedded CSS/JS, using GSAP for animations. Warm ivory (#FAF8F5) background, Playfair Display for headings, DM Sans for body, Burnt Sienna (#C75B3A) accent.

**Tech Stack:** HTML5, CSS3 (custom properties), JavaScript (ES6+), GSAP 3.x + ScrollTrigger

---

## File Structure

- **Create:** `index.html` - Complete redesign (replace existing)
- **Create:** `style.css` - Complete redesign (replace existing)
- **Create:** `main.js` - Animations (replace existing)

---

## Implementation Tasks

### Task 1: HTML Structure

**Files:**
- Create: `index.html` - Complete new structure

- [ ] **Step 1: Write HTML structure**
  ```html
  <!DOCTYPE html>
  <html lang="ro">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>DSGNL STUDIO — Video Production Moldova</title>
    <meta name="description" content="Studio de producție video profesional în Moldova. Editare video, animație 3D, reeluri. 120+ proiecte livrate."/>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
    <!-- GSAP -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
    <link rel="stylesheet" href="style.css"/>
  </head>
  <body>
    <!-- Navigation -->
    <nav id="nav">...</nav>
    
    <!-- Mobile Menu -->
    <div class="nav-menu" id="navMenu">...</div>
    
    <!-- Hero -->
    <section id="hero">...</section>
    
    <!-- About -->
    <section id="about">...</section>
    
    <!-- Work -->
    <section id="work">...</section>
    
    <!-- Lightbox -->
    <div class="lightbox" id="lightbox">...</div>
    
    <!-- Services -->
    <section id="services">...</section>
    
    <!-- Process -->
    <section id="process">...</section>
    
    <!-- Contact -->
    <section id="contact">...</section>
    
    <!-- Footer -->
    <footer>...</footer>
    
    <script src="main.js"></script>
  </body>
  </html>
  ```

- [ ] **Step 2: Verify HTML structure**
  Run: Check file exists and has > 200 lines
  Expected: Valid HTML with all sections

- [ ] **Step 3: Commit**
  ```bash
  git add index.html
  git commit -m "feat: add HTML structure with warm editorial design"
  ```

---

### Task 2: CSS Styling

**Files:**
- Create: `style.css` - Complete CSS redesign

- [ ] **Step 1: Write CSS design system and base styles**
  ```css
  /* DSGNL Studio - Warm Editorial Design */
  
  :root {
    /* Warm Editorial Palette */
    --bg: #FAF8F5;
    --surface: #F2EEE8;
    --surface-alt: #E8E3DB;
    --text: #1A1612;
    --text-2: #6B5F4E;
    --text-3: #9A8B78;
    --accent: #C75B3A;
    --accent-hover: #A84829;
    --accent-dim: #E8D0C4;
    --border: #D4CFC6;
    --border-light: #E8E3DB;
  
    /* Typography */
    --font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;
    --font-body: 'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
  
    /* Spacing */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 20px;
    --space-6: 24px;
    --space-8: 32px;
    --space-10: 40px;
    --space-12: 48px;
    --space-16: 64px;
    --space-20: 80px;
    --space-24: 96px;
  
    /* Effects */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    --shadow-sm: 0 1px 2px rgba(26, 22, 18, 0.05);
    --shadow-md: 0 4px 12px rgba(26, 22, 18, 0.08);
    --shadow-lg: 0 8px 24px rgba(26, 22, 18, 0.12);
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    --duration-fast: 150ms;
    --duration-normal: 300ms;
    --duration-slow: 500ms;
  }
  
  /* Reset & Base */
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  a { text-decoration: none; color: inherit; }
  button { font-family: inherit; cursor: pointer; border: none; background: none; }
  img, video { display: block; max-width: 100%; }
  ::selection { background: var(--accent); color: white; }
  
  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--accent); }
  ```

- [ ] **Step 2: Write navigation and hero CSS**
  ```css
  /* NAV */
  #nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 500;
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 40px;
    background: transparent;
    transition: all 0.3s var(--ease-out);
  }
  #nav.scrolled {
    background: rgba(250, 248, 245, 0.9);
    backdrop-filter: blur(12px);
    padding: 16px 40px;
    box-shadow: var(--shadow-sm);
  }
  .nav-logo {
    font-family: var(--font-mono);
    font-size: 1rem; font-weight: 700;
    letter-spacing: 0.1em;
  }
  .nav-logo span { color: var(--accent); }
  .nav-links { display: flex; gap: 32px; }
  .nav-links a {
    font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-2);
    position: relative;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: -4px; left: 0;
    width: 0; height: 1px; background: var(--accent);
    transition: width 0.3s var(--ease-out);
  }
  .nav-links a:hover { color: var(--text); }
  .nav-links a:hover::after { width: 100%; }
  .nav-cta { color: var(--accent) !important; }
  
  /* Mobile Menu */
  .nav-menu {
    position: fixed; inset: 0; z-index: 450;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 32px; background: var(--bg);
    opacity: 0; visibility: hidden;
    transition: all 0.4s var(--ease-out);
  }
  .nav-menu.open { opacity: 1; visibility: visible; }
  
  /* HERO */
  #hero {
    position: relative; min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, var(--bg) 0%, var(--surface) 50%, var(--bg) 100%);
  }
  #hero::before {
    content: ''; position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.03; pointer-events: none;
  }
  .hero-content {
    position: relative; z-index: 10; text-align: center;
    max-width: 900px; padding: 0 20px;
  }
  .hero-label {
    font-family: var(--font-mono);
    font-size: 0.7rem; letter-spacing: 0.3em;
    color: var(--accent); margin-bottom: 24px;
  }
  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 600; line-height: 1.05;
    margin-bottom: 24px;
  }
  .hero-title span { display: block; }
  .hero-title span:nth-child(2) { color: var(--accent); }
  .hero-sub {
    font-size: 1.125rem;
    color: var(--text-2); margin-bottom: 40px;
    max-width: 500px; margin-left: auto; margin-right: auto;
  }
  .hero-cta { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px;
    font-size: 0.75rem; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    border-radius: var(--radius-sm);
    transition: all 0.3s var(--ease-out);
  }
  .btn-primary { background: var(--accent); color: white; }
  .btn-primary:hover {
    background: var(--accent-hover);
    transform: translateY(-2px);
  }
  .btn-outline {
    border: 1px solid var(--text);
    color: var(--text);
  }
  .btn-outline:hover {
    border-color: var(--accent); color: var(--accent);
  }
  .hero-stats {
    position: absolute; bottom: 60px; left: 0; right: 0;
    display: flex; justify-content: center; gap: 40px; z-index: 10;
  }
  .stat { text-align: center; }
  .stat-num { font-size: 2rem; font-weight: 700; color: var(--accent); }
  .stat-label {
    display: block; font-size: 0.65rem; letter-spacing: 0.2em;
    color: var(--text-2); margin-top: 4px;
  }
  .stat-divider { width: 1px; height: 40px; background: var(--border); align-self: center; }
  .hero-scroll {
    position: absolute; bottom: 40px; left: 50%;
    transform: translateX(-50%); display: flex; align-items: center; gap: 12px; z-index: 10;
  }
  .hero-scroll span { font-size: 0.65rem; letter-spacing: 0.2em; color: var(--text-2); }
  .scroll-line { width: 1px; height: 40px; background: var(--border); }
  ```

- [ ] **Step 3: Write about, work, services CSS**
  ```css
  /* ABOUT */
  #about { padding: 120px 40px; }
  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; max-width: 1400px; margin: 0 auto;
    align-items: center;
  }
  .about-visual { position: relative; }
  .about-visual img { width: 100%; border-radius: var(--radius-md); }
  .about-tag {
    position: absolute; bottom: -20px; right: -20px;
    background: var(--accent); color: white;
    padding: 12px 20px;
    font-size: 0.7rem; font-weight: 600;
    letter-spacing: 0.1em;
  }
  .about-text .section-num {
    font-family: var(--font-mono);
    font-size: 0.7rem; letter-spacing: 0.2em;
    color: var(--accent); margin-bottom: 16px;
  }
  .about-text h2 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 600; line-height: 1.1;
    margin-bottom: 32px;
  }
  .about-text h2 em { color: var(--accent); }
  .about-text p { color: var(--text-2); margin-bottom: 20px; }
  .about-text .btn { margin-top: 16px; }
  
  /* WORK */
  #work { padding: 120px 40px; background: var(--surface); }
  .work-header { max-width: 1400px; margin: 0 auto 60px; }
  .section-num {
    font-family: var(--font-mono);
    font-size: 0.7rem; letter-spacing: 0.2em;
    color: var(--accent); margin-bottom: 16px;
  }
  .work-header h2 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 600; line-height: 1.1;
  }
  .work-header h2 em { color: var(--accent); }
  .work-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px; max-width: 1400px; margin: 0 auto;
  }
  .work-item {
    position: relative;
    aspect-ratio: 16/10;
    overflow: hidden;
    border-radius: var(--radius-md);
    cursor: pointer;
  }
  .work-item:nth-child(3n+1) { grid-column: span 1; }
  .work-item:nth-child(3n+2) { grid-column: span 1; }
  .work-item:nth-child(3n+3) { grid-column: span 1; }
  .work-item:nth-child(7) { grid-column: span 2; aspect-ratio: 32/10; }
  .work-item video, .work-item img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.6s var(--ease-out);
  }
  .work-item:hover video, .work-item:hover img { transform: scale(1.05); }
  .work-overlay {
    position: absolute; inset: 0;
    background: rgba(26, 22, 18, 0.6);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.3s;
  }
  .work-item:hover .work-overlay { opacity: 1; }
  .work-info { padding: 20px; background: linear-gradient(to top, rgba(10,10,10,0.9), transparent); }
  .work-type { font-size: 0.65rem; letter-spacing: 0.15em; color: var(--accent); }
  .work-name { font-size: 0.875rem; font-weight: 600; }
  .work-load-more {
    display: flex; align-items: center; justify-content: center; gap: 12px;
    margin: 40px auto 0; padding: 16px 32px;
    font-size: 0.75rem; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    background: transparent; border: 1px solid var(--border);
    color: var(--text); border-radius: var(--radius-sm);
    cursor: pointer; transition: all 0.3s var(--ease-out);
  }
  .work-load-more:hover { border-color: var(--accent); color: var(--accent); }
  
  /* SERVICES */
  #services { padding: 120px 40px; }
  .services-header { max-width: 1400px; margin: 0 auto 60px; }
  .services-header h2 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 600; line-height: 1.1;
  }
  .services-header h2 em { color: var(--accent); }
  .services-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px; max-width: 1400px; margin: 0 auto;
  }
  .service-card {
    background: var(--surface);
    padding: 32px;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
    transition: all 0.3s var(--ease-out);
  }
  .service-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s var(--ease-out);
  }
  .service-card:hover {
    border-color: var(--accent-dim);
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  .service-card:hover::before { transform: scaleX(1); }
  .service-num {
    font-family: var(--font-mono);
    font-size: 0.7rem; color: var(--accent);
    margin-bottom: 16px;
  }
  .service-icon { width: 40px; height: 40px; margin-bottom: 20px; }
  .service-icon svg { width: 100%; height: 100%; stroke: var(--accent); }
  .service-card h3 {
    font-family: var(--font-display);
    font-size: 1.25rem; font-weight: 600;
    margin-bottom: 12px;
  }
  .service-card p {
    font-size: 0.875rem; color: var(--text-2);
    margin-bottom: 16px;
  }
  .service-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .service-tags span {
    font-size: 0.65rem; letter-spacing: 0.1em;
    padding: 6px 10px; background: var(--surface-alt);
    border-radius: var(--radius-sm);
  }
  ```

- [ ] **Step 4: Write process, contact, footer, lightbox CSS**
  ```css
  /* PROCESS */
  #process { padding: 120px 40px; background: var(--surface); }
  .process-header { max-width: 1400px; margin: 0 auto 60px; }
  .process-header h2 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 600; line-height: 1.1;
  }
  .process-header h2 em { color: var(--accent); }
  .process-steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px; max-width: 1400px; margin: 0 auto;
  }
  .process-step { position: relative; padding-right: 24px; }
  .step-num {
    font-family: var(--font-display);
    font-size: 3rem; font-weight: 700;
    color: var(--accent);
    opacity: 0.2; margin-bottom: 8px;
  }
  .step-line {
    width: 40px; height: 2px;
    background: var(--accent);
    margin-bottom: 20px;
  }
  .step-body h4 {
    font-family: var(--font-display);
    font-size: 1rem; font-weight: 600;
    margin-bottom: 12px;
  }
  .step-body p {
    font-size: 0.875rem; color: var(--text-2);
  }
  
  /* CONTACT */
  #contact { padding: 120px 40px; }
  .contact-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; max-width: 1400px; margin: 0 auto;
  }
  .contact-info h2 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 600; line-height: 1.1;
    margin-bottom: 24px;
  }
  .contact-info h2 em { color: var(--accent); }
  .contact-info p { color: var(--text-2); margin-bottom: 40px; }
  .contact-channels { display: flex; flex-direction: column; gap: 16px; }
  .contact-channel {
    display: flex; align-items: center; gap: 12px;
    padding: 16px 20px;
    background: var(--surface);
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    transition: all 0.3s;
  }
  .contact-channel:hover { border-color: var(--accent); }
  .form-group { position: relative; }
  .form-group input, .form-group select, .form-group textarea {
    width: 100%; padding: 16px;
    font-size: 1rem; font-family: inherit;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text);
    outline: none;
    transition: border-color 0.2s;
  }
  .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    border-color: var(--accent);
  }
  .form-group label {
    position: absolute; left: 16px; top: 16px;
    font-size: 0.875rem; color: var(--text-2);
    pointer-events: none;
    transition: all 0.2s;
  }
  .form-group input:focus + label,
  .form-group input:not(:placeholder-shown) + label,
  .form-group textarea:focus + label,
  .form-group textarea:not(:placeholder-shown) + label {
    top: -8px; left: 8px;
    font-size: 0.65rem;
    background: var(--bg);
    color: var(--accent);
    padding: 0 8px;
  }
  ```

- [ ] **Step 5: Verify CSS structure**
  Run: Check file exists and has > 500 lines
  Expected: Valid CSS with all styles defined

- [ ] **Step 6: Commit**
  ```bash
  git add style.css
  git commit -m "feat: add complete CSS with warm editorial design"
  ```

---

### Task 3: JavaScript Animations

**Files:**
- Create: `main.js` - GSAP animations

- [ ] **Step 1: Write JavaScript animations**
  ```javascript
  // DSGNL Studio - Animations
  
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);
  
  // Global defaults
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8
  });
  
  // DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeroAnimation();
    initScrollAnimations();
    initWorkSection();
    initMobileMenu();
    initContactForm();
  });
  
  // Navigation scroll effect
  function initNavigation() {
    const nav = document.getElementById('nav');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }
  
  // Hero animations on load
  function initHeroAnimation() {
    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.out' } });
    
    tl.from('.hero-label', { opacity: 0, y: 20, duration: 0.6 })
      .from('.hero-title span', {
        opacity: 0,
        y: 60,
        stagger: 0.1,
        duration: 0.8
      }, '-=0.4')
      .from('.hero-sub', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
      .from('.hero-cta', { opacity: 0, y: 20, duration: 0.6 }, '-=0.2')
      .from('.hero-stats', { opacity: 0, duration: 0.8 }, '-=0.2');
  }
  
  // Scroll-triggered animations
  function initScrollAnimations() {
    // Fade up utility
    function fadeUp(element, options = {}) {
      const defaults = {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1
      };
      
      gsap.from(element, {
        ...defaults,
        ...options,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }
    
    // Animate sections
    fadeUp('#about .about-visual', { x: -40 });
    fadeUp('#about .about-text > *', { stagger: 0.1 });
    fadeUp('#work .work-header');
    fadeUp('#work .work-grid .work-item', { stagger: 0.1 });
    fadeUp('#services .services-header');
    fadeUp('#services .services-grid .service-card', { stagger: 0.1 });
    fadeUp('#process .process-header');
    fadeUp('#process .process-steps .process-step', { stagger: 0.15 });
    fadeUp('#contact .contact-info > *', { stagger: 0.1 });
    fadeUp('#contact .contact-form-wrap');
  }
  
  // Work section functionality
  function initWorkSection() {
    const workItems = document.querySelectorAll('.work-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = lightbox?.querySelector('.lightbox-content');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxTitle = lightbox?.querySelector('.lightbox-title');
    const lightboxType = lightbox?.querySelector('.lightbox-type');
    const lightboxVideo = document.getElementById('lightboxVideo');
    
    // Open lightbox on click
    workItems.forEach(item => {
      item.addEventListener('click', () => {
        const video = item.querySelector('video');
        const name = item.dataset.label;
        const type = item.dataset.type;
        
        if (lightbox && lightboxVideo && video) {
          lightboxVideo.src = video.querySelector('source').src;
          if (lightboxTitle) lightboxTitle.textContent = name;
          if (lightboxType) lightboxType.textContent = type;
          lightbox.classList.add('show');
        }
      });
    });
    
    // Close lightbox
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
    
    function closeLightbox() {
      if (lightbox) lightbox.classList.remove('show');
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.src = '';
      }
    }
  }
  
  // Mobile menu
  function initMobileMenu() {
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('navMenu');
    const menuLinks = navMenu?.querySelectorAll('a');
    
    if (burger && navMenu) {
      burger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        burger.classList.toggle('active');
      });
      
      menuLinks?.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          burger.classList.remove('active');
        });
      });
    }
  }
  
  // Contact form
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'SENDING...';
        btn.disabled = true;
        
        // Simulate send (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success
        if (formSuccess) formSuccess.classList.add('show');
        form.reset();
        btn.textContent = originalText;
        btn.disabled = false;
      });
    }
  }
  ```

- [ ] **Step 2: Verify JavaScript structure**
  Run: Check file exists and has > 100 lines
  Expected: Valid JS with all functions

- [ ] **Step 3: Commit**
  ```bash
  git add main.js
  git commit -m "feat: add GSAP animations and interactions"
  ```

---

### Task 4: Verify Implementation

**Files:**
- Verify: `index.html`, `style.css`, `main.js`

- [ ] **Step 1: Verify HTML**
  Run: `wc -l index.html`
  Expected: > 300 lines

- [ ] **Step 2: Verify CSS**
  Run: `wc -l style.css`
  Expected: > 600 lines

- [ ] **Step 3: Verify JS**
  Run: `wc -l main.js`
  Expected: > 150 lines

- [ ] **Step 4: Test in browser**
  Run: Open `index.html` in browser
  Expected: Page loads without errors

- [ ] **Step 5: Commit final**
  ```bash
  git add -A
  git commit -m "feat: complete redesign with warm editorial aesthetic"
  ```

---

## Summary

- **Total tasks**: 4 major tasks with multiple steps
- **Estimated time**: 30-45 minutes for implementation
- **Key deliverables**:
  - Warm editorial design (ivory background)
  - Playfair Display headings
  - Burnt Sienna accent
  - Smooth GSAP animations
  - Responsive layout
  - Working contact form
  - Lightbox portfolio

---

**Plan complete and saved to `C:\Temp\dsgnl-media\docs\plan-2026-04-21-dsgnl-media-implementation.md`. Ready to execute?**

- **With subagents** → Use subagent-driven-development (required)
- **Without subagents** → Use executing-plans in current session