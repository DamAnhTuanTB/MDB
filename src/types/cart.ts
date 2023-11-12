import { Product } from './product/index'

import { ListResponse } from '.'

export type CartItem = {
  userId?: string
  id: string
  cartItemId?: string
  productId: string
  quantity: number
  createdAt?: string
  updatedAt?: string
  productSizeId?: string
  syncType?: 'delete' | 'update'
  product: Product | undefined
}

export type AddCart = {
  productId: string
  quantity: number
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
