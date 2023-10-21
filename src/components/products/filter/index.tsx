import { memo, useMemo, useState } from 'react'

import { defaultFilterGroup } from '@/constants/product'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import routes from '@/routes'
import styles from '@/styles/modules/product/sidebar.module.scss'
import { ProductAttributeItem, productAttributeGroup } from '@/types/product/attribute'

import CheckList from './checkbox-group'
import Rating from './rating'
import Slider from './slider'

type Props = {
  attributes: ProductAttributeItem[]
}

const Filter = ({ attributes }: Props) => {
  const { push } = useRouterWithQueryParams()
  const [clearAllFilter, setClearAllFilter] = useState<boolean>(false)

  const filterElements = useMemo(
    () =>
      defaultFilterGroup.map((item) => {
        const attribute = attributes.find((attr) => attr.key === item.key)
        if (!attribute) return item

        return {
          ...item,
          attributes: attribute.attributes
        }
      }),
    [attributes]
  )

  const checkListElements = useMemo(
    () =>
      filterElements.map((attr, index) => {
        switch (attr.type) {
          case 'rating':
            return <Rating key={index} clearFilter={clearAllFilter} title="Rating" />
          case 'slider':
            return <Slider key={index} clearFilter={clearAllFilter} title="Price" />
          default:
            return <CheckList key={index} attributes={attr.attributes || []} title={attr.name} isSPF={attr.key === productAttributeGroup.SPF} clearFilter={clearAllFilter} />
        }
      }),
    [clearAllFilter, filterElements]
  )

  const handleClearAllFilter = () => {
    push(routes.productPage())
    setClearAllFilter(true)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.heading__title}>Filter</div>
        <div className={styles.heading__clear} onClick={handleClearAllFilter}>
          Clear All
        </div>
      </div>
      {checkListElements}
    </div>
  )
}

export default memo(Filter)
