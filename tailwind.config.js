/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         colors: {
            primary: '#6a4c93',
            'primary-light': '#8a6cb5',
            'primary-dark': '#4a3c73',
            secondary: '#f4a261',
            'secondary-light': '#f8c291',
            'secondary-dark': '#e76f51',
            success: '#2a9d8f',
            error: '#e63946',
         },
         fontFamily: {
            sans: ['Roboto', 'sans-serif'],
         },
      },
   },
   plugins: [],
}
