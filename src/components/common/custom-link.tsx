import { LinkProps } from 'next/link'

import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { setLocalStorage } from '@/utils/helper'

type Props = {
  isExternal?: boolean
  children: React.ReactNode
  title?: string
  className?: string
} & LinkProps

export default function Link({ isExternal = false, href, title, className, children, ...rest }: Props) {
  const { query } = useRouterWithQueryParams()
  const affiliate = query.affiliate
  if (affiliate) setLocalStorage('MDB_AFFILIATE_DOMAIN', affiliate)
  if (affiliate?.toString() && href && !href?.toString()?.includes(affiliate?.toString())) href = `${affiliate?.toString()}${href}`
  return (
    <a href={(href as string) || ''} target={isExternal ? '_blank' : ''} title={title} className={`${className} cursor-pointer`} {...rest}>
      {children}
    </a>
  )
}
