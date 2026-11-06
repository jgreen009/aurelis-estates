export const PROPERTY_TYPES = [
  'Penthouse',
  'Estate',
  'Villa',
  'New Development',
  'Commercial',
  'Private Residence',
];

export const LISTING_STATUSES = ['Available', 'Under Offer', 'Sold', 'Coming Soon'];

export const LOCATIONS = [
  'Financial District, Manhattan, New York',
  'Bel Air, California',
  'Lake Como, Lombardy, Italy',
  'Mayfair, London, United Kingdom',
  'Dubai Marina, Dubai, UAE',
  'Gstaad, Bernese Oberland, Switzerland',
];

export const properties = [
  {
    id: 'sapphire-penthouse',
    name: 'Sapphire Penthouse',
    location: 'Financial District, Manhattan, New York',
    city: 'New York',
    country: 'United States',
    type: 'Penthouse',
    imageBase: 'properties/sapphire-penthouse',
    imageAlt:
      'Sapphire Penthouse — a Manhattan penthouse interior with floor-to-ceiling windows overlooking the Financial District skyline.',
    price: 28500000,
    currency: 'USD',
    isFromPrice: false,
    bedrooms: 5,
    bathrooms: 6,
    livingArea: 6200,
    yearBuilt: 2021,
    parkingSpots: 3,
    status: 'Available',
    coordinates: { lat: 40.7081, lng: -74.0096 },
    description:
      'A vertical residence crowning the Financial District with panoramic views of the harbor, the city skyline and the rivers beyond. Floor-to-ceiling glass and European limestone define a serene volume above the city.',
    features: [
      'Private elevator landing',
      '360-degree wraparound terrace',
      'Chef kitchen by Molteni&C',
      'Primary suite with dual baths',
      'Smart-home automation',
      'Three deeded parking spaces',
    ],
    amenities: ['Concierge', 'Sky lounge', 'Wine cellar', 'Fitness center'],
    agentNotes:
      'Direct elevator access opens into a gallery foyer. The living volume faces south and east; primary suite faces west. Annual carrying costs approximately $264,000.',
  },
  {
    id: 'chartwell-estate',
    name: 'Chartwell Estate',
    location: 'Bel Air, California',
    city: 'Los Angeles',
    country: 'United States',
    type: 'Estate',
    imageBase: 'properties/chartwell-estate',
    imageAlt:
      'Chartwell Estate — a Bel Air mansion exterior with a formal motor court and manicured lawn.',
    price: 72000000,
    currency: 'USD',
    isFromPrice: false,
    bedrooms: 9,
    bathrooms: 12,
    livingArea: 25000,
    yearBuilt: 2019,
    parkingSpots: 14,
    status: 'Available',
    coordinates: { lat: 34.0928, lng: -118.4487 },
    description:
      'A gated Bel Air compound set on approximately four usable acres, organized around a long reflecting pool and a south-facing motor court. The interiors reference California modernism with bespoke millwork throughout.',
    features: [
      'Four-acre gated parcel',
      '81-foot infinity-edge pool',
      'Two-lane bowling alley',
      'Screening theatre',
      'Wine cellar with capacity for 6,500 bottles',
      'Auto gallery for fourteen cars',
    ],
    amenities: ['Guest house', 'Spa', 'Massage room', 'Outdoor kitchen', 'Tennis court'],
    agentNotes:
      'Offered turnkey with designer furnishings excluding selected art. Owned solar array covers the majority of peak demand.',
  },
  {
    id: 'villa-serenissima',
    name: 'Villa Serenissima',
    location: 'Lake Como, Lombardy, Italy',
    city: 'Lake Como',
    country: 'Italy',
    type: 'Villa',
    imageBase: 'properties/villa-serenissima',
    imageAlt:
      'Villa Serenissima — a Lake Como villa with formal gardens descending to a private boathouse.',
    price: 34000000,
    currency: 'USD',
    isFromPrice: false,
    bedrooms: 8,
    bathrooms: 9,
    livingArea: 14000,
    yearBuilt: 1893,
    parkingSpots: 6,
    status: 'Under Offer',
    coordinates: { lat: 46.0161, lng: 9.2496 },
    description:
      'A nineteenth-century lakefront villa restored to museum-grade standards, with formal gardens descending to a private boathouse on the western shore of Lake Como.',
    features: [
      'Private lakefront with boathouse',
      'Formal Italian gardens',
      'Original fresco restoration',
      'Chapel on the grounds',
      'Staff apartment',
      'Climate-controlled wine grotto',
    ],
    amenities: ['Boathouse', 'Greenhouse', 'Lemon house', 'Helipad access nearby'],
    agentNotes:
      'Restoration was completed under soprintendenza supervision. Plans for an attached wellness pavilion are pre-approved.',
  },
  {
    id: 'one-grosvenor-square',
    name: 'One Grosvenor Square',
    location: 'Mayfair, London, United Kingdom',
    city: 'London',
    country: 'United Kingdom',
    type: 'New Development',
    imageBase: 'properties/one-grosvenor-square',
    imageAlt:
      'One Grosvenor Square — a restored Portland Stone facade on Mayfair’s eastern side.',
    price: 18500000,
    currency: 'GBP',
    isFromPrice: true,
    bedrooms: 4,
    bathrooms: 4,
    livingArea: 4800,
    yearBuilt: 2025,
    parkingSpots: 1,
    status: 'Coming Soon',
    coordinates: { lat: 51.5123, lng: -0.1504 },
    description:
      'A new collection of residences on the eastern side of Grosvenor Square, behind the restored Portland Stone facade of a landmarked building. Each residence is configured as a full-floor home.',
    features: [
      'Full-floor configurations',
      '24-hour dedicated concierge',
      'Resident wellness suite with pool',
      'Private wine storage',
      'Underground parking with EV charging',
      'Hotel-grade linen and turndown service',
    ],
    amenities: ['Residents lounge', 'Business suite', 'Screening room', 'Treatment rooms'],
    agentNotes:
      'Pricing starts at the listed level for the lower floors. Upper floors are released by application. Solicitor introductions available.',
  },
  {
    id: 'crown-tower-suite',
    name: 'Crown Tower Suite',
    location: 'Dubai Marina, Dubai, UAE',
    city: 'Dubai',
    country: 'United Arab Emirates',
    type: 'Commercial',
    imageBase: 'properties/crown-tower-suite',
    imageAlt:
      'Crown Tower Suite — the Dubai Marina skyline with the tower crowning the waterfront.',
    price: 48000000,
    currency: 'USD',
    isFromPrice: false,
    bedrooms: 0,
    bathrooms: 4,
    livingArea: 12500,
    yearBuilt: 2023,
    parkingSpots: 8,
    status: 'Available',
    coordinates: { lat: 25.081, lng: 55.1398 },
    description:
      'A full commercial floor at the crown of a Dubai Marina tower, configured as a private business environment with meeting suites, a boardroom and an executive lounge facing the marina.',
    features: [
      'Full-floor commercial title',
      'Double-height executive boardroom',
      'Private express elevator',
      'Hospitality kitchen',
      'Integrated AV and conferencing',
      'Premium marina signage rights',
    ],
    amenities: ['Sky lobby', 'Driver room', 'Mechanical floor access', 'Rooftop helipad access'],
    agentNotes:
      'Title is held as a commercial floor. Freehold rights. Existing fit-out available for assumption or removal.',
  },
  {
    id: 'auberge-du-mont',
    name: 'Auberge du Mont',
    location: 'Gstaad, Bernese Oberland, Switzerland',
    city: 'Gstaad',
    country: 'Switzerland',
    type: 'Private Residence',
    imageBase: 'properties/auberge-du-mont',
    imageAlt:
      'Auberge du Mont — a Gstaad chalet with south-facing terrace and alpine plateau views.',
    price: 22000000,
    currency: 'CHF',
    isFromPrice: false,
    bedrooms: 6,
    bathrooms: 7,
    livingArea: 8200,
    yearBuilt: 2017,
    parkingSpots: 4,
    status: 'Available',
    coordinates: { lat: 46.4747, lng: 7.2869 },
    description:
      'A chalet residence above the village of Gstaad, with south-facing views over the Saanenland plateau. Construction pairs old-world timber joinery with passive-house performance.',
    features: [
      'South-facing terrace and hot tub',
      'Ski room with boot warmers',
      'Wine room for 2,000 bottles',
      'Spa with sauna, steam and plunge',
      'Staff annexe with separate access',
      'Heated driveway and walkways',
    ],
    amenities: ['Cinema room', 'Children lounge', 'Boot room', 'Fireplace lounge'],
    agentNotes:
      'Annual municipal taxes approximately CHF 37,000. Sold furnished excluding selected art and personal effects.',
  },
];

export const getPropertyById = (id) => properties.find((p) => p.id === id);

// Convenience URL for the default (largest webp) property image. Used by
// fallback paths only; components should compose a responsive <picture> via
// src/lib/media.js using `property.imageBase` for proper srcset/format negotiation.
export const propertyImage = (id) => `/media/properties/${id}-1200.webp`;
