import { useCallback, useState } from 'react'

import type { AxiosResponse } from 'axios'

import { ApiError, MDBResult, RequestError } from '@/types'

type Props<T, P> = {
  fetcher: (params: P) => Promise<AxiosResponse<T>>
}
export const useFetch = <T, P = any, E = RequestError>({ fetcher }: Props<T, P>) => {
  const [dataResult, setPageDataResult] = useState<MDBResult<T, E>>()

  const fetch = useCallback(async (params: P) => {
    setPageDataResult({
      isLoading: true,
      data: undefined,
      error: undefined
    })

    try {
      const { data, status } = await fetcher(params)

      setPageDataResult({
        isLoading: false,
        data,
        error: undefined
      })
    } catch (error: any) {
      setPageDataResult({
        isLoading: false,
        data: undefined,
        error: error as ApiError<E>
      })
    }
  }, [])

  return {
    dataResult,
    fetch
  }
}
