import styles from '@/styles/modules/home/index.module.scss'

import { ProductType } from '../common/product/item'
import ProductList from '../common/product/list'

import KvCarousel, { HomeCarouselType } from './carousel'
import Clients from './clients'

type Props = {
  slides: HomeCarouselType[]
  products: ProductType[]
}

export default function HomeComponent({ slides, products }: Props) {
  return (
    <div className={styles.wrapper}>
      <KvCarousel slides={slides} />
      <div className="container mx-auto">
        <div className={styles.list}>
          <ProductList products={products} page="home" spCarousel title="July 4th Selections" />
        </div>
      </div>
      <Clients />
    </div>
  )
}
