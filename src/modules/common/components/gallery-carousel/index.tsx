"use client"

import { useRef } from "react"

const scrollByAmount = 420

export default function GalleryCarousel({ images }: { images: string[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollBy = (direction: "left" | "right") => {
    if (!scrollerRef.current) {
      return
    }

    scrollerRef.current.scrollBy({
      left: direction === "left" ? -scrollByAmount : scrollByAmount,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
      >
        {images.map((src, index) => (
          <div
            key={src}
            className="highlight-stroke min-w-[280px] snap-start overflow-hidden rounded-3xl bg-white/60 backdrop-blur-md sm:min-w-[360px] lg:min-w-[420px]"
          >
            <img
              className="aspect-[4/3] w-full object-cover"
              src={src}
              alt={`Gallery scene ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => scrollBy("left")}
          className="rounded-full border border-black/20 px-4 py-2 text-sm text-black"
          aria-label="Scroll gallery left"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollBy("right")}
          className="rounded-full border border-black/20 px-4 py-2 text-sm text-black"
          aria-label="Scroll gallery right"
        >
          →
        </button>
      </div>
    </div>
  )
}
