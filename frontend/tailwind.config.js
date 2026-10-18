/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        greenmap: {
          white: "#FAF9F6",
          leaf: "#ECF39E",
          moss: "#90A955",
          grass: "#40916C",
          forest: "#31572C",
        },
      },
    },
  },
  plugins: [],
};
