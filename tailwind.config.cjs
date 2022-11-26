/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-0.7deg)' },
          '50%': { transform: 'rotate(0.7deg)' },
        },
        animation: {
          wiggle: 'wiggle 1s ease-in-out',
        }
      },
    },
  plugins: [],
  }
};