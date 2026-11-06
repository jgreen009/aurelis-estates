import { Children, cloneElement, forwardRef } from 'react';

export function FormField({ id, label, error, hint, required, children, stacked = false }) {
  const describedBy = error
    ? `${id}-error`
    : hint
    ? `${id}-hint`
    : undefined;
  const child = Children.only(children);
  // Merge aria-describedby without clobbering RHF's register() ref / onChange.
  const existingDescribedBy = child.props?.['aria-describedby'];
  const mergedDescribedBy = [existingDescribedBy, describedBy].filter(Boolean).join(' ') || undefined;
  return (
    <div className={stacked ? 'flex flex-col gap-1.5' : 'flex flex-col gap-1.5'}>
      <label htmlFor={id} className="text-[11px] uppercase tracking-label text-charcoal/60">
        {label}
        {required && <span className="text-gold" aria-hidden="true"> *</span>}
      </label>
      {cloneElement(child, {
        id,
        ...(mergedDescribedBy ? { 'aria-describedby': mergedDescribedBy } : null),
      })}
      {hint && (
        <p id={`${id}-hint`} className="text-[11px] text-charcoal/50">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[11px] text-rose-600">
          {error.message}
        </p>
      )}
    </div>
  );
}

const baseControl =
  'w-full min-h-[44px] bg-white border border-charcoal/15 px-3 py-2 text-sm text-charcoal placeholder:text-charcoal/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold';

export const Input = forwardRef(function Input({ invalid, className = '', ...rest }, ref) {
  return (
    <input
      ref={ref}
      className={`${baseControl} ${invalid ? 'border-rose-500' : ''} ${className}`}
      aria-invalid={invalid ? 'true' : 'false'}
      {...rest}
    />
  );
});

export const Select = forwardRef(function Select({ invalid, className = '', children, ...rest }, ref) {
  return (
    <select
      ref={ref}
      className={`${baseControl} ${invalid ? 'border-rose-500' : ''} ${className}`}
      aria-invalid={invalid ? 'true' : 'false'}
      {...rest}
    >
      {children}
    </select>
  );
});

export const Textarea = forwardRef(function Textarea({ invalid, className = '', ...rest }, ref) {
  return (
    <textarea
      ref={ref}
      className={`${baseControl} ${invalid ? 'border-rose-500' : ''} ${className}`}
      aria-invalid={invalid ? 'true' : 'false'}
      {...rest}
    />
  );
});

export const ConsentCheckbox = forwardRef(function ConsentCheckbox(
  { id, label, error, register, ...rest },
  ref
) {
  // `register` prop includes a ref callback; if explicitly given a `ref`, prefer that.
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        ref={ref}
        {...register}
        {...rest}
        className="mt-1 h-5 w-5 border border-charcoal/30 rounded-sm text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <label htmlFor={id} className="text-sm leading-relaxed text-charcoal/80">
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[11px] text-rose-600 mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
});

export const Honeypot = forwardRef(function Honeypot({ register, name, label, tabIndex = -1, ...rest }, ref) {
  return (
    <div className="hidden" aria-hidden="true">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="text"
        tabIndex={tabIndex}
        autoComplete="off"
        ref={ref}
        {...register(name)}
        {...rest}
      />
    </div>
  );
});

export function FormStatus({ status, message }) {
  if (!status || status === 'idle') return null;
  const role = status === 'error' ? 'alert' : 'status';
  const cls =
    status === 'success'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : status === 'error'
      ? 'bg-rose-50 text-rose-700 border-rose-200'
      : 'bg-ivory text-charcoal/80 border-charcoal/15';
  return (
    <p
      role={role}
      aria-live={status === 'loading' ? 'polite' : 'assertive'}
      data-testid="form-status"
      data-status={status}
      className={`mt-6 px-4 py-3 border text-sm ${cls}`}
    >
      {message}
    </p>
  );
}
