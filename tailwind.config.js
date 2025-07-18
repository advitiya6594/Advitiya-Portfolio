/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Times New Roman', 'serif'],
        'sans': ['Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        'indigo': {
          600: '#4A506B',
        },
        'stone': {
          400: '#B1A596',
        },
        'green': {
          600: '#8A9B82',
        },
        'purple': {
          200: '#C3B1E1',
          800: '#4C1D95',
        },
        'blue': {
          200: '#A6B8C2',
          800: '#1E3A8A',
        },
        'orange': {
          200: '#C17C57',
          800: '#9A3412',
        },
      },
      maxWidth: {
        'md': '375px',
      },
    },
  },
  plugins: [],
} 