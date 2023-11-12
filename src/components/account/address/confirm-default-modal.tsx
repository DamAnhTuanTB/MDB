import { useEffect } from 'react'

import { parsePhoneNumber } from 'libphonenumber-js'

import { useAccountAddress } from '@/hooks/pages/use-account-address'
import styles from '@/styles/modules/account/modal.module.scss'
import { AddressType } from '@/types/account/address'

import Modal from '@/components/common/modal'
import CustomForm from '@/components/form'

import Button from '../../common/button'

type successFunc = {
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
}
type Props = {
  open: boolean
  address?: AddressType
  onClose: () => void
  onReload: (id: string) => void
  onSuccess: (params: successFunc) => void
}

export default function ModalConfirmDefault({ open, onClose, address, onReload, onSuccess }: Props) {
  const phoneNumber = address?.phone ? parsePhoneNumber(address?.phone, 'US') : ''
  const { updateAddress, updateData } = useAccountAddress()

  useEffect(() => {
    if (updateData?.data) {
      onClose()
      onReload(updateData?.data.id)
      onSuccess({ message: 'Update address default successfully', type: 'success' })
    }
  }, [updateData?.data])

  const handleSubmit = () => {
    updateAddress({ body: { isDefault: true }, id: address?.id || '' })
  }

  return (
    <Modal className={styles.modal} bodyClassName={styles.modal__body} open={open} onClose={onClose}>
      <h4 className={styles.modal__label}>Confirm Default Address</h4>
      <p className={styles.modal__text}>Are you sure you want to use this address as your default?</p>
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
          {updateData?.error && <p className="lg:mx-[50px] text-sm text-red mt-2">{updateData?.error?.message}</p>}
          <div className={styles.modal__buttons}>
            <Button variant="none" className={styles.modal__buttons__cancel} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className={styles.modal__buttons__submit} variant="blue" isLoading={updateData?.isLoading}>
              Confirm
            </Button>
          </div>
        </>
      </CustomForm>
    </Modal>
  )
}
