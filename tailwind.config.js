/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primiry: '#360259',
        secondary: '#8D5EF2',
        tertiary: '#417FA6',
        variation1: '#CF9BF2',
        variation2: '#E9ECF2'
      },
      fontFamily: {
        'opensans': ['Open Sans', 'sans-serif'],
        'opensansSemiCondensed': ['Open Sans Semi-Condensed', 'sans-serif'],
        'opensansCondensed': ['Open Sans Condensed', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

