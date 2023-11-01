import { ReactElement, ReactNode } from 'react'

import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import type { NextPage } from 'next/types'

import { RecoilRoot } from 'recoil'

import { categoryApi } from '@/services/api/category'
import { globalApi } from '@/services/api/global'

import { globalSettingState, menuCategorieStage } from '@/recoil/global'
import { homeContentState } from '@/recoil/home'
import { FooterContent } from '@/types/footer'
import { CONTENT_OPTIONS_KEY, ContentOption, GlobalSetting, settingIconKey } from '@/types/global'
import { ProductCategory } from '@/types/product/category'
import { findObjectByName } from '@/utils/helper'

import Meta from '@/components/common/meta'
import Layout from '@/components/layouts'
import Root from '@/components/root'

import '@/styles/global.scss'
import '@/styles/pagination.scss'
import '@/styles/slider.scss'
import 'intl-tel-input/build/css/intlTelInput.css'

type GlobalProps = {
  globalSetting: GlobalSetting
  categories: ProductCategory[]
  footerContent: FooterContent[]
  homeContent: ContentOption[]
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

const MyDermboxApp = ({ Component, pageProps }: AppProps<GlobalProps>) => {
  const { globalSetting, categories, footerContent, homeContent } = pageProps

  return (
    <RecoilRoot
      initializeState={({ set }) => {
        set(globalSettingState, globalSetting)
        set(menuCategorieStage, categories)
        set(homeContentState, homeContent)
      }}
    >
      <Root>
        <Meta favicon={globalSetting?.favicon?.value} />
        <Layout footerContent={footerContent}>
          <Component {...pageProps} />
        </Layout>
      </Root>
    </RecoilRoot>
  )
}

MyDermboxApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx)

  const [settings, categories, footerContent, homeContent] = await Promise.all([
    globalApi.getSettings(),
    categoryApi.getCategories({ noPagination: true, includeChildren: true, where: { isPinned: true } }),
    globalApi.getContentOptions({ where: { groups: CONTENT_OPTIONS_KEY.FOOTER } }),
    globalApi.getContentOptions({ where: { groups: CONTENT_OPTIONS_KEY.HOMEPAGE } })
  ])

  return {
    ...appProps,
    pageProps: {
      globalSetting: {
        logo: findObjectByName([...settings?.data] || [], 'key', settingIconKey.logo) || {},
        favicon: findObjectByName(settings?.data || [], 'key', settingIconKey.favicon) || {},
        bannerAutoScroll: findObjectByName(settings?.data || [], 'key', settingIconKey.bannerAutoScroll) || {}
      } as GlobalSetting,
      categories: categories?.data?.results || [],
      footerContent: footerContent?.data || [],
      homeContent: homeContent?.data || []
    }
  }
}

export default MyDermboxApp
