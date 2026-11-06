import { useEffect, useRef, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion.js';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 12, scale: 0.99 },
};

const staticVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
  exit: { opacity: 1 },
};

export default function Modal({ open, onClose, labelledBy, describedBy, children, className = '' }) {
  const panelRef = useRef(null);
  const fallbackTitleId = useId();
  const titleId = labelledBy || fallbackTitleId;
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;

    // Stop Lenis (smooth scroll) so wheel/trackpad events don't scroll the
    // page behind the modal. We also keep the body overflow:hidden that was
    // already set, but Lenis drives its own scroll loop and ignores that —
    // so we must explicitly stop it. Restart on close.
    const lenis = typeof window !== 'undefined' ? window.Lenis : null;
    if (lenis && typeof lenis.stop === 'function') lenis.stop();

    // Lenis.stop() pauses its RAF loop but its wheel listener on `window`
    // is still active and calls preventDefault() on every wheel event,
    // which blocks native overflow scroll inside the modal panel. We
    // intercept wheel events in the capture phase on the panel and stop
    // propagation so they never reach Lenis's listener. Native overflow
    // scrolling on the panel (overflow-y: auto) works independently.
    const panel = panelRef.current;
    const stopWheelToLenis = (e) => e.stopPropagation();
    panel?.addEventListener('wheel', stopWheelToLenis, { capture: true });

    const focusable = () =>
      panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
    const first = focusable()?.[0];
    if (first) first.focus();
    else panelRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const items = Array.from(focusable() || []);
        if (items.length === 0) return;
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && active === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        } else if (!e.shiftKey && active === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      panel?.removeEventListener('wheel', stopWheelToLenis, { capture: true });
      document.body.style.overflow = '';
      if (lenis && typeof lenis.start === 'function') lenis.start();
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [open, onClose]);

  const backdrop = reduce ? staticVariants : backdropVariants;
  const panel = reduce ? staticVariants : panelVariants;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6" role="presentation">
          <motion.button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            tabIndex={-1}
            className="absolute inset-0 bg-charcoal/65 backdrop-blur-sm"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={describedBy}
            tabIndex={-1}
            className={`relative z-[110] w-full max-w-3xl max-h-[92vh] overflow-y-auto overscroll-contain bg-ivory shadow-2xl focus:outline-none ${className}`}
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
