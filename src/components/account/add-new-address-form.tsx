import { useState } from 'react'

import styles from '@/styles/modules/account/add-new-address-form.module.scss'

import SelectField from '@/components/form/select-field'
import TextField from '@/components/form/text-field'

import Checkbox from '../common/checkbox'

export default function AddNewAddressForm() {
  const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(false)

  return (
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
      <div className={`${styles.form__field}, ${styles.form__field__city}`}>
        <TextField showErrorMessage required inputClassName={styles.form__input} width={'100%'} name="city" placeholder="City" />
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
      <Checkbox label="Make this my default address" onChange={(checked) => setIsDefaultAddress(checked)} className={'pl-0 lg:pl-2'} labelClassName={'!text-xs, -ml-2'} />
    </div>
  )
}
