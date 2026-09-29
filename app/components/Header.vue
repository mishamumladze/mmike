<script setup lang="ts">
import { ArrowUpRight } from "lucide-vue-next";

const links = [
  { to: "#proof", label: "proof" },
  { to: "#log", label: "log" },
  { to: "#stack", label: "stack" },
  { to: "#principles", label: "principles" },
];
</script>

<template>
  <header class="sticky top-0 z-[100] border-b border-white/10 bg-zinc-950">
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <a
        href="#top"
        class="glitch glitch-hover font-mono text-sm font-bold tracking-tight text-white"
        data-text="mmike_"
      >
        mmike<span class="text-emerald-400">_</span>
      </a>
      <ul
        class="hidden items-center gap-6 font-mono text-xs text-zinc-400 sm:flex"
      >
        <li v-for="link in links" :key="link.to">
          <a :href="link.to" class="transition-colors hover:text-emerald-400">{{
            link.label
          }}</a>
        </li>
      </ul>
      <a
        href="mailto:misha.mumladze2007@gmail.com"
        class=""
      >
        <MagneticButton>
          <a
            href="mailto:misha.mumladze2007@gmail.com"
            class="flex items-center gap-1 rounded bg-emerald-400 px-3 py-1.5 font-mono text-xs font-semibold text-zinc-950 transition-colors hover:bg-emerald-300"
            data-cursor="open"
          >
            hire me
          </a>
        </MagneticButton>
      </a>
    </nav>
  </header>
</template>
