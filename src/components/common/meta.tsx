import { NextPage } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'

import config from '@/configs'

interface Props {
  title?: string
  description?: string
  favicon?: string
  url?: string
  ogImage?: string
  ogType?: string
  ogSiteName?: string
}

const Meta: NextPage<Props> = ({ title, description, favicon, ogImage, ogType, url, ogSiteName }) => {
  const ogpImageUrl = ogImage || config.url
  const router = useRouter()

  return (
    <Head>
      <title>{title || config.title}</title>

      <link rel="icon" href={favicon || '/favicon.ico'} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={config.url + router.asPath} />

      <meta name="description" content={description || config.description} />

      <meta property="og:title" content={title || config.title} />
      <meta property="og:description" content={description || config.description} />
      <meta property="og:image" content={ogpImageUrl} />
      <meta property="og:type" content={ogType || 'website'} />
      <meta property="og:url" content={url || config.url} />
      <meta property="og:site_name" content={ogSiteName || config.title} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content={'summary_large_image'} />
      <meta name="twitter:image" content={ogpImageUrl} />
      <meta name="twitter:domain" content={url || config.url} />
    </Head>
  )
}

export default Meta
