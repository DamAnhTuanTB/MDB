import { useEffect, useState } from 'react'

import classNames from 'classnames'

import styles from '@/styles/modules/checkbox.module.scss'

type Props = {
  label: React.ReactNode
  checked?: boolean
  className?: string
  labelClassName?: string
  onChange?: (value: boolean) => void
}

export default function Checkbox({ label, checked = false, className, labelClassName = '', onChange }: Props) {
  const [isChecked, setIsChecked] = useState<boolean>(checked)

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  const handleClick = () => {
    setIsChecked(!isChecked)
    onChange && onChange(!isChecked)
  }

  return (
    <div className={classNames(styles.wrapper, className)} onClick={handleClick}>
      <div className={classNames(styles.input, { [styles['checked']]: isChecked })} />
      <div className={classNames(styles.label, labelClassName)}>{label}</div>
    </div>
  )
}
