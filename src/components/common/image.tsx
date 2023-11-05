import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import Image from 'next/image'

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  className?: string
  src: string
  width?: number
  height?: number
  srcDefault?: string
  alt?: string
}

export default function ImageComponent(props: Props) {
  const { className, width, height, srcDefault = '/images/img-def.png', alt } = props
  let { src } = props
  if (!src) src = require(srcDefault)
  return <Image className={className} width={width} height={height} src={src} alt={alt || ''} onError={(e) => (e.currentTarget.src = '/images/image-error.png')} />
}
