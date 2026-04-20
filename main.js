'use strict';
gsap.registerPlugin(ScrollTrigger);

const ST = { lb: false, pop: false };

/* ─── CUSTOM CURSOR ─── */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  if (!cursor || !dot) return;
  let mx = -100, my = -100, cx = -100, cy = -100;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  (function loop() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a, button, .pg-item, .svc-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '64px';
      cursor.style.height = '64px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
    });
  });
}

/* ─── NAV ─── */
function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
  let open = false;
  burger.addEventListener('click', () => {
    open = !open;
    drawer.classList.toggle('open', open);
    const sp = burger.querySelectorAll('span');
    if (open) {
      gsap.to(sp[0], { rotation: 45, y: 7, duration: 0.25 });
      gsap.to(sp[1], { opacity: 0, duration: 0.15 });
    } else {
      gsap.to(sp, { rotation: 0, y: 0, opacity: 1, duration: 0.25 });
    }
  });
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    open = false; drawer.classList.remove('open');
    gsap.to(burger.querySelectorAll('span'), { rotation: 0, y: 0, opacity: 1, duration: 0.25 });
  }));
}

/* ─── HERO ANIMATIONS ─── */
function initHero() {
  gsap.set('#hbadge', { opacity: 0, y: 12 });
  gsap.set('.ht-word', { y: '110%' });
  gsap.set('#hsub', { opacity: 0, y: 12 });
  gsap.set('#hactions', { opacity: 0, y: 12 });
  gsap.set('#hstats', { opacity: 0 });
  gsap.set('#hscroll', { opacity: 0 });

  const tl = gsap.timeline({ delay: 0.2 });
  tl.to('#hbadge', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
    .to('.ht-word', { y: '0%', duration: 0.9, stagger: 0.12, ease: 'power4.out' }, '-=0.3')
    .to('#hsub', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    .to('#hactions', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    .to('#hstats', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2')
    .to('#hscroll', { opacity: 1, duration: 0.5 }, '-=0.2');

  // Counter animation
  document.querySelectorAll('.hs-num').forEach(el => {
    const n = parseInt(el.dataset.n, 10);
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter() {
        gsap.to({ v: 0 }, {
          v: n, duration: 2.2, ease: 'power2.out',
          onUpdate() { el.textContent = Math.round(this.targets()[0].v); }
        });
      }
    });
  });
}

/* ─── PORTFOLIO: LOAD MORE ─── */
function initPortfolio() {
  const btn = document.getElementById('loadMore');
  if (!btn || btn.dataset.initialized) return;
  btn.dataset.initialized = 'true';

  const hiddenItems = Array.from(document.querySelectorAll('.pg-item.pg-hidden'));
  const btnText = document.getElementById('loadMoreText');
  const btnIcon = document.getElementById('loadMoreIcon');
  const count = document.getElementById('pmCount');
  let expanded = false;

  if (!hiddenItems.length) return;

  // Hide initially — pure vanilla, no GSAP involved
  hiddenItems.forEach(item => { item.style.display = 'none'; });

  btn.addEventListener('click', () => {
    expanded = !expanded;

    if (expanded) {
      const allItems = Array.from(document.querySelectorAll('.pg-item'));
      const shuffled = allItems.sort(() => Math.random() - 0.5);
      const container = document.getElementById('pgrid');
      shuffled.forEach((item, i) => {
        container.appendChild(item);
        item.style.display = 'block';
        item.classList.remove('pg-hidden');
        gsap.fromTo(item,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.55, delay: i * 0.06, ease: 'power2.out' }
        );
      });
      if (btnText) btnText.textContent = 'ASCUNDE LUCRĂRILE';
      if (btnIcon) btnIcon.style.transform = 'rotate(180deg)';
      if (count) count.style.opacity = '0';
      setTimeout(initVideoObserver, 350);
    } else {
      const allItems = Array.from(document.querySelectorAll('.pg-item'));
      const first4 = allItems.slice(0, 4);
      const first4Ids = first4.map(item => item.dataset.label);
      allItems.forEach(item => {
        if (!first4Ids.includes(item.dataset.label)) {
          item.classList.add('pg-hidden');
        } else {
          item.classList.remove('pg-hidden');
        }
        const vid = item.querySelector('video');
        if (vid) vid.pause();
        if (!first4Ids.includes(item.dataset.label)) {
          gsap.to(item, {
            opacity: 0, y: -10, duration: 0.3,
            onComplete() {
              item.style.display = 'none';
              gsap.set(item, { clearProps: 'opacity,y' });
            }
          });
        }
      });
      if (btnText) btnText.textContent = 'EXPLOREAZĂ TOATE LUCRĂRILE';
      if (btnIcon) btnIcon.style.transform = '';
      if (count) count.style.opacity = '1';
      setTimeout(() => {
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
  });

  // Click to lightbox
  document.querySelectorAll('.pg-item').forEach(item => {
    item.addEventListener('click', () => {
      const ytId = item.dataset.yt;
      const vid = item.querySelector('video');
      if (ytId) {
        openLb(null, item.dataset.label, item.dataset.type, ytId);
      } else if (vid) {
        const src = vid.querySelector('source')?.getAttribute('src') || '';
        openLb(src, item.dataset.label, item.dataset.type);
      }
    });
  });

  let firstRun = true;
  setTimeout(() => { firstRun = false; initVideoObserver(); }, 100);
}

/* ─── VIDEO OBSERVER ─── */
function initVideoObserver() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const items = document.querySelectorAll('.pg-item:not(.pg-hidden)');

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

/* ─── SCROLL ANIMATIONS ─── */
function initScrollAnimations() {
  // About section
  gsap.fromTo('.about-img-frame', { opacity: 0, x: -40 }, {
    opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: '#about', start: 'top 75%' }
  });
  gsap.fromTo('.about-text > *', { opacity: 0, y: 28 }, {
    opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '#about', start: 'top 70%' }
  });
  gsap.fromTo('.about-accent-block', { opacity: 0, scale: 0.8 }, {
    opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)',
    scrollTrigger: { trigger: '#about', start: 'top 65%' }
  });

  // Portfolio header
  gsap.fromTo('.portfolio-header > *', { opacity: 0, y: 20 }, {
    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '#portfolio', start: 'top 80%' }
  });

  // Visible portfolio items
  gsap.fromTo('.pg-item:not(.pg-hidden)', { opacity: 0, y: 32 }, {
    opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
    scrollTrigger: { trigger: '.portfolio-grid', start: 'top 78%' }
  });

  // Services
  gsap.fromTo('.services-header > *', { opacity: 0, y: 20 }, {
    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '#services', start: 'top 80%' }
  });
  gsap.fromTo('.svc-card', { opacity: 0, y: 40 }, {
    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '.services-grid', start: 'top 78%' }
  });

  // Process
  gsap.fromTo('.proc-step', { opacity: 0, y: 32 }, {
    opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
    scrollTrigger: { trigger: '#process', start: 'top 75%' }
  });

  // Contact
  gsap.fromTo('.contact-left > *', { opacity: 0, x: -24 }, {
    opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '#contact', start: 'top 75%' }
  });
  gsap.fromTo('.contact-right', { opacity: 0, x: 24 }, {
    opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: '#contact', start: 'top 75%' }
  });
}

