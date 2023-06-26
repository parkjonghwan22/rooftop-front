/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Tailwindcss 3.0 default is 'media',  'class'
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        380: "23.75rem",
        450: "28.125rem",
        500: "31.25rem",
        650: "40.625rem",
        1100: "68.75rem",
        1200: "75rem",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-55%)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "none",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
      },
    },
    maxHeight: {
      0: "0",
      "1/4": "25%",
      "2/5": "40%",
      "1/2": "50%",
      "3/5": "60%",
      "3/4": "75%",
      "4/5": "80%",
      "9/10": "90%",
      full: "100%",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
