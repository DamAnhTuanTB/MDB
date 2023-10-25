import qs from 'qs'

import { ListProductCategoryResponse, ProductCategory, ProductCategoryParams } from '@/types/product/category'

import { apiBase } from '.'

export const categoryApi = {
  getCategories(params: ProductCategoryParams) {
    const queryString = qs.stringify(params)
    return apiBase.get<ListProductCategoryResponse>(`/categories?${queryString}`)
  },

  getCategoryBySlug(slug: string) {
    return apiBase.get<ProductCategory>(`/categories/${slug}`)
  }
}
