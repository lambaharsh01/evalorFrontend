import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f6f7f9",
        card: "#ffffff",
        accent: "#003366",
        greyLight: "#dce1e6",
        greyLighter: "#f2f4f7",
        buttonDark: "#222222",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: {
        lg: "0.5rem", // slightly rounded but not playful
        xl: "0.75rem",
      },
      boxShadow: {
        card: "0 2px 6px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
