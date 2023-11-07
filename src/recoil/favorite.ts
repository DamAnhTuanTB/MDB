import { atom, selector } from 'recoil'

import { ListProductResponse } from '@/types/product'

export const favoriteProductsState = atom<ListProductResponse | null>({
  key: 'favoriteProductsState',
  default: null
})

export const favoriteProductsSelector = selector<ListProductResponse | null>({
  key: 'favoriteProductsSelector',
  get: ({ get }) => {
    return get(favoriteProductsState)
  }
})
