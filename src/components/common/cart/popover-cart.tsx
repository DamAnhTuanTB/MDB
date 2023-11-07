import React, { useEffect, useMemo } from 'react'

import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useCart } from '@/hooks/use-cart'
import { useAuthStore } from '@/recoil/auth'
import { useCartStore } from '@/recoil/cart'
import styles from '@/styles/layout/header.module.scss'
import stylesPopoverCart from '@/styles/modules/cart/popover-cart-info.module.scss'
import { currencyFormatter } from '@/utils/helper'

import Button from '@/components/common/button'
import ModalAddCartSuccess from '@/components/common/cart/modal-add-cart-success'
import Image from '@/components/common/image'
import Popover from '@/components/common/popover'

export default function Cart() {
  const { profile } = useAuthStore()
  const { cart, setCartStore } = useCartStore()
  const { countCart, getCart } = useCart()

  useEffect(() => {
    if (profile) countCart(undefined)
    else updateCartLocal()

    // listener localStorage change
    window.addEventListener('storage', () => listenerLocalStorage())
    return window.removeEventListener('storage', () => listenerLocalStorage())
  }, [])

  /** Func update Badge number when localStorage change */
  const updateCartLocal = () => {
    const prodsCard = getLocalStorageCart()

    setCartStore({ ...prodsCard, count: prodsCard?.length || 0, listProd: prodsCard || [] })
  }

  /** Func update Badge number when localStorage change */
  const listenerLocalStorage = () => {
    updateCartLocal()
  }

  const getLocalStorageCart = () => {
    let prodsCard: any = localStorage.getItem('MDB_LIST_PRODUCT_CART')
    prodsCard = prodsCard ? JSON.parse(prodsCard) : []
    return prodsCard
  }
  {
    console.log('cart?.listProd', cart?.listProd)
  }

  const listProd = useMemo(() => {
    return (
      <div className={stylesPopoverCart.popover}>
        <div className={stylesPopoverCart.popover__header}>
          My Cart
          <button className={stylesPopoverCart.popover__edit}>Edit</button>
        </div>
        {/*popover content*/}
        <div className={stylesPopoverCart.popover__grid}>
          {cart?.listProd?.map((item, idx) => {
            const { images, name, sizes, price } = item.product || {}
            const { quantity } = item

            const img = images.find((i, idx) => i.isDefault)?.url
            return (
              <div key={idx} className={stylesPopoverCart.popover__row}>
                <Image src={img} width={100} height={100} />
                <div className={stylesPopoverCart.popover__item__decription}>
                  <div className={'line-clamp-2'}>{name}</div>
                  {'\n'}Qty:{quantity || 0}
                </div>
                <span className={stylesPopoverCart.popover__item__price}>
                  {currencyFormatter.format(price || 0)}
                  {'\n '}
                </span>
              </div>
            )
          })}
        </div>
        <Button className={'!w-1/3 !bg-blue mt-4'}>View Cart</Button>
      </div>
    )
  }, [cart.listProd])

  const loadDataCart = () => {
    if (profile) getCart(undefined)
  }

  return (
    <Popover
      anchorEl={{ vertical: 'bottom', horizontal: 'right' }}
      anchorPosition={{ vertical: 'top', horizontal: 'right' }}
      className={`${styles.content__nav__item}`}
      anchor={
        <div>
          <Image src={'/images/icons/cart.svg'} width={24} height={24} />
          {/*cart badge number*/}
          {!!cart.count && <span className={styles.content__cart__badge}>{cart.count > 99 ? '99+' : cart.count}</span>}
        </div>
      }
      onOpen={loadDataCart}
    >
      {listProd}
    </Popover>
  )
}
