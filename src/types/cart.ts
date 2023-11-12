import { Product } from './product/index'

import { ListResponse } from '.'

export type CartItem = {
  userId?: string
  id: string
  productId: string
  quantity: number
  size?: number
  createdAt?: string
  updatedAt?: string
  productSizeId?: string
  product: Product
}

export type AddCart = {
  productId: string
  quantity: number
  productSizeId?: string
  size?: number
}
export type EditCart = {
  id?: string
  cartItemId?: string
  quantity?: number
  productSizeId?: string
  productId?: string
}
export type Count = {
  count: number
}

export type GetCartResponse = ListResponse<CartItem>
