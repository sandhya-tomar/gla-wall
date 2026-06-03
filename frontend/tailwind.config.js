/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#E8520A',
          light: '#F97316',
          dark: '#C2410C',
          pale: '#FFF8F4',
          tag: '#FEF0E8',
        },
        mess: {
          DEFAULT: '#065F46',
          light: '#ECFDF5',
          border: '#6EE7B7',
        }
      },
      fontFamily: {
        display: ["'Baloo 2'", 'cursive'],
        body: ["'Nunito'", 'sans-serif'],
      },
      borderRadius: {
        xl: '14px',
        '2xl': '20px',
      }
    },
  },
  plugins: [],
}
