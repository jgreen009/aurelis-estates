import { useState, useEffect } from 'react';

export default function useReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mql = window.matchMedia(query);
    const handler = (e) => setReduced(e.matches);
    mql.addEventListener('change', handler);
    setReduced(mql.matches);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return reduced;
}
