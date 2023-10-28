import styles from '@/styles/modules/customer/signup/index.module.scss'

import CreateAccountForm from './form'

export default function CreateAccount() {
  return (
    <div className={styles.wrapper}>
      <CreateAccountForm />
    </div>
  )
}
