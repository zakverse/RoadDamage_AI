/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF9',
          100: '#FAF8F2',
          200: '#F5F1E8',
          300: '#EBE5D8',
        },
        clay: {
          bg: '#F8F6F0',
          card: '#FFFFFF',
          border: '#E8E4D9',
          shadow: '#D8D2C2',
        },
        brand: {
          green: '#10B981',
          'green-dark': '#059669',
          'green-light': '#D1FAE5',
          blue: '#38BDF8',
          'blue-dark': '#0284C7',
          'blue-light': '#E0F2FE',
          pink: '#FB7185',
          'pink-dark': '#E11D48',
          'pink-light': '#FFE4E6',
          yellow: '#FBBF24',
          'yellow-dark': '#D97706',
          'yellow-light': '#FEF3C7',
          purple: '#A855F7',
          'purple-dark': '#7E22CE',
          'purple-light': '#F3E8FF',
          dark: '#1E293B',
          gray: '#64748B',
        }
      },
      fontFamily: {
        heading: ['Fredoka', 'Quicksand', 'Nunito', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'Nunito', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'clay-sm': '0 4px 0 #D8D2C2, 0 8px 16px -4px rgba(0,0,0,0.06)',
        'clay-md': '0 6px 0 #D8D2C2, 0 12px 24px -6px rgba(0,0,0,0.08), inset 0 2px 0 rgba(255,255,255,0.8)',
        'clay-lg': '0 10px 0 #CDC7B5, 0 20px 30px -8px rgba(0,0,0,0.1), inset 0 3px 0 rgba(255,255,255,0.9)',
        'clay-btn-green': '0 5px 0 #059669, 0 10px 18px -4px rgba(16,185,129,0.35), inset 0 2px 0 rgba(255,255,255,0.4)',
        'clay-btn-blue': '0 5px 0 #0284C7, 0 10px 18px -4px rgba(56,189,248,0.35), inset 0 2px 0 rgba(255,255,255,0.4)',
        'clay-btn-pink': '0 5px 0 #E11D48, 0 10px 18px -4px rgba(251,113,133,0.35), inset 0 2px 0 rgba(255,255,255,0.4)',
        'clay-btn-yellow': '0 5px 0 #D97706, 0 10px 18px -4px rgba(251,191,36,0.35), inset 0 2px 0 rgba(255,255,255,0.4)',
        'clay-btn-white': '0 5px 0 #D1D5DB, 0 10px 18px -4px rgba(0,0,0,0.06), inset 0 2px 0 rgba(255,255,255,0.9)',
      }
    },
  },
  plugins: [],
}
