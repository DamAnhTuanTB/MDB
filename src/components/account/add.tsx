import { useMemo } from 'react'

import classNames from 'classnames'

import styles from '@/styles/modules/account/add.module.scss'

import Modal from '@/components/common/modal'

import Button from '../common/button'
import CustomForm from '../form'

import AddNewAddressForm from './address/add-new-address-form'

// import AddNewCardForm from './payment-method/add-new-card-form'

type AddData = any

type PersonalInfoModalProps = {
  open: boolean
  className?: string
  contentClassName?: string
  submitButtonClassName?: string
  onClose: () => void
  data: AddData
}

export default function ModalAdd({ open, onClose, className, contentClassName, submitButtonClassName, data }: PersonalInfoModalProps) {
  const inputElement = useMemo(() => {
    if (data.key === 'address') {
      return <AddNewAddressForm />
    }
    return null
  }, [])

  return (
    <Modal className={styles.modal} bodyClassName={styles.modal__body} open={open} onClose={onClose}>
      <h6 className={`${styles.modal__add__label} ${styles.modal__label}`}>Add New {data?.label}</h6>
      <CustomForm onSubmit={() => {}}>
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
