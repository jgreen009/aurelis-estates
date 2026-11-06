import { useState, useRef, useEffect, useCallback, useId } from 'react';

export default function AccessibleTabs({ tabs, activeTab, onChange, idBase: baseProp, className = '' }) {
  const fallbackBase = useId();
  const base = baseProp || fallbackBase;
  const refs = useRef([]);
  const [focused, setFocused] = useState(0);

  const activate = useCallback(
    (index) => {
      onChange(tabs[index].id);
      setFocused(index);
      refs.current[index]?.focus();
    },
    [onChange, tabs]
  );

  const onKeyDown = (e) => {
    const count = tabs.length;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setFocused((f) => (f + 1) % count);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setFocused((f) => (f - 1 + count) % count);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setFocused(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setFocused(count - 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Determine the focused tab from the actual DOM focus, not the closure-captured state,
      // since the user can focus a tab by clicking or via Tab key without updating `focused`.
      const activeEl = document.activeElement;
      const index = refs.current.findIndex((el) => el === activeEl);
      activate(index >= 0 ? index : focused);
    }
  };

  useEffect(() => {
    refs.current[focused]?.focus();
  }, [focused]);

  const tablistId = `${base}-tablist`;

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Contact options"
        id={tablistId}
        className="flex border-b border-charcoal/15"
        onKeyDown={onKeyDown}
      >
        {tabs.map((tab, i) => {
          const selected = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              ref={(el) => (refs.current[i] = el)}
              type="button"
              role="tab"
              id={`${base}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => activate(i)}
              className={[
                'px-5 sm:px-8 py-4 text-xs uppercase tracking-label transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold',
                selected
                  ? 'text-gold border-b-2 border-gold -mb-px'
                  : 'text-charcoal/60 hover:text-charcoal border-b-2 border-transparent',
              ].join(' ')}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => {
        const selected = tab.id === activeTab;
        return (
          <div
            key={tab.id}
            role="tabpanel"
            id={`${base}-panel-${tab.id}`}
            aria-labelledby={`${base}-tab-${tab.id}`}
            tabIndex={0}
            hidden={!selected}
            className={selected ? 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold p-0' : ''}
          >
            {selected ? tab.render() : null}
          </div>
        );
      })}
    </div>
  );
}
