const currencySymbols = { USD: '$', GBP: '£', CHF: 'CHF ', EUR: '€' };

export function formatCurrency(amount, currency = 'USD', { compact = false } = {}) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return '—';
  const symbol = currencySymbols[currency] ?? '';

  if (compact && Math.abs(amount) >= 1_000_000) {
    const v = amount / 1_000_000;
    const formatted = v % 1 === 0 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, '');
    return `${symbol}${formatted}M`;
  }
  if (compact && Math.abs(amount) >= 1_000) {
    const v = amount / 1_000;
    const formatted = v % 1 === 0 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, '');
    return `${symbol}${formatted}K`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace(/^/, symbol);
}

export function formatPercent(value, { digits = 2 } = {}) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '—';
  return `${value.toFixed(digits)}%`;
}

export function formatNumber(value, { digits = 0 } = {}) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatArea(sqft) {
  if (typeof sqft !== 'number' || Number.isNaN(sqft)) return '—';
  return `${new Intl.NumberFormat('en-US').format(sqft)} sq ft`;
}
