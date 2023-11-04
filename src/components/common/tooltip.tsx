import React, { useEffect, useRef, useState } from 'react'

import classNames from 'classnames'

import styles from '@/styles/modules/tooltip.module.scss'

type Props = {
  children: React.ReactNode
  content: React.ReactNode
  className?: string
  closeOnOutsideClick?: boolean
  direction?: 'top' | 'bottom' | 'left' | 'right'
}

const Tooltip: React.FC<Props> = ({ children, content, className, closeOnOutsideClick = true, direction = 'bottom' }) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (closeOnOutsideClick && tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsTooltipVisible(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isTooltipVisible])

  return (
    <div className={classNames(styles.wrapper, className)} ref={tooltipRef} onMouseEnter={() => setIsTooltipVisible(!isTooltipVisible)}>
      <div className={styles.tooltip}>
        {children}
        {isTooltipVisible && (
          <>
            <div
              className={classNames(styles.tooltip__arrow, [styles[direction]], {
                [styles.active]: isTooltipVisible
              })}
            />
            <div
              className={classNames(styles.tooltip__content, [styles[direction]], {
                [styles.active]: isTooltipVisible
              })}
            >
              {content}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Tooltip
