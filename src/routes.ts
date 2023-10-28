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
  signUpPage: () => '/customer/signup'
}
