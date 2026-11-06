import SectionHeading from '../common/SectionHeading.jsx';
import { metrics } from '../../data/content.js';

export default function ExpertiseSection() {
  return (
    <section id="expertise" className="py-24 lg:py-32 bg-white border-y border-charcoal/10">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Expertise"
          title="Four numbers that describe the practice"
          description="Aggregate figures across the firm's principals. Specific transactions are available under NDA on request."
          className="mb-12"
        />
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((metric) => (
            <li key={metric.id} className="flex flex-col gap-2 text-center lg:text-left border-t border-charcoal/10 pt-5" data-reveal>
              <p className="font-serif text-5xl lg:text-6xl text-charcoal leading-none">
                {metric.value}
                <span className="text-2xl text-gold align-baseline">{metric.suffix}</span>
              </p>
              <p className="prose-body text-[11px] uppercase tracking-label text-charcoal/60">{metric.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
