import routes from '@/routes'
import { MenuItem } from '@/types/menu'

export const getMenuItems = () => {
  return [
    {
      title: 'Brands',
      href: routes.homePage()
    },
    {
      title: 'Browse By',
      href: routes.homePage()
    },
    {
      title: 'Featured Products',
      href: routes.homePage()
    },
    {
      title: 'New Arrivals',
      href: routes.homePage()
    },
    {
      title: 'Best Sellers',
      href: routes.homePage()
    },
    {
      title: 'Special Deals',
      href: routes.homePage()
    }
  ]
}
