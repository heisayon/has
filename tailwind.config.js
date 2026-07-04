/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        // Base surfaces
        cream: "#F6F0E6",      // primary background
        paper: "#FCFAF5",      // card / section-on-cream background
        ink: "#2A2118",        // primary text (deep brown, not pure black)
        "ink-soft": "#5C5145", // secondary text

        // Accents — kept muted per brief, no bright color
        gold: {
          DEFAULT: "#AD8A4D",
          light: "#D8C39A",
          dark: "#8A6B37",
        },
        sage: {
          DEFAULT: "#8B9481",
          light: "#DDE2D4",
        },
        clay: {
          DEFAULT: "#C68B6E", // warm feminine highlight — not pink
          light: "#EDD9CD",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      maxWidth: {
        content: "1240px",
      },
      letterSpacing: {
        eyebrow: "0.2em",
      },
      transitionTimingFunction: {
        elegant: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};
