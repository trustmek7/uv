
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        navy: '#0B1F3A',
        uv: '#3A86C8',
        sky: '#A9D6FF',
        mist: '#F7F9FC',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Inter', 'sans-serif'], // Overriding serif to use Inter for a unified modern look
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(11, 31, 58, 0.03)',
        'soft-lg': '0 10px 30px -5px rgba(11, 31, 58, 0.05)',
      }
    },
  },
  plugins: [],
}
