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
          DEFAULT: '#1F1F29'
        }
      }
    }
  }
}
