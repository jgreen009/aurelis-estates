import { useEffect } from 'react';

export default function useLockBodyScroll(locked) {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    if (!locked) return undefined;

    const original = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = original;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
}
