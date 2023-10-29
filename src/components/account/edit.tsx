import { useEffect, useMemo } from 'react'

import { FieldValue } from 'react-hook-form'
import { z } from 'zod'

import { promotionEmailOptions } from '@/constants/account'
import { useAccountInformation } from '@/hooks/pages/use-account-information'
import styles from '@/styles/modules/account/edit.module.scss'

import Button from '../common/button'
import Modal from '../common/modal'
import CustomForm from '../form'
import SelectField from '../form/select-field'
import TextField from '../form/text-field'

import { EditData } from './information'

type Form = {
  editValue: string
}

const schema = z.object({
  editValue: z.string()
}) satisfies FieldValue<Form>

type Props = {
  open: boolean
  data: EditData
  onClose: () => void
}

export default function ModalEdit({ open, data, onClose }: Props) {
  const { updateProfile, profileUpdated } = useAccountInformation()

  useEffect(() => {
    if (profileUpdated?.data) onClose()
  }, [profileUpdated?.data])

  const handleSubmit = (value: Form) => {
    if (value.editValue === data.value) return
    const putData = { [data.key]: data.key === 'allowPromotions' ? Boolean(Number(value.editValue)) : value.editValue }

    updateProfile(putData)
  }

  const inputElement = useMemo(() => {
    if (data.key === 'allowPromotions' || data.key === 'isEmailVerified') {
      return (
        <SelectField
          className={styles.infor__item__select}
          inputClassName={styles.infor__item__select__input}
          name="editValue"
          options={promotionEmailOptions}
          defaultValue={data.value ? '1' : '0'}
          disabled={profileUpdated?.isLoading}
          showErrorMessage
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
  }, [])

  return (
    <Modal open={open} onClose={onClose} bodyClassName={styles.wrapper}>
      <h3 className={styles.title}>Change {data?.label}</h3>
      <CustomForm schema={schema} onSubmit={handleSubmit}>
        <>
          {inputElement}
          <div className={styles.buttons}>
            <div className={styles.buttons__cancel} onClick={onClose}>
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
