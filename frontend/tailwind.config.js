/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        lavender: "#CDB4FF",
        blush: "#F4B6D8",
        baby: "#BDE0FE",
        peach: "#FFD6A5",
        cream: "#FFF8E7",
        deep: "#7B5EA7"
      },
      fontFamily: {
        display: ["\"Baloo 2\"", "sans-serif"],
        body: ["\"Quicksand\"", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(123, 94, 167, 0.15)",
        glow: "0 0 24px rgba(205, 180, 255, 0.6)"
      }
    }
  },
  plugins: []
};
