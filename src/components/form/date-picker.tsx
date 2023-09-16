import { useRef } from 'react'

import TextInput from './text-input'

import styles from '@/styles/modules/form-input.module.scss'

type Props = {
  name: string
  placeholder?: string
}
export default function DatePicker({ name, placeholder }: Props) {
  const inputRef = useRef<HTMLElement>(null)

  return (
    <div className={styles.datePicker}>
      <TextInput type="date" inputRef={inputRef} sizes="small" name={name} />
      {/* <span>{placeholder}</span> */}
    </div>
  )
}
