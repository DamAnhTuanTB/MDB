import { useCallback } from 'react'

import { useCart } from '@/hooks/use-cart'
import { useAuthStore } from '@/recoil/auth'
import { useCartStore } from '@/recoil/cart'
import { CartItem } from '@/types/cart'

import Button from '@/components/common/button'

type Props = {
  data: CartItem
  className?: string
  onOpened?: () => void
}

export default function ButtonAddToCart({ data, className, onOpened }: Props) {
  const { addCart } = useCart()
  const { cart } = useCartStore()
  const { isLoggedIn } = useAuthStore()

  const _addCart = useCallback(() => {
    addCart(data, (type, open) => {
      if (open || type !== 'local') onOpened?.()
    })
  }, [data, isLoggedIn, cart])

  return (
    <Button className={className} onClick={_addCart}>
      Add to cart
    </Button>
  )
}
