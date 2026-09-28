<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const props = withDefaults(defineProps<{ delay?: number; wipe?: boolean }>(), {
  delay: 0,
  wipe: false,
});
const el = ref<HTMLElement | null>(null);

onMounted(() => {
  const node = el.value;
  if (!node) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.set(node, {
    opacity: 0,
    y: 44,
    clipPath: props.wipe ? "inset(0 0 100% 0)" : "none",
  });
  ScrollTrigger.batch(node, {
    start: "top 88%",
    once: true,
    onEnter: (els) =>
      gsap.to(els, {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: 0.9,
        delay: props.delay / 1000,
        ease: "expo.out",
        overwrite: true,
      }),
  });
  onUnmounted(() => ScrollTrigger.getAll().forEach((t) => t.kill()));
});
</script>

<template>
  <div ref="el" class="will-change-transform">
    <slot />
  </div>
</template>
