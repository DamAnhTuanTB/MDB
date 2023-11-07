import { atom, useRecoilState } from 'recoil'

export type NotificationUI = {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  open: boolean
}

export const notificationUIAtom = atom<NotificationUI>({
  key: 'notificationUI',
  default: {
    message: '',
    open: false,
    type: 'success'
  }
})

export const useNotificationUI = () => {
  const [notificationUI, setNotificationUI] = useRecoilState(notificationUIAtom)

  return {
    notificationUI,
    setNotificationUI
  }
}
