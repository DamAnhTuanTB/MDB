import { useEffect, useMemo, useState } from 'react'

import type { PhoneNumber } from 'libphonenumber-js'
import { FieldValue } from 'react-hook-form'
import { z } from 'zod'

import { validates } from '@/configs/validate'
import { promotionEmailOptions } from '@/constants/account'
import { useAccountInformation } from '@/hooks/pages/use-account-information'
import styles from '@/styles/modules/account/edit.module.scss'

import Button from '../common/button'
import Modal from '../common/modal'
import CustomForm from '../form'
import SelectField from '../form/select-field'
import TelField from '../form/tel-field'
import TextField from '../form/text-field'

import { EditData } from './information'

type Form = {
  editValue: string
  password?: string
  confirmPassword?: string
}

const schema = z
  .object({
    editValue: z.string(),
    password: z.string().min(8).optional(),
    confirmPassword: z.string().optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: validates.confirmPassword.message,
    path: ['confirmPassword']
  }) satisfies FieldValue<Form>

type Props = {
  open: boolean
  data: EditData
  onClose: (reset?: boolean) => void
}

export default function ModalEdit({ open, data, onClose }: Props) {
  const { updateProfile, profileUpdated } = useAccountInformation()
  const [isUpdated, setIsUpdated] = useState<boolean>(false)
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumber>()

  useEffect(() => {
    if (profileUpdated?.data && isUpdated) onClose(true)
  }, [profileUpdated?.data])

  const handleSubmit = (value: Form) => {
    if (value.editValue === data.value) return
    const putData = {
      [data.key]: data.key === 'allowPromotions' ? Boolean(Number(value.editValue)) : data.key === 'phone' ? phoneNumber?.number : value.editValue
    }

    updateProfile(putData)
    setIsUpdated(true)
  }

  const inputElement = useMemo(() => {
    if (data.key === 'allowPromotions' || data.key === 'isEmailVerified') {
      return (
        <SelectField
          label={<p className="mb-2">Edit your ${data?.label?.toLowerCase()} below</p>}
          className={styles.infor__item__select}
          inputClassName={styles.infor__item__select__input}
          name="editValue"
          options={promotionEmailOptions}
          defaultValue={data.value ? '1' : '0'}
          disabled={profileUpdated?.isLoading}
          showErrorMessage
        />
      )
    } else if (data.key === 'phone') {
      return (
        <TelField
          label={`Edit your ${data?.label?.toLowerCase()} below`}
          defaultValue={data.value as string}
          name="editValue"
          disabled={profileUpdated?.isLoading}
          onUpdate={(phone) => setPhoneNumber(phone)}
        />
      )
    } else if (data.key === 'password') {
      return (
        <>
          <TextField showErrorMessage required label="Current password" name="currentPassword" placeholder="Current password" type="password" isLoading={profileUpdated?.isLoading} />
          <br />
          <TextField showErrorMessage required label="New password" name="password" placeholder="New password" type="password" isLoading={profileUpdated?.isLoading} />
          <br />
          <TextField showErrorMessage required label="Confirm new password" name="confirmPassword" placeholder="Confirm password" type="password" isLoading={profileUpdated?.isLoading} />
        </>
      )
    }
    return (
      <TextField
        label={`Edit your ${data?.label?.toLowerCase()} below`}
        name="editValue"
        defaultValue={data?.value as string}
        inputClassName={styles.input}
        showErrorMessage
        disabled={profileUpdated?.isLoading}
      />
    )
  }, [])

  return (
    <Modal open={open} onClose={() => onClose()} bodyClassName={styles.wrapper}>
      <h3 className={styles.title}>Change {data?.label}</h3>
      <CustomForm schema={schema} onSubmit={handleSubmit}>
        <>
          {inputElement}
          <div className={styles.buttons}>
            <div className={styles.buttons__cancel} onClick={() => onClose()}>
              Cancel
            </div>
            <Button type="submit" className={styles.buttons__submit} isLoading={profileUpdated?.isLoading}>
              Save
            </Button>
          </div>
        </>
      </CustomForm>
    </Modal>
  )
}
