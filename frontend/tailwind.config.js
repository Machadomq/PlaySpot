/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'medula': ['Medula One', 'cursive'],
      },
      colors: {
        'playspot-dark': '#20282c',
        'playspot-green': '#42AA65',
      },
      textShadow: {
        'md': '4px 4px 2px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
