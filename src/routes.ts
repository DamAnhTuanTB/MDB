import queryString from 'query-string'

type Params = {
  [key: string]: string | undefined
}

function urlWithQuery(path: string, params: Params) {
  const query = queryString.stringify(params, { skipEmptyString: true, skipNull: true })
  return `/${path}${query ? '?' : ''}${query}`
}

export default {
  homePage: () => '/',
  productPage: () => '/products',
  productDetailPage: (slug: string) => `/products/${slug}`,
  faqPage: () => '/faq'
}
