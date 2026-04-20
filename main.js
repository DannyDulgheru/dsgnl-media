'use strict';
gsap.registerPlugin(ScrollTrigger);

const APP = { lb: false };

/* CURSOR */
function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;
  let mx = -100, my = -100, cx = -100, cy = -100;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function loop() {
    cx += (mx - cx) * 0.15;
    cy += (my - cy) * 0.15;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(loop);
  })();
}

/* NAV */
function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const menu = document.getElementById('navMenu');
  if (!nav) return;
  
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
  
  let open = false;
  burger.addEventListener('click', () => {
    open = !open;
    menu.classList.toggle('open', open);
    const spans = burger.querySelectorAll('span');
    if (open) {
      gsap.to(spans[0], { rotation: 45, y: 6, duration: 0.25 });
      gsap.to(spans[1], { rotation: -45, duration: 0.25 });
    } else {
      gsap.to(spans, { rotation: 0, y: 0, duration: 0.25 });
    }
  });
  
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    open = false; menu.classList.remove('open');
    gsap.to(burger.querySelectorAll('span'), { rotation: 0, y: 0, duration: 0.25 });
  }));
}

/* HERO */
function initHero() {
  const label = document.querySelector('.hero-label');
  const title = document.querySelector('.hero-title');
  const sub = document.querySelector('.hero-sub');
  const cta = document.querySelector('.hero-cta');
  const stats = document.querySelector('.hero-stats');
  
  if (!label || !title) return;
  
  gsap.set([label, sub, cta, stats], { opacity: 0, y: 20 });
  gsap.set(title.children, { y: '120%' });
  
  const tl = gsap.timeline({ delay: 0.3 });
  tl.to(label, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
    .to(title.children, { y: '0%', duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
    .to(sub, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
    .to(cta, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
    .to(stats, { opacity: 1, duration: 0.5 }, '-=0.2');
  
  document.querySelectorAll('.stat-num').forEach(el => {
    const n = parseInt(el.dataset.n, 10);
    const target = { value: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: function() {
        gsap.to(target, {
          value: n,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            el.textContent = Math.round(target.value);
          }
        });
      }
    });
  });
}

/* WORK - VIDEO OBSERVER & LOAD MORE */
function initWork() {
  const btn = document.getElementById('loadMoreBtn');
  const allItems = document.querySelectorAll('.work-item');
  let expanded = false;
  
  // Hide items 5-10 initially
  allItems.forEach((item, i) => {
    if (i >= 4) {
      item.style.display = 'none';
      item.classList.add('work-hidden');
    }
  });
  
  if (btn) {
    btn.addEventListener('click', function() {
      expanded = !expanded;
      allItems.forEach((item, i) => {
        if (i >= 4) {
          if (expanded) {
            item.style.display = 'block';
            item.classList.remove('work-hidden');
            gsap.fromTo(item, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, delay: i * 0.05 });
          } else {
            const vid = item.querySelector('video');
            if (vid) vid.pause();
            gsap.to(item, { opacity: 0, duration: 0.3, onComplete: function() {
              item.style.display = 'none';
              item.classList.add('work-hidden');
            }});
          }
        }
      });
      btn.classList.toggle('expanded', expanded);
      btn.querySelector('span').textContent = expanded ? 'HIDE PROJECTS' : 'VIEW ALL PROJECTS';
    });
  }
  
  // Observe only first 4 items
  initVideoObserver(document.querySelectorAll('.work-item:not(.work-hidden)'));
  
  // Click handler for lightbox
  allItems.forEach(function(item) {
    item.addEventListener('click', function() {
      const vid = item.querySelector('video');
      const img = item.querySelector('img');
      const label = item.dataset.label;
      const type = item.dataset.type;
      if (vid) {
        openLightbox(vid.querySelector('source').getAttribute('src'), label, type);
      } else if (img && item.dataset.yt) {
        openLightbox(null, label, type, item.dataset.yt);
      }
    });
  });
}

function initVideoObserver(items) {
  if (!items || !items.length) return;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (!isMobile) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const vid = e.target.querySelector('video');
        if (!vid) return;
        if (e.isIntersecting) vid.play().catch(() => {});
        else vid.pause();
      });
    }, { threshold: 0.2 });
    items.forEach(item => io.observe(item));
  } else {
    items.forEach(item => {
      const vid = item.querySelector('video');
      if (!vid) return;
      vid.removeAttribute('autoplay');
      vid.pause();
      if (vid.readyState >= 2) vid.currentTime = 0.1;
      else vid.addEventListener('loadeddata', () => { vid.currentTime = 0.1; }, { once: true });
    });
  }
}
}

