import { useMemo, useState } from 'react'

import classNames from 'classnames'

import styles from '@/styles/modules/product/detail.module.scss'
import { PRODUCT_ATTRIBUTE, Product } from '@/types/product'
import { currencyFormatter, findObjectByName } from '@/utils/helper'

import Button from '@/components/common/button'
import HtmlRender from '@/components/common/html-render'
import Quantity from '@/components/common/quantity'
import RatingCommon from '@/components/common/rating'
import CustomForm from '@/components/form'
import SelectField, { SelectOption } from '@/components/form/select-field'

import ImageCarousel from './image-carousel'

type Props = {
  data: Product
}

export default function Information({ data }: Props) {
  const unit = findObjectByName(data?.attributeGroups || [], 'key', PRODUCT_ATTRIBUTE.UNIT)?.attributes[0]?.value

  const [selectedSize, setSelectedSize] = useState<string>(String(data.sizes[0].size))
  const [price, setPrice] = useState<number>(data.sizes[0].price)
  const [quantity, setQuantity] = useState<number>(data.sizes[0].quantity)

  const sizeOptions: SelectOption[] = useMemo(() => data.sizes.map((item) => ({ label: item.size + ' ' + unit, value: String(item.size) })), [data.sizes, unit])

  const handleUpdateSize = (value: string) => {
    setSelectedSize(value)
    const size = data.sizes.find((item) => item.size == Number(value))
    setPrice(Number(size?.price))
    setQuantity(Number(size?.quantity))
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.content__title}>{data?.name}</h1>
      <div className={styles.detail}>
        <div className={styles.detail__images}>
          <ImageCarousel images={data.images} />
        </div>
        <div className={styles.detail__information}>
          <h1 className={classNames(styles.content__title, styles['pc'])}>{data?.name}</h1>
          <div className={styles.detail__group}>
            <RatingCommon score={data?.averageRating} />{' '}
            <span className={styles.detail__rating}>
              {data?.averageRating + '.0'} ({data?.totalReviews} reviews)
            </span>
          </div>
          <div className={styles.detail__group}>
            <h4 className={styles.detail__stock}>
              {currencyFormatter.format(price)} <span> | </span> {data?.inStock ? 'In Stock' : 'Out Of Stock'} <span> | </span> SKU: {data?.sku}
            </h4>
          </div>
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
                <span className={styles.detail__form__label}>Qty: {quantity}</span>
                <div className="flex">
                  <Quantity className={styles.detail__form__input} name="quantity" min={1} max={quantity} defaultValue={1} />
                  <Button className={classNames(styles.detail__form__button, styles['pc'])}>Add to cart</Button>
                </div>
              </div>
              <Button className={classNames(styles.detail__form__button, styles['sp'])}>Add to cart</Button>
            </div>
          </CustomForm>
        </div>
      </div>
    </div>
  )
}
