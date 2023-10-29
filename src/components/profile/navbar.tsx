import { useMemo } from 'react'

import classNames from 'classnames'

import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import routes from '@/routes'
import styles from '@/styles/modules/profile/navbar.module.scss'

import Link from '../common/custom-link'

type NavItem = {
  id: number
  label: string
  href: string
}

const navItems: NavItem[] = [
  { id: 0, label: 'Account Information', href: routes.accountInformationPage() },
  { id: 1, label: 'Order History', href: routes.orderHistoryPage() },
  { id: 2, label: 'Addresses', href: routes.addressPage() },
  { id: 3, label: 'Payment Methods', href: routes.paymentMethodPage() },
  { id: 4, label: 'Favorites', href: routes.favoritePage() },
  { id: 5, label: 'Aesthetic Provider', href: routes.aestheticProviderPage() }
]

type Props = {
  className?: string
}

export default function ProfileNavBar({ className }: Props) {
  const { pathname } = useRouterWithQueryParams()

  const navElements = useMemo(
    () =>
      navItems.map((item) => (
        <li key={item.id} className={classNames(styles.navbar__item, { [styles.active]: item.href === pathname })}>
          <Link className={styles.navbar__item__link} href={item.href}>
            {item.label}
          </Link>
        </li>
      )),
    []
  )

  return <ul className={classNames(styles.navbar, className)}>{navElements}</ul>
}
