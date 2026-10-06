<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const log = [
  {
    file: "2019-2025_funtravel.log",
    year: "2019 →",
    who: "FunTravelGeorgia - Web Developer & IT Operations Lead",
    what: "Production React/Next.js under real load. 50+ person infra, Windows + Linux, PHP backends, DB tuning, PPC and ops. Uptime was my job, not someone else's.",
  },
  {
    file: "2025-2026legacy_repair.log",
    year: "2025 →",
    who: "Computer Repair Technician",
    what: "Hardware diagnosis, OS installs, systems from first principles. Learned how things break - and how to fix them fast at 2 AM.",
  },
  {
    file: "2026-now_clearsource.log",
    year: "2026 →",
    who: "ClearSource Translations - Interpreter",
    what: "Georgian ↔ English ↔ Russian. Communication systems across language barriers. Same skill as debugging: listen precisely, translate exactly.",
  },
];

const section = ref<HTMLElement | null>(null);
const track = ref<HTMLElement | null>(null);

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const getScroll = () => (track.value?.scrollWidth ?? 0) - window.innerWidth;
  gsap.to(track.value, {
    x: () => -getScroll(),
    ease: "none",
    scrollTrigger: {
      trigger: section.value,
      start: "top top",
      end: () => `+=${getScroll()}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
  onUnmounted(() => ScrollTrigger.getAll().forEach((t) => t.kill()));
});
</script>

<template>
  <section id="log" ref="section" class="relative overflow-hidden">
    <div
      ref="track"
      class="flex h-screen w-max items-center gap-8 px-6 sm:gap-16 sm:px-16"
    >
      <div class="w-[80vw] shrink-0 sm:w-[32vw] mr-10">
        <p class="font-mono text-xs text-emerald-400">$ tail -f ops.log</p>
        <h2 class="display-mega mt-4 font-black uppercase text-white">
          scar<br />tissue<span class="text-emerald-400">.</span>
        </h2>
        <p class="mt-4 font-mono text-xs text-zinc-600">
          scroll → to travel 2019 → now
        </p>
      </div>
      <article
        v-for="e in log"
        :key="e.file"
        class="group w-[84vw] h-[60vh] shrink-0 rounded border border-white/10 bg-zinc-950 p-8 transition-colors hover:border-emerald-400/40 sm:w-[36vw] sm:p-10"
        data-cursor="read"
      >
        <p
          class="display-mega font-black text-white/10 transition-colors group-hover:text-emerald-400/20"
        >
          {{ e.year }}
        </p>
        <p class="mt-4 font-mono text-xs text-emerald-400">{{ e.file }}</p>
        <h3 class="mt-2 text-xl font-bold text-white sm:text-2xl">
          {{ e.who }}
        </h3>
        <p class="mt-3 max-w-xl leading-relaxed text-zinc-400">{{ e.what }}</p>
      </article>
      <div class="flex w-[30vw] shrink-0 items-center justify-center">
        <a
          href="#stack"
          class="font-mono text-sm text-zinc-500 transition-colors hover:text-emerald-400"
          >keep scrolling ↓</a
        >
      </div>
    </div>
  </section>
</template>
