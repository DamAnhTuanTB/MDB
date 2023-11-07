import { useMemo } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import routes from '@/routes'
import styles from '@/styles/layout/favorite.module.scss'
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
    name: 'EltaMD UV Lip Balm SPF 36',
    categories: 'skin-care',
    slug: 'la-roche-posay-spf50-50ml'
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
    categories: 'skin-care',
    slug: 'la-roche-posay-spf50-50ml'
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
    name: 'EltaMD UV Lip Balm SPF 36',
    categories: 'skin-care',
    slug: 'la-roche-posay-spf50-50ml'
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
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46',
    categories: 'skin-care',
    slug: 'la-roche-posay-spf50-50ml'
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
            <Link href={routes.productDetailPage(item.categories, item.slug)}>
              <div className={styles.product__image}>
                <Image width={100} height={100} src={getDefaultImage(item)} alt="" />
              </div>
              <div className={styles.product__content}>
                <p className={styles.product__name}>{item.name}</p>
              </div>
            </Link>
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
