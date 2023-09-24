import { ReactElement, ReactNode } from 'react'

import type { AppProps } from 'next/app'
import type { NextPage } from 'next/types'

import { RecoilRoot } from 'recoil'

import Meta from '@/components/common/meta'
import Layout from '@/components/layouts'
import Root from '@/components/root'

import '@/styles/global.scss'
import '@/styles/pagination.scss'
import '@/styles/slider.scss'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Root>
        <Meta />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Root>
    </RecoilRoot>
  )
}
