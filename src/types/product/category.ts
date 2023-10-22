import { ListResponse } from '..'

export type ProductCategory = {
  id: string
  name: string
  slug: string
  level: number
  parentId: string
  ordering: number
  createdAt: string
  updatedAt: string
  childCategories: ProductCategory[]
}

export type ListProductCategoryResponse = ListResponse<ProductCategory>
