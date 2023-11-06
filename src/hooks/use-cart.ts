import { useEffect } from 'react'

import { cartApi } from '@/services/api/cart'

import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useCartStore } from '@/recoil/cart'
import { CartItem } from '@/types/cart'

import { useFetch } from './use-fetch'

export const useCart = () => {
  const { dataResult: dataCart, fetch: getCart } = useFetch({ fetcher: cartApi.getCart })
  const { dataResult: dataCount, fetch: countCart } = useFetch({ fetcher: cartApi.count })
  const { dataResult: dataAddCart, fetch: addCart } = useFetch({ fetcher: cartApi.addCart })
  const { profile } = useAccountInformation()
  const { setCartBadge, setCartDetail, toggleModalAddSuccess, cart } = useCartStore()

  useEffect(() => {
    if (dataCount?.data) setCartBadge(dataCount?.data?.count || 0)
    // eslint-disable-next-line
  }, [dataCount?.data])

  useEffect(() => {
    if (dataCart?.data) setCartDetail(dataCart?.data?.results || [])
    // eslint-disable-next-line
  }, [dataCart?.data])

  useEffect(() => {
    if (dataAddCart?.data) getCart(undefined)
    // eslint-disable-next-line
  }, [dataAddCart?.data])

  useEffect(() => {
    if (dataAddCart?.data) toggleModalAddSuccess(dataAddCart?.data?.quantity === 1)
  }, [dataAddCart])

  const getLocalStorageCart = () => {
    let prodsCard: any = localStorage.getItem('MDB_LIST_PRODUCT_CART')
    prodsCard = prodsCard ? JSON.parse(prodsCard) : []
    return prodsCard
  }

  const addToCart = (product: CartItem) => {
    if (profile?.data) {
      addCart({
        productId: product?.productId,
        quantity: product.quantity || 1,
        productSizeId: product?.size
      })
    } else {
      const listProd = getLocalStorageCart()
      const itemExits = listProd.findIndex((i: CartItem) => i.productId === product?.productId)
      if (itemExits > -1) {
        listProd[itemExits].quantity += product.quantity
        localStorage.setItem('MDB_LIST_PRODUCT_CART', JSON.stringify(listProd))
      } else {
        listProd.push(product)
        localStorage.setItem('MDB_LIST_PRODUCT_CART', JSON.stringify(listProd))
      }
      window.dispatchEvent(new Event('storage'))
    }
  }

  return {
    dataCart,
    getCart,
    dataCount,
    countCart,
    addCart,
    addToCart,
    dataAddCart
  }
}
