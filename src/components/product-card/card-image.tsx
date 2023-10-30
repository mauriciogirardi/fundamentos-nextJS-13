import Image, { ImageProps } from 'next/image'

type CardImageProps = {
  width?: number
  height?: number
  alt?: string
  src: string
} & ImageProps

export function CardImage({
  height = 430,
  width = 430,
  alt = '',
  src,
  ...rest
}: CardImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={100}
      className="group-hover:scale-105 transition-transform duration-500"
      {...rest}
    />
  )
}
