import { ProductParams } from './../../types/product'

import { apiBase, paramToQueryString } from '.'

export const productApi = {
  getList(params: ProductParams) {
    const queryString = paramToQueryString(params)
    console.log(queryString)

    return apiBase.get(`/products${queryString}`)
  }
}
