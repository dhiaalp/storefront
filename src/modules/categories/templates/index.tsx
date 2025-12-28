import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

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
        <RefinementList sortBy={sort} data-testid="sort-by-container" />
        <div className="w-full">
          <div className="mb-8">
            {parents.length > 0 && (
              <div
                className="mb-2 flex flex-wrap gap-2 text-xs uppercase tracking-[0.28em] text-[#6a5c3b]"
                style={{
                  fontFamily: '"Futura", "Optima", sans-serif',
                }}
              >
                {parents.map((parent) => (
                  <span key={parent.id} className="flex items-center gap-2">
                    <LocalizedClientLink
                      className="hover:text-[#1d1a16]"
                      href={`/categories/${parent.handle}`}
                      data-testid="sort-by-link"
                    >
                      {parent.name}
                    </LocalizedClientLink>
                    /
                  </span>
                ))}
              </div>
            )}
            <span
              className="text-xs uppercase tracking-[0.3em] text-[#6a5c3b]"
              style={{
                fontFamily: '"Futura", "Optima", sans-serif',
              }}
            >
              Category
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl text-[#1d1a16]" data-testid="category-page-title">
              {category.name}
            </h1>
          </div>
          {category.description && (
            <div className="mb-8 text-base text-[#4a3a2a]">
              <p>{category.description}</p>
            </div>
          )}
          {category.category_children && (
            <div className="mb-8 text-base">
              <ul className="grid grid-cols-1 gap-2">
                {category.category_children?.map((c) => (
                  <li key={c.id}>
                    <InteractiveLink href={`/categories/${c.handle}`}>
                      {c.name}
                    </InteractiveLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={category.products?.length ?? 8}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              categoryId={category.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
