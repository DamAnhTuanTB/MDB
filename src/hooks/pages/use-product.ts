import { productApi } from '@/services/api/product'

import { ListProductResponse, ProductParams } from '@/types/product'

import { useFetch } from '../use-fetch'

export const useProduct = () => {
  const { fetch: getProductList, data: productList } = useFetch<ListProductResponse, ProductParams>({ fetcher: productApi.getListProducts })

  return {
    productList,
    getProductList
  }
}
