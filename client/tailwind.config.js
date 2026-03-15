/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        amazon: "#FF9900",
        flipkart: "#2874F0",
        bg: "#080810",
        surface: "#0f0f1a",
        border: "#1e1e2e",
        muted: "#6b6b8a",
      },
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};