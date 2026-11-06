import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion.js';
import useMediaQuery from '../../hooks/useMediaQuery.js';

/**
 * Decorative custom cursor. Pointer-events: none (CSS), so it never
 * interferes with native focus, clicking, or text selection.
 *
 * Active only when:
 *  - pointer: fine (desktop mouse)
 *  - min-width: 1024px (avoid small / touch surfaces)
 *  - prefers-reduced-motion is NOT reduce
 */
export default function Cursor() {
  const reduce = useReducedMotion();
  const finePointer = useMediaQuery('(pointer: fine)');
  const wideEnough = useMediaQuery('(min-width: 1024px)');
  const enabled = !reduce && finePointer && wideEnough;

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const targetDot = useRef({ x: -100, y: -100 });
  const targetRing = useRef({ x: -100, y: -100 });
  const [hoverInteractive, setHoverInteractive] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    document.body.classList.toggle('has-fine-pointer', enabled);
    if (!enabled) {
      document.body.classList.remove('aurelis-cursor-active');
      document.body.style.cursor = '';
      return undefined;
    }

    document.body.classList.add('aurelis-cursor-active');
    document.body.style.cursor = 'none';

    let raf = null;
    let ring = { x: -100, y: -100 };

    const onMove = (e) => {
      targetDot.current = { x: e.clientX, y: e.clientY };
      targetRing.current = { x: e.clientX, y: e.clientY };

      const el = e.target;
      const interactive = !!(
        el &&
        el.closest &&
        el.closest('a, button, input, select, textarea, [role="button"], [role="tab"], [data-cursor="link"]')
      );
      setHoverInteractive((prev) => (prev !== interactive ? interactive : prev));
    };

    const onLeave = () => {
      targetDot.current = { x: -100, y: -100 };
      targetRing.current = { x: -100, y: -100 };
    };

    const tick = () => {
      // Ring trails the dot slightly (no easing/interpolation in reduced-motion).
      ring.x += (targetRing.current.x - ring.x) * 0.18;
      ring.y += (targetRing.current.y - ring.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetDot.current.x}px, ${targetDot.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerout', onLeave, { passive: true });
    document.addEventListener('pointerdown', onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove('aurelis-cursor-active');
      document.body.style.cursor = '';
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerout', onLeave);
      document.removeEventListener('pointerdown', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled || reduce) return null;

  return (
    <>
      <span
        ref={dotRef}
        className="custom-cursor"
        style={hoverInteractive ? { width: '8px', height: '8px', opacity: 0.9 } : undefined}
        aria-hidden="true"
      />
      <span
        ref={ringRef}
        className="custom-cursor-ring"
        style={hoverInteractive ? { width: '56px', height: '56px', opacity: 0.85 } : undefined}
        aria-hidden="true"
      />
    </>
  );
}
