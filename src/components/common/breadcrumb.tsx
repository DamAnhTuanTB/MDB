import { useMemo } from 'react'

import styles from '@/styles/modules/breadcrumb.module.scss'

import Link from '@/components/common/custom-link'

export type BreadcrumbItem = {
  label: string
  href?: string
}

type Props = {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: Props) {
  const itemElements = useMemo(
    () =>
      items &&
      items.map((item, index) =>
        item.href ? (
          <li className={styles.item} key={index}>
            <Link href={item.href} title={item.label}>
              {item.label}
            </Link>
          </li>
        ) : (
          <li className={styles.item} key={index}>
            {item.label}
          </li>
        )
      ),
    [items]
  )

  return <ul className={styles.wrapper}>{itemElements}</ul>
}
