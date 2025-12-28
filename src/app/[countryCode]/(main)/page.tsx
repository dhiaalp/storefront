import { Metadata } from "next"

import { listProducts } from "@lib/data/products"

export const metadata: Metadata = {
  title: "The ArtX | Islamic Art Decor",
  description:
    "The ArtX creates modern Islamic art decorations with timeless oriental elegance.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params
  const {
    response: { products: featuredProducts },
  } = await listProducts({
    countryCode,
    queryParams: {
      limit: 6,
      fields: "id, title, handle, thumbnail",
    },
  })

  return (
    <div
      className="min-h-screen text-[#1d1a16]"
      style={{
        fontFamily: '"Cormorant Garamond", "Garamond", "Palatino Linotype", serif',
        background:
          "radial-gradient(circle at 12% 10%, rgba(202, 164, 88, 0.18), transparent 45%), radial-gradient(circle at 80% 0%, rgba(107, 90, 52, 0.18), transparent 40%), linear-gradient(160deg, #fdf9f1 0%, #f0e6d6 55%, #efe3cf 100%)",
      }}
    >
      <div className="relative overflow-hidden">
        <svg
          className="absolute right-[-5%] top-[-10%] h-[420px] w-[420px] opacity-10"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="arabesque"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M20 2 L30 12 L20 22 L10 12 Z"
                fill="none"
                stroke="#3a2b1f"
                strokeWidth="1"
              />
              <circle
                cx="20"
                cy="12"
                r="8"
                fill="none"
                stroke="#3a2b1f"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#arabesque)" />
        </svg>

        <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-12 sm:px-10">
          <section className="grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <h1 className="text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Modern Islamic art, crafted with timeless oriental elegance.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#2b1f16]">
                The ArtX creates hand-finished resin frames and medallions
                inspired by sacred geometry and calligraphy. Minimal silhouettes
                meet warm metallics to elevate calm, modern interiors.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  className="rounded-full bg-[#1d1a16] px-6 py-3 text-xs uppercase tracking-[0.24em] text-[#f6f1e7] border border-[#1d1a16] transition hover:-translate-y-0.5"
                  href="#collections"
                  style={{
                    fontFamily: '"Futura", "Optima", sans-serif',
                  }}
                >
                  View Collections
                </a>
                <a
                  className="rounded-full border border-black/20 bg-white/80 px-6 py-3 text-xs uppercase tracking-[0.24em] transition hover:-translate-y-0.5"
                  href={`/${countryCode}/store`}
                  style={{
                    fontFamily: '"Futura", "Optima", sans-serif',
                  }}
                >
                  Shop the Store
                </a>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <img
                className="aspect-square w-full max-w-sm rounded-[28px] border border-white/70 object-cover"
                src="/img/IMG_2672.PNG"
                alt="Golden calligraphy medallion on dark resin frame"
              />
              <div
                className="absolute bottom-6 right-6 rounded-full bg-gradient-to-br from-[#d5b26b] to-[#b3842e] px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-[#2b1f16] border border-[#b3842e]/40"
                style={{
                  fontFamily: '"Futura", "Optima", sans-serif',
                }}
              >
                Artisan
              </div>
            </div>
          </section>

          <section id="craft" className="py-16">
            <h2 className="text-3xl sm:text-4xl">Design language</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#4a3a2a] sm:text-lg">
              Subtle textures, balanced symmetry, and warm gold tones anchor
              each piece, creating a serene focal point for living rooms,
              prayer corners, and curated shelves.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Oriental balance",
                  copy: "Layered geometry and soft contrast keep the artwork striking yet minimal.",
                },
                {
                  title: "Resin craft",
                  copy: "Resin pours are sealed for a satin finish that reflects light without glare.",
                },
                {
                  title: "Gallery framing",
                  copy: "Each frame is built for modern interiors with clean, architectural edges.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="highlight-stroke rounded-3xl bg-white/60 backdrop-blur-md p-7"
                >
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4f4030]">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="collections" className="py-8">
            <h2 className="text-3xl sm:text-4xl">Featured pieces</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#4a3a2a] sm:text-lg">
              Hand-finished resin work and sacred calligraphy, available now.
            </p>
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <article
                  key={product.id}
                  className="highlight-stroke rounded-3xl bg-white/60 backdrop-blur-md p-5"
                >
                  <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/70">
                    <img
                      className="aspect-[4/3] w-full object-cover"
                      src={product.thumbnail || "/img/IMG_2672.PNG"}
                      alt={product.title}
                    />
                  </div>
                  <h4 className="mt-4 text-xl">{product.title}</h4>
                  <a
                    className="mt-4 inline-flex text-xs uppercase tracking-[0.24em] text-[#1d1a16] underline-offset-4 hover:underline"
                    href={`/${countryCode}/products/${product.handle}`}
                    style={{
                      fontFamily: '"Futura", "Optima", sans-serif',
                    }}
                  >
                    View details
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section id="story" className="py-16">
            <div className="highlight-stroke rounded-[30px] bg-white/60 backdrop-blur-md p-10">
              <span
                className="text-[11px] uppercase tracking-[0.24em] text-[#6a5c3b]"
                style={{
                  fontFamily: '"Futura", "Optima", sans-serif',
                }}
              >
                Studio Note
              </span>
              <p className="mt-4 text-lg leading-relaxed text-[#3a2b1f] sm:text-xl">
                “We design with intention, balancing quiet modernism with the
                soul of traditional Islamic art. Every piece is poured, polished,
                and framed by hand in small batches.”
              </p>
              <span
                className="mt-4 block text-[11px] uppercase tracking-[0.24em] text-[#6a5c3b]"
                style={{
                  fontFamily: '"Futura", "Optima", sans-serif',
                }}
              >
                The ArtX Studio
              </span>
            </div>
          </section>
        </main>

        <footer
          id="contact"
          className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-black/10 px-6 py-10 text-xs uppercase tracking-[0.22em] text-[#6a5c3b] sm:px-10"
          style={{
            fontFamily: '"Futura", "Optima", sans-serif',
          }}
        >
          <div>theartx.dz</div>
          <div>Custom orders • Worldwide shipping • hello@theartx.dz</div>
        </footer>
      </div>
    </div>
  )
}
