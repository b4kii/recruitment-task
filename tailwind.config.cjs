/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "dropdown": {
          "0%, 100%": {transform: "translateY(-50%, 0)", opacity: "0"},
          "50%": {transform: "translate(-50%, 2rem)", opacity: "1"},
        }
      },
      animation: {
        dropdown: "dropdown 2s ease-in-out"
      }
    },
  },
  plugins: [],
}