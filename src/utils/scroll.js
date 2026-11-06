const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const stripLeadingHash = (hash) => (hash && hash.startsWith('#') ? hash.slice(1) : hash);

const getHeaderOffset = () =>
  (typeof document !== 'undefined' && document.querySelector('[data-nav-height]')?.offsetHeight) || 0;

export function scrollToSection(hashOrId, { offset = 0, updateHash = true } = {}) {
  if (typeof document === 'undefined' || !hashOrId) return;
  const id = stripLeadingHash(hashOrId);
  const target = document.getElementById(id);
  if (!target) return;

  if (updateHash && typeof window !== 'undefined' && window.location.hash !== `#${id}`) {
    // Update the URL without creating an extra history entry, then scroll.
    history.replaceState(null, '', `#${id}`);
  }

  const reduce = reducedMotion();
  const headerOffset = getHeaderOffset();
  const extraOffset = headerOffset + offset;

  if (reduce || typeof window === 'undefined' || !('scrollTo' in window)) {
    // Honor reduced-motion: jump with no smoothing. Compensate for the fixed nav.
    const top = target.getBoundingClientRect().top + window.scrollY - extraOffset;
    window.scrollTo(0, Math.max(0, top));
    return;
  }

  if (window.Lenis && typeof window.Lenis.scrollTo === 'function') {
    window.Lenis.scrollTo(target, { offset: -extraOffset });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - extraOffset;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function handleAnchorClick(event, onAfter) {
  const a = event.target.closest('a[href^="#"]');
  if (!a) return;
  const hash = a.getAttribute('href');
  if (!hash || hash === '#') return;
  const id = stripLeadingHash(hash);
  if (!document.getElementById(id)) return;
  event.preventDefault();
  scrollToSection(hash);
  if (typeof onAfter === 'function') onAfter(id);
}
