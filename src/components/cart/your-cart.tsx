import Breadcrumb, { BreadcrumbItem } from '@/components/common/breadcrumb'
import routes from '@/routes'
import React, { useEffect, useMemo, useState } from 'react'
import { useCartStore } from '@/recoil/cart'
import styles from '@/styles/modules/cart/your-cart.module.scss'
import Image from '@/components/common/image'
import Button from '@/components/common/button'
import { currencyFormatter, findObjectByName } from '@/utils/helper'
import SelectField, { SelectOption } from '@/components/form/select-field'
import { CartItem } from '@/types/cart'
import { ProductSize, PRODUCT_ATTRIBUTE } from '@/types/product'
import Quantity from '@/components/common/quantity'
import { useCart } from '@/hooks/use-cart'
import Modal from '@/components/common/modal'

export default function MyCartComponent() {
  const [isActive, setIsActive] = useState(0)
  const { cart } = useCartStore()
  const { getCart, deleteCart, editCart } = useCart()

  const breadCrumb: BreadcrumbItem[] = [
    {
      label: 'Your Cart',
      href: routes.cartPage()
    },
    { label: 'Information' },
    { label: 'Shipping' },
    { label: 'Payment' },
    { label: 'Review' }
  ]

  const titles = ['Product', 'Quantity', 'Price', 'Total']

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Breadcrumb items={breadCrumb} />
      </div>
      <div className={styles.body__grid}>
        <div className={styles.body__header}>
          {titles.map((title, idx) => (
            <h3 className={styles.body__th} key={idx}>
              {title}
            </h3>
          ))}
        </div>
        <div className={styles.body__tbody}>{cart?.listProd?.map((item, idx) => <CartITem data={item} key={idx} />)}</div>
        <div className={styles.body__foot} />
      </div>
      <div className={styles.footer}></div>
    </div>
  )
}

const CartITem = (props: { data: CartItem }) => {
  const {
    data: { product, quantity: quantityCart, size, id }
  } = props || {}
  const [quantitySelected, setQuantitySelected] = useState<number>(quantityCart)
  const { images, name, sizes, quantity } = product || {}
  const { deleteCart, getCart, editCart } = useCart()
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  const unit = findObjectByName(product?.attributeGroups || [], 'key', PRODUCT_ATTRIBUTE.UNIT)?.attributes[0]?.value
  const sizeOptions: SelectOption[] =
    useMemo(
      () =>
        product?.sizes?.map((item: ProductSize) => ({
          label: item.size + ' ' + unit,
          value: item.id
        })),
      [product?.sizes, unit]
    ) || []
  // const price = sizeOptions.find(i=>i.id===data.)

  useEffect(() => {}, [product])

  useEffect(() => {
    editCart({ cartItemId: id, quantity: quantitySelected })
  }, [quantitySelected])

  const img = images.find((i: any, idx: any) => i.isDefault)?.url
  const price = sizes?.find((item) => item.id === size)?.price || 0

  return (
    <div className={styles.body__tr}>
      <div className={styles.body__tr__info}>
        <Image src={img} width={100} height={100} />
        <Image className={styles.btn__delete} src={'/images/icons/close.svg'} onClick={() => setOpenModalDelete(true)} />
        <div className={styles.body__item__decription}>
          <div className={'line-clamp-2'}>{name}</div>
          {/*<SelectField inputClassName="h-10 text-[12px]" name="size" options={sizeOptions} onInputChange={() => {}} />*/}
        </div>
      </div>
      <Quantity className={'max-h-8 max-w-[80px] m-[auto]'} name="quantity" min={1} max={quantity} defaultValue={1} onChange={setQuantitySelected} />
      <div className={styles.body__item__price}>{currencyFormatter.format(price)}</div>
      <div className={styles.body__item__price}>{currencyFormatter.format(price * quantitySelected || 0)}</div>
      <Modal
        open={openModalDelete}
        onClose={() => {
          setOpenModalDelete(false)
        }}
        contentClassName={'flex flex-col items-center justify-center gap-4'}
        bodyClassName={'!w-[400px]'}
      >
        <h3>Are you sure delete product?</h3>
        <div>
          <Button
            className={'mr-4'}
            onClick={() => {
              deleteCart(id)
              setOpenModalDelete(false)
            }}
          >
            Yes
          </Button>
          <Button variant={'outlined'}>No</Button>
        </div>
      </Modal>
    </div>
  )
}
