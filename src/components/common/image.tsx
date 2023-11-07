import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import Image from 'next/image'

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  className?: string
  src: string | undefined | null
  width?: number | `${number}` | undefined
  height?: number | `${number}` | undefined
  srcDefault?: string
  alt?: string
  onClick?: () => void
}

export default function ImageComponent(props: Props) {
  const { className, width, height, srcDefault = '/images/img-def.png', alt, onClick } = props
  let { src } = props
  if (!src) src = srcDefault
  return (
    <Image
      className={`${className} object-contain`}
      style={{
        width: width || 'auto',
        height: height || 'auto',
        maxWidth: width,
        maxHeight: height
      }}
      width={0}
      height={0}
      sizes="100vw"
      src={src}
      alt={alt || ''}
      onClick={onClick}
      onError={(e) => (e.currentTarget.src = '/images/image-error.png')}
    />
  )
}
