// ═══════════════════════════════
// MARBERD.COM — Shared JS
// ═══════════════════════════════

// ── CURSOR ──────────────────────
const cur = document.getElementById('cur');
const curDot = document.getElementById('cur-dot');
if (cur && curDot) {
  let mx = window.innerWidth/2, my = window.innerHeight/2;
  let cx = mx, cy = my;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function loop() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cur.style.left    = cx + 'px';
    cur.style.top     = cy + 'px';
    curDot.style.left = mx + 'px';
    curDot.style.top  = my + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cur.classList.remove('hovering'));
  });

  // Hide when leaving window, show on re-entry
  document.addEventListener('mouseleave', () => {
    cur.style.opacity = '0'; curDot.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cur.style.opacity = '1'; curDot.style.opacity = '1';
  });
}

// ── NAV SCROLL ─────────────────
const nav = document.getElementById('main-nav');
if (nav) {
  window.addEventListener('scroll',()=>{
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ── ACTIVE NAV LINK ─────────────
(function(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path==='' && href==='index.html')) a.classList.add('active');
  });
})();

// ── SCROLL REVEAL ───────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.08});
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
