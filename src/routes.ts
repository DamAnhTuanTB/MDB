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
  accountInformationPage: () => '/account/information',
  orderHistoryPage: () => '/account/order-history',
  addressPage: () => '/account/address',
  paymentMethodPage: () => '/account/payment-method',
  favoritePage: () => '/account/favorite',
  aestheticProviderPage: () => '/account/aesthetic-provider'
}
