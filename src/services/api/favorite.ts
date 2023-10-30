import qs from 'qs'

import { ListProductResponse, ProductParams } from '../../types/product'

import { apiBase } from '.'

export const favoriteApi = {
  getFavorites(params: ProductParams) {
    const queryString = qs.stringify(params)
    return apiBase.get<ListProductResponse>(`/favorites?${queryString}`)
  }
}
