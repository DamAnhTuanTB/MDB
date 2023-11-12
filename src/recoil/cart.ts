import { atom, useRecoilState } from 'recoil'

import { CartItem } from '@/types/cart'

export type CartStore = {
  count: number
  listProd: CartItem[]
  dataModalAddSuccess: CartItem | null
}
export const cartState = atom<CartStore>({
  key: 'cartDetailState',
  default: {
    count: 0,
    listProd: [],
    dataModalAddSuccess: null
  }
})

export const useCartStore = () => {
  const [cart, setCart] = useRecoilState(cartState)
  const setCartBadge = (count: number) => {
    setCart((currVal) => ({ ...currVal, count }))
  }

  const toggleModalAddSuccess = (cartData?: CartItem) => {
    setCart((currVal) => ({
      ...currVal,
      dataModalAddSuccess: cartData || null
    }))
  }

  const setCartDetail = (listProd: CartItem[]) => {
    setCart((currVal) => ({ ...currVal, listProd }))
  }

  const setCartModal = (cartData: CartItem | null = null) => {
    setCart((currVal) => ({ ...currVal, dataModalAddSuccess: cartData }))
  }

  const setCartStore = (cart: CartStore) => setCart((currVal) => ({ ...currVal, ...cart }))

  return {
    cart,
    setCartBadge,
    setCartDetail,
    setCartStore,
    setCartModal,
    toggleModalAddSuccess
  }
}
