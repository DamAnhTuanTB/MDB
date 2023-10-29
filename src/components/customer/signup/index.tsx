import styles from '@/styles/modules/customer/index.module.scss'

import SignUpForm from './form'

export default function SignUp() {
  return (
    <div className={styles.wrapper}>
      <SignUpForm />
    </div>
  )
}
