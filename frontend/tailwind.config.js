/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Helvetica', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#0B0D13', // Deepest background
          900: '#14151B', // Sidebar / slightly lighter
          800: '#1A1C24', // Cards
          700: '#23252E', // Borders
          600: '#323642', // Stronger Borders/hovers
          500: '#4B5563', // Muted text
        },
        brand: {
          400: '#9F7AEA',
          500: '#8B5CF6', // Neon Purple
          600: '#7C3AED',
        },
        amber: {
          400: '#8B5CF6', // Remapping old amber to purple to prevent breaking old classes that rely on it temporarily
          300: '#A78BFA',
          500: '#7C3AED',
        },
        steel: {
          400: '#8B8E98', // Muted dashboard text
          300: '#A1A1AB',
          200: '#E2E8F0',
        },
        danger: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.35s ease forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulseSoft: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.5 } },
      },
    },
  },
  plugins: [],
}
