/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        'backgroundBlue': '#1a202c',
        'backgroundLightGray': '#f7fafc',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
