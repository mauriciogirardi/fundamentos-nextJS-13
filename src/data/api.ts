/* eslint-disable no-useless-catch */

import { env } from '@/env'

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  try {
    const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
    const apiPrefix = '/api'
    const url = new URL(apiPrefix.concat(path), baseUrl)

    return fetch(url, init).then((response) => {
      if (!response.ok) throw new Error('Network response was not ok')

      return response.json() as Promise<T>
    })
  } catch (error) {
    throw error
  }
}
