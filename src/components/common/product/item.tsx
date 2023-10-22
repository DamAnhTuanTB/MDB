import { useMemo } from 'react'

import Link from 'next/link'

import classNames from 'classnames'

import routes from '@/routes'
import styles from '@/styles/modules/product/index.module.scss'
import { Product } from '@/types/product'

import Button from '../button'

export type ProductType = {
  slug: string
  img: string
  name: string
  isFavorite: boolean
  rating: number
  price: string
  brand?: string
  sku?: string
  reviewCount?: number
  isInStock?: boolean
  description?: string
}

type Props = {
  product: Product
  className?: string
  page?: string
  onQuickReview?: (product: Product) => void
}

export default function ProductItem({ product, className, page = '', onQuickReview }: Props) {
  const ratingScore = useMemo(() => Math.ceil(product.averageRating), [product.averageRating])

  const ratingElements = useMemo(() => [1, 2, 3, 4, 5].map((num) => <div key={num} className={classNames(styles.item__rating__star, { [styles['active']]: num <= ratingScore })}></div>), [ratingScore])

  const featuredImage = useMemo(() => product.images.find((img) => img.isDefault), [product.images])

  return (
    <div className={classNames(styles.item, [styles[page]], className)} data-id={product.id}>
      {/* TODO: handle favorite */}
      <div className={classNames(styles.item__favorite, { [styles['active']]: true })} />
      {featuredImage && <div className={styles.item__image} style={{ backgroundImage: `url(${featuredImage.url})` }} />}
      <div className={styles.item__detail}>
        <Button variant="ocean" onClick={() => onQuickReview && onQuickReview(product)}>
          Quick Preview
        </Button>
        <Link className={styles.item__link} href={routes.productDetailPage(product.slug)}>
          <Button variant="teal">Product Details</Button>
        </Link>
      </div>
      <h3 className={styles.item__name}>{product.name}</h3>
      <div className={styles.item__rating}>{ratingElements}</div>
      <p className={styles.item__price}>{product.price}</p>
      <Button className={styles.item__button}>Add to cart</Button>
    </div>
  )
}
