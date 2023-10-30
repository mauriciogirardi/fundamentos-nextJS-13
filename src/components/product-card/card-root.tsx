import { PATH_PRODUCT_SLUG } from '@/constants/paths'
import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type CardRootProps = {
  children: ReactNode
  className?: string
  href: string
} & LinkProps

export function CardRoot({
  children,
  className,
  href,
  ...rest
}: CardRootProps) {
  return (
    <Link
      href={PATH_PRODUCT_SLUG.replace('{slug}', href)}
      className={twMerge(
        'group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex items-start justify-center',
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}
