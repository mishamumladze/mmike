<script setup lang="ts">
import { gsap } from "gsap";

const card = ref<HTMLElement | null>(null);

const tilt = (e: MouseEvent) => {
  const el = card.value;
  if (!el) return;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  gsap.to(el, {
    rotationY: px * 12,
    rotationX: -py * 12,
    transformPerspective: 700,
    duration: 0.4,
    ease: "power2.out",
  });
};
const reset = () => {
  gsap.to(card.value, {
    rotationX: 0,
    rotationY: 0,
    duration: 0.8,
    ease: "elastic.out(1,0.5)",
  });
};
const burst = () => {
  gsap.fromTo(
    card.value,
    { x: -3 },
    { x: 0, duration: 0.4, ease: "elastic.out(1,0.2)" },
  );
};
</script>

<template>
  <div
    ref="card"
    class="h-full will-change-transform"
    data-cursor="tilt"
    @mousemove="tilt"
    @mouseleave="reset"
    @click="burst"
  >
    <slot />
  </div>
</template>
