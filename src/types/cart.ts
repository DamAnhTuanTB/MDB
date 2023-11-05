import { ListResponse } from '.'

export type CartItem = {
  userId: string
  id: string
  productId: string
  quantity: number
  createdAt: string
  updatedAt: string
  product: Product
}

export type Product = {
  id: string
  name: string
  price: number
  size: string
  images: Array<Image>
}

type Image = {
  key: string
  url: string
  isDefault?: boolean
}

export type AddCart = {
  productId: string
  quantity: number
}
export type Count = {
  count: number
}

export type GetCartResponse = ListResponse<CartItem>
