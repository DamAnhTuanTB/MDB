import { useRef } from 'react'

export default function useBlockScroll(block: boolean = false) {
  const pageScrollY = useRef(0)

  const blockScroll = (scrollY: number) => {
    pageScrollY.current = scrollY

    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.style.height = `${window.innerHeight}px`
    document.body.style.overflow = 'hidden'
  }

  const enableScroll = () => {
    document.body.style.removeProperty('position')
    document.body.style.removeProperty('top')
    document.body.style.removeProperty('width')
    document.body.style.removeProperty('height')
    document.body.style.removeProperty('overflow')

    window.scrollTo(0, pageScrollY.current)
  }

  return {
    blockScroll,
    enableScroll
  }
}
