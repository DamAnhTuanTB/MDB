import { useEffect, useRef, useState } from 'react'

import classNames from 'classnames'

import styles from '@/styles/modules/collapse.module.scss'

export type Props = {
  title: string | React.ReactNode
  isActive?: boolean
  children?: React.ReactNode
  className?: string
  headingClassName?: string
  contentClassName?: string
  onToggle?: (value: boolean) => void
}

export default function CollapseItem({ title, isActive = false, children, className = '', headingClassName = '', contentClassName = '', onToggle }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(isActive)
  const collapseBodyRef = useRef<HTMLDivElement>(null)
  const [bodyHeight, setBodyHeight] = useState<string>(isActive ? 'auto' : '0')
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    setHeight(collapseBodyRef.current?.clientHeight || 0)
  }, [])

  const hanldeClickHeading = () => {
    const height = collapseBodyRef.current?.clientHeight
    setBodyHeight(isOpen ? '0' : height + 'px')

    setIsOpen(!isOpen)
    onToggle && onToggle(!isOpen)
  }

  return (
    <div className={classNames(styles.collapse, className, { [styles.active]: isOpen })}>
      <div className={classNames(styles.collapse__heading, headingClassName)} onClick={hanldeClickHeading}>
        <h3 className={styles.collapse__heading__title}>{title}</h3>
      </div>
      <div className={styles.collapse__body} style={{ height: bodyHeight }}>
        <div ref={collapseBodyRef} className={classNames(styles.collapse__content, contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  )
}
