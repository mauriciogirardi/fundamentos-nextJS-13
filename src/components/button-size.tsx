import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonSizeProps = {
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export function ButtonSize({ children, ...rest }: ButtonSizeProps) {
  return (
    <button
      type="button"
      className={twMerge(
        'flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold hover:bg-zinc-700',
        rest.className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
