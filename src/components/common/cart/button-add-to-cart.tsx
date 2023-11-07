import { useEffect, useState } from 'react'

import classNames from 'classnames'

import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useCustomerLogin } from '@/hooks/pages/use-customer-login'
import { useCart } from '@/hooks/use-cart'
import { useAuthStore } from '@/recoil/auth'
import { useCartStore } from '@/recoil/cart'
import styles from '@/styles/modules/product/quick-review-modal.module.scss'
import { CartItem } from '@/types/cart'

import Button from '@/components/common/button'

type Props = {
  data: CartItem
  className?: string
  onOpened?: () => void
}
export default function ButtonAddToCart({ data, className, onOpened }: Props) {
  const { addCart } = useCart()
  const { profile } = useAuthStore()
  const { toggleModalAddSuccess } = useCartStore()
  const getLocalStorageCart = () => {
    let prodsCard: any = localStorage.getItem('MDB_LIST_PRODUCT_CART')
    prodsCard = prodsCard ? JSON.parse(prodsCard) : []
    return prodsCard
  }

  const addToCart = () => {
    if (profile) {
      data.productSizeId = data.size
      addCart({
        productId: data?.productId,
        quantity: data.quantity || 1,
        productSizeId: data?.size
      })
    } else {
      const listProd = getLocalStorageCart()
      const itemExits = listProd.findIndex((i: CartItem) => i.productId === data?.productId && i.productSizeId === data.productSizeId)
      if (itemExits > -1) {
        listProd[itemExits].quantity += data.quantity
        localStorage.setItem('MDB_LIST_PRODUCT_CART', JSON.stringify(listProd))
        onOpened?.()
      } else {
        listProd.push(data)
        toggleModalAddSuccess(true) //on
        localStorage.setItem('MDB_LIST_PRODUCT_CART', JSON.stringify(listProd))
      }
      window.dispatchEvent(new Event('storage'))
    }
  }

  return (
    <Button className={className} onClick={addToCart}>
      Add to cart
    </Button>
  )
}
