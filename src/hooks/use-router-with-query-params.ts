import { useRouter } from 'next/router'

import { debounce } from '@/utils/helper'

export function useRouterWithQueryParams() {
  const router = useRouter()

  const resetQueryParams = (pathname?: string) => {
    const reset = debounce(() => router.push({ pathname: pathname || router.pathname }), 300)
    reset()
  }

  const updateQueryParams = (params: { [key: string]: string | number | string[] | number[] }) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, ...params }
      },
      undefined,
      { scroll: false, shallow: true } // scroll: Prevent scroll to top if query changes
    )
  }

  const redirect = (url?: string) => {
    window.location.href = url || '/'
  }

  return { ...router, updateQueryParams, resetQueryParams, redirect }
}
