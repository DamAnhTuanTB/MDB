import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { homeApi } from '@/services/api/home'
import { productApi } from '@/services/api/product'

import HomeComponent from '@/components/home'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const [bannerResponse, productResponse] = await Promise.all([
    homeApi.getBanners(),
    productApi.getFeaturedProducts({
      noPagination: true
    })
  ])

  return {
    props: {
      banners: bannerResponse?.data?.results || [],
      featuredProducts: productResponse?.data?.results || []
    }
  }
}

export default function HomePage({ banners, featuredProducts }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <HomeComponent banners={banners || []} products={featuredProducts || []} />
}
