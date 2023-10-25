import routes from '@/routes'
import { MenuItem } from '@/types/menu'

export const menu: MenuItem[] = [
  {
    title: 'Brands',
    href: routes.homePage()
  },
  {
    title: 'Browse By'
  },
  {
    title: 'Featured Products',
    links: []
  },
  {
    title: 'New Arrivals',
    links: [
      {
        title: 'New Arrivals',
        links: [
          { title: 'New Arrivals', href: routes.homePage() },
          { title: 'New Arrivals', href: '#' },
          { title: 'New Arrivals', href: '#' },
          { title: 'New Arrivals', href: '#' },
          { title: 'New Arrivals', href: '#' }
        ]
      },
      {
        title: 'New Arrivals',
        links: [
          { title: 'New Arrivals', href: '/' },
          { title: 'New Arrivals', href: '/' }
        ]
      }
    ]
  },
  {
    title: 'Skin Care',
    links: [
      {
        title: 'Moisturizers',
        links: [
          { title: 'Face', href: routes.homePage() },
          { title: 'Neck & Decolletage', href: '#' },
          { title: 'Body', href: '#' },
          { title: 'Hand', href: '#' },
          { title: 'Anti-Aging', href: '#' }
        ]
      },
      {
        title: 'Sunscreen',
        href: '/'
      },
      {
        title: 'Cleansers & Exfoliators',
        links: [
          { title: 'Face', href: '/' },
          { title: 'Body', href: '/' },
          { title: 'Toners', href: '/' },
          { title: 'Gentle Cleansers', href: '/' },
          { title: 'Active Cleansers', href: '/' },
          { title: 'Exfoliators & Scrubs', href: '/' }
        ]
      },
      {
        title: 'Eye Care',
        links: [{ title: 'Dark Circles', href: '/' }, { title: 'Puffiness' }, { title: 'Anti-Aging', href: '/' }, { title: 'Eyelash Serums', href: '/' }]
      },
      {
        title: 'Lip Care',
        links: [
          { title: 'Moisturizers', href: '/' },
          { title: 'Sunscreen', href: '/' },
          { title: 'Volumizers', href: '/' }
        ]
      },
      {
        title: 'Vitamins & Supplements',
        links: [
          { title: 'Sun Protection', href: '/' },
          { title: 'Hair Growth', href: '/' },
          { title: 'Skin Cancer Prevention', href: '/' },
          { title: 'Bruising', href: '/' }
        ]
      }
    ]
  },
  {
    title: 'Hair Care'
  },
  {
    title: 'Best Sellers'
  },
  {
    title: 'Special Deals'
  }
]
