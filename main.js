/**
 * DSGNL Studio - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeroCards();
  initWorkMarquee();
  initMobileMenu();
  initContactForm();
});

/**
 * Navigation scroll effect
 */
function initNavigation() {
  const nav = document.getElementById('nav');
  
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/**
 * Hero cards lightbox
 */
function initHeroCards() {
  const cards = document.querySelectorAll('.hero-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxTitle = lightbox?.querySelector('.lightbox-title');
  const lightboxType = lightbox?.querySelector('.lightbox-type');
  const lightboxVideo = document.getElementById('lightboxVideo');
  
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const video = card.querySelector('video');
      const name = card.dataset.label;
      const type = card.dataset.type;
      
      if (lightbox && lightboxVideo && video) {
        lightboxVideo.src = video.querySelector('source').src;
        if (lightboxTitle) lightboxTitle.textContent = name;
        if (lightboxType) lightboxType.textContent = type;
        lightbox.classList.add('show');
      }
    });
  });
  
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  
  if (lightbox) {
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  
  document.addEventListener('keydown', e => {
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

/**
 * Work marquee - continuous scroll
 */
function initWorkMarquee() {
  const track = document.getElementById('workTrack');
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxTitle = lightbox?.querySelector('.lightbox-title');
  const lightboxType = lightbox?.querySelector('.lightbox-type');
  const lightboxVideo = document.getElementById('lightboxVideo');
  
  if (!track) return;
  
  // Clone items for seamless loop
  const items = document.querySelectorAll('.work-item');
  items.forEach(item => {
    track.appendChild(item.cloneNode(true));
  });
  
  // Lightbox for work items
  const allItems = document.querySelectorAll('.work-item');
  
  allItems.forEach(item => {
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
  
  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      if (lightbox) lightbox.classList.remove('show');
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.src = '';
      }
    });
  }
  
  if (lightbox) {
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) {
        lightbox.classList.remove('show');
        if (lightboxVideo) {
          lightboxVideo.pause();
          lightboxVideo.src = '';
        }
      }
    });
  }
}

/**
 * Mobile menu
 */
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

/**
 * Contact form
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'SENDING...';
      btn.disabled = true;
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (formSuccess) formSuccess.classList.add('show');
      form.reset();
      btn.textContent = originalText;
      btn.disabled = false;
    });
  }
}