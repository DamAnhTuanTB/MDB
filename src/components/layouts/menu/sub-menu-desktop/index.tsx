import { useMemo } from 'react'

import classNames from 'classnames'

import styles from '@/styles/layout/menu/sub-menu-desktop/index.module.scss'
import { MenuItem } from '@/types/menu'

import SubMenuItemDesktop from './item'

type Props = {
  items: MenuItem[]
  className?: string
  onClose: () => void
}

export default function SubMenuDesktop({ items, className, onClose }: Props) {
  const menuItems = useMemo(() => {
    return items.map((subItem, index) => (
      <li className={styles.sub__menu__list} key={index}>
        <SubMenuItemDesktop item={subItem} onClick={onClose} />
      </li>
    ))
  }, [])

  return <div className={classNames(styles.wrapper, className)}>{menuItems}</div>
}
