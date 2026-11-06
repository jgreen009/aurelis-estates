import { useState } from 'react';
import { MapPin } from 'lucide-react';

// Visually styled waiting state shown while the Mapbox bundle is dynamically imported.
export default function MapLoading() {
  return (
    <div
      className="grid place-items-center aspect-[16/9] w-full bg-ivory border border-charcoal/10 text-charcoal/50 text-sm"
      role="status"
      aria-live="polite"
    >
      <span className="inline-flex items-center gap-2">
        <MapPin size={16} className="text-gold" aria-hidden="true" />
        Loading property map…
      </span>
    </div>
  );
}

export function MapError({ onRetry }) {
  const [retrying, setRetrying] = useState(false);
  return (
    <div
      className="grid place-items-center aspect-[16/9] w-full bg-ivory border border-charcoal/10 text-charcoal/70 text-sm"
      role="alert"
    >
      <div className="text-center">
        <p>The interactive map failed to load.</p>
        <button
          type="button"
          onClick={() => {
            setRetrying(true);
            onRetry?.();
          }}
          disabled={retrying}
          className="mt-4 inline-flex items-center px-4 py-2 border border-charcoal/30 hover:border-charcoal/60 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
        >
          {retrying ? 'Retrying…' : 'Retry'}
        </button>
      </div>
    </div>
  );
}
