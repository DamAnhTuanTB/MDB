import { useMemo } from 'react'

import styles from '@/styles/modules/account/add.module.scss'
import { AddData } from '@/types/account/information'

import Modal from '@/components/common/modal'

import Button from '../common/button'
import CustomForm from '../form'

import AddNewAddressForm from './add-new-address-form'

// import AddNewCardForm from './payment-method/add-new-card-form'

type Props = {
  open: boolean
  data: AddData
  onClose: () => void
}

export default function ModalAdd({ open, onClose, data }: Props) {
  const inputElement = useMemo(() => {
    if (data.key === 'address') {
      return <AddNewAddressForm />
    }
    return null
  }, [])

  const handleSubmit = () => {
    // TODO: submit form
  }

  return (
    <Modal className={styles.modal} bodyClassName={styles.modal__body} open={open} onClose={onClose}>
      <h6 className={`${styles.modal__add__label} ${styles.modal__label}`}>Add New {data?.label}</h6>
      <CustomForm onSubmit={handleSubmit}>
        <>
          <div className={styles.modal__content}>{inputElement}</div>
          <div className={styles.modal__add__buttons}>
            <p className={styles.cancel} onClick={onClose}>
              Cancel
            </p>
            <Button className={styles.modal__submit__button} variant="blue">
              Save
            </Button>
          </div>
        </>
      </CustomForm>
    </Modal>
  )
}
