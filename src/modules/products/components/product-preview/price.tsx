import { Text, clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <>
      {price.price_type === "sale" && (
        <Text
          className="line-through text-[#6a5c3b]"
          data-testid="original-price"
        >
          {price.original_price}
        </Text>
      )}
      <Text
        className={clx("text-[#1d1a16]", {
          "text-[#b3842e]": price.price_type === "sale",
        })}
        data-testid="price"
        style={{
          fontFamily: '"Futura", "Optima", sans-serif',
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontSize: "0.65rem",
        }}
      >
        {price.calculated_price}
      </Text>
    </>
  )
}
