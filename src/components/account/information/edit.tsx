import { useEffect, useMemo, useState } from 'react'

import type { PhoneNumber } from 'libphonenumber-js'
import { FieldValue } from 'react-hook-form'
import { ZodType, z } from 'zod'

import { validates } from '@/configs/validate'
import { promotionEmailOptions } from '@/constants/account'
import { useAccountInformation } from '@/hooks/pages/use-account-information'
import styles from '@/styles/modules/account/edit.module.scss'
import { StringOrNull } from '@/types'

import Button from '../../common/button'
import Modal from '../../common/modal'
import CustomForm from '../../form'
import SelectField from '../../form/select-field'
import TelField from '../../form/tel-field'
import TextField from '../../form/text-field'

import { EditData } from '.'

type Form = {
  editValue: StringOrNull
}

type FormPassword = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

type Props = {
  open: boolean
  data: EditData
  onClose: (reset?: boolean) => void
}

const schema = z.object({
  editValue: z.string()
}) satisfies FieldValue<Form>

const schemaPassword = () => {
  return z
    .object({
      currentPassword: z.string(),
      newPassword: z.string().refine((value) => validates.password.pattern.test(value), validates.password.message),
      confirmPassword: z.string()
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: validates.confirmPassword.message,
      path: ['confirmPassword']
    }) satisfies ZodType<FormPassword>
}

export default function ModalEdit({ open, data, onClose }: Props) {
  const { updateProfile, profileUpdated } = useAccountInformation()
  const [isUpdated, setIsUpdated] = useState<boolean>(false)
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumber>()

  useEffect(() => {
    if (profileUpdated?.data && isUpdated) onClose(true)
  }, [profileUpdated?.data])

  const handleSubmitPassword = (value: FormPassword) => {
    let putData: Record<string, string | boolean> = {}
    putData = {
      currentPassword: value.currentPassword || '',
      newPassword: value.newPassword || ''
    }
    updateProfile(putData)
    setIsUpdated(true)
  }

  const handleSubmit = (value: Form) => {
    if (value.editValue === data.value) return
    const putData: Record<string, string | boolean> = {}
    if (data.key === 'allowPromotions') {
      putData[data.key] = Boolean(Number(value.editValue))
    } else if (data.key === 'isEmailVerified') {
      putData[data.key] = Boolean(Number(value.editValue))
    } else if (data.key === 'phone') {
      putData[data.key] = phoneNumber?.number || ''
    } else {
      putData[data.key] = value.editValue || ''
    }

    updateProfile(putData)
    setIsUpdated(true)
  }

  const inputElement = useMemo(() => {
    if (data.key === 'allowPromotions' || data.key === 'isEmailVerified') {
      return (
        <SelectField
          label={<p className="mb-2">Edit your {data?.label?.toLowerCase()} below</p>}
          className={styles.infor__item__select}
          inputClassName={styles.infopromotionEmailOptionsr__item__select__input}
          name="editValue"
          options={promotionEmailOptions}
          defaultValue={data?.value ? '1' : '0'}
          disabled={profileUpdated?.isLoading}
          showErrorMessage
        />
      )
    } else if (data.key === 'phone') {
      return (
        <TelField
          label={`Edit your ${data?.label?.toLowerCase()} below`}
          defaultValue={data?.value as string}
          name="editValue"
          disabled={profileUpdated?.isLoading}
          onUpdate={(phone) => setPhoneNumber(phone)}
        />
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
  }, [data])

  return (
    <Modal open={open} onClose={onClose} bodyClassName={styles.wrapper} contentClassName="!overflow-visible">
      <h3 className={styles.title}>Change {data?.label}</h3>
      {data.key !== 'password' && <Form schema={schema} inputElement={inputElement} onClose={() => onClose(true)} onSubmit={handleSubmit} profileUpdated={profileUpdated} />}
      {data.key == 'password' && (
        <Form
          schema={schemaPassword()}
          onClose={() => onClose(true)}
          inputElement={
            <>
              <TextField showErrorMessage required label="Current password" name="currentPassword" placeholder="Current password" type="password" isLoading={profileUpdated?.isLoading} />
              <br />
              <TextField showErrorMessage required label="New password" name="newPassword" placeholder="New password" type="password" isLoading={profileUpdated?.isLoading} />
              <br />
              <TextField showErrorMessage required label="Confirm new password" name="confirmPassword" placeholder="Confirm password" type="password" isLoading={profileUpdated?.isLoading} />
            </>
          }
          onSubmit={handleSubmitPassword}
          profileUpdated={profileUpdated}
        />
      )}
    </Modal>
  )
}

const Form = (props: any) => {
  const { profileUpdated, inputElement, onClose, ...rest } = props
  return (
    <CustomForm {...rest}>
      <>
        {inputElement}
        {profileUpdated?.error?.response?.data?.message && <p className="text-sm text-red mt-2">{profileUpdated?.error?.response?.data?.message}</p>}
        <div className={styles.buttons}>
          <div className={styles.buttons__cancel} onClick={() => onClose(true)}>
            Cancel
          </div>
          <Button type="submit" className={styles.buttons__submit} isLoading={profileUpdated?.isLoading}>
            Save
          </Button>
        </div>
      </>
    </CustomForm>
  )
}
