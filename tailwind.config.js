module.exports = {
  darkMode: "class",
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0EA5E9",
        dark: "#0A0A0A",
        darker: "#050505",
      },
      fontFamily: {
        comic: ["Comic Neue", "cursive"],
        inter: ["Inter", "sans-serif"],
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
      },
    }
  },
  plugins: [],
}