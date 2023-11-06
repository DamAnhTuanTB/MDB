import { useEffect, useMemo, useState } from 'react'

import { useProduct } from '@/hooks/pages/use-product'
import { useProductDetail } from '@/hooks/pages/use-product-detail'
import { useCart } from '@/hooks/use-cart'
import { useAuthStore } from '@/recoil/auth'
import { useCartStore } from '@/recoil/cart'
import stylesModal from '@/styles/modules/cart/modal-add-cart-success.module.scss'
import { CartItem } from '@/types/cart'
import { PRODUCT_ATTRIBUTE, Product } from '@/types/product'
import { currencyFormatter, findObjectByName } from '@/utils/helper'

import RelatedProduct from '@/components/common/cart/related'
import ImageComponent from '@/components/common/image'
import CustomForm from '@/components/form'
import SelectField from '@/components/form/select-field'

import Button from '../button'
import Modal from '../modal'
import Quantity from '../quantity'

export default function ModalAddCartSuccess() {
  const {
    cart: { showModalAddSuccess },
    toggleModalAddSuccess
  } = useCartStore()
  // const { product: data } = cartItem || {}
  // const { product: data } = modalData || {}

  const [data, setData] = useState<CartItem>()
  const { product } = data || {}

  const image = useMemo(() => product?.images?.find((item) => item.isDefault), [product?.images, data, product])
  const brands = useMemo(() => findObjectByName(product?.attributeGroups || [], 'key', PRODUCT_ATTRIBUTE.BRAND)?.attributes, [product])
  const brandString = useMemo(() => brands?.map((item) => item.value).join(', '), [brands])
  const { handleUpdateSize, price, selectedSize, quantity, sizeOptions, unit, setQuantity } = useProductDetail(product)

  const { data: productList, getProductList } = useProduct()
  const { getCart, dataCart } = useCart()
  const { profile } = useAuthStore()

  useEffect(() => {
    if (profile) getCart(undefined)
    else {
      setData(getLocalStorageCart()?.[0] || {})
    }
  }, [])

  useEffect(() => {
    if (dataCart?.data?.results[0]) {
      setData(dataCart?.data?.results[0])
    }
  }, [dataCart])

  useEffect(() => {
    getProductList({ where: { relatedProductIds: [product?.id || ''] } })
  }, [product])

  const getLocalStorageCart = () => {
    let prodsCard: any = localStorage.getItem('MDB_LIST_PRODUCT_CART')
    prodsCard = prodsCard ? JSON.parse(prodsCard) : []
    return prodsCard
  }

  const _onClose = () => {
    toggleModalAddSuccess()
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
            <h3>{brandString}</h3>
            <h3 className={'pt-4'}>{currencyFormatter.format(price)}</h3>
          </div>
        </div>
        <CustomForm>
          <div className={stylesModal.body__form}>
            <div className={'flex items-center justify-center'}>
              <SelectField className={stylesModal.body__form__select} inputClassName="h-10" name="size" options={sizeOptions} onInputChange={handleUpdateSize} />
            </div>
            <div className={'flex items-center justify-center'}>
              <Quantity className={stylesModal.body__form__input} name="quantity" min={1} max={quantity} defaultValue={1} onChange={setQuantity} />
              <Button variant={'outlined'} className={'ml-2 !border-gray-400 w-10'}>
                <ImageComponent src={'/images/icons/delete.svg'} width={16} height={16} />
              </Button>
            </div>
          </div>
        </CustomForm>
        <Button className={'!w-[200px] mt-6'}>Checkout</Button>
        <Button variant={'outlined'} className={'!w-[200px]'} onClick={_onClose}>
          Return to Shopping
        </Button>
        <RelatedProduct products={productList?.results || []} title="You May Also Like" className="mt-5" listClassName="mt-4 lg:mt-10" />
      </div>
    </Modal>
  )
}
