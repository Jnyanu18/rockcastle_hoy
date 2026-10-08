import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // HOY-inspired palette: pale yellow accent + white/grey/black neutrals
        canvas: "#ffffff", // light page surface
        ink: "#0b0b0b", // near-black surface and text on canvas
        accent: "#f0f3a6", // hoy yellow — primary accent, used sparingly
        header: "#e8e9e5", // light-grey bar after scroll
        muted: "rgba(11, 11, 11, 0.55)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
