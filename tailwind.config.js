/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0D477F',
          'navy-dark': '#08385f',
          'navy-heading': '#0b355b',
          green: '#008000',
          'green-dark': '#008b20',
          'green-border': '#009b35',
          'green-accent': '#95C11F',
          'yellow-hover': '#FFD200',
          'whatsapp': '#25D366',
          'light-bg': '#f8fbf9',
          'card-bg': '#edf5ee',
          'tint-bg': '#eaf5ee',
          'icon-bg': '#eef8f1',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
        serif: ['Georgia', '"Times New Roman"', 'serif'],
      },
      boxShadow: {
        'card': '0 7px 25px rgba(11, 53, 91, 0.06)',
        'card-hover': '0 18px 45px rgba(11, 53, 91, 0.12)',
        'search': '0 5px 22px rgba(13, 71, 127, 0.10)',
      }
    },
  },
  plugins: [],
}
