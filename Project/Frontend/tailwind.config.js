/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        ugac: {
          bg: "#0b1020",
        },
      },
    },
  },
  plugins: [],
};

