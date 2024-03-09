/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B7F8E",
        danger: "#E33838",
        warning: "#FA6533",
        success: "#00B039",
      },
    },
  },
  plugins: [],
};
