import { describe, it, expect } from 'vitest';
import {
  calculateMortgage,
  monthlyPrincipalInterest,
  downPaymentPercent,
  downPaymentFromPercent,
} from '../../src/utils/mortgage.js';

describe('mortgage utilities', () => {
  it('returns a known principal-and-interest payment', () => {
    const pi = monthlyPrincipalInterest(1_000_000, 6, 30);
    expect(pi).toBeCloseTo(5995.51, 1);
  });

  it('handles zero interest rate as straight-line division', () => {
    const pi = monthlyPrincipalInterest(120_000, 0, 10);
    expect(pi).toBeCloseTo(1000, 5);
  });

  it('returns 0 PI when principal is non-positive', () => {
    expect(monthlyPrincipalInterest(0, 6, 30)).toBe(0);
    expect(monthlyPrincipalInterest(-50_000, 6, 30)).toBe(0);
  });

  it('rejects a non-positive term', () => {
    expect(monthlyPrincipalInterest(200_000, 5, 0)).toBe(0);
  });

  it('converts a down payment amount to percentage and back', () => {
    const pct = downPaymentPercent(1_000_000, 200_000);
    expect(pct).toBeCloseTo(20, 5);
    expect(downPaymentFromPercent(1_000_000, pct)).toBeCloseTo(200_000, 2);
  });

  it('downPaymentPercent returns 0 when price is invalid', () => {
    expect(downPaymentPercent(0, 100_000)).toBe(0);
    expect(downPaymentPercent(null, 100_000)).toBe(0);
  });

  it('rejects invalid inputs in calculateMortgage', () => {
    const invalid = calculateMortgage({ price: -1, downPayment: 0, annualRate: 5, termYears: 30 });
    expect(invalid.ok).toBe(false);
    expect(invalid.errors.price).toBeDefined();
  });

  it('prevents a down payment equal to or exceeding the price', () => {
    const a = calculateMortgage({ price: 1_000_000, downPayment: 1_000_000, annualRate: 5, termYears: 30 });
    expect(a.ok).toBe(false);
    expect(a.errors.downPayment).toBeDefined();

    const b = calculateMortgage({ price: 1_000_000, downPayment: 1_500_000, annualRate: 5, termYears: 30 });
    expect(b.ok).toBe(false);
    expect(b.errors.downPayment).toBeDefined();
  });

  it('produces full scenario figures for valid inputs', () => {
    const out = calculateMortgage({
      price: 2_000_000,
      downPayment: 400_000,
      annualRate: 6,
      termYears: 30,
      hoaMonthly: 250,
    });
    expect(out.ok).toBe(true);
    expect(out.result.monthlyPrincipalInterest).toBeCloseTo(9592.8, 1);
    expect(out.result.loanAmount).toBe(1_600_000);
    expect(out.result.totalMonthly).toBeGreaterThan(out.result.monthlyPrincipalInterest);
    expect(out.result.totalInterest).toBeGreaterThan(0);
    expect(out.result.cashAtClosing).toBeGreaterThan(400_000);
    expect(out.result.downPaymentPercent).toBeCloseTo(20, 5);
  });

  it('computes monthly tax from the annual tax rate assumption', () => {
    const out = calculateMortgage({
      price: 2_000_000,
      downPayment: 400_000,
      annualRate: 6,
      termYears: 30,
      annualTaxRate: 0.011,
    });
    expect(out.ok).toBe(true);
    // (0.011 of 2,000,000) / 12 = 1,833.33
    expect(out.result.monthlyTax).toBeCloseTo(1833.33, 1);
  });

  it('computes monthly insurance from the annual insurance rate', () => {
    const out = calculateMortgage({
      price: 2_000_000,
      downPayment: 400_000,
      annualRate: 6,
      termYears: 30,
      annualInsuranceRate: 0.0035,
    });
    expect(out.ok).toBe(true);
    // (0.0035 of 2,000,000) / 12 = 583.33
    expect(out.result.monthlyInsurance).toBeCloseTo(583.33, 1);
  });

  it('adds monthly HOA to the total monthly payment', () => {
    const out = calculateMortgage({
      price: 2_000_000,
      downPayment: 400_000,
      annualRate: 6,
      termYears: 30,
      hoaMonthly: 250,
    });
    expect(out.ok).toBe(true);
    expect(out.result.monthlyHoa).toBe(250);
    expect(out.result.totalMonthly).toBeCloseTo(out.result.monthlyPrincipalInterest + out.result.monthlyTax + out.result.monthlyInsurance + 250, 5);
  });

  it('computes total interest = (PI * n) - P', () => {
    const out = calculateMortgage({
      price: 2_000_000,
      downPayment: 400_000,
      annualRate: 6,
      termYears: 30,
    });
    expect(out.ok).toBe(true);
    const n = 30 * 12;
    const expected = out.result.monthlyPrincipalInterest * n - out.result.loanAmount;
    expect(out.result.totalInterest).toBeCloseTo(expected, 1);
  });

  it('computes estimated cash at closing as down payment + 2% of price', () => {
    const out = calculateMortgage({
      price: 2_000_000,
      downPayment: 400_000,
      annualRate: 6,
      termYears: 30,
    });
    expect(out.ok).toBe(true);
    expect(out.result.cashAtClosing).toBeCloseTo(440_000, 1);
  });

  it('synchronizes down payment amount and percentage (downPaymentFromPercent round trip)', () => {
    const pct = 25;
    const dp = downPaymentFromPercent(2_000_000, pct);
    expect(dp).toBe(500_000);
    expect(downPaymentPercent(2_000_000, dp)).toBeCloseTo(pct, 5);
  });

  it('zero interest rate scenario computes total interest = 0', () => {
    const out = calculateMortgage({
      price: 1_000_000,
      downPayment: 200_000,
      annualRate: 0,
      termYears: 30,
    });
    expect(out.ok).toBe(true);
    expect(out.result.monthlyPrincipalInterest).toBeCloseTo(800_000 / 360, 5);
    expect(out.result.totalInterest).toBe(0);
  });
});
