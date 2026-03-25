'use strict';
gsap.registerPlugin(ScrollTrigger);

/* THEME */
(function(){
  const themes=['','theme-cyber','theme-luxury','theme-fresh'];
  const pick=themes[Math.floor(Math.random() * themes.length)];
  if(pick) document.documentElement.classList.add(pick);
})();

const ST={hide:false,lastY:0,lb:false,pop:false};

/* NAV */
function initNav(){
  const nav=document.getElementById('nav');
  const burger=document.getElementById('burger');
  const drawer=document.getElementById('drawer');
  if(!nav)return;
  nav.classList.add('top');
  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    nav.classList.toggle('top',y<80);
    ST.lastY=y;
  },{passive:true});
  let open=false;
  burger.addEventListener('click',()=>{
    open=!open;drawer.classList.toggle('open',open);
    const sp=burger.querySelectorAll('span');
    if(open){gsap.to(sp[0],{rotation:45,y:8,duration:0.25});gsap.to(sp[1],{opacity:0,duration:0.15});}
    else{gsap.to(sp,{rotation:0,y:0,opacity:1,duration:0.25});}
  });
  drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    open=false;drawer.classList.remove('open');
    gsap.to(burger.querySelectorAll('span'),{rotation:0,y:0,opacity:1,duration:0.25});
  }));
}

/* HERO */
function initHero(){
  const tl=gsap.timeline({delay:0.15});
  tl.to('#hi',{opacity:1,y:0,duration:0.5,ease:'power2.out'});
  tl.to('.hlw',{y:0,opacity:1,duration:0.7,stagger:0.1,ease:'power3.out'},'-=0.2');
  tl.to('#haud',{opacity:1,y:0,duration:0.5,ease:'power2.out'},'-=0.1');
  tl.to('#htk',{opacity:1,y:0,duration:0.5,ease:'power2.out'},'-=0.1');
  tl.to('#hcta',{opacity:1,y:0,duration:0.5,ease:'power2.out'},'-=0.2');
  tl.to('#hst',{opacity:1,y:0,duration:0.5,ease:'power2.out'},'-=0.2');
  tl.to('#hright',{opacity:1,x:0,duration:0.8,ease:'power3.out'},0.4);
  tl.to('#hscr',{opacity:1,duration:0.4,ease:'power2.out'},'-=0.1');

  // Counters
  document.querySelectorAll('.hst-n').forEach(el=>{
    const n=parseInt(el.dataset.n,10);
    ScrollTrigger.create({trigger:'#hst',start:'top 90%',once:true,onEnter(){
      gsap.to({v:0},{v:n,duration:2,ease:'power2.out',onUpdate(){el.textContent=Math.round(this.targets()[0].v);}});
    }});
  });
}

/* HERO SLIDER */
function initHeroSlider(){
  const track=document.getElementById('htrack');
  if(!track)return;
  const slides=track.querySelectorAll('.hs-slide');
  const dotsWrap=document.getElementById('hsdots');
  if(!slides.length)return;
  let current=0;
  let timer=null;
  const SLIDE_INTERVAL=4500;

  // Build dots
  slides.forEach((_,i)=>{
    const dot=document.createElement('button');
    dot.className='hs-dot'+(i===0?' active':'');
    dot.setAttribute('aria-label','Slide '+(i+1));
    dot.addEventListener('click',()=>goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(n){
    const prevVid=slides[current].querySelector('video');
    if(prevVid)prevVid.pause();
    slides[current].classList.remove('active');
    dotsWrap.querySelectorAll('.hs-dot')[current].classList.remove('active');

    current=(n+slides.length)%slides.length;
    slides[current].classList.add('active');
    dotsWrap.querySelectorAll('.hs-dot')[current].classList.add('active');

    const vid=slides[current].querySelector('video');
    if(vid){
      if(vid.preload==='none')vid.preload='metadata';
      vid.play().catch(()=>{});
    }
    resetTimer();
  }

  function resetTimer(){
    clearInterval(timer);
    timer=setInterval(()=>goTo(current+1),SLIDE_INTERVAL);
  }

  document.getElementById('hsprev').addEventListener('click',()=>goTo(current-1));
  document.getElementById('hsnext').addEventListener('click',()=>goTo(current+1));

  const slider=document.getElementById('hslider');
  slider.addEventListener('mouseenter',()=>clearInterval(timer));
  slider.addEventListener('mouseleave',resetTimer);

  const firstVid=slides[0].querySelector('video');
  if(firstVid)firstVid.play().catch(()=>{});
  resetTimer();
}

/* GALLERY FILTERS */
function initGalleryFilter(){
  const btns=document.querySelectorAll('.gf-btn');
  const items=document.querySelectorAll('#gcols .gi');
  if(!btns.length)return;
  btns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      btns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f=btn.dataset.filter;
      items.forEach(item=>{
        const wasHidden=item.style.display==='none';
        if(f==='all'||item.dataset.cat===f){
          if(wasHidden){
            item.style.display='';
            gsap.fromTo(item,{opacity:0,y:12},{opacity:1,y:0,duration:0.35,ease:'power2.out'});
          }
        } else {
          item.style.display='none';
        }
      });
    });
  });
}

