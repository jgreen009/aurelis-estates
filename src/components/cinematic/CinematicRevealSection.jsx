import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/motion.js';
import useReducedMotion from '../../hooks/useReducedMotion.js';

export default function CinematicRevealSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    // Pause the video when the cinematic section leaves the viewport; play
    // when it returns (autoplay is always muted + looped). Reduced-motion
    // users get poster-only — we never autoplay under reduced-motion.
    const video = videoRef.current;
    if (!video) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (video.paused && !reduce) {
              video.play().catch(() => {
                /* autoplay can be blocked by browser policy; poster remains */
              });
            }
          } else {
            if (!video.paused) video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(video);

    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    if (reduce) return undefined;

    const ctx = gsap.context(() => {
      if (frameRef.current) {
        gsap.fromTo(
          frameRef.current,
          { clipPath: 'inset(50% 0% 50% 0%)', opacity: 0.2, scale: 1.04 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: frameRef.current,
              start: 'top 80%',
              end: 'bottom 40%',
              scrub: 0.6,
            },
          }
        );
      }
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      id="cinematic"
      ref={sectionRef}
      className="relative bg-graphite text-ivory py-32 lg:py-40 overflow-hidden"
      aria-label="Cinematic property reveal"
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at center, rgba(185,154,99,0.18), transparent 60%)',
        }}
      />
      <div
        ref={frameRef}
        className="relative mx-auto w-full max-w-4xl aspect-video border border-ivory/15 bg-charcoal/70 overflow-hidden"
        aria-hidden="true"
        style={reduce ? undefined : { clipPath: 'inset(0% 0% 0% 0%)' }}
      >
        {!reduce && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            poster="/media/cinematic/cinematic-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Cinematic reveal of a flagship property."
          >
            <source src="/media/cinematic/cinematic-1080.mp4" type="video/mp4" media="(min-width: 768px)" />
            <source src="/media/cinematic/cinematic-720.mp4" type="video/mp4" />
          </video>
        )}
        {reduce && (
          <img
            src="/media/cinematic/cinematic-poster.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
        )}
      </div>

      <div ref={textRef} className="relative container-editorial text-center max-w-3xl -mt-16 lg:-mt-24">
        <p className="label-eyebrow text-gold mb-5">In Residence</p>
        <h2 className="font-serif text-4xl lg:text-5xl text-balance">
          The Sapphire Penthouse, from first impression to private viewing.
        </h2>
        <p className="mt-5 text-ivory/70">
          A five-bedroom residence above the Financial District, presented as a
          sequence of still and moving images. Scroll to move through the
          sequence — pause to hold on any moment.
        </p>
        <p className="mt-4 text-[11px] uppercase tracking-label text-ivory/40">
          Sapphire Penthouse · Manhattan, New York · USD 28,500,000
        </p>
      </div>
    </section>
  );
}
