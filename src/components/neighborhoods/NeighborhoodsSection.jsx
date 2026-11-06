import SectionHeading from '../common/SectionHeading.jsx';
import PictureImage from '../common/PictureImage.jsx';
import { neighborhoods } from '../../data/content.js';

function NeighborhoodVisual({ area, className = '' }) {
  return (
    <PictureImage
      base={area.imageBase}
      widths={[800, 400]}
      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
      alt={area.imageAlt || area.name}
      width={800}
      height={533}
      loading="lazy"
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
    />
  );
}

export default function NeighborhoodsSection() {
  return (
    <section id="neighborhoods" className="py-24 lg:py-32 bg-charcoal text-ivory">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Neighborhoods"
          title="Markets we know well and represent often"
          description="A globally-consistent standard of representation across the cities our principals move between."
          invert
          className="mb-12"
        />
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {neighborhoods.map((area) => (
            <li key={area.id} className="flex flex-col" data-reveal>
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-graphite">
                <NeighborhoodVisual area={area} />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-10 bg-gold" aria-hidden="true" />
                    <span className="font-serif text-lg lg:text-xl text-ivory">{area.name}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="prose-body text-xs uppercase tracking-label text-gold/90">{area.region}</p>
                <p className="prose-body mt-2 text-sm text-ivory/70 leading-relaxed">{area.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
