/* ============================================================
   CIRCUIT BOARD CANVAS — Hero background animation
   ============================================================ */
(function () {
  const canvas = document.getElementById('circuit-canvas');
  const ctx = canvas.getContext('2d');
  let nodes = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buildNodes();
    draw();
  }

  function buildNodes() {
    nodes = [];
    const cols = Math.ceil(canvas.width / 80);
    const rows = Math.ceil(canvas.height / 80);
    for (let c = 0; c <= cols; c++) {
      for (let r = 0; r <= rows; r++) {
        if (Math.random() > 0.45) {
          nodes.push({ x: c * 80, y: r * 80, col: c, row: r });
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#00D4FF';
    ctx.lineWidth = 0.8;
    ctx.fillStyle = '#00D4FF';

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = Math.abs(a.col - b.col);
        const dy = Math.abs(a.row - b.row);
        if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  window.addEventListener('resize', resize);
  resize();
})();

/* ============================================================
   SCROLL REVEAL — Fade-in sections as they enter the viewport
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animate skill bars inside revealed cards
      entry.target.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ============================================================
   NAVBAR — Shrink padding on scroll
   ============================================================ */
const navEl = document.querySelector('nav');

window.addEventListener('scroll', () => {
  navEl.style.padding = window.scrollY > 60 ? '12px 48px' : '18px 48px';
});