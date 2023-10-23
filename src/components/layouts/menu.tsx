import Link from 'next/link'

import classNames from 'classnames'

import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import routes from '@/routes'
import styles from '@/styles/layout/menu.module.scss'

type Props = {
  open: boolean
  onClose: () => void
}

export default function Menu({ open, onClose }: Props) {
  const { query } = useRouterWithQueryParams()

  const handleClickMenuItem = () => {
    onClose()
  }

  return (
    <>
      <div className={classNames(styles.overlay, { [styles['active']]: open })} />
      <div className={classNames(styles.wrapper, { [styles['active']]: open })}>
        <div className={styles.close} onClick={onClose} />
        <div className={styles.content}>
          <ul className={styles.content__nav}>
            <li className={styles.content__nav__item} onClick={handleClickMenuItem}>
              <Link href={routes.homePage(query.affiliate as string)}>Brands</Link>
            </li>
            <li className={styles.content__nav__item} onClick={handleClickMenuItem}>
              <Link href={routes.homePage(query.affiliate as string)}>Browse By</Link>
            </li>
            <li className={styles.content__nav__item} onClick={handleClickMenuItem}>
              <Link href={routes.homePage(query.affiliate as string)}>Featured Products</Link>
            </li>
            <li className={styles.content__nav__item} onClick={handleClickMenuItem}>
              <Link href={routes.homePage(query.affiliate as string)}>New Arrivals</Link>
            </li>
            <li className={styles.content__nav__item} onClick={handleClickMenuItem}>
              <Link href={routes.productPage('skin-care', query.affiliate as string)}>Skin Care</Link>
            </li>
            <li className={styles.content__nav__item} onClick={handleClickMenuItem}>
              <Link href={routes.productPage('hair-care', query.affiliate as string)}>Hair Care</Link>
            </li>
            <li className={styles.content__nav__item} onClick={handleClickMenuItem}>
              <Link href={routes.homePage(query.affiliate as string)}>Best Sellers</Link>
            </li>
            <li className={styles.content__nav__item} onClick={handleClickMenuItem}>
              <Link href={routes.homePage(query.affiliate as string)}>Special Deals</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
