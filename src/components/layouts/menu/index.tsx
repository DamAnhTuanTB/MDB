import { useMemo, useState } from 'react'

import classNames from 'classnames'

import { getMenuItems } from '@/constants/menu'
import useDevice from '@/hooks/use-device'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { useGlobalSettingStore } from '@/recoil/global'
import routes from '@/routes'
import styles from '@/styles/layout/menu/index.module.scss'
import { MenuItem } from '@/types/menu'

import Link from '@/components/common/custom-link'

import SubMenu from './sub-menu'
import SubMenuDesktop from './sub-menu-desktop'

type Props = {
  open: boolean
  onClose: () => void
}

export default function Menu({ open, onClose }: Props) {
  const [activeMenu, setActiveMenu] = useState<number>()
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [menuListVisible, setMenuListVisible] = useState<boolean>(true)

  const { query } = useRouterWithQueryParams()

  const { isPc } = useDevice()

  const { menuCategories } = useGlobalSettingStore()

  const categoryMenuItems = useMemo(
    () =>
      menuCategories?.slice(0, 2).map((category) => {
        const { name, slug, parentId, childCategories } = category

        return {
          title: name,
          href: routes.productPage(slug || '', query.affiliate as string),
          parentId,
          links: childCategories
            ? childCategories.map(
                (child) =>
                  ({
                    title: child.name,
                    href: routes.productPage(child.slug || '', query.affiliate as string),
                    parentId: child.parentId,
                    links: child.childCategories
                      ? child.childCategories.map((sub) => ({ title: sub.name, href: routes.productPage(sub.slug || '', query.affiliate as string), parentId: sub.parentId }) as MenuItem)
                      : []
                  }) as MenuItem
              )
            : []
        } as MenuItem
      }) || [],
    [menuCategories]
  )

  const menuItems: MenuItem[] = getMenuItems() || []

  const displayMenuItems = useMemo(() => [...menuItems.slice(0, menuItems.length - 2), ...categoryMenuItems, ...menuItems.slice(menuItems.length - 2)], [categoryMenuItems])

  const handleOpenSubMenu = (index: number) => {
    if (isPc) return

    setActiveMenu(index)
    setMenuListVisible(false)
  }

  const handleCloseSubMenu = () => {
    setMenuListVisible(true)
    setActiveMenu(undefined)
  }

  const handleMouseEnterNavItem = (index: number) => {
    if (isPc) setHoveredItem(index)
  }

  const handleCloseSubMenuDesktop = () => {
    setHoveredItem(null)
  }

  const handleClickMenuTitle = (item: MenuItem, index: number) => {
    if (item.links && item.links.length > 0) {
      handleOpenSubMenu(index)
    } else {
      onClose()
    }
  }

  const menuElements = useMemo(() => {
    return displayMenuItems?.map((item, index) => (
      <div
        key={index}
        className={classNames(styles.content__nav__item, {
          [styles.hovered]: index === hoveredItem
        })}
        onMouseEnter={() => handleMouseEnterNavItem(index)}
        onMouseLeave={handleCloseSubMenuDesktop}
      >
        <Link href={item.href || ''} onClick={() => handleClickMenuTitle(item, index)}>
          {item.title}
        </Link>

        {item.links && item.links?.length > 0 && <SubMenuDesktop onClose={handleCloseSubMenuDesktop} className={styles.submenu__desktop} items={item.links} />}
      </div>
    ))
  }, [displayMenuItems, hoveredItem])

  const subMenuElement = useMemo(() => {
    if (!activeMenu) return

    return <SubMenu items={menuItems[activeMenu].links || []} onClick={onClose} />
  }, [activeMenu])

  return (
    <>
      <div className={classNames(styles.overlay, { [styles.active]: open })} />
      <div className={classNames(styles.wrapper, { [styles.active]: open })}>
        <div className={styles.close} onClick={onClose} />
        <div className={styles.content}>
          <ul
            className={classNames(styles.content__nav, {
              [styles.active]: menuListVisible
            })}
          >
            {menuElements}
          </ul>
          <div
            className={classNames(styles.submenu, {
              [styles.active]: !menuListVisible
            })}
          >
            <div className={styles.back} onClick={handleCloseSubMenu}>
              <div className={styles.back__icon} />
              <span>Back</span>
            </div>
            {subMenuElement}
          </div>
        </div>
      </div>
    </>
  )
}
