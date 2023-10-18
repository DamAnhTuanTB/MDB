import type { AxiosPromise, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import queryString from 'query-string'

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

export const paramToQueryString = (params: Object) => {
  return queryString.stringify(params)
}

const handleApiError = (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response?.data
  }
  return error
}

export { apiBase, handleApiError }
