import {useEffect} from 'react'

import {cartApi} from '@/services/api/cart'

import {useAccountInformation} from '@/hooks/pages/use-account-information'
import {useCartStore} from '@/recoil/cart'
import {useNotificationUI} from '@/recoil/common-ui'

import {useFetch} from './use-fetch'
import {useAuthStore} from '@/recoil/auth'
import {AddCart, CartItem, EditCart} from '@/types/cart'
import {getLocalStorage, setLocalStorage} from '@/utils/helper'

export const useCart = () => {
  const {dataResult: dataCart, fetch: _getCart} = useFetch({fetcher: cartApi.getCart})
  const {dataResult: dataCount, fetch: _countCart} = useFetch({fetcher: cartApi.count})
  const {dataResult: dataAddCart, fetch: _addCart} = useFetch({fetcher: cartApi.addCart})
  const {dataResult: dataEditCart, fetch: _editCart} = useFetch({fetcher: cartApi.editCart})
  const {dataResult: dataDeleteCart, fetch: _deleteCart} = useFetch({fetcher: cartApi.deleteCart})
  const {setNotificationUI} = useNotificationUI()
  const {setCartBadge, setCartDetail, toggleModalAddSuccess, cart, setCartStore} = useCartStore()
  const {isLoggedIn} = useAuthStore()

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
    if (dataAddCart?.data?.id) {
      getCart()
      countCart()
      // console.log('dataAddCart', dataAddCart)
      // toggleModalAddSuccess(dataAddCart.data.quantity === 1)
      toggleModalAddSuccess(true)
    }
    // eslint-disable-next-line
  }, [dataAddCart?.data?.id])

  useEffect(() => {
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
      // console.log('dataDeleteCart', dataDeleteCart)
      countCart()
    }
  }, [dataDeleteCart])

  const renderNoti = (key: string, flag: boolean) => {
    return setNotificationUI({
      open: true,
      message: `${key} is ${flag ? 'failed' : 'successfully'}!`,
      type: flag ? 'error' : 'success'
    })
  }

  const countCart = () => {
    console.log('================actionCountCart================', isLoggedIn)
    if (isLoggedIn) _countCart(undefined)
    else {
      const data = getLocalStorageCart()
      setCartStore({...cart, count: data?.length || 0, listProd: data || []})
    }
  }

  const getCart = () => {
    console.log('================actionGetCart================', isLoggedIn)
    if (isLoggedIn) _getCart(undefined)
    else {
      setCartStore({...cart, listProd: getLocalStorageCart()})
    }
  }

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
    console.log('================actionDeleteCart================', isLoggedIn)
    if (isLoggedIn) {
      _deleteCart(id)
    } else {
      removeLocalStorage(id)
    }
  }
  const addCart = (params: AddCart) => {
    console.log('================actionAddCart================', isLoggedIn)
    if (isLoggedIn) {
      const paramsN = {
        productId: params?.productId,
        quantity: params.quantity || 1,
        productSizeId: params?.size
      }
      _addCart(paramsN)
    } else {
      addLocalStorageCart(params)
    }
  }

  const getLocalStorageCart = () => {
    let prodsCard: any = getLocalStorage('MDB_LIST_PRODUCT_CART')
    prodsCard = prodsCard ? JSON.parse(prodsCard) : []
    return prodsCard
  }

  const addLocalStorageCart = (params: AddCart) => {
    const listProd = getLocalStorageCart()
    const itemExits = listProd.findIndex((i: CartItem) => i.productId === params?.productId && i.productSizeId === params.productSizeId)
    if (itemExits > -1) {
      listProd[itemExits].quantity += params.quantity
      setLocalStorage('MDB_LIST_PRODUCT_CART', JSON.stringify(listProd))
    } else {
      listProd.push(params)
      toggleModalAddSuccess(true) //on
      setLocalStorage('MDB_LIST_PRODUCT_CART', JSON.stringify(listProd))
    }
    window.dispatchEvent(new Event('storage'))
  }

  const updateLocalStorage = (params: EditCart) => {
    const listProd = getLocalStorageCart()
    const itemExits = listProd.findIndex((i: CartItem) => i.productId === params?.productId && i.productSizeId === params.productSizeId)
    listProd[itemExits] = {...listProd[itemExits], ...params}
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
