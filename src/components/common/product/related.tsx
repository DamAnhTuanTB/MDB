import { useMemo } from 'react'

import styles from '@/styles/modules/product/related.module.scss'
import { Product } from '@/types/product'

import ProductItem from './item'

type Props = {
  title?: string
  products: Product[]
}

export default function RelatedProduct({ title, products }: Props) {
  const productElements = useMemo(
    () =>
      products &&
      products.map((product, index) => {
        return <ProductItem className="swiper-slide" key={index} product={product} />
      }),
    [products]
  )

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.list}>{productElements}</div>
    </div>
  )
}
