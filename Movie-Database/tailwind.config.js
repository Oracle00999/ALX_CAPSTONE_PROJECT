// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f4f8",
          100: "#d9e2ec",
          200: "#bcccdc",
          300: "#9fb3c8",
          400: "#829ab1",
          500: "#627d98",
          600: "#486581",
          700: "#334e68",
          800: "#243b53",
          900: "#102a43",
        },
        gold: {
          50: "#fff9e6",
          100: "#ffefbf",
          200: "#ffe599",
          300: "#ffdb73",
          400: "#ffd14d",
          500: "#e6b800",
          600: "#b38f00",
          700: "#806600",
          800: "#4d3e00",
          900: "#1a1500",
        },
      },
      fontFamily: {
        // Primary font stack - Modern and readable
        sans: [
          "Inter",
          "Segoe UI",
          "Roboto",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],

        // Cinematic font for headings - Elegant and dramatic
        cinematic: ["Playfair Display", "Georgia", "Times New Roman", "serif"],

        // Monospace for technical elements
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-slow": "pulse 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
