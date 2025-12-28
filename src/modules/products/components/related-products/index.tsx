import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import Product from "../product-preview"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // edit this function to define your related products logic
  const queryParams: HttpTypes.StoreProductListParams = {}
  if (region?.id) {
    queryParams.region_id = region.id
  }
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }
  if (product.tags) {
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[]
  }
  queryParams.is_giftcard = false

  const products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  if (!products.length) {
    return null
  }

  return (
    <div
      className="content-container mt-10 mb-16 product-page-constraint"
      style={{
        fontFamily: '"Cormorant Garamond", "Garamond", "Palatino Linotype", serif',
      }}
    >
      <div className="mb-16 flex flex-col items-center text-center">
        <span
          className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#6a5c3b]"
          style={{
            fontFamily: '"Futura", "Optima", sans-serif',
          }}
        >
          Related collection
        </span>
        <p className="max-w-lg text-2xl text-[#1d1a16]">
          You might also want to check out these pieces.
        </p>
      </div>

      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
        {products.map((product) => (
          <li key={product.id}>
            <Product region={region} product={product} wrapperClassName="pb-9" />
          </li>
        ))}
      </ul>
    </div>
  )
}
