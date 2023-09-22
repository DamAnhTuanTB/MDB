import { useMemo } from 'react'

import Link from 'next/link'

import classNames from 'classnames'

import styles from '@/styles/modules/product.module.scss'

import Button from '../common/button'

export type ProductType = {
  slug: string
  img: string
  name: string
  isFavorite: boolean
  rating: number
  price: string
}

type Props = {
  product: ProductType
  className?: string
}

export default function ProductItem({ product, className }: Props) {
  const ratingScore = useMemo(() => Math.ceil(product.rating), [product.rating])

  const ratingElements = useMemo(() => [1, 2, 3, 4, 5].map((num) => <div key={num} className={classNames(styles.item__rating__star, { [styles['active']]: num <= ratingScore })}></div>), [ratingScore])

  return (
    <div className={classNames(styles.item, className)}>
      <div className={classNames(styles.item__favorite, { [styles['active']]: product.isFavorite })} />
      <Link href={'/'} title={product.name}>
        <div className={styles.item__image} style={{ backgroundImage: `url(${product.img})` }} />
        <h3 className={styles.item__name}>{product.name}</h3>
      </Link>
      <div className={styles.item__rating}>{ratingElements}</div>
      <p className={styles.item__price}>{product.price}</p>
      <Button className={styles.item__button}>Add to cart</Button>
    </div>
  )
}
