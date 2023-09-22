import { useMemo } from 'react'

import styles from '@/styles/modules/product.module.scss'

import ProductItem, { ProductType } from './item'

type Props = {
  title?: string
  products: ProductType[]
}

export default function ProductList({ products, title }: Props) {
  const productElements = useMemo(
    () =>
      products &&
      products.map((product, index) => {
        return <ProductItem key={index} product={product} />
      }),
    []
  )

  return (
    <div className={styles.list}>
      <div className="container mx-auto">
        {title && <h3 className={styles.list__title}>{title}</h3>}
        <div className={styles.list__products}>{productElements}</div>
      </div>
    </div>
  )
}
