import { useEffect, useMemo, useRef, useState } from 'react'

import { useProduct } from '@/hooks/pages/use-product'
import { useProductDetail } from '@/hooks/pages/use-product-detail'
import { useCart } from '@/hooks/use-cart'
import { useAuthStore } from '@/recoil/auth'
import { useCartStore } from '@/recoil/cart'
import { useNotificationUI } from '@/recoil/common-ui'
import stylesModal from '@/styles/modules/cart/modal-add-cart-success.module.scss'
import { CartItem } from '@/types/cart'
import { PRODUCT_ATTRIBUTE } from '@/types/product'
import { currencyFormatter, findObjectByName, getLocalStorage } from '@/utils/helper'

import RelatedProduct from '@/components/cart/related'
import ImageComponent from '@/components/common/image'
import CustomForm from '@/components/form'
import SelectField from '@/components/form/select-field'

import Button from '../common/button'
import Modal from '../common/modal'
import Quantity from '../common/quantity'

export default function ModalAddCartSuccess() {
  const {
    cart: { showModalAddSuccess },
    toggleModalAddSuccess
  } = useCartStore()
  const { getCart, dataCart, editCart, deleteCart, dataDeleteCart } = useCart()

  const { data: productList, getProductList } = useProduct()
  const { isLoggedIn } = useAuthStore()
  const { setNotificationUI } = useNotificationUI()

  const [data, setData] = useState<CartItem | null>()
  const { product, quantity } = data || {}
  const { price, quantity: quantityTotal, sizeOptions, selectedSize } = useProductDetail(product)

  const timer = useRef<any>()

  const image = useMemo(() => product?.images?.find((item) => item.isDefault), [product?.images, data, product])
  const brands = useMemo(() => findObjectByName(product?.attributeGroups || [], 'key', PRODUCT_ATTRIBUTE.BRAND)?.attributes, [product])
  const brandString = useMemo(() => brands?.map((item) => item.value).join(', '), [brands])

  useEffect(() => {
    if (showModalAddSuccess) {
      if (isLoggedIn) getCart()
      else {
        setData(getLocalStorageCart()?.[0] || {})
      }
    }
  }, [showModalAddSuccess])

  // get product first in list card to display
  useEffect(() => {
    if (dataCart?.data?.results[0]) {
      setData(dataCart?.data?.results[0])
    }
  }, [dataCart])

  // load list Prod May be Also Like
  useEffect(() => {
    if (data?.product?.id) getProductList({ where: { relatedProductIds: [product?.id || ''] } })
  }, [data])

  // off popover after delete
  useEffect(() => {
    if (dataDeleteCart?.data) _onClose()
  }, [dataDeleteCart])

  const _onClose = () => {
    toggleModalAddSuccess(false) //off
  }

  const getLocalStorageCart = () => {
    let prodsCard: any = getLocalStorage('MDB_LIST_PRODUCT_CART')
    prodsCard = prodsCard ? JSON.parse(prodsCard) : []
    return prodsCard
  }

  const _editCart = (params: object) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      if (data?.id) editCart({ ...params, id: data.id })
      else renderNotFound()
    }, 500)
  }

  const _deleteCart = () => {
    if (data?.id) deleteCart(data?.id)
    else renderNotFound()
  }

  const renderNotFound = () => {
    return setNotificationUI({ open: true, message: 'Not found id', type: 'success' })
  }
  const goCart = () => {
    // router.push(routers.cartPage())
  }

  return (
    <Modal bodyClassName={stylesModal.wrapper} contentClassName={stylesModal.wrapper__content} open={showModalAddSuccess} onClose={_onClose}>
      <div className={stylesModal.header}>
        <span className={stylesModal.header__icon} />
        <div className={stylesModal.header__label}>Added to Cart</div>
      </div>
      <div className={stylesModal.body}>
        <div className={stylesModal.product}>
          <ImageComponent src={image?.url} className={stylesModal.product__image} width={100} height={100} />
          <div className={stylesModal.product__info}>
            <h3 className={'line-clamp-2'}>{product?.name}</h3>
            <h3 className={'pt-4'}>{currencyFormatter.format(price)}</h3>
          </div>
        </div>
        <CustomForm>
          <div className={stylesModal.body__form}>
            <div className={'flex items-center justify-center'}>
              <SelectField className={stylesModal.body__form__select} inputClassName="h-10" name="size" options={sizeOptions} onChange={(vl) => _editCart({ productSizeId: vl })} />
            </div>
            <div className={'flex items-center justify-center'}>
              <Quantity name="quantity" min={1} max={quantityTotal} defaultValue={quantity} value={data?.quantity} onChange={(vl) => _editCart({ quantity: vl })} />
              <Button variant={'outlined'} className={'ml-2 !border-gray-400 w-8 h-8'} onClick={_deleteCart}>
                <ImageComponent src={'/images/icons/delete.svg'} width={16} height={16} />
              </Button>
            </div>
          </div>
        </CustomForm>
        <Button className={'!w-[200px] mt-6'} onClick={goCart}>
          Checkout
        </Button>
        <Button variant={'outlined'} className={'!w-[200px]'} onClick={_onClose}>
          Return to Shopping
        </Button>
        <RelatedProduct products={productList?.results || []} title="You May Also Like" className="mt-5" listClassName="mt-4 lg:mt-10" />
      </div>
    </Modal>
  )
}
