import { useEffect, useMemo, useRef, useState } from 'react'

import classNames from 'classnames'
import debounce from 'lodash/debounce'

import styles from '@/styles/layout/menu/sub-menu-desktop/index.module.scss'

import { MenuItem } from '@/models/menu'

import SubMenuItemDesktop from './item'

type Props = {
  items: MenuItem[]
  className?: string
  onClose: () => void
}

export default function SubMenuDesktop({ items, className, onClose }: Props) {
  const [topPosition, setTopPosition] = useState<number>(0)

  const handleResize = () => {
    const newTopPosition = window.innerWidth < 1281 ? 73 : 78
    setTopPosition(newTopPosition)
  }
  const debouncedHandleResize = debounce(handleResize, 30)

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize)
    handleResize()
    return () => {
      window.addEventListener('resize', debouncedHandleResize)
    }
  }, [])

  const menuItems = useMemo(() => {
    return items.map((subItem, index) => (
      <li className={styles.sub__menu__list} key={index}>
        <SubMenuItemDesktop item={subItem} onClick={onClose} />
      </li>
    ))
  }, [])

  return (
    <div className={classNames(styles.wrapper, className)} style={{ top: topPosition + 'px' }}>
      {menuItems}
    </div>
  )
}
