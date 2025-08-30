/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core colors
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        success: 'var(--color-success)',
        'success-hover': 'var(--color-success-hover)',

        // Background colors
        'bg': 'var(--color-bg)',
        'bg-card': 'var(--color-bg-card)',
        'bg-navbar': 'var(--color-bg-navbar)',
        'bg-navbar-scrolled': 'var(--color-bg-navbar-scrolled)',

        // Text colors
        'text': 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'text-inverse': 'var(--color-text-inverse)',

        // Border colors
        'border': 'var(--color-border)',
        'border-card': 'var(--color-border-card)',

        // Button colors
        'btn-primary': 'var(--color-btn-primary)',
        'btn-primary-hover': 'var(--color-btn-primary-hover)',
        'btn-secondary': 'var(--color-btn-secondary)',
        'btn-secondary-hover': 'var(--color-btn-secondary-hover)',

        // Shadow colors
        'shadow': 'var(--color-shadow)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Arial', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.75rem',
        lg: '1.5rem',
        xl: '2rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in',
      },
    },
  },
  plugins: [],
};
