<script setup lang="ts">
import { gsap } from "gsap";

const PROMPT = "guest@mmike:~$";
const isOpen = ref(false);
const panel = ref<HTMLElement | null>(null);
const lines = ref<string[]>([]);
const input = ref("");
const history = ref<string[]>([]);
const hIndex = ref(-1);
const inputEl = ref<HTMLInputElement | null>(null);
const bodyEl = ref<HTMLDivElement | null>(null);

const BOOT = [
  "mmikeOS v6.0 — all systems operational",
  "type 'help' to poke around. 'exit' to escape.",
];

const scrollDown = () => {
  nextTick(() => {
    if (bodyEl.value) bodyEl.value.scrollTop = bodyEl.value.scrollHeight;
  });
};

const typeBoot = () => {
  lines.value = [];
  BOOT.forEach((l, i) => {
    setTimeout(() => {
      lines.value.push(l);
      scrollDown();
    }, i * 220);
  });
};

const open = () => {
  isOpen.value = true;
  nextTick(() => {
    if (panel.value) {
      gsap.fromTo(
        panel.value,
        { scale: 0.94, y: 24, opacity: 0, filter: "blur(6px)" },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.35,
          ease: "expo.out",
        },
      );
    }
    typeBoot();
    inputEl.value?.focus();
  });
};
const close = () => {
  if (!panel.value) {
    isOpen.value = false;
    return;
  }
  gsap.to(panel.value, {
    scale: 0.96,
    y: 12,
    opacity: 0,
    duration: 0.2,
    ease: "power2.in",
    onComplete: () => {
      isOpen.value = false;
      input.value = "";
    },
  });
};

const run = (raw: string) => {
  const cmd = raw.trim();
  if (!cmd) return;
  history.value.unshift(cmd);
  hIndex.value = -1;
  lines.value.push(`${PROMPT} ${cmd}`);
  const [bin, ...args] = cmd.toLowerCase().split(/\s+/);
  const out: string[] = [];
  switch (bin) {
    case "help":
      out.push(
        "whoami · stack · log · principles · hire · sudo hire-me · clear · exit",
      );
      break;
    case "whoami":
      out.push("misha mumladze — systems builder, tbilisi. react/php/linux.");
      break;
    case "stack":
      out.push(
        "frontend: react, next.js, js, html/css. vue+nuxt when they fit.",
      );
      out.push("backend+infra: php, linux admin, windows domains, db, docker.");
      out.push("tooling: git, cli+scripting, vscode, pnpm, profiling.");
      break;
    case "log":
      out.push("2019-2025 funtravelgeorgia — prod react, 50+ person infra.");
      out.push("2025-now clearsource — ka/en/ru interpretation.");
      out.push("before — hardware repair. 2 AM debugging certified.");
      break;
    case "principles":
      out.push("01 every line of code is debt. ship what's necessary.");
      out.push("02 frontend devs who don't get servers ship slow apps.");
      out.push("03 perfect is the enemy of done. ship, measure, iterate.");
      out.push("04 think deploy/monitor/scale from day one.");
      break;
    case "hire":
      out.push("email: misha.mumladze2007@gmail.com");
      out.push("phone: +995 595 505 402 — replies within 24h.");
      break;
    case "sudo":
      if (args.join(" ") === "hire-me") {
        out.push("[sudo] access granted. you have excellent taste.");
        out.push("opening mail client…");
        window.location.href = "mailto:misha.mumladze2007@gmail.com";
      } else {
        out.push(`sudo: ${args.join(" ")}: command not found`);
      }
      break;
    case "clear":
      lines.value = [];
      input.value = "";
      return;
    case "exit":
      close();
      return;
    default:
      out.push(`command not found: ${bin} — try 'help'`);
  }
  lines.value.push(...out);
  if (lines.value.length > 200) lines.value = lines.value.slice(-200);
  input.value = "";
  scrollDown();
};

const submit = () => run(input.value);

const navHistory = (dir: 1 | -1) => {
  if (!history.value.length) return;
  hIndex.value = Math.min(
    Math.max(hIndex.value + dir, -1),
    history.value.length - 1,
  );
  input.value = hIndex.value === -1 ? "" : history.value[hIndex.value];
};

onMounted(() => {
  const toggle = (e: KeyboardEvent) => {
    if (e.key === "`") {
      e.preventDefault();
      isOpen.value ? close() : open();
    }
  };
  const external = () => open();
  window.addEventListener("keydown", toggle);
  window.addEventListener("open-terminal", external);
  onUnmounted(() => {
    window.removeEventListener("keydown", toggle);
    window.removeEventListener("open-terminal", external);
  });
});
// ponytail: no autocomplete or real fs — add when people actually use it.
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-[200] bg-black/85 p-4"
    @click="close"
  >
    <div
      ref="panel"
      class="mx-auto mt-[6vh] max-w-3xl overflow-hidden rounded-lg border border-emerald-400/30 bg-black shadow-[0_0_80px_rgba(52,211,153,0.15)]"
      @click.stop
    >
      <div
        class="flex items-center justify-between border-b border-white/10 px-4 py-2.5 font-mono text-xs text-zinc-500"
      >
        <span class="flex items-center gap-2">
          <span class="flex gap-1.5">
            <span class="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span class="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span class="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          guest@mmike — zsh
        </span>
        <span>esc to close</span>
      </div>
      <div
        ref="bodyEl"
        class="h-[50vh] overflow-y-auto p-4 font-mono text-sm leading-relaxed"
        @click="inputEl?.focus()"
      >
        <p
          v-for="(l, i) in lines"
          :key="i"
          class="whitespace-pre-wrap text-zinc-300"
        >
          {{ l }}
        </p>
        <form class="mt-1 flex items-center gap-2" @submit.prevent="submit">
          <span class="shrink-0 text-emerald-400">{{ PROMPT }}</span>
          <input
            ref="inputEl"
            v-model="input"
            class="w-full bg-transparent text-zinc-100 caret-emerald-400 outline-none"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            @keydown.esc="close"
            @keydown.up.prevent="navHistory(1)"
            @keydown.down.prevent="navHistory(-1)"
          />
        </form>
      </div>
    </div>
  </div>
</template>
