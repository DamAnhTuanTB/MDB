import { useEffect } from 'react'

import { parsePhoneNumber } from 'libphonenumber-js'

import { useAccountAddress } from '@/hooks/pages/use-account-address'
import styles from '@/styles/modules/account/modal.module.scss'
import { AddressType } from '@/types/account/address'

import Modal from '@/components/common/modal'
import CustomForm from '@/components/form'

import Button from '../../common/button'

type Props = {
  open: boolean
  address?: AddressType
  onClose: () => void
}

export default function ModalConfirmDelete({ open, onClose, address }: Props) {
  const phoneNumber = address?.phone ? parsePhoneNumber(address?.phone) : ''
  const { deleteAddress, deleteData } = useAccountAddress()

  useEffect(() => {
    if (deleteData?.data) onClose()
  }, [deleteData?.data])

  const handleSubmit = () => {
    deleteAddress({ id: address?.id || '' })
  }

  return (
    <Modal className={styles.modal} bodyClassName={styles.modal__body} open={open} onClose={onClose}>
      <h4 className={styles.modal__label}>Confirm Delete Address</h4>
      <p className={styles.modal__text}>Are you sure you want to delete this address?</p>
      <CustomForm onSubmit={handleSubmit}>
        <>
          <div className={styles.modal__textarea}>
            <p>
              {address?.firstName} {address?.lastName}
            </p>
            <p>{address?.company}</p>
            <p>{address?.address}</p>
            <p>
              {address?.city}, {address?.country}
            </p>
            <p>{phoneNumber && phoneNumber.formatNational()}</p>
          </div>
          <div className={styles.modal__buttons}>
            <Button variant="none" className={styles.modal__buttons__cancel} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className={styles.modal__buttons__submit} variant="blue" isLoading={deleteData?.isLoading}>
              Confirm
            </Button>
          </div>
        </>
      </CustomForm>
    </Modal>
  )
}
