import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6D28D9", // Deep purple
        secondary: "#10B981", // Emerald
        accent: "#F59E0B", // Amber
        background: "#111827", // Dark blue-gray
        text: "#F3F4F6", // Light gray
      },
    },
  },
  plugins: [],
} satisfies Config;
