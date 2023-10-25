import { useMemo } from 'react'

import styles from '@/styles/layout/menu/sub-menu/index.module.scss'

import { MenuItem } from '@/models/menu'

import SubMenuItem from './item'

type Props = {
  items: MenuItem[]
  onClick: () => void
}

export default function SubMenu({ items, onClick }: Props) {
  const menuItems = useMemo(() => {
    return items.map((subItem, index) => (
      <li className={styles.sub__menu__list} key={index}>
        <SubMenuItem item={subItem} onClick={onClick} />
      </li>
    ))
  }, [])

  return <div className={styles.wrapper}>{menuItems}</div>
}
