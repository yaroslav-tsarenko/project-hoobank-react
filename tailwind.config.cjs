/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1600px",
    },
    extend: {
      colors: {
        // Surfaces
        ivory: "#f6f3ec",
        paper: "#fbfaf6",
        sand: "#ece7dc",
        line: "#dcd5c6",
        // Text
        ink: "#121614",
        muted: "#4f5651",
        faint: "#666c67",
        // Brand
        forest: {
          DEFAULT: "#0e3b2c",
          900: "#0a2b20",
          800: "#0e3b2c",
          700: "#164a38",
          600: "#22604a",
          100: "#dfe8e2",
          50: "#edf2ee",
        },
        brass: {
          DEFAULT: "#b8893d",
          light: "#dcbb7e",
          dark: "#7a5a1c",
          50: "#f4ecdb",
        },
        // Status
        positive: "#1d6b4a",
        negative: "#9c3a2b",
        // Data viz: muted hues that stay distinguishable on ivory
        viz: {
          forest: "#0e3b2c",
          brass: "#b8893d",
          sage: "#7f9c88",
          clay: "#b0654c",
          slate: "#56687a",
          stone: "#a8a193",
          plum: "#6e4b63",
        },
      },
      fontFamily: {
        sans: ['"Instrument Sans"', "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        serif: ['"Instrument Serif"', "ui-serif", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: {
        site: "1280px",
        prose: "680px",
      },
      borderRadius: {
        card: "14px",
        control: "8px",
      },
      boxShadow: {
        lift: "0 1px 0 rgba(18,22,20,0.04), 0 14px 34px -20px rgba(18,22,20,0.30)",
        float: "0 1px 0 rgba(18,22,20,0.05), 0 34px 70px -34px rgba(10,43,32,0.50)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.45s cubic-bezier(0.22, 0.61, 0.36, 1) both",
        "pop-in": "pop-in 0.4s cubic-bezier(0.22, 0.61, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
