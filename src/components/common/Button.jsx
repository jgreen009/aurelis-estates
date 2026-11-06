import { forwardRef } from 'react';

const VARIANTS = {
  primary: 'bg-charcoal text-ivory hover:bg-graphite border border-transparent',
  gold: 'bg-gold text-white hover:bg-gold-soft border border-transparent',
  outline: 'bg-transparent border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory',
  ghost: 'bg-transparent text-charcoal hover:bg-charcoal/5 border border-transparent',
};

const SIZES = {
  sm: 'px-4 py-2 text-xs tracking-label min-h-[36px]',
  md: 'px-6 py-3 text-sm tracking-label min-h-[44px]',
  lg: 'px-8 py-4 text-sm tracking-label min-h-[52px]',
};

const Button = forwardRef(function Button(
  { as: Comp = 'button', variant = 'primary', size = 'md', className = '', children, ...rest },
  ref
) {
  const classes = [
    'inline-flex items-center justify-center gap-2 uppercase font-medium transition-colors duration-300 ease-editorial disabled:opacity-50 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
    VARIANTS[variant],
    SIZES[size],
    className,
  ].join(' ');

  if (Comp === 'button') {
    return (
      <button ref={ref} className={classes} {...rest}>
        {children}
      </button>
    );
  }
  return (
    <Comp ref={ref} className={classes} {...rest}>
      {children}
    </Comp>
  );
});

export default Button;
