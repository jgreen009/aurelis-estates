import { Children, cloneElement } from 'react';
import { LOCATIONS, PROPERTY_TYPES } from '../../data/properties.js';
import { BEDROOM_FILTER_OPTIONS, validatePriceRange } from '../../utils/filters.js';

function Field({ id, label, children, hint, error }) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const child = Children.only(children);
  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <label htmlFor={id} className="text-[11px] uppercase tracking-label text-charcoal/60">
        {label}
      </label>
      {cloneElement(child, {
        id,
        'aria-describedby': describedBy,
      })}
      {hint && (
        <p id={`${id}-hint`} className="text-[11px] text-charcoal/50">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[11px] text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  'w-full min-h-[44px] bg-white border border-charcoal/15 px-3 py-2 text-sm text-charcoal placeholder:text-charcoal/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold';

export default function PropertySearch({ filters, onChange, onReset, resultCount }) {
  const range = validatePriceRange(filters);
  const rangeError = range.valid ? null : range.message;

  const update = (key) => (e) => {
    onChange({ ...filters, [key]: e.target.value });
  };

  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4 p-5 lg:p-6 bg-white border border-charcoal/10 shadow-card"
      aria-label="Filter properties"
    >
      <Field id="filter-location" label="Location">
        <select
          id="filter-location"
          value={filters.location}
          onChange={update('location')}
          className={inputClass}
        >
          <option value="all">Any location</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </Field>

      <Field id="filter-type" label="Property type">
        <select id="filter-type" value={filters.type} onChange={update('type')} className={inputClass}>
          <option value="all">Any type</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <Field id="filter-min" label="Minimum price (USD)" error={rangeError}>
        <input
          id="filter-min"
          type="number"
          inputMode="numeric"
          min="0"
          step="100000"
          placeholder="No min"
          value={filters.minPrice}
          onChange={update('minPrice')}
          className={inputClass}
        />
      </Field>

      <Field id="filter-max" label="Maximum price (USD)" error={rangeError}>
        <input
          id="filter-max"
          type="number"
          inputMode="numeric"
          min="0"
          step="100000"
          placeholder="No max"
          value={filters.maxPrice}
          onChange={update('maxPrice')}
          className={inputClass}
        />
      </Field>

      <Field id="filter-beds" label="Bedrooms">
        <select id="filter-beds" value={filters.bedrooms} onChange={update('bedrooms')} className={inputClass}>
          {BEDROOM_FILTER_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="flex flex-col gap-1.5 lg:justify-end">
        <span className="text-[11px] uppercase tracking-label text-charcoal/60 lg:invisible" aria-hidden="true">
          Actions
        </span>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center min-h-[44px] px-5 text-xs uppercase tracking-label border border-charcoal/15 hover:border-charcoal/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            Reset
          </button>
          <div className="inline-flex items-center justify-center min-h-[44px] px-4 text-xs uppercase tracking-label border border-charcoal/10 text-charcoal/70 bg-ivory">
            {resultCount} {resultCount === 1 ? 'match' : 'matches'}
          </div>
        </div>
      </div>
    </form>
  );
}
