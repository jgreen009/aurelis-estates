import SectionHeading from '../common/SectionHeading.jsx';
import { Compass, KeyRound, Megaphone, Home, Plane, Scale } from 'lucide-react';
import { services } from '../../data/content.js';

const ICONS = {
  advisory: Compass,
  acquisition: KeyRound,
  sales: Megaphone,
  management: Home,
  relocation: Plane,
  valuation: Scale,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Services"
          title="An advisory practice built around principals"
          description="Six disciplines delivered by specialist teams, coordinated through a single point of contact."
          className="mb-12"
        />
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/10">
          {services.map((service) => {
            const Icon = ICONS[service.id] ?? Compass;
            return (
              <li key={service.id} className="bg-white p-8 flex flex-col" data-reveal>
                <span className="text-gold mb-5" aria-hidden="true">
                  <Icon size={28} strokeWidth={1.25} />
                </span>
                <h3 className="font-serif text-2xl text-charcoal text-balance">{service.title}</h3>
                <p className="prose-body mt-3 text-sm leading-relaxed text-charcoal/70">{service.summary}</p>
                <ul className="mt-5 space-y-2 text-sm text-charcoal/80">
                  {service.points.map((point) => (
                    <li key={point} className="inline-flex items-start gap-2">
                      <span className="mt-1.5 h-px w-3 bg-gold" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
