import { useState, useCallback, useId } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading.jsx';
import { testimonials } from '../../data/content.js';

function initials(name) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const regionId = useId();

  const go = useCallback(
    (delta) => {
      setIndex((prev) => (prev + delta + total) % total);
    },
    [total]
  );

  const goTo = useCallback((i) => setIndex(i), []);

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-ivory">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Testimonials"
          title="In the words of principals"
          description="A selection of notes received from clients. Names are withheld or generalized at their request."
          className="mb-12"
        />

        <div
          id={regionId}
          className="relative"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          data-reveal
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-editorial"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <article
                  key={t.id}
                  className="w-full shrink-0 px-1"
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${i + 1} of ${total}`}
                  aria-hidden={i !== index}
                  tabIndex={i === index ? 0 : -1}
                >
                  <figure className="bg-white border border-charcoal/10 p-8 lg:p-12 max-w-3xl mx-auto">
                    <blockquote className="font-serif text-2xl lg:text-3xl leading-snug text-balance text-charcoal">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-4">
                      <span
                        className="grid place-items-center w-12 h-12 rounded-full bg-charcoal text-ivory font-serif"
                        aria-hidden="true"
                      >
                        {initials(t.author)}
                      </span>
                      <span className="text-sm">
                        <span className="block text-charcoal">{t.author}</span>
                        <span className="block text-charcoal/60">{t.location}</span>
                      </span>
                    </figcaption>
                  </figure>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              className="inline-flex items-center justify-center w-12 h-12 border border-charcoal/20 hover:border-charcoal/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              aria-label="Previous testimonial"
              aria-controls={regionId}
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <ul className="flex items-center gap-2" role="tablist" aria-label="Select testimonial">
              {testimonials.map((t, i) => (
                <li key={t.id} role="presentation">
                  <button
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Go to testimonial ${i + 1}: ${t.author}, ${t.location}`}
                    onClick={() => goTo(i)}
                    className={[
                      'inline-flex items-center justify-center w-11 h-11 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'block w-2.5 h-2.5 rounded-full transition-colors',
                        i === index ? 'bg-gold' : 'bg-charcoal/25 group-hover:bg-charcoal/50',
                      ].join(' ')}
                      aria-hidden="true"
                    />
                    <span className="sr-only">Slide {i + 1}</span>
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex items-center justify-center w-12 h-12 border border-charcoal/20 hover:border-charcoal/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              aria-label="Next testimonial"
              aria-controls={regionId}
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          Showing testimonial {index + 1} of {total}: {testimonials[index].author}, {testimonials[index].location}.
        </p>
      </div>
    </section>
  );
}
