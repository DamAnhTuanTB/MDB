import React, { useEffect, useRef, useState } from 'react'

import classNames from 'classnames'

import useDevice from '@/hooks/use-device'
import styles from '@/styles/modules/tooltip.module.scss'

type Props = {
  children: React.ReactNode
  content: React.ReactNode
  className?: string
  direction?: 'top' | 'bottom' | 'left' | 'right'
}

const Tooltip: React.FC<Props> = ({ children, content, className, direction = 'bottom' }) => {
  const { isMobile, isTablet, isPc } = useDevice()
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false)

  const handleMouseEnter = () => {
    if (isPc) setIsTooltipVisible(true)
  }

  const handleMouseLeave = () => {
    if (isPc) setIsTooltipVisible(false)
  }

  useEffect(() => {
    const handleClick = () => {
      if (isMobile || isTablet) setIsTooltipVisible(!isTooltipVisible)
    }

    if (isMobile || isTablet) tooltipRef.current?.addEventListener('click', handleClick)

    return () => {
      if (isMobile || isTablet) tooltipRef.current?.removeEventListener('click', handleClick)
    }
  }, [isMobile, isTablet, isTooltipVisible])

  return (
    <div className={classNames(styles.wrapper, className)} ref={tooltipRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
