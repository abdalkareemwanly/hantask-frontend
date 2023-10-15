/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#00697f',
        'secondary-color': '#5dd16e',
        'dark-gray-color': '#27272a',
        'hard-gray-color': '#3f3f46',
        'gray-color': '#a1a1aa',
        'md-gray-color': '#f00',
        'light-gray-color': '#f00',
        'dark-color': '#f00',
      },
    },
  },
  plugins: [],
}

