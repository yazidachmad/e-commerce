import { Poppins, Teko } from 'next/font/google';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["poppins", "serif"],
        teko: ["teko", "serif"],
      },
      colors: {
        light: "#fbfaff0",
        dark: "#1a202c",
      },
    },
  },
  plugins: [],
};
