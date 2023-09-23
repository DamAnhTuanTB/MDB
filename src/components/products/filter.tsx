import { useMemo } from 'react'

import { filterList } from '@/configs/product-filter'
import styles from '@/styles/modules/product/sidebar.module.scss'

import Checkbox from '../common/checkbox'

export type Filter = {
  key: string
  label: string
  defaultValue?: boolean
}

export type FilterGroup = {
  title: string
  type: 'checkList' | 'range' | 'rating'
  checkList?: Filter[]
  range?: number[]
}

type Props = {
  onFilter: () => void
}

export default function Filter({}: Props) {
  const filterElement = useMemo(
    () =>
      filterList &&
      filterList.map((filter, index) => {
        const inputElements = filter.checkList && filter.checkList.map((item, index) => <Checkbox key={index} label={item.label} onChange={(checked) => console.log(item.key, checked)} />)

        return (
          <div key={index} className={styles.group}>
            <div className={styles.group__title}>SPF Rating</div>
            <div className={styles.group__value}>{inputElements}</div>
          </div>
        )
      }),
    []
  )
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.heading__title}>Filter</div>
        <div className={styles.heading__clear}>Clear All</div>
      </div>
      {filterElement}
    </div>
  )
}
