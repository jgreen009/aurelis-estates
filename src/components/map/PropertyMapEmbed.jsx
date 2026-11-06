import { MapPin } from 'lucide-react';

function buildOsmUrl(coordinates) {
  if (!coordinates) return null;
  const { lat, lng } = coordinates;
  const d = 0.006;
  const bbox = `${lng - d},${lat - d},${lng + d},${lat + d}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
}

function buildOsmLink(coordinates) {
  if (!coordinates) return null;
  const { lat, lng } = coordinates;
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`;
}

export default function PropertyMapEmbed({ property }) {
  if (!property?.coordinates) return null;

  const embedUrl = buildOsmUrl(property.coordinates);
  const linkUrl = buildOsmLink(property.coordinates);

  return (
    <div className="relative w-full aspect-[16/9] bg-graphite overflow-hidden">
      <iframe
        title={`Map showing ${property.name} in ${property.location}`}
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin allow-popups"
        className="absolute inset-0 w-full h-full border-0"
      />

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-4 flex items-end justify-between pointer-events-none">
        <div className="flex items-center gap-2 text-ivory text-sm pointer-events-auto">
          <MapPin size={14} className="text-gold shrink-0" aria-hidden="true" />
          <span>{property.location}</span>
        </div>
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-label text-ivory/60 hover:text-ivory transition-colors pointer-events-auto"
        >
          Open in map
        </a>
      </div>
    </div>
  );
}
