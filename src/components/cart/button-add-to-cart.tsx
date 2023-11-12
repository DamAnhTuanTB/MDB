import { useEffect } from 'react'
import { useCart } from '@/hooks/use-cart'
import { CartItem } from '@/types/cart'

import Button from '@/components/common/button'

type Props = {
  data: CartItem
  className?: string
  onOpened?: () => void
}
export default function ButtonAddToCart({ data, className, onOpened }: Props) {
  const { addCart } = useCart()

  return (
    <Button
      className={className}
      onClick={() =>
        addCart(data, (type, open) => {
          if (open || type !== 'local') onOpened?.()
        })
      }
    >
      Add to cart
    </Button>
  )
}
