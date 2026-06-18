/** @type {import('tailwindcss').Config} */
export default {
  // Этот массив говорит Tailwind: "ищи мои стили в index.html и во всех файлах внутри src/"
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}