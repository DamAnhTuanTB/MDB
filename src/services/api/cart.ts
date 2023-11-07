import { authenticationConfig } from '@/configs/authentication'
import { AddCart, CartItem, Count, GetCartResponse, EditCart } from '@/types/cart'
import { getLocalStorage } from '@/utils/helper'

import { apiBase } from '../../services/api'
import qs from 'qs'

const accessToken = getLocalStorage(authenticationConfig.accessToken)
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
}
export const cartApi = {
  getCart: () => {
    // const queryString = qs.stringify({
    //   sort: { createdAt: 'desc', noPagination: true }
    // })
    // console.log(queryString)
    // return apiBase.get<GetCartResponse>(`/carts?${queryString}`)
    return apiBase.get<GetCartResponse>('/carts')
  },

  addCart: (body: AddCart) => {
    return apiBase.post<AddCart, CartItem>('/carts', body, config)
  },

  editCart: (body: EditCart) => {
    return apiBase.put<EditCart, CartItem>(`/carts/${body.cartItemId}`, body, config)
  },

  deleteCart: (cartItemId: string) => {
    return apiBase.delete<CartItem>(`/carts/${cartItemId}`, config)
  },

  count: () => {
    return apiBase.get<Count>('/carts/count', config)
  }
}
