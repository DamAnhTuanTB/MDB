import { useEffect, useMemo, useState } from 'react'

import Image from 'next/image'

import { useCustomerLogin } from '@/hooks/pages/use-customer-login'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { useAuthStore } from '@/recoil/auth'
import { useGlobalSettingStore } from '@/recoil/global'
import routes from '@/routes'
import styles from '@/styles/layout/header.module.scss'
import { AccountOption } from '@/types/account/option'
import { debounce } from '@/utils/helper'

import Cart from '@/components/cart/popover-cart'
import Link from '@/components/common/custom-link'
import Dropdown from '@/components/common/dropdown'

import FavoriteProducts from './favorite'
import Menu from './menu'
import Search from './search'
import TopHead from './top-head'

const getAccountOptionsMockData = () => [
  {
    label: 'Personal Information',
    href: routes.accountInformationPage()
  },
  {
    label: 'Order History',
    href: routes.orderHistoryPage()
  },
  {
    label: 'Address Book',
    href: routes.addressPage()
  },
  {
    label: 'Credit Cards',
    href: routes.paymentMethodPage()
  },
  {
    label: 'Favorites',
    href: routes.favoritePage()
  }
]

export default function Header() {
  const { query, push } = useRouterWithQueryParams()
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [hoverableDropdown, setHoverableDropdown] = useState<boolean>(true)
  const { globalSettingStore } = useGlobalSettingStore()
  const { logout, loginPutBack } = useCustomerLogin()
  const { isLoggedIn, profile: profileStage } = useAuthStore()

  useEffect(() => {
    const handleResize = () => {
      setOpenMenu(window.innerWidth > 1023)
      setHoverableDropdown(window.innerWidth > 1023)
    }

    const debouncedHandleResize = debounce(handleResize, 30)
    window.addEventListener('resize', debouncedHandleResize)

    handleResize()
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [])

  const accountOptions = useMemo(() => {
    const accountOptionsMockData: AccountOption[] = getAccountOptionsMockData() || []
    return (
      <>
        {accountOptionsMockData?.map((item, index) => {
          return (
            <div
              key={index}
              className={styles.option__item}
              onClick={() => {
                if (!profileStage) loginPutBack(item.href)
                else if (query.affiliate) push(`${query.affiliate}${item.href}`)
                else push(item.href)
              }}
            >
              {item.label}
            </div>
          )
        })}
        {isLoggedIn && (
          <div className={styles.option__item} onClick={logout}>
            Logout
          </div>
        )}
      </>
    )
  }, [isLoggedIn])

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
            <Dropdown hoverable={hoverableDropdown} clickable={!hoverableDropdown} contentClassName={styles.account__dropdown} content={accountOptions}>
              <Image src={'/images/icons/user.svg'} className={'cursor-pointer'} width={24} height={24} alt="My Dermbox" />
            </Dropdown>
          </div>
          <div className={styles.content__nav__item}>
            <Dropdown hoverable={hoverableDropdown} clickable={!hoverableDropdown} contentClassName={styles.favorite__dropdown} content={<FavoriteProducts />}>
              <Image src={'/images/icons/heart.svg'} className={'cursor-pointer'} width={24} height={24} alt="My Dermbox" />
            </Dropdown>
          </div>
          <Cart />
        </div>
      </div>
      <Search className="block lg:hidden" />
      <Menu open={openMenu} onClose={() => setOpenMenu(false)} />
    </header>
  )
}
