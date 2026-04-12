/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFC107',
          hover: '#FFB300',
          light: '#FFD54F',
        },
        dark: {
          950: '#050505',
          900: '#0F1012',
          800: '#18191C',
          700: '#25262B',
          600: '#2C2E33',
        },
      },
    },
  },
  plugins: [],
}