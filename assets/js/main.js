// ═══════════════════════════════
// MARBERD.COM — Shared JS
// ═══════════════════════════════

// ── CURSOR ──────────────────────
(function () {
  const cur    = document.getElementById('cur');
  const curDot = document.getElementById('cur-dot');
  if (!cur || !curDot) return;

  // Start offscreen so it doesn't flash at 0,0
  let mx = -200, my = -200, cx = -200, cy = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  (function tick() {
    // Lagged ring follows mouse at 13% per frame
    cx += (mx - cx) * 0.13;
    cy += (my - cy) * 0.13;
    cur.style.left    = cx + 'px';
    cur.style.top     = cy + 'px';
    // Dot snaps exactly
    curDot.style.left = mx + 'px';
    curDot.style.top  = my + 'px';
    requestAnimationFrame(tick);
  })();

  // Hover state — scale + rotate via CSS class
  document.querySelectorAll('a, button, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cur.classList.remove('hovering'));
  });

  // Press state
  document.addEventListener('mousedown', () => curDot.classList.add('pressing'));
  document.addEventListener('mouseup',   () => curDot.classList.remove('pressing'));

  // Hide/show when leaving window
  document.addEventListener('mouseleave', () => {
    cur.style.opacity = '0';
    curDot.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cur.style.opacity = '1';
    curDot.style.opacity = '1';
  });
})();

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
