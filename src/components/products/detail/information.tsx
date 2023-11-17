import { useEffect, useMemo, useState } from 'react'

import classNames from 'classnames'

import { useProductDetail } from '@/hooks/pages/use-product-detail'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { useCartStore } from '@/recoil/cart'
import routes from '@/routes'
import styles from '@/styles/modules/product/detail.module.scss'
import { Product } from '@/types/product'
import { ProductCategory } from '@/types/product/category'
import { currencyFormatter } from '@/utils/helper'

import ButtonAddToCart from '@/components/cart/button-add-to-cart'
import ModalAddCartSuccess from '@/components/cart/modal-add-cart-success'
import HtmlRender from '@/components/common/html-render'
import Quantity from '@/components/common/quantity'
import RatingCommon from '@/components/common/rating'
import CustomForm from '@/components/form'
import SelectField from '@/components/form/select-field'

import ImageCarousel from './image-carousel'

type Props = {
  data: Product
}

export default function Information({ data }: Props) {
  const { selectedSize, handleUpdateSize, sizeOptions, unit, sizeOptionsData } = useProductDetail(data)
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1)

  const { query, push } = useRouterWithQueryParams()

  const productSize = useMemo(() => {
    return sizeOptionsData?.results?.find((item) => item.size == Number(selectedSize || data.size)) || data
  }, [selectedSize])

  const currentCategory = productSize?.categories?.length > 0 ? productSize?.categories[0] : ({} as ProductCategory)

  useEffect(() => {
    push(routes.productDetailPage(currentCategory?.slug, productSize?.slug, query.affiliate as string))
  }, [selectedSize])

  const { dataModalAddSuccess } = useCartStore()
  const dataAdd = useMemo(() => {
    return {
      id: data?.id || '',
      productId: data?.id || '',
      quantity: selectedQuantity,
      product: data
    }
  }, [data, selectedQuantity])

  const originalPrice = useMemo(() => productSize?.price || 0, [productSize?.price])
  const discountedPrice = useMemo(() => productSize?.wholesale || originalPrice, [productSize?.wholesale, originalPrice])
  const discountAmount = useMemo(() => originalPrice - discountedPrice, [originalPrice, discountedPrice])

  return (
    <div className={styles.container}>
      <h1 className={styles.content__title}>
        {productSize?.name}
        {productSize?.discount != 0 ? <span> (Worth {currencyFormatter.format(productSize?.price || 0)})</span> : null}
      </h1>
      <div className={styles.detail}>
        <div className={styles.detail__images}>
          <ImageCarousel images={productSize.images} />
        </div>
        <div className={styles.detail__information}>
          <h1 className={classNames(styles.content__title, styles['pc'])}>
            {productSize?.name}
            {productSize?.discount != 0 ? <span> (Worth {currencyFormatter.format(productSize?.price || 0)})</span> : null}
          </h1>
          <div className={styles.detail__group}>
            <RatingCommon score={productSize?.averageRating} />{' '}
            <span className={styles.detail__rating}>
              {productSize?.averageRating + '.0'} ({productSize?.totalReviews} reviews)
            </span>
          </div>
          <div className={styles.detail__group}>
            <h4 className={styles.detail__stock}>
              {currencyFormatter.format(discountedPrice)} <span> | </span> {productSize?.inStock ? 'In Stock' : 'Out Of Stock'} <span> | </span> SKU: {productSize?.sku}
            </h4>
          </div>
          {productSize?.discount != 0 && <div className={styles.detail__save}>Save: {currencyFormatter.format(discountAmount)}</div>}
          <div className={styles.detail__description}>
            <h4 className={styles.detail__description__title}>Product Description</h4>
            <HtmlRender htmlString={productSize?.description} />
          </div>
          <CustomForm>
            <div className={styles.detail__form}>
              <div className={classNames(styles.detail__group, styles['size'], 'justify-between')}>
                <span className={styles.detail__form__label}>Size: {selectedSize + ' ' + unit}</span>
                <SelectField
                  className={styles.detail__form__input}
                  inputClassName="h-10 text-[12px]"
                  name="size"
                  defaultValue={productSize?.size}
                  options={sizeOptions}
                  onInputChange={handleUpdateSize}
                />
              </div>
              <div className={classNames(styles.detail__group, styles['quantity'], 'justify-between mt-2')}>
                <span className={styles.detail__form__label}>Qty: {productSize?.quantity}</span>
                <div className="flex">
                  <Quantity className={styles.detail__form__input} name="quantity" min={1} max={productSize?.quantity} defaultValue={1} onChange={setSelectedQuantity} />
                  {dataAdd && <ButtonAddToCart className={classNames(styles.detail__form__button, styles['pc'])} data={dataAdd} />}
                </div>
              </div>
              {dataAdd && <ButtonAddToCart className={classNames(styles.detail__form__button, styles['sp'])} data={dataAdd} />}
              <ModalAddCartSuccess open={dataModalAddSuccess} />
            </div>
          </CustomForm>
        </div>
      </div>
    </div>
  )
}
