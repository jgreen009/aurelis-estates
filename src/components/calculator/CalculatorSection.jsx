import { useMemo, useCallback, useState } from 'react';
import SectionHeading from '../common/SectionHeading.jsx';
import { FormField, Input, Select } from '../common/FormControls.jsx';
import {
  calculateMortgage,
  downPaymentPercent,
  downPaymentFromPercent,
} from '../../utils/mortgage.js';
import { formatCurrency, formatPercent } from '../../utils/format.js';

const TERM_OPTIONS = [10, 15, 20, 25, 30];
const DEFAULTS = {
  price: 2_000_000,
  downPayment: 400_000,
  annualRate: 6,
  termYears: 30,
  hoaMonthly: 250,
};

export default function CalculatorSection({ fixedPrice }) {
  const [state, setState] = useState({
    price: fixedPrice ?? DEFAULTS.price,
    downPayment: fixedPrice ?? DEFAULTS.downPayment,
    annualRate: DEFAULTS.annualRate,
    termYears: DEFAULTS.termYears,
    hoaMonthly: DEFAULTS.hoaMonthly,
  });
  const [dpPct, setDpPct] = useState(null); // user-driven override of the displayed %

  const calc = useMemo(
    () =>
      calculateMortgage({
        price: state.price,
        downPayment: state.downPayment,
        annualRate: state.annualRate,
        termYears: state.termYears,
        hoaMonthly: state.hoaMonthly,
      }),
    [state]
  );

  const update = useCallback((patch) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const onPriceChange = (val) => {
    const price = Math.max(0, Number(val) || 0);
    const pct = dpPct ?? downPaymentPercent(price, state.downPayment);
    update({ price, downPayment: downPaymentFromPercent(price, pct) });
  };

  const onDownAmount = (val) => {
    const dp = Math.max(0, Number(val) || 0);
    const pct = downPaymentPercent(state.price, dp);
    setDpPct(pct);
    update({ downPayment: dp });
  };

  const onDownPercent = (val) => {
    const pct = Math.min(100, Math.max(0, Number(val) || 0));
    setDpPct(pct);
    update({ downPayment: downPaymentFromPercent(state.price, pct) });
  };

  const result = calc.ok ? calc.result : null;
  const shownPct = dpPct ?? downPaymentPercent(state.price, state.downPayment);

  return (
    <section id="calculator" className="py-24 lg:py-32 bg-white border-y border-charcoal/10" aria-label="Mortgage calculator">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Calculator"
          title="Estimate the monthly carrying cost"
          description="A standard fixed-rate mortgage estimate. Figures update automatically. Final terms are confirmed with an independent mortgage advisor."
          className="mb-10"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 lg:p-8 bg-ivory border border-charcoal/10">
            <FormField id="calc-price" label="Price (USD)" className="sm:col-span-2">
              <Input
                id="calc-price"
                type="number"
                inputMode="numeric"
                min="0"
                step="10000"
                value={state.price}
                onChange={(e) => onPriceChange(e.target.value)}
              />
            </FormField>

            <FormField id="calc-down" label="Down payment (USD)">
              <Input
                id="calc-down"
                type="number"
                inputMode="numeric"
                min="0"
                step="5000"
                value={state.downPayment}
                onChange={(e) => onDownAmount(e.target.value)}
              />
            </FormField>

            <FormField id="calc-down-pct" label="Down payment (%)">
              <Input
                id="calc-down-pct"
                type="number"
                inputMode="numeric"
                min="0"
                max="100"
                step="1"
                value={shownPct.toFixed(1)}
                onChange={(e) => onDownPercent(e.target.value)}
              />
            </FormField>

            <FormField id="calc-rate" label="Interest rate (%)">
              <Input
                id="calc-rate"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.05"
                value={state.annualRate}
                onChange={(e) => update({ annualRate: Number(e.target.value) || 0 })}
              />
            </FormField>

            <FormField id="calc-term" label="Term (years)">
              <Select
                id="calc-term"
                value={state.termYears}
                onChange={(e) => update({ termYears: Number(e.target.value) || 1 })}
              >
                {TERM_OPTIONS.map((y) => (
                  <option key={y} value={y}>
                    {y} years
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField id="calc-hoa" label="Monthly HOA (USD)" className="sm:col-span-2">
              <Input
                id="calc-hoa"
                type="number"
                inputMode="numeric"
                min="0"
                step="25"
                value={state.hoaMonthly}
                onChange={(e) => update({ hoaMonthly: Number(e.target.value) || 0 })}
              />
            </FormField>
          </div>

          <div className="bg-charcoal text-ivory p-6 lg:p-8" aria-live="polite">
            {!result ? (
              <p className="text-ivory/70 text-sm">{formatErrors(calc.errors)}</p>
            ) : (
              <>
                <p className="label-eyebrow text-gold mb-4">Estimated monthly payment</p>
                <p className="font-serif text-5xl lg:text-6xl text-ivory leading-none">
                  {formatCurrency(result.totalMonthly, 'USD')}
                  <span className="block text-xs uppercase tracking-label text-ivory/60 mt-3">per month</span>
                </p>

                <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 text-sm">
                  <Row label="Loan amount" value={formatCurrency(result.loanAmount, 'USD')} />
                  <Row label="Principal & interest" value={formatCurrency(result.monthlyPrincipalInterest, 'USD')} />
                  <Row label="Monthly tax" value={formatCurrency(result.monthlyTax, 'USD')} />
                  <Row label="Monthly insurance" value={formatCurrency(result.monthlyInsurance, 'USD')} />
                  <Row label="Monthly HOA" value={formatCurrency(result.monthlyHoa, 'USD')} />
                  <Row label="Down payment" value={`${formatCurrency(state.downPayment, 'USD')} (${formatPercent(result.downPaymentPercent, { digits: 1 })})`} />
                  <Row label="Total interest" value={formatCurrency(result.totalInterest, 'USD')} />
                  <Row label="Cash at closing (est.)" value={formatCurrency(result.cashAtClosing, 'USD')} />
                </dl>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex flex-col gap-1 pb-3 border-b border-ivory/10">
      <dt className="text-[11px] uppercase tracking-label text-ivory/50">{label}</dt>
      <dd className="text-ivory font-serif text-lg">{value}</dd>
    </div>
  );
}

function formatErrors(errors) {
  if (!errors) return 'No calculations available.';
  return Object.values(errors).join(' ');
}
