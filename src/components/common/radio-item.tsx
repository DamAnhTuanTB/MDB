import classNames from 'classnames'

import styles from '@/styles/modules/radio-item.module.scss'

type Props = {
  children: React.ReactNode
  title: string
  className?: string
  iconCheckClassname?: string
  isSelected?: boolean
  onSelect: () => void
  onEdit?: () => void
  onRemove?: () => void
}

export default function RadioItem({ children, title, className, iconCheckClassname, isSelected = false, onSelect, onEdit, onRemove }: Props) {
  return (
    <div className={classNames(styles.radio, className)}>
      <div onClick={onSelect} className={classNames(styles.radio__check, iconCheckClassname, { [styles.checked]: isSelected })}></div>
      <div className={styles.radio__content}>
        <div className={styles.header}>
          <p>{title}</p>
          <div className={styles.header__operation}>
            <p onClick={onEdit}>Edit</p>
            <p onClick={onRemove}>Remove</p>
          </div>
        </div>
        <div className={styles.radio__detail}>{children}</div>
      </div>
    </div>
  )
}
