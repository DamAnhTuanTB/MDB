import {useEffect, useMemo, useRef, useState} from 'react'

import {useProduct} from '@/hooks/pages/use-product'
import {useProductDetail} from '@/hooks/pages/use-product-detail'
import {useCart} from '@/hooks/use-cart'
import {useCartStore} from '@/recoil/cart'
import {useNotificationUI} from '@/recoil/common-ui'
import stylesModal from '@/styles/modules/cart/modal-add-cart-success.module.scss'
import {currencyFormatter, getLocalStorage} from '@/utils/helper'

import RelatedProduct from '@/components/cart/related'
import ImageComponent from '@/components/common/image'
import CustomForm from '@/components/form'
import SelectField from '@/components/form/select-field'

import Button from '../common/button'
import Modal from '../common/modal'
import Quantity from '../common/quantity'
import {useRouterWithQueryParams} from '@/hooks/use-router-with-query-params'
import routes from '@/routes'

export default function ModalAddCartSuccess(props) {
  const timer = useRef<any>()

  const {open: dataProps} = props;

  const {push} = useRouterWithQueryParams()
  const {setCartModal} = useCartStore()
  const {setNotificationUI} = useNotificationUI()
  const {data: productList, getProductList} = useProduct()
  const {editCart, deleteCart, dataDeleteCart} = useCart()

  const {
    sizeOptions,
    selectedSize,
    sizeOptionsData,
    setSelectedSize,
    handleUpdateSize
  } = useProductDetail(dataProps?.product)
  const product = useMemo(() => sizeOptionsData?.results?.find((prod) => prod?.size === (Number(selectedSize) || dataProps?.product?.size)) || dataProps?.product, [sizeOptionsData, selectedSize, dataProps])
  const image = useMemo(() => product?.images?.find((item: any) => item.isDefault), [product?.images, dataProps, product])

  // load list Prod May be Also Like
  useEffect(() => {
    if (product?.id) getProductList({where: {relatedProductIds: [product?.id || '']}})
  }, [product])

  // off popover after delete
  useEffect(() => {
    if (dataDeleteCart?.data) _onClose()
  }, [dataDeleteCart])

  const _onClose = () => {
    setCartModal() //off
  }

  const _editCart = (params: object) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      if (product?.id) editCart({...params, id: dataProps?.id, productId: dataProps?.productId})
      else renderNotFound()
    }, 500)
  }

  const renderNotFound = () => {
    return setNotificationUI({open: true, message: 'Not found id', type: 'success'})
  }
  const goCart = () => {
    push(routes.cartPage())
  }

  const _onDelete = () => {
    if (product?.id) {
      deleteCart(dataProps?.id || '')
      setCartModal()
    }
  }

  if (!dataProps) return null
  return (
    <Modal bodyClassName={stylesModal.wrapper} contentClassName={stylesModal.wrapper__content} open={!!dataProps.isFinal}
           onClose={_onClose}>
      <div className={stylesModal.header}>
        <span className={stylesModal.header__icon}/>
        <div className={stylesModal.header__label}>Added to Cart</div>
      </div>
      <div className={stylesModal.body}>
        <div className={stylesModal.product}>
          <ImageComponent src={image?.url} className={stylesModal.product__image} width={100} height={100}/>
          <div className={stylesModal.product__info}>
            <h3 className={'line-clamp-2'}>{product?.name}</h3>
            <h3 className={'pt-4'}>{currencyFormatter.format(product?.price || 0)}</h3>
          </div>
        </div>
        <CustomForm>
          <div className={stylesModal.body__form}>
            <div className={'flex items-center justify-center'}>
              <SelectField
                className={stylesModal.body__form__select}
                inputClassName="h-10"
                name="size"
                defaultValue={dataProps?.product?.size}
                value={dataProps?.product?.size}
                options={sizeOptions}
                onInputChange={(vl) => {
                  handleUpdateSize(vl)
                  setCartModal({...dataProps, product: {...dataProps?.product, size: Number(vl)}})
                  const item = sizeOptionsData?.results?.find((i) => i.size === Number(vl))
                  _editCart({
                    productId: item?.id || '',
                    quantity: Number(selectedSize),
                    product: item
                  })
                }}
              />
            </div>
            <div className={'flex items-center justify-center'}>
              <Quantity
                name="quantity"
                min={1}
                max={product?.quantity}
                defaultValue={dataProps?.quantity}
                value={dataProps?.quantity}
                onChange={(vl) => {
                  setCartModal({...dataProps, quantity: vl} as any)
                  _editCart({quantity: vl})
                }}
              />
              <Button variant={'outlined'} className={'ml-2 !border-gray-400 !w-8 h-8'} onClick={_onDelete}
                      isLoading={dataDeleteCart?.isLoading}>
                <ImageComponent src={'/images/icons/delete.svg'} width={16} height={16}/>
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
        {dataProps?.id && productList?.results.length &&
          <RelatedProduct products={productList?.results || []} title="You May Also Like" className="mt-5"
                          listClassName="mt-4 lg:mt-10"/>}
      </div>
    </Modal>
  )
}
