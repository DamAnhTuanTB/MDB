import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import routes from '@/routes'
import styles from '@/styles/layout/header.module.scss'

import Menu from './menu'
import Search from './search'
import TopHead from './top-head'

export default function Header() {
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  return (
    <header className={styles.wrapper}>
      <TopHead />
      <div className={styles.content}>
        <div className={styles.content__hamburger} onClick={() => setOpenMenu(true)}>
          <Image src={'/images/icons/hamburger.svg'} width={24} height={24} alt="My Dermbox" />
        </div>
        <Link className={styles.content__logo} href={routes.homePage()}>
          <Image src={'/images/logo.svg'} width={296} height={99} alt="My Dermbox" />
        </Link>

        <div className={styles.content__nav}>
          <Search className="hidden lg:block w-[440px]" />
          <div className={styles.content__nav__item}>
            <Image src={'/images/icons/user.svg'} width={24} height={24} alt="My Dermbox" />
          </div>
          <div className={styles.content__nav__item}>
            <Image src={'/images/icons/heart.svg'} width={24} height={24} alt="My Dermbox" />
          </div>
          <div className={styles.content__nav__item}>
            <Image src={'/images/icons/cart.svg'} width={24} height={24} alt="My Dermbox" />
          </div>
        </div>
      </div>
      <Search className="block lg:hidden" />
      <Menu open={openMenu} onClose={() => setOpenMenu(false)} />
    </header>
  )
}
