import { useMemo } from 'react'

import classNames from 'classnames'

import { ProfileID, sidebarItems } from '@/constants/profile'
import styles from '@/styles/modules/account/layout.module.scss'

import Link from '../common/custom-link'

type Props = {
  children: React.ReactNode
  activeId: ProfileID
  isShow?: boolean
}

export default function ProfileLayout({ children, activeId, isShow = false }: Props) {
  const linkElements = useMemo(
    () =>
      sidebarItems &&
      sidebarItems.map((item) =>
        activeId === item.id
          ? children
          : isShow && (
              <Link key={item.id} href={item.href} className={styles.item}>
                {item.label}
              </Link>
            )
      ),
    [isShow]
  )
  return <div className={classNames(styles.wrapper, { [styles.show]: isShow })}>{linkElements}</div>
}
