import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Two dominant surfaces from the reference
        acid: "#EEF3A6", // pale yellow canvas
        ink: "#171717", // near-black canvas
        paper: "#F1F1EE", // header bar
      },
      fontFamily: {
        // Rounded geometric sans, set via next/font in app/layout.tsx
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
