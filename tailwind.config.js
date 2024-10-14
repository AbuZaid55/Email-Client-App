/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        accent:"#E54065",
        background:"#F4F5F9",
        border:"#CFD2DC",
        text:"#636363",
        filterButton:"#E1E4EA",
        readBackgound:"#F2F2F2"
      }
    },
  },
  plugins: [],
}