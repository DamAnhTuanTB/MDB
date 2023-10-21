import { useMemo } from 'react'

import Image from 'next/image'

import styles from '@/styles/modules/product/description.module.scss'
import { ProductDetail } from '@/types/product/detail'

import HtmlRender from '@/components/common/html-render'

type Props = {
  data: ProductDetail
}

export default function DescriptionDetail({ data }: Props) {
  const iconElements = useMemo(() => data?.icons?.map((item) => <Image key={item.id} src={'/images/products/icon.png'} width={100} height={100} alt="icon" />), [data?.icons])

  return (
    <div className={styles.content_wrapper}>
      <div className={styles.table}>
        <div className="max-w-full lg:max-w-[50%]">
          <h3>Product Features</h3>
          <HtmlRender className="mt-2" htmlString={data?.features} />
        </div>
        <div className={styles.icons}>{iconElements}</div>
      </div>
      <hr />

      <h3>Awards</h3>
      <HtmlRender className="mt-2" htmlString={data?.awards} />
      <hr />

      <h3>Ingredients</h3>
      <h4>Active Ingredients:</h4>
      <HtmlRender className="mt-2" htmlString={data?.activeIngredients} />
      <h4>Inactive Ingredients: </h4>
      <HtmlRender className="mt-2" htmlString={data?.inactiveIngredients} />
    </div>
  )
}
