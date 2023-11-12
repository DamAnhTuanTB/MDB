import { useEffect, useMemo, useState } from 'react'

import classNames from 'classnames'

import { useAccountFavorite } from '@/hooks/pages/use-account-favorite'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { useAuthStore } from '@/recoil/auth'
import { useFavoriteStore } from '@/recoil/favorite'
import routes from '@/routes'
import styles from '@/styles/modules/product/index.module.scss'
import { Product } from '@/types/product'
import { ProductCategory } from '@/types/product/category'
import { currencyFormatter } from '@/utils/helper'

import ButtonAddToCart from '@/components/cart/button-add-to-cart'
import Link from '@/components/common/custom-link'

import Button from '../button'

type Props = {
  product: Product
  category?: ProductCategory
  className?: string
  page?: string
  type?: 'black' | 'blue'
  onQuickReview?: (product: Product) => void
}

export default function ProductItem({ product, category, className, page = '', type = 'blue', onQuickReview }: Props) {
  const { query, push } = useRouterWithQueryParams()
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const { favorites, addToFavorites, removeFromFavorites } = useFavoriteStore()
  const { add, remove, addData, removeData } = useAccountFavorite()
  const { isLoggedIn } = useAuthStore()

  useMemo(() => {
    if (favorites) {
      const isProductInFavorites = favorites.some((favoriteProduct: Product) => favoriteProduct.id === product.id)
      setIsFavorite(isProductInFavorites)
    }
  }, [favorites, product])

  useEffect(() => {
    if (addData) {
      addToFavorites(product)
    }
  }, [addData])

  useEffect(() => {
    if (removeData?.data?.productId == product.id) {
      removeFromFavorites(product)
    }
  }, [removeData])

  const handleChangeFavorite = () => {
    if (!isLoggedIn) {
      push(routes.loginPage())
      return
    }
    setIsFavorite(!isFavorite)
    if (isFavorite) {
      remove({ productId: product.id })
    }
    if (!isFavorite) {
      add({ productId: product.id })
    }
  }

  const ratingScore = useMemo(() => Math.ceil(product?.averageRating), [product?.averageRating])

  const ratingElements = useMemo(
    () => [1, 2, 3, 4, 5].map((num) => <div key={num} className={classNames(styles.item__rating__star, styles[type], { [styles['active']]: num <= ratingScore })}></div>),
    [ratingScore]
  )

  const featuredImage = useMemo(() => product?.images && product.images.find((img) => img.isDefault), [product?.images])
  const currentCategory = category || product?.categories?.length > 0 ? product?.categories[0] : ({} as ProductCategory)

  const dataAdd = useMemo(() => {
    return {
      id: product?.id || '',
      productId: product?.id || '',
      quantity: 1,
      size: product?.size,
      product: product
    }
  }, [product])

  return (
    <div className={classNames(styles.item, [styles[page]], className)} data-id={product?.id}>
      <div onClick={handleChangeFavorite} className={classNames(styles.item__favorite, { [styles['active']]: isFavorite })} />
      {featuredImage && <div className={styles.item__image} style={{ backgroundImage: `url(${featuredImage.url})` }} />}
      <div className={styles.item__detail}>
        <Button variant="ocean" onClick={() => onQuickReview && onQuickReview(product)}>
          Quick Preview
        </Button>
        <Link className={styles.item__link} href={routes.productDetailPage(currentCategory?.slug, product?.slug, query.affiliate as string)}>
          <Button variant="teal">Product Details</Button>
        </Link>
      </div>
      <h3 className={styles.item__name}>{product?.name}</h3>
      <div className={styles.item__rating}>{ratingElements}</div>
      <p className={styles.item__price}>{currencyFormatter.format(product?.price)}</p>
      {dataAdd && <ButtonAddToCart className={styles.item__button} data={dataAdd} />}
    </div>
  )
}
