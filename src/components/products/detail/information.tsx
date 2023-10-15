import classNames from 'classnames'

import styles from '@/styles/modules/product/detail.module.scss'

import Button from '@/components/common/button'
import HtmlRender from '@/components/common/html-render'
import Quantity from '@/components/common/quantity'
import RatingCommon from '@/components/common/rating'
import CustomForm from '@/components/form'
import SelectField from '@/components/form/select-field'

export default function Information() {
  return (
    <div className={styles.container}>
      <h1 className={styles.content__title}>EltaMD UV Lotion Broad-Spectrum SP 30+</h1>
      <div className={styles.detail}>
        <div className={styles.detail__images}>
          <div className={styles.detail__images__target} style={{ backgroundImage: 'url(/images/product.png)' }}></div>
          <div className={styles.detail__images__carousel}></div>
        </div>
        <div className={styles.detail__information}>
          <h1 className={classNames(styles.content__title, styles['pc'])}>EltaMD UV Lotion Broad-Spectrum SP 30+</h1>
          <div className={styles.detail__group}>
            <RatingCommon score={4} /> <span className={styles.detail__rating}>4.0 (175 reviews)</span>
          </div>
          <div className={styles.detail__group}>
            <h4 className={styles.detail__stock}>
              $55.00 <span> | </span> In Stock <span> | </span> SKU: 02287
            </h4>
          </div>
          <div className={styles.detail__description}>
            <h4 className={styles.detail__description__title}>Product Description</h4>
            <HtmlRender htmlString={'Have your fun in the sun—but play it safe. This sunscreen is great for swimmers, skiers, runners, golfers and other athletes.'} />
          </div>
          <CustomForm>
            <div className={styles.detail__form}>
              <div className={classNames(styles.detail__group, styles['size'], 'justify-between')}>
                <span className={styles.detail__form__label}>Size: 1.7 oz</span>
                <SelectField className={styles.detail__form__input} inputClassName="h-10" name="size" options={[{ label: '1.7 oz', value: '1.7' }]} />
              </div>
              <div className={classNames(styles.detail__group, styles['quantity'], 'justify-between mt-2')}>
                <span className={styles.detail__form__label}>Qty: 10</span>
                <div className="flex">
                  <Quantity className={styles.detail__form__input} name="quantity" min={0} max={100} defaultValue={10} />
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
