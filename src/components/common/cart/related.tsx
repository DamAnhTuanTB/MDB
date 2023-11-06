import { useMemo, useState } from 'react'

import classNames from 'classnames'

import stylesCart from '@/styles/modules/cart/modal-add-cart-success.module.scss'
import styles from '@/styles/modules/product/related.module.scss'
import { Product } from '@/types/product'
import { ProductCategory } from '@/types/product/category'

import QuickReviewModal from '@/components/common/product/quick-review-modal'

import ProductItem from './product-item'

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
      products?.map((product, index) => {
        if (index % 2 === 1) return null
        return (
          <>
            <ProductItem className="swiper-slide" key={index} product={product} onQuickReview={() => handleQuickReview(product)} />
            {products[index + 1] && (
              <ProductItem className={classNames(stylesCart['border-line'], 'swiper-slide')} key={index} product={products[index + 1]} onQuickReview={() => handleQuickReview(products[index + 1])} />
            )}
          </>
        )
      }),
    [products]
  )

  return (
    <div className={classNames(styles.wrapper, className)}>
      <h3 className={styles.title}>{title}</h3>
      <div className={classNames(styles.list, listClassName, '!gap-10')}>{productElements}</div>
      {quickReviewData && <QuickReviewModal open={openQuickReview} data={quickReviewData} onClose={() => setOpenQuickReview(false)} />}
    </div>
  )
}
