/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom1: '#789DBC', // Adding your first color grey
        custom2: '#FFE3E3', // Adding your second color pink
        custom3: '#FEF9F2', // Adding your third color white
        custom4: '#C9E9D2', // Adding your fourth color green
      },
      
    },
  },
  plugins: [],
}