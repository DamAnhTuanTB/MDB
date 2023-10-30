import { useMemo } from 'react'

import classNames from 'classnames'

import { sidebarItems } from '@/constants/profile'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import styles from '@/styles/modules/account/sidebar.module.scss'

import Link from '../common/custom-link'

type Props = {
  className?: string
}

export default function AccountNavBar({ className }: Props) {
  const { pathname } = useRouterWithQueryParams()

  const navElements = useMemo(
    () =>
      sidebarItems.map((item) => (
        <li key={item.id} className={classNames(styles.sidebar__item, { [styles.active]: item.href === pathname })}>
          <Link className={styles.navbar__item__link} href={item.href}>
            {item.label}
          </Link>
        </li>
      )),
    []
  )

  return <ul className={classNames(styles.sidebar, className)}>{navElements}</ul>
}
