import Image from 'next/image'
import { Metadata } from 'next'

import { ButtonSize } from '@/components/button-size'
import { PATH_PRODUCT } from '@/constants/paths'
import { Product as ProductType } from '@/data/types/product'
import { api } from '@/data/api'
import {
  formattedCurrency,
  formattedCurrencyWithDeviser,
} from '@/utils/formattedCurrency'
import { ROUTER_FEATURED } from '@/constants/routes.paths'
import { AddToCart } from '@/components/add-to-cart'

type ProductProps = {
  params: {
    slug: string
  }
}

async function getProduct(slug: string): Promise<ProductType | undefined> {
  try {
    const product = await api<ProductType>(`${PATH_PRODUCT}/${slug}`, {
      next: {
        revalidate: 60 * 60, // 1 hour
      },
    })

    return product
  } catch (error) {
    console.error(error)
  }
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.slug)

  return {
    title: product?.title,
  }
}

export async function generateStaticParams() {
  const products = await api<ProductType[]>(ROUTER_FEATURED)

  return products.map((product) => ({ slug: product.slug }))
}

export default async function ProductPage({ params }: ProductProps) {
  const product = await getProduct(params.slug)

  if (!product) return null

  return (
    <div className="relative grid max-h-[800px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image}
          alt=""
          width={850}
          height={850}
          quality={100}
        />
      </div>

      <div className="flex flex-col px-12 justify-center">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="rounded-full bg-violet-500 inline-block px-5 py-2.5 font-semibold">
            {formattedCurrency(product.price)}
          </span>
          <span className="text-sm text-zinc-400">
            Em 12x s/ juros de {formattedCurrencyWithDeviser(product.price, 12)}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>
          <div className="flex gap-2">
            <ButtonSize>P</ButtonSize>
            <ButtonSize>M</ButtonSize>
            <ButtonSize>L</ButtonSize>
            <ButtonSize>G</ButtonSize>
            <ButtonSize>GG</ButtonSize>
          </div>
        </div>

        <AddToCart productId={product.id} />
      </div>
    </div>
  )
}
