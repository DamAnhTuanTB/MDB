import { ReactElement, ReactNode } from 'react'

import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import type { NextPage } from 'next/types'

import { RecoilRoot } from 'recoil'

import { categoryApi } from '@/services/api/category'
import { globalApi } from '@/services/api/global'

import { globalSettingState, menuCategorieStage } from '@/recoil/global'
import { GlobalSetting, settingIconKey } from '@/types/global'
import { ProductCategory } from '@/types/product/category'
import { findObjectByName } from '@/utils/helper'

import Meta from '@/components/common/meta'
import Layout from '@/components/layouts'
import Root from '@/components/root'

import '@/styles/global.scss'
import '@/styles/pagination.scss'
import '@/styles/slider.scss'

type GlobalProps = {
  globalSetting: GlobalSetting
  categories: ProductCategory[]
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

const MyDermboxApp = ({ Component, pageProps }: AppProps<GlobalProps>) => {
  const { globalSetting, categories } = pageProps

  return (
    <RecoilRoot
      initializeState={({ set }) => {
        set(globalSettingState, globalSetting), set(menuCategorieStage, categories)
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

  const [settings, categories] = await Promise.all([globalApi.getSettings(), categoryApi.getCategories({ noPagination: true, includeChildren: true, where: { isPinned: true } })])

  return {
    ...appProps,
    pageProps: {
      globalSetting: {
        logo: findObjectByName([...settings?.data] || [], 'key', settingIconKey.logo) || {},
        favicon: findObjectByName(settings?.data || [], 'key', settingIconKey.favicon) || {},
        bannerAutoScroll: findObjectByName(settings?.data || [], 'key', settingIconKey.bannerAutoScroll) || {}
      } as GlobalSetting,
      categories: categories?.data?.results || []
    }
  }
}

export default MyDermboxApp
