/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#ffffff',
          100: '#fdfbf7',
          200: '#f8f4ec',
          300: '#f1ebd9',
          400: '#e5dcbe',
          500: '#d7c79e',
        },
        champagne: {
          light: '#fbf8f1',
          DEFAULT: '#f3eedf',
          dark: '#e3d7bf',
        },
        brass: {
          50: '#fbf9f4',
          100: '#f5efe1',
          200: '#ebdcc3',
          300: '#dec29a',
          400: '#cca26e',
          500: '#b88646',
          600: '#9d6d33',
          700: '#7d5226',
          800: '#5c3b1e',
          900: '#3d2613',
        },
        gold: {
          light: '#fff4cc',
          DEFAULT: '#d4af37',
          dark: '#a88117',
          shimmer: '#ffdf78',
        },
        regal: {
          navy: '#0f172a',
          slate: '#1e293b',
          maroon: '#5c131d',
          charcoal: '#181b22',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'skeuo-card-light': '0 20px 45px -10px rgba(130, 95, 45, 0.15), 0 0 0 1px rgba(212, 175, 55, 0.35), inset 0 2px 0 rgba(255, 255, 255, 0.9)',
        'skeuo-inset-light': 'inset 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.8)',
        'skeuo-btn-gold': '0 4px 0 #8d6226, 0 8px 18px rgba(184, 134, 70, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
        'skeuo-btn-pressed': '0 1px 0 #8d6226, 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.2)',
        'gold-glow': '0 0 30px rgba(212, 175, 55, 0.4)',
      },
    },
  },
  plugins: [],
}
