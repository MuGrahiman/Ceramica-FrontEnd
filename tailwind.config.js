/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        'primary': '#FFCE1A',
        'secondary': "#0D0842",
        'blackBG': '#F3F3F3',
        'Favorite': '#FF5841'
      },
      fontFamily: {
        'primary': [ "Montserrat", "sans-serif" ],
        'secondary': [ "Nunito Sans", "sans-serif" ]
      },
      animation: {
        'rotate': "rotate 10s linear infinite",
        'border-spin': 'border-spin 3s linear infinite',
        'shake': 'shake 0.5s ease-in-out',
        'ping-once': 'ping-once 1.2s cubic-bezier(0, 0, 0.2, 1) forwards',
      },
      keyframes: {
        'border-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        rotate: {
          "0%": { transform: "rotate(0deg) scale(10)" },
          "100%": { transform: "rotate(-360deg) scale(10)" },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' },
        },
        'ping-once': {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '70%': { transform: 'scale(1.6)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}

