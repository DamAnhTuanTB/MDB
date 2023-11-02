import { useMemo } from 'react'

import styles from '@/styles/modules/account/confirm.module.scss'

import Modal from '@/components/common/modal'
import CustomForm from '@/components/form'

import Button from '../common/button'
// import CreditCardItem from '../common/credit-card-item'
import TextAreaField from '../form/textarea-field'

type ConfirmData = any

type PersonalInfoModalProps = {
  open: boolean
  onClose: () => void
  data: ConfirmData
  showCancel?: boolean
}

export default function ModalConfirm({ open, onClose, data, showCancel = true }: PersonalInfoModalProps) {
  const inputElement = useMemo(() => {
    if (data.key === 'address') {
      return <TextAreaField className={styles.field} inputClassName={styles.field__input} name="" label="" />
    }
    return null
    // <CreditCardItem className={styles.modal__card} creditCard={data?.creditCard} />
  }, [])

  return (
    <Modal className={styles.modal} bodyClassName={styles.modal__body} open={open} onClose={onClose}>
      <h6 className={`${styles.modal__confirm__label} ${styles.modal__label}`}>Confirm {data?.label}</h6>
      <p className={styles.modal__sub__label}>Are you sure you want to use this {data?.subLabel} as your default?</p>
      <CustomForm onSubmit={() => {}}>
        <>
          {inputElement}
          <div className={styles.modal__confirm__buttons}>
            {showCancel && (
              <p className={styles.cancel} onClick={onClose}>
                Cancel
              </p>
            )}
            <Button className={styles.modal__submit__button} variant="blue">
              Confirm
            </Button>
          </div>
        </>
      </CustomForm>
    </Modal>
  )
}
