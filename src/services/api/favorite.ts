import qs from 'qs'

import { authenticationConfig } from '@/configs/authentication'
import { FavoriteParams, FavoriteResponse } from '@/types/account/favorite'
import { getLocalStorage } from '@/utils/helper'

import { ListProductResponse, ProductParams } from '../../types/product'

import { apiBase } from '.'

const accessToken = () => getLocalStorage(authenticationConfig.accessToken)

export const favoriteApi = {
  getFavoriteList(params: ProductParams) {
    const queryString = qs.stringify(params)
    return apiBase.get<ListProductResponse>(`/favorites?${queryString}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken()}`
      }
    })
  },
  addFavorite(body: FavoriteParams) {
    return apiBase.post<FavoriteParams, FavoriteResponse>('/favorites', body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken()}`
      }
    })
  },
  removeFavorite(body: FavoriteParams) {
    return apiBase.put<FavoriteParams, FavoriteResponse>('/favorites', body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken()}`
      }
    })
  }
}
