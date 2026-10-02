/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        econest: {
          bg: '#f5f4fb',
          darkBg: '#0f172a',
          card: '#ffffff',
          cardDark: '#1e293b',
          navy: '#0f172a',
          purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7e22ce',
          },
          green: {
            DEFAULT: '#10b981',
            dark: '#059669',
            light: '#d1fae5',
            forest: '#14532d',
          },
          border: '#e8e5f2'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 20px -2px rgba(100, 116, 139, 0.08), 0 2px 6px -1px rgba(100, 116, 139, 0.04)',
        'premium': '0 10px 30px -5px rgba(16, 185, 129, 0.15)',
        'purple-glow': '0 10px 30px -5px rgba(147, 51, 234, 0.15)',
      }
    },
  },
  plugins: [],
}
