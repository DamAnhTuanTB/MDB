export type MenuLink = {
  title: string
  href?: string
}

export type MenuItem = MenuLink & {
  links?: MenuItem[]
}
