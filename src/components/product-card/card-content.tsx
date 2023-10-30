import { formattedCurrency } from '@/utils/formattedCurrency'

type CardContentProps = {
  price: number
  title: string
}

export function CardContent({ price, title }: CardContentProps) {
  return (
    <div className="absolute bottom-12 right-12 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
      <span className="text-sm truncate">{title}</span>
      <span className="flex h-full items-center justify-center rounded-full px-4 bg-violet-500 font-semibold">
        {formattedCurrency(price)}
      </span>
    </div>
  )
}
