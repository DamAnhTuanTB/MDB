import { useState } from 'react'

import classNames from 'classnames'
import { FieldErrors, FormProvider, useForm } from 'react-hook-form'

import styles from '@/styles/modules/account/address/add-new-address-form.module.scss'

import SelectField from '@/components/form/select-field'
import TextField from '@/components/form/text-field'

type Form = {
  country: string
  firstName: string
  lastName: string
  company: string
  address: string
  city: string
  state: string
  zipCode: string
  phoneNumber: string
}

export default function AddNewAddressForm() {
  const methods = useForm()
  const [isMakeDefaultAddress, setIsMakeDefaultAddress] = useState<boolean>(false)

  const toggleCheck = () => {
    setIsMakeDefaultAddress(!isMakeDefaultAddress)
  }

  return (
    <FormProvider {...methods}>
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
        <div className={styles.form__checkbox}>
          <p className={classNames(styles.checkbox, { [styles['checked']]: isMakeDefaultAddress })} onClick={toggleCheck}>
            Make this my default address
          </p>
        </div>
      </div>
    </FormProvider>
  )
}
