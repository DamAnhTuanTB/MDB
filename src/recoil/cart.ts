import { atom, useRecoilState } from 'recoil'

import { CartItem } from '@/types/cart'

export type CartStore = {
  count: number
  listProd: CartItem[]
  showModalAddSuccess: boolean
}
export const cartState = atom<CartStore>({
  key: 'cartDetailState',
  default: {
    count: 0,
    listProd: [],
    showModalAddSuccess: false
  }
})

export const useCartStore = () => {
  const [cart, setCart] = useRecoilState(cartState)
  const setCartBadge = (count: number) => {
    setCart((currVal) => ({ ...currVal, count }))
  }

  const toggleModalAddSuccess = (flag?: boolean) => {
    setCart((currVal) => ({
      ...currVal,
      showModalAddSuccess: typeof flag === 'boolean' ? flag : !cart.showModalAddSuccess
    }))
  }

  const setCartDetail = (listProd: CartItem[]) => {
    setCart((currVal) => ({ ...currVal, listProd }))
  }

  const setCartStore = (cart: CartStore) => setCart((currVal) => ({ ...currVal, ...cart }))

  return {
    cart,
    setCartBadge,
    setCartDetail,
    setCartStore,
    toggleModalAddSuccess
  }
}
