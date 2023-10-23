import Link from 'next/link'

import classNames from 'classnames'

import routes from '@/routes'
import styles from '@/styles/layout/menu.module.scss'

type Props = {
  open: boolean
  onClose: () => void
}

export default function Menu({ open, onClose }: Props) {
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
              <Link href={routes.homePage()}>Brands</Link>
            </li>
            <li className={styles.content__nav__item} onClick={handleClickMenuItem}>
              <Link href={routes.homePage()}>Browse By</Link>
            </li>
            <li className={styles.content__nav__item} onClick={handleClickMenuItem}>
              <Link href={routes.homePage()}>Featured Products</Link>
            </li>
            <li className={styles.content__nav__item} onClick={handleClickMenuItem}>
              <Link href={routes.homePage()}>New Arrivals</Link>
            </li>
            <li className={styles.content__nav__item} onClick={handleClickMenuItem}>
              <Link href={routes.productPage('skin-care')}>Skin Care</Link>
            </li>
            <li className={styles.content__nav__item} onClick={handleClickMenuItem}>
              <Link href={routes.productPage('hair-care')}>Hair Care</Link>
            </li>
            <li className={styles.content__nav__item} onClick={handleClickMenuItem}>
              <Link href={routes.homePage()}>Best Sellers</Link>
            </li>
            <li className={styles.content__nav__item} onClick={handleClickMenuItem}>
              <Link href={routes.homePage()}>Special Deals</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
