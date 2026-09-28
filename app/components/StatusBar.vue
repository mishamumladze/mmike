<script setup lang="ts">
const time = ref("--:--:--");
const latency = ref(12);

const tick = () => {
  time.value = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Tbilisi",
  }).format(new Date());
};

onMounted(() => {
  tick();
  const t = setInterval(tick, 1000);
  const j = setInterval(() => {
    const r = Math.random();
    if (r < 0.12) latency.value = Math.round(9 + Math.random() * 18);
  }, 1400);
  onUnmounted(() => {
    clearInterval(t);
    clearInterval(j);
  });
});
</script>

<template>
  <div
    class="border-b border-emerald-400/20 bg-black font-mono text-[11px] text-zinc-500"
  >
    <div
      class="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5"
    >
      <span class="flex items-center gap-2">
        <span
          class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
        />
        <span class="text-emerald-400">all systems operational</span>
        <span class="hidden text-zinc-600 sm:inline"
          >· {{ latency }}ms · tbilisi node</span
        >
      </span>
      <span>tbilisi {{ time }} · utc+4</span>
    </div>
  </div>
</template>
