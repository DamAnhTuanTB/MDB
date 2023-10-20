import { ListResponse } from '..'

export const productAttributeGroup = {
  SKIN_TYPE: 'SKIN_TYPE',
  LOCATION: 'LOCATION',
  CONCERN: 'CONCERN',
  SUNSCREEN_TYPE: 'SUNSCREEN_TYPE',
  PRODUCT_FORM: 'PRODUCT_FORM',
  TINTED: 'TINTED',
  BRAND: 'BRAND',
  UNIT: 'UNIT',
  SPF: 'SPF',
  PREFERENCES: 'PREFERENCES',
  PRICE: 'PRICE',
  RATING: 'RATING'
}

export type ProductAttributeParams = {
  noPagination: boolean
}

export type ProductAttribute = {
  id: string
  value: string
  min: number | null
  max: number | null
}

export type ProductAttributeItem = {
  id: string
  name: string
  required: boolean
  key: string
  ordering: number
  attributes: ProductAttribute[]
}

export type AttributeFilterItem = {
  id?: string
  key: string
  name: string
  type: 'slider' | 'checkbox' | 'rating'
  attributes?: ProductAttribute[]
}

export type ListProductAttributeResponse = ListResponse<ProductAttributeItem>
