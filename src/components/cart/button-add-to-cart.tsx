import { useCart } from '@/hooks/use-cart'
import { CartItem } from '@/types/cart'

import Button from '@/components/common/button'
import { useCallback } from 'react'
import {useAuthStore} from "@/recoil/auth";

type Props = {
  data: CartItem
  className?: string
  onOpened?: () => void
}
export default function ButtonAddToCart({ data, className, onOpened }: Props) {
  const { addCart } = useCart()
  const { isLoggedIn } = useAuthStore()

  const _addCart = useCallback(() => {
    addCart(data, (type, open) => {
      if (open || type !== 'local') onOpened?.()
    })
  }, [data, isLoggedIn])
  return (
    <Button className={className} onClick={_addCart}>
      Add to cart
    </Button>
  )
}
