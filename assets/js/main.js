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
    cx += (mx - cx) * 0.22;
    cy += (my - cy) * 0.22;
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

// ── MOBILE NAV ──────────────────
(function () {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  // Inject hamburger button into nav
  const burger = document.createElement('button');
  burger.id = 'nav-burger';
  burger.setAttribute('aria-label', 'Open navigation');
  burger.setAttribute('aria-expanded', 'false');
  burger.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(burger);

  // Inject full-screen overlay into body
  const overlay = document.createElement('div');
  overlay.id = 'nav-overlay';
  overlay.innerHTML =
    '<nav class="overlay-nav">' +
      '<a href="about.html">About</a>' +
      '<a href="academic.html">Academic</a>' +
      '<a href="professional.html">Professional</a>' +
      '<a href="bim-revit.html">BIM / Revit</a>' +
      '<a href="contact.html">Contact</a>' +
    '</nav>';
  document.body.appendChild(overlay);

  // Mark active link in overlay
  const path = window.location.pathname.split('/').pop() || 'index.html';
  overlay.querySelectorAll('a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  function openMenu() {
    overlay.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close navigation');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open navigation');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    overlay.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close when tapping a link
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Close when tapping outside the nav panel (on the backdrop)
  overlay.addEventListener('click', e => { if (e.target === overlay) closeMenu(); });
})();

// ── SCROLL REVEAL ───────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.08});
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
