import { useEffect } from 'react'

import { useSetRecoilState } from 'recoil'

import { useAccountFavorite } from '@/hooks/pages/use-account-favorite'
import { useProduct } from '@/hooks/pages/use-product'
import { favoriteProductsState } from '@/recoil/favorite'

import Account from '@/components/account'
import Favorite from '@/components/account/favorite'
import Meta from '@/components/common/meta'

export default function AccountPage() {
  const setNotification = useSetRecoilState(favoriteProductsState)
  const { getFavorite, data: favoriteProducts } = useAccountFavorite()
  const { getProductList, data: relatedProducts } = useProduct()

  useEffect(() => {
    getFavorite({ noPagination: true })
  }, [])

  useEffect(() => {
    if (favoriteProducts && favoriteProducts?.results?.length > 0) {
      const favoriteIdList = favoriteProducts && favoriteProducts.results?.map((item) => item.id)
      getProductList({
        where: {
          relatedProductIds: favoriteIdList
        }
      })
    }
  }, [favoriteProducts?.results])

  const resetData = () => {
    getFavorite({ noPagination: true })
  }

  return (
    <>
      <Meta title="Favorites" />
      <Account>
        <Favorite favoriteProducts={favoriteProducts?.results || []} relatedProducts={relatedProducts?.results || []} onReset={resetData} />
      </Account>
    </>
  )
}
