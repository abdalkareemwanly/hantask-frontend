/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
      'background-color': 'rgb(var(--background-color) / <alpha-value>)',
      'blocks-color': 'rgb(var(--blocks-color) / <alpha-value>)',
      'primary-text': 'rgb(var(--primary-text) / <alpha-value>)',
      'secondary-text': 'rgb(var(--secondary-text) / <alpha-value>)',
      'error-text': 'rgb(var(--error-text) / <alpha-value>)',
      'interactive-text': 'rgb(var(--interactive-text) / <alpha-value>)',
      'disabled-text': 'rgb(var(--disabled-text) / <alpha-value>)',
    },
    extend: {
    },
  },
  plugins: [],
}

