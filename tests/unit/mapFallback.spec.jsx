import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MapFallback from '../../src/components/map/MapFallback.jsx';
import { properties } from '../../src/data/properties.js';

describe('MapFallback', () => {
  it('renders an accessible list of all six property locations', () => {
    render(
      <MapFallback
        properties={properties}
        selectedPropertyId={null}
        onSelectProperty={() => {}}
      />
    );
    properties.forEach((p) => {
      expect(screen.getByRole('button', { name: new RegExp(p.name) })).toBeInTheDocument();
      expect(screen.getByText(p.location)).toBeInTheDocument();
    });
  });

  it('marks the selected location with aria-pressed', () => {
    const target = properties[0];
    render(
      <MapFallback
        properties={properties}
        selectedPropertyId={target.id}
        onSelectProperty={() => {}}
      />
    );
    const button = screen.getByRole('button', { name: new RegExp(target.name) });
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('invokes onSelectProperty when a location is clicked', async () => {
    const user = userEvent.setup();
    let selected = null;
    render(
      <MapFallback
        properties={properties}
        selectedPropertyId={null}
        onSelectProperty={(id) => {
          selected = id;
        }}
      />
    );
    const button = screen.getByRole('button', { name: /Chartwell Estate/ });
    await user.click(button);
    expect(selected).toBe('chartwell-estate');
  });
});