/* GALLERY */
function initGallery(){
  const items=document.querySelectorAll('.gi');
  gsap.fromTo(items,{opacity:0,y:24},{
    opacity:1,y:0,duration:0.5,stagger:0.06,ease:'power2.out',
    scrollTrigger:{trigger:'#gallery',start:'top 78%'},
  });

  const isMobile=window.matchMedia('(max-width:768px)').matches;

  if(!isMobile){
    // Desktop: IntersectionObserver — play when visible, pause when off-screen
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        const vid=entry.target.querySelector('video');
        if(!vid)return;
        if(entry.isIntersecting){
          vid.play().catch(()=>{});
        } else {
          vid.pause();
        }
      });
    },{threshold:0.25});
    items.forEach(item=>io.observe(item));
  } else {
    // Mobile: no autoplay — pause and show first frame as thumbnail
    items.forEach(item=>{
      const vid=item.querySelector('video');
      if(!vid)return;
      vid.removeAttribute('autoplay');
      vid.pause();
      const showThumb=()=>{ vid.currentTime=0.1; };
      if(vid.readyState>=2){ showThumb(); }
      else{ vid.addEventListener('loadeddata',showThumb,{once:true}); }
    });
  }

  items.forEach(item=>{
    const ytId=item.dataset.yt;
    const vid=item.querySelector('video');
    // Click → lightbox
    item.addEventListener('click',()=>{
      if(ytId){
        openLb(null,item.dataset.label,item.dataset.type,ytId);
      } else if(vid){
        const sources=vid.querySelectorAll('source');
        let src='';
        sources.forEach(s=>{ if(s.getAttribute('src').endsWith('.webm')) src=s.getAttribute('src'); });
        if(!src && sources.length) src=sources[sources.length-1].getAttribute('src');
        openLb(src,item.dataset.label,item.dataset.type);
      }
    });
  });
}

/* LIGHTBOX */
function openLb(src,label,type,ytId){
  if(ST.lb)return;ST.lb=true;
  document.getElementById('lbt').textContent=label||'';
  document.getElementById('lbc').textContent=type||'';
  const vid=document.getElementById('lbv');
  const ytWrap=document.getElementById('lb-yt-wrap');
  const ytFr=document.getElementById('lbyt');
  if(ytId){
    vid.style.display='none';
    ytWrap.style.display='block';
    ytFr.src='https://www.youtube.com/embed/'+ytId+'?autoplay=1&rel=0&modestbranding=1';
  } else {
    vid.style.display='';
    ytWrap.style.display='none';
    vid.src=src;
    vid.load();
    vid.play().catch(()=>{});
  }
  document.getElementById('lb').classList.add('show');
  document.body.style.overflow='hidden';
  gsap.fromTo('.lb-in',{y:16,opacity:0},{y:0,opacity:1,duration:0.3,ease:'power2.out'});
}
function closeLb(){
  if(!ST.lb)return;
  const vid=document.getElementById('lbv');
  const ytFr=document.getElementById('lbyt');
  const ytWrap=document.getElementById('lb-yt-wrap');
  gsap.to('.lb-in',{y:12,opacity:0,duration:0.25,ease:'power2.in',onComplete(){
    document.getElementById('lb').classList.remove('show');
    vid.pause();vid.removeAttribute('src');vid.load();
    ytFr.src='';
    ytWrap.style.display='none';
    vid.style.display='';
    document.body.style.overflow='';ST.lb=false;
  }});
}
function initLb(){
  document.getElementById('lbcls').addEventListener('click',closeLb);
  document.getElementById('lb').addEventListener('click',e=>{if(e.target.id==='lb')closeLb();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLb();closePop();}});
}

/* SERVICES */
function initServices(){
  gsap.fromTo('.svc-row',{opacity:0,x:-20},{
    opacity:1,x:0,duration:0.5,stagger:0.1,ease:'power2.out',
    scrollTrigger:{trigger:'#services',start:'top 74%'},
  });
}

/* PROCESS */
function initProcess(){
  gsap.fromTo('.pc',{opacity:0,y:28},{
    opacity:1,y:0,duration:0.5,stagger:0.1,ease:'power2.out',
    scrollTrigger:{trigger:'#process',start:'top 74%'},
  });
}

/* SEC LABELS */
function initLabels(){
  document.querySelectorAll('.sec-label').forEach(el=>{
    gsap.fromTo(el,{opacity:0,x:-16},{
      opacity:1,x:0,duration:0.5,ease:'power2.out',
      scrollTrigger:{trigger:el,start:'top 85%'},
    });
  });
}

