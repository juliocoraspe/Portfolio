const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.getElementById("particle-container").appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const PARTICLE_COUNT = 3900;
const CIRCLE_RADIUS = Math.min(canvas.width, canvas.height) * 0.6; // 50% del centro
const particles = [];
const mouse = { x: null, y: null };

class Particle {
  constructor() {
    const angle = Math.random() * 2 * Math.PI;
    const radius = CIRCLE_RADIUS * Math.sqrt(Math.random()); // distribución suave

    // Posición base dentro del círculo centrado
    this.originalX = canvas.width / 2 + radius * Math.cos(angle);
    this.originalY = canvas.height / 2 + radius * Math.sin(angle);

    // Posición actual
    this.x = this.originalX;
    this.y = this.originalY;

    // Movimiento suave aleatorio
    this.offsetX = Math.random() * 1000;
    this.offsetY = Math.random() * 1000;

    this.size = 0.9;
    this.vx = 0;
    this.vy = 0;
  }

  update(time) {
    // Repulsión por cursor
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 100;
    const force = Math.max((maxDist - dist) / maxDist, 2);
    const repulsion = force * 58;

    if (dist < maxDist) {
      const fx = dx / dist;
      const fy = dy / dist;
      this.vx -= fx * repulsion;
      this.vy -= fy * repulsion;
    }

    // Movimiento suave tipo galaxia
    const waveX = Math.sin(this.offsetX + time * 0.0005) * 1;
    const waveY = Math.cos(this.offsetY + time * 0.0005) * 2;

    // Vuelve a su posición base + vibración
    const dx0 = this.originalX + waveX - this.x;
    const dy0 = this.originalY + waveY - this.y;
    this.vx += dx0 * 0.0059;
    this.vy += dy0 * 0.0059;

    this.vx *= 0.6;
    this.vy *= 0.6;

    this.x += this.vx;
    this.y += this.vy;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }
}

function initParticles() {
  particles.length = 0;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
}

function animate(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    p.update(time);
    p.draw();
  }
  requestAnimationFrame(animate);
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animate(0);
