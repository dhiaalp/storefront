"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ sortBy, 'data-testid': dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="flex small:flex-col gap-6 py-4 mb-8 small:px-0 small:min-w-[250px]">
      <div className="highlight-stroke rounded-3xl bg-white/60 backdrop-blur-md p-6">
        <span
          className="text-[11px] uppercase tracking-[0.3em] text-[#6a5c3b]"
          style={{
            fontFamily: '"Futura", "Optima", sans-serif',
          }}
        >
          Sort
        </span>
        <div className="mt-4">
          <SortProducts
            sortBy={sortBy}
            setQueryParams={setQueryParams}
            data-testid={dataTestId}
          />
        </div>
      </div>
    </div>
  )
}

export default RefinementList
