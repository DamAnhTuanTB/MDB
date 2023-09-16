// import { Metadata } from 'next'

// import config from '.'

// type Props = {
//   currentPath?: string
// } & Partial<Metadata>

// export function generateMetaData({ currentPath = '', ...otherProps }: Props): Metadata {
//   const ogpImage = `${config.url}/ogp.jpg`
//   const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || config.url
//   const currentUrl = NEXT_PUBLIC_URL + '/' + currentPath ? currentPath + '/' : ''

//   const defaultMetadata = {
//     metadataBase: '',
//     //  <meta name="viewport" content="width=device-width, initial-scale=1" />
//     viewport: 'width=device-width, initial-scale=1',
//     title: {
//       default: config.title.default,
//       template: config.title.template
//     },
//     description: config.description,
//     // <meta name="application-name" content="My Blog" />
//     applicationName: config.name,
//     // <link rel="shortcut icon" href="https://example.com/favicon.ico" />
//     // <link rel="apple-touch-icon" href="https://example.com/apple-touch-icon.png" />
//     // <link rel="apple-touch-icon-precomposed" href="https://example.com/apple-touch-icon-precomposed.png" />
//     icons: [
//       { rel: 'shortcut icon', type: 'image/x-icon', sizes: '48x48', url: '/favicon.ico' },
//       { rel: 'apple-touch-icon', url: NEXT_PUBLIC_URL + '/apple-touch-icon.png' },
//       { rel: 'apple-touch-icon-precomposed', url: NEXT_PUBLIC_URL + '/apple-touch-icon-precomposed.png' }
//     ],
//     // <meta name="twitter:card" content="summary_large_image" />
//     // <meta name="twitter:site" content="@site" />
//     // <meta name="twitter:creator" content="@creator" />
//     // <meta name="twitter:title" content="My Website" />
//     // <meta name="twitter:description" content="My Website Description" />
//     // <meta name="twitter:image" content="https://example.com/og.png" />
//     twitter: { card: 'summary_large_image', site: '@site', creator: '@creator', images: ogpImage },
//     // <meta property="og:type" content="website" />
//     // <meta property="og:url" content="https://example.com" />
//     // <meta property="og:site_name" content="My Website" />
//     // <meta property="og:title" content="My Website" />
//     // <meta property="og:description" content="My Website Description" />
//     // <meta property="og:image" content="https://example.com/og.png" />
//     openGraph: {
//       type: 'website',
//       url: currentUrl,
//       title: config.title.default,
//       description: config.description,
//       siteName: config.name,
//       images: [
//         {
//           url: ogpImage
//         }
//       ]
//     },
//     // * <link rel="canonical" href="https://example.com" />
//     // <link rel="alternate" href="https://example.com/en-US" hreflang="en-US" />
//     alternates: { canonical: currentUrl, languages: { 'en-US': `${NEXT_PUBLIC_URL}/en-US` } },
//     //  <link rel="manifest" href="https://example.com/manifest.json" />
//     manifest: '/manifest.json',
//     // <meta name="robots" content="noindex, nofollow" />
//     robots: { index: false, follow: false } // "index, follow"
//   }

//   const metadata: Metadata = Object.assign({}, defaultMetadata, otherProps)

//   return metadata
// }
