import { useState } from 'react'

import { ZodType, z } from 'zod'

import styles from '@/styles/modules/account/modal.module.scss'
import { AddressBody } from '@/types/account/address'

import Button from '@/components/common/button'
import Modal from '@/components/common/modal'
import CustomForm from '@/components/form'
import SelectField from '@/components/form/select-field'
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

  const handleSubmit = (value: AddressBody) => {
    console.log(value)
  }

  return (
    <Modal className={styles.modal} bodyClassName={styles.modal__body} open={open} onClose={onClose}>
      <h4 className={styles.modal__label}>Add New Address</h4>
      <div className={styles.modal__content}>
        <CustomForm schema={schema} onSubmit={handleSubmit}>
          <div className={styles.form}>
            <div className={styles.form__field}>
              <SelectField showErrorMessage required inputClassName={styles.form__select__input} width={'100%'} name="country" />
            </div>
            <div className={styles.form__group}>
              <div className={styles.form__field}>
                <TextField showErrorMessage required inputClassName={styles.form__input} width={'100%'} name="firstName" placeholder="First name" />
              </div>
              <div className={styles.form__field}>
                <TextField showErrorMessage required inputClassName={styles.form__input} width={'100%'} name="lastName" placeholder="Last Name" />
              </div>
            </div>
            <div className={styles.form__field}>
              <TextField showErrorMessage required inputClassName={styles.form__input} width={'100%'} name="company" placeholder="Company (optional)" />
            </div>
            <div className={styles.form__field}>
              <TextField showErrorMessage required inputClassName={styles.form__input} width={'100%'} name="address" placeholder="Address" />
            </div>
            <div className={styles.form__group__lg}>
              <div className={styles.form__field}>
                <TextField showErrorMessage required inputClassName={styles.form__input} width={'100%'} name="city" placeholder="City" />
              </div>
              <div className={styles.form__field}>
                <SelectField showErrorMessage required inputClassName={styles.form__select__input} width={'100%'} name="state" />
              </div>
              <div className={styles.form__field}>
                <TextField showErrorMessage required inputClassName={styles.form__input} width={'100%'} name="zipCode" placeholder="Zip Code" />
              </div>
            </div>
            <div className={styles.form__group__sx}>
              <div className={styles.form__field}>
                <SelectField showErrorMessage required inputClassName={styles.form__select__input} width={'100%'} name="state" />
              </div>
              <div className={styles.form__field}>
                <TextField showErrorMessage required inputClassName={styles.form__input} width={'100%'} name="zipCode" placeholder="Zip Code" />
              </div>
            </div>
            <div className={styles.form__field}>
              <TextField showErrorMessage required inputClassName={styles.form__input} width={'100%'} name="phoneNumber" placeholder="Phone Number" />
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
