import qs from 'qs'

import { ListProductAttributeResponse } from '@/types/product/attribute'

import { DefaultFilterData, ListProductResponse, Product, ProductParams } from '../../types/product'

import { apiBase } from '.'

export const productApi = {
  getProducts(params: ProductParams) {
    const queryString = qs.stringify(params)
    return apiBase.get<ListProductResponse>(`/products?${queryString}`)
  },

  getDefaultFilterData() {
    return apiBase.get<DefaultFilterData>('/products/filters')
  },

  getAttributes() {
    return apiBase.get<ListProductAttributeResponse>('/attribute-groups?noPagination=true')
  },

  getDetail(slug: string) {
    return apiBase.get<Product>(`/products/${slug}`)
  },

  getFeaturedProducts(params: ProductParams) {
    const queryString = qs.stringify(params)
    return apiBase.get<ListProductResponse>(`/featured-products?${queryString}`)
  }
}
