import { useMemo, useState } from 'react'

import styles from '@/styles/modules/product/related.module.scss'
import { Product } from '@/types/product'
import { ProductCategory } from '@/types/product/category'

import ProductItem from './item'
import QuickReviewModal from './quick-review-modal'

type Props = {
  title?: string
  products: Product[]
  category?: ProductCategory
}

export default function RelatedProduct({ title, products, category }: Props) {
  const [openQuickReview, setOpenQuickReview] = useState<boolean>(false)
  const [quickReviewData, setQuickReviewData] = useState<Product>()

  const handleQuickReview = (product: Product) => {
    setQuickReviewData(product)
    setOpenQuickReview(true)
  }

  const productElements = useMemo(
    () =>
      products &&
      products.map((product, index) => {
        return <ProductItem className="swiper-slide" key={index} product={product} onQuickReview={() => handleQuickReview(product)} />
      }),
    [products]
  )

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.list}>{productElements}</div>
      <QuickReviewModal open={openQuickReview} data={quickReviewData} onClose={() => setOpenQuickReview(false)} />
    </div>
  )
}
