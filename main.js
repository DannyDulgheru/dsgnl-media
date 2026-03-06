'use strict';
gsap.registerPlugin(ScrollTrigger);

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
    if(y>120){
      if(y>ST.lastY&&!ST.hide){nav.classList.add('hide');ST.hide=true;}
      else if(y<ST.lastY&&ST.hide){nav.classList.remove('hide');ST.hide=false;}
    }
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

/* GALLERY */
function initGallery(){
  const items=document.querySelectorAll('.gi');
  gsap.fromTo(items,{opacity:0,y:24},{
    opacity:1,y:0,duration:0.5,stagger:0.06,ease:'power2.out',
    scrollTrigger:{trigger:'#gallery',start:'top 78%'},
  });

  // IntersectionObserver: play when visible, pause when off-screen
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

  items.forEach(item=>{
    const vid=item.querySelector('video');
    io.observe(item);

    // Hover: desaturation already handled via CSS .gi:hover .gi-media video
    // Click → lightbox: get first mp4 source
    item.addEventListener('click',()=>{
      // find mp4 source (skip webm)
      const sources=vid.querySelectorAll('source');
      let src='';
      sources.forEach(s=>{ if(s.getAttribute('src').endsWith('.mp4')) src=s.getAttribute('src'); });
      if(!src && sources.length) src=sources[sources.length-1].getAttribute('src');
      openLb(src,item.dataset.label,item.dataset.type);
    });
  });
}

/* LIGHTBOX */
function openLb(src,label,type){
  if(ST.lb)return;ST.lb=true;
  document.getElementById('lbt').textContent=label||'';
  document.getElementById('lbc').textContent=type||'';
  document.getElementById('lbs').setAttribute('src',src);
  const vid=document.getElementById('lbv');vid.load();
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow='hidden';
  gsap.fromTo('.lb-in',{y:16,opacity:0},{y:0,opacity:1,duration:0.3,ease:'power2.out'});
  vid.play().catch(()=>{});
}
function closeLb(){
  if(!ST.lb)return;
  const vid=document.getElementById('lbv');
  gsap.to('.lb-in',{y:12,opacity:0,duration:0.25,ease:'power2.in',onComplete(){
    document.getElementById('lb').classList.remove('open');
    vid.pause();vid.src='';document.body.style.overflow='';ST.lb=false;
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
    form.addEventListener('submit',e=>{
      e.preventDefault();
      gsap.to(form,{opacity:0,y:-10,duration:0.25,ease:'power2.in',onComplete(){
        form.classList.add('hidden');ok.classList.add('vis');
        gsap.fromTo(ok,{opacity:0,y:10},{opacity:1,y:0,duration:0.3,ease:'power2.out'});
      }});
    });
  }
}

/* POPUP */
function openPop(){
  if(ST.pop||sessionStorage.getItem('dp'))return;
  ST.pop=true;sessionStorage.setItem('dp','1');
  document.getElementById('pop').classList.add('open');
  document.body.style.overflow='hidden';
}
function closePop(){
  const p=document.getElementById('pop');if(!p.classList.contains('open'))return;
  gsap.to('#pbox',{y:16,opacity:0,duration:0.25,ease:'power2.in',onComplete(){
    p.classList.remove('open');document.body.style.overflow='';
  }});
}
function initPopup(){
  if(sessionStorage.getItem('dp'))return;
  document.addEventListener('mouseleave',e=>{if(e.clientY<=0)openPop();});
  let t;const ri=()=>{clearTimeout(t);t=setTimeout(openPop,22000);};ri();
  ['mousemove','keydown','scroll','click'].forEach(ev=>document.addEventListener(ev,ri,{passive:true}));
  document.getElementById('pcls').addEventListener('click',closePop);
  document.getElementById('pop').addEventListener('click',e=>{if(e.target.id==='pop')closePop();});
  const pf=document.getElementById('pform');
  if(pf)pf.addEventListener('submit',e=>{e.preventDefault();closePop();});
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

