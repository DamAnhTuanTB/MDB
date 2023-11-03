import { useMemo, useState } from 'react'

import styles from '@/styles/modules/account/address-list.module.scss'
import { AddressBody } from '@/types/address'

import RadioItem from '@/components/common/radio-item'

import ModalAdd from './add'
import ModalConfirm from './confirm'

const confirm = {
  data: {
    id: 'af61d37d-b853-41f6-9240-da9a09920e9e',
    key: 'address',
    label: 'Default Address',
    subLabel: 'address',
    value: ''
  }
}

type Props = {
  addresses: AddressBody[]
}

export default function AddressList({ addresses }: Props) {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null)
  const [openModalAdd, setOpenModalAdd] = useState<boolean>(false)
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false)

  const handleEditAddress = () => {}

  const handleRemoveAddress = () => {}

  const addressElements = useMemo(
    () =>
      addresses &&
      addresses.map((address, index) => {
        const isSelected = index === selectedAddressIndex
        return (
          <RadioItem
            className={styles.radio}
            iconCheckClassname={styles.radio__icon}
            title="Default Address"
            isSelected={isSelected}
            key={index}
            onSelect={() => setSelectedAddressIndex(index)}
            onEdit={handleEditAddress}
            onRemove={handleRemoveAddress}
          >
            <div className={styles.wrapper__address__item}>
              <p>
                {address.firstName} {address.lastName}
              </p>
              <p>{address.company}</p>
              <p>{address.address}</p>
              <p>{address.email}</p>
              <p>{address.phoneNumber}</p>
            </div>
          </RadioItem>
        )
      }),
    [addresses, selectedAddressIndex]
  )
  return (
    <div className={styles.wrapper}>
      <button onClick={() => setOpenModalAdd(true)} className={styles.float__btn}>
        Add Address
      </button>
      {addressElements}
      <div className={styles.buttons}>
        <button onClick={() => setOpenModalConfirm(true)} className={styles.buttons__default}>
          Set As Default
        </button>
        <button onClick={() => setOpenModalAdd(true)} className={styles.buttons__add__address}>
          Add Address
        </button>
      </div>
      <ModalAdd open={openModalAdd} onClose={() => setOpenModalAdd(false)} data={confirm?.data} />
      <ModalConfirm open={openModalConfirm} onClose={() => setOpenModalConfirm(false)} data={confirm?.data} />
    </div>
  )
}
