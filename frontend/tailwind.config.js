/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#16a34a', // Green 600
        'primary-light': '#22c55e', // Green 500
        'primary-dark': '#15803d', // Green 700
        secondary: '#0ea5e9', // Sky 500
        'secondary-light': '#38bdf8', // Sky 400
        'secondary-dark': '#0284c7', // Sky 600
        accent: '#f59e0b', // Amber 500
        'accent-light': '#fbbf24', // Amber 400
        'accent-dark': '#d97706', // Amber 600
        'earth-brown': '#78350f', // Amber 900
        'earth-green': '#166534', // Green 800
        'earth-tan': '#fef3c7', // Amber 50
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
        display: ['Montserrat', 'Playfair Display', 'serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}