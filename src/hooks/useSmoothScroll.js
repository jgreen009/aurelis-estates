import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/motion.js';
import useReducedMotion from './useReducedMotion.js';

/**
 * Global Lenis smooth-scroll, gated by reduced-motion.
 *
 * - Drives Lenis through the gsap ticker so ScrollTrigger and Lenis share one
 *   animation frame source (no double-rAF, no drift).
 * - Pushes every Lenis scroll into ScrollTrigger.update so pinned sections,
 *   parallax, and progress reflect the smoothed scroll position.
 * - Exposes the instance on window.Lenis so util/scroll.js can call
 *   lenis.scrollTo(target, { offset }) for anchor navigation.
 * - Disables (and leaves native scroll) under prefers-reduced-motion.
 */
export default function useSmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    // On first mount, force the page to start at the hero (top). Browsers
    // otherwise restore the previous scroll position (e.g. #calculator from a
    // prior session), which the user experiences as "navigating to the
    // calculator" on page load. Only run once, before Lenis is constructed.
    if (window.location.hash && window.location.hash !== '#home') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);

    if (reduce) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.5,
    });

    window.Lenis = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const tickerFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);

    // Ensure any ScrollTrigger instances recompute against the smoothed scroll.
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.off('scroll', onScroll);
      lenis.destroy();
      if (window.Lenis === lenis) window.Lenis = undefined;
    };
  }, [reduce]);
}
