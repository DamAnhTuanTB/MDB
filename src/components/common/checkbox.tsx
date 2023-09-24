import { useState } from 'react'

import classNames from 'classnames'

import styles from '@/styles/modules/checkbox.module.scss'

type Props = {
  label: React.ReactNode
  defaultValue?: boolean
  onChange?: (value: boolean) => void
}

export default function Checkbox({ label, defaultValue = false, onChange }: Props) {
  const [isChecked, setIsChecked] = useState<boolean>(defaultValue)
  const handleClick = () => {
    setIsChecked(!isChecked)
    onChange && onChange(!isChecked)
  }

  return (
    <div className={styles.wrapper} onClick={handleClick}>
      <div className={classNames(styles.input, { [styles['checked']]: isChecked })} />
      <div className={styles.label}>{label}</div>
    </div>
  )
}
