import { useMemo } from 'react'

import { useSetRecoilState } from 'recoil'
import { z } from 'zod'

import { notificationState } from '@/recoil/notification'
import styles from '@/styles/modules/account/add.module.scss'
import { AddData } from '@/types/account/information'

import Modal from '@/components/common/modal'

import Button from '../common/button'
import CustomForm from '../form'

import AddNewAddressForm from './add-new-address-form'

const schema = z.object({
  country: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  company: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, { message: 'Please enter a valid mobile number' })
})

type Props = {
  open: boolean
  data: AddData
  onClose: () => void
}

export default function ModalAdd({ open, onClose, data }: Props) {
  const setNotification = useSetRecoilState(notificationState)

  const inputElement = useMemo(() => {
    if (data.key === 'address') {
      return <AddNewAddressForm />
    }
    return null
  }, [])

  const handleSubmit = () => {
    // TODO: submit form
    setNotification({ message: 'Saved Address', type: 'success' })
    onClose()
  }

  return (
    <Modal className={styles.modal} bodyClassName={styles.modal__body} open={open} onClose={onClose}>
      <h6 className={`${styles.modal__add__label} ${styles.modal__label}`}>Add New {data?.label}</h6>
      <CustomForm schema={schema} onSubmit={handleSubmit}>
        <>
          <div className={styles.modal__content}>{inputElement}</div>
          <div className={styles.modal__add__buttons}>
            <p className={styles.cancel} onClick={onClose}>
              Cancel
            </p>
            <Button type="submit" className={styles.modal__submit__button} variant="blue">
              Save
            </Button>
          </div>
        </>
      </CustomForm>
    </Modal>
  )
}
