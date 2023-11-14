import { atom, useRecoilState } from 'recoil'

import { CartItem } from '@/types/cart'

export type CartStore = {
  count?: number
  listProd: CartItem[]
  // dataModalAddSuccess: CartItem | null
  isFinal?: boolean
}

export const dataModalAddState = atom<CartItem | null>({
  key: 'dataModalAddSuccess',
  default: null
})

export const cartState = atom<CartStore>({
  key: 'cartDetailState',
  default: {
    count: 0,
    listProd: [],
  }
})

export const useCartStore = () => {
  const [cart, setCart] = useRecoilState(cartState)
  const [dataModalAddSuccess, setDataModalAdd] = useRecoilState(dataModalAddState)
  const setCartBadge = (count: number) => {
    setCart((currVal) => ({ ...currVal, count }))
  }

  const setCartDetail = (listProd: CartItem[]) => {
    setCart((currVal) => ({ ...currVal, listProd }))
  }

  const setCartModal = (cartData?: CartItem | null) => {
    setDataModalAdd(cartData || null)
  }

  const setCartStore = (cart: CartStore) => setCart((currVal) => ({ ...currVal, ...cart }))

  return {
    cart,
    dataModalAddSuccess,
    setCartBadge,
    setCartDetail,
    setCartStore,
    setCartModal,
  }
}
