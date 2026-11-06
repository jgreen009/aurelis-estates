import { MapPin } from 'lucide-react';

export default function MapFallback({ properties, selectedPropertyId, onSelectProperty }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-charcoal/10" role="region" aria-label="Property locations (text fallback)">
      {properties.map((property) => {
        const selected = selectedPropertyId === property.id;
        return (
          <button
            key={property.id}
            type="button"
            onClick={() => onSelectProperty?.(property.id)}
            className={[
              'text-left bg-ivory p-5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold transition-colors',
              selected ? 'ring-2 ring-gold bg-white' : '',
            ].join(' ')}
            aria-current={selected ? 'true' : 'false'}
            aria-pressed={selected}
          >
            <p className="label-eyebrow mb-2">{property.type}</p>
            <p className="font-serif text-xl text-charcoal">{property.name}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-charcoal/70">
              <MapPin size={14} className="text-gold" aria-hidden="true" />
              {property.location}
            </p>
            <p className="mt-2 text-xs text-charcoal/60">
              {property.coordinates.lat.toFixed(4)}, {property.coordinates.lng.toFixed(4)}
            </p>
          </button>
        );
      })}
    </div>
  );
}
