/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F4F0E8',
        sand: '#D7C8B2',
        charcoal: '#181818',
        graphite: '#2B2B2B',
        gold: '#B99A63',
        goldSoft: '#C9AE7C',
        white: '#FFFFFF',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        prose: ['Spectral', '"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        editorial: '0.02em',
        label: '0.18em',
      },
      maxWidth: {
        editorial: '88rem',
        prose: '44rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(24,24,24,0.04), 0 8px 32px -12px rgba(24,24,24,0.18)',
        focus: '0 0 0 3px rgba(185,154,99,0.55)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
};
