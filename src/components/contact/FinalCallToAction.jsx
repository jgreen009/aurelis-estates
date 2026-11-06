import Button from '../common/Button.jsx';
import { handleAnchorClick } from '../../utils/scroll.js';

export default function FinalCallToAction() {
  return (
    <section
      aria-label="Begin a conversation"
      className="bg-graphite text-ivory py-24 lg:py-32"
      data-section="final-cta"
    >
      <div className="container-editorial text-center" data-reveal>
        <p className="label-eyebrow mb-5 text-gold">Exceptional Properties. Elevated Living.</p>
        <h2 className="font-serif text-4xl lg:text-5xl text-balance max-w-3xl mx-auto leading-tight">
          Begin a confidential conversation about your next property.
        </h2>
        <p className="mt-5 text-ivory/70 max-w-prose mx-auto">
          We work with a small number of principals at a time. Reach a senior advisor within one business day.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            as="a"
            href="#contact"
            onClick={handleAnchorClick}
            variant="gold"
            size="lg"
          >
            Request an introduction
          </Button>
          <Button
            as="a"
            href="#properties"
            onClick={handleAnchorClick}
            variant="outline"
            size="lg"
            className="border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal"
          >
            View properties
          </Button>
        </div>
      </div>
    </section>
  );
}
