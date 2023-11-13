import { useEffect } from 'react'

import { cartApi } from '@/services/api/cart'

import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useCartStore } from '@/recoil/cart'
import { useNotificationUI } from '@/recoil/common-ui'

import { useFetch } from './use-fetch'
import { useAuthStore } from '@/recoil/auth'
import { CartItem, EditCart } from '@/types/cart'
import { getLocalStorage, setLocalStorage } from '@/utils/helper'

export const useCart = () => {
  const { dataResult: dataCart, fetch: _getCart } = useFetch({ fetcher: cartApi.getCart })
  const { dataResult: dataCount, fetch: _countCart } = useFetch({ fetcher: cartApi.count })
  const { dataResult: dataAddCart, fetch: _addCart } = useFetch({ fetcher: cartApi.addCart })
  const { dataResult: dataEditCart, fetch: _editCart } = useFetch({ fetcher: cartApi.editCart })
  const { dataResult: dataDeleteCart, fetch: _deleteCart } = useFetch({ fetcher: cartApi.deleteCart })

  const { isLoggedIn } = useAuthStore()
  const { profile } = useAccountInformation()
  const { setNotificationUI } = useNotificationUI()
  const { setCartBadge, setCartDetail, toggleModalAddSuccess, cart, setCartStore, setCartModal } = useCartStore()

  /*================ Bắt recoil xử lý=================*/
  useEffect(() => {
    if (dataCount?.data)
      setCartStore({
        ...cart,
        count: dataCount?.data?.count || 0
      })
    // eslint-disable-next-line
  }, [dataCount?.data])

  useEffect(() => {
    if (dataCart?.data)
      setCartStore({
        ...cart,
        listProd: dataCart?.data?.results || []
      })
    // eslint-disable-next-line
  }, [dataCart?.data])

  useEffect(() => {
    if (dataAddCart?.data?.quantity === 1) {
      setCartModal({ ...cart?.dataModalAddSuccess, ...dataAddCart?.data, isFinal: true })
      getCart()
    } else {
      setCartModal()
    }
    // eslint-disable-next-line
  }, [dataAddCart])
  // console.log(cart)

  useEffect(() => {
    console.log('data edit cart', dataEditCart)
    if (dataEditCart?.data) {
      getCart()
      countCart()
    } else if (dataEditCart?.data) {
      // console.log('dataEditCart', dataEditCart)
      renderNoti('Edit', false)
    }
  }, [dataEditCart])

  useEffect(() => {
    if (dataDeleteCart?.error) {
      renderNoti('Delete', false)
    } else if (dataDeleteCart?.data) {
      getCart()
      countCart()
    }
  }, [dataDeleteCart])
  /*================ Bắt recoil xử lý=================*/

  const renderNoti = (key: string, flag: boolean) => {
    return setNotificationUI({
      open: true,
      message: `${key} is ${flag ? 'failed' : 'successfully'}!`,
      type: flag ? 'error' : 'success'
    })
  }

  /*================ data ta badge=================*/
  const countCart = () => {
    console.log('================actionCountCart================', isLoggedIn)
    if (isLoggedIn) _countCart(undefined)
    else {
      const data = getLocalStorageCart()
      setCartStore({ ...cart, count: data?.length || 0, listProd: data || [] })
    }
  }

  const getCart = () => {
    console.log('================actionGetCart================', isLoggedIn)
    if (isLoggedIn) _getCart(undefined)
    else {
      setCartStore({ ...cart, listProd: getLocalStorageCart() })
    }
  }
  /*================ data ta badge=================*/

  /*================ action =================*/
  const editCart = (params: EditCart) => {
    console.log('================actionEditCart================', isLoggedIn)
    if (isLoggedIn) {
      const paramsN = {
        ...params,
        cartItemId: params?.id
      }
      _editCart(paramsN)
    } else {
      updateLocalStorage(params)
    }
  }

  const deleteCart = (id: string) => {
    console.log('================actionDeleteCart================', isLoggedIn, id)
    if (isLoggedIn) {
      _deleteCart(id)
    } else {
      removeLocalStorage(id)
    }
  }
  const addCart = (params: CartItem, cb?: (type: string, openModal?: boolean) => void) => {
    console.log('================actionAddCart================', isLoggedIn, params)
    if (isLoggedIn) {
      _addCart({
        productId: params?.productId,
        quantity: params.quantity || 1
      })
      setCartModal({ ...params, isFinal: false })
      cb?.('api')
    } else {
      addLocalStorageCart(params, cb)
    }
  }
  /*================ action =================*/

  const getLocalStorageCart = () => {
    let prodsCard: any = getLocalStorage('MDB_LIST_PRODUCT_CART')
    prodsCard = prodsCard ? JSON.parse(prodsCard) : []
    return prodsCard
  }

  const addLocalStorageCart = (params: CartItem, cb?: (type: string, openModal?: boolean) => void) => {
    const listProd = getLocalStorageCart()
    const itemExits = listProd.findIndex((i: CartItem) => i.productId === params?.productId && i.productSizeId === params.productSizeId)
    if (itemExits > -1) {
      listProd[itemExits].quantity += params.quantity
      setLocalStorage('MDB_LIST_PRODUCT_CART', JSON.stringify(listProd))
      cb?.('local')
    } else {
      listProd.push(params)
      setCartModal(params)
      setLocalStorage('MDB_LIST_PRODUCT_CART', JSON.stringify(listProd))
      cb?.('local', true)
    }
    window.dispatchEvent(new Event('storage'))
  }

  const updateLocalStorage = (params: EditCart) => {
    const listProd = getLocalStorageCart()
    const itemExits = listProd.findIndex((i: CartItem) => i.productId === params?.productId)
    listProd[itemExits] = { ...listProd[itemExits], ...params }
    localStorage.setItem('MDB_LIST_PRODUCT_CART', JSON.stringify(listProd))
    window.dispatchEvent(new Event('storage'))
  }

  const removeLocalStorage = (id: string) => {
    let listProd = getLocalStorageCart()
    listProd = listProd.forEach((i: CartItem) => i?.id !== id) || []
    setLocalStorage('MDB_LIST_PRODUCT_CART', JSON.stringify(listProd))
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
    editCart,

    dataDeleteCart,
    deleteCart
  }
}
