/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: {
        xl: "2rem",
        "2xl": "10rem",
      },
    },
    extend: {
      colors: {
        primary: "#FF0083",
      },
    },
  },
  plugins: [],
};
