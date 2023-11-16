import { useEffect, useState } from 'react'

import classNames from 'classnames'

import { PROFILE_ID } from '@/constants/profile'
import { useCustomerLogin } from '@/hooks/pages/use-customer-login'
import { useAuthStore } from '@/recoil/auth'
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
}

export default function Favorite({ favoriteProducts, relatedProducts }: Props) {
  const [showMenu, setShowMenu] = useState<boolean>(false)

  const { isLoggedIn } = useAuthStore()
  const { loginPutBack } = useCustomerLogin()

  useEffect(() => {
    if (!isLoggedIn) loginPutBack('/account/favorite')
  }, [isLoggedIn])

  const handleToggleCollapse = (value: boolean) => {
    setShowMenu(!value)
  }

  return (
    <>
      <ProfileLayout activeId={PROFILE_ID.FAVORITE} isShow={showMenu}>
        <CollapseItem
          title="Favorites"
          headingClassName={classNames(styles.collapse__heading, 'block lg:hidden')}
          contentClassName={classNames(styles.collapse__content, '!px-0 lg:px-10 !pb-0 lg:!pb-10')}
          className={classNames(styles.collapse, 'lg:!bg-white')}
          isActive
          onToggle={handleToggleCollapse}
        >
          <div className={styles.box}>
            <ProductThreeColumn
              key={'favoriteList'}
              title="My Favorites"
              products={favoriteProducts}
              titleClassName={classNames(styles.box__title, '!hidden lg:!block')}
              listClassName="px-4 lg:px-0"
              emptyMessage="Your have no Favorites saved"
            />
          </div>
          <div className={styles.box}>
            <ProductThreeColumn
              key={'relatedList'}
              titleClassName={classNames(styles.box__title, 'px-4 lg:px-0 pt-6 lg:pt-0')}
              title="You May Also Like"
              className="!bg-white lg:!bg-grey-100"
              listClassName="px-4 lg:px-0 pb-10 lg:pb-0"
              products={relatedProducts}
              emptyMessage="Product list is being updated"
            />
          </div>
        </CollapseItem>
      </ProfileLayout>
    </>
  )
}
