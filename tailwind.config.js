/** @type {import('tailwindcss').Config} */

// Every colour is a semantic token defined in src/index.css (light values on
// :root, dark values on .dark). Components never use raw hex values, so a
// theme change is a token change.
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#000000',
      bg: token('bg'),
      surface: {
        DEFAULT: token('surface'),
        elevated: token('surface-elevated'),
        sunken: token('surface-sunken'),
      },
      fg: {
        DEFAULT: token('text-primary'),
        secondary: token('text-secondary'),
        muted: token('text-muted'),
      },
      line: {
        DEFAULT: token('border'),
        strong: token('border-strong'),
      },
      accent: {
        DEFAULT: token('accent'),
        fg: token('accent-text'),
        subtle: token('accent-subtle'),
        contrast: token('on-accent'),
      },
      teal: {
        DEFAULT: token('accent-2'),
        fg: token('accent-2-text'),
      },
      violet: token('accent-3'),
      focus: token('focus-ring'),
      danger: token('danger'),
      success: token('success'),
    },
    fontFamily: {
      display: ['"Manrope Variable"', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      sans: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
      mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
    },
    extend: {
      fontSize: {
        display: ['clamp(2.35rem, 6vw, 5.75rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
        h2: ['clamp(1.8rem, 4vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        h3: ['clamp(1.15rem, 2vw, 1.5rem)', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        lead: ['clamp(1rem, 1.4vw, 1.2rem)', { lineHeight: '1.65' }],
        body: ['1.0625rem', { lineHeight: '1.7' }],
        caption: ['0.875rem', { lineHeight: '1.55' }],
        meta: ['0.78125rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      },
      maxWidth: {
        container: '80rem',
        prose: '38rem',
      },
      borderRadius: {
        card: '1.25rem',
        control: '0.75rem',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        lift: 'var(--shadow-lift)',
        overlay: 'var(--shadow-overlay)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      screens: {
        xs: '420px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
};
