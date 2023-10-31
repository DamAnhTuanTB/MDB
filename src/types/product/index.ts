import { ListResponse } from '..'

import { ProductAttributeItem } from './attribute'
import { ProductCategory } from './category'

export enum PRODUCT_ATTRIBUTE {
  UNIT = 'UNIT',
  BRAND = 'BRAND',
  PREFERENCES = 'PREFERENCES',
  SPF = 'SPF'
}

export type ProductImage = {
  key: string
  url: string
  isDefault: boolean
}

export type ProductIcon = {
  id: string
  name: string
  url: string
  key: string
  ordering: number
}

export type ProductIngredient = {
  id: string
  name: string
}

export type Product = {
  id: string
  name: string
  slug: string
  identifier: string
  sku: string
  quantity: number
  inStock: boolean
  size: number
  price: number
  wholesale: number
  discount: number
  saleYN: boolean
  spf: number
  description: string
  features: string
  awards: string
  activeIngredients: string
  inactiveIngredients: string
  howToUse: string
  images: ProductImage[]
  createdAt: string
  updatedAt: string
  deletedAt: string
  icons: ProductIcon[]
  ingredients: ProductIngredient[]
  averageRating: number
  totalReviews: number
  categories: ProductCategory[]
  attributeGroups: ProductAttributeItem[]
}

export type ProductSort = {
  [key: string]: string | string[]
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
  userId?: string
  [key: string]: string | string[] | undefined | number
}

export type ProductParams = {
  page?: number
  limit?: number
  search?: string
  noPagination?: boolean
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
