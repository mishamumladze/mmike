<script setup lang="ts">
import { gsap } from "gsap";

const overlay = ref<HTMLElement | null>(null);
const done = ref(false);

const bootLines = [
  "MMIKE.OS v6.0 — cold boot",
  "checking cpu ................ OK",
  "checking memory ............. OK",
  "checking tbilisi uplink ..... OK",
  "mounting /dev/give-a-shit ... OK",
  "all systems operational.",
];

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    done.value = true;
    return;
  }
  const tl = gsap.timeline({
    onComplete: () => {
      done.value = true;
    },
  });
  tl.fromTo(
    ".boot-line",
    { opacity: 0, x: -12 },
    { opacity: 1, x: 0, duration: 0.25, stagger: 0.16 },
  )
    .to(overlay.value, {
      yPercent: -100,
      duration: 0.7,
      ease: "expo.inOut",
      delay: 0.35,
    })
    .set(overlay.value, { display: "none" });
});

const skip = () => {
  if (done.value) return;
  gsap.killTweensOf(".boot-line");
  gsap.set(overlay.value, { display: "none" });
  done.value = true;
};
</script>

<template>
  <div
    v-if="!done"
    ref="overlay"
    class="fixed inset-0 z-[400] flex cursor-pointer items-center justify-center bg-black"
    @click="skip"
  >
    <div class="w-full max-w-md px-6 font-mono text-sm leading-loose">
      <p
        v-for="(l, i) in bootLines"
        :key="l"
        class="boot-line"
        :class="
          i === bootLines.length - 1 ? 'text-emerald-400' : 'text-zinc-500'
        "
      >
        {{ l }}
      </p>
      <p class="boot-line mt-2 text-[11px] text-zinc-700">
        click anywhere to skip_
      </p>
    </div>
  </div>
</template>
