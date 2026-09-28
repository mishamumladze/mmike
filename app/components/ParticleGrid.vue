<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  const c = canvas.value;
  if (!c) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = c.getContext("2d");
  if (!ctx) return;

  let w = 0;
  let h = 0;
  let raf = 0;
  let running = true;
  let last = 0;
  const gap = 52;
  const radius = 130;
  const radius2 = radius * radius;
  let pts: {
    x: number;
    y: number;
    ox: number;
    oy: number;
    vx: number;
    vy: number;
  }[] = [];
  const mouse = { x: -9999, y: -9999 };

  const resize = () => {
    const r = c.getBoundingClientRect();
    w = c.width = r.width;
    h = c.height = r.height;
    pts = [];
    for (let y = gap / 2; y < h; y += gap)
      for (let x = gap / 2; x < w; x += gap)
        pts.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
  };

  const frame = (t: number) => {
    if (!running) return;
    if (t - last < 33) {
      raf = requestAnimationFrame(frame);
      return;
    }
    last = t;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255,255,255,0.16)";
    let lit = 0;
    const litIdx: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < radius2) {
        const d = Math.sqrt(d2) || 1;
        const f = ((radius - d) / radius) * 2.2;
        p.vx += (dx / d) * f;
        p.vy += (dy / d) * f;
      }
      // spring back home
      p.vx += (p.ox - p.x) * 0.02;
      p.vy += (p.oy - p.y) * 0.02;
      p.vx *= 0.9;
      p.vy *= 0.9;
      p.x += p.vx;
      p.y += p.vy;
      const ddx = p.x - p.ox;
      const ddy = p.y - p.oy;
      if (ddx * ddx + ddy * ddy > 36) {
        litIdx.push(i);
        lit++;
      } else {
        ctx.fillRect(p.x, p.y, 1.5, 1.5);
      }
    }
    if (lit) {
      ctx.fillStyle = "rgba(52,211,153,0.85)";
      for (const i of litIdx) ctx.fillRect(pts[i].x, pts[i].y, 2.5, 2.5);
    }
    raf = requestAnimationFrame(frame);
  };

  const onMove = (e: MouseEvent) => {
    const r = c.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  };
  const onLeave = () => {
    mouse.x = -9999;
    mouse.y = -9999;
  };

  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !running) {
      running = true;
      frame();
    } else if (!e.isIntersecting && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
  });
  io.observe(c);

  resize();
  frame();
  window.addEventListener("resize", resize);
  c.parentElement?.addEventListener("mousemove", onMove);
  c.parentElement?.addEventListener("mouseleave", onLeave);
  onUnmounted(() => {
    running = false;
    cancelAnimationFrame(raf);
    io.disconnect();
    window.removeEventListener("resize", resize);
  });
});
</script>

<template>
  <canvas
    ref="canvas"
    class="pointer-events-none absolute inset-0 h-full w-full"
    aria-hidden="true"
  />
</template>
