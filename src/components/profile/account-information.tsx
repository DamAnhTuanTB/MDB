import { useState } from 'react'

import { PROFILE_ID } from '@/constants/profile'
import styles from '@/styles/modules/profile/content.module.scss'

import CollapseItem from '../common/collapse'
import CustomForm from '../form'
import SelectField, { SelectOption } from '../form/select-field'

import ProfileLayout from './layout'

const promotionEmailOptions: SelectOption[] = [
  { value: '1', label: 'Yes' },
  { value: '0', label: 'No' }
]

export default function AccountInformation() {
  const [showMenu, setShowMenu] = useState<boolean>(false)

  const handleToggleCollapse = (value: boolean) => {
    setShowMenu(!value)
  }

  return (
    <ProfileLayout activeId={PROFILE_ID.ACCOUNT_INFORMATION} isShow={showMenu}>
      <CollapseItem
        title="Account Information"
        headingClassName={styles.collapse__heading}
        contentClassName={styles.collapse__content}
        className={styles.collapse}
        isActive
        onToggle={handleToggleCollapse}
      >
        <div className={styles.infor}>
          <div className={styles.infor__item}>
            <h4 className={styles.infor__item__title}>Name</h4>
            <p className={styles.infor__item__text}>Victor Chue</p>
            <div className={styles.infor__item__edit}>Edit</div>
          </div>
          <div className={styles.infor__item}>
            <h4 className={styles.infor__item__title}>Email</h4>
            <p className={styles.infor__item__text}>victor@popshap.com</p>
            <div className={styles.infor__item__edit}>Edit</div>
          </div>
          <div className={styles.infor__item}>
            <h4 className={styles.infor__item__title}>Email</h4>
            <p className={styles.infor__item__text}>victor@popshap.com</p>
            <div className={styles.infor__item__edit}>Edit</div>
          </div>
          <div className={styles.infor__item}>
            <h4 className={styles.infor__item__title}>Email</h4>
            <p className={styles.infor__item__text}>victor@popshap.com</p>
            <div className={styles.infor__item__edit}>Edit</div>
          </div>
          <div className={styles.infor__item}>
            <h4 className={styles.infor__item__title}>Email</h4>
            <p className={styles.infor__item__text}>victor@popshap.com</p>
            <div className={styles.infor__item__edit}>Edit</div>
          </div>
          <div className={styles.infor__item}>
            <h4 className={styles.infor__item__title}>Allow MyDermbox Email Promotions</h4>
            <CustomForm>
              <SelectField className={styles.infor__item__select} inputClassName={styles.infor__item__select__input} name="promotionEmail" options={promotionEmailOptions} />
            </CustomForm>
            <div className={styles.infor__item__edit}>Edit</div>
          </div>
        </div>
      </CollapseItem>
    </ProfileLayout>
  )
}
