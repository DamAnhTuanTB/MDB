import classNames from 'classnames'

import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import routes from '@/routes'
import styles from '@/styles/modules/product/quick-review-modal.module.scss'
import { Product } from '@/types/product'
import { currencyFormatter } from '@/utils/helper'

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

export default function QuickReviewModal({ open, data, onClose }: Props) {
  const { query } = useRouterWithQueryParams()

  const image = data?.images && data?.images?.find((item) => item.isDefault)

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
          <h3 className={styles.content__name}>{data?.name}</h3>
          {/* <p className={styles.content__brand}>{data?.}</p> */}
          <div className={styles.content__group}>
            <RatingCommon score={data?.averageRating || 0} /> <span>{data?.averageRating}.0</span> ({data?.totalReviews} reviews)
          </div>
          <div className={styles.content__group}>
            <h4>
              {currencyFormatter.format(data?.price || 0)} <span> | </span> {data?.inStock ? ' In Stock' : ' Out of stock'} <span> | </span> SKU: {data?.sku}
            </h4>
          </div>
          <h4 className={styles.content__description__title}>Product Description</h4>
          <div className={styles.content__description}>
            <HtmlRender htmlString={data?.description || ''} />
          </div>
          <CustomForm>
            <div className={styles.content__form}>
              <div className={classNames(styles.content__group, styles['size'], 'justify-between')}>
                <p className={styles.content__form__label}>Size </p>
                <SelectField className={styles.content__form__select} inputClassName="h-10" name="size" options={[{ label: '1.7 oz', value: '1.7' }]} />
              </div>
              <div className={classNames(styles.content__group, styles['quantity'], 'justify-between mt-2')}>
                <p className={styles.content__form__label}>Qty: {data?.quantity}</p>
                <div className="flex">
                  <Quantity className={styles.content__form__input} name="quantity" min={0} defaultValue={1} />
                  <Button className={classNames(styles.content__form__button, styles['pc'])}>Add to cart</Button>
                </div>
              </div>
              <Button className={classNames(styles.content__form__button, styles['sp'])}>Add to cart</Button>
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
