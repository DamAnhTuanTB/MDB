import { useMemo } from 'react'

import { filterList } from '@/configs/product-filter'
import styles from '@/styles/modules/product/sidebar.module.scss'

import CheckList from './check-list'
import Rating from './rating'
import Slider from './slider'

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
        switch (filter.type) {
          case 'checkList':
            return <CheckList key={index} value={filter} />
          case 'range':
            return <Slider key={index} title={filter.title} />
          case 'rating':
            return <Rating key={index} title={filter.title} />
          default:
            return
        }
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
