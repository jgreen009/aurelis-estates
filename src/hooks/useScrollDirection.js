import { useState, useEffect, useRef } from 'react';

export default function useScrollDirection({ threshold = 8 } = {}) {
  const [direction, setDirection] = useState('up');
  const [scrolled, setScrolled] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    let frame = null;
    const handler = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const y = window.scrollY;
        setScrolled(y > 20);
        const delta = y - last.current;
        if (Math.abs(delta) > threshold) {
          setDirection(delta > 0 ? 'down' : 'up');
          last.current = y;
        }
      });
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return { direction, scrolled };
}
