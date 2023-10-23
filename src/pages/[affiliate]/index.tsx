import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { homeApi } from '@/services/api/home'
import { productApi } from '@/services/api/product'

import HomeComponent from '@/components/home'

export const getServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  // TODO: check affiliate is existing
  const [bannerResponse, productResponse] = await Promise.all([
    homeApi.getBanners(),
    productApi.getFeaturedProducts({
      noPagination: true,
      where: {
        userId: params?.affiliate as string
      }
    })
  ])

  return {
    props: {
      banners: bannerResponse?.data?.results || [],
      featuredProducts: productResponse?.data?.results || []
    }
  }
}

export default function AffiliateHomePage({ banners, featuredProducts }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <HomeComponent banners={banners || []} products={featuredProducts || []} />
}
