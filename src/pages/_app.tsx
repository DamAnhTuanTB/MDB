import { ReactElement, ReactNode } from 'react'

import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import type { NextPage } from 'next/types'

import { RecoilRoot } from 'recoil'

import { globalApi } from '@/services/api/global'

import { globalSettingState } from '@/recoil/global'
import { GlobalSetting, settingIconKey } from '@/types/global'
import { findObjectByName } from '@/utils/helper'

import Meta from '@/components/common/meta'
import Layout from '@/components/layouts'
import Root from '@/components/root'

import '@/styles/global.scss'
import '@/styles/pagination.scss'
import '@/styles/slider.scss'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

const MyDermboxApp = ({ Component, pageProps }: AppProps<{ globalSetting: GlobalSetting }>) => {
  const { globalSetting } = pageProps

  return (
    <RecoilRoot
      initializeState={({ set }) => {
        set(globalSettingState, pageProps?.globalSetting)
      }}
    >
      <Root>
        <Meta favicon={globalSetting?.favicon?.value} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Root>
    </RecoilRoot>
  )
}

MyDermboxApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx)

  const { data } = await globalApi.getSettings()

  return {
    ...appProps,
    pageProps: {
      globalSetting: {
        logo: findObjectByName([...data] || [], 'key', settingIconKey.logo) || {},
        favicon: findObjectByName(data || [], 'key', settingIconKey.favicon) || {},
        bannerAutoScroll: findObjectByName(data || [], 'key', settingIconKey.bannerAutoScroll) || {}
      } as GlobalSetting
    }
  }
}

export default MyDermboxApp
