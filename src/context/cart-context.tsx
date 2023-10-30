'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

type CartProviderProps = {
  children: ReactNode
}

type CartItem = {
  productId: number
  quantity: number
}

type CartContextProps = {
  items: CartItem[]
  addToCart: (productId: number) => void
}

const CartContext = createContext({} as CartContextProps)

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(productId: number) {
    setCartItems((prevState) => {
      const productIndex = prevState.findIndex(
        (item) => item.productId === productId,
      )

      if (productIndex !== -1) {
        const updatedCartItems = [...prevState]
        updatedCartItems[productIndex].quantity += 1
        return updatedCartItems
      }

      return [...prevState, { productId, quantity: 1 }]
    })
  }

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  return context
}
