import { LinkProps } from 'next/link'

type Props = {
  isExternal?: boolean
  children: React.ReactNode
  title?: string
  className?: string
} & LinkProps

export default function Link({ isExternal = false, href, title, className, children }: Props) {
  return (
    <a href={(href as string) || ''} target={isExternal ? '_blank' : ''} title={title} className={className}>
      {children}
    </a>
  )
}
