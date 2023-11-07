import React, { useEffect, useRef, useState } from 'react'

import classNames from 'classnames'

import styles from '@/styles/modules/dropdown.module.scss'

type DropdownProps = {
  children: React.ReactNode
  content?: React.ReactNode
  className?: string
  contentClassName?: string
  hoverable?: boolean
  clickable?: boolean
  closeOnOutsideClick?: boolean
  direction?: 'top' | 'bottom' | 'left' | 'right'
}

const Dropdown: React.FC<DropdownProps> = ({ children, content, className, contentClassName, hoverable = true, clickable = false, closeOnOutsideClick = true, direction = 'bottom' }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const toggleDropdown = () => {
    if (clickable) setIsOpen(!isOpen)
  }

  const handleMouseEnter = () => {
    if (hoverable) setIsOpen(true)
  }

  const handleMouseLeave = () => {
    if (hoverable) setIsOpen(false)
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (closeOnOutsideClick && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])

  return (
    <div className={classNames(styles.dropdown, className)} ref={dropdownRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={styles.dropdown__children} onClick={toggleDropdown}>
        {children}
        <div
          className={classNames(styles.arrow, [styles[direction]], {
            [styles.active]: isOpen
          })}
        />
      </div>
      <div className={classNames(styles.overlay, { [styles.active]: isOpen })} />
      <div
        className={classNames(styles.dropdown__content, contentClassName, [styles[direction]], {
          [styles.active]: isOpen
        })}
        onClick={() => setIsOpen(false)}
      >
        {content}
      </div>
    </div>
  )
}

export default Dropdown
