import styles from '@/styles/modules/product/review.module.scss'

import CustomForm from '@/components/form'
import SelectField from '@/components/form/select-field'

export default function Filter() {
  return (
    <div className={styles.comment__filter}>
      <span>75 reviews</span>
      <CustomForm>
        <div className={styles.comment__form}>
          <SelectField
            name="rating"
            className="max-w-[137px]"
            options={[
              { value: '', label: 'Rating' },
              { value: '5', label: '5' },
              { value: '4', label: '4' },
              { value: '3', label: '3' },
              { value: '2', label: '2' },
              { value: '1', label: '1' }
            ]}
          />
          <SelectField name="sort" options={[{ value: '', label: 'Sort' }]} className="max-w-[137px]" />
        </div>
      </CustomForm>
    </div>
  )
}
