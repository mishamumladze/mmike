# mmike

Personal portfolio website. Single-page Nuxt application rendering resume content: hero, ticker, log stream, technical stack overview, principles, and contact section.

## Stack

- Nuxt 4.5 / Vue 3.5 / vue-router 5
- @nuxtjs/tailwindcss 6.14
- gsap 3.15 + ScrollTrigger
- lenis 1.3 (smooth scroll, see `app/plugins/smooth-scroll.client.ts`)
- lucide-vue-next 1.0
- pnpm, Prettier 3.9

## Structure

- `app/app.vue` - root layout: `BootOverlay`, `StatusBar`, `Header`, `NuxtPage`, `Footer`, `Terminal`
- `app/pages/index.vue` - only route; page sections and content data
- `app/components/` - `BootOverlay`, `Header`, `Footer`, `StatusBar`, `KineticHero`, `ProofTicker`, `LogStream`, `ParticleGrid`, `TiltCard`, `MagneticButton`, `Reveal`, `Terminal`
- `app/assets/css/main.css` - global styles
- `app/plugins/smooth-scroll.client.ts` - client-only smooth scrolling
- `nuxt.config.ts`, `tailwind.config.ts`, `tsconfig.json`

## Scripts

From `package.json`:

- `pnpm dev` - development server (`http://localhost:3000`)
- `pnpm build` - production build
- `pnpm generate` - static pre-render
- `pnpm preview` - preview production build
- `pnpm install` - install dependencies (`postinstall` runs `nuxt prepare`)

## Setup

```bash
pnpm install
pnpm dev
```
