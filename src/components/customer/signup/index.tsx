import styles from '@/styles/modules/customer/index.module.scss'

import CreateAccountForm from './form'

export default function SignUp() {
  return (
    <div className={styles.wrapper}>
      <CreateAccountForm />
    </div>
  )
}
