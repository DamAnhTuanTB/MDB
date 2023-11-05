import { useMemo } from 'react'

import styles from '@/styles/modules/account/confirm.module.scss'
import { ConfirmData } from '@/types/account/information'

import Modal from '@/components/common/modal'
import CustomForm from '@/components/form'

import Button from '../../common/button'
import TextAreaField from '../../form/textarea-field'

type Props = {
  open: boolean
  data: ConfirmData
  showCancel?: boolean
  onClose: () => void
}

export default function ModalConfirm({ open, onClose, data, showCancel = true }: Props) {
  const inputElement = useMemo(() => {
    if (data.key === 'address') {
      return <TextAreaField className={styles.field} inputClassName={styles.field__input} name="" label="" />
    }
    return null
  }, [])

  const handleSubmit = () => {
    // TODO: submit form
    onClose()
  }

  return (
    <Modal className={styles.modal} bodyClassName={styles.modal__body} open={open} onClose={onClose}>
      <h6 className={`${styles.modal__confirm__label} ${styles.modal__label}`}>Confirm {data?.label}</h6>
      <p className={styles.modal__sub__label}>Are you sure you want to use this {data?.subLabel} as your default?</p>
      <CustomForm onSubmit={handleSubmit}>
        <>
          {inputElement}
          <div className={styles.modal__confirm__buttons}>
            {showCancel && (
              <p className={styles.cancel} onClick={onClose}>
                Cancel
              </p>
            )}
            <Button type="submit" className={styles.modal__submit__button} variant="blue">
              Confirm
            </Button>
          </div>
        </>
      </CustomForm>
    </Modal>
  )
}
