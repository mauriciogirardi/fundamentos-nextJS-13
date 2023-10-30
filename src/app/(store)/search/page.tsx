import { CardProduct } from '@/components/product-card'
import { PATH_HOME } from '@/constants/paths'
import { ROUTER_SEARCH } from '@/constants/routes.paths'
import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { redirect } from 'next/navigation'

type SearchProps = {
  searchParams: {
    q: string
  }
}

async function searchProducts(query: string): Promise<Product[] | undefined> {
  try {
    const product = await api<Product[]>(`${ROUTER_SEARCH}?q=${query}`, {
      next: {
        revalidate: 60 * 60, // 1 hour
      },
    })

    return product
  } catch (error) {
    console.error(error)
  }
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams

  if (!query) {
    redirect(PATH_HOME)
  }

  const products = await searchProducts(query)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para:
        <span className="font-semibold"> {query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products?.map((product) => (
          <CardProduct.Root
            key={product.id}
            href={product.slug}
            className="col-span-1 row-span-1"
          >
            <CardProduct.Image
              width={480}
              height={480}
              alt=""
              src={product.image}
            />
            <CardProduct.Content price={product.price} title={product.title} />
          </CardProduct.Root>
        ))}
      </div>
    </div>
  )
}
