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

// ── MUSIC PLAYER ────────────────
(function () {
  var LS_KEY  = 'mb_music';
  var VID     = '1IIyzob_yi8';
  var LIST    = 'RD1IIyzob_yi8';
  var btn     = document.getElementById('music-nav-btn');
  var player  = null;
  var wantPlay = localStorage.getItem(LS_KEY) === '1';

  // Set initial button visual state immediately (before API loads)
  if (btn && wantPlay) btn.classList.add('mb-playing');

  // Inject hidden 1×1 player container
  var wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;width:1px;height:1px;bottom:0;right:0;overflow:hidden;pointer-events:none;opacity:0;';
  var pdiv = document.createElement('div');
  pdiv.id = 'mb-yt-player';
  wrap.appendChild(pdiv);
  document.body.appendChild(wrap);

  // YouTube IFrame API callback
  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('mb-yt-player', {
      height: '1', width: '1',
      videoId: VID,
      playerVars: { listType:'playlist', list:LIST, autoplay:0, controls:0, loop:1, playsinline:1 },
      events: {
        onReady: function (e) {
          if (wantPlay) e.target.playVideo();
        },
        onStateChange: function (e) {
          var playing = (e.data === YT.PlayerState.PLAYING);
          localStorage.setItem(LS_KEY, playing ? '1' : '0');
          if (btn) btn.classList.toggle('mb-playing', playing);
        }
      }
    });
  };

  // Inject YouTube IFrame API script
  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);

  // Button click
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
