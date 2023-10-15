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
        'dark-gray-color': '#18181b',
        'hard-gray-color': '#27272a',
        'gray-color': '#52525b',
        'md-gray-color': '#71717a',
        'light-gray-color': '#a1a1aa',
        'dark-color': '#000',
      },
    },
  },
  plugins: [],
}

