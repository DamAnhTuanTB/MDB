import styles from '@/styles/modules/customer/index.module.scss'

import LoginForm from './form'

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <LoginForm />
    </div>
  )
}
