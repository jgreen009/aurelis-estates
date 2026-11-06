import { useScroll, useSpring, motion, useTransform } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion.js';

/**
 * Thin scroll progress bar pinned to the top of the viewport.
 * Uses framer-motion's useScroll (reads window scroll, Lenis-agnostic) and a
 * spring-smoothed scaleX. Disabled (returns null) under reduced-motion so no
 * motion is shown; the bar simply is not rendered.
 */
export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const scaleX = useTransform(reduce ? scrollYProgress : progress, (v) => v);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50 bg-gold/85"
      style={{ scaleX }}
    />
  );
}
