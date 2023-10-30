/* eslint-disable @next/next/no-img-element */
import { PATH_PRODUCT } from '@/constants/paths'
import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { env } from '@/env'
import { ImageResponse } from 'next/server'
import colors from 'tailwindcss/colors'
export const runtime = 'edge'

export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

async function getProduct(slug: string): Promise<Product | undefined> {
  try {
    const product = await api<Product>(`${PATH_PRODUCT}/${slug}`, {
      next: {
        revalidate: 60 * 60, // 1 hour
      },
    })

    return product
  } catch (error) {
    console.error(error)
  }
}

export default async function OgImage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProduct(params.slug)

  if (!product) return null

  const productImageUrl = new URL(product?.image, env.APP_URL).toString()

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc['950'],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={productImageUrl} alt="" style={{ width: '100%' }} />
      </div>
    ),
    {
      ...size,
    },
  )
}
