import { Fragment, useEffect, useMemo, useState } from 'react'

import { useProduct } from '@/hooks/pages/use-product'
import { useProductDetail } from '@/hooks/pages/use-product-detail'
import { useCart } from '@/hooks/use-cart'
import { useCartStore } from '@/recoil/cart'
import styles from '@/styles/modules/cart/your-cart.module.scss'
import { CartItem } from '@/types/cart'
import { Product, ProductImage } from '@/types/product'
import { currencyFormatter } from '@/utils/helper'

import ModalAddCartSuccess from '@/components/cart/modal-add-cart-success'
import Button from '@/components/common/button'
import Image from '@/components/common/image'
import RelatedProduct from '@/components/common/product/related'
import Quantity from '@/components/common/quantity'
import CustomForm from '@/components/form'
import SelectField from '@/components/form/select-field'

type stepType = {
  label: string
  isActive?: boolean
}
export default function MyCartComponent() {
  const { cart } = useCartStore()
  const { getProductList, data, isLoading: isLoadingRelated } = useProduct()
  const { getCart, dataCart } = useCart()
  const { dataModalAddSuccess } = useCartStore()

  const stepData: stepType[] = [
    {
      label: 'Your Cart',
      isActive: true
    },
    { label: 'Information' },
    { label: 'Shipping' },
    { label: 'Payment' },
    { label: 'Review' }
  ]

  useEffect(() => {
    if (cart?.listProd.length) getProductList({ where: { relatedProductIds: cart?.listProd?.map((i) => i.productId) } })
  }, [cart?.listProd, getProductList])

  const titles = ['Product', 'Quantity', 'Price', 'Total']
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {stepData.map((item: stepType, idx) => {
          return (
            <Fragment key={idx}>
              <span key={idx}>{item?.label}</span>
              {idx < stepData.length && <Image width={16} height={16} src={'images/icons/arrow_black.svg'} alt="" />}
            </Fragment>
          )
        })}
      </div>
      <div className={styles.body__grid}>
        <div className={styles.body__header}>
          {titles.map((title, idx) => (
            <h3 className={styles.body__th} key={idx}>
              {title}
            </h3>
          ))}
        </div>
        {cart?.listProd.length > 0 ? (
          <>
            <div className={styles.body__tbody}>
              {cart.listProd.map((item, idx) => (
                <CartITem data={item} key={`${idx}-${item?.productId}`} />
              ))}
            </div>
            <div className="w-full flex justify-end my-8 sm:my-10">
              <Button className="sm:!w-full md:!w-[200px]">Checkout</Button>
            </div>
          </>
        ) : (
          <p className={styles.cart__empty__text}>There are currently no items in your cart</p>
        )}
      </div>
      {!!data?.results?.length && !!cart?.listProd.length && (
        <div className={styles.footer}>
          <RelatedProduct products={data?.results || []} title="You May Also Like" className="xl:px-[70px]" listClassName="mt-4 lg:mt-10" />
        </div>
      )}
      <ModalAddCartSuccess open={dataModalAddSuccess} />
    </div>
  )
}

const CartITem = (props: { data: CartItem }) => {
  const {
    data: { product: productProps, quantity: quantityCart, id }
  } = props || {}

  const [quantitySelected, setQuantitySelected] = useState<number>(quantityCart)
  const { deleteCart, editCart, addCart } = useCart()

  const { sizeOptions, selectedSize, sizeOptionsData } = useProductDetail(props?.data?.product)
  const product: Product | undefined = useMemo(() => sizeOptionsData?.results?.find((prod) => prod?.size === Number(selectedSize)) || productProps, [sizeOptionsData, selectedSize, productProps])
  const { images, name } = product || {}
  const img = useMemo(() => images?.find((i: ProductImage, idx: number) => i.isDefault)?.url, [images])

  if (props.data?.syncType === 'delete') return null

  return (
    <div className={styles.body__tr}>
      <div className={styles.body__tr__info}>
        <Image width={125} height={125} className={styles.body__tr__image} src={img} alt="" />
        <Image
          className={`${styles.btn__delete} invisible md:visible`}
          src={'/images/icons/close.svg'}
          onClick={() => {
            deleteCart(id)
          }}
          alt=""
        />
        <button
          className={styles.span__remove}
          onClick={() => {
            deleteCart(id)
          }}
        >
          Remove
        </button>
        <CustomForm>
          <div className={styles.body__item__decription}>
            <div className={'line-clamp-2'}>{name}</div>
            <div className={'flex gap-2'}>
              <SelectField
                className={' max-w-[100px] !md:max-w-[120px] mt-2'}
                inputClassName="h-10 text-[12px] rounded-[8px]"
                name="size"
                options={sizeOptions}
                defaultValue={product?.size}
                value={product?.size}
                onInputChange={(vl) => {
                  const item = sizeOptionsData?.results?.find((i) => i.size === Number(vl))
                  editCart({
                    id: props?.data?.id || '',
                    productId: item?.id || '',
                    product: item
                  })
                }}
              />
              <Quantity
                className={'mt-2 visible md:invisible max-h-11 max-w-[100px] m-0 md:m-[auto]'}
                name="quantity"
                min={1}
                max={product?.quantity}
                defaultValue={quantityCart}
                value={quantityCart}
                onChange={(vl) => {
                  editCart({ productId: id, id: id, quantity: vl })
                  setQuantitySelected(vl)
                }}
              />
            </div>
          </div>
        </CustomForm>
      </div>
      <Quantity
        className={'invisible md:visible max-h-11 max-w-[120px]'}
        name="quantity"
        min={1}
        max={product?.quantity}
        defaultValue={quantityCart}
        value={quantityCart}
        onChange={(vl) => {
          setQuantitySelected(vl)
          editCart({ productId: id, id, quantity: vl })
        }}
      />
      <div className={`${styles.body__item__price} invisible md:visible`}>{currencyFormatter.format(product?.price || 0)}</div>
      <div className={styles.body__item__price}>{currencyFormatter.format((product?.price || 0) * quantitySelected || 0)}</div>
    </div>
  )
}
