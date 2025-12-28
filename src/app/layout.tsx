import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Alexandria } from "next/font/google"
import "styles/globals.css"

const alexandria = Alexandria({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-alexandria",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={alexandria.variable}>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
