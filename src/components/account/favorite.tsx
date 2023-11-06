import { useState } from 'react'

import classNames from 'classnames'

import { PROFILE_ID } from '@/constants/profile'
import styles from '@/styles/modules/account/favorite.module.scss'
import { StringOrNull } from '@/types'
import { Product } from '@/types/product'

import CollapseItem from '../common/collapse'
import ProductThreeColumn from '../common/product/product-three-column'

import ProfileLayout from './layout'

export type EditData = {
  key: string
  label: string
  value: StringOrNull | boolean
}

type Props = {
  favoriteProducts: Product[]
  relatedProducts: Product[]
  onReset: () => void
}

export default function Favorite({ favoriteProducts, relatedProducts }: Props) {
  const [showMenu, setShowMenu] = useState<boolean>(false)

  const handleToggleCollapse = (value: boolean) => {
    setShowMenu(!value)
  }

  return (
    <>
      <ProfileLayout activeId={PROFILE_ID.FAVORITE} isShow={showMenu}>
        <CollapseItem
          title="Favorites"
          headingClassName={classNames(styles.collapse__heading, 'block lg:hidden')}
          contentClassName={classNames(styles.collapse__content, '!px-0 lg:px-10')}
          className={classNames(styles.collapse, 'lg:!bg-white')}
          isActive
          onToggle={handleToggleCollapse}
        >
          <div className={styles.box}>
            <ProductThreeColumn title="My Favorites" products={favoriteProducts} titleClassName={styles.box__title} />
          </div>
          <div className={styles.box}>
            <ProductThreeColumn titleClassName={styles.box__title} title="You May Also Like" products={relatedProducts} />
          </div>
        </CollapseItem>
      </ProfileLayout>
    </>
  )
}
