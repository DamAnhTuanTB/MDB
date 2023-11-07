import { Product } from './product/index'

import { ListResponse } from '.'

export type CartItem = {
  userId?: string
  id: string
  productId: string
  quantity: number
  size?: string
  createdAt?: string
  updatedAt?: string
  productSizeId?: string
  product: Product
}

export type AddCart = {
  productId: string
  quantity: number
  productSizeId?: string
}
export type EditCart = {
  cartItemId: string
  quantity?: number
  productSizeId?: string
}
export type Count = {
  count: number
}

export type GetCartResponse = ListResponse<CartItem>
