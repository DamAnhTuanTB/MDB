import { AddCart, Count, GetCartResponse, Product } from '@/types/cart'

import { apiBase } from '../../services/api'

export const cartApi = {
  getCart: () => {
    return apiBase.get<GetCartResponse>('/carts')
  },

  count: () => {
    return apiBase.get<Count>('/carts/count')
  },

  addCard: (body: AddCart) => {
    return apiBase.post<AddCart, Product>('/carts')
  }
}
