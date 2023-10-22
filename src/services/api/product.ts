import { ListProductAttributeResponse } from '@/types/product/attribute'
import { paramToQueryString } from '@/utils/helper'

import { DefaultFilterData, ListProductResponse, Product, ProductParams } from '../../types/product'

import { apiBase } from '.'

export const productApi = {
  getListProducts(params: ProductParams) {
    const queryString = paramToQueryString(params)
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

  getPrelatedProduct(params: ProductParams) {
    const queryString = paramToQueryString(params)
    return apiBase.get<ListProductResponse>(`products?${queryString}`)
  }
}
