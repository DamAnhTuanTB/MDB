import { atom, useRecoilState } from 'recoil'

import { Product } from '@/types/product'

export const favoriteProductsState = atom<Product[]>({
  key: 'favoriteProductsState',
  default: []
})

export const useFavoriteStore = () => {
  const [favorites, setFavorites] = useRecoilState(favoriteProductsState)
  function addToFavorites(productToAdd: Product) {
    const isProductInFavorites = favorites && favorites.some((product) => product.id === productToAdd.id)
    if (!isProductInFavorites) {
      const updatedFavorites = [...favorites, productToAdd]
      setFavorites(updatedFavorites)
    }
  }

  function removeFromFavorites(productToRemove: Product) {
    const updatedFavorites = favorites.filter((product) => product.id !== productToRemove.id)
    setFavorites(updatedFavorites)
  }

  return {
    favorites,
    setFavorites,
    addToFavorites,
    removeFromFavorites
  }
}
