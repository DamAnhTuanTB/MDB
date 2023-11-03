import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { affiliateApi } from '@/services/api/affiliate'
import { homeApi } from '@/services/api/home'
import { productApi } from '@/services/api/product'

import { useHomeStore } from '@/recoil/home'

import HomeComponent from '@/components/home'

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  try {
    const affiliateResponse = await affiliateApi.getAffiliate(query.affiliate as string)

    if (!affiliateResponse.data?.id) {
      return {
        notFound: true
      }
    }

    const [bannerResponse, productResponse] = await Promise.all([
      homeApi.getBanners(),
      productApi.getFeaturedProducts({
        noPagination: true,
        where: {
          userId: affiliateResponse.data?.id || ''
        }
      })
    ])

    return {
      props: {
        banners: bannerResponse?.data?.results || [],
        featuredProducts: productResponse?.data?.results || []
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

export default function AffiliateHomePage({ banners, featuredProducts }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { homeContent } = useHomeStore()

  return <HomeComponent banners={banners || []} products={featuredProducts || []} contentOptions={homeContent} />
}
