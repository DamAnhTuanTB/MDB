import { favoriteApi } from '@/services/api/favorite'

import { FavoriteParams, FavoriteResponse } from '@/types/account/favorite'
import { ListProductResponse, ProductParams } from '@/types/product'

import { useFetch } from '../use-fetch'

export const useAccountFavorite = () => {
  const { fetch: getFavorite, dataResult: favoriteProducts } = useFetch<ListProductResponse, ProductParams>({ fetcher: favoriteApi.getFavoriteList })

  const { fetch: add, dataResult: addData } = useFetch<FavoriteResponse, FavoriteParams>({ fetcher: favoriteApi.addFavorite })

  const { fetch: remove, dataResult: removeData } = useFetch<FavoriteResponse, FavoriteParams>({ fetcher: favoriteApi.removeFavorite })

  return {
    getFavorite,
    ...favoriteProducts,
    add,
    addData,
    remove,
    removeData
  }
}
