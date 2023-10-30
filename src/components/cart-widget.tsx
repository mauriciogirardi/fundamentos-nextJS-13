'use client'

import { useCart } from '@/context/cart-context'
import { ShoppingBag } from 'lucide-react'

export function CartWidget() {
  const { items } = useCart()

  const itemsCart = items.length === 9 ? '+9' : items.length

  return (
    <div className="flex items-center gap-2 relative">
      <ShoppingBag className="h-6 w-6" />
      <span className="absolute -left-3 -top-3 bg-zinc-600 w-6 h-6 flex items-center justify-center rounded-full text-sm  text-white font-bold">
        {itemsCart}
      </span>
    </div>
  )
}
