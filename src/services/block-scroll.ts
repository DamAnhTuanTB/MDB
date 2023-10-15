let pageScrollY = 0

export const blockScroll = (scrollY: number) => {
  pageScrollY = scrollY

  document.body.style.position = 'fixed'
  document.body.style.top = `-${scrollY}px`
  document.body.style.width = '100%'
  document.body.style.overflow = 'hidden'
}

export const enableScroll = () => {
  document.body.style.removeProperty('position')
  document.body.style.removeProperty('top')
  document.body.style.removeProperty('width')
  document.body.style.removeProperty('overflow')

  window.scrollTo(0, pageScrollY)
}
