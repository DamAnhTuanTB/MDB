import { useState } from 'react'

import { promotionEmailOptions } from '@/constants/account'
import { PROFILE_ID } from '@/constants/profile'
import styles from '@/styles/modules/account/content.module.scss'
import { StringOrNull } from '@/types'
import { AccountInformation } from '@/types/account/information'

import CollapseItem from '../common/collapse'
import CustomForm from '../form'
import SelectField from '../form/select-field'
import TelField from '../form/tel-field'

import ModalEdit from './edit'
import ProfileLayout from './layout'

export type EditData = {
  key: string
  label: string
  value: StringOrNull | boolean
}

type Props = {
  profile?: AccountInformation
  onReset: () => void
}

export default function AccountInformation({ profile, onReset }: Props) {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [editData, seteditData] = useState<EditData>()

  const handleToggleCollapse = (value: boolean) => {
    setShowMenu(!value)
  }

  const handleEditInformation = (key: string, label: string, value: any) => {
    seteditData({ key, label, value })
    setShowEditModal(true)
  }

  return (
    <>
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
              <h4 className={styles.infor__item__title}>First Name</h4>
              <p className={styles.infor__item__text}>{profile?.firstName}</p>
              <div className={styles.infor__item__edit} onClick={() => handleEditInformation('firstName', 'First Name', profile?.firstName)}>
                Edit
              </div>
            </div>
            <div className={styles.infor__item}>
              <h4 className={styles.infor__item__title}>Last Name</h4>
              <p className={styles.infor__item__text}>{profile?.lastName}</p>
              <div className={styles.infor__item__edit} onClick={() => handleEditInformation('lastName', 'Last Name', profile?.lastName)}>
                Edit
              </div>
            </div>
            <div className={styles.infor__item}>
              <h4 className={styles.infor__item__title}>Email</h4>
              <p className={styles.infor__item__text}>{profile?.email}</p>
              <div className={styles.infor__item__edit} onClick={() => handleEditInformation('email', 'Email', profile?.email)}>
                Edit
              </div>
            </div>
            <div className={styles.infor__item}>
              <h4 className={styles.infor__item__title}>Mobile Number</h4>
              <div className={styles.infor__item__edit} onClick={() => handleEditInformation('phone', 'Mobile Number', profile?.phone)}>
                Edit
              </div>
              <CustomForm>
                <TelField
                  disabled
                  defaultValue={profile?.phone || ''}
                  name="tel"
                  onUpdate={(value) => {
                    console.log(value)
                  }}
                />
              </CustomForm>
            </div>
            <div className={styles.infor__item}>
              <h4 className={styles.infor__item__title}>Password</h4>
              <p className={styles.infor__item__text}>****************</p>
              <div className={styles.infor__item__edit}>Edit</div>
            </div>
            <div className={styles.infor__item}>
              <h4 className={styles.infor__item__title}>Allow MyDermbox Email Promotions</h4>
              <CustomForm>
                <SelectField
                  disabled
                  className={styles.infor__item__select}
                  inputClassName={styles.infor__item__select__input}
                  name="promotionEmail"
                  options={promotionEmailOptions}
                  defaultValue={profile?.allowPromotions ? '1' : '0'}
                />
              </CustomForm>
              <div className={styles.infor__item__edit} onClick={() => handleEditInformation('allowPromotions', 'Allow MyDermbox Email Promotions', profile?.allowPromotions)}>
                Edit
              </div>
            </div>
            <div className={styles.infor__item}>
              <h4 className={styles.infor__item__title}>Is email verified</h4>
              <CustomForm>
                <SelectField
                  disabled
                  className={styles.infor__item__select}
                  inputClassName={styles.infor__item__select__input}
                  name="promotionEmail"
                  options={promotionEmailOptions}
                  defaultValue={profile?.isEmailVerified ? '1' : '0'}
                />
              </CustomForm>
            </div>
          </div>
        </CollapseItem>
      </ProfileLayout>

      {editData && (
        <ModalEdit
          open={showEditModal}
          onClose={(reset) => {
            setShowEditModal(false)
            seteditData(undefined)
            reset && onReset()
          }}
          data={editData}
        />
      )}
    </>
  )
}
