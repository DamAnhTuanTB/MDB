/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/styles/**/*.{module,scss,css}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 769px) { ... }

      lg: '1024px',
      // => @media (min-width: 1025px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        blue: {
          DEFAULT: '#0A4164',
          50: '#0472AF',
          100: '#05035A'
        },
        black: {
          DEFAULT: '#000',
          50: '#1F1F29'
        },
        grey: {
          DEFAULT: '#B9B9B9',
          50: '#F8F8F8',
          100: '#F4F6F6',
          150: '#D9D9D9'
        },
        red: {
          DEFAULT: '#F00'
        },
        white: {
          DEFAULT: '#fff',
          50: '#F5F5FA',
          100: '#E3E3E3'
        },
        teal: {
          DEFAULT: '#E1F1F4',
          50: '#60B0C4'
        },
        green: {
          DEFAULT: '#1EB564',
          50: '#1EB56433'
        }
      },
      fontFamily: {
        'source-san': ['"Source Sans 3"', 'sans-serif']
      },
      fontSize: {
        xs: ['12px', '1.25'],
        sm: ['14px', '1.25'],
        base: ['16px', '1.25'],
        lg: ['20px', '1.25'],
        xl: ['24px', '1.25'],
        '2xl': ['32px', '1.25'],
        '3xl': ['40px', '1.25']
      },
      lineHeight: {
        normal: '1.25',
        loose: '1.43'
      }
    }
  }
}
