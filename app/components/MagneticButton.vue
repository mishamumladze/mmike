<script setup lang="ts">
import { gsap } from "gsap";

const wrap = ref<HTMLElement | null>(null);

const pull = (e: MouseEvent) => {
  const el = wrap.value;
  if (!el) return;
  const r = el.getBoundingClientRect();
  gsap.to(el, {
    x: (e.clientX - r.left - r.width / 2) * 0.3,
    y: (e.clientY - r.top - r.height / 2) * 0.4,
    rotation: ((e.clientX - r.left) / r.width - 0.5) * 6,
    duration: 0.3,
    ease: "power3.out",
  });
};
const reset = () => {
  gsap.to(wrap.value, {
    x: 0,
    y: 0,
    rotation: 0,
    duration: 0.7,
    ease: "elastic.out(1,0.4)",
  });
};
</script>

<template>
  <span
    ref="wrap"
    class="inline-block will-change-transform"
    @mousemove="pull"
    @mouseleave="reset"
  >
    <slot />
  </span>
</template>
