/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        display: '300px',
      },
      fontFamily: {
        serif: ['var(--font-libre-baskerville)'],
        sans: ['var(--font-nunito)'],
        melody: ['var(--font-melody)'],
      },
    },
  },
  plugins: [],
}
