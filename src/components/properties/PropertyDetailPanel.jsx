import { X, MapPin, BedDouble, Bath, Maximize, Calendar, Car, Check } from 'lucide-react';
import Button from '../common/Button.jsx';
import PropertyMapEmbed from '../map/PropertyMapEmbed.jsx';
import { formatCurrency, formatArea } from '../../utils/format.js';

export default function PropertyDetailPanel({ property, onClose, onSchedule }) {
  if (!property) return null;
  const {
    name,
    location,
    type,
    price,
    currency,
    isFromPrice,
    bedrooms,
    bathrooms,
    livingArea,
    yearBuilt,
    parkingSpots,
    status,
    description,
    features,
    amenities,
    agentNotes,
  } = property;

  return (
    <div className="flex flex-col">
      <header className="flex items-start justify-between gap-4 p-6 lg:p-8 bg-charcoal text-ivory">
        <div>
          <p className="label-eyebrow">{type}</p>
          <h2 id="property-detail-title" className="mt-2 font-serif text-3xl lg:text-4xl text-balance">
            {name}
          </h2>
          <p className="mt-2 inline-flex items-center gap-1.5 text-ivory/80">
            <MapPin size={14} className="text-gold" aria-hidden="true" />
            {location}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center w-12 h-12 -mr-2 text-ivory/80 hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          aria-label="Close property details"
        >
          <X size={22} />
        </button>
      </header>

      <div className="relative w-full bg-graphite" aria-label={`${name} location map`}>
        <PropertyMapEmbed property={property} />
      </div>

      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-label text-charcoal/50">
                {isFromPrice ? 'From' : 'Listed price'}
              </p>
              <p className="font-serif text-3xl text-charcoal">{formatCurrency(price, currency)}</p>
            </div>
            <span className="text-[10px] uppercase tracking-label border border-charcoal/15 px-2 py-1 text-charcoal/80">
              {status}
            </span>
          </div>

          <p className="text-charcoal/80 leading-relaxed text-pretty">{description}</p>

          <div>
            <h3 className="font-serif text-xl text-charcoal mb-3">Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-charcoal/80">
                  <Check size={16} className="text-gold mt-0.5 shrink-0" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {amenities && amenities.length > 0 && (
            <div>
              <h3 className="font-serif text-xl text-charcoal mb-3">Amenities</h3>
              <ul className="flex flex-wrap gap-2">
                {amenities.map((a) => (
                  <li
                    key={a}
                    className="text-[11px] uppercase tracking-label border border-charcoal/15 px-3 py-1.5 text-charcoal/80"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {agentNotes && (
            <div className="border-l-2 border-gold pl-4 py-2">
              <p className="text-[11px] uppercase tracking-label text-charcoal/50 mb-2">Agent notes</p>
              <p className="text-sm text-charcoal/80 italic">{agentNotes}</p>
            </div>
          )}
        </div>

        <aside className="bg-white border border-charcoal/10 p-5">
          <h3 className="font-serif text-xl text-charcoal mb-4">Property particulars</h3>
          <dl className="grid grid-cols-2 gap-y-4 gap-x-3 text-sm">
            <SpecItem icon={<BedDouble size={16} />} label="Bedrooms" value={bedrooms > 0 ? bedrooms : '—'} />
            <SpecItem icon={<Bath size={16} />} label="Bathrooms" value={bathrooms} />
            <SpecItem icon={<Maximize size={16} />} label="Living area" value={formatArea(livingArea)} />
            <SpecItem icon={<Calendar size={16} />} label="Year built" value={yearBuilt} />
            <SpecItem icon={<Car size={16} />} label="Parking" value={parkingSpots} />
          </dl>

          <div className="mt-6 flex flex-col gap-3">
            <Button
              as="button"
              type="button"
              variant="gold"
              size="md"
              className="w-full"
              onClick={onSchedule}
            >
              Schedule a viewing
            </Button>
            <Button
              as="a"
              href="#contact"
              onClick={() => {
                onClose();
                onSchedule(null, true);
              }}
              variant="outline"
              size="md"
              className="w-full"
            >
              Enquire
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SpecItem({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-label text-charcoal/50">
        <span className="text-gold" aria-hidden="true">{icon}</span>
        {label}
      </dt>
      <dd className="text-charcoal">{value}</dd>
    </div>
  );
}
