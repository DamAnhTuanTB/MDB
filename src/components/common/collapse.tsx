import { useState } from 'react'

import classNames from 'classnames'

import styles from '@/styles/modules/collapse.module.scss'

export type Props = {
  title: string
  isActive?: boolean
  children?: React.ReactNode
  className?: string
  onToggle?: () => void
}

export default function CollapseItem({ title, isActive = false, children, className, onToggle }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(isActive)

  const hanldeClickHeading = () => {
    setIsOpen(!isOpen)
    onToggle && onToggle()
  }

  return (
    <div className={classNames(styles.collapse, className, { [styles['open']]: isOpen })}>
      <div className={classNames(styles.collapse__heading, { [styles['open']]: isOpen })} onClick={hanldeClickHeading}>
        <h3 className={styles.collapse__heading__title}>{title}</h3>
      </div>
      <div className={classNames(styles.collapse__body, { [styles['open']]: isOpen })}>{children}</div>
    </div>
  )
}
