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
  productPage: (category: string) => `/products/${category}`,
  productDetailPage: (category: string, slug: string) => `/products/${category}/${slug}`,
  faqPage: () => '/faq'
}
