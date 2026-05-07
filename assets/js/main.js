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
  let cursorFrame = 0;

  function setCursorPosition(el, x, y) {
    el.style.setProperty('--cursor-x', x.toFixed(1) + 'px');
    el.style.setProperty('--cursor-y', y.toFixed(1) + 'px');
  }

  function tick() {
    cursorFrame = 0;

    cx += (mx - cx) * 0.22;
    cy += (my - cy) * 0.22;
    setCursorPosition(cur, cx, cy);
    setCursorPosition(curDot, mx, my);

    if (Math.abs(mx - cx) > 0.2 || Math.abs(my - cy) > 0.2) {
      cursorFrame = requestAnimationFrame(tick);
    }
  }

  function requestCursorTick() {
    if (!cursorFrame) cursorFrame = requestAnimationFrame(tick);
  }

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    requestCursorTick();
  });

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
  let lastScrollY = window.scrollY || 0;
  let navScrollFrame = 0;

  function updateNavScroll() {
    navScrollFrame = 0;
    const currentY = Math.max(0, window.scrollY || 0);
    const delta = currentY - lastScrollY;
    const menuOpen = document.getElementById('nav-overlay')?.classList.contains('open');

    nav.classList.toggle('scrolled', currentY > 40);

    if (menuOpen || currentY < 80 || delta < -4) {
      nav.classList.remove('nav-hidden');
    } else if (delta > 6 && currentY > 120) {
      nav.classList.add('nav-hidden');
    }

    lastScrollY = currentY;
  }

  function requestNavScroll() {
    if (navScrollFrame) return;
    navScrollFrame = window.requestAnimationFrame(updateNavScroll);
  }

  updateNavScroll();
  window.addEventListener('scroll', requestNavScroll, { passive: true });
}

// ── ACTIVE NAV LINK ─────────────
(function(){
  const path = window.location.pathname.replace(/\/+$/, '/') || '/';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/+$/, '/') || '/';
    if (href === path) a.classList.add('active');
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
  burger.appendChild(document.createElement('span'));
  burger.appendChild(document.createElement('span'));
  burger.appendChild(document.createElement('span'));
  nav.appendChild(burger);

  // Inject full-screen overlay into body
  const overlay = document.createElement('div');
  overlay.id = 'nav-overlay';
  const overlayNav = document.createElement('nav');
  overlayNav.className = 'overlay-nav';
  [
    ['/about/', 'About'],
    ['/academic/', 'Academic'],
    ['/professional/', 'Professional'],
    ['/bim-ai/', 'BIM / AI'],
    ['/contact/', 'Contact'],
  ].forEach(([href, label]) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    overlayNav.appendChild(link);
  });
  overlay.appendChild(overlayNav);
  document.body.appendChild(overlay);

  // Mark active link in overlay
  const path = window.location.pathname.replace(/\/+$/, '/') || '/';
  overlay.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/+$/, '/') || '/';
    if (href === path) a.classList.add('active');
  });

  function openMenu() {
    nav.classList.remove('nav-hidden');
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
