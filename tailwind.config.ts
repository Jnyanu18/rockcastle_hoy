import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Frosted Navy + Orange: deepened navy backgrounds, orange buttons/CTAs/numbers, white text
        canvas: "#f4f6f9", // soft "royal" off-white text / light-on-dark role
        ink: "#111925", // deep navy surface / dark-section role (darkened again per feedback)
        accent: "#ea7700", // orange sampled directly from the Rock Castle logo artwork — buttons, CTAs, numbers/index labels
        header: "#182230", // deepened navy bar after scroll
        rose: "#5c7084", // secondary text/borders
        muted: "rgba(17, 25, 37, 0.55)",
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
