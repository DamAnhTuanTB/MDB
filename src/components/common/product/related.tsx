import { useMemo, useState } from 'react'

import classNames from 'classnames'

import styles from '@/styles/modules/product/related.module.scss'
import { Product } from '@/types/product'
import { ProductCategory } from '@/types/product/category'

import ProductItem from './item'
import QuickReviewModal from './quick-review-modal'

type Props = {
  title?: string
  products: Product[]
  category?: ProductCategory
  className?: string
  listClassName?: string
}

export default function RelatedProduct({ title, products, category, className, listClassName }: Props) {
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
    <div className={classNames(styles.wrapper, className)}>
      <h3 className={styles.title}>{title}</h3>
      <div className={classNames(styles.list, listClassName)}>{productElements}</div>
      {quickReviewData && openQuickReview && <QuickReviewModal open={openQuickReview} data={quickReviewData} onClose={() => setOpenQuickReview(false)} />}
    </div>
  )
}
