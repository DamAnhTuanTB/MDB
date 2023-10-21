import { ListProductAttributeResponse } from '@/types/product/attribute'
import { paramToQueryString } from '@/utils/helper'

import { ListProductResponse, ProductParams } from '../../types/product'

import { apiBase } from '.'

export const productApi = {
  getListProducts(params: ProductParams) {
    const queryString = paramToQueryString(params)
    return apiBase.get<ListProductResponse>(`/products?${queryString}`)
  },

  getAttributes() {
    return apiBase.get<ListProductAttributeResponse>('/attribute-groups?noPagination=true')
  }
}
