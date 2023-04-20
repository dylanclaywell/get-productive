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
    },
  },
  plugins: [],
}
