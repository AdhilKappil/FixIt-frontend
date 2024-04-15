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
        secondary : '#fff', // secondary color
        tertiary: '#F9FAFB', // Set tertiary color
        text_head:'#000'
        // tertiary: '#3B82F6', // Set tertiary color
      },
    },
    fontFamily: {
      Sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    },
  },
  plugins: [],
}