import routes from '@/routes'

export enum PROFILE_ID {
  ACCOUNT_INFORMATION = 'ACCOUNT_INFORMATION',
  ORDER_HISTORY = 'ORDER_HISTORY',
  ADDRESS = 'ADDRESS',
  PAYMENT_METHOD = 'PAYMENT_METHOD',
  FAVORITE = 'FAVORITE',
  AESTHETIC_PROVIDER = 'AESTHETIC_PROVIDER'
}

export type ProfileID = keyof typeof PROFILE_ID

export type NavItem = {
  id: ProfileID
  label: string
  href: string
}

export const sidebarItems: NavItem[] = [
  { id: PROFILE_ID.ACCOUNT_INFORMATION, label: 'Account Information', href: routes.accountInformationPage() },
  { id: PROFILE_ID.ORDER_HISTORY, label: 'Order History', href: routes.orderHistoryPage() },
  { id: PROFILE_ID.ADDRESS, label: 'Addresses Book', href: routes.addressPage() },
  { id: PROFILE_ID.PAYMENT_METHOD, label: 'Payment Methods', href: routes.paymentMethodPage() },
  { id: PROFILE_ID.FAVORITE, label: 'Favorites', href: routes.favoritePage() },
  { id: PROFILE_ID.AESTHETIC_PROVIDER, label: 'Aesthetic Provider', href: routes.aestheticProviderPage() }
]
