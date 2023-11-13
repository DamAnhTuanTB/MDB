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
  isFinal?: boolean
}

export type AddCart = {
  productId: string
  quantity: number
  product?: Product | undefined
}
export type EditCart = {
  id?: string
  cartItemId?: string
  quantity?: number
  productSizeId?: string
  productId?: string
  product?: Product | undefined
}
export type Count = {
  count: number
}

export type GetCartResponse = ListResponse<CartItem>
