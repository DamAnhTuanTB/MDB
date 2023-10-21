import { useCallback, useState } from 'react'

import type { AxiosResponse } from 'axios'

import { ApiError } from '@/types'

type Props<T, P> = {
  fetcher: (params: P) => Promise<AxiosResponse<T>>
}
export const useFetch = <T, P>({ fetcher }: Props<T, P>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<ApiError>()
  const [data, setData] = useState<T>()

  const fetch = useCallback(async (params: P) => {
    setIsLoading(true)
    try {
      const response = await fetcher(params)
      setData(response.data)
    } catch (error: any) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setData(undefined)
    setError(undefined)
  }, [])

  return {
    isLoading,
    error,
    fetch,
    data,
    reset
  }
}
