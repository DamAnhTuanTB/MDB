import React, {useEffect, useState} from 'react'
import {useCartStore} from '@/recoil/cart'
import styles from '@/styles/modules/cart/your-cart.module.scss'
import Image from '@/components/common/image'
import {currencyFormatter} from '@/utils/helper'
import SelectField from '@/components/form/select-field'
import {CartItem} from '@/types/cart'
import Quantity from '@/components/common/quantity'
import {useCart} from '@/hooks/use-cart'
import RelatedProduct from '@/components/common/product/related'
import {useProduct} from '@/hooks/pages/use-product'
import CustomForm from '@/components/form'
import {useProductDetail} from '@/hooks/pages/use-product-detail';

type stepType = {
  label: string
  isActive?: boolean
}
export default function MyCartComponent() {
  const {cart} = useCartStore()
  const {getProductList, data} = useProduct()

  const stepData: stepType[] = [
    {
      label: 'Your Cart',
      isActive: true
    },
    {label: 'Information'},
    {label: 'Shipping'},
    {label: 'Payment'},
    {label: 'Review'}
  ]

  useEffect(() => {
    if (!data?.results) getProductList({where: {relatedProductIds: cart?.listProd?.map((i) => i.productId)}})
  }, [data?.results])

  const titles = ['Product', 'Quantity', 'Price', 'Total']

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {stepData.map((item: stepType, idx) => {
          return (
            <>
              <span key={idx}>{item?.label}</span>
              {idx < stepData.length && <Image width={16} height={16} src={'images/icons/arrow_black.svg'}/>}
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
        <div className={styles.body__tbody}>{cart?.listProd?.map((item, idx) => <CartITem data={item}
                                                                                          key={idx}/>)}</div>
      </div>
      <div className={styles.footer}>
        <RelatedProduct products={data?.results || []} title="You May Also Like" className="xl:px-[70px]"
                        listClassName="mt-4 lg:mt-10"/>
      </div>
    </div>
  )
}

const CartITem = (props: { data: CartItem }) => {
  const {
    data: {product, quantity: quantityCart, size, id}
  } = props || {}
  const [quantitySelected, setQuantitySelected] = useState<number>(quantityCart)
  const {images, name, sizes} = product || {}
  const {deleteCart, editCart} = useCart()

  const img = images.find((i: any, idx: any) => i.isDefault)?.url
  const {
    setSelectedSize,
    price,
    quantity,
    sizeOptions,
  } = useProductDetail(product)
  return (
    <div className={styles.body__tr}>
      <div className={styles.body__tr__info}>
        <Image width={125} height={125} className={styles.body__tr__image} src={img}/>
        <Image
          className={`${styles.btn__delete} invisible md:visible`}
          src={'/images/icons/close.svg'}
          onClick={() => {
            deleteCart(id)
          }}
        />
        <button className={styles.span__remove} onClick={() => {
          deleteCart(id)
        }}>Remove
        </button>
        <CustomForm>
          <div className={styles.body__item__decription}>
            <div className={'line-clamp-2'}>{name}</div>
            <SelectField className={' max-w-[100px] !md:max-w-[120px] mt-2'}
                         inputClassName="h-10 text-[12px] rounded-[8px]"
                         name="size"
                         options={sizeOptions} onInputChange={(vl) => {
              editCart({id, productSizeId: vl})
            }}/>
            <Quantity className={'mt-2 visible md:invisible max-h-11 max-w-[100px] m-0 md:m-[auto]'} name="quantity"
                      min={1}
                      max={quantity}
                      defaultValue={quantityCart}
                      onChange={(vl) => {
                        editCart({id, quantity: vl})
                        setQuantitySelected(vl)
                      }}/>
          </div>
        </CustomForm>
      </div>
      <Quantity className={'invisible md:visible max-h-11 max-w-[120px]'} name="quantity" min={1} max={quantity}
                defaultValue={quantityCart}
                onChange={(vl) => editCart({id, quantity: vl})}/>
      <div className={`${styles.body__item__price} invisible md:visible`}>{currencyFormatter.format(price)}</div>
      <div className={styles.body__item__price}>{currencyFormatter.format(price * quantitySelected || 0)}</div>
    </div>
  )
}
