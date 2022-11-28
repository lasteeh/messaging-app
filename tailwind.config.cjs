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
        swing: {
          '0%': {
            transform: 'translateY(-100px) rotate(-15deg)'
          },
          '100%': {
            transform: 'translateY(100px) rotate(15deg)'
          }
        },
        pass: {
          '0%': {
            transform: 'translateX(1000%)'
          }, 
          '100%': {
            transform: 'translateX(-1000%)'
          }
      },},
      animation: {
        wiggle: 'wiggle 100ms ease-in-out',
        swing: 'swing 2s ease-in-out infinite alternate',
        pass: 'pass 2s linear infinite normal'
      },
    },
  plugins: [],
  }
};