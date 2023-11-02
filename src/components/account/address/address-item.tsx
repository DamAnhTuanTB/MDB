import { Address } from '@/constants/addresses'
import styles from '@/styles/modules/account/address/address-item.module.scss'

type Props = {
  address: Address
}

export default function AddressItem({ address }: Props) {
  const { customerName, company, addressDetail, email, phoneNumber } = address

  return (
    <div className={styles.wrapper}>
      <p>{customerName}</p>
      <p>{company}</p>
      <p>{addressDetail}</p>
      <p>{email}</p>
      <p>{phoneNumber}</p>
    </div>
  )
}
