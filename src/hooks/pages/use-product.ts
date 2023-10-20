import { useEffect } from 'react'

import { productApi } from '@/services/api/product'

import { productConfigs } from '@/configs/product'
import { ListProductResponse, ProductParams } from '@/types/product'

import { useFetch } from '../use-fetch'

export const useProduct = () => {
  const { fetch: getProductList, data: productList } = useFetch<ListProductResponse, ProductParams>({ fetcher: productApi.getListProducts })

  useEffect(() => {
    getProductList({
      page: 1,
      limit: productConfigs.limit
    })
  }, [])

  return {
    productList,
    getProductList
  }
}