/* CONTACT */
function initContact(){
  gsap.fromTo('.ct-left>*',{opacity:0,x:-20},{
    opacity:1,x:0,duration:0.5,stagger:0.08,ease:'power2.out',
    scrollTrigger:{trigger:'#contact',start:'top 74%'},
  });
  gsap.fromTo('.ct-right',{opacity:0,x:20},{
    opacity:1,x:0,duration:0.5,ease:'power2.out',
    scrollTrigger:{trigger:'#contact',start:'top 74%'},
  });
  const sel=document.getElementById('fs');
  if(sel)sel.addEventListener('change',()=>sel.classList.toggle('filled',sel.value!==''));
  const form=document.getElementById('cform'),ok=document.getElementById('fok');
  if(form&&ok){
    form.addEventListener('submit',async (e)=>{
      e.preventDefault();
      const btn=form.querySelector('button[type="submit"]');
      const origText=btn.textContent;
      btn.textContent='SE TRIMITE...';
      btn.disabled=true;
      
      const payload={
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
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
          body: JSON.stringify(payload)
        });
      } catch(err) { console.error(err); }

      gsap.to(form,{opacity:0,y:-10,duration:0.25,ease:'power2.in',onComplete(){
        form.classList.add('hidden');ok.classList.add('show');
        gsap.fromTo(ok,{opacity:0,y:10},{opacity:1,y:0,duration:0.3,ease:'power2.out'});
      }});
    });
  }
}

/* POPUP */
function openPop(){
  if(ST.pop)return;
  ST.pop=true;
  document.getElementById('pop').classList.add('show');
  document.body.style.overflow='hidden';
}
function closePop(){
  const p=document.getElementById('pop');if(!p.classList.contains('show'))return;
  gsap.to('#pbox',{y:16,opacity:0,duration:0.25,ease:'power2.in',onComplete(){
    p.classList.remove('show');document.body.style.overflow='';
    // Reset popup for next time if needed, or just leave as is
  }});
}
function initPopup(){
  document.addEventListener('mouseleave',e=>{if(e.clientY<=0)openPop();});
  let t;const ri=()=>{clearTimeout(t);t=setTimeout(openPop,30000);};ri();
  ['mousemove','keydown','scroll','click'].forEach(ev=>document.addEventListener(ev,ri,{passive:true}));
  document.getElementById('pcls').addEventListener('click',closePop);
  document.getElementById('pop').addEventListener('click',e=>{if(e.target.id==='pop')closePop();});
  const pf=document.getElementById('pform'), pok=document.getElementById('pok');
  if(pf&&pok)pf.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const btn=pf.querySelector('button[type="submit"]');
    btn.textContent='SE TRIMITE...';
    btn.disabled=true;
    
    const payload={
      access_key: '52031838-da8a-4613-92ae-96fef3becb22',
      subject: 'Ofertă Specială - Popup DSGNL STUDIO',
      nume: document.getElementById('pn').value,
      telefon: document.getElementById('pp').value
    };

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(payload)
      });
    } catch(err) { console.error(err); }

    gsap.to(pf,{opacity:0,y:-10,duration:0.25,ease:'power2.in',onComplete(){
      pf.classList.add('hidden');pok.classList.add('show');
      gsap.fromTo(pok,{opacity:0,y:10},{opacity:1,y:0,duration:0.3,ease:'power2.out'});
      setTimeout(closePop, 3000);
    }});
  });
}

/* FLOAT PHONE */
function initPhone(){
  const el=document.getElementById('fp');if(!el)return;
  gsap.set(el,{opacity:0,y:12});
  ScrollTrigger.create({
    trigger:'body',start:'200px top',
    onEnter:()=>gsap.to(el,{opacity:1,y:0,duration:0.4,ease:'back.out(1.5)'}),
    onLeaveBack:()=>gsap.to(el,{opacity:0,y:12,duration:0.25}),
  });
}

/* SMOOTH SCROLL */
function initScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const h=a.getAttribute('href');if(!h||h==='#')return;
      const t=document.querySelector(h);
      if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-64,behavior:'smooth'});}
    });
  });
}

/* SET INITIAL GSAP STATES */
function setInit(){
  gsap.set('#hi',{y:12});
  gsap.set('.hlw',{y:'105%'});
  gsap.set('#haud',{y:12,opacity:0});
  gsap.set('#htk',{y:12});
  gsap.set('#hcta',{y:12});
  gsap.set('#hst',{y:12});
  gsap.set('#hright',{x:48});
}

/* BOOT */
document.addEventListener('DOMContentLoaded',()=>{
  setInit();
  initNav();
  initHero();
  initHeroSlider();
  initGalleryFilter();
  initGallery();
  initLb();
  initServices();
  initProcess();
  initLabels();
  initContact();
  initPopup();
  initPhone();
  initScroll();
});

