import { useEffect, useMemo, useState } from 'react'

import classNames from 'classnames'

import styles from '@/styles/modules/quantity.module.scss'

type Props = {
  name: string
  defaultValue?: number
  value?: number
  min?: number
  max?: number
  className?: string
  onChange?: (value: number) => void
}

export default function Quantity({ value: valueProps, name, defaultValue = 0, min = 0, max, className, onChange }: Props) {
  const [value, setValue] = useState<number>(defaultValue || 0)

  const increase = () => {
    if (value === max) return
    setValue(value + 1)

    onChange && onChange(value + 1)
  }

  useEffect(() => {
    if (valueProps) setValue(valueProps || 0)
  }, [valueProps])

  const decrease = () => {
    if (value === min) return
    setValue(value - 1)
    onChange && onChange(value - 1)
  }

  return (
    <div className={classNames(styles.wrapper, className)}>
      <span className={classNames(styles.button, [styles['minus']], { [styles['disabled']]: value === min })} onClick={decrease} />
      {useMemo(
        () => (
          <input name={name} value={value} min={min} max={max} disabled />
        ),
        [value]
      )}
      <span className={classNames(styles.button, [styles['add']], { [styles['disabled']]: value === max })} onClick={increase} />
    </div>
  )
}
