/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // IMPORTANT: Make sure this points to wherever you put the Catalyst files
    "./src/catalyst-ui/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        // Catalyst is designed for Inter
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}