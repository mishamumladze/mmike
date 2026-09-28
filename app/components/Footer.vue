<template>
  <footer
    class="border-t border-emerald-400/20 bg-black font-mono text-xs text-zinc-500"
  >
    <div
      class="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 sm:flex-row sm:items-center sm:justify-between"
    >
      <p>© {{ new Date().getFullYear() }} misha mumladze · tbilisi, georgia</p>
      <p>
        shipped with nuxt. no template. no page builder.
        <span class="blink text-emerald-400">▊</span>
      </p>
    </div>
  </footer>
</template>
