import { CardProduct } from '@/components/product-card'
import { ROUTER_FEATURED } from '@/constants/routes.paths'
import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { Metadata } from 'next'

async function getFeaturedProducts(): Promise<Product[] | undefined> {
  try {
    const products = await api<Product[]>(ROUTER_FEATURED, {
      next: {
        revalidate: 60 * 60, // 1 hour
      },
    })

    return products
  } catch (error) {
    console.error(error)
  }
}

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const products = await getFeaturedProducts()

  if (!products) return null

  const [highlightedProducts, ...otherProducts] = products

  return (
    <section className="grid max-h-[800px] grid-cols-9 grid-rows-6 gap-6">
      <CardProduct.Root
        href={highlightedProducts.slug}
        className="col-span-6 row-span-6"
      >
        <CardProduct.Image
          width={950}
          height={950}
          alt=""
          src={highlightedProducts.image}
        />
        <CardProduct.Content
          price={highlightedProducts.price}
          title={highlightedProducts.title}
        />
      </CardProduct.Root>

      {otherProducts.map((product) => (
        <CardProduct.Root key={product.id} href={product.slug}>
          <CardProduct.Image alt="" src={product.image} />
          <CardProduct.Content price={product.price} title={product.title} />
        </CardProduct.Root>
      ))}
    </section>
  )
}
