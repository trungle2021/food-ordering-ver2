/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        "primary-color": "#F8B602",
      }
      ,
      backgroundColor: {
        "primary-color": "#F8B602",
      },
      borderColor:{
        "primary-color": "#F8B602",
        "action-button": "#A098AE"
      }
    },
  },
  plugins: [],
};
