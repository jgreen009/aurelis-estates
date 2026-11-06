import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/motion.js';
import useReducedMotion from '../../hooks/useReducedMotion.js';
import { properties } from '../../data/properties.js';
import { formatCurrency } from '../../utils/format.js';
import Button from '../common/Button.jsx';
import PictureImage from '../common/PictureImage.jsx';
import { handleAnchorClick } from '../../utils/scroll.js';

// Flagship residence featured in the pinned showcase.
const flagship = properties[0];

const slides = [
  { label: 'Signature property', heading: flagship.name, body: flagship.description },
  {
    label: 'Particulars',
    heading: `${flagship.bedrooms} beds · ${flagship.bathrooms} baths · ${flagship.livingArea.toLocaleString()} sq ft`,
    body: flagship.features.slice(0, 4).join(' · '),
  },
  {
    label: 'Representation',
    heading: 'Direct advisor access',
    body: flagship.agentNotes,
  },
];

export default function ShowcaseSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const progressRef = useRef(null);
  const slidesRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    if (reduce) return undefined;

    const ctx = gsap.context(() => {
      const slideEls = slidesRef.current
        ? slidesRef.current.querySelectorAll('[data-showcase-slide]')
        : [];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=220%',
          pin: pinRef.current,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      // Reveal the visual panel entry.
      tl.fromTo(
        visualRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 0.5, ease: 'power2.out' },
        0
      );

      // Cross-fade between slides. Each gets a window in the timeline.
      slideEls.forEach((el, i) => {
        const dur = 1 / slideEls.length;
        if (i === 0) {
          tl.to(el, { opacity: 1, duration: 0.1 * dur, ease: 'power1.inOut' }, 0);
        } else {
          tl.to(el, { opacity: 1, duration: 0.1 * dur, ease: 'power1.inOut' }, i * dur - 0.05);
        }
        tl.to(el, { opacity: 0, duration: 0.1 * dur, ease: 'power1.inOut' }, (i + 1) * dur - 0.1);
      });

      // Subtle parallax drift on the visual across the whole sequence.
      tl.to(
        visualRef.current,
        { yPercent: -8, duration: 1, ease: 'none' },
        0
      );

      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === sectionRef.current) t.kill();
        });
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative bg-charcoal text-ivory"
      aria-label="Signature pinned showcase"
    >
      <div ref={pinRef} className="relative min-h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-charcoal to-graphite" />
        </div>

        <div className="relative container-editorial w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Text stage */}
            <div
              ref={slidesRef}
              className={`lg:col-span-6 order-2 lg:order-1 ${
                reduce ? 'flex flex-col gap-12' : 'relative min-h-[18rem]'
              }`}
            >
              {slides.map((s, i) => (
                <div
                  key={i}
                  data-showcase-slide
                  className={
                    reduce
                      ? 'flex flex-col gap-5'
                      : 'absolute inset-0 flex flex-col gap-5'
                  }
                  style={reduce ? undefined : { opacity: 0 }}
                  aria-hidden={reduce ? undefined : true}
                >
                  <p className="label-eyebrow text-gold">{s.label}</p>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-balance max-w-xl">
                    {s.heading}
                  </h2>
                  <p className="max-w-prose text-ivory/70 leading-relaxed text-pretty">{s.body}</p>
                  {i === slides.length - 1 && (
                    <div className="mt-2 flex flex-col sm:flex-row items-start gap-3">
                      <Button
                        as="a"
                        href="#properties"
                        onClick={handleAnchorClick}
                        variant="gold"
                        size="lg"
                      >
                        View the residence
                      </Button>
                      <Button
                        as="a"
                        href="#contact"
                        onClick={handleAnchorClick}
                        variant="outline"
                        size="lg"
                        className="border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal"
                      >
                        Request full particulars
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Parallel visual reveal */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div
                ref={visualRef}
                className="relative aspect-[4/5] w-full overflow-hidden border border-ivory/10 shadow-2xl bg-charcoal"
              >
                <PictureImage
                  base="properties/showcase-sapphire-penthouse"
                  widths={[1500]}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  alt="Sapphire Penthouse — flagship residence featured in the pinned showcase."
                  width={1500}
                  height={1875}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/30" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-label text-ivory/70">
                      {flagship.location}
                    </p>
                    <p className="font-serif text-2xl text-ivory">{flagship.name}</p>
                  </div>
                  <p className="font-serif text-xl text-gold">
                    {formatCurrency(flagship.price, flagship.currency, { compact: true })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Local progress indicator (hidden under reduced-motion) */}
        {!reduce && (
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-ivory/10"
            aria-hidden="true"
          >
            <div
              ref={progressRef}
              className="h-full origin-left bg-gold"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
