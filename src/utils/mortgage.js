/**
 * Pure mortgage calculation utilities.
 * Standard fixed-rate mortgage formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
 */

const DEFAULT_ASSUMPTIONS = {
  annualTaxRate: 0.011, // 1.1% of price per year
  annualInsuranceRate: 0.0035, // 0.35% of price per year
  closingCostRate: 0.02, // 2% of price estimated at closing
};

function safeNumber(value) {
  const n = typeof value === 'string' ? parseFloat(value) : value;
  if (typeof n !== 'number' || Number.isNaN(n)) return null;
  return n;
}

/**
 * Validate and normalize calculator inputs.
 * Returns { ok: true, values } or { ok: false, errors }.
 */
export function normalizeCalcInputs({
  price,
  downPayment,
  annualRate,
  termYears,
  hoaMonthly = 0,
}) {
  const errors = {};
  const p = safeNumber(price);
  if (p == null || p <= 0) errors.price = 'Price must be a positive number.';
  const dp = safeNumber(downPayment);
  if (dp == null || dp < 0) errors.downPayment = 'Down payment cannot be negative.';
  if (p != null && dp != null && dp >= p) errors.downPayment = 'Down payment must be less than the price.';
  const rate = safeNumber(annualRate);
  if (rate == null || rate < 0) errors.annualRate = 'Interest rate cannot be negative.';
  const term = safeNumber(termYears);
  if (term == null || term <= 0 || !Number.isInteger(term)) errors.termYears = 'Term must be a positive whole number of years.';
  const hoa = safeNumber(hoaMonthly) ?? 0;
  if (hoa < 0) errors.hoaMonthly = 'HOA cannot be negative.';

  if (!errors.price && !errors.downPayment && p != null && dp != null && dp > p * 0.99 && dp < p) {
    errors.downPayment = 'Down payment must leave a meaningful loan amount.';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }
  return {
    ok: true,
    values: { price: p, downPayment: dp, annualRate: rate, termYears: term, hoaMonthly: hoa },
  };
}

/**
 * Principal and interest payment per month.
 * If rate is 0 or invalid, fall back to interest-free division.
 */
export function monthlyPrincipalInterest(principal, annualRate, termYears) {
  if (principal <= 0) return 0;
  const n = termYears * 12;
  if (n <= 0) return 0;

  if (!annualRate || annualRate <= 0) {
    return principal / n;
  }
  const r = annualRate / 100 / 12;
  const factor = Math.pow(1 + r, n);
  return (principal * (r * factor)) / (factor - 1);
}

/**
 * Down payment percentage helper. Returns 0 when price is invalid.
 */
export function downPaymentPercent(price, downPayment) {
  if (!price || price <= 0) return 0;
  return (downPayment / price) * 100;
}

/**
 * Convert a down-payment percentage to an amount.
 */
export function downPaymentFromPercent(price, percent) {
  if (!price || price <= 0) return 0;
  return (percent / 100) * price;
}

/**
 * Full scenario calculation. Returns all monthly and total figures.
 * @param {object} input
 *   price, downPayment, annualRate, termYears, hoaMonthly,
 *   annualTaxRate, annualInsuranceRate, closingCostRate (optional overrides)
 */
export function calculateMortgage(input) {
  const normalized = normalizeCalcInputs(input);
  if (!normalized.ok) {
    return { ok: false, errors: normalized.errors };
  }
  const { price, downPayment, annualRate, termYears, hoaMonthly } = normalized.values;
  const {
    annualTaxRate = DEFAULT_ASSUMPTIONS.annualTaxRate,
    annualInsuranceRate = DEFAULT_ASSUMPTIONS.annualInsuranceRate,
    closingCostRate = DEFAULT_ASSUMPTIONS.closingCostRate,
  } = input;

  const loanAmount = Math.max(0, price - downPayment);
  const pi = monthlyPrincipalInterest(loanAmount, annualRate, termYears);
  const monthlyTax = (price * annualTaxRate) / 12;
  const monthlyInsurance = (price * annualInsuranceRate) / 12;
  const totalMonthly = pi + monthlyTax + monthlyInsurance + (hoaMonthly || 0);
  const n = termYears * 12;
  const totalInterest = pi * n - loanAmount;
  const cashAtClosing = downPayment + price * closingCostRate;

  return {
    ok: true,
    result: {
      loanAmount,
      monthlyPrincipalInterest: pi,
      monthlyTax,
      monthlyInsurance,
      monthlyHoa: hoaMonthly || 0,
      totalMonthly,
      totalInterest,
      cashAtClosing,
      downPaymentPercent: downPaymentPercent(price, downPayment),
    },
  };
}

export const DEFAULT_MORTGAGE_ASSUMPTIONS = DEFAULT_ASSUMPTIONS;
