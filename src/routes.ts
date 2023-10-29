type Params = {
  [key: string]: string | undefined
}

const generateUrl = (url: string, affiliateId?: string) => {
  return affiliateId ? `/${affiliateId}${url}` : url
}

export default {
  homePage: (affiliateId?: string) => generateUrl('/', affiliateId),
  productPage: (category: string, affiliateId?: string) => generateUrl(`/products/${category}`, affiliateId),
  productDetailPage: (category: string, slug: string, affiliateId?: string) => generateUrl(`/products/${category}/${slug}`, affiliateId),
  faqPage: () => '/faq',
  loginPage: () => '/customer/login',
  signUpPage: () => '/customer/signup',
  forgotPasswordPage: () => '/customer/forgot-password',
  resetPasswordPage: () => '/customer/reset-password',
  accountInformationPage: () => '/profile/account-information',
  orderHistoryPage: () => '/profile/order-history',
  addressPage: () => '/profile/address',
  paymentMethodPage: () => '/profile/payment-method',
  favoritePage: () => '/profile/favorite',
  aestheticProviderPage: () => '/profile/aesthetic-provider'
}
