import { useMemo } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import styles from '@/styles/modules/dropdown/favorite.module.scss'
import { ProductFavorite } from '@/types/product'

export const products: ProductFavorite[] = [
  {
    id: '1',
    images: [
      {
        key: '01',
        url: '/images/product.png',
        isDefault: true
      }
    ],
    name: 'EltaMD UV Lip Balm SPF 36'
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
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46'
  },
  {
    id: '3',
    images: [
      {
        key: '01',
        url: '/images/product.png',
        isDefault: true
      }
    ],
    name: 'EltaMD UV Lip Balm SPF 36'
  },
  {
    id: '4',
    images: [
      {
        key: '01',
        url: '/images/product.png',
        isDefault: true
      }
    ],
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46'
  }
]

export default function FavoriteProducts() {
  const getDefaultImage = (product: ProductFavorite) => {
    const defaultImage = product.images.find((img) => img.isDefault)
    return defaultImage ? defaultImage.url : '/images/product.png'
  }
  const favoriteProducts = useMemo(
    () =>
      products &&
      products.map((item, index) => {
        return (
          <div key={index} className={styles.product}>
            <div className={styles.product__image}>
              <Image width={100} height={100} src={getDefaultImage(item)} alt="" />
            </div>
            <div className={styles.product__content}>
              <p className={styles.product__name}>{item.name}</p>
            </div>
          </div>
        )
      }),
    [products]
  )

  return (
    <div className={styles.favorite}>
      <div className={styles.favorite__header}>
        <span className={styles.title}>My Favorites</span>
        <Link className={styles.edit} href="#">
          Edit
        </Link>
      </div>
      <div className={styles.favorite__body}>{favoriteProducts}</div>
    </div>
  )
}
