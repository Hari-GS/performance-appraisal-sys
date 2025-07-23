/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFFFFF',   // Light blue
          dark: '#D7E7FF',      // ✅ Darker variant
          darker: '#D7E7FF'     // ✅ Even darker variant
        },
        secondary: {
          DEFAULT: '#001D4B',   // Dark blue
          dark: '#001637',      // ✅ Darker
          darker: '#000F26'     // ✅ Even darker
        },
        accent: {
          DEFAULT: '#FF9500',   // Orange
          dark: '#CC7700',      // ✅ Darker
          darker: '#994F00'     // ✅ Even darker
        }
      },
    },
  },
  plugins: [],
};
