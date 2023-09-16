/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/styles/**/*.{module,scss,css}'],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#0A4164'
        },
        black: {
          DEFAULT: '#000',
          50: '#1F1F29'
        },
        grey: {
          DEFAULT: '#B9B9B9',
          50: '#F8F8F8'
        },
        red: {
          DEFAULT: '#F00'
        }
      },
      fontFamily: {
        'source-sans': ['Source Sans 3', 'sans-serif']
      }
    }
  }
}
