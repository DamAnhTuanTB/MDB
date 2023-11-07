import React, { useEffect, useMemo, useRef } from 'react'

import { useRouter } from 'next/router'

import { useCart } from '@/hooks/use-cart'
import { useAuthStore } from '@/recoil/auth'
import { useCartStore } from '@/recoil/cart'
import routers from '@/routes'
import styles from '@/styles/layout/header.module.scss'
import stylesPopoverCart from '@/styles/modules/cart/popover-cart-info.module.scss'
import { currencyFormatter, findObjectByName } from '@/utils/helper'

import Button from '@/components/common/button'
import Image from '@/components/common/image'
import Popover from '@/components/common/popover'
import { PRODUCT_ATTRIBUTE } from '@/types/product'

export default function Cart() {
  const { isLoggedIn } = useAuthStore()
  const { cart, setCartStore } = useCartStore()
  const { countCart, getCart } = useCart()
  const router = useRouter()
  const anchorRef = useRef<HTMLDivElement | null>()

  useEffect(() => {
    console.log('isLoggedIn', isLoggedIn)
    if (!isLoggedIn) updateCartLocal()

    // listener localStorage change
    window.addEventListener('storage', () => listenerLocalStorage())
    return window.removeEventListener('storage', () => listenerLocalStorage())
  }, [])

  useEffect(() => {
    console.log('isLoggedIn', isLoggedIn)
    if (isLoggedIn) countCart()
  }, [isLoggedIn])

  /** Func update Badge number when localStorage change */
  const updateCartLocal = () => {
    const prodsCard = getLocalStorageCart()

    setCartStore({ ...cart, count: prodsCard?.length || 0, listProd: prodsCard || [] })
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

  const listProd = useMemo(() => {
    return (
      <div className={stylesPopoverCart.popover}>
        <div className={stylesPopoverCart.popover__header}>
          My Cart
          <button
            className={stylesPopoverCart.popover__edit}
            onClick={() => {
              anchorRef.current?.click()
              router.push(routers.cartPage())
            }}
          >
            Edit
          </button>
        </div>
        {/*popover content*/}
        <div className={stylesPopoverCart.popover__grid}>
          {cart?.listProd?.map((item, idx) => {
            const { images, name, sizes, price, attributeGroups, size } = item.product || {}
            const { quantity } = item
            const unit = findObjectByName(attributeGroups || [], 'key', PRODUCT_ATTRIBUTE.UNIT)?.attributes[0]?.value || ''

            const img = images.find((i, idx) => i.isDefault)?.url
            return (
              <div key={idx} className={stylesPopoverCart.popover__row}>
                <Image src={img} className={'!w-50 !sm:w-100'} />
                <div className={stylesPopoverCart.popover__item__decription}>
                  <div className={'line-clamp-2'}>{name}</div>
                  {'\n'}Qty:{quantity || 0}
                  {'\n'}Size:{item?.product?.size || 0} {unit}
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
    getCart()
  }

  return (
    <Popover
      anchorEl={{ vertical: 'bottom', horizontal: 'right' }}
      anchorPosition={{ vertical: 'top', horizontal: 'right' }}
      className={`${styles.content__nav__item}`}
      anchor={
        <div ref={(ref) => (anchorRef.current = ref)}>
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
