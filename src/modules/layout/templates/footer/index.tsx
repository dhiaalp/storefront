import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer
      className="w-full border-t border-[#caa458]/20"
      style={{
        fontFamily: '"Cormorant Garamond", "Garamond", "Palatino Linotype", serif',
        background:
          "linear-gradient(160deg, rgba(253,249,241,0.9) 0%, rgba(240,230,214,0.9) 55%, rgba(239,227,207,0.9) 100%)",
      }}
    >
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-10 xsmall:flex-row items-start justify-between py-24">
          <div className="max-w-sm">
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-3 text-[#1d1a16]"
            >
              <img
                src="/img/logo.PNG"
                alt="The ArtX logo"
                className="h-10 w-28 object-contain"
              />
              <span
                className="text-xs uppercase tracking-[0.28em] text-[#6a5c3b]"
                style={{
                  fontFamily: '"Futura", "Optima", sans-serif',
                }}
              >
                The ArtX
              </span>
            </LocalizedClientLink>
            <p className="mt-4 text-sm leading-relaxed text-[#4a3a2a]">
              Modern Islamic art, handcrafted with warm metallic finishes and
              serene geometry for curated interiors.
            </p>
          </div>
          <div className="text-sm gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span
                  className="text-[11px] uppercase tracking-[0.28em] text-[#6a5c3b]"
                  style={{
                    fontFamily: '"Futura", "Optima", sans-serif',
                  }}
                >
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2 text-[#4a3a2a]"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li className="flex flex-col gap-2" key={c.id}>
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-[#1d1a16]",
                            children && "text-sm"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-[#1d1a16]"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span
                  className="text-[11px] uppercase tracking-[0.28em] text-[#6a5c3b]"
                  style={{
                    fontFamily: '"Futura", "Optima", sans-serif',
                  }}
                >
                  Collections
                </span>
                <ul
                  className={clx("grid grid-cols-1 gap-2 text-[#4a3a2a]", {
                    "grid-cols-2": (collections?.length || 0) > 3,
                  })}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-[#1d1a16]"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-3">
              <span
                className="text-[11px] uppercase tracking-[0.28em] text-[#6a5c3b]"
                style={{
                  fontFamily: '"Futura", "Optima", sans-serif',
                }}
              >
                Contact
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-[#4a3a2a]">
                <li>Custom orders</li>
                <li>Worldwide shipping</li>
                <li>hello@theartx.dz</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-10 justify-between text-[#6a5c3b] text-xs uppercase tracking-[0.2em]">
          <Text
            className="txt-compact-small"
            style={{
              fontFamily: '"Futura", "Optima", sans-serif',
            }}
          >
            © {new Date().getFullYear()} The ArtX. All rights reserved.
          </Text>
          <div
            className="hidden sm:block"
            style={{
              fontFamily: '"Futura", "Optima", sans-serif',
            }}
          >
            theartx.dz
          </div>
        </div>
      </div>
    </footer>
  )
}
