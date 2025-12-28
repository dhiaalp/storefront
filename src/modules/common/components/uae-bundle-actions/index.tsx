"use client"

import { useMemo, useState } from "react"

import { addToCart } from "@lib/data/cart"
import { getProductPrice } from "@lib/util/get-product-price"
import { convertToLocale } from "@lib/util/money"

type ProductSummary = {
  id: string
  title: string
  thumbnail?: string | null
  description?: string | null
  variants?: { id?: string | null }[] | null
}

export default function UaeBundleActions({
  products,
  countryCode,
  bundleProduct,
  labels,
}: {
  products: ProductSummary[]
  countryCode: string
  bundleProduct?: ProductSummary | null
  labels?: {
    addToCart?: string
    unavailable?: string
    bundleTitle?: string
    bundleCopy?: string
    bundleButton?: string
    pricingFallback?: string
  }
}) {
  const normalizedCountryCode = countryCode === "uae" ? "ae" : countryCode
  const [status, setStatus] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const productVariants = useMemo(
    () =>
      products.map((product) => ({
        ...product,
        variantId: product.variants?.[0]?.id ?? null,
        price: getProductPrice({ product }).cheapestPrice,
      })),
    [products]
  )

  const bundlePricing = useMemo(() => {
    const prices = productVariants
      .map((product) => product.price)
      .filter(Boolean)
    if (prices.length !== productVariants.length || prices.length === 0) {
      return null
    }

    const currency = prices[0]?.currency_code
    const originalTotal = prices.reduce(
      (sum, price) => sum + (price?.calculated_price_number ?? 0),
      0
    )
    const discountedTotal = Math.round(originalTotal * 0.7)

    return {
      original: convertToLocale({
        amount: originalTotal,
        currency_code: currency,
      }),
      discounted: convertToLocale({
        amount: discountedTotal,
        currency_code: currency,
      }),
    }
  }, [productVariants])

  const addSingle = async (variantId: string | null, title: string) => {
    if (!variantId) {
      setStatus(`${title}: no purchasable variant found.`)
      return
    }

    setIsAdding(true)
    setStatus(null)
    try {
      await addToCart({ variantId, quantity: 1, countryCode: normalizedCountryCode })
      setStatus(`${title} added to cart.`)
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Could not add to cart. Please try again."
      )
    } finally {
      setIsAdding(false)
    }
  }

  const addBundle = async () => {
    const bundleVariantId = bundleProduct?.variants?.[0]?.id ?? null

    if (!bundleVariantId) {
      setStatus("Bundle is unavailable until the set is published.")
      return
    }

    setIsAdding(true)
    setStatus(null)
    try {
      await addToCart({
        variantId: bundleVariantId,
        quantity: 1,
        countryCode: normalizedCountryCode,
      })
      setStatus("Bundle added to cart.")
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Could not add bundle to cart."
      )
    } finally {
      setIsAdding(false)
    }
  }

  const resolvedLabels = {
    addToCart: labels?.addToCart ?? "Add to cart",
    unavailable: labels?.unavailable ?? "Unavailable",
    bundleTitle: labels?.bundleTitle ?? "Bundle & save 30%",
    bundleCopy:
      labels?.bundleCopy ?? "Add the full set to your cart and enjoy the bundle pricing.",
    bundleButton: labels?.bundleButton ?? "Add bundle to cart",
    pricingFallback:
      labels?.pricingFallback ??
      "Bundle pricing available once all items are priced.",
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productVariants.map((product) => (
          <article
            key={product.id}
            className="highlight-stroke rounded-3xl bg-white/60 backdrop-blur-md p-6"
          >
            {product.thumbnail ? (
              <img
                className="aspect-square w-full rounded-2xl object-cover"
                src={product.thumbnail}
                alt={product.title}
              />
            ) : (
              <div className="aspect-square w-full rounded-2xl border border-dashed border-[#caa458]/40 bg-white/50" />
            )}
            <h3 className="mt-4 text-xl text-[#1d1a16]">{product.title}</h3>
            {product.price && (
              <p
                className="mt-2 text-xs uppercase tracking-[0.24em] text-[#6a5c3b]"
                style={{
                  fontFamily: '"Futura", "Optima", sans-serif',
                }}
              >
                {product.price.calculated_price}
              </p>
            )}
            {product.description && (
              <p className="mt-3 text-sm text-[#4a3a2a]">
                {product.description}
              </p>
            )}
            <button
              type="button"
              onClick={() => addSingle(product.variantId, product.title)}
              className="mt-4 w-full rounded-full bg-[#1d1a16] px-5 py-3 text-xs uppercase tracking-[0.24em] text-[#f6f1e7] border border-[#1d1a16] transition hover:-translate-y-0.5 disabled:opacity-60"
              style={{
                fontFamily: '"Futura", "Optima", sans-serif',
              }}
              disabled={isAdding || !product.variantId}
            >
              {product.variantId
                ? resolvedLabels.addToCart
                : resolvedLabels.unavailable}
            </button>
          </article>
        ))}
      </div>
      {status && (
        <p className="text-sm text-[#4a3a2a]" role="status">
          {status}
        </p>
      )}

      <div className="highlight-stroke rounded-[28px] bg-white/60 backdrop-blur-md p-8">
        <h2 className="text-3xl text-[#1d1a16]">{resolvedLabels.bundleTitle}</h2>
        <p className="mt-2 text-base text-[#4a3a2a]">
          {resolvedLabels.bundleCopy}
        </p>
        {bundlePricing ? (
          <p
            className="mt-3 text-sm uppercase tracking-[0.2em] text-[#6a5c3b]"
            style={{
              fontFamily: '"Futura", "Optima", sans-serif',
            }}
          >
            {bundlePricing.discounted} <span className="line-through ml-2 text-[#9b8a6a]">{bundlePricing.original}</span>
          </p>
        ) : (
          <p className="mt-3 text-sm text-[#6a5c3b]">
            {resolvedLabels.pricingFallback}
          </p>
        )}
        <button
          type="button"
          onClick={addBundle}
          className="mt-6 inline-flex rounded-full bg-[#1d1a16] px-6 py-3 text-xs uppercase tracking-[0.24em] text-[#f6f1e7] border border-[#1d1a16] transition hover:-translate-y-0.5 disabled:opacity-60"
          style={{
            fontFamily: '"Futura", "Optima", sans-serif',
          }}
          disabled={isAdding}
        >
          {resolvedLabels.bundleButton}
        </button>
      </div>
    </div>
  )
}
