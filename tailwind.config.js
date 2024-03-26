/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00255F', // Set primary color
        secondary: '#F9FAFB', // Set secondary color
        // tertiary: '#3B82F6', // Set tertiary color
      },
    },
  },
  plugins: [],
}