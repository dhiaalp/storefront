import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: '"Cormorant Garamond", "Garamond", "Palatino Linotype", serif',
        background:
          "radial-gradient(circle at 12% 10%, rgba(202, 164, 88, 0.14), transparent 45%), radial-gradient(circle at 80% 0%, rgba(107, 90, 52, 0.14), transparent 40%), linear-gradient(160deg, #fdf9f1 0%, #f0e6d6 55%, #efe3cf 100%)",
      }}
      data-testid="category-container"
    >
      <div className="content-container flex flex-col gap-10 small:flex-row small:items-start py-10">
        <RefinementList sortBy={sort} />
        <div className="w-full">
          <div className="mb-8">
            <span
              className="text-xs uppercase tracking-[0.3em] text-[#6a5c3b]"
              style={{
                fontFamily: '"Futura", "Optima", sans-serif',
              }}
            >
              The ArtX Store
            </span>
            <h1
              className="mt-2 text-3xl sm:text-4xl text-[#1d1a16]"
              data-testid="store-page-title"
            >
              All products
            </h1>
          </div>
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
