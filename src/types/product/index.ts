import { ListResponse } from '..'

export type Image = {
  key: string
  url: string
  isDefault: boolean
}

export type Product = {
  id: string
  name: string
  slug: string
  identifier: string
  sku: string
  quantity: number
  size: number
  price: number
  wholesale: number
  discount: number
  saleYN: boolean
  spf: string
  description: string
  features: string
  awards: string
  activeIngredients: string
  howToUse: string
  images: Image[]
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  averageRating: number
  totalReviews: number
}

export type ProductSort = {
  name: string
}

export type ProductFilter = {
  minSpf?: number
  maxSpf?: number
  minPrice?: number
  maxPrice?: number
  minRating?: number
  maxRating?: number
  attributeIds?: string[]
  relatedProductIds?: string[]
  ingredientIds?: string[]
}

export type ProductParams = {
  page: number
  limit: number
  search?: string
  sort?: ProductSort
  where?: ProductFilter
}

export type ListProductResponse = ListResponse<Product>

export type DefaultFilterDataItem = {
  min: number
  max: number
}
export type DefaultFilterData = {
  price: DefaultFilterDataItem
  wholesale: DefaultFilterDataItem
  quantity: DefaultFilterDataItem
}
