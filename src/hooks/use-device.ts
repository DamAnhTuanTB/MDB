import { useEffect, useState } from 'react'

import configs from '@/configs'
import { debounce } from '@/utils/helper'

export default function useDevice() {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isPc, setIsPc] = useState<boolean>(true)

  useEffect(() => {
    const handleResize = debounce(() => {
      const { sp, tablet } = configs.breakpoints
      if (window.innerWidth <= tablet && window.innerWidth > sp) {
        setIsTablet(true)
        setIsPc(false)
        setIsMobile(false)
      } else if (window.innerWidth <= sp) {
        setIsTablet(false)
        setIsPc(false)
        setIsMobile(true)
      } else {
        setIsTablet(false)
        setIsMobile(false)
        setIsPc(true)
      }
    }, 50)

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    isMobile,
    isTablet,
    isPc
  }
}
