import { useEffect, useState } from 'react'

import Image from 'next/image'

import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { useGlobalSettingStore } from '@/recoil/global'
import routes from '@/routes'
import styles from '@/styles/layout/header.module.scss'
import { debounce } from '@/utils/helper'

import Link from '@/components/common/custom-link'

import Menu from './menu'
import Search from './search'
import TopHead from './top-head'

export default function Header() {
  const { query } = useRouterWithQueryParams()
  const [openMenu, setOpenMenu] = useState<boolean>(true)
  const { globalSettingStore } = useGlobalSettingStore()

  useEffect(() => {
    const handleResize = () => {
      setOpenMenu(window.innerWidth > 1023)
    }

    const debouncedHandleResize = debounce(handleResize, 30)
    window.addEventListener('resize', debouncedHandleResize)

    handleResize()
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [])

  return (
    <header className={styles.wrapper}>
      <TopHead />
      <div className={styles.content}>
        <div className={styles.content__hamburger} onClick={() => setOpenMenu(true)}>
          <Image src={'/images/icons/hamburger.svg'} width={24} height={24} alt="My Dermbox" />
        </div>
        <Link className={styles.content__logo} href={routes.homePage(query.affiliate as string)}>
          <Image loading="eager" src={globalSettingStore.logo?.value} width={296} height={99} alt="My Dermbox" />
        </Link>

        <div className={styles.content__nav}>
          <Search className="hidden lg:block w-[472px] mr-6" />
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
