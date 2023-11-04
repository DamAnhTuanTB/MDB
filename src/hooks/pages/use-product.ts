import { productApi } from '@/services/api/product'

import { ListProductResponse, ProductParams } from '@/types/product'

import { useFetch } from '../use-fetch'

export const useProduct = () => {
  const { fetch: getProductList, dataResult } = useFetch<ListProductResponse, ProductParams>({ fetcher: productApi.getProducts })

  return {
    ...dataResult,
    getProductList
  }
}
