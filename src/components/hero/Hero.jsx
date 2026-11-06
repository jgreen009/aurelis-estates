import { useEffect, useRef, lazy, Suspense } from 'react';
import Button from '../common/Button.jsx';
import { ChevronDown } from 'lucide-react';
import { handleAnchorClick } from '../../utils/scroll.js';
import { gsap, prefersReducedMotion } from '../../lib/motion.js';
import PictureImage from '../common/PictureImage.jsx';

// Three.js is heavy — load it only on the client, code-split from the main bundle.
const HeroDepthCanvas = lazy(() => import('./HeroDepthCanvas.jsx'));

export default function Hero() {
  const watermarkRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      return () => ctx.revert();
    });
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-end overflow-hidden bg-charcoal text-ivory"
      aria-label="AURELIS ESTATES — exceptional properties. elevated living."
    >
      {/* Architectural depth: photographic backdrop + layered gradient/grid
          provides a readable darkened surface for the hero copy. Three.js
          wireframe layer is code-split on top of it. */}
      <div className="absolute inset-0" aria-hidden="true">
        <PictureImage
          base="hero/hero"
          widths={[1920, 960]}
          sizes="100vw"
          alt=""
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/80 via-charcoal/70 to-[#0a0a0a]/85" />
        <div
          ref={gridRef}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(185,154,99,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(185,154,99,0.18) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse at top right, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at top right, black 30%, transparent 70%)',
          }}
        />
        <Suspense fallback={null}>
          <HeroDepthCanvas />
        </Suspense>
      </div>

<div ref={watermarkRef} className="absolute inset-0 grid place-items-center" aria-hidden="true">
        <p
          className="font-serif text-[20vw] lg:text-[14vw] leading-none text-ivory/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          AURELIS
        </p>
      </div>

      <div className="relative container-editorial pb-20 pt-32 lg:pb-28 lg:pt-40" data-reveal>
        <p className="label-eyebrow text-gold mb-5">A private property advisory</p>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-balance max-w-4xl">
          Exceptional properties.
          <br />
          <span className="text-gold">Elevated living.</span>
        </h1>
        <p className="prose-body mt-7 max-w-prose text-lg text-ivory/75">
          A boutique practice representing a small number of significant residences, new developments, and commercial addresses across six cities.
        </p>

        <div className="gsap-entrance mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Button as="a" href="#properties" onClick={handleAnchorClick} variant="gold" size="lg">
            Explore properties
          </Button>
          <Button
            as="a"
            href="#contact"
            onClick={handleAnchorClick}
            variant="outline"
            size="lg"
            className="border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal"
          >
            Request an introduction
          </Button>
        </div>
      </div>

      <a
        href="#showcase"
        onClick={handleAnchorClick}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex flex-col items-center gap-1 text-ivory/60 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold p-2"
        aria-label="Continue to flagship showcase"
      >
        <span className="text-[10px] uppercase tracking-label">Continue</span>
        <ChevronDown size={18} className="animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
