import { useEffect, useMemo, useRef } from 'react'

import { useRouter } from 'next/router'

import classNames from 'classnames'

import { useCart } from '@/hooks/use-cart'
import { useAuthStore } from '@/recoil/auth'
import { useCartStore } from '@/recoil/cart'
import routers from '@/routes'
import styles from '@/styles/layout/header.module.scss'
import stylesPopoverCart from '@/styles/modules/cart/popover-cart-info.module.scss'
import { PRODUCT_ATTRIBUTE } from '@/types/product'
import { currencyFormatter, findObjectByName } from '@/utils/helper'

import Image from '@/components/common/image'
import Popover from '@/components/common/popover'
import Link from '@/components/common/custom-link'

export default function Cart() {
  const { isLoading } = useAuthStore()
  const { cart } = useCartStore()
  const { countCart, getCart, dataCart } = useCart()
  const router = useRouter()
  const anchorRef = useRef<HTMLDivElement | null>()

  useEffect(() => {
    if (!isLoading) getCart()

    // listener localStorage change
    window.addEventListener('storage', () => listenerLocalStorage())
    return window.removeEventListener('storage', () => listenerLocalStorage())
  }, [])

  useEffect(() => {
    if (!isLoading) {
      countCart()
      getCart()
    }
  }, [isLoading])

  /** Func update Badge number when localStorage change */
  const listenerLocalStorage = () => {
    getCart()
  }

  const goCart = () => {
    anchorRef.current?.click()
    // router.push(routers.cartPage())
  }

  const listProd = useMemo(() => {
    return (
      <div className={stylesPopoverCart.popover}>
        <div className={stylesPopoverCart.popover__header}>
          My Cart
          <Link className={stylesPopoverCart.popover__edit} href={routers.cartPage()} onClick={goCart}>
            Edit
          </Link>
        </div>
        {/*popover content*/}
        {cart?.listProd.length > 0 ? (
          <>
            <div className={stylesPopoverCart.popover__grid}>
              {dataCart?.isLoading && <div className={'flex mx-auto my-10 justify-center'}>Loading...</div>}
              {cart?.listProd?.map((item, idx) => {
                const { images, name, price, attributeGroups, discount } = item.product || {}
                const { quantity } = item
                const unit = findObjectByName(attributeGroups || [], 'key', PRODUCT_ATTRIBUTE.UNIT)?.attributes[0]?.value || ''
                const img = images?.find((i, idx) => i.isDefault)?.url
                const discountedPrice = (price || 0) * (1 - (discount ?? 0) / 100)

                return (
                  <div key={idx} className={stylesPopoverCart.popover__row}>
                    <Image src={img} className={'!w-50 !sm:w-100'} alt="" />
                    <div className={stylesPopoverCart.popover__item__decription}>
                      <div className={'line-clamp-2'}>
                        {name}
                        {discount != 0 ? <span> (Worth {currencyFormatter.format(price || 0)})</span> : null}
                      </div>
                      {'\n'}Qty:{quantity || 0}
                      {'\n'}Size:{item?.product?.size || 0} {unit}
                    </div>
                    <span className={stylesPopoverCart.popover__item__price}>
                      {currencyFormatter.format(discountedPrice)}
                      {'\n '}
                    </span>
                  </div>
                )
              })}
            </div>
            <Link className={classNames(stylesPopoverCart.btn_view_cart, 'w-[100px]')} href={routers.cartPage()} onClick={goCart}>
              View Cart
            </Link>
          </>
        ) : (
          <div className={stylesPopoverCart.text}>
            <p className={stylesPopoverCart.text__empty}>There are currently no items in your cart</p>
          </div>
        )}
      </div>
    )
  }, [cart.listProd])

  return (
    <Popover
      anchorEl={{ vertical: 'bottom', horizontal: 'right' }}
      anchorPosition={{ vertical: 'top', horizontal: 'right' }}
      className={stylesPopoverCart.content__nav__item}
      anchor={
        <div ref={(ref) => (anchorRef.current = ref)}>
          <Image className="!w-4 lg:!w-6" src={'/images/icons/cart.svg'} width={24} height={24} alt="" />
          {/*cart badge number*/}
          {!!cart.count && <span className={styles.content__cart__badge}>{cart.count > 99 ? '99+' : cart.count}</span>}
        </div>
      }
    >
      {listProd}
    </Popover>
  )
}