/* SCROLL ANIMATIONS */
function initScrollAnimations() {
  gsap.fromTo('#about .about-visual', { opacity: 0, x: -30 }, {
    opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '#about', start: 'top 70%' }
  });
  gsap.fromTo('#about .about-text > *', { opacity: 0, y: 20 }, {
    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '#about', start: 'top 65%' }
  });
  
  gsap.fromTo('.work-item', { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
    scrollTrigger: { trigger: '#work', start: 'top 75%' }
  });
  
  gsap.fromTo('.service-card', { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
    scrollTrigger: { trigger: '#services', start: 'top 75%' }
  });
  
  gsap.fromTo('.process-step', { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out',
    scrollTrigger: { trigger: '#process', start: 'top 75%' }
  });
  
  gsap.fromTo('#contact .contact-info > *', { opacity: 0, x: -20 }, {
    opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '#contact', start: 'top 70%' }
  });
  gsap.fromTo('#contact .contact-form', { opacity: 0, x: 20 }, {
    opacity: 1, x: 0, duration: 0.6, ease: 'power2.out',
    scrollTrigger: { trigger: '#contact', start: 'top 70%' }
  });
}

/* LIGHTBOX */
function openLightbox(src, label, type, ytId) {
  if (APP.lb) return; APP.lb = true;
  const lb = document.getElementById('lightbox');
  const title = lb.querySelector('.lightbox-title');
  const typeEl = lb.querySelector('.lightbox-type');
  const vid = document.getElementById('lightboxVideo');
  
  title.textContent = label || '';
  typeEl.textContent = type || '';
  
  if (ytId) {
    vid.style.display = 'none';
  } else if (src) {
    vid.style.display = '';
    vid.src = src;
    vid.load();
    vid.play().catch(() => {});
  }
  
  lb.classList.add('show');
  document.body.style.overflow = 'hidden';
  gsap.fromTo(lb.querySelector('.lightbox-content'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 });
}

function closeLightbox() {
  if (!APP.lb) return;
  const lb = document.getElementById('lightbox');
  const vid = document.getElementById('lightboxVideo');
  gsap.to(lb.querySelector('.lightbox-content'), {
    opacity: 0, y: 10, duration: 0.2, onComplete() {
      lb.classList.remove('show');
      vid.pause();
      vid.removeAttribute('src');
      document.body.style.overflow = '';
      APP.lb = false;
    }
  });
}

function initLightbox() {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

/* CONTACT FORM */
function initContact() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form || !success) return;
  
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'SENDING...';
    btn.disabled = true;
    
    const payload = {
      access_key: '52031838-da8a-4613-92ae-96fef3becb22',
      subject: 'New contact from DSGNL STUDIO',
      name: document.getElementById('formName').value,
      phone: document.getElementById('formPhone').value,
      service: document.getElementById('formService').value,
      message: document.getElementById('formMessage').value
    };
    
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) { console.error(err); }
    
    gsap.to(form, { opacity: 0, duration: 0.2, onComplete() {
      form.style.display = 'none';
      success.classList.add('show');
      gsap.fromTo(success, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
    }});
  });
}

/* FLOAT PHONE */
function initFloatPhone() {
  const fp = document.querySelector('.float-phone');
  if (!fp) return;
  ScrollTrigger.create({
    trigger: 'body', start: '200px top',
    onEnter: () => fp.classList.add('visible'),
    onLeaveBack: () => fp.classList.remove('visible')
  });
}

/* SMOOTH SCROLL */
function initScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const h = a.getAttribute('href');
      if (!h || h === '#') return;
      const t = document.querySelector(h);
      if (t) {
        e.preventDefault();
        window.scrollTo({ top: t.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });
}

/* INIT */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNav();
  initHero();
  initWork();
  initScrollAnimations();
  initLightbox();
  initContact();
  initFloatPhone();
  initScroll();
});