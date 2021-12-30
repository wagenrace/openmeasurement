module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  content: [    "./index.html",    "./src/**/*.{vue,js,ts,jsx,tsx}",  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      divideColor: ['group-hover'],
    },
  },
  plugins: [],
}
