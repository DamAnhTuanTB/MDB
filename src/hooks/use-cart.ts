import { useEffect } from 'react'

import { cartApi } from '@/services/api/cart'

import { useCartStore } from '@/recoil/cart'

import { useFetch } from './use-fetch'

export const useCart = () => {
  const { dataResult: dataCart, fetch: getCart } = useFetch({ fetcher: cartApi.getCart })
  const { dataResult: dataCount, fetch: countCart } = useFetch({ fetcher: cartApi.count })
  const { setCartBadge, setCartDetail } = useCartStore()

  useEffect(() => {
    setCartBadge(dataCount?.data?.count || 0)
  }, [dataCount, setCartBadge])

  useEffect(() => {
    setCartDetail(dataCart?.data?.results || [])
  }, [dataCart, setCartDetail])

  return {
    dataCart,
    getCart,
    dataCount,
    countCart
  }
}
