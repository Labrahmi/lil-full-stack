/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    './index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        NanumGothic: ['Nanum Gothic', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

