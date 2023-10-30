import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { useEffect, useState } from 'react'

export async function useFeaturedProducts() {
  const [isLoadingFeatured, setIsLadingFeatured] = useState(false)
  const [isErrorFeatured, setErrorLadingFeatured] = useState<Error | null>(null)

  async function getFeaturedProducts() {
    try {
      setIsLadingFeatured(true)
      const products = await api<Product[]>('/products/featured')

      return products
    } catch (error) {
      if (error instanceof Error) {
        setErrorLadingFeatured(error)
      }
      console.error(error)
    } finally {
      setIsLadingFeatured(false)
    }
  }

  useEffect(() => {
    getFeaturedProducts()
  }, [])

  return {
    getFeaturedProducts,
    isLoadingFeatured,
    isErrorFeatured,
  }
}
