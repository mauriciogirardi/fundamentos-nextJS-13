'use client'

import { useCart } from '@/context/cart-context'

type AddToCartProps = {
  productId: number
}

export function AddToCart({ productId }: AddToCartProps) {
  const { addToCart } = useCart()

  function handleAddToCart() {
    addToCart(productId)
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold hover:bg-emerald-700"
    >
      Adicionar ao carrinho
    </button>
  )
}
