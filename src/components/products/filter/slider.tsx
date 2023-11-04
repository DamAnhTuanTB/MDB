import { useEffect, useState } from 'react'

import classNames from 'classnames'
import ReactSlider from 'react-slider'

import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import styles from '@/styles/modules/product/sidebar.module.scss'
import { debounce } from '@/utils/helper'

type Props = {
  min: number
  max: number
  title?: string
  clearFilter?: boolean
}

export default function Slider({ title, clearFilter = false, min, max }: Props) {
  const { query, updateQueryParams } = useRouterWithQueryParams()
  const [value, setValue] = useState<number[]>([Number(query.minPrice || min), Number(query.maxPrice || max)])

  useEffect(() => {
    if (clearFilter) setValue([min, max])
  }, [clearFilter])

  const handleChangeValue = debounce((value: number[]) => {
    const [minPrice, maxPrice] = value.map((item) => Math.ceil(item))
    setValue(value)
    const params: any = { ...query, minPrice, maxPrice }
    if (query.hasOwnProperty('page') && query.page) params.page = 1
    updateQueryParams(params)
  }, 100)

  return (
    <div className={classNames(styles.group, { '!mt-0': !title })}>
      {title && <div className={styles.group__title}>{title}</div>}
      <div className={classNames(styles.group__value, [styles['range']])}>
        <ReactSlider
          className="slider"
          thumbClassName="slider__thumb"
          trackClassName="slider__track"
          ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
          minDistance={1}
          min={min}
          max={max}
          value={value}
          onChange={(value) => handleChangeValue(value)}
          renderThumb={(props, state) => (
            <div {...props}>
              <div className="slider__thumb__value">{`$${Math.ceil(state.valueNow)}`}</div>
            </div>
          )}
        />
      </div>
    </div>
  )
}
