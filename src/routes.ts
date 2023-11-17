import { getLocalStorage, setLocalStorage } from './utils/helper'

type Params = {
  [key: string]: string | undefined
}

const generateUrl = (url: string, affiliateId?: string) => {
  if (affiliateId) setLocalStorage('MDB_AFFILIATE_DOMAIN', affiliateId)
  else affiliateId = getLocalStorage('MDB_AFFILIATE_DOMAIN')
  return affiliateId && !url.includes(affiliateId) ? `/${affiliateId}${url}` : url
}

export default {
  homePage: (affiliateId?: string) => generateUrl('/', affiliateId),
  productPage: (category: string, affiliateId?: string) => generateUrl(`/products/${category}`, affiliateId),
  productDetailPage: (category: string, slug: string, affiliateId?: string) => generateUrl(`/products/${category}/${slug}`, affiliateId),
  faqPage: () => generateUrl('/faq'),
  loginPage: () => generateUrl('/customer/login'),
  signUpPage: () => generateUrl('/customer/signup'),
  forgotPasswordPage: () => generateUrl('/customer/forgot-password'),
  resetPasswordPage: () => generateUrl('/customer/reset-password'),
  accountInformationPage: () => generateUrl('/account/information'),
  orderHistoryPage: () => generateUrl('/account/order-history'),
  addressPage: () => generateUrl('/account/address'),
  paymentMethodPage: () => generateUrl('/account/payment-method'),
  favoritePage: () => generateUrl('/account/favorite'),
  aestheticProviderPage: () => generateUrl('/account/aesthetic-provider'),
  cartPage: () => generateUrl('/cart')
}
