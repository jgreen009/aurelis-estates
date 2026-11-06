import { Suspense, lazy } from 'react';
import SectionHeading from '../common/SectionHeading.jsx';
import MapFallback from './MapFallback.jsx';
import { hasMapboxToken } from '../../lib/env.js';

const MapContainer = lazy(() => import('./MapContainer.jsx'));

export default function MapSection({ visibleProperties, selectedPropertyId, onSelectProperty }) {
  return (
    <section id="map" className="py-24 lg:py-32 bg-ivory" aria-label="Property map">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Map"
          title="A mapped view of every residence"
          description={
            hasMapboxToken
              ? 'Select a marker or a card to focus a listing. Filters above refine both views.'
              : 'No Mapbox token is configured. An accessible list of all property locations is shown below. Configure VITE_MAPBOX_TOKEN to enable the interactive map.'
          }
          className="mb-10"
        />

        {hasMapboxToken ? (
          <Suspense fallback={<MapFallbackLoading />}>
            <MapContainer
              properties={visibleProperties}
              selectedPropertyId={selectedPropertyId}
              onSelectProperty={onSelectProperty}
            />
          </Suspense>
        ) : (
          <MapFallback
            properties={visibleProperties}
            selectedPropertyId={selectedPropertyId}
            onSelectProperty={onSelectProperty}
          />
        )}
      </div>
    </section>
  );
}

function MapFallbackLoading() {
  return (
    <div className="grid place-items-center aspect-[16/9] w-full bg-ivory border border-charcoal/10 text-charcoal/50 text-sm" role="status">
      Loading property map…
    </div>
  );
}
