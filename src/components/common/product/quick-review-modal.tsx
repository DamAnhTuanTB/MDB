import { useMemo, useState } from 'react'

import classNames from 'classnames'

import { useProductDetail } from '@/hooks/pages/use-product-detail'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import routes from '@/routes'
import styles from '@/styles/modules/product/quick-review-modal.module.scss'
import { PRODUCT_ATTRIBUTE, Product } from '@/types/product'
import { currencyFormatter, findObjectByName } from '@/utils/helper'

import ButtonAddToCart from '@/components/cart/button-add-to-cart'
import CustomForm from '@/components/form'
import SelectField from '@/components/form/select-field'

import Button from '../button'
import HtmlRender from '../html-render'
import Modal from '../modal'
import Quantity from '../quantity'
import RatingCommon from '../rating'

type Props = {
  data?: Product
  open: boolean
  onClose: () => void
}

export default function QuickReviewModal({ open, data: dataProps, onClose }: Props) {
  const { query } = useRouterWithQueryParams()

  const { handleUpdateSize, sizeOptions, selectedSize, sizeOptionsData } = useProductDetail(dataProps)
  const data = useMemo(() => sizeOptionsData?.results?.find((prod) => prod?.size === Number(selectedSize)) || dataProps, [sizeOptionsData, selectedSize, dataProps])
  const image = useMemo(() => data?.images && data?.images?.find((item) => item.isDefault), [data?.images])
  const brands = findObjectByName(data?.attributeGroups || [], 'key', PRODUCT_ATTRIBUTE.BRAND)?.attributes
  const brandString = useMemo(() => brands?.map((item) => item.value).join(', '), [brands])

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1)

  const dataAdd = useMemo(() => {
    return {
      id: data?.id || '',
      productId: data?.id || '',
      quantity: selectedQuantity,
      product: data
    }
  }, [sizeOptions.length, data, selectedSize, sizeOptionsData, selectedQuantity])

  const originalPrice = useMemo(() => data?.price || 0, [data?.price])
  const discountedPrice = useMemo(() => data?.wholesale || originalPrice, [data?.wholesale, originalPrice])
  const discountAmount = useMemo(() => originalPrice - discountedPrice, [originalPrice, discountedPrice])

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.body}>
        <div className={styles.pc}>
          <div className={styles.image} style={{ backgroundImage: `url(${image?.url})` }}></div>
          <a href={routes.productDetailPage(data?.categories[0]?.slug || '', data?.slug || '', query.affiliate as string)}>
            <Button variant="outlined" className={styles.content__viewmore}>
              View More Details
            </Button>
          </a>
        </div>
        <div className={styles.content}>
          <div className={styles.image__sp} style={{ backgroundImage: `url(${image?.url})` }} />
          <h3 className={styles.content__name}>
            {data?.name}
            {data?.discount != 0 ? <span> (Worth {currencyFormatter.format(data?.price || 0)})</span> : null}
          </h3>
          <p className={styles.content__brand}>{brandString}</p>
          <div className={styles.content__group}>
            <RatingCommon score={data?.averageRating || 0} />
            <span>{data?.averageRating}.0</span> ({data?.totalReviews} reviews)
          </div>
          <div className={styles.content__group}>
            <h4>
              {currencyFormatter.format(data?.wholesale || 0)}
              <span> | </span> {data?.inStock ? ' In Stock' : ' Out of stock'} <span> | </span> SKU: {data?.sku}
            </h4>
          </div>
          {data?.discount != 0 && <div className={styles.content__save}>Save: {currencyFormatter.format(discountAmount)}</div>}
          <h4 className={styles.content__description__title}>Product Description</h4>
          <div className={styles.content__description}>
            <HtmlRender htmlString={data?.description || ''} />
          </div>
          <CustomForm>
            <div className={styles.content__form}>
              <div className={classNames(styles.content__group, styles['size'], 'justify-between')}>
                <p className={styles.content__form__label}>Size </p>
                <SelectField
                  className={styles.content__form__select}
                  inputClassName="h-10"
                  name="size"
                  defaultValue={data?.size}
                  options={sizeOptions}
                  onInputChange={(vl) => {
                    handleUpdateSize(vl)
                  }}
                />
              </div>
              <div className={classNames(styles.content__group, styles['quantity'], 'justify-between mt-2')}>
                <p className={styles.content__form__label}>Qty: {data?.quantity}</p>
                <div className="flex">
                  <Quantity
                    className={styles.content__form__input}
                    name="quantity"
                    min={1}
                    max={data?.quantity}
                    defaultValue={1}
                    onChange={(vl) => {
                      setSelectedQuantity(vl)
                    }}
                  />
                  {dataAdd && <ButtonAddToCart className={classNames(styles.content__form__button, styles['pc'])} data={dataAdd} onOpened={onClose} />}
                </div>
              </div>
              {dataAdd && <ButtonAddToCart className={classNames(styles.content__form__button, styles['sp'])} data={dataAdd} onOpened={onClose} />}
            </div>
          </CustomForm>
          {/* <div className={styles.content__group}>
            <a href={routes.productDetailPage(data?.categories[0]?.slug || '', data?.slug || '', query.affiliate as string)}>
              <Button variant="outlined" className={styles.content__viewmore__sp}>
                View More Details
              </Button>
            </a>
            <Button className={styles.content__addtocart}>Add to cart</Button>
          </div> */}
        </div>
      </div>
    </Modal>
  )
}
