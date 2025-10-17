/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        dark: "#0F1419",
        "dark-light": "#1a1f26",
        "gray-300": "#d1d5db",
        "gray-500": "#6b7280",
        "gray-600": "#4b5563",
        "gray-700": "#374151",
        accent: "#2B8ECC",
        "accent-light": "#3FA3E0",
        success: "#6BB88D",
        warning: "#E8A368",
        blue: {
          500: "#3b82f6",
          600: "#2563eb",
        },
        green: {
          500: "#10b981",
          600: "#059669",
        },
        orange: {
          500: "#f97316",
          600: "#ea580c",
        },
        pink: {
          400: "#f472b6",
        },
        yellow: {
          600: "#ca8a04",
        },
        emerald: {
          700: "#047857",
        },
      },
      spacing: {
        "container-max": "1440px",
        "container-padding": "40px",
      },
    },
  },
  plugins: [],
};
