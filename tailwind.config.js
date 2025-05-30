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
              colors: {
                primary: '#6366f1',
                secondary: '#ec4899',
              },
    },
  },
  plugins: [ require('daisyui'),],
  daisyui: {
        themes: ["light", "dark"], 
      },
}

