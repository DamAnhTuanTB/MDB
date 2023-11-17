import { useEffect } from 'react'

import { cartApi } from '@/services/api/cart'

import { useAuthStore } from '@/recoil/auth'
import { useCartStore } from '@/recoil/cart'
import { useNotificationUI } from '@/recoil/common-ui'
import { CartItem, EditCart, syncCart } from '@/types/cart'
import { getLocalStorage, setLocalStorage } from '@/utils/helper'

import { useFetch } from './use-fetch'

export const useCart = () => {
  const { dataResult: dataCart, fetch: _getCart } = useFetch({ fetcher: cartApi.getCart })
  const { dataResult: dataCount, fetch: _countCart } = useFetch({ fetcher: cartApi.count })
  const { dataResult: dataAddCart, fetch: _addCart } = useFetch({ fetcher: cartApi.addCart })
  const { dataResult: dataEditCart, fetch: _editCart } = useFetch({ fetcher: cartApi.editCart })
  const { dataResult: dataDeleteCart, fetch: _deleteCart } = useFetch({ fetcher: cartApi.deleteCart })
  const { dataResult: dataSyncLocalToSever, fetch: _syncLocalToSever } = useFetch({ fetcher: cartApi.syncLocalToSever })
  const { isLoggedIn } = useAuthStore()
  const { setNotificationUI } = useNotificationUI()
  const { cart, dataModalAddSuccess, setCartStore, setCartModal } = useCartStore()

  /*================ Bắt recoil xử lý=================*/
  useEffect(() => {
    if (dataCount?.data)
      setCartStore({
        ...cart,
        count: dataCount?.data?.count || 0
      })
    // eslint-disable-next-line
  }, [dataCount?.data?.count])

  useEffect(() => {
    if (dataCart?.data) {
      setCartStore({
        ...cart,
        count: dataCart?.data?.results?.reduce((t: number, i: CartItem) => t + i.quantity, 0),
        listProd: dataCart?.data?.results || []
      })
      setLocalStorage('MDB_LIST_PRODUCT_CART', JSON.stringify(dataCart?.data?.results || []))
    }
    // eslint-disable-next-line
  }, [dataCart?.data])

  useEffect(() => {
    if (!dataAddCart?.data) return
    if (dataAddCart?.data?.quantity === 1) {
      setCartModal({ ...dataModalAddSuccess, ...dataAddCart?.data, isFinal: true })
    } else {
      setCartModal()
    }
    getCart()
    // eslint-disable-next-line
  }, [dataAddCart])

  useEffect(() => {
    if (dataEditCart?.data) {
      getCart()
    } else if (dataEditCart?.data) {
      renderNoti('Edit', false)
    }
  }, [dataEditCart])

  useEffect(() => {
    if (dataDeleteCart?.error) {
      renderNoti('Delete', false)
    } else if (dataDeleteCart?.data) {
      getCart()
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
    // console.log('================actionCountCart================', isLoggedIn)
    if (isLoggedIn) _countCart(undefined)
    else {
      const data = getLocalStorageCart()
      setCartStore({ ...cart, count: data.reduce((t: number, i: CartItem) => t + i.quantity, 0), listProd: data || [] })
    }
  }

  const getCart = () => {
    if (isLoggedIn) {
      _getCart(undefined)
    } else {
      const data = getLocalStorageCart().filter((i: CartItem) => i.syncType !== 'delete')
      setCartStore({ ...cart, listProd: data, count: data.reduce((t: number, i: CartItem) => t + i.quantity, 0) })
    }
  }
  /*================ data ta badge=================*/

  /*================ action =================*/
  const editCart = (params: EditCart) => {
    // console.log('================actionEditCart================', isLoggedIn, params)
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
    // console.log('================actionDeleteCart================', isLoggedIn, id)
    if (isLoggedIn) {
      _deleteCart(id)
    } else {
      removeLocalStorage(id)
    }
  }

  const addCart = (params: CartItem, cb?: (type: string, openModal?: boolean) => void) => {
    // console.log('================actionAddCart================', isLoggedIn, params)
    setCartModal({ ...params, isFinal: false })
    if (isLoggedIn) {
      _addCart({
        productId: params?.productId,
        quantity: params?.quantity || 1
      })
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
    const itemExits = listProd.findIndex((i: CartItem) => i.productId === params?.productId)
    if (itemExits > -1) {
      if (listProd[itemExits].syncType === 'delete') {
        listProd[itemExits].quantity = params.quantity
        listProd[itemExits].syncType = 'new'
        setCartModal({ ...params, isFinal: true } as any)
      } else {
        listProd[itemExits].quantity += params.quantity
        listProd[itemExits].syncType = 'update'
      }
      setLocalStorage('MDB_LIST_PRODUCT_CART', JSON.stringify(listProd))
      cb?.('local')
    } else {
      listProd.push({ ...params, syncType: 'new' })
      setLocalStorage('MDB_LIST_PRODUCT_CART', JSON.stringify(listProd))
      setCartModal({ ...params, isFinal: true } as any)
      cb?.('local', true)
    }
    window.dispatchEvent(new Event('storage'))
  }

  const updateLocalStorage = (params: EditCart) => {
    const listProd = getLocalStorageCart()
    const itemExits = listProd.findIndex((i: CartItem) => i.id === params?.id)
    listProd[itemExits] = { ...listProd[itemExits], ...params }
    localStorage.setItem('MDB_LIST_PRODUCT_CART', JSON.stringify(listProd))
    window.dispatchEvent(new Event('storage'))
  }

  const removeLocalStorage = (id: string) => {
    const listProd = getLocalStorageCart()
    const itemExits = listProd.findIndex((i: CartItem) => i.id === id)
    listProd[itemExits] = { ...listProd[itemExits], quantity: 0, syncType: 'delete' }
    setLocalStorage('MDB_LIST_PRODUCT_CART', JSON.stringify(listProd))
    window.dispatchEvent(new Event('storage'))
  }

  /*======= sync data local & sever ========*/
  useEffect(() => {
    if (dataSyncLocalToSever?.data) removeLocalStorage('MDB_LIST_PRODUCT_CART')
  }, [dataSyncLocalToSever])

  const syncCartLocalToSever = () => {
    const listProd = getLocalStorageCart()?.map((i: any) => {
      const item: any = {
        productId: i.productId,
        quantity: i.quantity
      }
      if (i.syncType !== 'new') item.syncType = i.syncType
      return item
    })
    _syncLocalToSever({ cartItems: listProd } as syncCart)
  }
  const syncCartSeverToLocal = () => {
    setLocalStorage('MDB_LIST_PRODUCT_CART', JSON.stringify(cart.listProd))
  }
  /*======= sync data local & sever ========*/

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
    deleteCart,

    syncCartSeverToLocal,
    syncCartLocalToSever,
    getLocalStorageCart,
    dataSyncLocalToSever
  }
}
