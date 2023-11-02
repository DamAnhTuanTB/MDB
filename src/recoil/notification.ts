import { atom } from 'recoil'

interface NotificationState {
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
}

export const notificationState = atom<NotificationState | null>({
  key: 'notificationState',
  default: null
})
