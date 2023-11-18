import type { AxiosPromise, AxiosRequestConfig } from 'axios'
import axios from 'axios'

import { authenticationConfig } from '@/configs/authentication'
import { getLocalStorage, setLocalStorage } from '@/utils/helper'

import { customerApi } from './authentication'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

const apiBase = {
  get: <T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> => instance.get(url, config),

  post: <B, T>(url: string, data?: B, config?: AxiosRequestConfig): AxiosPromise<T> => instance.post(url, data, config),

  put: <B, T>(url: string, data?: B, config?: AxiosRequestConfig): AxiosPromise<T> => instance.put(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> => instance.delete(url, config)
}

let isRefreshed: boolean = false
let isRefreshing: boolean = false

instance.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    const currentAccessToken = getLocalStorage(authenticationConfig.accessToken) || ''
    config.headers.Authorization = `Bearer ${currentAccessToken}`
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config
    if (error.response && error.response.status === 401) {
      if (!isRefreshed) {
        if (!isRefreshing) {
          isRefreshing = true
          const currentRefreshToken = getLocalStorage(authenticationConfig.refreshToken) || ''

          const response = await customerApi.refreshToken({ refreshToken: currentRefreshToken })
          if (response.data) {
            setLocalStorage(authenticationConfig.accessToken, response?.data?.accessToken)
            setLocalStorage(authenticationConfig.refreshToken, response?.data?.refreshToken)

            // reset headers
            originalConfig.headers.Authorization = `Bearer ${response.data.accessToken}`

            // Save new token to localStorage
            // setLocalStorage(authenticationConfig.accessToken, response.data.accessToken)

            // Token has expired or is invalid
            // Perform actions to refresh the token
            // You can make an API call to get a new access token
            // Once the new access token is obtained, update the authorization header of the instance
            // and retry the failed request
            isRefreshed = true
            return axios(originalConfig)
          }

          setTimeout(() => {
            isRefreshing = false
          }, 5000)
        }
      }
    }
    return Promise.reject(error)
  }
)

const handleApiError = (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response?.data
  }
  return error
}

export { apiBase, handleApiError }
