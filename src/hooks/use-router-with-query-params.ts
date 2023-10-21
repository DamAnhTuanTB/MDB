import { useRouter } from 'next/router'

export function useRouterWithQueryParams() {
  const router = useRouter()

  const updateQueryParams = (params: { [key: string]: string | number | string[] | number[] } | undefined) => {
    router.push(
      {
        pathname: router.pathname,
        query: params ? { ...router.query, ...params } : ''
      },
      undefined,
      { scroll: false, shallow: true } // scroll: Prevent scroll to top if query changes
    )
  }

  return { ...router, updateQueryParams }
}
