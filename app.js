// Menú móvil
    (function(){
      var btn = document.querySelector('.nav-toggle');
      var menu = document.getElementById('menu');
      if(btn && menu){
        btn.addEventListener('click', function(){
          var open = menu.classList.toggle('open');
          btn.setAttribute('aria-expanded', open ? 'true' : 'false');
          btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        });
      }
    })();

    // Desplegable "Propuestas" (clic para teclado/touch)
    (function(){
      var disc = document.querySelector('.nav-disclosure');
      var sub = document.getElementById('submenu-propuestas');
      if(!disc || !sub) return;
      disc.addEventListener('click', function(e){
        e.preventDefault();
        var open = sub.classList.toggle('open');
        disc.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      document.addEventListener('click', function(e){
        if(!disc.parentNode.contains(e.target)){
          sub.classList.remove('open'); disc.setAttribute('aria-expanded','false');
        }
      });
      document.addEventListener('keydown', function(e){
        if(e.key === 'Escape'){
          sub.classList.remove('open'); disc.setAttribute('aria-expanded','false');
        }
      });
    })();

    // Reveal como mejora progresiva (respeta reduced-motion)
    (function(){
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var els = document.querySelectorAll('.reveal');
      if(reduce || !('IntersectionObserver' in window)){
        els.forEach(function(el){ el.classList.add('in'); });
        return;
      }
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, {threshold:.15});
      els.forEach(function(el){ io.observe(el); });
    })();


// Subrayado dorado dibujado con el scroll en los títulos de sección
(function(){
  var hs = document.querySelectorAll('main h2');
  hs.forEach(function(h){
    if(h.classList.contains('skip')) return;      // headings ocultos (a11y)
    if(h.closest('.about-title')) return;         // ya tiene su línea propia
    h.classList.add('su-line');
    if(getComputedStyle(h).textAlign === 'center') h.classList.add('su-center');
  });
})();


// Texto que se pinta con el scroll (frases clave, en todas las páginas)
(function(){
  // Fondo claro -> pintado oliva
  ['.md-hook', '.about .emphasis', '.metodo-head .intro', '.vhead .sub', '.qs-move-copy p', '.outcome p']
    .forEach(function(sel){ document.querySelectorAll(sel).forEach(function(e){ e.classList.add('paint-olive'); }); });
  // Fondo oscuro -> pintado claro
  ['.cuerpo-close', '.cp-close p', '.waitlist p:not(.note)']
    .forEach(function(sel){ document.querySelectorAll(sel).forEach(function(e){ e.classList.add('paint-l'); }); });
})();


// Dispara efectos de scroll al entrar en pantalla (fiable en todo navegador)
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lines  = document.querySelectorAll('.su-line');
  var paints = document.querySelectorAll('.paint, .paint-olive, .paint-l');
  var steps  = document.querySelectorAll('.proceso-steps');

  function fire(el){
    if(el.classList.contains('proceso-steps')) el.classList.add('tl-go');
    else el.classList.add('drawn','painted');
  }
  var all = [].concat([].slice.call(lines), [].slice.call(paints), [].slice.call(steps));
  if(reduce || !('IntersectionObserver' in window)){ all.forEach(fire); return; }

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ fire(e.target); io.unobserve(e.target); } });
  }, {threshold:.2, rootMargin:'0px 0px -6% 0px'});
  all.forEach(function(el){ io.observe(el); });
})();
