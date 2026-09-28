<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

useHead({ title: "Misha Mumladze - systems that move" });

const stack = [
  [
    "frontend",
    "React, Next.js, JavaScript, HTML/CSS/SCSS. Vue & Nuxt when they fit.",
  ],
  [
    "backend & infra",
    "PHP, Linux admin, Windows domains, DB design, networks, Docker basics.",
  ],
  [
    "tooling",
    "Git, Linux CLI + scripting, VS Code, pnpm, profiling, monitoring.",
  ],
];

const principles = [
  "Every line of code is debt. Build what's necessary, optimize ruthlessly, ship it.",
  "Frontend devs who don't understand servers ship slow apps. I live across the stack.",
  "Perfect is the enemy of done. Ship, measure, iterate.",
  "Deployment, monitoring, scaling, failure modes - from day one, not day 300.",
];

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // marquee speeds up with scroll velocity
  const track = document.querySelector(".marquee-track") as HTMLElement | null;
  if (!track) return;
  ScrollTrigger.create({
    onUpdate: (self) => {
      const v = Math.min(Math.abs(self.getVelocity() / 3000), 3);
      track.style.setProperty(
        "--marquee-speed",
        `${Math.max(24 - v * 18, 3)}s`,
      );
    },
  });
});
</script>

<template>
  <div id="top" class="overflow-x-hidden">
    <KineticHero />
    <ProofTicker />
    <LogStream />

    <!-- arsenal -->
    <section id="stack" class="border-y border-emerald-400/20 bg-black/40">
      <div class="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:py-24">
        <p class="font-mono text-xs text-emerald-400">$ ls ~/arsenal</p>
        <h2
          class="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          What I reach for
        </h2>
        <div class="mt-8 grid gap-4 sm:grid-cols-3" style="perspective: 1200px">
          <Reveal v-for="[k, v] in stack" :key="k">
            <TiltCard>
              <div
                class="h-full rounded border border-white/10 bg-zinc-950 p-6 transition-colors hover:border-emerald-400/40"
              >
                <p class="font-mono text-xs text-emerald-400">{{ k }}</p>
                <p class="mt-3 text-sm leading-relaxed text-zinc-300">
                  {{ v }}
                </p>
              </div>
            </TiltCard>
          </Reveal>
        </div>
        <p class="mt-6 font-mono text-xs text-zinc-600">
          ponytail: full project case studies go here once there are public
          links to point at.
        </p>
      </div>
    </section>

    <!-- principles -->
    <section
      id="principles"
      class="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:py-24"
    >
      <p class="font-mono text-xs text-emerald-400">$ cat PHILOSOPHY.md</p>
      <h2 class="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        How I work
      </h2>
      <ol class="mt-10 space-y-0 border-t border-white/10">
        <Reveal v-for="(p, i) in principles" :key="p" :delay="i * 70" wipe>
          <li
            class="grid grid-cols-[40px_1fr] gap-4 border-b border-white/10 py-6 sm:grid-cols-[56px_1fr] sm:px-4"
          >
            <span class="font-mono text-2xl font-bold text-white/15"
              >0{{ i + 1 }}</span
            >
            <p
              class="self-center text-base leading-relaxed text-zinc-300 sm:text-lg"
            >
              {{ p }}
            </p>
          </li>
        </Reveal>
      </ol>
    </section>

    <!-- hire -->
    <section
      class="relative overflow-hidden border-t border-emerald-400/20 bg-black/60"
    >
      <div
        class="absolute inset-0 -z-10 opacity-[0.04]"
        style="
          background-image:
            linear-gradient(#34d399 1px, transparent 1px),
            linear-gradient(90deg, #34d399 1px, transparent 1px);
          background-size: 40px 40px;
        "
      />
      <div class="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <p class="font-mono text-xs text-emerald-400">$ ./hire.sh</p>
        <h2
          class="mt-4 max-w-2xl text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl"
        >
          Problems that matter.
          <span class="text-emerald-400">Teams that ship.</span>
        </h2>
        <p
          class="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base"
        >
          Remote-friendly or Tbilisi-based. Long-term thinking - though I do
          freelance too. I respond to serious inquiries within 24 hours.
        </p>
        <div class="mt-8 flex flex-wrap gap-3 font-mono text-sm">
          <MagneticButton>
            <a
              href="mailto:misha.mumladze2007@gmail.com"
              class="inline-block rounded bg-emerald-400 px-6 py-3 font-semibold text-zinc-950 transition-colors hover:bg-emerald-300"
              data-cursor="open"
            >
              misha.mumladze2007@gmail.com
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="tel:+995595505402"
              class="inline-block rounded border border-white/20 px-6 py-3 text-zinc-300 transition-colors hover:border-emerald-400/60 hover:text-emerald-300"
            >
              +995 595 505 402
            </a>
          </MagneticButton>
        </div>
        <p class="mt-8 font-mono text-xs text-zinc-600">
          georgian - native · english - fluent (c1) · russian - basic (a1)
          <span class="mx-2 text-emerald-400/50">|</span>
          press
          <kbd
            class="rounded border border-white/20 bg-white/5 px-1 py-0.5 text-zinc-400"
            >`</kbd
          >
          for terminal
        </p>
      </div>
    </section>
  </div>
</template>
