import { useEffect, useMemo } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { useAccountFavorite } from '@/hooks/pages/use-account-favorite'
import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { useFavoriteStore } from '@/recoil/favorite'
import routes from '@/routes'
import styles from '@/styles/layout/favorite.module.scss'
import { Product } from '@/types/product'
import { ProductCategory } from '@/types/product/category'

export default function FavoriteProducts() {
  const { query } = useRouterWithQueryParams()
  const { favorites, setFavorites } = useFavoriteStore()
  const { getFavorite, data: favoriteProducts } = useAccountFavorite()
  const { getProfile, profile } = useAccountInformation()

  useEffect(() => {
    getProfile(undefined)
  }, [])

  useEffect(() => {
    if (profile?.data) {
      getFavorite({ noPagination: true })
    }
  }, [profile?.data])

  useEffect(() => {
    if (favoriteProducts) {
      setFavorites(favoriteProducts?.results)
    }
  }, [favoriteProducts])

  const getDefaultImage = (product: Product) => {
    const defaultImage = product.images.find((img) => img.isDefault)
    return defaultImage ? defaultImage.url : '/images/product.png'
  }

  const renderFavoriteProducts = useMemo(
    () =>
      favorites &&
      favorites.map((item: Product, index: number) => {
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
    [favorites]
  )

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
