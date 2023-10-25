import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { globalApi } from '@/services/api/global'
import { homeApi } from '@/services/api/home'
import { productApi } from '@/services/api/product'

import { ContentOptionKey } from '@/types/global'

import HomeComponent from '@/components/home'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const [bannerResponse, productResponse, contentOptions] = await Promise.all([
    homeApi.getBanners(),
    productApi.getFeaturedProducts({
      noPagination: true
    }),
    globalApi.getContentOptions({ where: { groups: ContentOptionKey.HOMEPAGE } })
  ])

  return {
    props: {
      banners: bannerResponse?.data?.results || [],
      featuredProducts: productResponse?.data?.results || [],
      contentOptions: contentOptions?.data || []
    }
  }
}

export default function HomePage({ banners, featuredProducts, contentOptions }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const featuredProductTitle = (contentOptions && contentOptions.find((item) => item.name === ContentOptionKey.FEATURED_PRODUCT_TITLE)?.value) || ''

  return <HomeComponent banners={banners || []} products={featuredProducts || []} featuredProductTitle={featuredProductTitle} />
}
