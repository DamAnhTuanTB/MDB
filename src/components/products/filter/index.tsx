import { memo, useMemo } from 'react'

import { defaultFilterGroup } from '@/constants/product'
import styles from '@/styles/modules/product/sidebar.module.scss'
import { DefaultFilterData } from '@/types/product'
import { ProductAttributeItem, productAttributeGroup } from '@/types/product/attribute'

import CheckListGroup from './checkbox-group'
import Rating from './rating'
import Slider from './slider'

type Props = {
  attributes: ProductAttributeItem[]
  defaultData: DefaultFilterData
  clearAllFilter?: boolean
  onClearFilter: () => void
}

const Filter = ({ attributes, defaultData, clearAllFilter = false, onClearFilter }: Props) => {
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
            return <Slider key={index} clearFilter={clearAllFilter} title="Price" min={defaultData?.price?.min || 0} max={defaultData?.price?.max || 10000} />
          default:
            return <CheckListGroup key={index} attributes={attr.attributes || []} title={attr.name} isSPF={attr.key === productAttributeGroup.SPF} clearFilter={clearAllFilter} />
        }
      }),
    [clearAllFilter, filterElements, defaultData]
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.heading__title}>Filter</div>
        <div className={styles.heading__clear} onClick={onClearFilter}>
          Clear All
        </div>
      </div>
      {checkListElements}
    </div>
  )
}

export default memo(Filter)
