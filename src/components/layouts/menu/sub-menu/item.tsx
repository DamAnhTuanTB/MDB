import { useMemo } from 'react'

import Link from 'next/link'

import routes from '@/routes'
import styles from '@/styles/layout/menu/sub-menu/item.module.scss'
import { MenuItem } from '@/types/menu'

import CollapseItem from '@/components/common/collapse'

export type Props = {
  item: MenuItem
  onClick: () => void
}

export default function SubMenuItem({ item, onClick }: Props) {
  const subMenuElement = useMemo(() => {
    if (item?.links && item?.links.length > 0) {
      return (
        <CollapseItem className={styles.collapse} headingClassName={styles.collapse__heading} contentClassName={styles.collapse__content} title={item?.title}>
          {item?.links.map((link: MenuItem, index: number) => (
            <div className={styles.label} key={index} onClick={onClick}>
              {link.slug ? <Link href={routes.productPage(link.slug)}>{link.title}</Link> : link.title}
            </div>
          ))}
        </CollapseItem>
      )
    }

    return (
      <div className={styles.title} onClick={onClick}>
        <Link href={routes.productPage(item?.slug || '')}>{item?.title}</Link>
      </div>
    )
  }, [])

  return <div className={styles.wrapper}>{subMenuElement}</div>
}
