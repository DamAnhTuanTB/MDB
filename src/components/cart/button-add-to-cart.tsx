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
  const { addCart, dataAddCart } = useCart()

  useEffect(() => {
    console.log(dataAddCart)
    onOpened?.()
  }, [dataAddCart])

  return (
    <Button className={className} onClick={() => addCart(data)}>
      Add to cart
    </Button>
  )
}
