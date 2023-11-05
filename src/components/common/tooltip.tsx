import React, { useRef, useState } from 'react'

import classNames from 'classnames'

import styles from '@/styles/modules/tooltip.module.scss'

type Props = {
  children: React.ReactNode
  content: React.ReactNode
  className?: string
  direction?: 'top' | 'bottom' | 'left' | 'right'
}

const Tooltip: React.FC<Props> = ({ children, content, className, direction = 'bottom' }) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false)

  return (
    <div className={classNames(styles.wrapper, className)} ref={tooltipRef}>
      <div className={classNames(styles.tooltip, { [styles.active]: isTooltipVisible })}>
        <div onClick={() => setIsTooltipVisible(!isTooltipVisible)} className={styles.tooltip__icon}>
          {children}
        </div>
        <div className={styles.tooltip__body}>
          <div className={classNames(styles.tooltip__arrow, [styles[direction]])} />
          <div className={classNames(styles.tooltip__content, [styles[direction]])}>{content}</div>
        </div>
      </div>
    </div>
  )
}

export default Tooltip
