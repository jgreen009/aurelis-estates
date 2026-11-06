import SectionHeading from '../common/SectionHeading.jsx';
import PictureImage from '../common/PictureImage.jsx';
import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/motion.js';
import useReducedMotion from '../../hooks/useReducedMotion.js';

export default function AboutSection() {
  const reduce = useReducedMotion();
  const imageWrapRef = useRef(null);
  const imageInnerRef = useRef(null);

  // Subtle parallax on the architectural backdrop image so it drifts upward
  // slightly slower than the section scrolls. Reads as one continuous motion
  // with the Hero parallax above and the Showcase pinned section below.
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    if (reduce) return undefined;
    if (!imageInnerRef.current || !imageWrapRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageInnerRef.current,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="about" className="py-24 lg:py-32 bg-charcoal text-ivory">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Who We Are"
          title="A boutique property advisory"
          description="AURELIS ESTATES represents a curated portfolio of significant residences, new developments, and commercial addresses across six global cities."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Media — architectural backdrop with parallax */}
          <div ref={imageWrapRef} className="lg:col-span-6 order-1 overflow-hidden" data-reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-ivory/10 bg-graphite">
              <div ref={imageInnerRef} className="absolute inset-[-10%] w-[120%] h-[120%]">
                <PictureImage
                  base="hero/hero"
                  widths={[1920, 960]}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  alt="Architectural backdrop — a residence represented by AURELIS ESTATES."
                  width={1920}
                  height={2400}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="label-eyebrow text-gold mb-1">Est. 2014</p>
                <p className="font-serif text-2xl text-ivory leading-tight">
                  A single point of contact for the full spectrum of property advisory.
                </p>
              </div>
            </div>
          </div>

          {/* Text — firm philosophy */}
          <div className="lg:col-span-6 order-2 space-y-7">
            <p className="prose-body text-lg text-ivory/75" data-reveal>
              We are a selective property advisory firm. Our practice is built on a
              simple premise: a small number of significant residences deserves a
              small number of dedicated advisors.
            </p>
            <p className="prose-body text-lg text-ivory/75" data-reveal>
              Whether acquiring, divesting, or stewarding a substantial residence,
              our clients work directly with a senior partner. Specialist teams
              across six disciplines coordinate behind that single relationship — so
              strategy, negotiation, marketing, and stewardship move as one.
            </p>

            <ul className="space-y-5 pt-2 border-t border-ivory/10" data-reveal>
              <li className="flex items-start gap-4 pt-5">
                <span className="mt-1 inline-flex w-7 h-7 shrink-0 items-center justify-center border border-gold/40 text-gold">
                  <span className="font-serif text-sm">I</span>
                </span>
                <p className="prose-body text-ivory/80">
                  <span className="block text-ivory font-serif text-lg mb-1">Confidentiality</span>
                  Every engagement is handled with discretion. Off-market access,
                  quiet negotiation, and named-contacts-only showings are the
                  default — not the exception.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1 inline-flex w-7 h-7 shrink-0 items-center justify-center border border-gold/40 text-gold">
                  <span className="font-serif text-sm">II</span>
                </span>
                <p className="prose-body text-ivory/80">
                  <span className="block text-ivory font-serif text-lg mb-1">Editorial Restraint</span>
                  Properties are presented with understated sophistication. We let
                  architecture and interior quality speak — never theatrics, never
                  hyperbole.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1 inline-flex w-7 h-7 shrink-0 items-center justify-center border border-gold/40 text-gold">
                  <span className="font-serif text-sm">III</span>
                </span>
                <p className="prose-body text-ivory/80">
                  <span className="block text-ivory font-serif text-lg mb-1">Market Expertise</span>
                  Deep, localized knowledge across Los Angeles, London, New York,
                  Dubai, the Engadin, and Bel Air informs every recommendation we
                  make.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
