import { useEffect } from 'react'

import { useAccountFavorite } from '@/hooks/pages/use-account-favorite'
import { useProduct } from '@/hooks/pages/use-product'
import { useFavoriteStore } from '@/recoil/favorite'

import Account from '@/components/account'
import Favorite from '@/components/account/favorite'
import Meta from '@/components/common/meta'

export default function AccountPage() {
  const { getProductList, data: relatedProducts } = useProduct()
  const { favorites } = useFavoriteStore()

  useEffect(() => {
    if (favorites.length > 0) {
      const favoriteIdList = favorites.map((item) => item.id)
      getProductList({
        where: {
          relatedProductIds: favoriteIdList
        }
      })
    }
  }, [favorites])

  return (
    <>
      <Meta title="Favorites" />
      <Account>
        <Favorite favoriteProducts={favorites || []} relatedProducts={relatedProducts?.results || []} />
      </Account>
    </>
  )
}