/* ─── LIGHTBOX ─── */
function openLb(src, label, type, ytId) {
  if (ST.lb) return; ST.lb = true;
  document.getElementById('lbt').textContent = label || '';
  document.getElementById('lbc').textContent = type || '';
  const vid = document.getElementById('lbv');
  const ytWrap = document.getElementById('lb-yt-wrap');
  const ytFr = document.getElementById('lbyt');
  if (ytId) {
    vid.style.display = 'none'; ytWrap.style.display = 'block';
    ytFr.src = 'https://www.youtube.com/embed/' + ytId + '?autoplay=1&rel=0&modestbranding=1';
  } else {
    vid.style.display = ''; ytWrap.style.display = 'none';
    vid.src = src; vid.load(); vid.play().catch(() => {});
  }
  document.getElementById('lb').classList.add('show');
  document.body.style.overflow = 'hidden';
  gsap.fromTo('.lb-in', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' });
}
function closeLb() {
  if (!ST.lb) return;
  const vid = document.getElementById('lbv');
  const ytFr = document.getElementById('lbyt');
  const ytWrap = document.getElementById('lb-yt-wrap');
  gsap.to('.lb-in', { y: 16, opacity: 0, duration: 0.25, ease: 'power2.in', onComplete() {
    document.getElementById('lb').classList.remove('show');
    vid.pause(); vid.removeAttribute('src'); vid.load();
    ytFr.src = ''; ytWrap.style.display = 'none'; vid.style.display = '';
    document.body.style.overflow = ''; ST.lb = false;
  }});
}
function initLb() {
  document.getElementById('lbcls').addEventListener('click', closeLb);
  document.getElementById('lb').addEventListener('click', e => { if (e.target.id === 'lb') closeLb(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeLb(); closePop(); } });
}

/* ─── CONTACT FORM ─── */
function initContact() {
  const sel = document.getElementById('fs');
  if (sel) sel.addEventListener('change', () => sel.classList.toggle('filled', sel.value !== ''));
  const form = document.getElementById('cform');
  const ok = document.getElementById('fok');
  if (!form || !ok) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.querySelector('span').textContent;
    btn.querySelector('span').textContent = 'SE TRIMITE...';
    btn.disabled = true;
    const payload = {
      access_key: '52031838-da8a-4613-92ae-96fef3becb22',
      subject: 'Contact nou de pe DSGNL STUDIO',
      nume: document.getElementById('fn').value,
      telefon: document.getElementById('ftel').value,
      serviciu: document.getElementById('fs').value,
      mesaj: document.getElementById('fm').value
    };
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) { console.error(err); }
    gsap.to(form, { opacity: 0, y: -10, duration: 0.25, ease: 'power2.in', onComplete() {
      form.classList.add('hidden'); ok.classList.add('show');
      gsap.fromTo(ok, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
    }});
  });
}

