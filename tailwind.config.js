/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF0083",
        secondary: "#C6C6C6",
        white: {
          DEFAULT: "#FFFFFF",
          half: "rgba(255, 255, 255, 0.5)",
        },
      },
    },
  },
  plugins: [],
};
