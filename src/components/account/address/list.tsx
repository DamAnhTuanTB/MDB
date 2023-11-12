import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { parsePhoneNumber } from 'libphonenumber-js'

import { useAccountAddress } from '@/hooks/pages/use-account-address'
import styles from '@/styles/modules/account/address-list.module.scss'
import { AddressType } from '@/types/account/address'

import Button from '@/components/common/button'
import RadioItem from '@/components/common/radio-item'

import AddressModal from './add-modal'
import ModalConfirmDefault from './confirm-default-modal'
import ModalConfirmDelete from './confirm-delete-modal'
import Notification from '@/components/common/notification'
import { useRecoilState } from 'recoil'
import { notificationState } from '@/recoil/notification'

type Props = {
  addresses: AddressType[]
  onReloadList: () => void
}

export default function AddressList({ addresses, onReloadList }: Props) {
  const defaultAddress = useMemo(() => addresses.find((item) => item.isDefault), [addresses])
  const [activeId, setActiveId] = useState<string | undefined>(defaultAddress?.id)
  const [selectedAddress, setselectedAddress] = useState<AddressType | null>()
  const [selectedRemoveAddress, setselectedRemoveAddress] = useState<AddressType>()
  const [notificattion, setMessSuccess] = useRecoilState(notificationState)

  const [openModalAdd, setOpenModalAdd] = useState<boolean>(false)
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [openModalEdit, setOpenModalEdit] = useState<AddressType | null>(null)

  const { updateData } = useAccountAddress()

  useEffect(() => {
    if (updateData?.data?.id) {
      // setActiveId(updateData?.data?.id)
    }
  }, [updateData])

  const _onRemove = (address: AddressType) => {
    setselectedRemoveAddress(address)
    setOpenModalDelete(true)
  }

  const _onEdit = (address: AddressType | null) => {
    setOpenModalEdit(address)
  }

  const _onAdd = useCallback(() => {
    setOpenModalAdd(!openModalAdd)
  }, [openModalAdd])

  const addressElements = useMemo(
    () =>
      addresses?.map((address, index) => {
        const phoneNumber = address.phone ? parsePhoneNumber(address.phone, 'US') : ''

        return (
          <RadioItem
            key={index}
            className={styles.radio}
            iconCheckClassname={styles.radio__icon}
            title="Default Address"
            isSelected={activeId === address.id}
            onSelect={() => {
              setActiveId(address.id)
              setselectedAddress(address)
            }}
            onEdit={() => _onEdit(address)}
            onRemove={() => _onRemove(address)}
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
              <p>{phoneNumber && phoneNumber?.number}</p>
            </div>
          </RadioItem>
        )
      }),
    [activeId, addresses]
  )

  return (
    <div className={styles.wrapper}>
      <Button onClick={_onAdd} className={styles.float__btn}>
        Add Address
      </Button>
      {addressElements}
      <div className={styles.buttons}>
        <Button
          onClick={() => {
            setOpenModalConfirm(true)
          }}
          className={styles.buttons__default}
          disabled={!activeId || activeId === defaultAddress?.id}
        >
          Set As Default
        </Button>
        <Button onClick={_onAdd} className={styles.buttons__add__address}>
          Add Address
        </Button>
      </div>
      {(openModalAdd || !!openModalEdit) && (
        <AddressModal
          open={openModalAdd || !!openModalEdit}
          address={openModalEdit || null}
          onClose={() => {
            if (openModalEdit) _onEdit(null)
            else if (openModalAdd) _onAdd()
          }}
          onSuccess={setMessSuccess}
          onReload={onReloadList}
        />
      )}
      {!!openModalConfirm && selectedAddress && (
        <ModalConfirmDefault
          open={!!openModalConfirm}
          onClose={() => {
            setselectedAddress(null)
            setOpenModalConfirm(false)
          }}
          onReload={(id) => {
            setActiveId(id)
          }}
          onSuccess={setMessSuccess}
          address={selectedAddress}
        />
      )}
      {openModalDelete && (
        <ModalConfirmDelete
          open={openModalDelete}
          onClose={() => {
            setOpenModalDelete(false)
          }}
          onReloadList={onReloadList}
          address={selectedRemoveAddress}
          onSuccess={setMessSuccess}
        />
      )}
      {!notificattion && <Notification message={''} type={'success'} />}
    </div>
  )
}
