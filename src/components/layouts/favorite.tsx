import { useMemo } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { useFavoriteStore } from '@/recoil/favorite'
import routes from '@/routes'
import styles from '@/styles/layout/favorite.module.scss'
import { Product } from '@/types/product'
import { ProductCategory } from '@/types/product/category'

export default function FavoriteProducts() {
  const { query } = useRouterWithQueryParams()
  const { favorites } = useFavoriteStore()

  const getDefaultImage = (product: Product) => {
    const defaultImage = product.images.find((img) => img.isDefault)
    return defaultImage ? defaultImage.url : '/images/product.png'
  }

  const renderFavoriteProducts = useMemo(() => {
    if (!favorites || favorites.length === 0) {
      return <p className={styles.favorite__is__empty}>Your have no Favorites saved</p>
    }

    return favorites.map((item: Product, index: number) => {
      const currentCategory = item?.categories?.length > 0 ? item?.categories[0] : ({} as ProductCategory)

      return (
        <div key={index} className={styles.product}>
          <Link href={routes.productDetailPage(currentCategory?.slug, item?.slug, query.affiliate as string)}>
            <div className={styles.product__image}>
              <Image width={100} height={100} src={getDefaultImage(item)} alt="" />
              <div className={styles.item__image} style={{ backgroundImage: `url(${getDefaultImage(item)})` }} />
            </div>
            <div className={styles.product__content}>
              <p className={styles.product__name}>{item.name}</p>
            </div>
          </Link>
        </div>
      )
    })
  }, [favorites])

  return (
    <div className={styles.favorite}>
      <div className={styles.favorite__header}>
        <span className={styles.title}>My Favorites</span>
        <Link className={styles.edit} href={routes.favoritePage()}>
          Edit
        </Link>
      </div>
      <div className={styles.favorite__body}>{renderFavoriteProducts}</div>
    </div>
  )
}
