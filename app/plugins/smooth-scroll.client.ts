import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default defineNuxtPlugin(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.registerPlugin(ScrollTrigger);

  if (reduced) return;

  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1.05 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // smooth anchor jumps through lenis instead of native snap
  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest(
      'a[href^="#"]',
    ) as HTMLAnchorElement | null;
    if (!a || a.hash.length < 2) return;
    const target = document.querySelector(a.hash);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target as HTMLElement, { offset: -70 });
  });

  return { provide: { lenis } };
});
