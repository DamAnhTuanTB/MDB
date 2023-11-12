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

  const _addToCart = () => {
    addCart(data, (type: string, openModal?: boolean) => {
      if (type !== 'local' || !openModal) onOpened?.()
    })
  }

  return (
    <Button className={className} onClick={_addToCart} isLoading={dataAddCart?.isLoading}>
      Add to cart
    </Button>
  )
}
