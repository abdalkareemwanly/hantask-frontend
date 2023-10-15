/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#000',
        'secondary-color': '#000',
        'dark-gray-color': '#000',
        'hard-gray-color': '#000',
        'hard-gray-color-2': '#fff',
        'gray-color': '#000',
        'md-gray-color': '#f00',
        'light-gray-color': '#f00',
        'dark-color': '#f00',
      },
    },
  },
  plugins: [],
}

