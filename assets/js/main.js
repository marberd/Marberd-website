// ═══════════════════════════════
// MARBERD.COM — Shared JS
// ═══════════════════════════════

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

  function spawnDiamonds() {
    const r = burger.getBoundingClientRect();
    const bx = r.left + r.width  / 2;
    const by = r.top  + r.height / 2;
    const gems = [
      { tx: '-100px', ty:  '140px', size: 14, delay: 0.00, rot:  '45deg', bg: 'rgba(184,148,106,0.65)' },
      { tx: '-190px', ty:   '70px', size:  9, delay: 0.06, rot:  '20deg', bg: 'rgba(240,225,200,0.55)' },
      { tx:  '-55px', ty:  '280px', size: 22, delay: 0.03, rot:  '35deg', bg: 'rgba(184,148,106,0.45)' },
      { tx: '-260px', ty:  '160px', size: 11, delay: 0.09, rot:  '60deg', bg: 'rgba(255,255,255,0.40)' },
      { tx: '-150px', ty:  '400px', size: 17, delay: 0.05, rot:  '25deg', bg: 'rgba(184,148,106,0.55)' },
      { tx: '-330px', ty:  '100px', size:  7, delay: 0.12, rot:  '50deg', bg: 'rgba(240,225,200,0.45)' },
      { tx: '-210px', ty:  '490px', size: 13, delay: 0.02, rot:  '15deg', bg: 'rgba(255,255,255,0.35)' },
      { tx:  '-40px', ty:  '530px', size:  8, delay: 0.08, rot:  '40deg', bg: 'rgba(184,148,106,0.50)' },
    ];
    gems.forEach(g => {
      const d = document.createElement('div');
      d.className = 'nav-diamond';
      d.style.cssText =
        `left:${bx - g.size/2}px;top:${by - g.size/2}px;` +
        `width:${g.size}px;height:${g.size}px;` +
        `background:${g.bg};` +
        `--tx:${g.tx};--ty:${g.ty};--rot:${g.rot};` +
        `animation-delay:${g.delay}s;`;
      document.body.appendChild(d);
      d.addEventListener('animationend', () => d.remove(), { once: true });
    });
  }

  function openMenu() {
    document.querySelectorAll('.nav-diamond').forEach(d => d.remove());
    nav.classList.remove('nav-hidden');
    overlay.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close navigation');
    document.body.style.overflow = 'hidden';
    spawnDiamonds();
  }

  function closeMenu() {
    document.querySelectorAll('.nav-diamond').forEach(d => d.remove());
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

// ── MUSIC PLAYER ────────────────
(function () {
  var LS_KEY   = 'mb_music';
  var VID      = '1IIyzob_yi8';
  var btn      = document.getElementById('music-nav-btn');
  var player   = null;
  var wantPlay = localStorage.getItem(LS_KEY) === '1';

  if (btn && wantPlay) btn.classList.add('mb-playing');

  // Off-screen at real size — YouTube blocks playback in 1×1 clipped iframes
  var wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;width:200px;height:113px;bottom:-300px;right:-300px;pointer-events:none;';
  var pdiv = document.createElement('div');
  pdiv.id = 'mb-yt-player';
  wrap.appendChild(pdiv);
  document.body.appendChild(wrap);

  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('mb-yt-player', {
      height: '113', width: '200',
      videoId: VID,
      // loop:1 requires playlist set to the same VID — YouTube API quirk
      playerVars: { autoplay:0, controls:0, loop:1, playlist:VID, playsinline:1, fs:0, disablekb:1 },
      events: {
        onReady: function (e) {
          if (wantPlay) e.target.playVideo();
        },
        onStateChange: function (e) {
          var playing = (e.data === YT.PlayerState.PLAYING);
          localStorage.setItem(LS_KEY, playing ? '1' : '0');
          if (btn) btn.classList.toggle('mb-playing', playing);
        },
        onError: function () {
          localStorage.setItem(LS_KEY, '0');
          if (btn) btn.classList.remove('mb-playing');
        }
      }
    });
  };

  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);

  if (btn) {
    btn.addEventListener('click', function () {
      if (!player || typeof player.getPlayerState !== 'function') return;
      if (player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    });
  }
}());
