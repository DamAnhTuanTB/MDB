import { ListResponse } from '..'

import { Product } from '.'

export type FeaturedProduct = {
  id: string
  productId: string
  userId: string
  product: Product
}

export type ListFeaturedProductResponse = ListResponse<FeaturedProduct>
