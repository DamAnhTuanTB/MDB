import { useRef, useState } from 'react'

import classNames from 'classnames'

import styles from '@/styles/modules/collapse.module.scss'

export type Props = {
  title: string
  isActive?: boolean
  children?: React.ReactNode
  className?: string
  headingClassName?: string
  contentClassName?: string
  onToggle?: () => void
}

export default function CollapseItem({ title, isActive = false, children, className, headingClassName, contentClassName, onToggle }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(isActive)
  const collapseBodyRef = useRef<HTMLDivElement>(null)
  const [bodyHeight, setBodyHeight] = useState<number>(0)

  const hanldeClickHeading = () => {
    const height = collapseBodyRef.current?.clientHeight || 0
    setBodyHeight(isOpen ? 0 : height)

    setIsOpen(!isOpen)
    onToggle && onToggle()
  }

  return (
    <div className={classNames(styles.collapse, className, { [styles.active]: isOpen })}>
      <div className={classNames(styles.collapse__heading, headingClassName)} onClick={hanldeClickHeading}>
        <h3 className={styles.collapse__heading__title}>{title}</h3>
      </div>
      <div className={styles.collapse__body} style={{ height: bodyHeight + 'px' }}>
        <div ref={collapseBodyRef} className={classNames(styles.collapse__content, contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  )
}
