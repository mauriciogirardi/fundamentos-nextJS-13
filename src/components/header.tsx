import { Suspense } from 'react'
import { Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { SearchForm } from './search-form'
import { CartWidget } from './cart-widget'
import { PATH_HOME } from '@/constants/paths'

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link href={PATH_HOME} className="text-2xl font-extrabold text-white">
          devstore
        </Link>

        <Suspense fallback={null}>
          <SearchForm />
        </Suspense>
      </div>

      <div className="flex items-center gap-4">
        <CartWidget />
        <div className="w-px h-6 bg-zinc-700" />

        <Link
          href={PATH_HOME}
          className="flex items-center gap-2 hover:underline"
        >
          <div className="relative">
            <Image
              src="https://github.com/mauriciogirardi.png"
              alt=""
              className="rounded-full w-11 h-11"
              width={44}
              height={44}
            />

            <Settings className="w-4 h-4 text-white absolute right-0 -bottom-1" />
          </div>
        </Link>
      </div>
    </header>
  )
}
