import { ErrorMessage as CustomErrorMesasge } from '@hookform/error-message'
import { FieldValues } from 'react-hook-form'

import styles from '@/styles/modules/form.module.scss'

interface Props {
  name: string
  formState: FieldValues
}

export default function ErrorMessage({ name, formState }: Props) {
  return <CustomErrorMesasge errors={formState.errors} name={name} render={({ message }) => <p className={styles.input__error}>{message}</p>} />
}
