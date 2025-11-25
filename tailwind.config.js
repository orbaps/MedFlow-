/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#377df6",
        "secondary": "#F97316", // Retailer Orange
        "background-light": "#f5f6f8",
        "background-dark": "#101722",
        "card-light": "#FFFFFF",
        "card-dark": "#1A202C",
        "text-light": "#1A202C",
        "text-dark": "#EDF2F7",
        "border-light": "#E2E8F0",
        "border-dark": "#2D3748",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "sans": ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
