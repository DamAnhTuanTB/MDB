import { ListProductCategoryResponse, ProductCategory } from '@/types/product/category'

import { apiBase } from '.'

export const categoryApi = {
  getCategories() {
    return apiBase.get<ListProductCategoryResponse>('/categories?noPagination=true')
  },

  getCategoryBySlug(slug: string) {
    return apiBase.get<ProductCategory>(`/categories/${slug}`)
  }
}
