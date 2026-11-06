import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/motion.js';
import useReducedMotion from './useReducedMotion.js';

/**
 * App-wide restrained text/section reveals. Any element carrying the
 * `data-reveal` attribute is faded and translated upward once when it scrolls
 * into view. Staggered per-section: siblings inside the same parent batch
 * together so reveals never feel robotic.
 *
 * Reduced-motion path: nothing is set up — elements remain in their natural
 * (fully visible) state. No transforms, no ScrollTriggers, no layout work.
 */
export default function useReveals() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    if (reduce) return undefined;

    const scoped = gsap.utils.toArray('[data-reveal]');
    if (scoped.length === 0) return undefined;

    const ctx = gsap.context(() => {
      gsap.set('[data-reveal]', { opacity: 0, y: 18 });

      const triggers = ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.08,
            overwrite: 'auto',
          }),
      });

      return () => triggers.forEach((t) => t.kill());
    });

    return () => ctx.revert();
  }, [reduce]);
}
