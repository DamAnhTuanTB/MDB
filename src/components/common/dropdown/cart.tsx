import { useMemo } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import routes from '@/routes'
import styles from '@/styles/modules/dropdown/cart.module.scss'
import { ProductCart } from '@/types/product'

export const products: ProductCart[] = [
  {
    id: '1',
    images: [
      {
        key: '01',
        url: '/images/product.png',
        isDefault: true
      }
    ],
    name: 'EltaMD UV Lip Balm SPF 36',
    categories: '/products',
    slug: '/skin-care/la-roche-posay-spf50-50ml',
    price: 28.0,
    quantity: 2
  },
  {
    id: '1',
    images: [
      {
        key: '01',
        url: '/images/product.png',
        isDefault: true
      }
    ],
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46',
    categories: '/products',
    slug: '/skin-care/la-roche-posay-spf50-50ml',
    price: 44.0,
    quantity: 1
  }
]

export default function CartProducts() {
  const getDefaultImage = (product: ProductCart) => {
    const defaultImage = product.images.find((img) => img.isDefault)
    return defaultImage ? defaultImage.url : '/images/product.png'
  }

  const cartProducts = useMemo(
    () =>
      products &&
      products.map((item, index) => {
        return (
          <Link key={index} href={routes.productDetailPage(item.categories, item.slug as string)}>
            <div className={styles.product}>
              <div className={styles.product__image}>
                <Image width={100} height={100} src={getDefaultImage(item)} alt="" />
              </div>
              <div className={styles.product__content}>
                <div className={styles.product__info}>
                  <p className={styles.product__name}>{item.name}</p>
                  <p className={styles.product__quantity}>Qty: {item.quantity}</p>
                </div>
                <p className={styles.product__price}>${item.price}</p>
              </div>
            </div>
          </Link>
        )
      }),
    [products]
  )

  return (
    <div className={styles.cart}>
      <div className={styles.cart__header}>
        <span className={styles.title}>My Cart</span>
        <Link className={styles.edit} href="#">
          Edit
        </Link>
      </div>
      <div className={styles.cart__body}>{cartProducts}</div>
      <div className={styles.cart__footer}>
        <Link href="#">
          <button>View Cart</button>
        </Link>
      </div>
    </div>
  )
}
