import classNames from 'classnames'

import styles from '@/styles/modules/product/detail.module.scss'
import { Product } from '@/types/product'

import RelatedProduct from '@/components/common/product/related'

import Description from './description'
import Information from './information'
import Reviews from './review'

type Props = {
  data: Product
  relatedProducts: Product[]
}

export default function ProductDetailComponent({ data, relatedProducts }: Props) {
  return (
    <>
      <div className={styles.content}>
        <Information data={data} />
        <Description data={data} />
      </div>
      <hr className={classNames(styles.hr, 'hidden lg:block')} />
      {relatedProducts.length > 0 ? (
        <div className={styles.related}>
          <RelatedProduct products={relatedProducts} title="You May Also Like" className="xl:px-[70px]" listClassName="mt-4 lg:mt-10" />
        </div>
      ) : null}
      <Reviews />
    </>
  )
}
