import React, { useCallback, useEffect, useRef, useState } from 'react'

import classNames from 'classnames'

import useDevice from '@/hooks/use-device'
import styles from '@/styles/modules/popover.module.scss'

type Anchor = {
  vertical?: 'top' | 'center' | 'bottom'
  horizontal?: 'left' | 'center' | 'right'
}

type Props = {
  anchor: React.ReactNode
  children: React.ReactNode
  className?: string
  anchorEl?: Anchor
  anchorPosition?: Anchor
  onOpen?: () => void
  onClose?: () => void
}

export default function Popover(props: Props) {
  const { children, className, onClose = () => {}, onOpen = () => {}, anchor, anchorEl = {}, anchorPosition = {} } = props || {}

  const [open, setOpen] = useState<boolean>(false)

  const popover = useRef<HTMLDivElement>(null)
  const openRef = useRef<boolean>(open)
  const timeoutRef = useRef<number | null>(null)
  const { isPc } = useDevice()
  const { vertical: elVertical = 'top', horizontal: elHorizontal = 'center' }: Anchor = anchorEl
  const { vertical: posVertical = 'top', horizontal: posHorizontal = 'center' }: Anchor = anchorPosition

  // useImperativeHandle(ref, () => ({
  //   close: setOpen(false)
  // }))

  useEffect(() => {
    const detectClickOutsite = (event: Event) => {
      if (openRef.current && popover.current && !popover.current?.contains(event.target as Node)) {
        togglePopover()
      }
    }

    // listener click outsite popover
    window.addEventListener('mousedown', detectClickOutsite)
    return () => {
      window.removeEventListener('mousedown', detectClickOutsite)
    }
  }, [])

  useEffect(() => {
    openRef.current = open
    if (open) onOpen()
    else onClose()
  }, [open])

  const renderAnchor = () => {
    if (React.isValidElement(anchor)) return React.cloneElement(anchor)
    else return <span>Click to open Popover</span>
  }

  /** Func on/off popover */
  const togglePopover = useCallback(() => {
    if (!isPc) {
      setOpen(!openRef.current)
    }
  }, [openRef.current])

  const handleMouseEnter = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setOpen(true)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(() => {
      setOpen(false)
    }, 150)
  }

  return (
    <div ref={popover} className={classNames('relative', className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div onClick={togglePopover} className={'cursor-pointer'}>
        {renderAnchor()}
      </div>
      {open && (
        <div
          className={classNames(
            styles.wrapper,
            styles[`wrapper__el__${elVertical}`],
            styles[`wrapper__el__${elHorizontal}`],
            styles[`wrapper__pos__${posVertical}`],
            styles[`wrapper__pos__${posHorizontal}`],
            {
              [styles.active]: open
            }
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}
