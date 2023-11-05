import { useEffect, useMemo, useState } from 'react'

import { parsePhoneNumber } from 'libphonenumber-js'

import styles from '@/styles/modules/account/address-list.module.scss'
import { AddressType } from '@/types/account/address'

import Button from '@/components/common/button'
import RadioItem from '@/components/common/radio-item'

import AddressModal from './add'
import ModalConfirm from './confirm'

type Props = {
  addresses: AddressType[]
}

export default function AddressList({ addresses }: Props) {
  const [activeId, setActiveId] = useState<string | undefined>(addresses.find((item) => item.isDefault)?.id)
  const [selectedAddress, setselectedAddress] = useState<AddressType>()

  const [openModalAdd, setOpenModalAdd] = useState<boolean>(false)
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false)

  useEffect(() => {
    if (activeId) {
      const address = addresses.find((item) => item.id === activeId)
      setselectedAddress(address)
    }
  }, [activeId])

  const handleEditAddress = () => {}

  const handleRemoveAddress = () => {}

  const addressElements = useMemo(
    () =>
      addresses &&
      addresses.map((address, index) => {
        const phoneNumber = address.phone ? parsePhoneNumber(address.phone) : ''

        return (
          <RadioItem
            key={index}
            className={styles.radio}
            iconCheckClassname={styles.radio__icon}
            title="Default Address"
            isSelected={activeId === address.id}
            onSelect={() => setActiveId(address.id)}
            onEdit={handleEditAddress}
            onRemove={handleRemoveAddress}
          >
            <div className={styles.wrapper__address__item}>
              <p>
                {address.firstName} {address.lastName}
              </p>
              <p>{address.company}</p>
              <p>{address.address}</p>
              <p>
                {address.city}, {address.country}
              </p>
              <p>{phoneNumber && phoneNumber.formatNational()}</p>
            </div>
          </RadioItem>
        )
      }),
    [activeId, addresses]
  )

  return (
    <div className={styles.wrapper}>
      <Button onClick={() => setOpenModalAdd(true)} className={styles.float__btn}>
        Add Address
      </Button>
      {addressElements}
      <div className={styles.buttons}>
        <Button onClick={() => setOpenModalConfirm(true)} className={styles.buttons__default} disabled={!activeId}>
          Set As Default
        </Button>
        <Button onClick={() => setOpenModalAdd(true)} className={styles.buttons__add__address}>
          Add Address
        </Button>
      </div>
      <AddressModal open={openModalAdd} onClose={() => setOpenModalAdd(false)} />
      <ModalConfirm
        open={openModalConfirm}
        onClose={() => {
          setOpenModalConfirm(false)
          setActiveId(selectedAddress?.id)
        }}
        address={selectedAddress}
      />
    </div>
  )
}
