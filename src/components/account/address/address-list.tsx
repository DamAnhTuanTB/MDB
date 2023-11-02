import { useMemo, useState } from 'react'

import { useSetRecoilState } from 'recoil'

import { Address } from '@/constants/addresses'
import { notificationState } from '@/recoil/notification'
import styles from '@/styles/modules/account/address/address-list.module.scss'

import AddressItem from '@/components/account/address/address-item'
import RadioItem from '@/components/common/radio-item'

import ModalAdd from '../add'
import ModalConfirm from '../confirm'

const confirm = {
  data: {
    id: 'af61d37d-b853-41f6-9240-da9a09920e9e',
    key: 'address',
    label: 'Default Address',
    subLabel: 'address'
  }
}

type Props = {
  addresses: Address[]
}

export default function AddressList({ addresses }: Props) {
  const setNotification = useSetRecoilState(notificationState)

  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null)
  const [openModalAdd, setOpenModalAdd] = useState<boolean>(false)
  const [openModalConfirm, setOpenModaslConfirm] = useState<boolean>(false)

  const handleSelectAddress = (index: number) => {
    setSelectedAddressIndex(index)
  }

  const handleSubmitForm = () => {
    setNotification({ message: 'Saved Address', type: 'success' })
    setOpenModalAdd(false)
  }

  const handleEditAddress = () => {}

  const handleRemoveAddress = () => {}

  const handleOpenModalAdd = () => {
    setOpenModalAdd(true)
  }

  const handleOpenModalConfirm = () => {
    setOpenModaslConfirm(true)
  }

  const handleCloseModalAdd = () => {
    setOpenModalAdd(false)
  }

  const handleCloseModalConfirm = () => {
    setOpenModaslConfirm(false)
  }

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
            onSelect={() => handleSelectAddress(index)}
            onEdit={handleEditAddress}
            onRemove={handleRemoveAddress}
          >
            <AddressItem address={address} />
          </RadioItem>
        )
      }),
    [addresses, selectedAddressIndex]
  )
  return (
    <div className={styles.wrapper}>
      <button onClick={handleOpenModalAdd} className={styles.float__btn}>
        Add Address
      </button>
      {addressElements}
      <div className={styles.buttons}>
        <button onClick={handleOpenModalConfirm} className={styles.buttons__default}>
          Set As Default
        </button>
        <button onClick={handleOpenModalAdd} className={styles.buttons__add__address}>
          Add Address
        </button>
      </div>
      <ModalAdd className={styles.add__modal} contentClassName={styles.add__modal__content} open={openModalAdd} onClose={handleCloseModalAdd} data={confirm?.data} />
      <ModalConfirm open={openModalConfirm} onClose={handleCloseModalConfirm} data={confirm?.data} />
    </div>
  )
}
