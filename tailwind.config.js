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
        'grow-left-1': 'grow-left 1s ease-in-out',
        'grow-left-2': 'grow-left 1.1s ease-in-out',
        'grow-left-3': 'grow-left 1.2s ease-in-out',
        'grow-left-4': 'grow-left 1.3s ease-in-out',
        'grow-left-5': 'grow-left 1.4s ease-in-out',
        'grow-left-6': 'grow-left 1.5s ease-in-out',
        'slide-in-right-1': 'slide-in-right 500ms ease-in-out',
        'slide-in-right-2': 'slide-in-right 700ms ease-in-out',
        'slide-in-right-3': 'slide-in-right 1s ease-in-out',
        'slide-up-1': 'slide-up 500ms ease-in-out',
        'slide-up-2': 'slide-up 700ms ease-in-out',
        'slide-up-3': 'slide-up 1s ease-in-out',
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
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(200%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(200%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
