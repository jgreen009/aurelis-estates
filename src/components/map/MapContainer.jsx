import { useEffect, useRef, useState } from 'react';
import { mapboxToken } from '../../lib/env.js';
import MapLoading, { MapError } from './MapLoading.jsx';

let mapboxPromise = null;

function loadMapbox() {
  if (mapboxPromise) return mapboxPromise;
  mapboxPromise = import('mapbox-gl')
    .then((mod) => {
      const mapboxgl = mod.default || mod;
      if (mapboxToken) mapboxgl.accessToken = mapboxToken;
      // Inject Mapbox CSS (Vite handles CSS side-effect imports).
      import('mapbox-gl/dist/mapbox-gl.css').catch(() => {});
      return mapboxgl;
    })
    .catch((err) => {
      mapboxPromise = null;
      throw err;
    });
  return mapboxPromise;
}

export default function MapContainer({ properties, selectedPropertyId, onSelectProperty }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef(new Map());
  const mapboxRef = useRef(null);
  const [status, setStatus] = useState('loading');

  const onSelectRef = useRef(onSelectProperty);
  useEffect(() => {
    onSelectRef.current = onSelectProperty;
  }, [onSelectProperty]);

  useEffect(() => {
    if (!containerRef.current || !mapboxToken) return undefined;
    let cancelled = false;

    loadMapbox()
      .then((mapboxgl) => {
        if (cancelled || !containerRef.current) return;
        mapboxRef.current = mapboxgl;

        const map = new mapboxgl.Map({
          container: containerRef.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [0, 25],
          zoom: 1.5,
          cooperativeGestures: true,
        });
        mapRef.current = map;

        map.on('load', () => {
          if (cancelled) return;
          setStatus('ready');
          syncMarkers();
          flyToSelection();
        });

        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    const capturedMarkers = markersRef.current;
    const capturedMap = () => mapRef.current;
    return () => {
      cancelled = true;
      // Cleanup markers and map instance (markers store holds external DOM nodes, not React-managed).
      capturedMarkers.forEach((marker) => marker?.remove?.());
      capturedMarkers.clear();
      const map = capturedMap();
      map?.remove?.();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-sync markers whenever the property list changes (filters).
  useEffect(() => {
    if (status !== 'ready' || !mapRef.current || !mapboxRef.current) return undefined;
    syncMarkers();
    flyToSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties, status]);

  // Fly to a selected property.
  useEffect(() => {
    if (status !== 'ready' || !mapRef.current) return;
    const sel = properties.find((p) => p.id === selectedPropertyId);
    if (sel) {
      flyToProperty(sel);
    }
    // Update marker visual state.
    markersRef.current.forEach((marker, id) => {
      const el = marker?.getElement?.();
      if (!el) return;
      el.setAttribute('aria-selected', id === selectedPropertyId ? 'true' : 'false');
      el.classList.toggle('aurelis-marker-selected', id === selectedPropertyId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPropertyId, status, properties]);

  function syncMarkers() {
    const mapboxgl = mapboxRef.current;
    const map = mapRef.current;
    if (!mapboxgl || !map) return;

    // Remove obsolete markers
    const next = new Set(properties.map((p) => p.id));
    markersRef.current.forEach((marker, id) => {
      if (!next.has(id)) {
        marker?.remove?.();
        markersRef.current.delete(id);
      }
    });

    properties.forEach((property) => {
      const existing = markersRef.current.get(property.id);
      if (existing) return;
      const el = document.createElement('button');
      el.type = 'button';
      el.title = property.name;
      el.setAttribute('aria-label', `Show ${property.name} on the listings`);
      el.className =
        'aurelis-marker grid place-items-center w-8 h-8 rounded-full bg-charcoal text-ivory border border-gold/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold';
      el.setAttribute('data-property-id', property.id);
      el.addEventListener('click', () => onSelectRef.current?.(property.id));

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([property.coordinates.lng, property.coordinates.lat])
        .addTo(map);
      markersRef.current.set(property.id, marker);
    });
  }

  function flyToSelection() {
    if (selectedPropertyId) {
      const sel = properties.find((p) => p.id === selectedPropertyId);
      if (sel) flyToProperty(sel);
    }
  }

  function flyToProperty(property) {
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center: [property.coordinates.lng, property.coordinates.lat],
      zoom: 10,
      duration: 1200,
      essential: true,
    });
  }

  if (status === 'error') return <MapError onRetry={() => setStatus('loading')} />;
  if (status === 'loading') return <MapLoading />;

  return (
    <div className="relative">
      <div ref={containerRef} className="aspect-[16/9] w-full bg-ivory" role="region" aria-label="Interactive property map" />
    </div>
  );
}
