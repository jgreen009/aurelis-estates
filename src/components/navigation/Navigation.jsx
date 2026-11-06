import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from '../common/Button.jsx';
import useScrollDirection from '../../hooks/useScrollDirection.js';
import useActiveSection from '../../hooks/useActiveSection.js';
import useReducedMotion from '../../hooks/useReducedMotion.js';
import useLockBodyScroll from '../../hooks/useLockBodyScroll.js';
import { NAV_LINKS } from '../../data/navigation.js';
import { handleAnchorClick } from '../../utils/scroll.js';

export default function Navigation() {
  const { direction, scrolled } = useScrollDirection();
  const active = useActiveSection();
  const reduce = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);

  useLockBodyScroll(mobileOpen);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const onClick = (e) => {
    const wasMobile = mobileOpen;
    handleAnchorClick(e, () => {
      if (wasMobile) setMobileOpen(false);
    });
    if (!e.defaultPrevented) {
      if (mobileOpen) setMobileOpen(false);
    }
  };

  const hidden = direction === 'down' && scrolled && !mobileOpen;
  const surface = scrolled || mobileOpen;

  return (
    <header
      data-nav-height
      className={[
        'fixed inset-x-0 top-0 z-40 transition-[transform,background-color,color,border-color] duration-500 ease-editorial',
        hidden ? '-translate-y-full' : 'translate-y-0',
        surface
          ? 'bg-ivory/95 backdrop-blur-sm text-charcoal border-b border-charcoal/10'
          : 'bg-transparent text-ivory border-b border-transparent',
      ].join(' ')}
    >
      <div className="container-editorial flex items-center justify-between gap-4 h-16 lg:h-20">
        <a
          href="#home"
          onClick={onClick}
          className="inline-flex items-center gap-2.5 font-serif text-xl lg:text-2xl tracking-editorial leading-none"
          aria-label="AURELIS ESTATES — home"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 32 32"
            fill="none"
            className="text-gold shrink-0"
            aria-hidden="true"
          >
            <path
              d="M16 2L4 11v18a1 1 0 0 0 1 1h7V19h8v11h7a1 1 0 0 0 1-1V11L16 2z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <path d="M16 2v9M10 19v11M22 19v11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="whitespace-nowrap">
            AURELIS<span className="text-gold" aria-hidden="true"> · </span>ESTATES
          </span>
        </a>

        <nav className="hidden lg:block" aria-label="Page sections">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={onClick}
                    aria-current={isActive ? 'page' : undefined}
                    className={[
                      'text-xs uppercase tracking-label leading-none transition-colors',
                      'hover:text-gold focus-visible:text-gold',
                      isActive ? 'text-gold' : '',
                    ].join(' ')}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button as="a" href="#contact" onClick={onClick} size="sm" variant="gold">
            Enquire
          </Button>
        </div>

        <button
          type="button"
          className={[
            'lg:hidden inline-flex items-center justify-center w-12 h-12 -mr-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold transition-colors',
            surface ? 'text-charcoal' : 'text-ivory',
          ].join(' ')}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <MobileMenu
          active={active}
          onNavigate={onClick}
          onClose={() => setMobileOpen(false)}
          reduce={reduce}
        />
      )}
    </header>
  );
}

function MobileMenu({ active, onNavigate, onClose, reduce }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();
    return () => {
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, []);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className={[
        'lg:hidden absolute inset-x-0 top-full bg-ivory border-b border-charcoal/10 shadow-card origin-top',
        reduce ? '' : 'animate-fade-up',
      ].join(' ')}
    >
      <nav aria-label="Page sections (mobile)" className="container-editorial py-4">
        <ul className="flex flex-col">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={onNavigate}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'block w-full px-2 py-4 text-base uppercase tracking-label border-b border-charcoal/5',
                    isActive ? 'text-gold' : 'text-charcoal',
                  ].join(' ')}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="pt-4">
          <Button as="a" href="#contact" onClick={onNavigate} variant="gold" size="md" className="w-full">
            Enquire
          </Button>
        </div>
        <button
          type="button"
          ref={closeRef}
          onClick={onClose}
          className="sr-only"
          aria-label="Close menu"
        >
          Close
        </button>
      </nav>
    </div>
  );
}
