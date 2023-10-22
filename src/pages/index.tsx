import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { homeApi } from '@/services/api/home'

import HomeComponent from '@/components/home'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const bannerResponse = await homeApi.getBanners()

  return {
    props: {
      banners: bannerResponse.data.results || []
    }
  }
}

export default function HomePage({ banners }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(banners)

  return <HomeComponent banners={banners || []} products={[]} />
}
