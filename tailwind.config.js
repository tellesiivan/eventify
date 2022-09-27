/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      base: {
        white: "#fff",
        black: "#000",
      },
      primary: {
        100: "#6a6e70",
        200: "#515658",
        300: "#393d41",
        400: "#202529",
        500: "#181c1f",
        600: "#070d11",
      },
      razz: {
        100: "#f3c4d4",
        200: "#efb0c5",
        300: "#e4759a",
        400: "#e0618b",
        500: "#dc4e7d",
        600: "#d83a6e",
      },
      turquoise: {
        100: "#c3f7ee",
        200: "#aff5e8",
        300: "#9bf2e2",
        400: "#86efdc",
        500: "#72edd6",
        600: "#36e5c5",
      },
      success: {
        100: "#9feacd",
        200: "#88e5c0",
        300: "#70e0b3",
        400: "#58dba7",
        500: "#40d59a",
        600: "#10cb81",
      },
      warning: {
        100: "#c3f7ee",
        200: "#aff5e8",
        300: "#9bf2e2",
        400: "#86efdc",
        500: "#72edd6",
        600: "#36e5c5",
      },
      error: {
        100: "#c3f7ee",
        200: "#aff5e8",
        300: "#9bf2e2",
        400: "#86efdc",
        500: "#72edd6",
        600: "#36e5c5",
      },
    },
    extend: {},
  },
  plugins: [],
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
};
