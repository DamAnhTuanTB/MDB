import { memo, useMemo } from 'react'

import { defaultFilterGroup } from '@/constants/product-filter'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import styles from '@/styles/modules/product/sidebar.module.scss'
import { ProductAttributeItem } from '@/types/product/attribute'

import CheckList from './check-list'
import Rating from './rating'
import Slider from './slider'

type Props = {
  attributes: ProductAttributeItem[]
}

const Filter = ({ attributes }: Props) => {
  const { updateQueryParams } = useRouterWithQueryParams()
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
            return <Rating key={index} title="Rating" />
          case 'slider':
            return <Slider key={index} title="Price" />
          default:
            return <CheckList key={index} attributes={attr.attributes || []} title={attr.name} />
        }
      }),
    [filterElements]
  )

  const handleClearAllFilter = () => {
    updateQueryParams(undefined)
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
