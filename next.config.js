// eslint-disable-next-line @typescript-eslint/no-var-requires
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.NEXT_PUBLIC_ENV === 'production'
// })

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TerserPlugin = require('terser-webpack-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          // https://react-svgr.com/docs/options/
          options: {
            dimensions: false
          }
        }
      ]
    })
    if (process.env.NEXT_PUBLIC_ENV && process.env.NEXT_PUBLIC_ENV === 'production') {
      const isDisableConsole = process.env.NEXT_PUBLIC_ENV === 'production'

      config.optimization.minimize = true
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: { drop_console: isDisableConsole }
          },
          extractComments: /^\**!|@preserve|@license|@cc_on/i
        })
      ]
    }
    return config
  }
}

console.log('=================================================')
console.log(`=========== Environment:  ${process.env.NEXT_PUBLIC_ENV} ===========`)
console.log('=================================================')

module.exports = nextConfig
