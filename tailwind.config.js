/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#212121",
        primary: "#2f2f2f",
        disabledSubmit: "#676767",
        enabledSubmit: "#ffffff",
      },
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
      },
      gridTemplateColumns: {
        "70/30": "70% 28%",
      },
    },
  },
  plugins: [],
};
