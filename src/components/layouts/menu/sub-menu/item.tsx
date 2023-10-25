import { useMemo } from 'react'

import Link from 'next/link'

import styles from '@/styles/layout/menu/sub-menu/item.module.scss'

import { MenuItem } from '@/models/menu'

import CollapseItem from '../../../common/collapse'

export type Props = {
  item: MenuItem
  onClick: () => void
}

export default function SubMenuItem({ item, onClick }: Props) {
  const subMenuElement = useMemo(() => {
    if (item.links && item.links.length > 0) {
      return (
        <CollapseItem className={styles.collapse} headingClassName={styles.collapse__heading} contentClassName={styles.collapse__content} title={item.title}>
          {item.links.map((link, index) => (
            <div className={styles.label} key={index} onClick={onClick}>
              {link.href ? <Link href={link.href}>{link.title}</Link> : link.title}
            </div>
          ))}
        </CollapseItem>
      )
    }

    if (item.href)
      return (
        <Link className={styles.title} href={item.href} onClick={onClick}>
          {item.title}
        </Link>
      )

    return (
      <div className={styles.title} onClick={onClick}>
        {item.title}
      </div>
    )
  }, [])

  return <div className={styles.wrapper}>{subMenuElement}</div>
}
