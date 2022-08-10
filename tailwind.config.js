/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: {
        xl: "8rem",
        "2xl": "10rem",
      },
    },
    colors: {
      primary: "#FF0083",
    },
    extend: {},
  },
  plugins: [],
};
