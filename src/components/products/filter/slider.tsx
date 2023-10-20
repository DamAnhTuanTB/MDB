import { useState } from 'react'

import classNames from 'classnames'
import ReactSlider from 'react-slider'

import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import styles from '@/styles/modules/product/sidebar.module.scss'
import { debounce } from '@/utils/helper'

type Props = {
  title?: string
  onChange?: (value: number[]) => void
}

export default function Slider({ title, onChange }: Props) {
  const { query, updateQueryParams } = useRouterWithQueryParams()
  const [defaultValue, setDefaultValue] = useState<number[]>([Number(query.minPrice || 0), Number(query.maxPrice || 100)])

  const handleChangeValue = (value: number[]) => {
    debounce(300)(() => {
      setDefaultValue(value)
      updateQueryParams({ ...query, minPrice: value[0], maxPrice: value[1] })
    }, value)
  }

  return (
    <div className={classNames(styles.group, { '!mt-0': !title })}>
      {title && <div className={styles.group__title}>{title}</div>}
      <div className={classNames(styles.group__value, [styles['range']])}>
        <ReactSlider
          className="slider"
          thumbClassName="slider__thumb"
          trackClassName="slider__track"
          defaultValue={defaultValue}
          ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
          pearling
          minDistance={10}
          onChange={handleChangeValue}
          renderThumb={(
            {
              className,
              style,
              role,
              'aria-valuenow': ariaValueNow,
              'aria-valuemin': ariaValueMin,
              'aria-valuemax': ariaValueMax,
              'aria-disabled': areaDisabled,
              'aria-valuetext': ariaValueText,
              ref,
              key,
              onFocus,
              onMouseDown,
              onTouchStart
            },
            state
          ) => (
            <div
              ref={ref}
              className={className}
              style={style}
              role={role}
              key={key || `key${new Date().getTime()}`}
              aria-orientation={'horizontal'}
              aria-valuenow={ariaValueNow}
              aria-valuemin={ariaValueMin}
              aria-valuemax={ariaValueMax}
              aria-disabled={areaDisabled}
              aria-valuetext={ariaValueText}
              onFocus={onFocus}
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
            >
              <div className="slider__thumb__value">{`$${state.valueNow}`}</div>
            </div>
          )}
        />
      </div>
    </div>
  )
}