/* ─── POPUP ─── */
function openPop() {
  if (ST.pop) return; ST.pop = true;
  document.getElementById('pop').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closePop() {
  const p = document.getElementById('pop');
  if (!p.classList.contains('show')) return;
  gsap.to('#pbox', { y: 16, opacity: 0, duration: 0.25, ease: 'power2.in', onComplete() {
    p.classList.remove('show');
    document.body.style.overflow = '';
    gsap.set('#pbox', { y: 0, opacity: 1 });
  }});
}
function initPopup() {
  document.addEventListener('mouseleave', e => { if (e.clientY <= 0) openPop(); });
  let t;
  const ri = () => { clearTimeout(t); t = setTimeout(openPop, 22000); };
  ri();
  ['mousemove', 'keydown', 'scroll', 'click'].forEach(ev => document.addEventListener(ev, ri, { passive: true }));
  document.getElementById('pcls').addEventListener('click', closePop);
  document.getElementById('pop').addEventListener('click', e => { if (e.target.id === 'pop') closePop(); });
  const pf = document.getElementById('pform');
  const pok = document.getElementById('pok');
  if (!pf || !pok) return;
  pf.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = pf.querySelector('button[type="submit"]');
    btn.textContent = 'SE TRIMITE...'; btn.disabled = true;
    const payload = {
      access_key: '52031838-da8a-4613-92ae-96fef3becb22',
      subject: 'Ofertă Specială - Popup DSGNL STUDIO',
      nume: document.getElementById('pn').value,
      telefon: document.getElementById('pp').value
    };
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) { console.error(err); }
    gsap.to(pf, { opacity: 0, y: -10, duration: 0.25, ease: 'power2.in', onComplete() {
      pf.classList.add('hidden'); pok.classList.add('show');
      gsap.fromTo(pok, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
      setTimeout(closePop, 3000);
    }});
  });
}

/* ─── FLOAT PHONE ─── */
function initPhone() {
  const el = document.getElementById('fp');
  if (!el) return;
  ScrollTrigger.create({
    trigger: 'body', start: '200px top',
    onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' }),
    onLeaveBack: () => gsap.to(el, { opacity: 0, y: 12, duration: 0.25 })
  });
}

/* ─── SMOOTH SCROLL ─── */
function initScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const h = a.getAttribute('href');
      if (!h || h === '#') return;
      const t = document.querySelector(h);
      if (t) {
        e.preventDefault();
        window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
      }
    });
  });
}

/* ─── BOOT ─── */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNav();
  initHero();
  initPortfolio();
  initScrollAnimations();
  initLb();
  initContact();
  initPopup();
  initPhone();
  initScroll();
});
