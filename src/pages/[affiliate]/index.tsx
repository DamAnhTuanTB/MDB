import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { globalApi } from '@/services/api/global'
import { homeApi } from '@/services/api/home'
import { productApi } from '@/services/api/product'

import { CONTENT_OPTIONS_KEY } from '@/types/global'

import HomeComponent from '@/components/home'

export const getServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  // TODO: check affiliate is existing
  const [bannerResponse, productResponse, contentOptions] = await Promise.all([
    homeApi.getBanners(),
    productApi.getFeaturedProducts({
      noPagination: true,
      where: {
        userId: params?.affiliate as string
      }
    }),
    globalApi.getContentOptions({ where: { groups: CONTENT_OPTIONS_KEY.HOMEPAGE } })
  ])

  return {
    props: {
      banners: bannerResponse?.data?.results || [],
      featuredProducts: productResponse?.data?.results || [],
      contentOptions: contentOptions?.data || []
    }
  }
}

export default function AffiliateHomePage({ banners, featuredProducts, contentOptions }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <HomeComponent banners={banners || []} products={featuredProducts || []} contentOptions={contentOptions} />
}
