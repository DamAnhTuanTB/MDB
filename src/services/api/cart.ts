import { authenticationConfig } from '@/configs/authentication'
import { AddCart, CartItem, Count, GetCartResponse } from '@/types/cart'
import { Product } from '@/types/product'
import { getLocalStorage } from '@/utils/helper'

import { apiBase } from '../../services/api'

const accessToken = getLocalStorage(authenticationConfig.accessToken)
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
}
export const cartApi = {
  getCart: () => {
    return apiBase.get<GetCartResponse>('/carts', config)
  },

  addCart: (body: AddCart) => {
    return apiBase.post<AddCart, CartItem>('/carts', body, config)
  },

  count: () => {
    return apiBase.get<Count>('/carts/count')
  },

  addCard: (body: AddCart) => {
    return apiBase.post<AddCart, Product>('/carts')
  }
}
