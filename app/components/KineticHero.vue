<script setup lang="ts">
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ArrowDown } from "lucide-vue-next";

gsap.registerPlugin(Draggable, InertiaPlugin);

const section = ref<HTMLElement | null>(null);
const moveWord = ref<HTMLElement | null>(null);
const ticker = [
  "react",
  "next.js",
  "php",
  "linux",
  "docker",
  "git",
  "javascript",
  "ship it",
];
const openTerminal = () =>
  window.dispatchEvent(new CustomEvent("open-terminal"));

onMounted(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  // boot-in: letters stagger up
  gsap.fromTo(
    ".boot-letter",
    { yPercent: 110, rotate: 4 },
    {
      yPercent: 0,
      rotate: 0,
      duration: 0.9,
      ease: "expo.out",
      stagger: 0.035,
      delay: 1.5,
    },
  );
  gsap.fromTo(
    ".boot-fade",
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
      delay: 2.1,
    },
  );

  // mouse parallax across depth layers
  const layers = gsap.utils.toArray<HTMLElement>(".parallax-layer");
  const setters = layers.map((el) => ({
    depth: parseFloat(el.dataset.depth ?? "0"),
    x: gsap.quickSetter(el, "x", "px"),
    y: gsap.quickSetter(el, "y", "px"),
  }));
  const onMove = (e: MouseEvent) => {
    const cx = e.clientX / window.innerWidth - 0.5;
    const cy = e.clientY / window.innerHeight - 0.5;
    setters.forEach((s) => {
      s.x(cx * s.depth * 60);
      s.y(cy * s.depth * 40);
    });
  };
  window.addEventListener("mousemove", onMove);

  // throwable MOVE_ word with bounce-back
  const w = moveWord.value;
  if (w) {
    const home = { x: 0, y: 0 };
    Draggable.create(w, {
      type: "x,y",
      inertia: true,
      cursor: "grab",
      activeCursor: "grabbing",
      bounds: section.value ?? undefined,
      onRelease(this: Draggable) {
        gsap.to(this.target, {
          ...home,
          duration: 1.1,
          ease: "elastic.out(1,0.35)",
          delay: 0.1,
        });
      },
    });
  }

  onUnmounted(() => window.removeEventListener("mousemove", onMove));
});

const split = (word: string) => word.split("");
</script>

<template>
  <section
    ref="section"
    class="fx-grain hero-crosshair relative overflow-hidden"
  >
    <ParticleGrid />

    <div class="relative mx-auto max-w-6xl px-4 pb-14 pt-16 sm:pt-24">
      <p
        class="boot-fade flicker font-mono text-xs text-emerald-400 sm:text-sm"
      >
        misha mumladze · tbilisi, georgia · est. latency 12ms
      </p>

      <h1
        class="display-mega mt-6 font-black uppercase text-white"
        aria-label="systems that move"
      >
        <span
          class="parallax-layer block overflow-hidden"
          data-depth="0.4"
          aria-hidden="true"
        >
          <span
            v-for="(ch, i) in split('SYSTEMS')"
            :key="i"
            class="boot-letter inline-block"
            >{{ ch }}</span
          >
        </span>
        <span
          class="text-outline parallax-layer block overflow-hidden"
          data-depth="0.8"
          aria-hidden="true"
        >
          <span
            v-for="(ch, i) in split('THAT')"
            :key="i"
            class="boot-letter inline-block"
            >{{ ch }}</span
          >
        </span>
        <span
          class="parallax-layer block"
          data-depth="1.2"
          aria-hidden="true"
        >
          <span
            ref="moveWord"
            class="boot-letter inline-block touch-none select-none text-emerald-400 overflow-hidden"
            data-cursor="drag"
            title="grab me. throw me."
            >MOVE_</span
          >
        </span>
      </h1>

      <p
        class="boot-fade mt-8 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
      >
        I don't build websites. React, Next.js, PHP, Linux infrastructure -
        stacked, optimized, shipped. 6+ years of production code. No frameworks
        for the sake of frameworks.
      </p>

      <div
        class="boot-fade mt-8 flex flex-wrap items-center gap-4 font-mono text-sm"
      >
        <MagneticButton>
          <a
            href="mailto:misha.mumladze2007@gmail.com"
            class="inline-block rounded bg-emerald-400 px-6 py-3 font-semibold text-zinc-950 transition-colors hover:bg-emerald-300"
            data-cursor="open"
          >
            hire me
          </a>
        </MagneticButton>
        <MagneticButton>
          <a
            href="#log"
            class="flex items-center gap-2 rounded border border-white/20 px-6 py-3 text-zinc-300 transition-colors hover:border-emerald-400/60 hover:text-emerald-300"
          >
            <ArrowDown class="h-4 w-4" aria-hidden="true" /> ops log
          </a>
        </MagneticButton>
        <button
          class="hidden items-center gap-2 text-xs text-zinc-600 transition-colors hover:text-emerald-400 sm:flex"
          @click="openTerminal"
        >
          press
          <kbd
            class="rounded border border-white/20 bg-white/5 px-1.5 py-0.5 text-zinc-300"
            >`</kbd
          >
          for terminal
        </button>
      </div>
    </div>

    <div
      class="marquee border-y border-emerald-400/25 bg-black/60 py-3 font-mono text-sm uppercase tracking-widest text-emerald-400/90"
    >
      <div class="marquee-track">
        <span v-for="n in 2" :key="n" class="flex shrink-0" aria-hidden="true">
          <span
            v-for="t in ticker"
            :key="`${n}-${t}`"
            class="flex shrink-0 items-center"
          >
            <span class="px-6">{{ t }}</span>
            <span class="text-zinc-700">///</span>
          </span>
        </span>
      </div>
    </div>
  </section>
</template>
