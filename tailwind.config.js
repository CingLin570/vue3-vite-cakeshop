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
        'primary': {
          100: '#F3EEEA',
          300: '#EBE3D5',
          500: '#B0A695',
          700: '#776B5D',
          '700-hover': '#6b6053',
          '700-focus': '#5f554a',
        },
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

