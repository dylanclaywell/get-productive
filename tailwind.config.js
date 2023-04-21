/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,jsx,js,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        magenta: '#DB256E',
        cyan: '#3156AD',
      },
      fontSize: {
        'heading-1': 'calc(1rem + 3vw)',
        'heading-2': 'calc(1rem + 2vw)',
        'heading-3': 'calc(1rem + 1vw)',
      },
      animation: {
        'fade-in': 'fade-in 1s ease-in-out',
        'fade-in-delayed': 'fade-in-delayed 1.5s ease-in-out',
        'grow-left': 'grow-left 1s ease-in-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'fade-in-delayed': {
          '0%': { opacity: 0 },
          '33%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'grow-left': {
          '0%': { width: 0 },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
}
