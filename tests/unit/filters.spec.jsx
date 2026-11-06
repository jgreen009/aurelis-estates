import { describe, it, expect } from 'vitest';
import {
  filterProperties,
  isFilterActive,
  validatePriceRange,
  emptyFilters,
} from '../../src/utils/filters.js';
import { properties } from '../../src/data/properties.js';

const ALL = emptyFilters();

describe('property filters', () => {
  it('empty filters return all six properties', () => {
    expect(filterProperties(properties, ALL)).toHaveLength(properties.length);
  });

  it('filters by location', () => {
    const out = filterProperties(properties, { ...ALL, location: 'Bel Air, California' });
    expect(out.length).toBe(1);
    expect(out[0].name).toBe('Chartwell Estate');
  });

  it('filters by property type (Estate / Commercial / etc.)', () => {
    const out = filterProperties(properties, { ...ALL, type: 'Villa' });
    expect(out.length).toBe(1);
    expect(out[0].name).toBe('Villa Serenissima');
  });

  it('filters by minimum price using USD-equivalent comparison', () => {
    const out = filterProperties(properties, { ...ALL, minPrice: String(40_000_000) });
    // Chartwell (72M USD), Crown Tower (48M USD), Auberge du Mont (CHF 22M ≈ 24.86M USD) excluded
    expect(out.length).toBe(2);
    expect(out.map((p) => p.name).sort()).toEqual(['Chartwell Estate', 'Crown Tower Suite']);
  });

  it('filters by maximum price using USD-equivalent comparison', () => {
    const out = filterProperties(properties, { ...ALL, maxPrice: String(30_000_000) });
    // Sapphire 28.5M, One Grosvenor £18.5M ≈ 23.5M, Auberge CHF 22M ≈ 24.86M
    expect(out.length).toBe(3);
    expect(out.map((p) => p.name).sort()).toEqual([
      'Auberge du Mont',
      'One Grosvenor Square',
      'Sapphire Penthouse',
    ]);
  });

  it('combines min and max price into a USD band', () => {
    const out = filterProperties(properties, {
      ...ALL,
      minPrice: String(25_000_000),
      maxPrice: String(60_000_000),
    });
    // Sapphire 28.5M, Chartwell 72M out (top), Crown 48M, Auberge 24.86M out (below), One Grosvenor 23.5M out (below), Villa 34M
    expect(out.map((p) => p.name).sort()).toEqual(['Crown Tower Suite', 'Sapphire Penthouse', 'Villa Serenissima']);
  });

  it('reports min/max inversion as invalid', () => {
    expect(validatePriceRange({ minPrice: '5000000', maxPrice: '1000000' }).valid).toBe(false);
    expect(validatePriceRange({ minPrice: '1000000', maxPrice: '5000000' }).valid).toBe(true);
    expect(validatePriceRange(emptyFilters()).valid).toBe(true);
  });

  it('bedroom filter shows properties with N or more bedrooms', () => {
    const out = filterProperties(properties, { ...ALL, bedrooms: '8' });
    // Chartwell (9) and Villa Serenissima (8) only
    expect(out.map((p) => p.name).sort()).toEqual(['Chartwell Estate', 'Villa Serenissima']);
  });

  it('bedroom filter excludes zero-bedroom commercial listings unless "all"', () => {
    const out = filterProperties(properties, { ...ALL, bedrooms: '1' });
    expect(out.every((p) => p.bedrooms >= 1)).toBe(true);
    expect(out.some((p) => p.name === 'Crown Tower Suite')).toBe(false);
  });

  it('reset filters restores the full set', () => {
    const filtered = filterProperties(properties, { ...ALL, type: 'Estate' });
    expect(filtered.length).toBeLessThan(properties.length);
    const reset = filterProperties(properties, emptyFilters());
    expect(reset).toHaveLength(properties.length);
  });

  it('empty-result state activates with an over-constrained filter set', () => {
    const out = filterProperties(properties, {
      ...ALL,
      location: 'Bel Air, California',
      type: 'Villa',
    });
    expect(out).toHaveLength(0);
  });

  it('isFilterActive distinguishes empty from active state', () => {
    expect(isFilterActive(ALL)).toBe(false);
    expect(isFilterActive(emptyFilters())).toBe(false);
    expect(isFilterActive({ ...ALL, type: 'Estate' })).toBe(true);
    expect(isFilterActive({ ...ALL, minPrice: '5000000' })).toBe(true);
    expect(isFilterActive({ ...ALL, bedrooms: '3' })).toBe(true);
  });
});
