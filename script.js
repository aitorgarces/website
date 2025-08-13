// Utilidades
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Barra de progreso
const bar = $('#progressBar');
if (bar) {
  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    bar.style.width = `${Math.max(0, Math.min(1, scrolled))*100}%`;
  };
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
}

// Menú accesible
const nav = $('header nav');
const list = $('.nav-links', nav);
let burgerBtn = $('.burger button', nav);

if (!burgerBtn) {
  const wrap = document.createElement('div');
  wrap.className = 'burger';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Abrir menú');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'site-menu');
  btn.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
  wrap.appendChild(btn);
  nav.appendChild(wrap);
  burgerBtn = btn;
}
if (list && !list.id) list.id = 'site-menu';

function closeMenu(){ nav?.setAttribute('data-open','false'); burgerBtn?.setAttribute('aria-expanded','false'); }
function openMenu(){ nav?.setAttribute('data-open','true'); burgerBtn?.setAttribute('aria-expanded','true'); }

burgerBtn?.addEventListener('click', () => {
  const open = nav.getAttribute('data-open') === 'true';
  open ? closeMenu() : openMenu();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
document.addEventListener('click', e => { if (!nav.contains(e.target)) closeMenu(); });

// Lazy-load imágenes
$$('img:not([loading])').forEach(img => { img.loading = 'lazy'; img.decoding = 'async'; });

// Aparición suave
if (!prefersReduce && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting) {
        e.target.style.transition = 'transform .4s ease, opacity .4s ease';
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  },{threshold:.08});

  $$('.taller-card,.proyecto-card,.publication-card,.publicacion-card,.course-card,.feature-item').forEach(el=>{
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    io.observe(el);
  });
}

// Google Translate init (si está el contenedor)
window.googleTranslateElementInit = function(){
  if ($('#google_translate_element')) {
    new google.translate.TranslateElement(
      {pageLanguage:'es', includedLanguages:'en,fr,de', layout:google.translate.TranslateElement.InlineLayout.SIMPLE},
      'google_translate_element'
    );
  }
};


