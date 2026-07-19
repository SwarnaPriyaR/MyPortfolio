// ── Hero entrance animations ──
(function () {
  const topEls        = document.querySelectorAll('.anim-top');
  const rightEls      = document.querySelectorAll('.anim-right');
  const bottomEls     = document.querySelectorAll('.anim-bottom');
  const leftEls       = document.querySelectorAll('.anim-left');
  const zoomDownEls   = document.querySelectorAll('.anim-zoom-down');
  const zoomUpEls     = document.querySelectorAll('.anim-zoom-up');
  const photo         = document.querySelector('.hero-photo');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      topEls.forEach(el    => el.classList.add('in'));
      rightEls.forEach(el  => el.classList.add('in'));
      bottomEls.forEach(el => el.classList.add('in'));
      leftEls.forEach(el   => el.classList.add('in'));
      zoomDownEls.forEach(el => el.classList.add('in'));
      zoomUpEls.forEach(el => el.classList.add('in'));
      if (photo) photo.classList.add('in');
    });
  });
})();

// ── Scroll-triggered fade-in for section cards ──
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), Number(delay));
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.dataset.delay = (i % 3) * 80;
    observer.observe(el);
  });
})();

// ── Falling stars & moon starfield ──
(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = document.body.scrollHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initParticles(); });

  // Particle pool
const STAR_COUNT = 120;
const MOON_COUNT = 10;
  let particles = [];

  function randBetween(a, b) { return a + Math.random() * (b - a); }

  function createStar() {
    return {
      type: 'star',
      x: randBetween(0, canvas.width),
      y: randBetween(-canvas.height * 0.1, canvas.height),
      size: randBetween(2.5, 5),
      opacity: randBetween(0.65, 1),
      speed: randBetween(0.18, 0.55),
      drift: randBetween(-0.12, 0.12),
      twinkleSpeed: randBetween(0.008, 0.025),
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
      baseOpacity: randBetween(0.25, 0.65),
    };
  }

  function createMoon() {
    return {
      type: 'moon',
      x: randBetween(0, canvas.width),
      y: randBetween(-200, canvas.height * 0.3),
      size: randBetween(7, 13),
      opacity: randBetween(0.4, 0.7),
      speed: randBetween(0.07, 0.2),
      drift: randBetween(-0.06, 0.06),
      rotation: randBetween(0, Math.PI * 2),
      rotSpeed: randBetween(-0.003, 0.003),
    };
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < STAR_COUNT; i++) particles.push(createStar());
    for (let i = 0; i < MOON_COUNT; i++) particles.push(createMoon());
  }

  initParticles();

function drawStar(p) {
  ctx.save();

  ctx.translate(p.x, p.y);

  ctx.globalAlpha = p.opacity;

  // glow
  ctx.shadowBlur = 12;
  ctx.shadowColor = '#EA7B7B';

  ctx.strokeStyle = '#EA7B7B';
  ctx.lineWidth = 1.2;

  ctx.beginPath();

  // sparkle star
  ctx.moveTo(0, -p.size);
  ctx.lineTo(0, p.size);

  ctx.moveTo(-p.size, 0);
  ctx.lineTo(p.size, 0);

  ctx.stroke();

  ctx.restore();
}

function drawMoon(p) {
  ctx.save();

  ctx.globalAlpha = p.opacity;

  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);

  ctx.strokeStyle = '#EA7B7B';
  ctx.lineWidth = 1.4;

  ctx.shadowBlur = 14;
  ctx.shadowColor = '#EA7B7B';

  const r = p.size;

  ctx.beginPath();
  ctx.arc(0, 0, r, Math.PI * 0.25, Math.PI * 1.75);

  ctx.stroke();

  ctx.restore();
}

  function update() {
    // Resize height to match document in case content changed
    if (canvas.height !== document.body.scrollHeight) {
      canvas.height = document.body.scrollHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      // move
      p.y += p.speed;
      p.x += p.drift;

      if (p.type === 'star') {
        // twinkle
        p.opacity += p.twinkleSpeed * p.twinkleDir;
        if (p.opacity >= p.baseOpacity + 0.2 || p.opacity <= p.baseOpacity - 0.2) {
          p.twinkleDir *= -1;
        }
        drawStar(p);
      } else {
        p.rotation += p.rotSpeed;
        drawMoon(p);
      }

      // reset when off bottom
      if (p.y > canvas.height + 20) {
        if (p.type === 'star') {
          Object.assign(p, createStar());
          p.y = -10;
        } else {
          Object.assign(p, createMoon());
          p.y = -30;
        }
      }
      // wrap x
      if (p.x < -20) p.x = canvas.width + 10;
      if (p.x > canvas.width + 20) p.x = -10;
    });

    requestAnimationFrame(update);
  }

  update();
})();