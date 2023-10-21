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

export type ProductDetail = {
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
}
