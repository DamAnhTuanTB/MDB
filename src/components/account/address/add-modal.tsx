import { useState } from 'react'

import { ZodType, z } from 'zod'

import { useAuthStore } from '@/recoil/auth'
import styles from '@/styles/modules/account/modal.module.scss'
import { AddressBody } from '@/types/account/address'

import Button from '@/components/common/button'
import Modal from '@/components/common/modal'
import CustomForm from '@/components/form'
import SelectField from '@/components/form/select-field'
import TelField from '@/components/form/tel-field'
import TextField from '@/components/form/text-field'

import Checkbox from '../../common/checkbox'

export const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  company: z.string().optional(),
  city: z.string(),
  stage: z.string(),
  country: z.string(),
  address: z.string(),
  zip: z.string(),
  isDefault: z.boolean().optional()
}) satisfies ZodType<AddressBody>

export type Props = {
  open: boolean
  onClose?: () => void
}

export default function AddressModal({ open, onClose }: Props) {
  const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(false)
  const { profile, phoneNumber } = useAuthStore()

  const handleSubmit = (value: AddressBody) => {
    const postData: AddressBody = { ...value, isDefault: isDefaultAddress }
    console.log(postData)
  }

  return (
    <Modal className={styles.modal} bodyClassName={styles.modal__body} open={open} onClose={onClose}>
      <h4 className={styles.modal__label}>Add New Address</h4>
      <div className={styles.modal__content}>
        <CustomForm schema={schema} onSubmit={handleSubmit}>
          <div className={styles.form}>
            <div className={styles.form__group}>
              <div className={styles.form__field}>
                <TextField showErrorMessage required inputClassName={styles.form__input} name="firstName" placeholder="First name" defaultValue={profile?.firstName || ''} />
              </div>
              <div className={styles.form__field}>
                <TextField showErrorMessage required inputClassName={styles.form__input} name="lastName" placeholder="Last Name" defaultValue={profile?.lastName || ''} />
              </div>
            </div>
            <div className={styles.form__field}>
              <TelField defaultValue={phoneNumber?.number} name="phoneNumber" className="!w-full" />
            </div>
            <div className={styles.form__field}>
              <TextField showErrorMessage required inputClassName={styles.form__input} name="company" placeholder="Company (optional)" />
            </div>
            <div className={styles.form__field}>
              <TextField showErrorMessage required inputClassName={styles.form__input} name="address" placeholder="Address" />
            </div>
            <div className={styles.form__field}>
              <TextField showErrorMessage required inputClassName={styles.form__input} name="country" placeholder="Country/Region" />
            </div>
            <div className={styles.form__group__lg}>
              <div className={styles.form__field}>
                <TextField showErrorMessage required inputClassName={styles.form__input} name="city" placeholder="City" />
              </div>
              <div className={styles.form__field}>
                <TextField showErrorMessage required inputClassName={styles.form__input} name="stage" placeholder="Stage" />
              </div>
              <div className={styles.form__field}>
                <TextField showErrorMessage required inputClassName={styles.form__input} name="zipCode" placeholder="Zip Code" />
              </div>
            </div>
            <div className={styles.form__group__sx}>
              <div className={styles.form__field}>
                <SelectField showErrorMessage required inputClassName={styles.form__select__input} name="state" />
              </div>
              <div className={styles.form__field}>
                <TextField showErrorMessage required inputClassName={styles.form__input} name="zipCode" placeholder="Zip Code" />
              </div>
            </div>
            <Checkbox label="Make this my default address" onChange={(checked) => setIsDefaultAddress(checked)} className={'ml-0 lg:ml-2'} labelClassName={'!text-xs -ml-2'} />
            <div className={styles.modal__buttons}>
              <Button variant="none" className={styles.modal__buttons__cancel} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className={styles.modal__buttons__submit} variant="blue">
                Save
              </Button>
            </div>
          </div>
        </CustomForm>
      </div>
    </Modal>
  )
}
