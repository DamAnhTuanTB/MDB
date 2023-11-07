import { useEffect } from 'react'

import { cartApi } from '@/services/api/cart'

import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useCartStore } from '@/recoil/cart'
import { useNotificationUI } from '@/recoil/common-ui'

import { useFetch } from './use-fetch'
import { useAuthStore } from '@/recoil/auth'
import { CartItem, EditCart } from '@/types/cart'

export const useCart = () => {
  const { dataResult: dataCart, fetch: getCart } = useFetch({ fetcher: cartApi.getCart })
  const { dataResult: dataCount, fetch: countCart } = useFetch({ fetcher: cartApi.count })
  const { dataResult: dataAddCart, fetch: addCart } = useFetch({ fetcher: cartApi.addCart })
  const { dataResult: dataEditCart, fetch: editCart } = useFetch({ fetcher: cartApi.editCart })
  const { dataResult: dataDeleteCart, fetch: deleteCart } = useFetch({ fetcher: cartApi.deleteCart })
  const { setNotificationUI } = useNotificationUI()
  const { setCartBadge, setCartDetail, toggleModalAddSuccess, cart } = useCartStore()
  const { profile } = useAuthStore()

  useEffect(() => {
    if (dataCount?.data) setCartBadge(dataCount?.data?.count || 0)
    // eslint-disable-next-line
  }, [dataCount?.data])

  useEffect(() => {
    if (dataCart?.data) {
      setCartDetail(dataCart?.data?.results || [])
    }
    // eslint-disable-next-line
  }, [dataCart?.data])

  useEffect(() => {
    if (dataAddCart?.data?.id) {
      toggleModalAddSuccess(dataAddCart.data.quantity === 1)
    }
    // eslint-disable-next-line
  }, [dataAddCart?.data?.id])

  useEffect(() => {
    if (dataEditCart) {
      setNotificationUI({ open: true, message: 'Update successfully', type: 'success' })
      getCart(undefined)
    }
  }, [dataEditCart])

  useEffect(() => {
    if (dataDeleteCart) {
      setNotificationUI({ open: true, message: 'Delete successfully', type: 'success' })
      getCart(undefined)
    }
  }, [dataDeleteCart])

  const _editCart = (params: EditCart) => {
    if (profile) {
      editCart(params)
    } else {
      updateLocalStorage(params)
    }
  }

  const _deleteCart = (id: string) => {
    if (profile) {
      deleteCart(id)
    } else {
      removeLocalStorage(id)
    }
  }

  const getLocalStorageCart = () => {
    let prodsCard: any = localStorage.getItem('MDB_LIST_PRODUCT_CART')
    prodsCard = prodsCard ? JSON.parse(prodsCard) : []
    return prodsCard
  }

  const updateLocalStorage = (params: EditCart) => {
    const listProd = getLocalStorageCart()
    const itemExits = listProd.findIndex((i: CartItem) => i.productId === params?.productId && i.productSizeId === params.productSizeId)
    listProd[itemExits] = { ...listProd[itemExits], ...params }
    localStorage.setItem('MDB_LIST_PRODUCT_CART', JSON.stringify(listProd))
    window.dispatchEvent(new Event('storage'))
  }

  const removeLocalStorage = (id: string) => {
    let listProd = getLocalStorageCart()
    listProd = listProd.forEach((i: CartItem) => i?.id !== id)
    localStorage.setItem('MDB_LIST_PRODUCT_CART', JSON.stringify(listProd))
    window.dispatchEvent(new Event('storage'))
  }

  return {
    dataCart,
    getCart,

    dataCount,
    countCart,

    addCart, //call api add cart
    dataAddCart,

    dataEditCart,
    editCart: _editCart,

    dataDeleteCart,
    deleteCart: _deleteCart
  }
}
