// ═══════════════════════════════
// MARBERD.COM — Shared JS
// ═══════════════════════════════

// ── CURSOR ──────────────────────
const cur    = document.getElementById('cur');
const curDot = document.getElementById('cur-dot');
const canvas = document.getElementById('cur-canvas');

if (cur && curDot && canvas) {
  const ctx = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  let mx = W/2, my = H/2, cx = W/2, cy = H/2;
  let hovering = false;
  const particles = [];

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  // Spawn a particle at current exact mouse position
  let lastSpawn = 0;
  function spawnParticle(x, y) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.4 + Math.random() * 1.0;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.5,
      r: 2 + Math.random() * 2.5,
      life: 1.0,
      decay: 0.028 + Math.random() * 0.02,
      gold: Math.random() > 0.45
    });
  }

  (function loop(ts) {
    // Move lagged cursor arrow
    cx += (mx - cx) * 0.13;
    cy += (my - cy) * 0.13;
    cur.style.left = cx + 'px';
    cur.style.top  = cy + 'px';
    // Exact dot
    curDot.style.left = mx + 'px';
    curDot.style.top  = my + 'px';

    // Spawn particles while moving
    if (ts - lastSpawn > 28) {
      spawnParticle(mx, my);
      lastSpawn = ts;
    }

    // Draw particles
    ctx.clearRect(0, 0, W, H);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x  += p.vx; p.y += p.vy;
      p.vy += 0.04;
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      ctx.globalAlpha = p.life * 0.7;
      ctx.fillStyle   = p.gold ? '#B8946A' : '#111118';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    requestAnimationFrame(loop);
  })(0);

  document.querySelectorAll('a, button, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cur.classList.remove('hovering'));
  });

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
