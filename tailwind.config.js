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
        'dark-gray-color': '#3f3f46',
        'hard-gray-color': '#52525b',
        'gray-color': '#71717a',
        'md-gray-color': '#a1a1aa',
        'light-gray-color': '#d4d4d8',
        'dark-color': '#27272a',
      },
    },
  },
  plugins: [],
}

