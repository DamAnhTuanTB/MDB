import { productApi } from '@/services/api/product'

import { ListProductResponse, ProductParams } from '@/types/product'

import { useFetch } from '../use-fetch'

export const useAccountFavorite = () => {
  const { fetch: getFavorite, dataResult: favoriteProducts } = useFetch<ListProductResponse, ProductParams>({ fetcher: productApi.getFeaturedProducts })

  return {
    getFavorite,
    ...favoriteProducts
  }
}
