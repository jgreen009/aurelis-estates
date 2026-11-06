import { useEffect } from 'react';
import { properties } from '../../data/properties.js';

const listType = 'ItemList';

export function buildPropertyListJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': listType,
    itemListElement: properties.map((property, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: property.name,
        description: property.description,
        category: property.type,
        brand: { '@type': 'Brand', name: 'AURELIS ESTATES' },
        offers: {
          '@type': 'Offer',
          price: property.price,
          priceCurrency: property.currency,
          availability:
            property.status === 'Available'
              ? 'https://schema.org/InStock'
              : property.status === 'Under Offer'
              ? 'https://schema.org/BackOrder'
              : property.status === 'Coming Soon'
              ? 'https://schema.org/PreOrder'
              : 'https://schema.org/SoldOut',
        },
      },
    })),
  };
}

export function injectPropertyListJsonLd() {
  if (typeof document === 'undefined') return;
  const slot = document.querySelector('script[data-seo="property-list"][data-generated="true"]');
  if (!slot) return;
  slot.textContent = JSON.stringify(buildPropertyListJsonLd());
}

export default function SeoMetadata() {
  useEffect(() => {
    injectPropertyListJsonLd();
  }, []);
  return null;
}
