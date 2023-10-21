import classNames from 'classnames'

import styles from '@/styles/modules/product/detail.module.scss'
import { ProductDetail } from '@/types/product/detail'

import RelatedProduct from '@/components/common/product/related'

import Description from './description'
import Information from './information'
import Reviews from './review'

type Props = {
  data: ProductDetail
}

export default function ProductDetailComponent({ data }: Props) {
  return (
    <>
      <div className={styles.content}>
        <Information data={data} />
        <Description data={data} />
      </div>
      <hr className={classNames(styles.hr, 'hidden lg:block')} />
      <div className={styles.related}>
        <RelatedProduct products={[]} title="You May Also Like" />
      </div>
      <Reviews />
    </>
  )
}
