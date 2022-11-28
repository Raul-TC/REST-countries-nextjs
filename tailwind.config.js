/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bodyLight: '#FAFAFA',
        containerLight: '#FFFFFF',
        shadowWhiteMode: '#F2F2F2',
        bodyDark: '#202D36',
        containerDark: '#2B3743',
        shadowDarkMode: '#1F2C35',
        textDark: '#05090C'
      }
    },
  },
  plugins: [],
}