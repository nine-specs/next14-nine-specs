import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      colors: {
        primary: {
          50: "#E6E9EF",
          100: "#C0C8D9",
          200: "#98A5BF",
          300: "#7282A5",
          400: "#546894",
          500: "#364F84",
          600: "#30487C",
          700: "#283E70",
          800: "#213564",
          900: "#18254C",
        },
        secondary: {
          50: "#E1F5FD",
          100: "#B2E6FA",
          200: "#80D5F7",
          300: "#4CC5F4",
          400: "#1CB8F3",
          500: "#00ACF2",
          600: "#009EE3",
          700: "#008BD0",
          800: "#0079BC",
          900: "#005A9B",
        },
        grayscale: {
          0: "#FFFFFF",
          100: "#F5F5F5",
          200: "#E9E9E9",
          300: "#C5C5C5",
          400: "#9F9F9F",
          500: "#7D7D7D",
          600: "#575757",
          700: "#454545",
          800: "#282828",
          900: "#121212",
        },
        background: "#F1F3F8",
        warning: "#FF294F",
        success: "#1FCE65",
      },
      backgroundImage: {
        main: "url('../../public/images/main/background_img.png')",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(2rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        fadeUp: "faseUp 1s ease-in-out both",
      },
    },
  },
  plugins: [],
};
export default config;
