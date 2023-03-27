/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        green: '#4dab6e',
        lighttext: '#87888A',
        yellow: '#ffcb9f',
        soft: '#ede5d3',
        lightgreen: '#94c794',
        ultrablue: '#006eff'
      },
      height: {
        'screen-ios': '-webkit-fill-available',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}