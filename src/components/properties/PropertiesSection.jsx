import { useMemo, useState, useEffect, useCallback } from 'react';
import SectionHeading from '../common/SectionHeading.jsx';
import PropertySearch from '../search/PropertySearch.jsx';
import PropertyCard from './PropertyCard.jsx';
import PropertyDetailPanel from './PropertyDetailPanel.jsx';
import EmptyState from './EmptyState.jsx';
import Modal from '../common/Modal.jsx';
import { properties } from '../../data/properties.js';
import { filterProperties, emptyFilters } from '../../utils/filters.js';

export default function PropertiesSection({
  filters,
  onFiltersChange,
  selectedPropertyId,
  onSelectProperty,
  scheduleViewing,
  visibleProperties,
}) {
  const [detailProperty, setDetailProperty] = useState(null);

  const visible = useMemo(
    () => visibleProperties ?? filterProperties(properties, filters ?? emptyFilters()),
    [visibleProperties, filters]
  );

  const resetFilters = useCallback(() => onFiltersChange?.(emptyFilters()), [onFiltersChange]);

  const openDetail = useCallback(
    (property) => {
      setDetailProperty(property);
      onSelectProperty?.(property?.id ?? null);
    },
    [onSelectProperty]
  );

  useEffect(() => {
    if (!selectedPropertyId) return;
    const property = properties.find((p) => p.id === selectedPropertyId);
    if (property) setDetailProperty(property);
  }, [selectedPropertyId]);

  return (
    <section id="properties" className="py-24 lg:py-32 bg-ivory">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Featured Listings"
          title="Six properties currently representing the practice"
          description="A curated selection of residences and commercial addresses available through AURELIS ESTATES. Filter to refine, then open a property for full particulars."
          className="mb-10"
        />

        <PropertySearch
          filters={filters}
          onChange={onFiltersChange}
          onReset={resetFilters}
          resultCount={visible.length}
        />

        {visible.length === 0 ? (
          <div className="mt-10">
            <EmptyState onReset={resetFilters} />
          </div>
        ) : (
          <ul
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            aria-label="Featured properties"
          >
            {visible.map((property) => (
              <li
                key={property.id}
                id={`properties-${property.id}`}
                data-property-card
                data-property-id={property.id}
                aria-selected={selectedPropertyId === property.id}
                data-reveal
              >
                <PropertyCard
                  property={property}
                  schedule={(p) => {
                    openDetail(null);
                    scheduleViewing?.(p);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openDetail(property);
                    }
                  }}
                />
                <button
                  type="button"
                  className="sr-only focus:not-sr-only focus:absolute focus:mt-2 focus:ml-2 focus:bg-charcoal focus:text-ivory focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-label"
                  onClick={() => openDetail(property)}
                  aria-label={`Open ${property.name} details`}
                >
                  Open {property.name} details
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal open={Boolean(detailProperty)} onClose={() => openDetail(null)} labelledBy="property-detail-title">
        {detailProperty && (
          <PropertyDetailPanel
            property={detailProperty}
            onClose={() => openDetail(null)}
            onSchedule={(p, contactOnly) => {
              scheduleViewing?.(p || detailProperty, contactOnly);
              openDetail(null);
            }}
          />
        )}
      </Modal>
    </section>
  );
}
