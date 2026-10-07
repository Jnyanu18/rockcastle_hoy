import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Sampled from the reference frames
        canvas: "#edeea5", // pale yellow surface
        ink: "#1d1d1b", // near-black surface and text on canvas
        header: "#ececea", // light bar after scroll
        muted: "rgba(29, 29, 27, 0.55)",
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
