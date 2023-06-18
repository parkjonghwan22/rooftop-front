/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class", // Tailwindcss 3.0 default is 'media',  'class'
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    maxHeight: {
      '0': '0',
      '1/4': '25%',
      '2/5': '40%',
      '1/2': '50%',
      '3/5': '60%',
      '3/4': '75%',
      '4/5': '80%',
      '9/10': '90%',
      'full': '100%',
     }
  },
  plugins: [],
}
