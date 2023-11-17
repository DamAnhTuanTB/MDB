import { useMemo, useState } from 'react'

import classNames from 'classnames'

import { useProductDetail } from '@/hooks/pages/use-product-detail'
import { useCartStore } from '@/recoil/cart'
import styles from '@/styles/modules/product/detail.module.scss'
import { Product } from '@/types/product'
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
  const { selectedSize, handleUpdateSize, sizeOptions, unit } = useProductDetail(data)
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1)
  const { dataModalAddSuccess } = useCartStore()
  const dataAdd = useMemo(() => {
    return {
      id: data?.id || '',
      productId: data?.id || '',
      quantity: selectedQuantity,
      product: data
    }
  }, [data, selectedQuantity])

  const originalPrice = useMemo(() => data?.price || 0, [data?.price])
  const discountedPrice = useMemo(() => data?.wholesale || originalPrice, [data?.wholesale, originalPrice])
  const discountAmount = useMemo(() => originalPrice - discountedPrice, [originalPrice, discountedPrice])

  return (
    <div className={styles.container}>
      <h1 className={styles.content__title}>
        {data?.name}
        {data?.discount != 0 ? <span> (Worth {currencyFormatter.format(data?.price || 0)})</span> : null}
      </h1>
      <div className={styles.detail}>
        <div className={styles.detail__images}>
          <ImageCarousel images={data.images} />
        </div>
        <div className={styles.detail__information}>
          <h1 className={classNames(styles.content__title, styles['pc'])}>
            {data?.name}
            {data?.discount != 0 ? <span> (Worth {currencyFormatter.format(data?.price || 0)})</span> : null}
          </h1>
          <div className={styles.detail__group}>
            <RatingCommon score={data?.averageRating} />{' '}
            <span className={styles.detail__rating}>
              {data?.averageRating + '.0'} ({data?.totalReviews} reviews)
            </span>
          </div>
          <div className={styles.detail__group}>
            <h4 className={styles.detail__stock}>
              {currencyFormatter.format(discountedPrice)} <span> | </span> {data?.inStock ? 'In Stock' : 'Out Of Stock'} <span> | </span> SKU: {data?.sku}
            </h4>
          </div>
          {data?.discount != 0 && <div className={styles.detail__save}>Save: {currencyFormatter.format(discountAmount)}</div>}
          <div className={styles.detail__description}>
            <h4 className={styles.detail__description__title}>Product Description</h4>
            <HtmlRender htmlString={data?.description} />
          </div>
          <CustomForm>
            <div className={styles.detail__form}>
              <div className={classNames(styles.detail__group, styles['size'], 'justify-between')}>
                <span className={styles.detail__form__label}>Size: {selectedSize + ' ' + unit}</span>
                <SelectField className={styles.detail__form__input} inputClassName="h-10 text-[12px]" name="size" options={sizeOptions} onInputChange={handleUpdateSize} />
              </div>
              <div className={classNames(styles.detail__group, styles['quantity'], 'justify-between mt-2')}>
                <span className={styles.detail__form__label}>Qty: {data?.quantity}</span>
                <div className="flex">
                  <Quantity className={styles.detail__form__input} name="quantity" min={1} max={data?.quantity} defaultValue={1} onChange={setSelectedQuantity} />
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
