import { useMemo, useState } from 'react'

import classNames from 'classnames'

import { useProductDetail } from '@/hooks/pages/use-product-detail'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import routes from '@/routes'
import stylesModal from '@/styles/modules/cart/modal-add-cart-success.module.scss'
import styles from '@/styles/modules/product/index.module.scss'
import { Product } from '@/types/product'
import { ProductCategory } from '@/types/product/category'
import { currencyFormatter } from '@/utils/helper'

import ButtonAddToCart from '@/components/cart/button-add-to-cart'
import Button from '@/components/common/button'
import Link from '@/components/common/custom-link'
import ImageComponent from '@/components/common/image'
import Quantity from '@/components/common/quantity'
import CustomForm from '@/components/form'
import SelectField from '@/components/form/select-field'

type Props = {
  product: Product
  category?: ProductCategory
  className?: string
  page?: string
  type?: 'black' | 'blue'
  onQuickReview?: (product: Product) => void
  addCard?: () => void
}

export default function ProductItem({ product, category, className, page = '', type = 'blue', onQuickReview }: Props) {
  const { query } = useRouterWithQueryParams()

  const featuredImage = useMemo(() => product?.images && product.images.find((img) => img.isDefault), [product?.images])
  const currentCategory = category || product?.categories?.length > 0 ? product?.categories[0] : ({} as ProductCategory)
  const { handleUpdateSize, sizeOptions } = useProductDetail(product)
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1)
  const dataAdd = useMemo(() => {
    return {
      id: product?.id || '',
      productId: product?.id || '',
      quantity: selectedQuantity,
      product: product
    }
  }, [product, selectedQuantity])

  return (
    <div className={classNames(styles.item, [styles[page]], className, 'flex flex-col items-center')} data-id={product?.id}>
      {/* TODO: handle favorite */}
      <div className={classNames(styles.item__favorite, { [styles['active']]: true })} />
      <ImageComponent src={featuredImage?.url} width={100} height={100} />
      <div className={styles.item__detail}>
        <Button variant="ocean" onClick={() => onQuickReview && onQuickReview(product)}>
          Quick Preview
        </Button>
        <Link className={styles.item__link} href={routes.productDetailPage(currentCategory?.slug, product?.slug, query.affiliate as string)}>
          <Button variant="teal">Product Details</Button>
        </Link>
      </div>
      <h3 className={styles.item__name}>{product?.name}</h3>
      <p className={styles.item__price}>{currencyFormatter.format(product?.price || 0)}</p>
      <CustomForm>
        <div className={'flex justify-between mt-5 gap-1'}>
          <SelectField className={`${stylesModal.body__form__select} `} inputClassName="h-10" name="size" options={sizeOptions} onInputChange={handleUpdateSize} />
          <Quantity className={`${stylesModal.body__form__input} !max-w-[60px] !md:max-w-[60px]`} name="quantity" min={1} max={product?.quantity} defaultValue={1} onChange={setSelectedQuantity} />
        </div>
      </CustomForm>
      {dataAdd && <ButtonAddToCart className={`${styles.item__button} bg-blue`} data={dataAdd} />}
    </div>
  )
}
