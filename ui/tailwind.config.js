import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    nextui({
      themes: {
        "red-primary-color": {
          extend: "light",
          colors: {
            primary: {
              50: "#ff7f88",
              100: "#ff7f88",
              200: "#ff7f88",
              300: "#ff7f88",
              400: "#ff7f88",
              500: "#ff7f88",
              600: "#ff7f88",
              700: "#ff7f88",
              800: "#ff7f88",
              900: "#ff7f88",
              DEFAULT: "#ff395c",
              foreground: "#ffffff",
            },
          },
        },
      },
    }),
  ],
  darkMode: "class",
};
