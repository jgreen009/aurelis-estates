export default function EmptyState({ onReset }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center text-center px-6 py-16 bg-white border border-dashed border-charcoal/15"
    >
      <p className="label-eyebrow mb-3">No results</p>
      <p className="font-serif text-2xl text-charcoal">No properties match your filters</p>
      <p className="mt-3 max-w-prose text-charcoal/70">
        Try widening the price range, removing the bedroom requirement, or resetting every filter.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center justify-center min-h-[44px] px-5 text-xs uppercase tracking-label border border-charcoal/30 hover:border-charcoal/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
      >
        Reset all filters
      </button>
    </div>
  );
}
