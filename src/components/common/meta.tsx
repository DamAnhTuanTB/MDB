import { NextPage } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'

import config from '@/configs'

interface Props {
  title?: string
  description?: string
  url?: string
  image?: string
  ogType?: string
  ogSiteName?: string
}

const Meta: NextPage<Props> = ({ title, description, image, ogType, url, ogSiteName }) => {
  const ogpImage = image || config.url + '/ogp.jpg'
  const router = useRouter()

  return (
    <Head>
      <title>{title || config.title}</title>

      <link rel="icon" href="/apps/nextjs-frontend/public/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={config.url + router.asPath} />

      <meta name="description" content={description || config.description} />

      <meta name="og:title" content={title || config.title} />
      <meta name="og:description" content={description || config.description} />
      <meta name="og:image" content={ogpImage} />
      <meta name="og:image" content={ogType || 'website'} />
      <meta name="og:image" content={url || config.url} />
      <meta name="og:site_name" content={ogSiteName || config.title} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content={'summary_large_image'} />
      <meta name="twitter:image" content={ogpImage} />
      <meta name="twitter:domain" content={url || config.url} />
    </Head>
  )
}

export default Meta
