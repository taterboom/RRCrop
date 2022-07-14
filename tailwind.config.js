/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "titanium-yellow": "#F0E933",
        "cadmium-orange": "#E7862B",
        "prussian-blue": "#253044",
        "air-blue": "#72A0C5",
        "midnight-blue": "#121C64",
      },
    },
  },
  plugins: [],
}
