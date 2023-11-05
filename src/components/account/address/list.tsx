import { useEffect, useMemo, useState } from 'react'

import { parsePhoneNumber } from 'libphonenumber-js'

import { useAccountAddress } from '@/hooks/pages/use-account-address'
import styles from '@/styles/modules/account/address-list.module.scss'
import { AddressType } from '@/types/account/address'

import Button from '@/components/common/button'
import RadioItem from '@/components/common/radio-item'

import AddressModal from './add-modal'
import ModalConfirmDefault from './confirm-default-modal'
import ModalConfirmDelete from './confirm-delete-modal'

type Props = {
  addresses: AddressType[]
  onReloadList: () => void
}

export default function AddressList({ addresses, onReloadList }: Props) {
  const defaultAddress = useMemo(() => addresses.find((item) => item.isDefault), [addresses])
  const [activeId, setActiveId] = useState<string | undefined>(defaultAddress?.id)
  const [selectedAddress, setselectedAddress] = useState<AddressType>()
  const [selectedRemoveAddress, setselectedRemoveAddress] = useState<AddressType>()

  const [openModalAdd, setOpenModalAdd] = useState<boolean>(false)
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  const { getAdressList } = useAccountAddress()

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
            onRemove={() => {
              setselectedRemoveAddress(address)
              setOpenModalDelete(true)
            }}
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
        <Button onClick={() => setOpenModalConfirm(true)} className={styles.buttons__default} disabled={!activeId || activeId === defaultAddress?.id}>
          Set As Default
        </Button>
        <Button onClick={() => setOpenModalAdd(true)} className={styles.buttons__add__address}>
          Add Address
        </Button>
      </div>
      <AddressModal open={openModalAdd} onClose={() => setOpenModalAdd(false)} />
      <ModalConfirmDefault
        open={openModalConfirm}
        onClose={() => {
          setOpenModalConfirm(false)
          onReloadList()
          setActiveId(selectedAddress?.id)
        }}
        address={selectedAddress}
      />
      <ModalConfirmDelete
        open={openModalDelete}
        onClose={() => {
          setOpenModalDelete(false)
          onReloadList()
        }}
        address={selectedRemoveAddress}
      />
    </div>
  )
}
