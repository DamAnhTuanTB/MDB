import { useEffect } from 'react'

import { cartApi } from '@/services/api/cart'

import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useCartStore } from '@/recoil/cart'
import { useNotificationUI } from '@/recoil/common-ui'

import { useFetch } from './use-fetch'
import { useAuthStore } from '@/recoil/auth'
import { AddCart, CartItem, EditCart } from '@/types/cart'

export const useCart = () => {
  const { dataResult: dataCart, fetch: getCart } = useFetch({ fetcher: cartApi.getCart })
  const { dataResult: dataCount, fetch: countCart } = useFetch({ fetcher: cartApi.count })
  const { dataResult: dataAddCart, fetch: addCart } = useFetch({ fetcher: cartApi.addCart })
  const { dataResult: dataEditCart, fetch: editCart } = useFetch({ fetcher: cartApi.editCart })
  const { dataResult: dataDeleteCart, fetch: deleteCart } = useFetch({ fetcher: cartApi.deleteCart })
  const { setNotificationUI } = useNotificationUI()
  const { setCartBadge, setCartDetail, toggleModalAddSuccess, cart, setCartStore } = useCartStore()
  const { isLoggedIn } = useAuthStore()

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
    console.log('4')
    if (dataAddCart?.data?.id) {
      // toggleModalAddSuccess(dataAddCart.data.quantity === 1)
      toggleModalAddSuccess(true)
    }
    // eslint-disable-next-line
  }, [dataAddCart?.data?.id])

  useEffect(() => {
    if (dataEditCart?.data) {
      getCart(undefined)
    } else {
      renderNoti('Edit', false)
    }
  }, [dataEditCart])

  useEffect(() => {
    if (dataDeleteCart?.error) {
      renderNoti('Delete', false)
    } else {
      getCart(undefined)
    }
  }, [dataDeleteCart])

  const renderNoti = (key: string, flag: boolean) => {
    return setNotificationUI({
      open: true,
      message: `${key} is ${flag ? 'failed' : 'successfully'}!`,
      type: flag ? 'error' : 'success'
    })
  }

  const _countCart = () => {
    if (isLoggedIn) countCart(undefined)
    else {
      const data = getLocalStorageCart()
      setCartStore({ ...cart, count: data?.length || 0, listProd: data || [] })
    }
  }

  const _getCart = () => {
    console.log('isLoggedIn', isLoggedIn)
    if (isLoggedIn) getCart(undefined)
    else {
      setCartStore({ ...cart, listProd: getLocalStorageCart() })
    }
  }

  const _editCart = (params: EditCart) => {
    if (isLoggedIn) {
      const paramsN = {
        ...params,
        cartItemId: params?.id
      }
      editCart(paramsN)
    } else {
      updateLocalStorage(params)
    }
  }

  const _deleteCart = (id: string) => {
    if (isLoggedIn) {
      deleteCart(id)
    } else {
      removeLocalStorage(id)
    }
  }
  const _addCart = (params: AddCart) => {
    console.log('1', isLoggedIn)
    if (isLoggedIn) {
      console.log('2')
      const paramsN = {
        productId: params?.productId,
        quantity: params.quantity || 1,
        productSizeId: params?.size
      }
      addCart(paramsN)
    } else {
      console.log('3')
      addLocalStorageCart(params)
    }
  }

  const getLocalStorageCart = () => {
    let prodsCard: any = localStorage.getItem('MDB_LIST_PRODUCT_CART')
    prodsCard = prodsCard ? JSON.parse(prodsCard) : []
    return prodsCard
  }

  const addLocalStorageCart = (params: AddCart) => {
    const listProd = getLocalStorageCart()
    const itemExits = listProd.findIndex((i: CartItem) => i.productId === params?.productId && i.productSizeId === params.productSizeId)
    if (itemExits > -1) {
      listProd[itemExits].quantity += params.quantity
      localStorage.setItem('MDB_LIST_PRODUCT_CART', JSON.stringify(listProd))
    } else {
      listProd.push(params)
      toggleModalAddSuccess(true) //on
      localStorage.setItem('MDB_LIST_PRODUCT_CART', JSON.stringify(listProd))
    }
    window.dispatchEvent(new Event('storage'))
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
    getCart: _getCart,

    dataCount,
    countCart: _countCart,

    addCart: _addCart, //call api add cart
    dataAddCart,

    dataEditCart,
    editCart: _editCart,

    dataDeleteCart,
    deleteCart: _deleteCart
  }
}
