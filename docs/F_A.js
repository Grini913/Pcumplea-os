

// --- FUEGOS ARTIFICIALES ---
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    function createFirework(x, y) {
      const colors = ['#ff4fd8', '#00eaff', '#FFD700', '#ffb300', '#00ff99'];
      const particleCount = 30;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x,
          y,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 3 + 2,
          radius: Math.random() * 3 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 1
        });
      }
    }

    function updateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.opacity -= 0.02;
        if (p.opacity <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.opacity})`;
          ctx.fill();
        }
      }
    }

    function hexToRgb(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r},${g},${b}`;
    }

    function loop() {
      updateParticles();
      requestAnimationFrame(loop);
    }

    setInterval(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height / 2;
      createFirework(x, y);
    }, 800);

    loop();