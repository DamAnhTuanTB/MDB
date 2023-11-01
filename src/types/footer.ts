import { ContentOption } from './global'

export type FooterMenuItem = {
  id: string
  title: string
  chosen: boolean
  ordering: number
  selected: boolean
  description: string
}

export type FooterContent<T = any> = ContentOption<T>

export type MediaIcon = {
  id: string
  imageUrl: string
  name: string
  ordering: number
  urlLink: string
}
