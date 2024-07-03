/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,svelte}'],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg) scale(1)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg) scale(1.4)'}
        }
      },
      animation: {
        floatEight: 'float 8s infinite',
        floatTen: 'float 10s infinite',
        floatTwelve: 'float 12s infinite'
      }
    },
  },
  plugins: [],
}

