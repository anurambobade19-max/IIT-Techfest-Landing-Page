/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        aether: {
          50: '#f6f3ff',
          100: '#ede8ff',
          200: '#dccfff',
          300: '#c4abff',
          400: '#a87fff',
          500: '#8b5bf7',
          600: '#7738ec',
          700: '#6725cf',
          800: '#5820a8',
          900: '#4b1e88',
          950: '#2c0d63',
        },
        gold: {
          50: '#fdfaed',
          100: '#faf2cc',
          200: '#f4e295',
          300: '#edcb5d',
          400: '#e7b53a',
          500: '#d49920',
          600: '#b97617',
          700: '#945316',
          800: '#7a4219',
          900: '#69381a',
          950: '#3e1d09',
        },
        ink: {
          50: '#f3f3f5',
          100: '#e8e8ed',
          200: '#d2d3dc',
          300: '#aeb0c0',
          400: '#8386a0',
          500: '#646683',
          600: '#4f516b',
          700: '#424358',
          800: '#3a3b4c',
          900: '#1a1a24',
          950: '#0f0f17',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'scroll-x': 'scrollX 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scrollX: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
