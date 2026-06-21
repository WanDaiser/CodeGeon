import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        pixel: ["var(--font-pixel)", "monospace"],
      },
      colors: {
        ink: "#111827",
      },
      boxShadow: {
        pixel: "4px 4px 0 #111827",
        "pixel-lg": "8px 8px 0 #111827",
      },
    },
  },
  plugins: [],
};

export default config;
