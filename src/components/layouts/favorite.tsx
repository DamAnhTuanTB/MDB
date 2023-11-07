import { useEffect, useMemo } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { useAccountFavorite } from '@/hooks/pages/use-account-favorite'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import routes from '@/routes'
import styles from '@/styles/layout/favorite.module.scss'
import { Product } from '@/types/product'
import { ProductCategory } from '@/types/product/category'

export default function FavoriteProducts() {
  const { query } = useRouterWithQueryParams()

  const { getFavorite, data: favoriteProducts } = useAccountFavorite()

  useEffect(() => {
    getFavorite({ noPagination: true })
  }, [])

  const getDefaultImage = (product: Product) => {
    const defaultImage = product.images.find((img) => img.isDefault)
    return defaultImage ? defaultImage.url : '/images/product.png'
  }
  const renderFavoriteProducts = useMemo(
    () =>
      favoriteProducts?.results &&
      favoriteProducts?.results.map((item, index) => {
        const currentCategory = item?.categories?.length > 0 ? item?.categories[0] : ({} as ProductCategory)
        return (
          <div key={index} className={styles.product}>
            <Link href={routes.productDetailPage(currentCategory?.slug, item?.slug, query.affiliate as string)}>
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
    [favoriteProducts]
  )

  return (
    <div className={styles.favorite}>
      <div className={styles.favorite__header}>
        <span className={styles.title}>My Favorites</span>
        <Link className={styles.edit} href="#">
          Edit
        </Link>
      </div>
      <div className={styles.favorite__body}>{renderFavoriteProducts}</div>
    </div>
  )
}
