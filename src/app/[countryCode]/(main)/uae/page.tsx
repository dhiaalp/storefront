import { Metadata } from "next"

import { listProducts } from "@lib/data/products"
import { uaeLandingContent } from "@lib/content/uae-landing"
import GalleryCarousel from "@modules/common/components/gallery-carousel"
import UaeBundleActions from "@modules/common/components/uae-bundle-actions"

export const metadata: Metadata = {
  title: "The ArtX | UAE Islamic Frame Set",
  description:
    "Three Islamic frame decor pieces crafted as a set or bought individually, with a bundle discount.",
}

export default async function UaeLanding(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const productHandles = [
    "bismillah-ar-rahman-ar-rahim",
    "muhammad-golden-medallion",
    "allah-divine-gold-emblem",
  ]

  const {
    response: { products: rawProducts },
  } = await listProducts({
    countryCode,
    queryParams: {
      handle: productHandles,
      limit: 3,
      fields:
        "id, title, handle, thumbnail, description, *variants.calculated_price",
    },
  })

  const products = productHandles
    .map((handle) => rawProducts.find((product) => product.handle === handle))
    .filter(Boolean)

  const {
    response: { products: bundleProducts },
  } = await listProducts({
    countryCode,
    queryParams: {
      handle: "artx-trio-set",
      limit: 1,
      fields: "id, title, handle, thumbnail, variants.id",
    },
  })

  const bundleProduct = bundleProducts[0] ?? null

  return (
    <div
      className="min-h-screen pb-20"
      style={{
        fontFamily: '"Cormorant Garamond", "Garamond", "Palatino Linotype", serif',
        background:
          "radial-gradient(circle at 12% 10%, rgba(202, 164, 88, 0.14), transparent 45%), radial-gradient(circle at 80% 0%, rgba(107, 90, 52, 0.14), transparent 40%), linear-gradient(160deg, #fdf9f1 0%, #f0e6d6 55%, #efe3cf 100%)",
      }}
    >
      <section className="relative">
        <div className="relative h-[48vh] min-h-[360px] w-full border-b border-[#caa458]/20">
          <img
            className="h-full w-full object-cover"
            src="/img/hero.jpg"
            alt="Hero banner"
          />
        </div>
      </section>

      <main className="content-container pt-16">
        <section className="grid gap-12 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="flex flex-col gap-6">
            <span
              className="text-[11px] uppercase tracking-[0.28em] text-[#6a5c3b]"
              style={{
                fontFamily: '"Futura", "Optima", sans-serif',
              }}
            >
              {uaeLandingContent.hero.label}
            </span>
            <h2 className="text-3xl leading-tight text-[#1d1a16] sm:text-4xl">
              {uaeLandingContent.hero.heading}
            </h2>
            <p className="text-lg leading-relaxed text-[#4a3a2a]">
              {uaeLandingContent.hero.body}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                className="rounded-full bg-[#1d1a16] px-6 py-3 text-xs uppercase tracking-[0.24em] text-[#f6f1e7] border border-[#1d1a16] transition hover:-translate-y-0.5"
                href="#bundle"
                style={{
                  fontFamily: '"Futura", "Optima", sans-serif',
                }}
              >
                {uaeLandingContent.hero.primaryCta}
              </a>
              <a
                className="rounded-full border border-black/20 bg-white/70 px-6 py-3 text-xs uppercase tracking-[0.24em] transition hover:-translate-y-0.5"
                href="#pieces"
                style={{
                  fontFamily: '"Futura", "Optima", sans-serif',
                }}
              >
                {uaeLandingContent.hero.secondaryCta}
              </a>
            </div>
          </div>
          <div className="text-center">
            <div className="p-4">
              <img
                className="mx-auto aspect-square w-full max-w-[460px] rounded-xl object-cover"
                src="/img/frame.gif"
                alt="Framed artwork"
              />
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="grid w-full gap-6 sm:grid-cols-3">
            {uaeLandingContent.infoCards.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-3 rounded-3xl border border-[#caa458]/20 bg-white/60 backdrop-blur-md p-6 text-center text-base text-[#4a3a2a]"
              >
                <img
                  className="h-8 w-8"
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                />
                <span
                  className="text-[11px] uppercase tracking-[0.24em] text-[#6a5c3b]"
                  style={{
                    fontFamily: '"Futura", "Optima", sans-serif',
                  }}
                >
                  {item.title}
                </span>
                <p className="text-sm text-[#4a3a2a]">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl text-[#1d1a16]">
            {uaeLandingContent.gallery.heading}
          </h2>
          <p className="mt-2 max-w-2xl text-base text-[#4a3a2a]">
            {uaeLandingContent.gallery.body}
          </p>
          <div className="mt-6">
            <GalleryCarousel
            images={[
              "/img/gallery/freepik__add-these-frame-set-to-a-modern-living-room-make-t__57626-min.png",
              "/img/gallery/freepik__add-these-frame-set-to-an-arabic-living-room-make-__57627-min.png",
              "/img/gallery/freepik__add-these-frame-set-to-a-simple-office-make-them-s__57628-min.png",
              "/img/gallery/freepik__add-these-frame-set-to-a-villa-hallway-make-them-s__57629-min.png",
              "/img/gallery/freepik__add-these-frame-set-to-a-villa-hallway-make-them-s__57630-min.png",
              "/img/gallery/freepik__add-these-frame-set-to-hotel-reception-make-them-s__57631-min.png",
            ]}
            />
          </div>
        </section>

        <section id="pieces" className="mt-16">
          <h2 className="text-3xl text-[#1d1a16]">
            {uaeLandingContent.pieces.heading}
          </h2>
          <p className="mt-2 max-w-2xl text-base text-[#4a3a2a]">
            {uaeLandingContent.pieces.body}
          </p>
          <div className="mt-8">
            <UaeBundleActions
              products={products}
              countryCode={countryCode}
              bundleProduct={bundleProduct}
            />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl text-[#1d1a16]">
            {uaeLandingContent.testimonials.heading}
          </h2>
          <p className="mt-2 max-w-2xl text-base text-[#4a3a2a]">
            {uaeLandingContent.testimonials.body}
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {uaeLandingContent.testimonials.items.map((item) => (
              <figure
                key={item.name}
                className="highlight-stroke rounded-3xl bg-white/60 backdrop-blur-md p-6 text-[#4a3a2a]"
              >
                <blockquote className="text-base leading-relaxed">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-4 text-[11px] uppercase tracking-[0.24em] text-[#6a5c3b]">
                  {item.name} • {item.location}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="highlight-stroke rounded-[28px] bg-white/60 backdrop-blur-md p-8">
            <h2 className="text-3xl text-[#1d1a16]">
              {uaeLandingContent.story.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#4a3a2a]">
              {uaeLandingContent.story.body}
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
