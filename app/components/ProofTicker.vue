<script setup lang="ts">
const items = [
  { target: 6, suffix: "+", label: "years shipping production code" },
  { target: 50, suffix: "+", label: "person infrastructure managed" },
  { target: 30, suffix: "+", label: "workstations deployed & kept alive" },
  { target: 0, suffix: "", label: "tolerance for over-engineering" },
];

const shown = ref(items.map(() => 0));
const started = ref(false);
const root = ref<HTMLElement | null>(null);

const animate = () => {
  const t0 = performance.now();
  const dur = 1200;
  const step = (t: number) => {
    const p = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    shown.value = items.map((i) => Math.round(i.target * e));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

onMounted(() => {
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting) && !started.value) {
        started.value = true;
        animate();
        io.disconnect();
      }
    },
    { threshold: 0.3 },
  );
  if (root.value) io.observe(root.value);
  onUnmounted(() => io.disconnect());
});
</script>

<template>
  <section id="proof" ref="root" class="border-b border-white/10 bg-black/40">
    <div class="mx-auto max-w-6xl px-4 py-12">
      <p class="font-mono text-xs text-emerald-400">
        <span
          class="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"
        />live counters · no vanity metrics
      </p>
      <div class="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-4">
        <div v-for="(item, i) in items" :key="item.label">
          <p
            class="font-mono text-5xl font-bold tabular-nums text-white sm:text-6xl"
          >
            {{ shown[i]
            }}<span class="text-emerald-400">{{ item.suffix }}</span>
          </p>
          <p class="mt-2 text-sm text-zinc-500">{{ item.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
