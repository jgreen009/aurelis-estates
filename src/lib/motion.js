import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Shared gsap ticker config — single source of time for Lenis + ScrollTrigger.
gsap.ticker.lagSmoothing(0);

export { gsap, ScrollTrigger };

/**
 * True when the user has requested reduced motion. All motion systems must
 * short-circuit to a static state when this returns true.
 */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
