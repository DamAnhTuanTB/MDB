import { useMemo, useState } from 'react'

import Link from 'next/link'

import classNames from 'classnames'

import { menuItems } from '@/constants/menu'
import useDevice from '@/hooks/use-device'
import { useGlobalSettingStore } from '@/recoil/global'
import styles from '@/styles/layout/menu/index.module.scss'
import { MenuItem } from '@/types/menu'

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

  const { isPc } = useDevice()

  const { menuCategories } = useGlobalSettingStore()

  const categoryMenuItems = useMemo(
    () =>
      menuCategories?.slice(0, 2).map((category) => {
        const { name, slug, parentId, childCategories } = category

        return {
          title: name,
          slug,
          parentId,
          links: childCategories
            ? childCategories.map(
                (child) =>
                  ({
                    title: child.name,
                    slug: child.slug,
                    parentId: child.parentId,
                    links: child.childCategories ? child.childCategories.map((sub) => ({ title: sub.name, slug: sub.slug, parentId: sub.parentId }) as MenuItem) : []
                  }) as MenuItem
              )
            : []
        } as MenuItem
      }) || [],
    [menuCategories]
  )

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

  const menuElements = useMemo(
    () =>
      displayMenuItems?.map((item, index) => (
        <div
          key={index}
          className={classNames(styles.content__nav__item, {
            [styles.hovered]: index === hoveredItem
          })}
          onMouseEnter={() => handleMouseEnterNavItem(index)}
          onMouseLeave={handleCloseSubMenuDesktop}
        >
          {item.links && item.links?.length > 0 ? (
            <span onClick={() => handleOpenSubMenu(index)}>{item.title}</span>
          ) : item.href ? (
            <Link href={item.href || '/'}>{item.title}</Link>
          ) : (
            <span>{item.title}</span>
          )}
          {item.links && item.links?.length > 0 && <SubMenuDesktop onClose={handleCloseSubMenuDesktop} className={styles.submenu__desktop} items={item.links} />}
        </div>
      )),
    [hoveredItem]
  )

  const subMenuElement = useMemo(() => {
    if (!activeMenu) return null
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
