export type MenuLink = {
  title: string
  slug?: string
  href?: string
  parentId?: string
}

export type MenuItem = MenuLink & {
  links?: MenuItem[]
}
