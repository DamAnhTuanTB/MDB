import { useMemo } from 'react'

import Link from 'next/link'

import styles from '@/styles/layout/menu/sub-menu-desktop/item.module.scss'
import { MenuLink } from '@/types/menu'

import { Props as SubMenuProps } from '@/components/layouts/menu/sub-menu/item'

export default function SubMenuDesktopItem({ item, onClick }: SubMenuProps) {
  const subMenuElement = useMemo(() => {
    if (item?.links && item?.links.length > 0) {
      return (
        <ul className={styles.sub__menu__item}>
          <h3 className={styles.title}>
            <Link href={item.href || ''}>{item?.title}</Link>
          </h3>
          {item?.links.map((link: MenuLink, index: number) => (
            <li className={styles.label} key={index} onClick={onClick}>
              {link.href ? <Link href={link.href || ''}>{link.title}</Link> : link.title}
            </li>
          ))}
        </ul>
      )
    }

    return (
      <div className={styles.title} onClick={onClick}>
        <Link href={item.href || ''}>{item?.title}</Link>
      </div>
    )
  }, [item, onClick])

  return <div className={styles.wrapper}>{subMenuElement}</div>
}
