/** @type {import('tailwindcss').Config} */
export default {
        darkMode: 'class',
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
                poppins: ['Poppins', 'sans-serif'], 
                roboto: ['Roboto', 'sans-serif'], 
              },
    },
  },
  plugins: [ require('daisyui'),],
  daisyui: {
        themes: ["light", "dark"], 
      },
}

