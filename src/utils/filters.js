/**
 * Pure property filtering for the PropertiesSection map state.
 */

const DEFAULT_FILTERS = {
  location: 'all',
  type: 'all',
  minPrice: '',
  maxPrice: '',
  bedrooms: 'all',
};

export const emptyFilters = () => ({ ...DEFAULT_FILTERS });

const bedroomOptions = ['all', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const BEDROOM_FILTER_OPTIONS = bedroomOptions.map((value) => ({
  value,
  label: value === 'all' ? 'Any beds' : `${value}+`,
}));

export function isFilterActive(filters) {
  if (!filters) return false;
  return Object.keys(DEFAULT_FILTERS).some(
    (key) => filters[key] !== 'all' && filters[key] !== '' && filters[key] != null
  );
}

function parsePrice(value, { fallback = null } = {}) {
  if (value == null || value === '') return fallback;
  const n = typeof value === 'string' ? parseFloat(value) : value;
  return typeof n === 'number' && !Number.isNaN(n) && n >= 0 ? n : fallback;
}

const USD_TO_USD = 1;
const GBP_TO_USD = 1.27;
const CHF_TO_USD = 1.13;
const USD_EQUIV = {
  USD: USD_TO_USD,
  GBP: GBP_TO_USD,
  CHF: CHF_TO_USD,
  EUR: 1.08,
};

function priceInUSD(property) {
  return property.price * (USD_EQUIV[property.currency] ?? 1);
}

/**
 * Filter properties by the user-selected filters.
 * Filters price in USD-equivalent terms to keep multi-currency listings comparable.
 * Bedrooms filter: show properties with N or more bedrooms.
 *   For commercial listings with zero bedrooms, the bedroom filter shows them only when "all".
 */
export function filterProperties(properties, filters) {
  if (!Array.isArray(properties)) return [];
  const f = filters || DEFAULT_FILTERS;

  const minPrice = parsePrice(f.minPrice, { fallback: null });
  const maxPrice = parsePrice(f.maxPrice, { fallback: null });

  return properties.filter((property) => {
    if (f.location !== 'all' && property.location !== f.location) return false;

    if (f.type !== 'all' && property.type !== f.type) return false;

    const usdPrice = priceInUSD(property);
    if (minPrice != null && usdPrice < minPrice) return false;
    if (maxPrice != null && usdPrice > maxPrice) return false;

    if (f.bedrooms !== 'all') {
      const wanted = parseInt(f.bedrooms, 10);
      if (Number.isNaN(wanted)) return true;
      if (property.bedrooms == null) return false;
      if (property.bedrooms < wanted) return false;
    }

    return true;
  });
}

/**
 * Validate that a user's min/max price inputs do not contradict each other.
 */
export function validatePriceRange(filters) {
  const min = parsePrice(filters?.minPrice, { fallback: null });
  const max = parsePrice(filters?.maxPrice, { fallback: null });
  if (min != null && max != null && min > max) {
    return { valid: false, message: 'Minimum price cannot exceed maximum price.' };
  }
  return { valid: true };
}
