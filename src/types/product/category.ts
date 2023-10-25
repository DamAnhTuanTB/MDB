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

export type ProductCategoryParams = {
  noPagination?: boolean
  search?: string
  includeChildren?: boolean
  isPinned?: boolean
  where?: {
    [x: string]: string
  }
  sort?: {
    [x: string]: string
  }
}

export type ListProductCategoryResponse = ListResponse<ProductCategory>
