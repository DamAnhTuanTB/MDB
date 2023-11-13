import React, { useEffect, useMemo, useState } from 'react'
import { useCartStore } from '@/recoil/cart'
import styles from '@/styles/modules/cart/your-cart.module.scss'
import Image from '@/components/common/image'
import { currencyFormatter } from '@/utils/helper'
import SelectField from '@/components/form/select-field'
import { CartItem } from '@/types/cart'
import Quantity from '@/components/common/quantity'
import { useCart } from '@/hooks/use-cart'
import RelatedProduct from '@/components/common/product/related'
import { useProduct } from '@/hooks/pages/use-product'
import CustomForm from '@/components/form'
import { useProductDetail } from '@/hooks/pages/use-product-detail'
import { useAuthStore } from '@/recoil/auth'
import { useCustomerLogin } from '@/hooks/pages/use-customer-login'

type stepType = {
  label: string
  isActive?: boolean
}
export default function MyCartComponent() {
  const { cart } = useCartStore()
  const { getProductList, data } = useProduct()
  const { getCart } = useCart()
  const { profile: profileStage, isLoading } = useAuthStore()
  const { loginPutBack } = useCustomerLogin()

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
    getCart()
  }, [isLoading, profileStage])

  useEffect(() => {
    if (!data?.results) getProductList({ where: { relatedProductIds: cart?.listProd?.map((i) => i.productId) } })
  }, [data?.results])

  const titles = ['Product', 'Quantity', 'Price', 'Total']
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {stepData.map((item: stepType, idx) => {
          return (
            <>
              <span key={idx}>{item?.label}</span>
              {idx < stepData.length && <Image width={16} height={16} src={'images/icons/arrow_black.svg'} />}
            </>
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
        <div className={styles.body__tbody}>{cart?.listProd?.map((item, idx) => <CartITem data={item} key={`${idx}-${item?.id}`} />)}</div>
      </div>
      {data?.results?.length && (
        <div className={styles.footer}>
          <RelatedProduct products={data?.results || []} title="You May Also Like" className="xl:px-[70px]" listClassName="mt-4 lg:mt-10" />
        </div>
      )}
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
  const product: any = useMemo(
    () => sizeOptionsData?.results?.find((prod) => prod?.size === (Number(selectedSize) || props?.data?.product?.size)),
    [sizeOptionsData, selectedSize, props?.data?.product]
  )
  const { images, name, sizes } = product || {}
  const img = useMemo(() => images?.find((i: any, idx: any) => i.isDefault)?.url, [product, images])

  if (product?.syncType === 'delete') return null

  return (
    <div className={styles.body__tr}>
      <div className={styles.body__tr__info}>
        <Image width={125} height={125} className={styles.body__tr__image} src={img} />
        <Image
          className={`${styles.btn__delete} invisible md:visible`}
          src={'/images/icons/close.svg'}
          onClick={() => {
            deleteCart(id)
          }}
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
                    // product: item
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
