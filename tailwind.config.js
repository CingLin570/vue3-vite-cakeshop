/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    container: {
      center: true, // 水平置中
      padding: '12px', // 水平間距
    },
    screens: {
      'md': '992px',
      // => @media (min-width: 992px) { ... }
      'lg': '1296px',
      // => @media (min-width: 1296px) { ... }
    },
    extend: {
      colors: {
        'brown-700': '#776B5D',
        'brown-500': '#B0A695',
        'brown-300': '#EBE3D5',
        'brown-100': '#F3EEEA',
        'brown-700-hover': '#6b6053',
        'brown-700-focus': '#5f554a'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

