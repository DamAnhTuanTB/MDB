import { useEffect, useRef, useState } from 'react'

import { ZodType, z } from 'zod'

import { validates } from '@/configs/validate'
import { useAuthStore } from '@/recoil/auth'
import { useAccountAddress } from '@/hooks/pages/use-account-address'
import styles from '@/styles/modules/account/modal.module.scss'
import { AddressBody, AddressType } from '@/types/account/address'

import Button from '@/components/common/button'
import Modal from '@/components/common/modal'
import CustomForm from '@/components/form'
import SelectField from '@/components/form/select-field'
import TelField from '@/components/form/tel-field'
import TextField from '@/components/form/text-field'

import Checkbox from '../../common/checkbox'

// import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
// import { GOOGLE_MAPS_API_KEY } from '@/constants/place'

export const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().refine((value) => validates.phoneNumber.pattern.test(value), validates.phoneNumber.message),
  company: z.string().optional(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  address: z.string(),
  zip: z.string().refine((value) => validates.zipCode.pattern.test(value), validates.zipCode.message),
  isDefault: z.any()
}) satisfies ZodType<AddressBody>

export type Props = {
  open: boolean
  onClose: () => void
  onReload: () => void
  address?: AddressType | null
  onSuccess: (mess: string) => void
}

export default function AddressModal({ open, onClose, onReload, address: dataEdit, onSuccess }: Props) {
  const { profile, phoneNumber } = useAuthStore()
  const { addAddress, addData, addresses, updateAddress, updateData } = useAccountAddress()
  const { firstName, lastName, company, city, state, country, address, zip, isDefault } = dataEdit || {}
  const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(false)
  const [phoneState, setPhoneState] = useState<string | undefined>('')

  const timer = useRef<any>(null)

  useEffect(() => {
    setPhoneState(dataEdit?.phone)
  }, [dataEdit])

  useEffect(() => {
    if (addData?.data || updateData?.data) {
      onSuccess(`${dataEdit ? 'Update' : 'Add'} address successfully`)
      setTimeout(() => {
        onReload()
        onClose()
      }, 100)
    }
  }, [addData, updateData])
  const handleSubmit = (value: AddressBody) => {
    const postData: AddressBody = { ...value, isDefault: isDefaultAddress, phone: phoneState || '' }

    if (!dataEdit) addAddress(postData)
    else updateAddress({ body: postData, id: dataEdit.id })
  }

  const updatePhone = (vl: string) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setPhoneState(vl)
      clearTimeout(timer.current)
    }, 500)
  }

  return (
    <Modal className={styles.modal} bodyClassName={styles.modal__body} open={open} onClose={onClose}>
      <h4 className={styles.modal__label}>{`${dataEdit ? 'Update' : 'Add New'} Address`}</h4>
      <div className={styles.modal__content}>
        <CustomForm schema={schema} onSubmit={handleSubmit}>
          {/*<CustomForm onSubmit={handleSubmit}>*/}
          <div className={styles.form}>
            <div className={styles.form__group}>
              <div className={styles.form__field}>
                <TextField showErrorMessage required inputClassName={styles.form__input} name="firstName" placeholder="First name" defaultValue={firstName || profile?.firstName || ''} />
              </div>
              <div className={styles.form__field}>
                <TextField showErrorMessage required inputClassName={styles.form__input} name="lastName" placeholder="Last Name" defaultValue={lastName || profile?.lastName || ''} />
              </div>
            </div>
            <div className={styles.form__field}>
              {dataEdit && <TelField showErrorMessage required defaultValue={dataEdit.phone} onUpdate={(vl) => updatePhone(vl.number)} name="phone" className="!w-full" />}
              {!dataEdit && <TelField showErrorMessage required defaultValue={phoneNumber?.number} onUpdate={(vl) => updatePhone(vl.number)} name="phone" className="!w-full" />}
            </div>
            <div className={styles.form__field}>
              <TextField showErrorMessage required inputClassName={styles.form__input} defaultValue={company} name="company" placeholder="Company (optional)" />
            </div>
            <div className={styles.form__field}>
              <TextField showErrorMessage required inputClassName={styles.form__input} defaultValue={address} name="address" placeholder="Address" />
            </div>
            <div className={styles.form__field}>
              <TextField showErrorMessage required inputClassName={styles.form__input} defaultValue={country} name="country" placeholder="Country/Region" />
            </div>
            <div className={styles.form__group__lg}>
              <div className={styles.form__field}>
                <TextField showErrorMessage required inputClassName={styles.form__input} defaultValue={city} name="city" placeholder="City" />
              </div>
              <div className={styles.form__field}>
                <TextField showErrorMessage required inputClassName={styles.form__input} defaultValue={state} name="state" placeholder="Stage" />
              </div>
              <div className={styles.form__field}>
                <TextField showErrorMessage required inputClassName={styles.form__input} defaultValue={zip} name="zip" placeholder="Zip Code" />
              </div>
            </div>
            <div className={styles.form__group__sx}>
              <div className={styles.form__field}>
                <SelectField showErrorMessage required inputClassName={styles.form__select__input} defaultValue={state} name="state" />
              </div>
              <div className={styles.form__field}>
                <TextField showErrorMessage required inputClassName={styles.form__input} name="zip" defaultValue={zip} placeholder="Zip Code" />
              </div>
            </div>
            <Checkbox label="Make this my default address" onChange={(checked) => setIsDefaultAddress(checked)} className={'ml-0 lg:ml-2'} labelClassName={'!text-xs -ml-2'} />
            {(addData?.error || updateData?.error) && <p className="text-base text-sm text-red mt-2">{addData?.error?.message || addData?.error?.message}</p>}
            <div className={styles.modal__buttons}>
              <Button variant="none" className={styles.modal__buttons__cancel} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className={styles.modal__buttons__submit} variant="blue" isLoading={addData?.isLoading || updateData?.isLoading}>
                Save
              </Button>
            </div>
          </div>
        </CustomForm>
      </div>
    </Modal>
  )
}
