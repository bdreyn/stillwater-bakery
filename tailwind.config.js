/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './src/**/*.{js,css}'],
  theme: {
    extend: {
      colors: {
        cream: '#f8f4ef',
        linen: '#d2bdab',
        bark: {
          DEFAULT: '#594a47',
          50: 'rgba(89, 74, 71, 0.5)',
          30: 'rgba(89, 74, 71, 0.3)',
        },
        sage: '#9bb58d',
        forest: '#667d59',
      },
      fontFamily: {
        sans: ['"Schibsted Grotesk"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
