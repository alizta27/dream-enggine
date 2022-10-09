/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      primary: {
        50: '#ffffff',
        100: '#e8eaed',
        200: '#cdcdcd',
        300: '#bdc1c6',
        400: '#9aa0a6',
        500: '#3c4043',
        600: '#3b3b3b',
        700: '#303134',
        800: '#202124',
        900: '#171717',
      },
      red: {
        500: '#ef4444',
      },
      blue: {
        50: '#8ab4f8',
      },
    },
    width: {
      full: '100%',
      96: '24rem',
      24: '6rem',
      '1/3': '60%',
      100: '18rem',
      110: '20rem',
      125: '28rem',
      128: '32rem',
      130: '35rem',
      'sm-p': '40rem',
      'md-p': '48rem',
      'lg-p': '64rem',
      'xl-p': '80rem',
      '2xl-p': '96rem',
      140: '45rem',
    },
  },
  plugins: [],
};
